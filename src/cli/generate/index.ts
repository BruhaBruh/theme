import { loadThemes } from '@/config/load-themes';
import { readConfig } from '@/config/read-config';
import { Config } from '@/config/schema/config';
import { ThemesConfig } from '@/config/schema/themes-config';
import { ThemeManager } from '@/config/theme-manager';
import { cleanMergeObject } from '@/lib/clean-merge-object';
import { CSS } from '@/types/css';
import { Entries } from '@bruhabruh/type-safe';
import chalk from 'chalk';
import { Command, Option } from 'commander';
import { writeToFile } from '../write-to-file';

type Options = {
  config: string;
};

const write = (
  message: string[],
  stream: NodeJS.WritableStream = process.stdout,
) => {
  if (process.stdout.isTTY) {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
  }
  stream.write(`${message.join(' ')}${process.stdout.isTTY ? '' : '\n'}`);
};

const clearScreen = () => {
  if (process.stdout.isTTY) {
    process.stdout.write('\x1Bc');
  }
};

const logInfo = (...message: string[]) => {
  write([chalk.bgBlue('INFO'), ...message], process.stdout);
};
const logError = (...message: string[]) =>
  write([chalk.bgRed('ERROR'), ...message, '\n'], process.stderr);

const readConfigProcess = (config: string): Config => {
  logInfo('Read config...');
  const configResult = readConfig(config);
  if (configResult.isErr()) {
    const error = configResult.unwrapErr();
    logError(
      'Fail read config: ',
      '\n\t',
      typeof error === 'string' ? error : JSON.stringify(error),
    );
    return process.exit(0);
  }
  return configResult.unwrap();
};

const loadThemesConfigProcess = (config: Config): ThemesConfig => {
  logInfo('Load themes...');
  const themesConfigResult = loadThemes(config);
  if (themesConfigResult.isErr()) {
    logError('Fail load themes:', '\n\t', themesConfigResult.unwrapErr());
    return process.exit(0);
  }
  return themesConfigResult.unwrap();
};

const writeToFileProcess = (pathToFile: string, data: string): true => {
  const result = writeToFile(pathToFile, data);
  if (result.isErr()) {
    logError('Fail write file:', '\n\t', result.unwrapErr());
    return process.exit(0);
  }
  return true;
};

const loadThemesTokensProcess = (
  themesConfig: ThemesConfig,
  themes: Entries<ThemesConfig['themes']>,
): [string, ThemeManager][] => {
  logInfo('Load themes tokens...');
  const themeManagers: [string, ThemeManager][] = [];
  themes.forEach(([themeName, themeConfig]) => {
    const themeManager = new ThemeManager(
      themeName.toString(),
      themesConfig.prefix,
      themeConfig,
    );
    logInfo(`Load "${themeName}" theme tokens...`);
    const loadResult = themeManager.load(themesConfig.themes);
    if (loadResult.isErr()) {
      logError(
        `Fail load "${themeName}" theme tokens:`,
        '\n\t',
        loadResult.unwrapErr(),
      );
      process.exit(0);
    }

    themeManagers.push([themeName.toString(), themeManager]);
  });

  return themeManagers;
};

const outputTheme = (
  globalAbsolute: boolean,
  themeName: string,
  themeManager: ThemeManager,
  output: ThemesConfig['themes'][string]['_output'],
) => {
  logInfo(`Output "${themeName}" theme...`);
  if (output.css?.length) {
    logInfo(`CSS output "${themeName}" theme...`);
    const options = output.css.filter((v) => v.destination) as OutputOptions;

    options.forEach(({ destination, absolute }) => {
      const css: CSS = cleanMergeObject(
        {},
        themeManager.css(
          typeof absolute === 'boolean' ? absolute : globalAbsolute,
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

      writeToFileProcess(destination, `${file}\r\n`);
    });
  }

  if (output.tailwind?.length) {
    logInfo(`TailwindCSS output "${themeName}" theme...`);
    const options = output.tailwind.filter(
      (v) => v.destination,
    ) as OutputOptions;

    options.forEach(({ destination, absolute }) => {
      const css: CSS = cleanMergeObject(
        {
          '@theme': {
            '--color-*': 'initial',
            '--font-*': 'initial',
            '--text-*': 'initial',
            '--font-weight-*': 'initial',
            '--tracking-*': 'initial',
            '--leading-*': 'initial',
            '--spacing-*': 'initial',
            '--radius-*': 'initial',
          },
        },
        themeManager.tailwindCSS(
          typeof absolute === 'boolean' ? absolute : globalAbsolute,
        ),
      );

      const selectors = Object.keys(css)
        .filter((v) => v)
        .sort((a, b) => a.localeCompare(b));

      const file = [
        '@import "tailwindcss";',
        ...selectors
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
          }),
      ].join('\r\n\r\n');

      writeToFileProcess(destination, `${file}\r\n`);
    });
  }
};

