/**
 * ## Reading the contents of a file
 * Write code to read contents of a file and print it to the console.
 * You can use the fs library to as a black box, the goal is to understand async tasks.
 * Try to do an expensive operation below the file read and see how it affects the output.
 * Make the expensive operation more and more expensive and see how it affects the output.
 */

const fs = require("fs");

const filePath = "./sample.txt";

function fileReadHandler(err, data) {
  if (err) {
    throw new Error(err);
  }
  console.log("\nFile Content===>\n\n", data);
}
function expensiveOperation(limit) {
  for (let i = 0; i < limit; i++) {
    console.count("zzz");
  }
}

function readAndPrintFileContents(filePath) {
  try {
    fs.readFile(filePath, "utf-8", fileReadHandler);
    expensiveOperation(1000);
  } catch (err) {
    console.log("ERROR:", err);
  }
}

readAndPrintFileContents(filePath);
