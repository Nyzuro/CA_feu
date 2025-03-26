const { execSync } = require("child_process");

const generateRandomBoard = () => {
  try {
    const stdout = execSync(`node board_generator.js 13 8 5`).toString();
    return stdout;
  } catch (error) {
    console.error(`exec error: ${error}`);
  }
};

const findTheBiggestSquare = (randomBoard) => {};

const getTheBiggestSquare = () => {
  const randomBoard = generateRandomBoard();
  const splitedBoard = randomBoard.split("\n");
  const cleanedBoard = splitedBoard.slice(1, splitedBoard.length - 1);
  console.log(cleanedBoard);
};

getTheBiggestSquare();