const outputThemes = (
  globalAbsolute: boolean,
  themes: Entries<ThemesConfig['themes']>,
  themeManagers: [string, ThemeManager][],
) => {
  themes.forEach(([themeName, themeConfig]) => {
    const themeManager = themeManagers.find((v) => v[0] === themeName);
    if (!themeManager) {
      logError(`Fail find "${themeName}" theme manager`);
      process.exit(0);
    }
    const output = themeConfig._output;
    if (output.css?.length || output.tailwind?.length) {
      outputTheme(
        globalAbsolute,
        themeName.toString(),
        themeManager[1],
        output,
      );
    }
  });
};

type OutputOptions = {
  absolute: Config['output']['all']['css'][number]['absolute'];
  destination: NonNullable<
    Config['output']['all']['css'][number]['destination']
  >;
}[];

const outputAll = (
  globalAbsolute: boolean,
  output: Config['output']['all'],
  themeManagers: ThemeManager[],
) => {
  logInfo(`Output all themes...`);
  if (output.css.length) {
    logInfo(`CSS output all themes...`);
    const options = output.css.filter((v) => v.destination) as OutputOptions;

    options.forEach(({ destination, absolute }) => {
      const css: CSS = cleanMergeObject(
        {},
        ...themeManagers.map((themeManager) =>
          themeManager.css(
            typeof absolute === 'boolean' ? absolute : globalAbsolute,
          ),
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

      writeToFileProcess(destination, `${file}\r\n`);
    });
  }

  if (output.tailwind.length) {
    logInfo(`TailwindCSS output all themes...`);
    const options = output.tailwind.filter(
      (v) => v.destination,
    ) as OutputOptions;

    options.forEach(({ destination, absolute }) => {
      const css: CSS = cleanMergeObject(
        {
          '@theme': {
            '--color-*': 'initial',
            '--font-*': 'initial',
            '--text-*': 'initial',
            '--font-weight-*': 'initial',
            '--tracking-*': 'initial',
            '--leading-*': 'initial',
            '--spacing-*': 'initial',
            '--radius-*': 'initial',
          },
        },
        ...themeManagers.map((themeManager) =>
          themeManager.tailwindCSS(
            typeof absolute === 'boolean' ? absolute : globalAbsolute,
          ),
        ),
      );

      const selectors = Object.keys(css)
        .filter((v) => v)
        .sort((a, b) => a.localeCompare(b));

      const file = [
        '@import "tailwindcss";',
        ...selectors
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
          }),
      ].join('\r\n\r\n');

      writeToFileProcess(destination, `${file}\r\n`);
    });
  }
};

export const applyGenerateCommand = (cli: Command) => {
  cli
    .command('generate')
    .description('generate')
    .addOption(
      new Option('-c, --config <path>', 'path to config file').default(
        'theme.config.yaml',
      ),
    )
    .action((options: Options) => {
      clearScreen();
      logInfo('Generate...');

      const config = readConfigProcess(options.config);

      const themesConfig = loadThemesConfigProcess(config);

      const sortedThemes = Object.entries(themesConfig.themes).sort((a, b) =>
        a[1].dependencies.includes(b[0]) ? 1 : -1,
      );

      const themeManagers = loadThemesTokensProcess(themesConfig, sortedThemes);

      outputThemes(config.absolute, sortedThemes, themeManagers);
      if (config.output.all.css.length || config.output.all.tailwind.length) {
        outputAll(
          config.absolute,
          config.output.all,
          themeManagers.map((v) => v[1]),
        );
      }

      logInfo(`Successfully Generated!\n`);
    });
};
