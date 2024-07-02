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

## Example config

```yaml
default: light
prefix: pw

themes:
  light:
    radius: 0.75rem

    palette:
      white: '#ffffff'
      black: '#101523'
      blue: '#3b82f6'

    ref:
      radius:
        none: 0px
        sm: calc(${radius} - 2px)
        base: ${radius}
        md: calc(${radius} + 2px)
        lg: calc(${radius} + 4px)
        xl: calc(${radius} + 8px)
        2xl: calc(${radius} + 12px)
        3xl: calc(${radius} + 20px)
        full: 9999px

    sys:
      color:
        border:
          primary: ${black.300}
          secondary: ${black.200}
          info: ${blue.400}
          disabled: ${black.100}

  dark:
    radius: 0.75rem

    palette:
      white: '#ffffff'
      black: '#101523'
      blue: '#3b82f6'

    ref:
      radius:
        none: 0px
        sm: calc(${radius} - 2px)
        base: ${radius}
        md: calc(${radius} + 2px)
        lg: calc(${radius} + 4px)
        xl: calc(${radius} + 8px)
        2xl: calc(${radius} + 12px)
        3xl: calc(${radius} + 20px)
        full: 9999px

    sys:
      color:
        border:
          primary: ${black.300}
          secondary: ${black.200}
          info: ${blue.400}
          disabled: ${black.100}
```
