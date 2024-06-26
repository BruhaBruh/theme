import { configToCSS } from '@/config/to-css';
import { Command, Option } from 'commander';
import { readConfig } from '../read-config';
import { writeToFile } from '../write-to-file';

type Options = {
  config: string;
  output: string;
  spacing: number;
  type: 'console' | 'css';
};

export const applyGenerateCSSCommand = (cli: Command) => {
  cli
    .command('css')
    .description('generate css')
    .addOption(
      new Option('-c, --config <path>', 'path to config file').default(
        'bruhabruh.theme.json',
      ),
    )
    .addOption(
      new Option('-o, --output <path>', 'output path').default(
        './.generated/theme.css',
      ),
    )
    .addOption(
      new Option('-s, --spacing <amount>', 'amount of spacing').default(2),
    )
    .addOption(
      new Option('-t, --type <type>', 'type to output')
        .choices(['console', 'css'])
        .default('css'),
    )
    .action((options: Options) => {
      const config = readConfig(options.config);

      const theme = configToCSS(config, options.spacing);

      if (options.type === 'console') {
        process.stdout.write('```css\n');
        process.stdout.write(`${theme}\n`);
        process.stdout.write('```\n');
      }
      if (options.type === 'css') {
        writeToFile(options.output, theme);
      }
    });
};
