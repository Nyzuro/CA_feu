const getArguments = () => {
  const arguments = process.argv.slice(2);
  return arguments;
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

const getLabyrinthPath = () => {
  const arguments = isValidArgument(getArguments());
  if (!arguments) return;
  const argument = arguments[0];
};
