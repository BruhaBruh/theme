import { loadThemes } from '@/config/load-themes';
import { readConfig } from '@/config/read-config';
import { ThemeManager } from '@/config/theme-manager';
import { TailwindConfig } from '@/types/tailwind';
import { Command, Option } from 'commander';
import { merge } from 'ts-deepmerge';
import { writeToFile } from '../write-to-file';

type Options = {
  config: string;
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
      const config = readConfig(options.config);

      const themesConfig = loadThemes(config);

      const themeManagers: ThemeManager[] = [];

      Object.entries(themesConfig.themes)
        .sort((a, b) => (a[1].dependencies.includes(b[0]) ? 1 : -1))
        .forEach(([themeName, themeConfig]) => {
          const themeManager = new ThemeManager(
            themeName,
            themesConfig.prefix,
            themeConfig,
          );
          themeManager.load(themesConfig.themes);

          themeManagers.push(themeManager);

          const outputConfig = themeConfig._output;
          if (outputConfig.css) {
            writeToFile(outputConfig.css, themeManager.css().join('\r\n'));
          }
          let tailwindConfig: TailwindConfig = {};
          if (outputConfig.js || outputConfig.ts || outputConfig.json) {
            tailwindConfig = themeManager.tailwindConfig();
          }
          if (outputConfig.js) {
            const file = `export const theme = ${JSON.stringify(tailwindConfig, null, 2)}\r\n`;
            writeToFile(outputConfig.js, file);
          }
          if (outputConfig.ts) {
            const file = `export const theme = ${JSON.stringify(tailwindConfig, null, 2)} as const\r\n`;
            writeToFile(outputConfig.ts, file);
          }
          if (outputConfig.json) {
            writeToFile(
              outputConfig.json,
              JSON.stringify(tailwindConfig, null, 2),
            );
          }
        });

      const outputConfig = config.output.all;
      if (outputConfig.css) {
        writeToFile(
          outputConfig.css,
          themeManagers
            .map((themeManager) => `${themeManager.css().join('\r\n')}\r\n`)
            .join('\r\n'),
        );
      }

      let tailwindConfig: TailwindConfig = {};
      if (outputConfig.js || outputConfig.ts || outputConfig.json) {
        tailwindConfig = merge(
          tailwindConfig,
          ...themeManagers.map((themeManager) => themeManager.tailwindConfig()),
        );
        if (outputConfig.js) {
          const file = `export const theme = ${JSON.stringify(tailwindConfig, null, 2)}\r\n`;
          writeToFile(outputConfig.js, file);
        }
        if (outputConfig.ts) {
          const file = `export const theme = ${JSON.stringify(tailwindConfig, null, 2)} as const\r\n`;
          writeToFile(outputConfig.ts, file);
        }
        if (outputConfig.json) {
          writeToFile(
            outputConfig.json,
            JSON.stringify(tailwindConfig, null, 2),
          );
        }
      }
    });
};
