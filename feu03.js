const fs = require("fs");

const readFile = (fileName) => {
  const contents = fs.readFileSync(fileName, "utf8");
  return contents;
};

const isValidArguments = (arguments) => {
  if (arguments.length !== 1) {
    console.error(
      "Le programme a besoin d'un Sudoku a remplir pour fonctionner"
    );
    return;
  }
  return arguments;
};

const isValidFile = (fileName) => {
  if (!fs.existsSync(fileName)) {
    console.error("Fichier non trouve");
    return;
  }
  return fileName;
};

const getArguments = () => {
  const arguments = process.argv.slice(2);
  return arguments;
};

const getSudokuResult = () => {
  const argument = isValidArguments(getArguments());
  if (!argument) return;
  const sudoku = readFile(isValidFile(argument));
  if (!sudoku) return;
};

getSudokuResult();
