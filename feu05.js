const fs = require("fs");

const Spot = () => {
  this.f = 0;
  this.g = 0;
  this.h = 0;
};

const getGrid = (map) => {
  const grid = [];
  map = map.split("\n");
  for (let i = 1; i < map.length - 1; i++) {
    grid.push([map[i]]);
  }
  return grid;
};

const setup = (grid) => {
  const openSet = [];
  let start = [];
  let end = [];
  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid.length; j++) {
      new Spot();
      if (grid[i][j] === "1") start.push({ x: j, y: i });
      else if (grid[i][j] === "2") end.push({ x: j, y: i });
    }

  openSet.push(start);
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
