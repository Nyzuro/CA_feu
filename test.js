let string = "1";

for (let i = 0; i < string.length; i++) {
  if (string[i] !== "*" && string[i] !== "+") {
    console.log(string[i]);
    string[i].replace(string[i], parseInt(string[i]));
    console.log(string[i]);
  }
}
