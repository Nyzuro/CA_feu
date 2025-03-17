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

const getTopLeftCoord = (splitedBoard, toFindCoordinates) => {
  for (let i = 0; i < splitedBoard.length; i++) {
    for (let j = 0; j < splitedBoard[i].length; j++) {
      if (splitedBoard[i][j] === toFindCoordinates[0].value) {
        let hasSameValue = true;

        for (let k = 1; k < toFindCoordinates.length; k++) {
          const coordinatesX = toFindCoordinates[k].x;
          const coordinatesY = toFindCoordinates[k].y;

          if (coordinatesX <= toFindCoordinates[0].x) {
            const indexShift = toFindCoordinates[0].x - coordinatesX;

            if (
              splitedBoard[i + coordinatesY][j - indexShift] !==
              toFindCoordinates[k].value
            ) {
              hasSameValue = false;
              break;
            }
          } else {
            const indexShift = coordinatesX - toFindCoordinates[0].x;

            if (
              splitedBoard[i + coordinatesY][j + indexShift] !==
              toFindCoordinates[k].value
            ) {
              hasSameValue = false;
              break;
            }
          }
        }
        if (hasSameValue) return [j, i];
      }
    }
  }
};

const resultWithDashes = (splitedBoard, toFindCoordinates) => {
  let result = "";
  let coord = 0;

  for (let i = 0; i < splitedBoard.length; i++) {
    for (let j = 0; j < splitedBoard[i].length; j++) {
      if (
        i === toFindCoordinates[coord].y &&
        j === toFindCoordinates[coord].x
      ) {
        result += toFindCoordinates[coord].value;
        coord++;
      } else {
        result += "-";
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

  const topLeftCoord = getTopLeftCoord(splitedBoard, toFindCoordinates);
  if (!topLeftCoord) {
    console.error("Introuvable");
    return;
  } else {
    console.log(`Trouve!\nCoordonnees: ${j}, ${i}\n`);
  }
};

console.log(getShapePosition());
