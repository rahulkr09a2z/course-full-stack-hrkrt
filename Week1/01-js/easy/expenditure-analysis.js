/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function calculateTotalSpentByCategory(transactions) {
  let tempObj = {};
  transactions.forEach((item) => {
    const { category, price } = item;
    if (tempObj[category]) {
      tempObj[category] = tempObj[category] + price;
    } else {
      tempObj[category] = price;
    }
  });
  let result = [];
  result = Object.entries(tempObj).map(([category, totalSpent]) => ({
    category,
    totalSpent,
  }));
  return result;
}

module.exports = calculateTotalSpentByCategory;
