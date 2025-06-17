## Feynman Explanation of Pascal's Triangle Function

### What the Program Does

This program generates a triangle of numbers known as **Pascal's Triangle**.
We write a function that returns `N` rows of Pascal's Triangle based on two main rules:

- **Rule #1**: The first and last numbers of each row are always `1`.
- **Rule #2**: Any number between the first and last is the **sum of the two numbers above it** — specifically, the number directly above-left and directly above-right.

Example:

```
Row 0:           1
Row 1:         1   1
Row 2:       1   2   1
Row 3:     1   3   3   1
Row 4:   1   4   6   4   1
```

### Building Row by Row

To build the 4th row (i = 4), we look at the 3rd row:
`1 3 3 1`

Now we calculate the middle numbers:

- `1 + 3 = 4`
- `3 + 3 = 6`
- `3 + 1 = 4`

Wrap the results with 1s: `1 4 6 4 1`

### Now Let's Write the Function

```js
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
  return triangle;
};
```

### Step-by-Step Walkthrough

#### Step 1: Set up the function and triangle container

We define a function named `rows(n)`, which receives a number `n`, meaning how many rows we want to build. Inside, we initialize an empty array `triangle` to store the whole structure.

#### Step 2: Loop to Create Each Row

The outer loop: `for (let i = 0; i < n; i++)` runs once per row.
Each time, we initialize an empty array `row` to hold the numbers of the current row.

#### Step 3: Inner Loop for Column Positions

The inner loop: `for (let j = 0; j <= i; j++)` runs for every position in the current row. Each row has exactly `i + 1` elements.

#### Step 4: Apply Rule #1 (Edge Values)

```js
if (j === 0 || j === i) {
  row[j] = 1;
}
```

If we're at the first or last index in the row, the value is `1`.

#### Step 5: Apply Rule #2 (Middle Values)

```js
if (j !== 0 && j !== i) {
  row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
}
```

##### Expanded Formula Breakdown

This is the most important part of the logic:

- `triangle[i - 1]` gives us access to the **row directly above** the one we're currently building.
- `triangle[i - 1][j - 1]` accesses the number that is **diagonally above-left** from the current cell.
- `triangle[i - 1][j]` accesses the number that is **directly above-right** from the current cell.
- Adding these two values gives us the number that belongs in the current position `j` of the new row:

Mathematically:

```
CurrentRow[j] = PreviousRow[j - 1] + PreviousRow[j]
```

Example:
When building Row 4 (i = 4), and filling the second value (j = 1):

- triangle\[3] = \[1, 3, 3, 1]
- triangle\[3]\[0] = 1
- triangle\[3]\[1] = 3
- So row\[1] = 1 + 3 = 4

Continue this logic:

- row\[2] = triangle\[3]\[1] + triangle\[3]\[2] = 3 + 3 = 6
- row\[3] = triangle\[3]\[2] + triangle\[3]\[3] = 3 + 1 = 4

Put together with sides:
`[1, 4, 6, 4, 1]`

This is how we populate the middle values in every row of Pascal's Triangle, by "looking back" at the structure we already built.

#### Step 6: Store the Row

We push the fully built `row` array into `triangle`:

```js
triangle.push(row);
```

#### Step 7: Return Final Result

After the loop finishes, we return the complete triangle:

```js
return triangle;
```

### Final Thoughts

- The outer loop creates each row.
- The inner loop fills each row’s values using Pascal’s rules.
- Edge values are always `1`.
- Middle values are calculated from the two numbers above.
