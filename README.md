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
      "blue": "#2f57c6",
      "green": "#2fc654",
      "yellow": "#d8ca2c",
      "red": "#d82c2c"
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
          "foreground": {
            "": "$ref.color.black.1000",
            "onPrimary": "$ref.color.white.1000",
            "secondary": "$ref.color.black.600",
            "onSecondary": "$ref.color.black.1000",
            "disabled": "$ref.color.black.500",
            "onDisabled": "$ref.color.black.700"
          },
          "background": {
            "": "$ref.color.white.1000",
            "primary": "$ref.color.black.1000",
            "primaryHover": "$ref.color.black.900",
            "secondary": "$ref.color.black.50",
            "secondaryHover": "$ref.color.black.100",
            "disabled": "$ref.color.black.100"
          },
          "border": {
            "": "$ref.color.black.300",
            "secondary": "$ref.color.black.200",
            "disabled": "$ref.color.black.100"
          }
        }
      }
    },
    "dark": {
      "system": {
        "color": {
          "foreground": {
            "": "$ref.color.white.1000",
            "onPrimary": "$ref.color.black.1000",
            "secondary": "$ref.color.white.600",
            "onSecondary": "$ref.color.white.1000",
            "disabled": "$ref.color.white.500",
            "onDisabled": "$ref.color.white.700"
          },
          "background": {
            "": "$ref.color.black.1000",
            "primary": "$ref.color.white.1000",
            "primaryHover": "$ref.color.white.900",
            "secondary": "$ref.color.white.50",
            "secondaryHover": "$ref.color.white.100",
            "disabled": "$ref.color.white.100"
          },
          "border": {
            "": "$ref.color.white.300",
            "secondary": "$ref.color.white.200",
            "disabled": "$ref.color.white.100"
          }
        }
      }
    }
  }
}
```
