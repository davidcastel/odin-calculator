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
    first: {
        value: 0,
        isWholeNumber: true
    },
    second: {
        value: 0,
        isWholeNumber: true
    },
    operatation: "",
    display: "",
    equation: [],
    total: 0
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

const inputPressed = () => {
    let INPUTS = document.querySelectorAll('input');
    
    INPUTS.forEach(input => {
        input.addEventListener('click', () => {
            console.log(input.value);
        });
    });
};

const main = () => {
    inputPressed();
};

main();