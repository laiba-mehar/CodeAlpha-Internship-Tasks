document.addEventListener('DOMContentLoaded', () => {
  const previousOperandText = document.getElementById('previousOperand');
  const currentOperandText = document.getElementById('currentOperand');
  
  const numberBtns = document.querySelectorAll('.number-btn');
  const operatorBtns = document.querySelectorAll('.operator-btn');
  const equalsBtn = document.getElementById('equalsBtn');
  const clearBtn = document.getElementById('clearBtn');
  const deleteBtn = document.getElementById('deleteBtn');

  let currentOperand = '0';
  let previousOperand = '';
  let operation = null;
  let resetDisplayOnNextInput = false;

  // Update Display
  function updateDisplay() {
    currentOperandText.textContent = currentOperand;
    if (operation != null) {
      previousOperandText.textContent = `${previousOperand} ${operation}`;
    } else {
      previousOperandText.textContent = '';
    }
  }

  // Append Number
  function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    
    if (currentOperand === '0' && number !== '.') {
      currentOperand = number;
    } else if (resetDisplayOnNextInput) {
      currentOperand = number;
      resetDisplayOnNextInput = false;
    } else {
      currentOperand += number;
    }
    updateDisplay();
  }

  // Select Operation
  function chooseOperation(op) {
    if (currentOperand === '' && previousOperand === '') return;
    
    if (previousOperand !== '') {
      compute();
    }

    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    resetDisplayOnNextInput = false;
    updateDisplay();
  }

  // Perform Calculation
  function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
      case '−':
        computation = prev - current;
        break;
      case '×':
      case '*':
        computation = prev * current;
        break;
      case '÷':
      case '/':
        if (current === 0) {
          alert('Cannot divide by zero!');
          clearAll();
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }

    // Fix JavaScript floating point precision issues (e.g. 0.1 + 0.2)
    currentOperand = Math.round(computation * 1e10) / 1e10 + '';
    operation = null;
    previousOperand = '';
    resetDisplayOnNextInput = true;
    updateDisplay();
  }

  // Clear All (AC)
  function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    resetDisplayOnNextInput = false;
    updateDisplay();
  }

  // Delete Last Character (DEL)
  function deleteNumber() {
    if (resetDisplayOnNextInput) return;
    if (currentOperand.length === 1 || currentOperand === '0') {
      currentOperand = '0';
    } else {
      currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
  }

  // Event Listeners for Buttons
  numberBtns.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
  });

  operatorBtns.forEach(button => {
    button.addEventListener('click', () => chooseOperation(button.getAttribute('data-operator')));
  });

  equalsBtn.addEventListener('click', compute);
  clearBtn.addEventListener('click', clearAll);
  deleteBtn.addEventListener('click', deleteNumber);

  // Keyboard Support
  document.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
      appendNumber(e.key);
    }
    if (e.key === '+' || e.key === '-') {
      chooseOperation(e.key);
    }
    if (e.key === '*') {
      chooseOperation('×');
    }
    if (e.key === '/') {
      e.preventDefault();
      chooseOperation('÷');
    }
    if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      compute();
    }
    if (e.key === 'Backspace') {
      deleteNumber();
    }
    if (e.key === 'Escape') {
      clearAll();
    }
  });
});
