/**
 * Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
 * clock that shows you the current machine time?
 *
 * Can you make it so that it updates every second, and shows time in the following formats -
 *
 * - HH:MM::SS (Eg. 13:45:23)
 *
 * - HH:MM::SS AM/PM (Eg 01:45:23 PM)
 */

function formatTwoDigits(value) {
  return value.toString().padStart(2, "0");
}
function getAMPM(hours) {
  return hours >= 12 ? "PM" : "AM";
}
function getHoursUnder12(hours) {
  return hours > 12 ? hours - 12 : hours;
}
function clock() {
  let latestDate = new Date();

  console.clear();
  console.log(
    "1st Format : ",
    `${formatTwoDigits(latestDate.getHours())}:${formatTwoDigits(
      latestDate.getMinutes()
    )}:${formatTwoDigits(latestDate.getSeconds())}`
  );
  console.log(
    "2nd Format : ",
    `${formatTwoDigits(
      getHoursUnder12(latestDate.getHours())
    )}:${formatTwoDigits(latestDate.getMinutes())}:${formatTwoDigits(
      latestDate.getSeconds()
    )} ${getAMPM(latestDate.getHours())}`
  );
}
setInterval(clock, 1000);
