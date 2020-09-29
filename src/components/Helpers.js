export function firstLetterCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// export function firstLetterCaseTitle(str) {
//   return str.charAt(0).toUpperCase();
// }

export function splitTypeArray(arr) {
  return arr.join(" and ");
}
