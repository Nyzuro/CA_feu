const fs = require("fs");
const shape = [];

const readFile = (fileName) => {
  const contents = fs.readFileSync(fileName, "utf8");
  return contents;
};

const toFindCoordinates = (shapeToFind) => {
  const splitedShape = shapeToFind.split("\r\n");
  for (let i = 0; i < splitedShape.length; i++) {
    for (let j = 0; j < splitedShape[i].length; j++) {
      if (splitedShape[i][j] !== " ")
        shape.push({
          x: j,
          y: i,
          value: splitedShape[i][j],
        });
    }
  }
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
  toFindCoordinates(shapeToFind);
  console.log(shape);
};

console.log(getShapePosition());
