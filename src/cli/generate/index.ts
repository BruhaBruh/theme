import { configExecutor } from '@/config/config-executor';
import { readConfig } from '@/config/read-config';
import { clearScreen, logError, logInfo } from '@/lib/logging';
import { Command, Option } from 'commander';

type Options = {
  config: string;
};

const readConfigProcess = (config: string): unknown => {
  logInfo('Read config...');
  const configResult = readConfig(config);
  if (configResult.isErr()) {
    const error = configResult.unwrapErr();
    logError(
      'Fail read config: ',
      '\n\t',
      typeof error === 'string' ? error : JSON.stringify(error),
    );
    return process.exit(0);
  }
  return configResult.unwrap();
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
      const config = readConfigProcess(options.config);

      const executor = configExecutor(config, {
        logError,
        logInfo,
        clearScreen,
      });

      executor.execute();
    });
};
