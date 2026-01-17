import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);

  const handleDigit = (digit) => {
    if (waitingForSecond) {
      setDisplay(String(digit));
      setWaitingForSecond(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const handleOperator = (nextOp) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performMath(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }
    setWaitingForSecond(true);
    setOperator(nextOp);
  };

  const performMath = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : "Error";
      default: return b;
    }
  };

  const calculateResult = () => {
    if (!operator || waitingForSecond) return;
    const result = performMath(firstOperand, parseFloat(display), operator);
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const clear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  return (
    <div className="app-wrapper">
      <div className="calc-container">
        <div className="calc-display">{display}</div>
        <div className="calc-grid">
          <button onClick={clear} className="btn utility">AC</button>
          <button onClick={() => handleOperator('/')} className="btn operator">÷</button>
          <button onClick={() => handleOperator('*')} className="btn operator">×</button>
          <button onClick={() => handleOperator('-')} className="btn operator">−</button>

          <button onClick={() => handleDigit(7)} className="btn">7</button>
          <button onClick={() => handleDigit(8)} className="btn">8</button>
          <button onClick={() => handleDigit(9)} className="btn">9</button>
          <button onClick={() => handleOperator('+')} className="btn operator">+</button>

          <button onClick={() => handleDigit(4)} className="btn">4</button>
          <button onClick={() => handleDigit(5)} className="btn">5</button>
          <button onClick={() => handleDigit(6)} className="btn">6</button>
          <button onClick={calculateResult} className="btn equal">=</button>

          <button onClick={() => handleDigit(1)} className="btn">1</button>
          <button onClick={() => handleDigit(2)} className="btn">2</button>
          <button onClick={() => handleDigit(3)} className="btn">3</button>
          
          <button onClick={() => handleDigit(0)} className="btn zero">0</button>
          <button onClick={() => !display.includes('.') && setDisplay(display + '.')} className="btn">.</button>
        </div>
      </div>
    </div>
  );
}

export default App;