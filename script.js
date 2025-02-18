
let firstOperand = 0;
let secondOperand = null;
let operator = "";
let noConcat = false;
let noOperator = false;

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

window.addEventListener('keydown', keyHandling);

function buttonHandling(event) {
    let btnKey = event.target.textContent;

    if(btnKey === "Clear") {
        handleClear();
    } else if (btnKey === "Del") {
        handleDelete();
    } else if (btnKey === "=") {
        handleEqual();
    } else if (btnKey === "+/-") {
        handleSign();
    } else if ("+-*/".includes(btnKey)) {
        handleOperator(btnKey);
    } else {
        handleNumber(btnKey);
    }
}

function keyHandling(event) {
    let key = event.key;

    if (key === "Backspace") {
        handleDelete();
    } else if (key === "=") {
        handleEqual();
    } else if ("+-*/".includes(key)) {
        handleOperator(key);
    } else if ("1234567890.".includes(key)) {
        handleNumber(key);
    }
}

function handleClear() {
    firstOperand = 0;
    operator = "";
    secondOperand = null;
    display.textContent = firstOperand;
}

function handleDelete() {
    //Don't do anything to Error messages
    if (noOperator) return;
    
    //Delete an operator
    if (secondOperand === null & operator !== "") {
        operator = "";
    } 
    else { //Delete number
        let array = display.textContent.split('');
        array.pop();
        if (array.length === 0 && secondOperand !== null) {
            secondOperand = null;
            display.textContent = firstOperand;
        } else if (array.length === 0 && secondOperand === null){
            display.textContent = 0;
        } else {
            display.textContent = array.join('');;
        }
    }

}

function handleEqual() {
    let result = 0;

    if (operator === "") {
        return;
    }
    else if (secondOperand === null) {
        result = operate(firstOperand, operator, firstOperand);
        noConcat = true;
    }
    else {
        secondOperand = Number(display.textContent);
        result = operate(firstOperand, operator, secondOperand);
        noConcat = true;
    }

    displayAndClear(result);
}

function handleSign(){
    //Don't do anything to Error messages
    if (noOperator) return;

    //Don´t do anything on an operator change
    if(secondOperand === null && operator !== "") return;

    //0 shouldn't change sign
    if(display.textContent === "0") return;

    let array = display.textContent.split('');
    
    //Change number sign
    if (array[0] === '-') {
        array.shift();
    } else {
        array.unshift('-');
    }

    display.textContent = array.join('');
}

function handleOperator(operatorPressed) {

    if (noOperator) return;

    if (secondOperand === null){
        operator = operatorPressed;
        firstOperand = Number(display.textContent);
        
        noConcat = false; //To avoid errors by pressing an operator after an equal sign
    }
    else {
        secondOperand = Number(display.textContent);
        let result = operate(firstOperand, operator, secondOperand);
        displayAndClear(result);
        if (!noOperator) operator = operatorPressed;
    }
}

function handleNumber(numberPressed) {

    if (noOperator) noOperator = false;
    
    if (noConcat) {
        if (numberPressed === '.') {
            numberPressed = '0.'
        }
        display.textContent = numberPressed;
        noConcat = false;
    }
    else if (secondOperand === null && operator !== "") {
        if (numberPressed === '.') {
            numberPressed = '0.'
        }
        secondOperand = Number(numberPressed); //secondOperand is no longer null
        display.textContent = numberPressed;
    }
    else {
        display.textContent = concatToDisplay(numberPressed);
    }
}

function concatToDisplay(number){
    let currentDisplay = display.textContent;

    if (currentDisplay === "0" && number !== '.') currentDisplay = "";

    if(currentDisplay.length === 14) return currentDisplay;
    
    if (currentDisplay.includes('.') && number === '.') return currentDisplay;

    return currentDisplay += number;
}

function displayAndClear(result) {
    firstOperand = result;
    
    if (Number.isNaN(result)|| result === Infinity || result === -Infinity){
        result = "MATH ERROR";
        noOperator = true;
        noConcat = true;
    }

    if (result.toString().includes('e')) {
        result = "OUT OF BOUNDS";
        noOperator = true;
        noConcat = true;
    }

    if (result.toString().length > 14) {
        let substring = result.toString().split('.');

        if (substring[0].length > 14) {
            result = "OUT OF BOUNDS";
            noOperator = true;
            noConcat = true;
        }
        else {
            let cut = 14 - substring[0].length - 1;
            result = Number(result.toFixed(cut)); //The Number convertion eliminates trailing 0s.
        }
    }

    display.textContent = result;
    operator = "";
    secondOperand = null;
}
