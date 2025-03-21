const fs = require("fs");

const isValidMove = (y, x, n, grid) => {
  //determine if the number is valid on its line
  for (let x0 = 0; x0 < grid.length; x0++) {
    if (grid[y][x0] === n) return false;
  }
  //determine if the number is valid on its column
  for (let y0 = 0; y0 < grid.length; y0++) {
    if (grid[y0][x] === n) return false;
  }
  //determine if the number is valid on its subgrid
  const x0 = Math.floor(x / 3) * 3;
  const y0 = Math.floor(y / 3) * 3;

  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) {
      if (grid[y0 + i][x0 + j] === n) return false;
    }

  return true;
};

const solve = (parsedSudokuGrid) => {
  let grid = parsedSudokuGrid;

  for (let y = 0; y < 9; y++)
    for (let x = 0; x < 9; x++)
      if (grid[y][x] === ".") {
        for (let n = 1; n < 10; n++) {
          if (isValidMove(y, x, n, grid)) {
            grid[y][x] = n;
            let result = solve(grid);
            if (result) return result;
            grid[y][x] = ".";
          }
        }
        return;
      }

  return grid;
};

const countInArray = (numbers, number) => {
  return numbers.filter((element) => element === number).length;
};

const isValidArguments = (arguments) => {
  if (arguments.length !== 1) {
    console.error("Le programme a besoin d'un Sudoku a remplir pour fonctionner");
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

const isCorrectLines = (parsedSudokuGrid) => {
  for (const line of parsedSudokuGrid) {
    if (line.length !== 9) return false;
    for (const number of line)
      if (number !== ".") {
        if (countInArray(line, number) !== 1) return false;
      }
  }
  return true;
};

const isCorrectColumns = (parsedSudokuGrid) => {
  for (let i = 0; i < parsedSudokuGrid.length; i++) {
    const column = [];
    for (let j = 0; j < parsedSudokuGrid.length; j++) {
      column.push(parsedSudokuGrid[j][i]);
    }

    if (column.length !== 9) return false;
    for (const number of column) if (number !== ".") if (countInArray(column, number) !== 1) return false;
  }
  return true;
};

const isCorrectSubgrids = (parsedSudokuGrid) => {
  const subgridStart = [0, 3, 6];

  for (const y0 of subgridStart)
    for (const x0 of subgridStart) {
      const subgrid = [];

      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) {
          const number = parsedSudokuGrid[y0 + i][x0 + j];

          if (number !== ".") {
            if (subgrid.includes(number)) return false;
          }
          subgrid.push(number);
        }
    }
  return true;
};

const isValidSudoku = (parsedSudokuGrid) => {
  if (!isCorrectLines(parsedSudokuGrid)) {
    console.error("One of the lines is not correct");
    return;
  }
  if (!isCorrectColumns(parsedSudokuGrid)) {
    console.error("One of the columns is not correct");
    return;
  }
  if (!isCorrectSubgrids(parsedSudokuGrid)) {
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
  const parsedSudokuGrid = [];

  for (let i = 0; i < splitedGrid.length; i++) {
    parsedSudokuGrid[i] = [];

    for (let j = 0; j < splitedGrid[i].length; j++) {
      if (splitedGrid[i][j] !== ".") {
        if (!isValidNumber(splitedGrid[i][j])) return;
        parsedSudokuGrid[i][j] = Number(splitedGrid[i][j]);
      } else {
        parsedSudokuGrid[i][j] = splitedGrid[i][j];
      }
    }
  }
  return parsedSudokuGrid;
};

const displaySudokuResult = () => {
  const arguments = isValidArguments(getArguments());
  if (!arguments) return;
  const sudokuGrid = readFile(isValidFile(arguments[0]));
  if (!sudokuGrid) return;

  const parsedSudokuGrid = parseSudoku(sudokuGrid);
  if (!parsedSudokuGrid) return;
  if (!isValidSudoku(parsedSudokuGrid)) return;

  const sudokuResult = solve(parsedSudokuGrid);
  for (let i = 0; i < 9; i++) {
    let line = "";
    for (let j = 0; j < 9; j++) {
      line += sudokuResult[i][j];
    }
    console.log(line);
  }
};

displaySudokuResult();
