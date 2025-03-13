const fs = require("fs");

const readFile = (fileName) => {
  const contents = fs.readFileSync(fileName, "utf8");
  return contents;
};

const getToFindCoordinates = (shapeToFind) => {
  const shape = [];
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
  return shape;
};

const compareShape = (splitedBoard, toFindCoordinates) => {
  console.log(splitedBoard);
  console.log(toFindCoordinates);
  for (let i = 0; i < splitedBoard.length; i++) {
    for (let j = 0; j < splitedBoard[i].length; j++) {
      if (splitedBoard[i][j] === toFindCoordinates[0].value) {
        let hasSameValue = true;
        for (let k = 1; k < toFindCoordinates.length; k++) {
          const coordinatesX = toFindCoordinates[k].x;
          const coordinatesY = toFindCoordinates[k].y;

          if (
            splitedBoard[i + coordinatesY][j + coordinatesX] !==
            toFindCoordinates[k].value
          ) {
            hasSameValue = false;
            break;
          }
        }
        if (hasSameValue) return [i, j];
      }
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
  const toFindCoordinates = getToFindCoordinates(shapeToFind);
  return compareShape(splitedBoard, toFindCoordinates);
};

console.log(getShapePosition());
