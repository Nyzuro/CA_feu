const fs = require("fs");

const args = process.argv.slice(2);

if (args.length < 3 || args[2].length < 5) {
  console.error("params needed: height width characters");
  process.exit();
}
const height = parseInt(args[0], 10);
const width = parseInt(args[1], 10);
const chars = args[2];

const entry = Math.floor(Math.random() * (width - 4)) + 2;
const exit1 = Math.floor(Math.random() * (width - 4)) + 2;
const exit2Side = Math.random() < 0.5 ? "left" : "right";
const exit2 = Math.floor(Math.random() * (height - 2)) + 1;

let labyrinth = `${height}x${width}${chars}\n`;

for (let y = 0; y < height; y++) {
  let row = "";

  for (let x = 0; x < width; x++) {
    if (y === 0 && x === exit1) {
      row += chars[4];
    } else if (y === height - 1 && x === entry) {
      row += chars[3];
    } else if ((exit2Side === "left" && x === 0 && y === exit2) || (exit2Side === "right" && x === width - 1 && y === exit2)) {
      row += chars[4];
    } else if (y > 0 && y < height - 1 && x > 0 && x < width - 1) {
      row += Math.random() > 0.2 ? " " : chars[0];
    } else {
      row += chars[0];
    }
  }

  labyrinth += row + "\n";
}

fs.writeFileSync("labyrinth.map", labyrinth);
