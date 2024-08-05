export function kebabCaseToTitleCase(color) {
  const colorWithSpaces = color.split('-');
  const capitalizedColors = colorWithSpaces.map(
    (color) => color[0].toUpperCase() + color.slice(1)
  );
  const finalString = capitalizedColors.join(' ');
  return finalString;
}
