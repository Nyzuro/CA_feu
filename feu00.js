const printRectangle = (width, height) => {
  for (let i = 1; i <= height; i++) {
    let line = "";
    for (let j = 1; j <= width; j++) {
      if (i === 1 || i === height) {
        if (j === 1) line += "o";
        else if (j === width) line += "o";
        else line += "-";
      } 
      
      else {
        if (j === 1) line += "|";
        else if (j === width) line += "|";
        else line += " ";
      }
    }
    console.log(line);
  }
};

const isValidArguments = (arguments) => {
  if (arguments.length !== 2) {
    console.error("Le nombre d'arguments doit etre 2");
    return;
  }
  return arguments;
};

const isValidNumbers = (numbers) => {
  for (let i = 0; i < numbers.length; i++) {
    if (isNaN(numbers[i])) {
      console.error("Les arguments doivent etre des nombres");
      return;
    }
    numbers[i] = Number(numbers[i]);
  }
  return numbers;
};

const getArguments = () => {
  const arguments = process.argv.slice(2);
  return arguments;
};

const getRectanglePrinted = () => {
  const arguments = isValidArguments(getArguments());
  if (!arguments) return;
  const numbers = isValidNumbers(arguments);
  if (!numbers) return;
  printRectangle(numbers[0], numbers[1]);
};

getRectanglePrinted();
