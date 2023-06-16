/**
 * ## Counter without setInterval
 * Without using setInterval, try to code a counter in Javascript.
 * There is a hint at the bottom of the file if you get stuck.
 */

function counter(initialCount, delay) {
  let count = initialCount;
  function incrementCount() {
    console.clear();
    console.log(count++);
    setTimeout(incrementCount, delay);
  }
  incrementCount();
}

counter(0, 1000);

// (Hint: setTimeout)
