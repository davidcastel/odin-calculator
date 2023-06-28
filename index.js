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
            _clearCurrentValue();
            _clearEquationAndOperation();
            break;
        case "=":
            if (_getFirstIsSet() && VARS.current.stringForm !== EMPTY_STRING) {
                let currentValue = parseFloat(VARS.current.stringForm);
                VARS.equation.push(currentValue);

                if (_areWeDividingByZero(currentValue)) {
                    VARS.equation.push(value);
                    _handleDividingByZero();
                    break;
                }
                currentValue = OPERATE(_getFirstValue(), currentValue, _getOperation());

                VARS.equation.push(value, currentValue);

                _setCurrentObjectValues(currentValue);

                _setFirstIsSet(false);

                _displayFinalValueAndEquation(currentValue);
                _clearEquationAndOperation();
            }
            break;
        case ".":
            if (_isCurrentValueAWholeNumber()) {
                _setCurrentIsWholeNumber(false)
                displayIndividualNumber(DECIMAL_POINT, ADD);
            }
            break;
        case "+/-":
            _setNegativeValue(EMPTY_STRING);
            break;
        default:
            if ( VARS.current.stringForm === EMPTY_STRING ) break;

            let currentValue = parseFloat(VARS.current.stringForm);
            VARS.equation.push(currentValue);

            if (_getFirstIsSet()) {
                currentValue = parseFloat(VARS.current.stringForm);
                if (_areWeDividingByZero(currentValue)) {
                    _handleDividingByZero();
                    break;
                }
                currentValue = OPERATE(_getFirstValue(), currentValue, _getOperation());

                _setCurrentObjectValues(currentValue);

                _setFirstIsSet(false);
            }

            _setFirstNumberObjectValues();
            _clearCurrentValue();

            _setOperation(value);
            VARS.equation.push(value);

            displayIndividualNumber(value, ADD);
            _clearCurrentValue();
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

const _displayFinalValueAndEquation = (currentValue) => {
    let displayEquation = VARS.equation.join(' ');
    let equationSpan = document.getElementById('equation');
    let individualNumber = document.getElementById('individualNumber');
    equationSpan.textContent = displayEquation;
    individualNumber.textContent = currentValue;
};

const _handleDividingByZero = () => {
    _setFirstIsSet(false);
    _displayFinalValueAndEquation("Error! Cannot divide by 0");
    _clearCurrentValue();
    _clearEquationAndOperation();
};

const _isInputADigit = (value) => value.match(/^\d+$/) ? true : false;

const _isCurrentValueAWholeNumber = () => VARS.current.isWholeNumber === true;

const _setCurrentIsWholeNumber = (bool) => VARS.current.isWholeNumber = bool;

const _setFirstIsSet = (bool) => VARS.first.isSet = bool;

const _setFirstValue = (val) => VARS.first.value = val;

const _setOperation = (oper) => VARS.operatation = oper;

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

const _setCurrentObjectValues = (currentValue) => {
    VARS.current.isNegative = currentValue < 0 ? true : false;
    VARS.current.isWholeNumber = Number.isInteger(currentValue);
    VARS.current.value = currentValue;
    VARS.current.stringForm = "" + currentValue;
};

const _setFirstNumberObjectValues = () => {
    _setFirstValue(parseFloat(VARS.current.stringForm));
    VARS.first.isWholeNumber = VARS.current.isWholeNumber;
    VARS.first.isNegative = VARS.current.isNegative;
    _setFirstIsSet(true);
}

const _getFirstIsSet = () => VARS.first.isSet;

const _getFirstValue = () => VARS.first.value;

const _getOperation = () => VARS.operatation;

const _clearCurrentValue = () => {
    VARS.current.stringForm = "";
    VARS.current.value = 0;
    VARS.current.isWholeNumber = true;
    VARS.current.isNegative = false;
};

const _clearEquationAndOperation = () => {
    _setOperation("");
    VARS.equation = [];
};

const _areWeDividingByZero = (val) => (val === 0 || val === 0.0) && _getOperation() === "/";

const main = () => {
    inputPressed();
};

main();