const fs = require("fs");

const getGrid = (map) => {
  const grid = [];
  map = map.split("\n");
  for (let i = 1; i < map.length - 1; i++) {
    grid.push([map[i]]);
  }
  return grid;
};

const isValidArgument = (arguments) => {
  if (arguments.length !== 1) {
    console.error("params needed: labyrinth.map");
    return;
  }
  if (arguments[0] !== "labyrinth.map") {
    console.error("params needed: labyrinth.map");
    return;
  }
  return arguments;
};

const getArguments = () => {
  const arguments = process.argv.slice(2);
  return arguments;
};

const getLabyrinthPath = () => {
  const arguments = isValidArgument(getArguments());
  if (!arguments) return;
  const argument = arguments[0];

  const map = fs.readFileSync(`${argument}`, "utf-8");
  const grid = getGrid(map);
};

getLabyrinthPath();
