import { readConfig } from '@/config/read';
import { DesignTokens } from '@/design-tokens';
import { ThemeDesignTokens } from '@/design-tokens/theme';
import { Config } from '@/types/config';
import { Command, Option } from 'commander';
import { writeToFile } from '../write-to-file';

type Options = {
  config: string;
};

const outputAll = (
  config: Config['output']['all'],
  designTokens: DesignTokens<Config>,
) => {
  if (config.css) {
    const css = designTokens.toCSS(2);
    writeToFile(config.css, css);
  }

  const json = JSON.stringify(designTokens.toTailwind(), null, 2);
  if (config.json) {
    writeToFile(config.json, json);
  }
  if (config.js) {
    writeToFile(config.js, `export const theme = ${json};`);
  }
  if (config.ts) {
    writeToFile(config.ts, `export const theme = ${json} as const;`);
  }
};

const outputTheme = (
  config: Config['output']['themes'][string],
  designTokens: ThemeDesignTokens,
) => {
  if (config.css) {
    const css = designTokens.toCSS(2).join('\n');
    writeToFile(config.css, css);
  }

  const json = JSON.stringify(designTokens.tailwind, null, 2);
  if (config.json) {
    writeToFile(config.json, json);
  }
  if (config.js) {
    writeToFile(config.js, `export const theme = ${json};`);
  }
  if (config.ts) {
    writeToFile(config.ts, `export const theme = ${json} as const;`);
  }
};

export const applyGenerateCommand = (cli: Command) => {
  cli
    .command('generate')
    .description('generate')
    .addOption(
      new Option('-c, --config <path>', 'path to config file').default(
        'theme.yaml',
      ),
    )
    .action((options: Options) => {
      const config = readConfig(options.config);

      const designTokens = new DesignTokens(config);

      outputAll(config.output.all, designTokens);

      const themes = Object.keys(designTokens.themes);

      themes.forEach((theme) => {
        if (!config.output.themes[theme]) return;
        outputTheme(config.output.themes[theme], designTokens.themes[theme]);
      });
    });
};
