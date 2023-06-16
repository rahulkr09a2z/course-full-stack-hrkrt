/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */

function delayHandler(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
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

function calculateTime() {
  const start = Date.now();
  Promise.all([waitOneSecond(), waitTwoSecond(), waitThreeSecond()])
    .then(() => {
      const end = Date.now();
      const elapsed = end - start;
      console.log(`Time Elapsed: ${elapsed} milliseconds`);
    })
    .catch((err) => {
      console.error("ERROR: ", err);
    });
}

calculateTime();
