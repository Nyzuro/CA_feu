const { execSync } = require("child_process");

const generateRandomBoard = () => {
  try {
    const stdout = execSync(`node board_generator.js 17 10 5`).toString();
    return stdout;
  } catch (error) {
    console.error(`exec error: ${error}`);
  }
};

const isPossibleSquare = (linesData) => {
  if (linesData.length > 1) {
    for (const line of linesData) {
      if (line.whiteSpacesOnLine < linesData.length) {
        linesData = linesData.slice(0, line.whiteSpacesOnLine);
        isPossibleSquare(linesData);
        return linesData;
      }
    }
  } else return false;
};

const findTheBiggestSquare = (board) => {
  const foundedSquares = [];
  for (let i = 0; i < board.length; i++)
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === ".") {
        let linesData = [];

        for (let y = 0; i + y < board.length && board[i + y][j] === "."; y++) {
          let countWhitespaces = 0;

          for (let x = 0; j + x < board[i + y].length && board[i + y][j + x] === "."; x++) {
            countWhitespaces++;
          }
          if (countWhitespaces > 1)
            linesData.push({
              whiteSpacesOnLine: countWhitespaces,
            });
          else break;
        }
        const possibleSquareLines = isPossibleSquare(linesData);
        if (possibleSquareLines) console.log(possibleSquareLines);
      }
    }
};

const getTheBiggestSquare = () => {
  const randomBoard = generateRandomBoard();
  const splitedBoard = randomBoard.split("\n");
  const cleanedBoard = splitedBoard.slice(1, splitedBoard.length - 1);
  console.log(cleanedBoard);
  findTheBiggestSquare(cleanedBoard);
};

getTheBiggestSquare();
