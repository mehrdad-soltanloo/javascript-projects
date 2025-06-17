/**
 * Generates Pascal's Triangle up to n rows and prints it in a visually centered format.
 *
 * The triangle is built row-by-row according to the following rules:
 *   1. The first and last elements in each row are always 1.
 *   2. Each middle element is the sum of the two numbers directly above it:
 *      row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]
 *
 * After generating the triangle, each row is formatted into a padded string
 * so that the output visually resembles a triangle shape in the console.
 *
 * @param {number} n - The number of rows to generate.
 * @returns {number[][]} A 2D array representing Pascal's Triangle.
 *
 * Example output for rows(5):
 *     1
 *    1 1
 *   1 2 1
 *  1 3 3 1
 * 1 4 6 4 1
 */

const rows = (n) => {
  const triangle = [];

  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        row[j] = 1;
      }
      if (j !== 0 && j !== i) {
        row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
      }
    }
    triangle.push(row);
  }
  for (let i = 0; i < triangle.length; i++) {
    const row = triangle[i];
    const rowString = row.join(" ");
    const maxRowLength = triangle.length;
    const padding = maxRowLength - i - 1;
    const paddedRow = " ".repeat(padding) + rowString;
    console.log(paddedRow);
  }
  return triangle;
};
console.log(rows(5));
