const simplifyExpression = (expression) => {
  const prioritaryOPerators = ["/", "*", "%"];

  while (expression.some((element) => prioritaryOPerators.includes(element))) {
    let operationResult = 0;

    for (const operator of prioritaryOPerators) {
      if (expression.includes(operator)) {
        for (let i = 0; i < expression.length; i++) {
          if (expression[i] === "/") {
            operationResult = expression[i - 1] / expression[i + 1];
            expression.splice(i - 1, 3, operationResult);
            break;
          } else if (expression[i] === "*") {
            operationResult = expression[i - 1] * expression[i + 1];
            expression.splice(i - 1, 3, operationResult);
            break;
          } else if (expression[i] === "%") {
            operationResult = expression[i - 1] % expression[i + 1];
            expression.splice(i - 1, 3, operationResult);
            break;
          }
        }
        break;
      }
    }
  }
  return expression;
};

const calculateExpression = (expression) => {
  const prioritaryOPerators = ["/", "*", "%"];
  if (expression.some((element) => prioritaryOPerators.includes(element))) {
    expression = simplifyExpression(expression);
  }

  let operationResult = 0;

  while (expression.length > 1) {
    for (let i = 0; i < expression.length; i++) {
      if (expression[i] === "+") {
        operationResult = expression[i - 1] + expression[i + 1];
        expression.splice(i - 1, 3, operationResult);
        break;
      } else if (expression[i] === "-") {
        operationResult = expression[i - 1] - expression[i + 1];
        expression.splice(i - 1, 3, operationResult);
        break;
      }
    }
  }
  return expression[0];
};

const parseOperation = (operation) => {
  while (operation.includes("(")) {
    const startParanthesisIndex = operation.indexOf("(");
    const endParanthesisIndex = operation.indexOf(")");
    let expression = [];
    for (let i = startParanthesisIndex + 1; i < endParanthesisIndex; i++) {
      expression.push(operation[i]);
    }
    const parenthesisLength = endParanthesisIndex - startParanthesisIndex;
    const expressionResult = calculateExpression(expression);
    operation.splice(
      startParanthesisIndex,
      parenthesisLength + 1,
      expressionResult
    );
  }

  return calculateExpression(operation);
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
  return ["+", "-", "*", "/", "%", "(", ")"];
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

  return parseOperation(operation);
};

console.log(getOperationResult());
