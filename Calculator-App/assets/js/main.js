const themeSlider = document.getElementById('themeSlider');

themeSlider.addEventListener('input', () => {
    const themeValue = themeSlider.value;
    document.body.classList.remove('theme1', 'theme2', 'theme3');

    if (themeValue === '1') {
        document.body.classList.add('theme1');
    } else if (themeValue === '2') {
        document.body.classList.add('theme2');
    } else if (themeValue === '3') {
        document.body.classList.add('theme3');
    }
});

document.body.classList.add('theme1');

const display = document.getElementById('calc-display');
const equationDisplay = document.getElementById('calc-equation');
let currentInput = '';
let operator = '';
let previousInput = '';

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        if (button.hasAttribute('data-number')) {
            handleNumber(button.textContent);
        } else if (button.hasAttribute('data-operator')) {
            handleOperator(button.textContent);
        } else if (button.id === 'reset') {
            resetCalculator();
        } else if (button.id === 'equals') {
            calculateResult();
        } else if (button.hasAttribute('data-decimal')) {
            handleDecimal();
        } else if (button.id === 'del') {
            deleteLast();
        }
    });
});

function handleNumber(number) {
    if (currentInput.length < 12) {
        if (currentInput === '0') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplay(currentInput);
        updateEquationDisplay();
    }
}

function handleOperator(op) {
    if (currentInput === '') return;
    previousInput = currentInput;
    currentInput = '';
    operator = op;
    updateEquationDisplay();
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
}

function calculateResult() {
    let result;
    const previous = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(previous) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = previous + current;
            break;
        case '-':
            result = previous - current;
            break;
        case '×':
            result = previous * current;
            break;
        case '/':
            result = current === 0 ? 'Error' : previous / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    updateDisplay(currentInput);
    equationDisplay.value += ` = ${currentInput}`;
}

function resetCalculator() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay('0');
    equationDisplay.value = '';
}

function deleteLast() {
    resetEquationDisplay();
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
    updateEquationDisplay();
    previousInput = '';
    operator = '';
    resetEquationDisplay();
}

function resetEquationDisplay() {
    equationDisplay.value = '';
}

function updateDisplay(value) {
    display.value = value;
}

function updateEquationDisplay() {
    equationDisplay.value = previousInput + (operator ? ` ${operator} ` : '') + currentInput;
}

updateDisplay('0'); // Ensures zero is displayed at start