/** This function merges two strings  */

function merge(a, b, retry = true) {

  // Find the posistion in string 'a' of the first character of string 'b'. i will become -1 if value is not found.
  let i = a.indexOf(b[0]);
  // The while loop will initiate if variable i sees an instance of overlap. 
  while (i > -1) { 
      // We now want to calculate this size of the overlap. 
      // Varible 'size' will take the minimum of string 'a' length, less the number of characters in 'i' or; string 'b' length.
      let size = Math.min(a.length - i, b.length);
      // See if we have an overlap at this position:
      if (a.slice(i).slice(0, size) === b.slice(0, size)) {
          // Return the overlapping part.
          return a + b.slice(size);
      }
      // If there is no match then increment 'i' to see if any other overlapping occurs.
      i = a.indexOf(b[0], i+1);
  }
  // reverse the strings so for instances where the start of b does not overlap with string a and don't repeat.
  if (retry) {
    return merge(b, a, false);
  } 
  return b+a;
}

/** This function will return the longest overlap which includes the two original strings poistions + the merger + the longest overlap amount */

function findLongestOverlap(collection) {
  // Set longest to nothing.
  let longest = { overlapSize: -1 };
  // Iterate through all pairs from the collection:
  for (let j = 1; j < collection.length; j++) {
      let b = collection[j];
      for (let i = 0; i < j; i++) {
          let a = collection[i];
          const merged = merge(a, b);
          // Derive the size of the overlap from the merged string:
          const overlapSize = a.length + b.length - merged.length;
          // Is it higher than the last recored size?
          if (overlapSize > longest.overlapSize) {
              // Record/replace information.
              longest = { merged, i, j, overlapSize };
          }
      }
  }
  return longest;
}

/** This function will merge a collection of strings/start the application */

function start(...collection) { // Grab all arguments as an array.

  // Repeat until 1 string is left.
  for (let i = collection.length; --i; ) {
      // Get highest overlap information from the collection.
      const { merged, i, j } = findLongestOverlap(collection);
      // Remove the original two strings.
      collection.splice(j, 1);
      collection.splice(i, 1);
      // Add the merged string.
      collection.push(merged);
  }
  // Return the single string that remains
  return collection[0];
}

let collection = ["all is well", "ell that en", "hat end", "t ends well"];
const result = start(...collection); // Spread the array as individual arguments.

console.log(result);


