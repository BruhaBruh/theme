import { generateThemeTailwindJson as generateThemeTailwindJSON } from '@/theme';
import { Command, Option } from 'commander';
import { readConfig } from '../read-config';
import { writeToFile } from '../write-to-file';

type Options = {
  config: string;
  output?: string;
  spacing: number;
};

export const applyGenerateTailwindCommand = (cli: Command) => {
  cli
    .command('tailwind')
    .description('generate tailwind')
    .addOption(
      new Option('-c, --config <path>', 'path to config file').default(
        'bruhabruh.theme.json',
      ),
    )
    .addOption(new Option('-o, --output <path>', 'output path'))
    .addOption(
      new Option('-s, --spacing <amount>', 'amount of spacing').default(2),
    )
    .action((options: Options) => {
      const config = readConfig(options.config);

      const theme = generateThemeTailwindJSON(config, options.spacing);

      if (options.output) {
        writeToFile(options.output, theme);
      } else {
        process.stdout.write('```json\n');
        process.stdout.write(`${theme}\n`);
        process.stdout.write('```\n');
      }
    });
};
