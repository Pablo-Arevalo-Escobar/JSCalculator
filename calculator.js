// Calculator 
// const
class ColorPalette 
{
    // Shade1  being the lightest and shade 4 the darkest
    constructor(shade1,shade2,shade3,shade4)
    {
        this.lightest = shade1;
        this.light = shade2;
        this.dark = shade3;
        this.darkest = shade4;
    }
    
    invert()
    {
        let temp = this.darkest;
        this.darkest = this.lightest;
        this.lightest = temp;
        temp = this.dark;
        this.dark = this.light;
        this.light = temp;
    }
}

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
    if(operand2 == 0)
        return "NOPE";
    return operand1/operand2;
}

function operate(operator, operand1, operand2)
{
    operand1 = parseFloat(operand1);
    operand2 = parseFloat(operand2);
    let result = operator(operand1,operand2);
    if(parseFloat(result))
    {
        result = result.toFixed(2);
    }
    if(result.length > 9)
    {
        result = "Too big";
    }
    Screen.textContent = result;
    firstOperand = result;
}


const Screen = document.querySelector('#Screen');
document.addEventListener('keydown', (keyDownEvent) => {
    onKeyPress(keyDownEvent);
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
var bConsecutiveEquals = false;
const BUTTON_DEFAULT_COLOR = "black";
const BUTTON_SELECT_COLOR = "#004d87"; 
var prevHighlightedButton;

Screen.textContent = "0";

// Create a color pallete
const defaultColorPalette = new ColorPalette("#F3EEEA","#EBE3D5","#B0A695","#776B5D");
const colorPalette2 = new ColorPalette("#2B2A4C","#B31312","#EA906C","#EEE2DE");
const colorPalette3 = new ColorPalette("#ECE3CE","#739072","#4F6F52","#3A3D39");
setPalette(defaultColorPalette);

function setPalette(palette)
{
    const calculator = document.querySelector("#Calculator");
    calculator.style.backgroundColor = palette.dark;
    const calculatorButtonArea = document.querySelector("#ButtonArea");
    calculatorButtonArea.style.backgroundColor = palette.dark;
    const calculatorScreenArea = document.querySelector("#ScreenArea");
    calculatorScreenArea.style.backgroundColor = palette.darkest;
    const calculatorScreen = document.querySelector("#Screen");
    calculatorScreen.style.color = palette.lightest;
    const buttons = document.querySelectorAll(".button");
    buttons.forEach((button) => {
        button.style.color = palette.light;
    });
}
function onButtonPress(button)
{
    processKey(button.textContent);
    if(button.textContent == '+' || button.textContent == 'X'
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
        if(Screen.textContent[0] == '0' && !bContainsPeriod)
            Screen.textContent = "";
        Screen.textContent += key;
        console.log(key);
    }
    else if(Screen.textContent.length <= 9 && key == "." && !bContainsPeriod)
    {
        if(bPostEquals || bReadNextNum)
        {
            Screen.textContent = "";
            bPostEquals = false;
            bReadNextNum = false;
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
            case 'Backspace':
                Screen.textContent = "0";
                break;
            case '+':
                //Screen.textContent += " + ";
                operands[currentOperand] = Screen.textContent;
                currentOperand += (currentOperand+1)%2;
                operator = "+";
                bConsecutiveEquals = false;
                bContainsPeriod = false;
                bReadNextNum = true;
                break;
            case '-':
                operands[currentOperand] = Screen.textContent;
                currentOperand += (currentOperand+1)%2;
                
                operator = '-';
                bConsecutiveEquals = false;
                bContainsPeriod = false;
                bReadNextNum = true;
                break;
            case 'x':
            case 'X':
            case '*':
                operands[currentOperand] = Screen.textContent;
                currentOperand += (currentOperand+1)%2;
                
                operator = '*';
                bConsecutiveEquals = false;
                bContainsPeriod = false;
                bReadNextNum = true;
                break;

            case '/':
                operands[currentOperand] = Screen.textContent;
                currentOperand += (currentOperand+1)%2;
                
                operator = '/';
                bConsecutiveEquals = false;
                bContainsPeriod = false;
                bReadNextNum = true;
                break;
            case 'Enter':
            case '=':
                operands[currentOperand]= Screen.textContent;
                if(bConsecutiveEquals)
                {
                    PerformOperation();
                    break;
                }
                PerformOperation();
                currentOperand = (currentOperand+1)%2;
                bPostEquals = true;
                bConsecutiveEquals = true;
                bContainsPeriod = false;
                bReadNextNum = true;
                break;
            case 'AC':
            case 'c':
                operands = ["",""];
                currentOperand = 0;
                Screen.textContent = "0";
                operator = "";
                bContainsPeriod = false;
                bConsecutiveEquals = false;
                bContainsPeriod = false;
                bReadNextNum = true;
                break;
            case '%':
                let mValue = parseFloat(Screen.textContent);
                if(mValue!= null)
                {
                    mValue = mValue/100;
                    Screen.textContent = mValue.toFixed(2);
                }
                bConsecutiveEquals = false;
                bContainsPeriod = false;
                bReadNextNum = true;
                break;
            case '+/-':
                let screenValue = parseFloat(Screen.textContent);
                if(screenValue != null)
                {
                   screenValue *= -1;
                   Screen.textContent = screenValue;
                }
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
