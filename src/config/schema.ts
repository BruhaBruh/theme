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

const spacingSchema = z.record(z.string()).default({});

const zIndexSchema = z.record(z.number().or(z.string())).default({});

const refSchema = z
  .object({
    radius: radiusSchema,
    spacing: spacingSchema,
    'z-index': zIndexSchema,
  })
  .default({ radius: {}, spacing: {} });

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
    radius: radiusSchema,
    spacing: spacingSchema,
    'z-index': zIndexSchema,
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
      const spacing = themes[name].ref.spacing;
      const zIndex = themes[name].ref['z-index'];
      const otherThemes = names.filter((t) => t !== name);

      otherThemes.forEach((otherTheme) => {
        Object.keys(radius).forEach((variant) => {
          if (themes[otherTheme].ref.radius[variant]) return;

          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `theme(${otherTheme}) does not have ref.radius(${variant}) in ref.radius like theme(${name})`,
          });
        });

        Object.keys(spacing).forEach((variant) => {
          if (themes[otherTheme].ref.spacing[variant]) return;

          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `theme(${otherTheme}) does not have ref.spacing(${variant}) in ref.spacing like theme(${name})`,
          });
        });

        Object.keys(zIndex).forEach((variant) => {
          if (themes[otherTheme].ref['z-index'][variant]) return;

          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `theme(${otherTheme}) does not have ref.z-index(${variant}) in ref.z-index like theme(${name})`,
          });
        });
      });
    });
  })
  .superRefine((themes, ctx) => {
    const names = Object.keys(themes);

    names.forEach((name) => {
      const otherThemes = names.filter((t) => t !== name);

      const radius = themes[name].sys.radius;
      otherThemes.forEach((otherTheme) => {
        Object.keys(radius).forEach((variant) => {
          if (!themes[otherTheme].sys.radius[variant]) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `theme(${otherTheme}) does not have sys.radius(${variant}) in sys.radius like theme(${name})`,
            });
            return;
          }
        });
      });

      const spacing = themes[name].sys.spacing;
      otherThemes.forEach((otherTheme) => {
        Object.keys(spacing).forEach((variant) => {
          if (!themes[otherTheme].sys.spacing[variant]) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `theme(${otherTheme}) does not have sys.spacing(${variant}) in sys.spacing like theme(${name})`,
            });
            return;
          }
        });
      });

      const zIndex = themes[name].sys['z-index'];
      otherThemes.forEach((otherTheme) => {
        Object.keys(zIndex).forEach((variant) => {
          if (!themes[otherTheme].sys['z-index'][variant]) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `theme(${otherTheme}) does not have sys.z-index(${variant}) in sys.z-index like theme(${name})`,
            });
            return;
          }
        });
      });

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
