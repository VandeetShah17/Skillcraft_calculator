const result = document.getElementById("result");
let expression = "";

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", () => handleInput(button.dataset.key));
});

document.addEventListener("keydown", (e) => {
  const validKeys = "0123456789+-*/%.EnterBackspace";
  if (validKeys.includes(e.key) || e.key === "Enter" || e.key === "Backspace") {
    handleInput(e.key);
  }
});

function handleInput(key) {
  switch (key) {
    case "Enter":
      calculate();
      break;
    case "Backspace":
      expression = expression.slice(0, -1);
      updateDisplay();
      break;
    case "C":
      expression = "";
      updateDisplay();
      break;
    case "=":
      calculate();
      break;
    default:
      expression += key;
      updateDisplay();
  }
}

function updateDisplay() {
  result.value = expression || "0";
}

function calculate() {
  try {
    let sanitized = expression.replace(/[^-()\d/*+.%]/g, '');
    sanitized = sanitized.replace(/%/g, "/100");
    let evalResult = eval(sanitized);
    expression = evalResult.toString();
    updateDisplay();
  } catch (err) {
    result.value = "Error";
    expression = "";
  }
}
