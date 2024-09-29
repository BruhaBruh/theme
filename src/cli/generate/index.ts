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

const writeFileProcess = (pathToFile: string, data: string): true => {
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
  themeName: string,
  themeManager: ThemeManager,
  outputConfig: ThemesConfig['themes'][string]['_output'],
) => {
  logInfo(`Output "${themeName}" theme...`);
  if (outputConfig.css) {
    logInfo(`CSS output "${themeName}" theme...`);
    writeFileProcess(outputConfig.css, themeManager.css().join('\r\n'));
  }
  let tailwindConfig: TailwindConfig = {};
  if (outputConfig.js || outputConfig.ts || outputConfig.json) {
    tailwindConfig = themeManager.tailwindConfig();
  }
  if (outputConfig.js) {
    logInfo(`TailwindCSS JS output "${themeName}" theme...`);
    const file = `export const theme = ${JSON.stringify(tailwindConfig, null, 2)}\r\n`;
    writeFileProcess(outputConfig.js, file);
  }
  if (outputConfig.ts) {
    logInfo(`TailwindCSS TS output "${themeName}" theme...`);
    const file = `export const theme = ${JSON.stringify(tailwindConfig, null, 2)} as const\r\n`;
    writeFileProcess(outputConfig.ts, file);
  }
  if (outputConfig.json) {
    logInfo(`TailwindCSS JSON output "${themeName}" theme...`);
    writeFileProcess(
      outputConfig.json,
      JSON.stringify(tailwindConfig, null, 2),
    );
  }
};

const outputThemes = (
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
    if (output.css || output.js || output.json || output.ts) {
      outputTheme(themeName.toString(), themeManger[1], output);
    }
  });
};

const outputAll = (
  output: Config['output']['all'],
  themeManagers: ThemeManager[],
) => {
  logInfo(`Output all themes...`);
  if (output.css) {
    logInfo(`CSS output all themes...`);
    writeToFile(
      output.css,
      themeManagers
        .map((themeManager) => `${themeManager.css().join('\r\n')}\r\n`)
        .join('\r\n'),
    );
  }

  let tailwindConfig: TailwindConfig = {};
  if (output.js || output.ts || output.json) {
    tailwindConfig = merge(
      tailwindConfig,
      ...themeManagers.map((themeManager) => themeManager.tailwindConfig()),
    );
    if (output.js) {
      logInfo(`TailwindCSS JS output all themes...`);
      const file = `export const theme = ${JSON.stringify(tailwindConfig, null, 2)}\r\n`;
      writeToFile(output.js, file);
    }
    if (output.ts) {
      logInfo(`TailwindCSS TS output all themes...`);
      const file = `export const theme = ${JSON.stringify(tailwindConfig, null, 2)} as const\r\n`;
      writeToFile(output.ts, file);
    }
    if (output.json) {
      logInfo(`TailwindCSS JSON output all themes...`);
      writeToFile(output.json, JSON.stringify(tailwindConfig, null, 2));
    }
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

      outputThemes(sortedThemes, themeManagers);
      if (
        config.output.all.css ||
        config.output.all.js ||
        config.output.all.json ||
        config.output.all.ts
      ) {
        outputAll(
          config.output.all,
          themeManagers.map((v) => v[1]),
        );
      }

      logInfo(`Successfully Generated!\n`);
    });
};
