import plugin from 'tailwindcss/plugin';
import { configExecutor } from './config/config-executor';
import { Config } from './config/schema/config';

export const themePlugin = plugin.withOptions<Config>(
  (config) => {
    const executor = configExecutor(config);
    return (api) => executor.applyTailwind(api);
  },
  (config) => {
    const executor = configExecutor(config);
    return {
      theme: executor.tailwindConfig(),
    };
  },
);
