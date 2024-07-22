// Hardcoded values
var num1 = 20;
var num2 = 4;
var operation = '+';
var result;

if (operation === '+') {
  result = num1 + num2;
} else if (operation === '-') {
  result = num1 - num2;
} else if (operation === 'x') {
  result = num1 * num2;
} else if (operation === '/') {
  result = num2 !== 0 ? num1 / num2 : 'Division by zero is not allowed';
} else if (operation === '%') {
  result = num1 % num2;
} else {
  result = 'Invalid operator';
}

console.log('The result of ' + num1 + ' ' + operation + ' ' + num2 + ' is ' + result);