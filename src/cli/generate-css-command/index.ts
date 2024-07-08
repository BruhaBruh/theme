import { readConfig } from '@/config/read';
import { DesignTokens } from '@/design-tokens';
import { Command, Option } from 'commander';
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
        'theme.yaml',
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

      const designTokens = new DesignTokens(config);

      const css = designTokens.toCSS(options.spacing);

      if (options.type === 'console') {
        process.stdout.write('```css\n');
        process.stdout.write(css);
        process.stdout.write('```\n');
      }
      if (options.type === 'css') {
        writeToFile(options.output, css);
      }
    });
};
