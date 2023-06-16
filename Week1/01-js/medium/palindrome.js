/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isPalindrome(str) {
  str = str
    .toLowerCase()
    .replace(/\s/g, "") //removing blank spaces
    .replace(/[^\w\s]/gi, ""); //removing special characaters spaces

  const halfStringSize = Math.ceil(str.length / 2);

  for (let i = 0; i < halfStringSize; i++) {
    let leftChar = str[i];
    let rightChar = str[str.length - 1 - i];
    if (leftChar !== rightChar) return false;
  }
  // SECOND APPRAOACH
  
  // let left = 0;
  // let right = str.length - 1;

  // while (left < right) {
  //   if (str.charAt(left) !== str.charAt(right)) {
  //     return false;
  //   }
  //   left++;
  //   right--;
  // }
  return true;
}

module.exports = isPalindrome;
