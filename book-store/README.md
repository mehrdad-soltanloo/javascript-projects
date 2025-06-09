# Book store promotion app

Imagine you walked into a bookstore. There is a famous book series with 5 different books.
Each book in the series will normally cost \$8 (or 800 cents).
The store wants to sell more books, so they offer special discount if you buy different books together.

## Bokstore discount rules

You can get a discount only when you buy different books together in a group:

| Number of **unique books** | Discount You Get | Each Book Costs | Total for Group |
| -------------------------- | ---------------- | --------------- | --------------- |
| 1 book                     | No discount      | \$8.00          | \$8.00          |
| 2 different books          | 5% off           | \$7.60 each     | \$15.20         |
| 3 different books          | 10% off          | \$7.20 each     | \$21.60         |
| 4 different books          | 20% off          | \$6.40 each     | \$25.60         |
| 5 different books          | 25% off          | \$6.00 each     | \$30.00         |

NOTE: If you buy two of the same book, only one can go in a discounted group. The other one either goes into another group or stays full price.

Example:
Let's say you buy these books:

- 2 copies of Book 1
- 2 copies of Book 2
- 2 copies of Book 3
- 1 copy of Book 4
- 1 copy of Book 5

That's total 8 books. But some books repeat. You can't put both copies in the same group (because it's the rule, each group MUST have unique books, not repeated).

Now we have two different ways to group the books you bought:

Option 1: A group of 5 books + A group of 3 books
Now based on discount table:

- Group 1: Books 1, 2, 3, 4, 5 → 25%
- Group 2: Books 1, 2, 3 → 10% off

Total price = \$30.00 + \$21.60 = \$51.60

🔹 Option 2: Two Groups of 4
Group 1: Books 1, 2, 3, 4 → 20% off
Group 2: Books 1, 2, 3, 5 → 20% off

Total price = \$25.60 + \$25.60 = \$51.20

✨ Bingo! This grouping is cheaper!
So the goal of the problem is to figure out the best possible grouping to save the most money.

What should our function do?
We need to write a function that:

- Takes a list of book numbers (counts, amounts) like \[1, 1, 2, 2, 3, 3, 4, 5]
- Figures out the best way to split these into discounted groups
- Calculates the lowest total cost in cents (e.g. 5120 cents = \$51.20)

What is the real challenge?
It's not just about applying discount. It's about “How do you group the books in a way that gives the biggest discount?”
Just because a group of 5 looks like the best idea doesn’t mean it actually is. Sometimes two groups of 4 give more discount than a 5 and a 3.

Your function must be smart enough to try different groupings, and choose the best one.

What is our program supposed to do?
We need a program that:

1. Takes a list of books we want to buy
2. Figures out how to group them to get the best discount
3. Calculates the total price, as cheap as possible
4. Returns the price in cents (because money is calculated in cents here)

So the first question is: How do I even begin building this machine?

How to think about function planning?
We still don’t know:

- How many functions we should write?
- Why are they needed?
- Or in what order to write them in?

Imagine you are building a bookstore robot.

- You give it a basket of books.
- You want it to figure out the best way to group them
- Then you want it to calculate the cheapest price possible

That's too much for one robot to do in one brain.
So you hire 4 smaller helper robots (functions). Each one is responsible for one job. In this way, if someday a robot needs updating or fixing, we can fix it easier because 4 simpler robots are easier to fix than one complex one.

What are the big jobs in our program?
How do we figure out which helper function to build? By thinking about steps in solving the problem (called algorithm).

Let's try to list the roles first:

- cost(): the main boss - receives the books and starts everything. Comes first logically but written last.
- totalCost() - the calculator brain - figures out total price using other helpers - needs to be ready before boss can call it.
- buildGroup() - the organizer - creates groups of different books as we explained earlier - needs to be ready before totalCost() works.
- priceForGroup() - the price tag reader - calculates cost for each group size - used by totalCost() to add prices.

So even if cost() is the main entry point for humans, we should write the helpers first, then let cost() use them.

🐣 So what comes first? The egg — the helpers like buildGroup() and priceForGroup() — come before the chicken (cost()).

Ok, we figured out what helpers we need, but in what order:

1. priceForGroup(size)
   What does a group of N books cost?
   This is just math, calculates price based on group size.

2. buildGroup(counts)
   How do I build a group of different books from the basket?
   Pull out 1 copy of each available book to form the biggest possible group (max 5).

3. totalCost(counts)

- How many groups can I make? What size are they? What is their total cost?
  Repeatedly calls buildGroup()
  Calls priceForGroup() to total the price
  Applies a smart discount tweak (known optimization: 5+3 → 4+4)

4. cost(books)
   🚪 Main door — receives the book list (like \[1,1,2,2,3,3,4,5])
   Converts it into a count map
   Calls totalCost() and returns the result

So now we figured out what are the steps we would take as a human to solve this problem by hand. Then turn each step into a little helper, which is your function.

# Bookstore Discount Feynman

(... previous content ...)

---

## priceForGroup(size) Function

Let's start with `priceForGroup(size)` function:

This function receives a number, which is the **size of the basket** — meaning how many **different books** we chose in one group (no repeated titles).

```js
const priceForGroup = (size) => {
  const basePrice = 800;
  const discount = { 1: 1.0, 2: 0.95, 3: 0.9, 4: 0.8, 5: 0.75 };
  return basePrice * size * discount[size];
};
```

In this function, we are going to **figure out the price for one group of books**. So:

1. What we need to know first is the **price of each book**, which we know is 800 cents. So we store it in a variable:

```js
const basePrice = 800;
```

2. Then we need a **mapping between the number of different books and the discount** they get. Here, an **object** fits best. So we create an object called `discount` where the key is the number of different books and the value is the percentage of price we pay:

```js
const discount = { 1: 1.0, 2: 0.95, 3: 0.9, 4: 0.8, 5: 0.75 };
```

3. Finally, the **whole purpose** of this function is to **return the final price for the group**. This is simple math:

   - Multiply the number of books (`size`) by the `basePrice`
   - Multiply again by the corresponding discount (e.g., 0.9 for 10% off)
   - Reminder: `size` means the number of **unique books**, not repeated titles.

```js
return basePrice * size * discount[size];
```

---

## buildGroup(counts) Function

Now let's build a group of books with this function:

```js
const buildGroup = (counts) => {
  const group = [];
  for (let book in counts) {
    if (counts[book] > 0) {
      group.push(+book);
      counts[book] -= 1;
    }
    if (group.length === 5) break;
  }
  return group;
};
```

Here we need to use our imagination. To build a group, we should know **how many copies we have for each book in our basket**.

How is that possible to calculate? Well, the best way is to receive an **object** that shows the book number and the number of copies of that book in our basket. Something like:

```js
{ 1: 1, 2: 1, 3: 2, 4: 1, 5: 2 }
```

A better analogy: We enter the library and order some books:

```js
books = [1, 1, 2, 2, 3, 3, 4, 5];
```

As you see, we have for example two `1`s, which means we ordered **two copies of Book 1**, and so on.

So we give the object of how many of each book we have in our basket to the `buildGroup()` function. This function will make a group like:

```js
[1, 2, 3, 4, 5];
```

That is a group of **5 unique books** that can qualify for the biggest discount from our discount table.

---

### 🔍 Inside the Function:

First, we need to **specify where we want to hold the group**:

```js
const group = [];
```

Then to form a group, we need to **loop over our `counts` object**:

```js
for (let book in counts)
```

We check: If there is **at least one copy of the book** in our object, we:

- Add it to the `group` array
- Deduct the used copy from the `counts` object

```js
if (counts[book] > 0) {
  group.push(Number(book));
  counts[book] -= 1;
}
```

❓ **Why `+book`?**
Because in a `for...in` loop, the `book` is a string (like `'1'`, `'2'`). But we want actual numbers in the `group` array. So we convert it to a number using `Number(book)`.

Then we **make sure the group never has more than 5 books** (because that's the max discount size). If we reach 5, we break the loop:

```js
if (group.length === 5) break;
```

Finally, we return the built group:

```js
return group;
```

The result would look like:

```js
[1, 2, 3, 4, 5];
```

And after this function runs, the input `counts` object will be **mutated** like this:

```js
{
  1: 1,
  2: 1,
  3: 1,
  4: 0,
  5: 0
}
```

Each book in the group had 1 copy removed from `counts`.

## totalCost(counts) Function

Now we have a group of unique books — with maximum 5 books. Note that the group might also be smaller at some point, like `[1, 2]` or even `[2]` depending on how many are left.

Now we need to calculate the **total cost** for all possible groups using our mighty function `totalCost`.

```js
const totalCost = (counts) => {
  let total = 0;
  const groupSizes = [];

  while (Object.values(counts).some((count) => count > 0)) {
    const group = buildGroup(counts);
    groupSizes.push(group.length);
  }

  while (groupSizes.includes(5) && groupSizes.includes(3)) {
    groupSizes.splice(groupSizes.indexOf(5), 1);
    groupSizes.splice(groupSizes.indexOf(3), 1);
    groupSizes.push(4, 4);
  }

  for (let size of groupSizes) {
    total += priceForGroup(size);
  }

  return total;
};
```

This function also receives a `counts` object, just like `buildGroup()`, but for a **different purpose** — to calculate the **total cost for each group**.

---

### 🔢 Step-by-step:

1. **Hold total cost**:

```js
let total = 0;
```

This will keep adding up the cost of each group.

2. **Keep track of all group sizes**:

```js
const groupSizes = [];
```

Why? Because we’re going to break the entire basket into multiple groups like:

```js
[5, 4, 3] → 3 groups of these sizes
```

3. **Build groups until all books are used**:

```js
while (Object.values(counts).some((count) => count > 0)) {
  const group = buildGroup(counts);
  groupSizes.push(group.length);
}
```

This loop keeps creating groups while any book count is still greater than zero.

- `Object.values(counts)` gets all the copy numbers
- `.some(count > 0)` checks if any book is still left
- Inside the loop: we create a group → store its size in `groupSizes`

#### 📥 Input and 📤 Output Example:

If `counts` = `{ 1: 2, 2: 2, 3: 2, 4: 1, 5: 1 }`
Then `groupSizes` might become → `[5, 3]`

---

### 🧠 Optimization Trick:

```js
while (groupSizes.includes(5) && groupSizes.includes(3)) {
  groupSizes.splice(groupSizes.indexOf(5), 1);
  groupSizes.splice(groupSizes.indexOf(3), 1);
  groupSizes.push(4, 4);
}
```

Why do we do this?
Because:

- 5 books → 25% off
- 3 books → 10% off

But:

- Two groups of 4 books → 20% off each → this gives a **better total discount** than (5 + 3)

So we transform one 5-group + one 3-group → into two 4-groups.

#### What does each line do?

- `groupSizes.splice(groupSizes.indexOf(5), 1)` removes one `5`
- `groupSizes.splice(groupSizes.indexOf(3), 1)` removes one `3`
- `groupSizes.push(4, 4)` adds two `4`s

---

### 💰 Final Calculation:

```js
for (let size of groupSizes) {
  total += priceForGroup(size);
}
```

Now we go through each group size, calculate its price using `priceForGroup()`, and add it to `total`.

Finally, return the result:

```js
return total;
```

This is the total price (in cents) for the whole basket — using the best discount grouping we could find.

---

# Bookstore Discount Feynman

(... previous content ...)

---

## cost(books) Function

```js
const cost = (books) => {
  const counts = {};
  for (let book of books) {
    counts[book] = (counts[book] || 0) + 1;
  }
  return totalCost(counts);
};
```

Now this is the **main door** of our program. This is the function that the outside world will call.

It takes the list of books we ordered — like:

```js
[1, 1, 2, 2, 3, 3, 4, 5];
```

This means we want to buy:

- 2 copies of Book 1
- 2 copies of Book 2
- 2 copies of Book 3
- 1 copy of Book 4
- 1 copy of Book 5

We need to know **how many of each book we have** before we can group them.
So first, we create an empty object:

```js
const counts = {};
```

This will hold how many times each book appears.

Then we loop through all books:

```js
for (let book of books) {
  counts[book] = (counts[book] || 0) + 1;
}
```

This means:

- If we’ve never seen this book before, start with 0
- Add 1 to it

So after this loop, if `books = [1,1,2,2,3,3,4,5]`, the `counts` object becomes:

```js
{
  1: 2,
  2: 2,
  3: 2,
  4: 1,
  5: 1
}
```

Now we are ready to pass this object to our `totalCost()` function:

```js
return totalCost(counts);
```

This is where the whole brain (discount calculation logic) runs.

So this function is like the entry point. You give it a **plain list of books**, and it returns the **final cost in cents**, after figuring out the best discount grouping behind the scenes.

---
