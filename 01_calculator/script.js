const mainDisplay = document.querySelector('.main-display')
const secondDisplay = document.querySelector('.second-display')
const buttons = document.querySelectorAll('.button')
const equals = document.querySelector(".equals")
let currentInput = ""
let currentOperator = null
let firstValue = null

buttons.forEach((button) => {
    button.addEventListener("click", function () {
        const buttonText = this.textContent

        if(!isNaN(buttonText)) {
            currentInput += buttonText
            mainDisplay.textContent = currentInput
        } else {
            handleNonNumeric(buttonText)
        }
    })
})

function handleNonNumeric(value) {
    switch (value) {
        case "c":
            clear()
            break
        case "±": 
            toggleSign()
            break
        case "%":
            percent()
            break
        case ".":
            addDecimal()
            break
        default:
            handleOperator(value);
    }
}

function clear() {
    currentInput = ""
    firstValue = null
    currentOperator = null
    mainDisplay.textContent = "0"
    secondDisplay.textContent = "0"
}

function toggleSign() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString()
        mainDisplay.textContent = currentInput
    }
}

function percent() {
    currentInput = currentInput / 100
    mainDisplay.textContent = currentInput
}

function addDecimal() {
    if (currentInput.indexOf(".") === -1) {
        currentInput += "."
        mainDisplay.textContent = currentInput
    }
}

function handleOperator(operator) {
    if (currentInput && !currentOperator) {
        firstValue = parseFloat(currentInput)
        currentOperator = operator
        secondDisplay.textContent = firstValue + " " + currentOperator
        currentInput = ""
    }
}

equals.addEventListener('click', function () {
    if (firstValue !== null && currentInput && currentOperator) {
        const secondValue = parseFloat(currentInput)
        let result

        switch (currentOperator) {
            case "÷":
                result = firstValue / secondValue
                break;
            case "×":
                result = firstValue * secondValue
                break;
            case "-":
                result = firstValue - secondValue
                break;
            case "+":
                result = firstValue + secondValue
                break;
        }


        mainDisplay.textContent = result.toFixed(5).toString().replace(/0+$/, "").replace(/\.$/, "")
        secondDisplay.textContent = secondDisplay.textContent + " " + currentInput
        currentInput = mainDisplay.textContent
        currentOperator = null
        firstValue = null
    }
})