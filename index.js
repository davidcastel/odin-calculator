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
        isWholeNumber: true,
        isNegative: false,
        isSet: false
    },
    current: {
        stringForm: "",
        value: 0,
        isWholeNumber: true,
        isNegative: false
    },
    operatation: "",
    equation: [],
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
            inputController(input.value);
        });
    });
};

const inputController = (value) => {
    const CLEAR = "clear";
    const ADD = "add";
    const DECIMAL_POINT = ".";
    const EMPTY_STRING = "";

    if (_isInputADigit(value)) {
        displayIndividualNumber(value, ADD);
        return;
    }

    switch(value) {
        case "clear":
            displayIndividualNumber(EMPTY_STRING, CLEAR);

            VARS.current.stringForm = "";
            VARS.current.value = 0;
            VARS.current.isWholeNumber = true;
            VARS.current.isNegative = false;

            VARS.operatation = "";
            VARS.equation = [];
            break;
        case "=":
            if (VARS.first.isSet) {
                let currentValue = parseFloat(VARS.current.stringForm);
                VARS.equation.push(currentValue);
                currentValue = OPERATE(VARS.first.value, currentValue, VARS.operatation);

                VARS.equation.push(value, currentValue);

                VARS.current.isNegative = currentValue < 0 ? true : false;
                VARS.current.isWholeNumber = Number.isInteger(currentValue);
                VARS.current.value = currentValue;
                VARS.current.stringForm = "" + currentValue;

                VARS.first.isSet = false;

                let displayEquation = VARS.equation.join(' ');

                let equationSpan = document.getElementById('equation');
                let individualNumber = document.getElementById('individualNumber');
                equationSpan.textContent = displayEquation;
                individualNumber.textContent = currentValue;

                VARS.operatation = "";
                VARS.equation = [];
            }
            break;
        case ".":
            if (_isCurrentValueAWholeNumber()) {
                _setWholeNumber(false)
                displayIndividualNumber(DECIMAL_POINT, ADD);
            }
            break;
        case "+/-":
            _setNegativeValue(EMPTY_STRING);
            break;
        default:
            let currentValue = parseFloat(VARS.current.stringForm);
            VARS.equation.push(currentValue);

            if (VARS.first.isSet) {
                currentValue = parseFloat(VARS.current.stringForm);
                currentValue = OPERATE(VARS.first.value, currentValue, VARS.operatation);

                VARS.current.isNegative = currentValue < 0 ? true : false;
                VARS.current.isWholeNumber = Number.isInteger(currentValue);
                VARS.current.value = currentValue;
                VARS.current.stringForm = "" + currentValue;

                VARS.first.isSet = false;
            }

            VARS.first.value = parseFloat(VARS.current.stringForm);
            VARS.first.isWholeNumber = VARS.current.isWholeNumber;
            VARS.first.isNegative = VARS.current.isNegative;
            VARS.first.isSet = true;

            VARS.current.stringForm = "";
            VARS.current.value = 0;
            VARS.current.isWholeNumber = true;
            VARS.current.isNegative = false;

            VARS.operatation = value;
            VARS.equation.push(value);

            displayIndividualNumber(value, ADD);

            VARS.current.stringForm = "";
            VARS.current.value = 0;
            VARS.current.isWholeNumber = true;
            VARS.current.isNegative = false;
            break;
    }
};

const displayIndividualNumber = (value, action) => {
    let individualNumber = document.getElementById('individualNumber');
    
    if (action === "add") {
        VARS.current.stringForm += value;
        individualNumber.textContent += value;
    }
    else if (action === "clear") {
        VARS.current.stringForm = value;
        individualNumber.textContent = value;
    }
};

const _isInputADigit = (value) => value.match(/^\d+$/) ? true : false;

const _isCurrentValueAWholeNumber = () => VARS.current.isWholeNumber === true;

const _setWholeNumber = (bool) => VARS.current.isWholeNumber = bool;

const _setNegativeValue = (EMPTY_STRING) => {
    let individualNumber = document.getElementById('individualNumber');
    let isCurrentValueNegative = VARS.current.isNegative;
    let stringForm = VARS.current.stringForm;
    const NEGATIVE_SIGN = "-";

    isCurrentValueNegative = isCurrentValueNegative ? false : true;
    VARS.current.isNegative = isCurrentValueNegative;

    if (isCurrentValueNegative === true) {
        stringForm = NEGATIVE_SIGN.concat(stringForm);
        VARS.current.stringForm = stringForm;
        individualNumber.textContent = stringForm;
    }
    else {
        stringForm = stringForm.replace(NEGATIVE_SIGN, EMPTY_STRING);
        VARS.current.stringForm = stringForm;
        individualNumber.textContent = stringForm;
    }
};

const main = () => {
    inputPressed();
};

main();