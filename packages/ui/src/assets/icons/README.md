#Adding new icons
To add a new icon, follow these steps:

1. Go to the Figma file and export the icon as SVG.
2. Place the SVG file in the `packages/ui/src/assets/icons` directory in the right sub-directory if it's already there, or create a new sub-directory.
3. Convert the SVG file to a tsx file.
4. Wrap the SVG code in a `React.FC` component.
5. Convert any kebab-case attributes to camelCase.
6. Move the strokeWidth attribute to the main svg tag so it can easily be changed through css.
7. Change width and height to 1em so it can be changed via the font-size property.
8. change the stroke attribute to currentColor so it can be changed via the color property.
9. Import the icon in the `packages/ui/src/components/Icon/index.ts` file and add it to the `icons` object.