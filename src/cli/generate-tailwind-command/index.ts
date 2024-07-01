import { configToTailwind } from '@/config/to-tailwind';
import { Command, Option } from 'commander';
import { readConfig } from '../read-config';
import { writeToFile } from '../write-to-file';

type Options = {
  config: string;
  output: string;
  spacing: number;
  type: 'console' | 'json' | 'js' | 'ts';
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
    .addOption(
      new Option('-o, --output <path>', 'output path').default(
        './.generated/theme.json',
      ),
    )
    .addOption(
      new Option('-s, --spacing <amount>', 'amount of spacing').default(2),
    )
    .addOption(
      new Option('-t, --type <type>', 'type to output')
        .choices(['console', 'json', 'js', 'ts'])
        .default('json'),
    )
    .action((options: Options) => {
      const config = readConfig(options.config);

      const theme = configToTailwind(config, options.spacing);

      if (options.type === 'console') {
        process.stdout.write('```json\n');
        process.stdout.write(`${theme}\n`);
        process.stdout.write('```\n');
      }
      if (options.type === 'json') {
        writeToFile(options.output, theme);
      }
      if (options.type === 'ts' || options.type === 'js') {
        writeToFile(options.output, `export const theme = ${theme};`);
      }
    });
};
