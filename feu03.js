const fs = require("fs");

const countInArray = (numbers, number) => {
  return numbers.filter((element) => element === number).length;
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

const linesVerifications = (parsedSudoku) => {
  for (const line of parsedSudoku) {
    if (line.length !== 9) return;
    for (const number of line)
      if (number !== ".") if (countInArray(line, number) !== 1) return;
  }
  return true;
};

const columnsVerifications = (parsedSudoku) => {
  for (let i = 0; i < parsedSudoku.length; i++) {
    const column = [];
    for (let j = 0; j < parsedSudoku.length; j++) {
      column.push(parsedSudoku[j][i]);
    }

    if (column.length !== 9) return;
    for (const number of column)
      if (number !== ".") if (countInArray(column, number) !== 1) return;
  }
  return true;
};

const isCorrectSubgrids = (parsedSudoku) => {
  const subgridStart = [0, 3, 6];

  for (const y0 of subgridStart)
    for (const x0 of subgridStart) {
      const subgrid = [];

      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) {
          const number = parsedSudoku[y0 + i][x0 + j];

          if (number !== ".") {
            if (subgrid.includes(number)) return false;
          }
          subgrid.push(number);
        }
    }
  return true;
};

const isValidSudoku = (parsedSudoku) => {
  if (!linesVerifications(parsedSudoku)) {
    console.error("One of the lines is not correct");
    return;
  }
  if (!columnsVerifications(parsedSudoku)) {
    console.error("One of the columns is not correct");
    return;
  }
  if (!isCorrectSubgrids(parsedSudoku)) {
    console.error("One of the subgrids is not correct");
    return;
  }
  return true;
};

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
  if (!parsedSudoku) return;
  if (!isValidSudoku(parsedSudoku)) return;
};

getSudokuResult();
