const cost = (books) => {
  const counts = {};
  for (let book of books) {
    counts[book] = (counts[book] || 0) + 1;
  }
  return totalCost(counts);
};

const buildGroup = (counts) => {
  const group = [];
  for (let book in counts) {
    if (counts[book] > 0) {
      group.push(Number(book));
      counts[book] -= 1;
    }
    if (group.length === 5) break;
  }
  return group;
};

const priceForGroup = (size) => {
  const basePrice = 800;
  const discount = { 1: 1.0, 2: 0.95, 3: 0.9, 4: 0.8, 5: 0.75 };
  return basePrice * size * discount[size];
};

const totalCost = (counts) => {
  let total = 0;
  const groupSizes = [];

  while (Object.values(counts).some((count) => count > 0)) {
    const group = buildGroup(counts);
    groupSizes.push(group.length);
  }

  // Apply known optimization: replace one group of 5 + one group of 3 with two groups of 4
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
