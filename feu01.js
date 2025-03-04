const multiplication = (a, b, finalOperation) => {
  return finalOperation.push(a * b);
};

const division = (a, b, finalOperation) => {
  return finalOperation.push(a / b);
};

const modulo = (a, b, finalOperation) => {
  return finalOperation.push(a % b);
};

const calculateOperation = (operation) => {
  while (operation.length > 1) {
    if (operation.includes("(")) {
      const startParanthesisIndex = operation.indexOf("(");
      const endParanthesisIndex = operation.indexOf(")");
    }
  }
};

const isValidArguments = (arguments) => {
  if (arguments.length !== 1) {
    console.error("Le programme a besoin d'une operation pour fonctionner");
    return;
  }
  return arguments;
};

const isValidNumber = (number) => {
  if (isNaN(number)) {
    console.error("N'entrez que des nombres");
    return;
  }
  return Number(number);
};

const getArguments = () => {
  const arguments = process.argv.slice(2);
  return arguments;
};

const getOperators = () => {
  return ["+", "-", "*", "/", "%"];
};

const getOperationResult = () => {
  const argument = isValidArguments(getArguments());
  if (!argument) return;

  const operationCleared = argument[0].trim().split(" ");
  const operators = getOperators();
  const operation = [];

  for (number of operationCleared) {
    if (!operators.includes(number)) {
      number = isValidNumber(number);
      if (!number) return;
    }
    operation.push(number);
  }
};

console.log(getOperationResult());
