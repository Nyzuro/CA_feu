const { execSync } = require("child_process");

const generateRandomBoard = () => {
  try {
    const stdout = execSync(`node board_generator.js 17 10 3`).toString();
    return stdout;
  } catch (error) {
    console.error(`exec error: ${error}`);
    return;
  }
};

const convertTo2DArray = (board) => {
  const twoDimensionalArray = [];
  for (const line of board) twoDimensionalArray.push([...line]);
  return twoDimensionalArray;
};

const findAllSquares = (board) => {
  const findedSquares = [];
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
        if (possibleSquareLines) {
          findedSquares.push({
            length: possibleSquareLines.length,
            y: i,
            x: j,
          });
        }
      }
    }
  return findedSquares;
};

const isPossibleSquare = (linesData) => {
  if (linesData.length > 1) {
    for (const line of linesData) {
      if (line.whiteSpacesOnLine < linesData.length) {
        linesData = linesData.slice(0, linesData.length - 1);
        return isPossibleSquare(linesData);
      }
    }
    return linesData;
  } else return false;
};

const findTheBiggestSquare = (allSquares, board) => {
  let biggestSquare = allSquares[0];
  for (const square of allSquares) {
    if (square.length > biggestSquare.length) biggestSquare = square;
  }

  const result = board;

  for (let i = biggestSquare.y; i < biggestSquare.length + biggestSquare.y; i++) {
    for (let j = biggestSquare.x; j < biggestSquare.length + biggestSquare.x; j++) {
      result[i].splice(j, 1, "o");
    }
  }
  return result;
};

const displayBiggestSquare = () => {
  const randomBoard = generateRandomBoard();
  if (!randomBoard) return;

  const splitedBoard = randomBoard.split("\n");
  const cleanedBoard = splitedBoard.slice(1, splitedBoard.length - 1);
  console.log(randomBoard);
  const board = convertTo2DArray(cleanedBoard);

  const allSquares = findAllSquares(board);
  const result = findTheBiggestSquare(allSquares, board);

  for (const line of result) {
    console.log(line.join(""));
  }
};

displayBiggestSquare();
