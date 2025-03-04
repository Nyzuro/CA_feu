const multiplication = (a, b, finalOperation) => {
  return finalOperation.push(a * b);
};

const division = (a, b, finalOperation) => {
  return finalOperation.push(a / b);
};

const modulo = (a, b, finalOperation) => {
  return finalOperation.push(a % b);
};

const lexer = (operation) => {
  const tokens = [];
  const tokensTypes = [
    { type: "NUMBER", regex: /\d+/ }, // Numbers
    { type: "PLUS", regex: /\+/ }, // Operator +
    { type: "MINUS", regex: /-/ }, // Operator -
    { type: "MULTIPLY", regex: /\*/ }, // Operator *
    { type: "DIVIDE", regex: /\// }, // Operator /;
    { type: "MODULO", regex: /\%/ }, // Operator %
    { type: "OPEN PARANTHESIS", regex: /\(/ }, // Open paranthesis
    { type: "CLOSED PARANTHESIS", regex: /\)/ }, // Closed paranthesis
  ];

  while (operation.length > 0) {
    let match = null;

    for (const tokensType of tokensTypes) {
      match = tokensType.regex.exec(operation[0]);
      if (match) {
        tokens.push({ type: tokensType.type, value: match[0] });
        operation = operation.slice(1);
        break;
      }
    }

    if (!match) {
      console.error(`Caractère invalide : ${operation[0]}`);
      return;
    }
  }
  return tokens;
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

  console.log(lexer(operation));
};

console.log(getOperationResult());
