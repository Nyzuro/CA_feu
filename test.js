const regex = /^\d+/;
const expr = "12 + 24 - 3 * 5 / 2";
let exprTrim = expr.trim();
exprTrim = exprTrim.slice(2).trim();
console.log(exprTrim);
