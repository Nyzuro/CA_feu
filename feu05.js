const fs = require("fs");
let grid = [];
let openSet = [];
let closedSet = [];
let start = [];
let end = [];

const removeFromArray = (array, element) => {
  for (let i = array.length; i >= 0; i--)
    if (array[i] === element) {
      array.splice(i, 1);
    }
};

class Spot {
  constructor(x, y, char) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];

    this.addNeighbors = function (grid) {
      const i = this.x;
      const j = this.y;
      if (i < grid.length - 1) {
        this.neighbors.push(grid[i + 1][j]);
      }
      if (i > 0) {
        this.neighbors.push(grid[i - 1][j]);
      }
      if (j < grid[i].length - 1) {
        this.neighbors.push(grid[i][j + 1]);
      }
      if (j > 0) {
        this.neighbors.push(grid[i][j - 1]);
      }
    };
  }
}

const getGrid = (map) => {
  const grid = [];
  map = map.split("\n");
  for (let i = 1; i < map.length - 1; i++) {
    grid.push(map[i].split(""));
  }
  return grid;
};

const setup = (grid) => {
  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[i].length; j++) {
      const char = grid[i][j];
      grid[i][j] = new Spot(i, j, char);
      if (grid[i][j].char === "1") start.push(grid[i][j]);
      else if (grid[i][j].char === "2") end.push(grid[i][j]);
    }

  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].addNeighbors(grid);
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
