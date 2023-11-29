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

var firstOperand;
var secondOperand;
var operator;
var bDoOperation = false;
var bContainsPeriod = false;
// Flag to determine if the calculator is currently displaying a number that came immediately after an equals 
var bPostEquals = false;

const BUTTON_DEFAULT_COLOR = "black";
const BUTTON_SELECT_COLOR = "#004d87"; 
var prevHighlightedButton;

function onButtonPress(button)
{
    processKey(button.textContent);
    if(button.textContent == '+' || button.textContent == '*'
        || button.textContent == '/' || button.textContent == '-')
    {
        button.style.backgroundColor = BUTTON_SELECT_COLOR;
        prevHighlightedButton = button;
    }
    else 
    {
        prevHighlightedButton.style.backgroundColor = BUTTON_DEFAULT_COLOR;
    }
}

function processKey(key)
{
    // Process 0-9
    if(Screen.textContent.length  <= 9 && parseInt(key) || key == '0')
    {
        if(bPostEquals)
        {
            Screen.textContent = "";
            bPostEquals = false;
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
    else if(firstOperand == "" && operator == "")
    {
       return; 
    }
    else if(Screen.textContent.length <= 11) {
        // Reset the post equals flag if an operand is inputted
        if(bPostEquals)
            bPostEquals = false;
        switch(key)
        {
            case '+':
                Screen.textContent += " + ";
                break;
            case '-':
                Screen.textContent += ' - ';
                break;
            case '*':
                Screen.textContent += ' * ';
                break;
            case '/':
                Screen.textContent += ' / ';
                break;
            case 'Enter':
            case '=':
                PerformOperation();
                bPostEquals = true;
                break;
            case 'c':
                Screen.textContent = "";
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

    const arr = Screen.textContent.trim().split(" ");
    console.log(arr);
    console.log("SWITH ON " + arr[1]);
    switch(arr[1])
    {
        case '+':
            operate(add, arr[0], arr[2]);
            break;
        case '-':
            operate(subtract, arr[0], arr[2]);
            break;
        case '*':
            operate(multiply, arr[0], arr[2]);
            break;
        case '/':
            operate(divide, arr[0], arr[2]);
            break;
        default:
            break;
    }
    firstOperand = '';
    secondOperand = '';
}
