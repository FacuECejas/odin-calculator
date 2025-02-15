
let firstOperand;
let secondOperand;
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