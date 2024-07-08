import { z } from 'zod';

const paletteSchema = z
  .record(
    z
      .string()
      .or(
        z.object({
          darkenRatio: z.number().default(25),
          source: z.string(),
        }),
      )
      .or(z.record(z.string())),
  )
  .default({});

const radiusSchema = z.record(z.string()).default({});

const refSchema = z
  .object({
    radius: radiusSchema,
  })
  .default({ radius: {} });

const sysSchema = z
  .object({
    color: z
      .object({
        text: z.record(z.string()).default({}),
        background: z.record(z.string()).default({}),
        border: z.record(z.string()).default({}),
        ring: z.record(z.string()).default({}),
        outline: z.record(z.string()).default({}),
      })
      .default({}),
  })
  .default({ color: {} });

const themeSchema = z.object({
  radius: z.string().default('0.5rem'),
  palette: paletteSchema,
  ref: refSchema,
  sys: sysSchema,
});

const themesSchema = z
  .record(themeSchema)
  .superRefine((themes, ctx) => {
    const names = Object.keys(themes);

    names.forEach((name) => {
      const palette = themes[name].palette;
      const otherThemes = names.filter((t) => t !== name);

      otherThemes.forEach((otherTheme) => {
        Object.keys(palette).forEach((color) => {
          const paletteColor = palette[color];
          if (!themes[otherTheme].palette[color]) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `theme(${otherTheme}) does not have color(${color}) in palette like theme(${name})`,
            });
            return;
          }
          if (
            typeof paletteColor !== typeof themes[otherTheme].palette[color]
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `theme(${otherTheme}) must be same type(${typeof paletteColor}) of color(${color}) in palette like theme(${name})`,
            });
            return;
          }
          if (typeof paletteColor === 'string') return;
          if (
            'darkenRatio' in paletteColor &&
            'source' in paletteColor &&
            Object.keys(paletteColor).length === 2
          )
            return;

          const otherColor = themes[otherTheme].palette[color] as Record<
            string,
            string
          >;
          Object.keys(palette[color]).forEach((variant) => {
            if (otherColor[variant]) return;
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `theme(${otherTheme}) does not have color(${color}.${variant}) in palette like theme(${name})`,
            });
          });
        });
      });
    });
  })
  .superRefine((themes, ctx) => {
    const names = Object.keys(themes);

    names.forEach((name) => {
      const radius = themes[name].ref.radius;
      const otherThemes = names.filter((t) => t !== name);

      otherThemes.forEach((otherTheme) => {
        Object.keys(radius).forEach((variant) => {
          if (themes[otherTheme].ref.radius[variant]) return;

          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `theme(${otherTheme}) does not have ref.radius(${variant}) in ref.radius like theme(${name})`,
          });
        });
      });
    });
  })
  .superRefine((themes, ctx) => {
    const names = Object.keys(themes);

    names.forEach((name) => {
      const otherThemes = names.filter((t) => t !== name);

      const textColor = themes[name].sys.color.text;
      otherThemes.forEach((otherTheme) => {
        Object.keys(textColor).forEach((variant) => {
          if (!themes[otherTheme].sys.color.text[variant]) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `theme(${otherTheme}) does not have sys.color.text(${variant}) in sys.color.text like theme(${name})`,
            });
            return;
          }
        });
      });

      const backgroundColor = themes[name].sys.color.background;
      otherThemes.forEach((otherTheme) => {
        Object.keys(backgroundColor).forEach((variant) => {
          if (!themes[otherTheme].sys.color.background[variant]) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `theme(${otherTheme}) does not have sys.color.background(${variant}) in sys.color.background like theme(${name})`,
            });
            return;
          }
        });
      });

      const borderColor = themes[name].sys.color.border;
      otherThemes.forEach((otherTheme) => {
        Object.keys(borderColor).forEach((variant) => {
          if (!themes[otherTheme].sys.color.border[variant]) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `theme(${otherTheme}) does not have sys.color.border(${variant}) in sys.color.border like theme(${name})`,
            });
            return;
          }
        });
      });

      const outlineColor = themes[name].sys.color.outline;
      otherThemes.forEach((otherTheme) => {
        Object.keys(outlineColor).forEach((variant) => {
          if (!themes[otherTheme].sys.color.outline[variant]) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `theme(${otherTheme}) does not have sys.color.outline(${variant}) in sys.color.outline like theme(${name})`,
            });
            return;
          }
        });
      });

      const ringColor = themes[name].sys.color.ring;
      otherThemes.forEach((otherTheme) => {
        Object.keys(ringColor).forEach((variant) => {
          if (!themes[otherTheme].sys.color.ring[variant]) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `theme(${otherTheme}) does not have sys.color.ring(${variant}) in sys.color.ring like theme(${name})`,
            });
            return;
          }
        });
      });
    });
  });

export const configSchema = z
  .object({
    default: z.string(),
    prefix: z.string().default(''),
    themes: themesSchema,
  })
  .superRefine((cfg, ctx) => {
    if (Object.keys(cfg.themes).includes(cfg.default)) return;
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `default theme(${cfg.default}) not found in themes(${Object.keys(cfg.themes).join(', ')})`,
    });
  });
