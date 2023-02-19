const start = document.getElementById("startGame");
const firstNumber = document.getElementById("number1");
const secondNumber = document.getElementById("number2");
const thisAnswer = document.getElementById("answer");
const userAnswer = document.getElementById("userAnswer");
const deleteNumber = document.getElementById("deleteNumber");
const nextQuestion = document.getElementById("nextQuestion");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const symbol = document.getElementById("symbol");
const multiplicationInput = document.getElementById("activateMultiplication");
const divisionInput = document.getElementById("activateDivision");
const tableChoiceInput = document.getElementById("tableChoices");
const keypadContainer = document.getElementById("keypad");
const questionNumberInput = document.getElementById("questionNumberList");

let startGame = false;
let currentQuestionNumber = 1;
let totalCorrectQuestions = 0;
let multiplyQuestion = false;
let divideQuestion = false;
let multiplicationActive;
let divisionActive;
let chosenTables;
let correctAnswer;
let totalQuestions;

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const keypadNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const amountOfQuestions = Array.from({ length: 100 }, (_, i) => i + 1);

start.addEventListener("click", function () {
  runGame(chosenTables);
});
nextQuestion.addEventListener("click", function () {
  checkAnswer(totalQuestions);
});
deleteNumber.addEventListener("click", function () {
  changeAnswer();
});

numbers.forEach((number) => {
  const tableOptions = `
  <div>
  <input class="table-choices" type="checkbox" id="table${number}" name="table-choices" value="${number}" />
  <label for="table${number}">x${number}</label>
  </div>`;
  tableChoiceInput.innerHTML += tableOptions;
});

keypadNumbers.forEach((number) => {
  const numberButtons = `<button value="${number}" onclick="selectNumber(${number})">${number}</button>`;
  keypadContainer.innerHTML += numberButtons;
});

amountOfQuestions.forEach((question) => {
  const questionNumber = `<option value="${question}">${question}</option>`;
  questionNumberInput.innerHTML += questionNumber;
});

function selectNumber(number) {
  userAnswer.innerText += number;
}

function changeAnswer() {
  let newAnswer = userAnswer.innerText.slice(0, -1);
  return (userAnswer.innerText = newAnswer);
}

function getQuestionPrefrences() {
  multiplicationActive = multiplicationInput.checked;
  divisionActive = divisionInput.checked;
  chosenTables = Array.from(
    document.querySelectorAll(
      "input[type=checkbox][name=table-choices]:checked"
    )
  ).map((elem) => elem.value);
  totalQuestions = questionNumberInput.value;
  console.log(chosenTables, totalQuestions);
  return multiplicationActive, divisionActive, chosenTables, totalQuestions;
}

function getRandomNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}
function getRandomAnswer() {
  return getRandomNumber() * getRandomNumber();
}

function getRandomTable(chosenTables) {
  return chosenTables[Math.floor(Math.random() * chosenTables.length)];
}

function runGame() {
  startGame = true;
  getQuestionPrefrences();
  if (!multiplicationActive && !divisionActive) {
    alert("You must choose at least one option.");
    return;
  } else populateQuiz(chosenTables);
}

function populateQuiz(chosenTables) {
  if (multiplicationActive && divisionActive) getRandomQuestion(chosenTables);
  else if (multiplicationActive) getMultiplicationQuestion(chosenTables);
  else getDivisionQuestion(chosenTables);
}

function getDivisionQuestion(tablesChoice) {
  divideQuestion = true;
  function getRandomDivisibleAnswer(chosenTables) {
    const randomAnswer = getRandomAnswer();
    console.log(randomAnswer);
    const randomTable = getRandomTable(chosenTables);
    if (randomAnswer % randomTable === 0)
      if (randomAnswer / randomTable > 12) return;
      else {
        return [randomAnswer, randomTable];
      }
    return;
  }
  let result;
  while (!result) result = getRandomDivisibleAnswer(chosenTables);
  firstNumber.innerText = result[0];
  secondNumber.innerText = result[1];
  symbol.innerText = "/";
  correctAnswer = result[0] / result[1];
  thisAnswer.innerText = correctAnswer;
  return result, correctAnswer;
}

function getMultiplicationQuestion(chosenTables) {
  multiplyQuestion = true;
  const number1 = getRandomTable(chosenTables);
  const number2 = getRandomNumber();
  correctAnswer = number1 * number2;
  firstNumber.innerText = number2;
  secondNumber.innerText = number1;
  symbol.innerText = "X";
  thisAnswer.innerText = correctAnswer;
  return correctAnswer;
}

function getRandomQuestion(chosenTables) {
  const questionChoices = [getMultiplicationQuestion, getDivisionQuestion];
  const pickRandomQuestion = Math.floor(Math.random() * questionChoices.length);
  multiplyQuestion = false;
  divideQuestion = false;
  questionChoices[pickRandomQuestion](chosenTables);
}

function checkAnswer(totalQuestions) {
  if (correctAnswer == userAnswer.innerText) {
    console.log("Correct");
    totalCorrectQuestions++;
  } else {
    console.log("Incorrect");
  }
  console.log(correctAnswer, userAnswer.innerText);
  console.log(`You scored ${totalCorrectQuestions} out of ${totalQuestions}`);

  if (currentQuestionNumber < totalQuestions) {
    populateQuiz(chosenTables);
    currentQuestionNumber++;
  } else {
    currentQuestionNumber = 0;
  }
  console.log(currentQuestionNumber, totalCorrectQuestions, totalQuestions);
  userAnswer.innerText = null;
  multiplyQuestion = false;
  divideQuestion = false;
}
