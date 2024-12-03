import { loadThemes } from '@/config/load-themes';
import { readConfig } from '@/config/read-config';
import { Config } from '@/config/schema/config';
import { ThemesConfig } from '@/config/schema/themes-config';
import { ThemeManager } from '@/config/theme-manager';
import { TailwindConfig } from '@/types/tailwind';
import { Entries } from '@bruhabruh/type-safe';
import chalk from 'chalk';
import { Command, Option } from 'commander';
import { merge } from 'ts-deepmerge';
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
  logInfo(`Output all themes...`);
  if (output.css?.length) {
    logInfo(`CSS output "${themeName}" theme...`);
    const options = output.css.filter((v) => v.destination) as OutputOptions;

    options.forEach(({ destination, absolute }) => {
      const file = themeManager
        .css(typeof absolute === 'boolean' ? absolute : globalAbsolute)
        .join('\r\n');

      writeToFileProcess(destination, file);
    });
  }

  if (output.js?.length) {
    logInfo(`TailwindCSS JS output "${themeName}" theme...`);
    const options = output.js.filter((v) => v.destination) as OutputOptions;

    options.forEach(({ destination, absolute }) => {
      const tailwindConfig = themeManager.tailwindConfig(
        typeof absolute === 'boolean' ? absolute : globalAbsolute,
      );

      const file = `export const theme = ${JSON.stringify(tailwindConfig, null, 2)}\r\n`;
      writeToFileProcess(destination, file);
    });
  }

  if (output.ts?.length) {
    logInfo(`TailwindCSS TS output "${themeName}" theme...`);
    const options = output.ts.filter((v) => v.destination) as OutputOptions;

    options.forEach(({ destination, absolute }) => {
      const tailwindConfig = themeManager.tailwindConfig(
        typeof absolute === 'boolean' ? absolute : globalAbsolute,
      );

      const file = `export const theme = ${JSON.stringify(tailwindConfig, null, 2)} as const;\r\n`;
      writeToFileProcess(destination, file);
    });
  }

  if (output.json?.length) {
    logInfo(`TailwindCSS JSON output "${themeName}" theme...`);
    const options = output.json.filter((v) => v.destination) as OutputOptions;

    options.forEach(({ destination, absolute }) => {
      const tailwindConfig = themeManager.tailwindConfig(
        typeof absolute === 'boolean' ? absolute : globalAbsolute,
      );

      const file = `${JSON.stringify(tailwindConfig, null, 2)}\r\n`;
      writeToFileProcess(destination, file);
    });
  }
};

const outputThemes = (
  globalAbsolute: boolean,
  themes: Entries<ThemesConfig['themes']>,
  themeManagers: [string, ThemeManager][],
) => {
  themes.forEach(([themeName, themeConfig]) => {
    const themeManger = themeManagers.find((v) => v[0] === themeName);
    if (!themeManger) {
      logError(`Fail find "${themeName}" theme manager`);
      process.exit(0);
    }
    const output = themeConfig._output;
    if (
      output.css?.length ||
      output.js?.length ||
      output.json?.length ||
      output.ts?.length
    ) {
      outputTheme(globalAbsolute, themeName.toString(), themeManger[1], output);
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
      const file = themeManagers
        .map(
          (themeManager) =>
            `${themeManager.css(typeof absolute === 'boolean' ? absolute : globalAbsolute).join('\r\n')}\r\n`,
        )
        .join('\r\n');

      writeToFileProcess(destination, file);
    });
  }

  if (output.js.length) {
    logInfo(`TailwindCSS JS output all themes...`);
    const options = output.js.filter((v) => v.destination) as OutputOptions;

    options.forEach(({ destination, absolute }) => {
      let tailwindConfig: TailwindConfig = {};
      tailwindConfig = merge(
        tailwindConfig,
        ...themeManagers.map((themeManager) =>
          themeManager.tailwindConfig(
            typeof absolute === 'boolean' ? absolute : globalAbsolute,
          ),
        ),
      );

      const file = `export const theme = ${JSON.stringify(tailwindConfig, null, 2)}\r\n`;
      writeToFileProcess(destination, file);
    });
  }

  if (output.ts.length) {
    logInfo(`TailwindCSS TS output all themes...`);
    const options = output.ts.filter((v) => v.destination) as OutputOptions;

    options.forEach(({ destination, absolute }) => {
      let tailwindConfig: TailwindConfig = {};
      tailwindConfig = merge(
        tailwindConfig,
        ...themeManagers.map((themeManager) =>
          themeManager.tailwindConfig(
            typeof absolute === 'boolean' ? absolute : globalAbsolute,
          ),
        ),
      );

      const file = `export const theme = ${JSON.stringify(tailwindConfig, null, 2)} as const;\r\n`;
      writeToFileProcess(destination, file);
    });
  }

  if (output.json.length) {
    logInfo(`TailwindCSS JSON output all themes...`);
    const options = output.json.filter((v) => v.destination) as OutputOptions;

    options.forEach(({ destination, absolute }) => {
      let tailwindConfig: TailwindConfig = {};
      tailwindConfig = merge(
        tailwindConfig,
        ...themeManagers.map((themeManager) =>
          themeManager.tailwindConfig(
            typeof absolute === 'boolean' ? absolute : globalAbsolute,
          ),
        ),
      );

      const file = `${JSON.stringify(tailwindConfig, null, 2)}\r\n`;
      writeToFileProcess(destination, file);
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
      if (
        config.output.all.css.length ||
        config.output.all.js.length ||
        config.output.all.json.length ||
        config.output.all.ts.length
      ) {
        outputAll(
          config.absolute,
          config.output.all,
          themeManagers.map((v) => v[1]),
        );
      }

      logInfo(`Successfully Generated!\n`);
    });
};
