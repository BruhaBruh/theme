# @bruhabruh/theme

## CLI Usage

TailwindCSS

```
npx @bruhabruh/theme tailwind -o tailwind.json -c bruhabruh.theme.json -s 2
```

CSS

```
npx @bruhabruh/theme css -o theme.css -s 2
```

## Default config

```json
{
  "defaultTheme": "light",
  "base": {
    "radius": "0.75rem",
    "palette": {
      "white": "#ffffff",
      "black": "#101523",
      "blue": "#3b82f6",
      "green": "#22c55e",
      "yellow": "#eab308",
      "red": "#ef4444"
    },
    "system": {
      "color": {}
    },
    "options": {
      "withoutRadius": true,
      "withoutPalette": true
    }
  },
  "themes": {
    "light": {
      "system": {
        "color": {
          "text": {
            "foreground": "$ref.color.black.1000",
            "onPrimary": "$ref.color.white.1000",
            "secondary": "$ref.color.black.900",
            "onSecondary": "$ref.color.black.1000",
            "info": "$ref.color.blue.900",
            "onInfo": "$ref.color.white.1000",
            "onInfoSubdued": "$ref.color.black.1000",
            "success": "$ref.color.green.1000",
            "onSuccess": "$ref.color.black.1000",
            "onSuccessSubdued": "$ref.color.black.1000",
            "caution": "$ref.color.yellow.1000",
            "onCaution": "$ref.color.black.1000",
            "onCautionSubdued": "$ref.color.black.1000",
            "critical": "$ref.color.red.900",
            "onCritical": "$ref.color.black.1000",
            "onCriticalSubdued": "$ref.color.black.1000",
            "disabled": "$ref.color.black.700",
            "onDisabled": "$ref.color.black.700"
          },
          "background": {
            "background": "$ref.color.white.1000",
            "primary": "$ref.color.black.1000",
            "primaryHover": "$ref.color.black.950",
            "secondary": "$ref.color.black.50",
            "secondaryHover": "$ref.color.black.100",
            "info": "$ref.color.blue.800",
            "infoHover": "$ref.color.blue.900",
            "infoSubdued": "$ref.color.blue.300",
            "infoSubduedHover": "$ref.color.blue.400",
            "success": "$ref.color.green.700",
            "successHover": "$ref.color.green.800",
            "successSubdued": "$ref.color.green.300",
            "successSubduedHover": "$ref.color.green.400",
            "caution": "$ref.color.yellow.700",
            "cautionHover": "$ref.color.yellow.800",
            "cautionSubdued": "$ref.color.yellow.300",
            "cautionSubduedHover": "$ref.color.yellow.400",
            "critical": "$ref.color.red.700",
            "criticalHover": "$ref.color.red.800",
            "criticalSubdued": "$ref.color.red.300",
            "criticalSubduedHover": "$ref.color.red.400",
            "disabled": "$ref.color.black.200"
          },
          "border": {
            "primary": "$ref.color.black.300",
            "secondary": "$ref.color.black.200",
            "info": "$ref.color.blue.400",
            "success": "$ref.color.green.400",
            "caution": "$ref.color.yellow.400",
            "critical": "$ref.color.red.400",
            "disabled": "$ref.color.black.100"
          },
          "ring": {
            "primary": "$ref.color.black.300",
            "secondary": "$ref.color.black.200",
            "info": "$ref.color.blue.400",
            "success": "$ref.color.green.400",
            "caution": "$ref.color.yellow.400",
            "critical": "$ref.color.red.400",
            "disabled": "$ref.color.black.100"
          },
          "outline": {
            "primary": "$ref.color.black.300",
            "secondary": "$ref.color.black.200",
            "info": "$ref.color.blue.400",
            "success": "$ref.color.green.400",
            "caution": "$ref.color.yellow.400",
            "critical": "$ref.color.red.400",
            "disabled": "$ref.color.black.100"
          }
        }
      }
    },
    "dark": {
      "system": {
        "color": {
          "text": {
            "foreground": "$ref.color.white.1000",
            "onPrimary": "$ref.color.black.1000",
            "secondary": "$ref.color.white.800",
            "onSecondary": "$ref.color.white.1000",
            "info": "$ref.color.blue.700",
            "onInfo": "$ref.color.white.1000",
            "onInfoSubdued": "$ref.color.white.1000",
            "success": "$ref.color.green.700",
            "onSuccess": "$ref.color.black.1000",
            "onSuccessSubdued": "$ref.color.white.1000",
            "caution": "$ref.color.yellow.700",
            "onCaution": "$ref.color.black.1000",
            "onCautionSubdued": "$ref.color.white.1000",
            "critical": "$ref.color.red.700",
            "onCritical": "$ref.color.black.1000",
            "onCriticalSubdued": "$ref.color.white.1000",
            "disabled": "$ref.color.white.600",
            "onDisabled": "$ref.color.white.700"
          },
          "background": {
            "background": "$ref.color.black.1000",
            "primary": "$ref.color.white.1000",
            "primaryHover": "$ref.color.white.950",
            "secondary": "$ref.color.white.50",
            "secondaryHover": "$ref.color.white.100",
            "info": "$ref.color.blue.800",
            "infoHover": "$ref.color.blue.900",
            "infoSubdued": "$ref.color.blue.300",
            "infoSubduedHover": "$ref.color.blue.400",
            "success": "$ref.color.green.700",
            "successHover": "$ref.color.green.800",
            "successSubdued": "$ref.color.green.300",
            "successSubduedHover": "$ref.color.green.400",
            "caution": "$ref.color.yellow.700",
            "cautionHover": "$ref.color.yellow.800",
            "cautionSubdued": "$ref.color.yellow.300",
            "cautionSubduedHover": "$ref.color.yellow.400",
            "critical": "$ref.color.red.700",
            "criticalHover": "$ref.color.red.800",
            "criticalSubdued": "$ref.color.red.300",
            "criticalSubduedHover": "$ref.color.red.400",
            "disabled": "$ref.color.white.200"
          },
          "border": {
            "primary": "$ref.color.white.300",
            "secondary": "$ref.color.white.200",
            "info": "$ref.color.blue.400",
            "success": "$ref.color.green.400",
            "caution": "$ref.color.yellow.400",
            "critical": "$ref.color.red.400",
            "disabled": "$ref.color.white.100"
          },
          "ring": {
            "primary": "$ref.color.white.300",
            "secondary": "$ref.color.white.200",
            "info": "$ref.color.blue.400",
            "success": "$ref.color.green.400",
            "caution": "$ref.color.yellow.400",
            "critical": "$ref.color.red.400",
            "disabled": "$ref.color.white.100"
          },
          "outline": {
            "primary": "$ref.color.white.300",
            "secondary": "$ref.color.white.200",
            "info": "$ref.color.blue.400",
            "success": "$ref.color.green.400",
            "caution": "$ref.color.yellow.400",
            "critical": "$ref.color.red.400",
            "disabled": "$ref.color.white.100"
          }
        }
      }
    }
  }
}
```
