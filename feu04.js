const { execSync } = require("child_process");

const generateRandomBoard = () => {
  try {
    const stdout = execSync(`node board_generator.js 5 3 2`).toString();
    console.log(stdout);
  } catch (error) {
    console.error(`exec error: ${error}`);
  }
};

generateRandomBoard();
