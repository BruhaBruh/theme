import { readConfig } from '@/config/read';
import { generateThemesFromConfig } from '@/theme/generate-themes';
import { Command, Option } from 'commander';
import { writeToFile } from '../write-to-file';

type Options = {
  config: string;
  output: string;
  spacing: number;
  theme: string;
  type: 'console' | 'js' | 'ts';
};

export const applyGenerateThemeCommand = (cli: Command) => {
  cli
    .command('theme')
    .description('generate theme')
    .addOption(
      new Option('-c, --config <path>', 'path to config file').default(
        'theme.yaml',
      ),
    )
    .addOption(
      new Option('-o, --output <path>', 'output path').default(
        './.generated/theme.light.js',
      ),
    )
    .addOption(
      new Option('-s, --spacing <amount>', 'amount of spacing').default(2),
    )
    .addOption(
      new Option('-t, --type <type>', 'type to output')
        .choices(['console', 'js', 'ts'])
        .default('js'),
    )
    .addOption(
      new Option('-th, --theme <theme>', 'theme to generate').default('light'),
    )
    .action((options: Options) => {
      const config = readConfig(options.config);

      if (!Object.keys(config.themes).includes(options.theme)) {
        process.stderr.write(
          `theme ${options.theme} not found. available themes: ${Object.keys(config.themes).join(', ')}`,
        );
        return process.exit(1);
      }

      const theme = generateThemesFromConfig(config)[config.default];

      const json = JSON.stringify(theme, null, 2);

      if (options.type === 'console') {
        process.stdout.write('```js\n');
        process.stdout.write(`export const theme = ${json};\n`);
        process.stdout.write('```\n');
      }
      if (options.type === 'js') {
        writeToFile(options.output, `export const theme = ${json};`);
      }
      if (options.type === 'ts') {
        writeToFile(options.output, `export const theme = ${json} as const;`);
      }
    });
};
