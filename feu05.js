const fs = require("fs");

const getGrid = (map) => {
  const grid = [];
  map = map.split("\n");
  for (let i = 1; i < map.length - 1; i++) {
    grid.push(map[i].split(""));
  }
  return grid;
};

const AStar = (grid) => {
  let openSet = [];
  let closedSet = [];
  let start = undefined;
  let ends = [];
  let path = [];

  const manhattanDistance = (a, b) => {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  };

  const heuristic = (position, ends) => {
    let lowestDistance = Infinity;
    for (const end of ends) {
      const dist = manhattanDistance(position, end);
      if (dist < lowestDistance) lowestDistance = dist;
    }
    return lowestDistance;
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
      this.parent = undefined;

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

  const init = (grid) => {
    const nodesGrid = grid.map((row) => [...row]);
    for (let i = 0; i < nodesGrid.length; i++)
      for (let j = 0; j < nodesGrid[i].length; j++) {
        const char = nodesGrid[i][j];
        nodesGrid[i][j] = new Spot(i, j, char);
        if (nodesGrid[i][j].char === "1") start = nodesGrid[i][j];
        else if (nodesGrid[i][j].char === "2") ends.push(nodesGrid[i][j]);
      }

    for (let i = 0; i < nodesGrid.length; i++)
      for (let j = 0; j < nodesGrid[i].length; j++) {
        nodesGrid[i][j].addNeighbors(nodesGrid);
      }
    openSet.push(start);
  };

  const findSolution = (grid) => {
    init(grid);
    while (openSet.length > 0) {
      let lowestIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }
      let current = openSet[lowestIndex];

      if (current.char === "2") {
        let temp = current;
        path.push(temp);
        while (temp.parent) {
          path.push(temp.parent);
          temp = temp.parent;
        }
        return path.reverse();
      }

      openSet.splice(lowestIndex, 1);
      closedSet.push(current);

      const neighbors = current.neighbors;
      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];

        if (!closedSet.includes(neighbor) && neighbor.char !== "*") {
          tempG = current.g + 1;

          if (openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
            }
          } else {
            neighbor.g = tempG;
            openSet.push(neighbor);
          }

          neighbor.h = heuristic(neighbor, ends);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
        }
      }
    }
    console.log("No solution");
    return;
  };
  return findSolution(grid);
};

const getPathVisible = (grid, path) => {
  for (const node of path) {
    if (node.char !== "1" && node.char !== "2") {
      let nodeX = node.x;
      let nodeY = node.y;
      grid[nodeX][nodeY] = "o";
    }
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

const displayLabyrinthPath = () => {
  const arguments = isValidArgument(getArguments());
  if (!arguments) return;
  const argument = arguments[0];

  const map = fs.readFileSync(`${argument}`, "utf-8");
  const grid = getGrid(map);

  const path = AStar(grid);
  if (!path) return;

  const solution = getPathVisible(grid, path);
  solution.map((row) => console.log(row.join("")));
};

displayLabyrinthPath();
