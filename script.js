const currentDisplay = document.getElementById("current-display");
const previousDisplay = document.getElementById("previous-display");

let currentValue = "0";
let previousValue = "";
let operator = null;
let shouldResetDisplay = false;



function updateDisplay() {
    currentDisplay.textContent = currentValue;
    previousDisplay.textContent =
        operator && previousValue
            ? `${previousValue} ${operator}`
            : "";
}

function addNumber(number) {

    if (currentValue === "Error") {
        currentValue = "0";
    }

    if (shouldResetDisplay) {
        currentValue = number;
        shouldResetDisplay = false;
    } 
    else if (currentValue === "0") {
        currentValue = number;
    } 
    else {
        currentValue += number;
    }

    updateDisplay();
}



function addDecimal() {

    if (shouldResetDisplay) {
        currentValue = "0.";
        shouldResetDisplay = false;
    }

    if (!currentValue.includes(".")) {
        currentValue += ".";
    }

    updateDisplay();
}



function chooseOperator(selectedOperator) {

    if (currentValue === "Error") {
        return;
    }

    if (operator && !shouldResetDisplay) {
        calculate();
    }

    previousValue = currentValue;
    operator = selectedOperator;
    shouldResetDisplay = true;

    updateDisplay();
}



function calculate() {

    if (!operator || previousValue === "") {
        return;
    }

    const firstNumber = parseFloat(previousValue);
    const secondNumber = parseFloat(currentValue);

    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "×":
            result = firstNumber * secondNumber;
            break;

        case "÷":

            if (secondNumber === 0) {
                currentValue = "Error";
                previousValue = "";
                operator = null;

                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;
    }

    
    result = Number(result.toFixed(10));

    currentValue = String(result);

    previousValue = "";
    operator = null;
    shouldResetDisplay = true;

    updateDisplay();
}



function clearCalculator() {

    currentValue = "0";
    previousValue = "";
    operator = null;
    shouldResetDisplay = false;

    updateDisplay();
}



function deleteNumber() {

    if (currentValue === "Error") {
        clearCalculator();
        return;
    }

    if (shouldResetDisplay) {
        return;
    }

    if (currentValue.length === 1) {
        currentValue = "0";
    } 
    else {
        currentValue = currentValue.slice(0, -1);
    }

    updateDisplay();
}



function percentage() {

    if (currentValue === "Error") {
        return;
    }

    currentValue = String(parseFloat(currentValue) / 100);

    updateDisplay();
}



function toggleSign() {

    if (currentValue === "0" || currentValue === "Error") {
        return;
    }

    if (currentValue.startsWith("-")) {
        currentValue = currentValue.slice(1);
    } 
    else {
        currentValue = "-" + currentValue;
    }

    updateDisplay();
}


// Button click events
document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", () => {

        const number = button.dataset.number;
        const selectedOperator = button.dataset.operator;
        const action = button.dataset.action;

        if (number !== undefined) {
            addNumber(number);
        }

        if (selectedOperator !== undefined) {
            chooseOperator(selectedOperator);
        }

        switch (action) {

            case "decimal":
                addDecimal();
                break;

            case "calculate":
                calculate();
                break;

            case "clear":
                clearCalculator();
                break;

            case "delete":
                deleteNumber();
                break;

            case "percentage":
                percentage();
                break;

            case "sign":
                toggleSign();
                break;
        }

    });

});



document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (key >= "0" && key <= "9") {
        addNumber(key);
    }

    
    else if (key === ".") {
        addDecimal();
    }

    
    else if (key === "+") {
        chooseOperator("+");
    }

    else if (key === "-") {
        chooseOperator("-");
    }

    else if (key === "*") {
        chooseOperator("×");
    }

    else if (key === "/") {
        event.preventDefault();
        chooseOperator("÷");
    }

    
    else if (key === "Enter" || key === "=") {
        calculate();
    }

    
    else if (key === "Backspace") {
        deleteNumber();
    }

    
    else if (key === "Escape") {
        clearCalculator();
    }


    else if (key === "%") {
        percentage();
    }

});