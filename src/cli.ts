import { Command } from 'commander';
import { applyGenerateCommand } from './cli/generate';

const cli = new Command();

cli
  .name('@bruhabruh/theme')
  .version('1.0.0')
  .description('CLI for create Tailwind config and CSS for @bruhabruh/theme');

applyGenerateCommand(cli);

cli.parse();
