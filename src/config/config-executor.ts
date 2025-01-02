import { writeToFile } from '@/cli/write-to-file';
import { cleanMergeObject } from '@/lib/clean-merge-object';
import { CSS } from '@/types/css';
import { TailwindPluginApi, TailwindThemeConfig } from '@/types/tailwind';
import { loadThemes } from './load-themes';
import { Config } from './schema/config';
import { ThemesConfig } from './schema/themes-config';
import { ThemeManager } from './theme-manager';
import { validateConfig } from './validate-config';

type Logger = {
  clearScreen: () => void;
  logInfo: (...message: string[]) => void;
  logError: (...message: string[]) => void;
};

class ConfigExecutor {
  #config: Config;
  #themesConfig: ThemesConfig;
  #logger: Logger;
  #sortedThemes: [string, ThemesConfig['themes'][string]][];
  #themeManagers: [string, ThemeManager][];

  constructor(rawConfig: unknown, logger: Logger) {
    const config = validateConfig(rawConfig);
    if (config.isErr()) {
      logger.logError(
        'Invalid config:',
        '\n\t',
        JSON.stringify(config.unwrapErr(), null, 2),
      );
      throw process.exit(0);
    }
    this.#config = config.unwrap();
    this.#logger = logger;
    const themesConfig = loadThemes(this.#config);
    if (themesConfig.isErr()) {
      logger.logError('Fail load themes:', '\n\t', themesConfig.unwrapErr());
      throw process.exit(0);
    }
    this.#themesConfig = themesConfig.unwrap();

    this.#sortedThemes = Object.entries(this.#themesConfig.themes).sort(
      (a, b) => (a[1].dependencies.includes(b[0]) ? 1 : -1),
    );

    this.#themeManagers = this.loadThemesTokens();
  }

  execute() {
    this.#logger.clearScreen();
    this.#logger.logInfo('Generate...');

    this.outputThemes();
    if (
      this.#config.output.all.css.length ||
      this.#config.output.all.tailwind.length
    ) {
      this.outputAll(this.#themeManagers.map((v) => v[1]));
    }

    this.#logger.logInfo(`Successfully Generated!\n`);
  }

  tailwindConfig() {
    const config: TailwindThemeConfig = cleanMergeObject(
      {},
      ...this.#themeManagers
        .map((v) => v[1])
        .map((themeManager) => themeManager.tailwindConfig(this.isAbsolute())),
    );
    return config;
  }

  applyTailwind(api: TailwindPluginApi) {
    this.#themeManagers
      .map((v) => v[1])
      .map((themeManager) =>
        themeManager.applyTailwind(this.isAbsolute(), api),
      );
  }

  private loadThemesTokens(): [string, ThemeManager][] {
    this.#logger.logInfo('Load themes tokens...');
    const themeManagers: [string, ThemeManager][] = [];
    this.#sortedThemes.forEach(([themeName, themeConfig]) => {
      const themeManager = new ThemeManager(
        themeName.toString(),
        this.#themesConfig.prefix,
        themeConfig,
      );
      this.#logger.logInfo(`Load "${themeName}" theme tokens...`);
      const loadResult = themeManager.load(this.#themesConfig.themes);
      if (loadResult.isErr()) {
        this.#logger.logError(
          `Fail load "${themeName}" theme tokens:`,
          '\n\t',
          loadResult.unwrapErr(),
        );
        process.exit(0);
      }

      themeManagers.push([themeName.toString(), themeManager]);
    });

