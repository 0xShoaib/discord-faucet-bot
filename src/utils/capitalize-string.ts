/**
 *
 * @param str a string value to capitalize
 * @returns a capitalized string
 */
export const capitalize = (str: string): string => {
  // Split the string into an array of strings whenever a blank space is encountered
  const splittedStr = str.split(" ");

  // Loop through each element of the array and capitalize the first letter
  splittedStr.forEach((word, index) => {
    splittedStr[index] = word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join all the elements of the array back into a string using a blank space as a separator
  return splittedStr.join(" ");
};
