/**
 * ## Write to a file
 * Using the fs library again, try to write to the contents of a file.
 * You can use the fs library to as a black box, the goal is to understand async tasks.
 */

const fs = require("fs");

const filePath = "./sample.txt";
const content = "\nThis is the content written by the fs Module";

function writeErrHandler(err) {
  if (err) {
    console.log("writeErrHandler", err);
  } else {
    console.log("File sucessfully saved");
  }
}
function expensiveOperation(limit) {
    for (let i = 0; i < limit; i++) {
      console.count("zzz");
    }
  }

function writeToFile(filePath, content) {
  fs.writeFile(filePath, content, { encoding: "utf8",flag:'a+' }, writeErrHandler);
  expensiveOperation(1000)
}

writeToFile(filePath, content);
