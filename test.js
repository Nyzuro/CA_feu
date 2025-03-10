const arr = [4, "PLUS", [21 * [1 - [2 / 1]]], "PLUS", 38];
console.log(arr);

while (arr.length > 1) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "PLUS") {
      arr.splice(i - 1, 3, arr[i - 1] + Number(arr[i + 1]));
    }
  }
}
console.log(arr);
