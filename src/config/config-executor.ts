import { writeToFile } from '@/cli/write-to-file';
import type { CSSTree } from '@/types/css';
import { loadThemes } from './load-themes';
import type { Config } from './schema/config';
import type { ThemeConfig } from './schema/theme-config';
import { ThemeManager } from './theme-manager';
import { validateConfig } from './validate-config';

type Logger = {
  clearScreen: () => void;
  logInfo: (...message: string[]) => void;
  logError: (...message: string[]) => void;
};

class ConfigExecutor {
  #config: Config;
  #themesConfig: Record<string, ThemeConfig>;
  #logger: Logger;
  #sortedThemes: [string, ThemeConfig][];
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

    this.#sortedThemes = Object.entries(this.#themesConfig).sort((a, b) =>
      a[1].dependencies.includes(b[0]) ? 1 : -1,
    );

    this.#themeManagers = this.loadThemesTokens();
  }

  execute() {
    this.#logger.clearScreen();
    this.#logger.logInfo('Generate...');

    this.output(this.#themeManagers.map((v) => v[1]));

    this.#logger.logInfo(`Successfully Generated!\n`);
  }

  private loadThemesTokens(): [string, ThemeManager][] {
    this.#logger.logInfo('Load themes tokens...');
    const themeManagers: [string, ThemeManager][] = [];
    this.#sortedThemes.forEach(([themeName, themeConfig]) => {
      const themeManager = new ThemeManager(
        themeName.toString(),
        this.#config.prefix,
        themeConfig,
      );
      this.#logger.logInfo(`Load "${themeName}" theme tokens...`);
      const loadResult = themeManager.load(this.#themesConfig);
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

  private output(themeManagers: ThemeManager[]) {
    const cssTree: CSSTree = themeManagers.flatMap((themeManager) =>
      themeManager.css(this.#config.absolute),
    );

    const getTextFromCSSTree = (tree: CSSTree): string => {
      return tree
        .map((line) => {
          if (typeof line === 'string') return line;
          return getTextFromCSSTree(line);
        })
        .join('\r\n');
    };

    const file = getTextFromCSSTree(cssTree);

    this.writeToFileProcess(this.#config.output, `${file}\r\n`);
  }

  private writeToFileProcess = (pathToFile: string, data: string): true => {
    const result = writeToFile(pathToFile, data);
    if (result.isErr()) {
      this.#logger.logError('Fail write file:', '\n\t', result.unwrapErr());
      return process.exit(0);
    }
    return true;
  };
}

export const configExecutor = (
  config: unknown,
  logger: Logger = {
    logError: () => {},
    logInfo: () => {},
    clearScreen: () => {},
  },
) => new ConfigExecutor(config, logger);
