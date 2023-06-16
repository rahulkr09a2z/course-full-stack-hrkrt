/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */
function delayHandler(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

function waitOneSecond() {
  return delayHandler(1);
}

function waitTwoSecond() {
  return delayHandler(2);
}

function waitThreeSecond() {
  return delayHandler(3);
}

async function calculateTime() {
  const startTime = new Date();

  console.log("Started");

  await waitOneSecond();
  await waitTwoSecond();
  await waitThreeSecond();
  const endTime = new Date();

  console.log(`Ended in ${endTime - startTime} milliseconds`);
}

calculateTime();
