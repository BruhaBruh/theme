import { Config, ThemeConfig } from '@/types/config';
import { TailwindConfig } from '@/types/tailwind';
import { ThemeDesignTokens } from './theme';

export class DesignTokens<T extends Config> {
  readonly #config: T;
  readonly #themes: Record<
    string,
    ThemeDesignTokens<T, string, ThemeConfig<T, string>>
  >;

  constructor(config: T) {
    this.#config = config;
    this.#themes = this.generateThemes();
  }

  get config(): T {
    return this.#config;
  }

  get themes(): Record<
    string,
    ThemeDesignTokens<T, string, ThemeConfig<T, string>>
  > {
    return this.#themes;
  }

  toCSS(spacing: number): string {
    const lines: string[] = [];

    const keys = Object.keys(this.themes);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const theme = this.themes[key];
      const isLatest = i === keys.length - 1;
      lines.push(...theme.toCSS(spacing));
      if (!isLatest) {
        lines.push('');
      }
    }

    return lines.join('\n');
  }

  toTailwind(): TailwindConfig['theme'] {
    const theme = this.themes[this.config.default];

    return {
      ...theme.tailwind,
    };
  }

  private generateThemes() {
    const themes = {} as Record<
      string,
      ThemeDesignTokens<T, string, ThemeConfig<T, string>>
    >;

    const keys = Object.keys(this.config.themes);

    for (let i = 0; i < keys.length; i++) {
      const themeName = keys[i];
      const themeConfig = this.config.themes[themeName] as ThemeConfig<
        T,
        string
      >;
      themes[themeName] = new ThemeDesignTokens(
        this.config,
        themeName,
        themeConfig,
      );
    }

    return themes;
  }
}
