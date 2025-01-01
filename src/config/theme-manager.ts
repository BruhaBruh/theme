import { CSS } from '@/types/css';
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
  #selector: string;
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
    this.#selector = Array.from(new Set(this.#config.selectors))
      .sort((a) => {
        if (a.startsWith(':')) {
          return 0;
        }
        if (a.startsWith('.')) {
          return 1;
        }
        if (a.startsWith('#')) {
          return 2;
        }
        if (a.startsWith('[data-')) {
          return 3;
        }
        return 4;
      })
      .join(', ');
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

  css(absolute: boolean): CSS {
    return this.#tokenManager.css(this.#selector, absolute);
  }

  tailwindCSS(absolute: boolean): CSS {
    return this.#tokenManager.tailwindCSS(this.#selector, absolute);
  }
}