    return themeManagers;
  }

  private outputThemes() {
    this.#sortedThemes.forEach(([themeName, themeConfig]) => {
      const themeManager = this.#themeManagers.find((v) => v[0] === themeName);
      if (!themeManager) {
        this.#logger.logError(`Fail find "${themeName}" theme manager`);
        process.exit(0);
      }
      const output = themeConfig._output;
      if (output.css?.length || output.tailwind?.length) {
        this.outputTheme(themeName.toString(), themeManager[1], output);
      }
    });
  }

  private outputTheme(
    themeName: string,
    themeManager: ThemeManager,
    output: ThemesConfig['themes'][string]['_output'],
  ) {
    this.#logger.logInfo(`Output "${themeName}" theme...`);
    if (output.css?.length) {
      this.#logger.logInfo(`CSS output "${themeName}" theme...`);

      output.css
        .filter((v) => v.destination)
        .forEach(({ destination, absolute, options }) => {
          const css: CSS = cleanMergeObject(
            {},
            themeManager.css(this.isAbsolute(absolute), options),
          );

          const selectors = Object.keys(css)
            .filter((v) => v)
            .sort((a, b) => a.localeCompare(b));

          const file = selectors
            .filter((s) => css[s])
            .map((selector) => {
              const lines: string[] = [];

              const cssBySelector = css[selector];

              lines.push(`${selector} {`);
              Object.entries(cssBySelector).forEach(([key, value]) => {
                lines.push(`  ${key}: ${value};`);
              });
              lines.push('}');

              return lines.join('\r\n');
            })
            .join('\r\n\r\n');

          this.writeToFileProcess(destination, `${file}\r\n`);
        });
    }

    if (output.tailwind?.length) {
      this.#logger.logInfo(`Tailwind Config output "${themeName}" theme...`);

      output.tailwind
        .filter((v) => v.destination)
        .forEach(({ destination, absolute }) => {
          const config: TailwindThemeConfig = cleanMergeObject(
            {},
            themeManager.tailwindConfig(this.isAbsolute(absolute)),
          );

          const file = JSON.stringify(config, null, 2);

          this.writeToFileProcess(destination, `${file}\r\n`);
        });
    }
  }

  private outputAll(themeManagers: ThemeManager[]) {
    this.#logger.logInfo(`Output all themes...`);
    if (this.#config.output.all.css.length) {
      this.#logger.logInfo(`CSS output all themes...`);

      this.#config.output.all.css
        .filter((v) => v.destination)
        .forEach(({ destination, absolute, options }) => {
          const css: CSS = cleanMergeObject(
            {},
            ...themeManagers.map((themeManager) =>
              themeManager.css(this.isAbsolute(absolute), options),
            ),
          );

          const selectors = Object.keys(css)
            .filter((v) => v)
            .sort((a, b) => a.localeCompare(b));

          const file = selectors
            .filter((s) => css[s])
            .map((selector) => {
              const lines: string[] = [];

              const cssBySelector = css[selector];

              lines.push(`${selector} {`);
              Object.entries(cssBySelector).forEach(([key, value]) => {
                lines.push(`  ${key}: ${value};`);
              });
              lines.push('}');

              return lines.join('\r\n');
            })
            .join('\r\n\r\n');

          this.writeToFileProcess(destination, `${file}\r\n`);
        });
    }

    if (this.#config.output.all.tailwind.length) {
      this.#logger.logInfo(`Tailwind Config output all themes...`);

      this.#config.output.all.tailwind
        .filter((v) => v.destination)
        .forEach(({ destination, absolute }) => {
          const config: TailwindThemeConfig = cleanMergeObject(
            {},
            ...themeManagers.map((themeManager) =>
              themeManager.tailwindConfig(this.isAbsolute(absolute)),
            ),
          );

          const file = JSON.stringify(config, null, 2);

          this.writeToFileProcess(destination, `${file}\r\n`);
        });
    }
  }

  private writeToFileProcess = (pathToFile: string, data: string): true => {
    const result = writeToFile(pathToFile, data);
    if (result.isErr()) {
      this.#logger.logError('Fail write file:', '\n\t', result.unwrapErr());
      return process.exit(0);
    }
    return true;
  };

  private isAbsolute(absolute = false) {
    return absolute || this.#config.absolute;
  }
}

export const configExecutor = (
  config: unknown,
  logger: Logger = {
    logError: () => {},
    logInfo: () => {},
    clearScreen: () => {},
  },
) => new ConfigExecutor(config, logger);
