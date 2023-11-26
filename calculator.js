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
    let result = operator(operand1,operand2);
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


function onButtonPress(button)
{
    Screen.textContent = button.textContent;
}

function onKeyPress(keyEvent)
{
    // Process 0-9
    if(parseInt(keyEvent.key) || keyEvent.key == '0')
    {
        // Process number
        Screen.textContent += keyEvent.key;
        console.log(keyEvent.key);
    }
    else {
        if(bDoOperation) {PerformOperation();}
        else {
            bDoOperation = true;
        }
        switch(keyEvent.key)
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
            case '=':
                PerformOperation();
                break;
            default:
                break;
        }
    }
    console.log("KEY EVENT");
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
}
