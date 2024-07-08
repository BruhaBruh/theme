import { readConfig } from '@/config/read';
import { DesignTokens } from '@/design-tokens';
import { Command, Option } from 'commander';
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
        'theme.yaml',
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

      const tokens = new DesignTokens(config);

      const tailwind = tokens.toTailwind();

      const json = JSON.stringify(tailwind, null, options.spacing);

      if (options.type === 'console') {
        process.stdout.write('```json\n');
        process.stdout.write(`${json}\n`);
        process.stdout.write('```\n');
      }
      if (options.type === 'json') {
        writeToFile(options.output, json);
      }
      if (options.type === 'js') {
        writeToFile(options.output, `export const theme = ${json};`);
      }
      if (options.type === 'ts') {
        writeToFile(options.output, `export const theme = ${json} as const;`);
      }
    });
};
