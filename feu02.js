const fs = require("fs");

const readFile = (fileName) => {
  const contents = fs.readFileSync(fileName, "utf8");
  return contents;
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

const getShapePosition = () => {
  const arguments = getArguments();
  if (!arguments) return;
  const board = readFile(isValidFile(arguments[0]));
  if (!board) return;
  const shapeToFind = readFile(isValidFile(arguments[1]));
  if (!shapeToFind) return;

  const splitedBoard = board.split("\r\n");
};

console.log(getShapePosition());
