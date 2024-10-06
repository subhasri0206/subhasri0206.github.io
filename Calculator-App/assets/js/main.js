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
        currentInput += number;
        updateDisplay(currentInput);
    }
}

function handleOperator(op) {
    if (currentInput === '') return;
    previousInput = currentInput;
    currentInput = '';
    operator = op;
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
        case '÷':
            result = current === 0 ? 'Error' : previous / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    updateDisplay(currentInput);
}

function resetCalculator() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay('0');
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
}

function updateDisplay(value) {
    display.value = value;
}
