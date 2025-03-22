if (process.argv.length !== 5) {
  console.log("params needed: x y density");
  process.exit(1);
}

const x = parseInt(process.argv[2], 10);
const y = parseInt(process.argv[3], 10);
const density = parseInt(process.argv[4], 10);

console.log(`${y}.xo`);

for (let i = 0; i <= y; i++) {
  let line = "";
  for (let j = 0; j <= x; j++) {
    line += Math.random() * y * 2 < density ? "x" : ".";
  }
  console.log(line);
}
