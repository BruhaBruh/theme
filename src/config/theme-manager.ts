import { cleanObject } from '@/lib/clean-object';
import { TailwindConfig, TailwindPluginApi } from '@/types/tailwind';
import { Err, Ok, Result } from '@bruhabruh/type-safe';
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

  load(
    themes: ThemesConfig['themes'],
    dependedBy: string[] = [],
  ): Result<true, string> {
    if (dependedBy.includes(this.#name)) {
      return Err(
        `Dependency cycle detected: ${[...dependedBy, this.#name].join(' -> ')}`,
      );
    }

    for (let i = 0; i < this.#config.dependencies.length; i++) {
      const name = this.#config.dependencies[i];
      if (!themes[name]) return Err(`Dependency theme "${name}" is not found`);
      const dependencyThemeManager = new ThemeManager(
        name,
        this.#prefix,
        themes[name],
        this.#globalTokenManager,
      );
      dependencyThemeManager.#isDependency = true;
      const loadResult = dependencyThemeManager.load(themes, [
        ...dependedBy,
        this.#name,
      ]);
      if (loadResult.isErr()) {
        return loadResult.mapErr(
          (err) => `Load dependency theme "${name}" failed: ${err}`,
        );
      }
    }

    if (this.#isDependency) {
      const loadResult = this.#globalTokenManager.load(this.#config);
      if (loadResult.isErr()) {
        return loadResult.mapErr(
          (err) => `Load global token manager failed: ${err}`,
        );
      }
    } else {
      const loadResult = this.#tokenManager.load(this.#config);
      if (loadResult.isErr()) {
        return loadResult.mapErr((err) => `Load token manager failed: ${err}`);
      }
    }

    return Ok(true);
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
    const [inSelector] = this.#tokenManager.css();

    const selectors = Array.from(
      new Set([`.${this.#name}`, ...this.#config.selectors]),
    ).sort((a) => (a === ':root' ? -1 : 1));

    const tokens: Record<string, string> = {};

    inSelector.forEach((token) => {
      const [key, ...value] = token.split(':');

      tokens[key] = value.join(':');
    });

    api.addBase({
      [selectors.join(', ')]: tokens,
    });

    this.#tokenManager.applyTailwind(api);
  }

  tailwindConfig(): TailwindConfig {
    return cleanObject(
      this.#tokenManager.tailwindConfig(),
    ) as unknown as TailwindConfig;
  }
}
