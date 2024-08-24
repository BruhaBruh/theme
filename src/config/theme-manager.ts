import { cleanObject } from '@/lib/clean-object';
import { TailwindConfig, TailwindPluginApi } from '@/types/tailwind';
import { ThemeConfig } from './schema/theme-config';
import { ThemesConfig } from './schema/themes-config';
import { TokenManager } from './token-manager';

export class ThemeManager {
  #name: string;
  #prefix: string;
  #config: ThemeConfig;
  #globalTokenManager: TokenManager;
  #tokenManager: TokenManager;
  #isDependency = false;

  constructor(
    name: string,
    prefix: string,
    config: ThemeConfig,
    globalTokenManager = new TokenManager(prefix),
  ) {
    this.#name = name;
    this.#prefix = prefix;
    this.#config = config;
    this.#globalTokenManager = globalTokenManager;
    this.#tokenManager = new TokenManager(prefix);
    this.#tokenManager.applyGlobalTokenManager(globalTokenManager);
  }

  load(themes: ThemesConfig['themes'], dependedBy: string[] = []) {
    if (dependedBy.includes(this.#name)) {
      throw new Error(
        `dependency cycle detected: ${[...dependedBy, this.#name].join(' -> ')}`,
      );
    }

    this.#config.dependencies.forEach((name) => {
      if (!themes[name])
        throw new Error(`dependency theme ${name} is not found`);
      const dependencyThemeManager = new ThemeManager(
        name,
        this.#prefix,
        themes[name],
        this.#globalTokenManager,
      );
      dependencyThemeManager.#isDependency = true;
      dependencyThemeManager.load(themes, [...dependedBy, this.#name]);
    });

    if (this.#isDependency) {
      this.#globalTokenManager.load(this.#config);
    } else {
      this.#tokenManager.load(this.#config);
    }
  }

  css(): string[] {
    const lines: string[] = [];

    const [inSelector, outSelector] = this.#tokenManager.css();

    const selectors = Array.from(
      new Set([`.${this.#name}`, ...this.#config.selectors]),
    ).sort((a) => (a === ':root' ? -1 : 1));

    const tokens = inSelector.map((v) => `  ${v}`);

    const outTokens = ['', ...outSelector];

    lines.push(`${selectors.join(', ')} {`);
    lines.push(...tokens);
    lines.push(`}`);
    lines.push(outTokens.join('\r\n'));

    return lines;
  }

  applyTailwind(api: TailwindPluginApi): void {
    this.#tokenManager.applyTailwind(api);
  }

  tailwindConfig(): TailwindConfig {
    return cleanObject(
      this.#tokenManager.tailwindConfig(),
    ) as unknown as TailwindConfig;
  }
}
