let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case "←":
            if (buffer.length === 1) buffer = "0";
            else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "C":
            clearScreen();
            break;
        case "−":
        case "+":
        case "÷":
        case "×":
            handleMath(symbol);
            break;
        case "=":
            handleEquals(parseInt(buffer));
            break;
    }
}

function handleEquals(intBuffer) {
    if (previousOperator === null) {
        return;
    } else {
        console.log("es" + previousOperator);
        flushOperation(intBuffer);
        previousOperator = null;
        buffer = runningTotal;
        console.log("total" + buffer);
        runningTotal = 0;
    }

}

function handleMath(symbol) {
    if (buffer === "0") {
        return;
    }
    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    buffer = "0";
    previousOperator = symbol;
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "−") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "÷") {
        runningTotal /= intBuffer;
    } else {
        runningTotal *= intBuffer;
    }
}

function clearScreen() {
    buffer = "0";
    runningTotal = 0;
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

function init() {
    document
        .querySelector(".calc-buttons")
        .addEventListener("click", function (event) {
            buttonClick(event.target.innerText);
        });
}

init();
