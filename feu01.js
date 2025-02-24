let result = 0;

const multiplication = (a, b, finalOperation) => {
  return finalOperation.push(a * b);
};

const division = (a, b, finalOperation) => {
  return finalOperation.push(a / b);
};

const modulo = (a, b, finalOperation) => {
  return finalOperation.push(a % b);
};

const makeFinalOperation = (operation) => {
  const finalOperation = [];
  for (let i = 0; i < operation.length; i++) {
    if (operation[i + 1] === "*") {
      multiplication(operation[i], operation[i + 2], finalOperation);
      i += 2;
    } else if (operation[i + 1] === "/") {
      division(operation[i], operation[i + 2], finalOperation);
      i += 2;
    } else if (operation[i + 1] === "%") {
      modulo(operation[i], operation[i + 2], finalOperation);
      i += 2;
    } else finalOperation.push(operation[i]);
  }
  return finalOperation;
};

const calculateFinalOperation = (finalOperation) => {
  for (let i = 0; i < finalOperation.length; i++) {
    if (finalOperation[i] === "+") {
      if (i < 3) {
        result += finalOperation[i - 1] + finalOperation[i + 1];
      } else result += finalOperation[i + 1];
    }
    if (finalOperation[i] === "-") {
      if (i < 3) {
        result += finalOperation[i - 1] - finalOperation[i + 1];
      } else result -= finalOperation[i + 1];
    }
  }
  return result;
};

const isValidArguments = (arguments) => {
  if (arguments.length < 1) {
    console.error("Le programme a besoin d'un argument pour fonctionner");
    return;
  }
  return arguments;
};

const isValidNumbers = (numbers, operators) => {
  for (let i = 0; i < numbers.length; i++) {
    if (!operators.includes(numbers[i])) {
      if (isNaN(numbers[i])) {
        console.error("N'entrez que des nombres");
        return;
      }
      numbers[i] = Number(numbers[i]);
    }
  }
  return numbers;
};

const getArguments = () => {
  const arguments = process.argv.slice(2);
  return arguments;
};

const getOperators = () => {
  return ["+", "-", "*", "/", "%"];
};

const getOperationResult = () => {
  const arguments = isValidArguments(getArguments());
  if (!arguments) return;
  const operators = getOperators();
  const operation = isValidNumbers(arguments, operators);
  if (!operation) return;
  const finalOperation = makeFinalOperation(operation);
  console.log(finalOperation);
  return calculateFinalOperation(finalOperation);
};

console.log(getOperationResult());
