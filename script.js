
let firstOperand = 0;
let secondOperand = null;
let operator = "";
let noConcat = false;

const add = function(a, b){
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multipĺy = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    return a / b;
}

const operate = function (firstOperand, operator, secondOperand){
    switch(operator) {
        case "+":
            return add(firstOperand, secondOperand);
        case "-":
            return subtract(firstOperand, secondOperand);
        case "*":
            return multipĺy(firstOperand, secondOperand);
        case "/":
            return divide(firstOperand, secondOperand);
        default:
            return;
    }
}

const display = document.querySelector(".display");
display.textContent = firstOperand;

const buttons = document.querySelectorAll("button");
buttons.forEach((btn)=>{
    btn.addEventListener('click', buttonHandling);
})

function buttonHandling(event) {
    let btnKey = event.target.textContent;

    if(btnKey === "Clear") {
        handleClear();
    } else if (btnKey === "Del") {
        handleDelete();
    } else if (btnKey === ".") {
        handleDecimal();
    } else if (btnKey === "=") {
        handleEqual();
    } else if ("+-*/".includes(btnKey)) {
        handleOperator(btnKey);
    } else {
        handleNumber(btnKey);
    }
}

function handleClear() {
    firstOperand = 0;
    operator = "";
    secondOperand = null;
    display.textContent = firstOperand;
}

/*To implement later */
function handleDelete() {
    return;
}

/*To implement later */
function handleDecimal() {
    return;
}

function handleEqual() {
    let result = 0;

    if (operator === "") {
        return;
    } else if (secondOperand === null) {
        result = operate(firstOperand, operator, firstOperand);
        noConcat = true;
    } else {
        result = operate(firstOperand, operator, secondOperand);
        noConcat = true;
    }

    displayAndClear(result);
}

function handleOperator(operatorPressed) {
    if (secondOperand === null){
        operator = operatorPressed;
    } else {
        let result = operate(firstOperand, operator, secondOperand);
        displayAndClear(result);
        operator = operatorPressed;
    }
}

function handleNumber(numberPressed) {
    
    if (noConcat) {
        firstOperand = Number(numberPressed);
        display.textContent = firstOperand;
        noConcat = false;
    }
    else if(operator === "") {
        firstOperand = Number(concatToDisplay(numberPressed));
        display.textContent = firstOperand;
    } 
    else if (secondOperand === null) {
        secondOperand = Number(numberPressed);
        display.textContent = secondOperand;
    } else {
        secondOperand = Number(concatToDisplay(numberPressed));
        display.textContent = secondOperand;
    }
}

function concatToDisplay(number){
    let currentDisplay = display.textContent;

    if (currentDisplay === "0") currentDisplay = "";
        
    return currentDisplay += number;
}

function displayAndClear(result) {
    display.textContent = result;
    firstOperand = result;
    operator = "";
    secondOperand = null;
}