/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

function sleep(seconds) {
  const startTime = new Date();
  while (Date.now() - startTime < seconds * 1000) {}
}

console.log("Before sleep");
sleep(3);
console.log("After sleep");

// // 2nd Approach
// function sleep(milliseconds) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, milliseconds);
//   });
// }

// // Usage
// console.log("Before sleep");
// sleep(3000).then(() => {
//   console.log("After sleep");
// });
