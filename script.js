// html elements
const landingPage = document.getElementById("landingPage");
const quizPreferences = document.getElementById("quizPreferences");
const quizContainer = document.getElementById("quizContainer");
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
const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");
const makeQuizBtn = document.querySelector("#makeQuiz");
const mainMenuBtn = document.querySelector("#mainMenuBtn");
const retryBtn = document.querySelector("#retryBtn");
const finishQuizContainer = document.querySelector("#finishQuiz");
const finishQuizMessage = document.querySelector("#finishQuizMessage");
const quizFinishTime = document.querySelector("#quizFinishTime");

// game variables --------------------------------------------
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

// timer variables -------------------------------------------
let minutes = 0;
let seconds = 0;
let hundredths = 0;
let intervalId = null;

// arrays -----------------------------------------------------
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const keypadNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const amountOfQuestions = Array.from({ length: 100 }, (_, i) => i + 1);

// event listeners for button clicks --------------------------
start.addEventListener("click", () => {
  getQuestionPrefrences();
  console.log(multiplicationActive, divisionActive, chosenTables);
  if (
    (chosenTables.length == 0 && !multiplicationActive) ||
    (chosenTables.length == 0 && !divisionActive) ||
    (chosenTables.length == 0 && multiplicationActive && divisionActive) ||
    (!chosenTables.length == 0 && !multiplicationActive && !divisionActive)
  ) {
    alert("You must first choose your game preferences.");
    console.log("if statement true");
  } else {
    quizPreferences.style.display = "none";
    quizContainer.style.display = "block";
    console.log("else statement true");
    runGame();
  }
});
nextQuestion.addEventListener("click", () => {
  checkAnswer(totalQuestions);
});
deleteNumber.addEventListener("click", () => {
  changeAnswer();
});
startBtn.addEventListener("click", () => {
  startTimer();
});
pauseBtn.addEventListener("click", () => {
  pauseTimer();
});
resetBtn.addEventListener("click", () => {
  resetTimer();
});
makeQuizBtn.addEventListener("click", () => {
  landingPage.style.display = "none";
  quizPreferences.style.display = "block";
});
mainMenuBtn.addEventListener("click", () => {
  finishQuizContainer.style.display = "none";
  landingPage.style.display = "block";
  resetPlayerPreferences();
});
retryBtn.addEventListener("click", () => {
  finishQuizContainer.style.display = "none";
  quizContainer.style.display = "block";
  runGame();
  console.log("retry quiz");
});

// iterating arrays to create html elements -----------------------
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

// game functions ----------------------------------------------
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
  populateQuiz(chosenTables);
  startTimer();
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
    totalCorrectQuestions++;
  }
  if (currentQuestionNumber < totalQuestions) {
    populateQuiz(chosenTables);
    currentQuestionNumber++;
  } else {
    pauseTimer();
    quizContainer.style.display = "none";
    finishQuizContainer.style.display = "block";
    finishQuizMessage.innerText = `You scored ${totalCorrectQuestions} out of ${totalQuestions}`;
    quizFinishTime.innerText = pauseTimer();
    currentQuestionNumber = 1;
    totalCorrectQuestions = 0;
    resetTimer();
  }
  console.log(currentQuestionNumber, totalCorrectQuestions, totalQuestions);
  userAnswer.innerText = null;
  multiplyQuestion = false;
  divideQuestion = false;
}

function resetPlayerPreferences() {
  multiplicationInput.checked = false;
  divisionInput.checked = false;
  questionNumberInput.value = 1;
  document
    .querySelectorAll("input[type=checkbox][name=table-choices]:checked")
    .forEach((item) => {
      item.checked = false;
    });
}

// timer functions ---------------------------------------------
function startTimer() {
  intervalId = setInterval(() => {
    hundredths++;
    if (hundredths === 100) {
      hundredths = 0;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    const formattedTime = `${padNumber(minutes)}:${padNumber(
      seconds
    )}:${padNumber(hundredths)}`;
    timeDisplay.innerText = formattedTime;
  }, 10);
}

function pauseTimer() {
  clearInterval(intervalId);
  stoppedTime = `${padNumber(minutes)}:${padNumber(seconds)}:${padNumber(
    hundredths
  )}`;
  return `Timer stopped at ${stoppedTime}`;
}

function resetTimer() {
  clearInterval(intervalId);
  minutes = 0;
  seconds = 0;
  hundredths = 0;
  timeDisplay.innerText = "00:00:00";
}

function padNumber(number) {
  return number.toString().padStart(2, "0");
}
