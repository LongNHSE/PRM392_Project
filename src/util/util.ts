export const printTable = (
  width: number,
  phrase: string,
  align: string,
  br: number,
): string => {
  let content = '';
  const padding = width - phrase.length;
  const paddingStr = ' '.repeat(padding);

  if (align === 'left') {
    content += phrase + paddingStr;
  } else {
    content += paddingStr + phrase;
  }
  if (br === 1) {
    content += '\n';
  }

  return content;
};

export const transpose = <T>(original: T[][]): T[][] => {
  // Check if the original array is empty or null
  if (!original || original.length === 0) {
    return [];
  }

  // Determine the dimensions of the original 2D array
  const originalRows = original.length;
  const originalCols = original[0].length;

  // Create a new 2D array with switched dimensions
  const transposed: T[][] = Array.from({ length: originalCols }, () => []);

  // Populate the transposed array
  for (let i = 0; i < originalRows; i++) {
    for (let j = 0; j < originalCols; j++) {
      transposed[j].push(original[i][j]);
    }
  }

  return transposed;
};
