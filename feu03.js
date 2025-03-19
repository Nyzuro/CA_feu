const fs = require("fs");

const countInArray = (numbers, number) => {
  return numbers.filter((element) => element == number).length;
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

const isValidNumber = (number) => {
  if (isNaN(number)) {
    console.error("N'entrez que des nombres");
    return false;
  }
  return true;
};

const lineVerification = (splitedGrid) => {};

const isValidSudoku = (splitedGrid) => {};

const readFile = (fileName) => {
  const contents = fs.readFileSync(fileName, "utf8");
  return contents;
};

const getArguments = () => {
  const arguments = process.argv.slice(2);
  return arguments;
};

const parseSudoku = (sudokuGrid) => {
  const splitedGrid = sudokuGrid.split("\r\n");
  const parsedSudoku = [];
  for (let i = 0; i < splitedGrid.length; i++) {
    parsedSudoku[i] = [];
    for (let j = 0; j < splitedGrid[i].length; j++) {
      if (splitedGrid[i][j] !== ".") {
        if (!isValidNumber(splitedGrid[i][j])) return;
        parsedSudoku[i][j] = Number(splitedGrid[i][j]);
      } else {
        parsedSudoku[i][j] = splitedGrid[i][j];
      }
    }
  }
  return parsedSudoku;
};

const getSudokuResult = () => {
  const arguments = isValidArguments(getArguments());
  if (!arguments) return;
  const sudokuGrid = readFile(isValidFile(arguments[0]));
  if (!sudokuGrid) return;

  const parsedSudoku = parseSudoku(sudokuGrid);
  console.log(parsedSudoku);
};

getSudokuResult();
