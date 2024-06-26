import { Command } from 'commander';
import { applyGenerateCSSCommand } from './cli/generate-css-command';
import { applyGenerateTailwindCommand } from './cli/generate-tailwind-command';

const cli = new Command();

cli
  .name('@bruhabruh/theme')
  .version('1.0.0')
  .description('CLI for create Tailwind config and CSS for @bruhabruh/theme');

applyGenerateCSSCommand(cli);

applyGenerateTailwindCommand(cli);

cli.parse();
