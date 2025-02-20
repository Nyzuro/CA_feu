const printRectangle = (width, height) => {
  for (let i = 1; i <= height; i++) {
    let line = "";
    for (let j = 1; j <= width; j++) {
      if (i === 1 || i === height) {
        if (j === 1) line += "o";
        else if (j === width) line += "o";
        else line += "-";
      } 
      
      else {
        if (j === 1) line += "|";
        else if (j === width) line += "|";
        else line += " ";
      }
    }
    console.log(line)
  }
};

printRectangle(3, 2);
