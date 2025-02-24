const operation = "2 + 7 - 6 * 3 + 14 / 2";
let operationSplit = operation.split(" ");
console.log(operationSplit);
let result = 0;
const finalOperation = [];

for (let i = 0; i < operationSplit.length; i++) {
  if (operationSplit[i + 1] === "*") {
    finalOperation.push(
      parseInt(operationSplit[i].trim()) *
        parseInt(operationSplit[i + 2].trim())
    );
    i += 2;
  } else if (operationSplit[i + 1] === "/") {
    finalOperation.push(
      parseInt(operationSplit[i].trim()) /
        parseInt(operationSplit[i + 2].trim())
    );
    i += 2;
  } else finalOperation.push(operationSplit[i]);
}

for (let i = 0; i < finalOperation.length; i++) {
  if (finalOperation[i] === "+") {
    if (i < 3) {
      result +=
        parseInt(finalOperation[i - 1].trim()) +
        parseInt(finalOperation[i + 1].trim());
    } else result += parseInt(finalOperation[i + 1]);
  }
  if (finalOperation[i] === "-") {
    if (i < 3) {
      result +=
        parseInt(finalOperation[i - 1].trim()) -
        parseInt(finalOperation[i + 1].trim());
    } else result -= parseInt(finalOperation[i + 1]);
  }
}

console.log(finalOperation);
console.log(result);
