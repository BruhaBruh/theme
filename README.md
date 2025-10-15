# @bruhabruh/theme

## CLI Usage

TailwindCSS

```bash
npx @bruhabruh/theme tailwind -o tailwind.json -c bruhabruh.theme.json -s 2
```

CSS

```bash
npx @bruhabruh/theme css -o theme.css -s 2
```

## Example config

```yaml
default: light
prefix: pw
content: ./themes/*.theme.yaml
output:
  all:
    css: ./.generated/theme.css
    json: ./.generated/theme.json

  themes:
    light:
      css: ./.generated/theme.light.css

    dark:
      css: ./.generated/theme.dark.css
```
