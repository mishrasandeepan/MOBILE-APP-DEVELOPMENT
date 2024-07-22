// Hardcoded value
var number = 5;
var fact = 1;

if (number < 0) {
  console.log("Factorial is not defined for negative numbers.");
} else if (number === 0 || number === 1) {
  fact = 1;
} else {
  for (var i = 2; i <= number; i++) {
    fact *= i;
  }
}

console.log('The factorial of ' + number + ' is ' + fact);