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

const getResultWithDashes = (splitedBoard, toFindCoordinates, x, y) => {
  console.log();
  let result = "";

  for (let i = 0; i < splitedBoard.length; i++) {
    for (let j = 0; j < splitedBoard[i].length; j++) {
      let isPartOfShape = false;

      for (let k = 0; k < toFindCoordinates.length; k++) {
        const realX = x + (toFindCoordinates[k].x - toFindCoordinates[0].x);
        const realY = y + (toFindCoordinates[k].y - toFindCoordinates[0].y);

        if (i === realY && j === realX) {
          result += toFindCoordinates[k].value;
          isPartOfShape = true;
          break;
        }
      }
      if (!isPartOfShape) result += "-";
    }
    result += "\n";
  }

  return result;
};

const isValidArguments = (arguments) => {
  if (arguments.length !== 2) {
    console.error(
      "Le programme a besoin d'un tableau et d'une forme a trouver pour fonctionner"
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

const getArguments = () => {
  const arguments = process.argv.slice(2);
  return arguments;
};

const displayShapePosition = () => {
  const arguments = isValidArguments(getArguments());
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
    const x = topLeftCoord[0];
    const y = topLeftCoord[1];
    const resultWithDashes = getResultWithDashes(
      splitedBoard,
      toFindCoordinates,
      x,
      y
    );
    console.log(`Trouve!\nCoordonnees: ${x}, ${y}\n${resultWithDashes}`);
  }
};

displayShapePosition();
