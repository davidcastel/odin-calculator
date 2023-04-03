// Add Method
const ADD = (a, b) => a + b;

// Subtract Method
const SUBTRACT = (a, b) => a - b;

// Multiply Method
const MULTIPLE = (a, b) => a * b;

// DIVIDE method
const DIVIDE = (a, b) => a / b;

// Global Variables
const VARS = {
    first: 0,
    operatation: "",
    second: 0
};

const OPERATE = (num1, num2, oper) => {
    switch (oper) {
        case "+":
            return ADD(num1, num2);
        case "-":
            return SUBTRACT(num1, num2);
        case "*":
            return MULTIPLE(num1, num2);
        case "/":
            return DIVIDE(num1, num2);
        default:
            break;
    }
};