// Calculator 
function add(operand1, operand2)
{
    console.log("ADD");
    return operand1 + operand2;
}

function subtract(operand1, operand2)
{
    return operand1 - operand2;
}

function multiply(operand1, operand2)
{
    return operand1 * operand2;
}

function divide(operand1, operand2)
{
    return operand1/operand2;
}

function operate(operator, operand1, operand2)
{
    operand1 = parseFloat(operand1);
    operand2 = parseFloat(operand2);
    let result = operator(operand1,operand2).toFixed(2);
    Screen.textContent = result;
    firstOperand = result;
}


const Screen = document.querySelector('#Screen');
document.addEventListener('keypress', (keyPressEvent) => {
    onKeyPress(keyPressEvent);
});
const buttons = document.querySelectorAll('.button'); 
buttons.forEach((button) => {
   button.addEventListener('click', () => {
       onButtonPress(button);
   });
});

var operands = ["",""];
var currentOperand = 0;
var operator;
var bDoOperation = false;
var bContainsPeriod = false;
// Flag to determine if the calculator is currently displaying a number that came immediately after an equals 
var bPostEquals = false;
var bReadNextNum = false;

const BUTTON_DEFAULT_COLOR = "black";
const BUTTON_SELECT_COLOR = "#004d87"; 
var prevHighlightedButton;

function onButtonPress(button)
{
    processKey(button.textContent);
    if(button.textContent == '+' || button.textContent == '*'
        ||button.textContent == '/' || button.textContent == '-')
    {
        button.style.backgroundColor = BUTTON_SELECT_COLOR;
        prevHighlightedButton = button;
    }
    else if (prevHighlightedButton != null) 
    {
        prevHighlightedButton.style.backgroundColor = BUTTON_DEFAULT_COLOR;
    }
}

function processKey(key)
{
    // Process 0-9
    if(Screen.textContent.length  <= 9 && parseInt(key) || key == '0')
    {
        if(bPostEquals || bReadNextNum)
        {
            Screen.textContent = "";
            bPostEquals = false;
            bReadNextNum = false;
        }
        // Process number
        Screen.textContent += key;
        console.log(key);
    }
    else if(Screen.textContent.length <= 9 && key == "." && key != " " &&!bContainsPeriod)
    {
        if(bPostEquals)
        {
            Screen.textContent = "";
            bPostEquals = false;
        }

        bContainsPeriod = true;
        Screen.textContent += key;
    }
    else if(Screen.textContent.length <= 11) {
        // Reset the post equals flag if an operand is inputted
        bReadNextNum = true;
        if(bPostEquals)
            bPostEquals = false;
        switch(key)
        {
            case '+':
                //Screen.textContent += " + ";
                operands[currentOperand] = Screen.textContent;
                currentOperand += (currentOperand+1)%2;
                operator = "+";
                break;
            case '-':
                operands[currentOperand] = Screen.textContent;
                currentOperand += (currentOperand+1)%2;
                
                operator = '-';
                break;
            case '*':
                operands[currentOperand] = Screen.textContent;
                currentOperand += (currentOperand+1)%2;
                
                operator = '*';
                break;
            case '/':
                operands[currentOperand] = Screen.textContent;
                currentOperand += (currentOperand+1)%2;
                
                operator = '/';
                break;
            case 'Enter':
            case '=':
                operands[currentOperand]= Screen.textContent;
                PerformOperation();
                currentOperand = (currentOperand+1)%2;
                bPostEquals = true;
                break;
            case 'c':
                operands = ["",""];
                currentOperand = 0;
                Screen.textContent = "";
                operator = "";
                break;
            default:
                break;
        }
    }
 
}


function onKeyPress(keyEvent)
{
    processKey(keyEvent.key);
}

function PerformOperation()
{
    let firstOperand = operands[(currentOperand+1)%2];
    let secondOperand = operands[currentOperand];
    switch(operator)
    {
        case '+':
            operate(add, firstOperand, secondOperand);
            break;
        case '-':
            operate(subtract,firstOperand, secondOperand);
            break;
        case '*':
            operate(multiply, firstOperand, secondOperand);
            break;
        case '/':
            operate(divide, firstOperand, secondOperand);
            break;
        default:
            break;
    }
    firstOperand = '';
    secondOperand = '';
}
