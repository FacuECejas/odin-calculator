
let firstOperand = 0;
let secondOperand = null;
let operator = "";

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
        handleOperator();
    } else {
        handleNumber();
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
    return;
}

function handleOperator() {
    return;
}

function handleNumber() {
    return;
}
