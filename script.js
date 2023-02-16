const start = document.getElementById("startGame");
const firstNumber = document.getElementById("number1");
const secondNumber = document.getElementById("number2");
const thisAnswer = document.getElementById("answer");
const nextQuestion = document.getElementById("nextQuestion");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const symbol = document.getElementById("symbol");
const tableChoices = document.getElementById("tableChoices");

let startGame = false;
let currentCount = 1;
let multiplyQuestion = false;
let divideQuestion = false;
let multiplicationActive;
let divisionActive;
let chosenTables;

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const answers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 27,
  30, 32, 33, 35, 36, 40, 42, 44, 45, 48, 49, 50, 54, 55, 56, 60, 63, 64, 66,
  70, 72, 77, 80, 81, 84, 88, 90, 96, 99, 100, 108, 110, 120, 121, 132, 144,
];

start.addEventListener("click", function () {
  runGame(chosenTables);
});
nextQuestion.addEventListener("click", function () {
  checkAnswer(10, [1, 4, 5, 9]);
});
divide.addEventListener("click", function () {
  getDivisibleNumbers([1, 4, 5, 9]);
});

numbers.forEach((number) => {
  const tableOptions = `
  <div>
  <input class="table-choices" type="checkbox" id="table${number}" name="table-choices" value="${number}" />
  <label for="table${number}">x${number}</label>
  </div>`;
  tableChoices.innerHTML += tableOptions;
});

function getQuestionPrefrences() {
  multiplicationActive = document.getElementById(
    "activateMultiplication"
  ).checked;
  divisionActive = document.getElementById("activateDivision").checked;
  chosenTables = Array.from(
    document.querySelectorAll(
      "input[type=checkbox][name=table-choices]:checked"
    )
  ).map((elem) => elem.value);
  console.log(chosenTables);
  return multiplicationActive, divisionActive, chosenTables;
}

function getRandomNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}
function getRandomAnswer() {
  return answers[Math.floor(Math.random() * answers.length)];
}

function getRandomTable(tablesChoice) {
  return tablesChoice[Math.floor(Math.random() * tablesChoice.length)];
}

function runGame() {
  startGame = true;
  getQuestionPrefrences();
  console.log(multiplicationActive, divisionActive);
  if (!multiplicationActive && !divisionActive) {
    alert("You must choose at least one option.");
    return;
  } else populateQuiz(chosenTables);
}

function populateQuiz(chosenTables) {
  if (multiplicationActive && divisionActive) getRandomQuestion(chosenTables);
  else if (multiplicationActive) getMultiplicationNumbers(chosenTables);
  else getDivisibleNumbers(chosenTables);
}

function getDivisibleNumbers(tablesChoice) {
  divideQuestion = true;
  console.log(divideQuestion ? "divide question" : null);
  function getRandomDivisibleAnswer(chosenTables) {
    const randomAnswer = getRandomAnswer();
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
  console.log(result);
  firstNumber.innerText = result[0];
  secondNumber.innerText = result[1];
  symbol.innerText = "/";
  thisAnswer.innerHTML = result[0] / result[1];
  return result;
}

function getMultiplicationNumbers(chosenTables) {
  multiplyQuestion = true;
  console.log(multiplyQuestion ? "multiply question" : null);
  const number1 = getRandomTable(chosenTables);
  const number2 = getRandomNumber();
  const answer = number1 * number2;
  firstNumber.innerText = number2;
  secondNumber.innerText = number1;
  symbol.innerText = "X";
  thisAnswer.innerText = answer;
  console.log(number1, number2, number1 * number2);
}

function getRandomQuestion(chosenTables) {
  const questionChoices = [getMultiplicationNumbers, getDivisibleNumbers];
  console.log(questionChoices);
  const pickRandomQuestion = Math.floor(Math.random() * questionChoices.length);
  multiplyQuestion = false;
  divideQuestion = false;
  questionChoices[pickRandomQuestion](chosenTables);
}

function checkAnswer(questionCount, tablesChoice) {
  if (currentCount < questionCount) {
    multiplyQuestion = false;
    divideQuestion = false;
    // getQuestionPrefrences();
    console.log(multiplicationActive, divisionActive);
    populateQuiz(chosenTables);
    currentCount++;
  } else {
    currentCount = 0;
  }
  console.log(currentCount, questionCount);
}
