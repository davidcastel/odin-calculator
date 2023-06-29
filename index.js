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
            if (_getFirstIsSet() && _getCurrentStringFormat() !== EMPTY_STRING) {
                let currentValue = parseFloat(_getCurrentStringFormat());
                _addToEquationArr(currentValue);

                if (_areWeDividingByZero(currentValue)) {
                    _addToEquationArr(value);
                    _handleDividingByZero();
                    break;
                }

                currentValue = OPERATE(_getFirstValue(), currentValue, _getOperation());
                _addToEquationArr(value);
                _addToEquationArr(currentValue);
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
            if ( _getCurrentStringFormat() === EMPTY_STRING ) break;

            let currentValue = parseFloat(_getCurrentStringFormat());
            _addToEquationArr(currentValue);

            if (_getFirstIsSet()) {
                currentValue = parseFloat(_getCurrentStringFormat());
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
            _addToEquationArr(value);

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
        _setCurrentStringFormat(value);
        individualNumber.textContent = value;
    }
};

const _displayFinalValueAndEquation = (currentValue) => {
    let displayEquation = _getEquation().join(' ');
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

const _isCurrentValueAWholeNumber = () => _getCurrentIsWholeNumber() === true;

const _setCurrentIsWholeNumber = (bool) => VARS.current.isWholeNumber = bool;
const _setFirstIsSet = (bool) => VARS.first.isSet = bool;
const _setFirstValue = (val) => VARS.first.value = val;
const _setOperation = (oper) => VARS.operatation = oper;
const _setFirstIsWholeNumber = (bool) => VARS.first.isWholeNumber = bool;
const _setFirstIsNegative = (bool) => VARS.first.isNegative = bool;
const _setCurrentStringFormat = (str) => VARS.current.stringForm = str;
const _setCurrentIsNegative = (bool) => VARS.current.isNegative = bool;
const _setCurrentValue = (val) => VARS.current.value = val;

const _addToEquationArr = (val) => VARS.equation.push(val);
const _clearEquationArr = () => VARS.equation = [];

const _setNegativeValue = (EMPTY_STRING) => {
    let individualNumber = document.getElementById('individualNumber');
    let isCurrentValueNegative = _getCurrentIsNegative();
    let stringForm = _getCurrentStringFormat();
    const NEGATIVE_SIGN = "-";

    isCurrentValueNegative = isCurrentValueNegative ? false : true;
    _setCurrentIsNegative(isCurrentValueNegative)

    if (isCurrentValueNegative === true) {
        stringForm = NEGATIVE_SIGN.concat(stringForm);
    }
    else {
        stringForm = stringForm.replace(NEGATIVE_SIGN, EMPTY_STRING);
    }

    _setCurrentStringFormat(stringForm);
    individualNumber.textContent = stringForm;
};

const _setCurrentObjectValues = (currentValue) => {
    _setCurrentIsNegative(currentValue < 0 ? true : false);
    _setCurrentIsWholeNumber(Number.isInteger(currentValue));
    _setCurrentValue(currentValue);
    _setCurrentStringFormat("" + currentValue);
};

const _setFirstNumberObjectValues = () => {
    _setFirstValue(parseFloat(_getCurrentStringFormat()));
    _setFirstIsWholeNumber(_getCurrentIsWholeNumber());
    _setFirstIsNegative(_getCurrentIsNegative());
    _setFirstIsSet(true);
}

const _getFirstIsSet = () => VARS.first.isSet;
const _getFirstValue = () => VARS.first.value;
const _getOperation = () => VARS.operatation;
const _getEquation = () => VARS.equation;
const _getCurrentStringFormat = () => VARS.current.stringForm;
const _getCurrentIsNegative = () => VARS.current.isNegative;
const _getCurrentIsWholeNumber = () => VARS.current.isWholeNumber;

const _clearCurrentValue = () => {
    _setCurrentStringFormat("");
    _setCurrentValue(0);
    _setCurrentIsWholeNumber(true);
    _setCurrentIsNegative(false);
};

const _clearEquationAndOperation = () => {
    _setOperation("");
    _clearEquationArr();
};

const _areWeDividingByZero = (val) => (val === 0 || val === 0.0) && _getOperation() === "/";

const main = () => {
    inputPressed();
};

main();