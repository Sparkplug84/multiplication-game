// html elements
const landingPage = document.getElementById("landingPage");
const quizPreferences = document.getElementById("quizPreferences");
const quizContainer = document.getElementById("quizContainer");
const start = document.getElementById("startGame");
const firstNumber = document.getElementById("number1");
const secondNumber = document.getElementById("number2");
// const thisAnswer = document.getElementById("answer");
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
// const keypadNumbers = document.querySelectorAll('keypad__numbers')
// const quizContainerButton = document.querySelector(".quiz__container-buttons");
const questionNumberInput = document.getElementById("questionNumberList");
const timeDisplay = document.querySelector("#timeDisplay");
// const startBtn = document.querySelector("#startBtn");
// const pauseBtn = document.querySelector("#pauseBtn");
// const resetBtn = document.querySelector("#resetBtn");
const makeQuizBtn = document.querySelector("#makeQuiz");
const mainMenuBtn = document.querySelector("#mainMenuBtn");
const retryBtn = document.querySelector("#retryBtn");
const reviewQuestionsBtn = document.querySelector("#reviewQuestionsBtn");
const backToMenu = document.querySelector("#backToMenu");
const finishQuizContainer = document.querySelector("#finishQuiz");
const finishQuizMessage = document.querySelector("#finishQuizMessage");
const quizFinishTime = document.querySelector("#quizFinishTime");
const reviewContainer = document.querySelector("#reviewContainer");
// const quizProgress = document.querySelector("#quizProgress");
const quizProgressTitle = document.querySelector("#quizProgressTitle");
const progressBar = document.querySelector(".progress__bar");
const countdownTimer = document.querySelector("#countdownTimer");
const countdownTimerContainer = document.querySelector(
  "#countdownTimerContainer"
);

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
const keypadNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "X"];
const amountOfQuestions = Array.from({ length: 100 }, (_, i) => i + 1);

// const progressBarPosition = progressBar.getBoundingClientRect().bottom;
// console.log(progressBarPosition);
// const keypadPosition = quizContainerButton.offset().top;
// console.log(quizContainerButton);

// window.addEventListener("load", function () {
//   setTimeout(function () {
//     // This hides the address bar:
//     window.scrollTo(0, 1);
//   }, 0);
// });

// event listeners for button clicks --------------------------
start.addEventListener("click", () => {
  getQuestionPrefrences();
  if (
    (chosenTables.length == 0 && !multiplicationActive) ||
    (chosenTables.length == 0 && !divisionActive) ||
    (chosenTables.length == 0 && multiplicationActive && divisionActive) ||
    (!chosenTables.length == 0 && !multiplicationActive && !divisionActive)
  ) {
    alert("You must first choose your game preferences.");
  } else {
    addElement(countdownTimerContainer);
    startCountdown(3);
    slideLeft(quizPreferences);
    quizPreferences.style.visibility = "hidden";
    // removeElement(quizPreferences);
    setTimeout(runGame, 3000);
  }
});
nextQuestion.addEventListener("click", () => {
  checkAnswer(totalQuestions);
});
// deleteNumber.addEventListener("click", () => {
//   changeAnswer();
// });
// startBtn.addEventListener("click", () => {
//   startTimer();
// });
// pauseBtn.addEventListener("click", () => {
//   pauseTimer();
// });
// resetBtn.addEventListener("click", () => {
//   resetTimer();
// });
makeQuizBtn.addEventListener("click", () => {
  slideLeft(landingPage);
  if ((quizPreferences.style.visibility = "hidden")) {
    quizPreferences.style.visibility = "visible";
  }
  slideCentre(quizPreferences);
});
backToMenu.addEventListener("click", () => {
  slideCentre(landingPage);
  slideRight(quizPreferences);
});
mainMenuBtn.addEventListener("click", () => {
  slideRight(finishQuizContainer);
  slideCentre(landingPage);
  removeElement(quizContainer);
  slideCentre(quizContainer);
  quizPreferences.style.visibility = "hidden";
  slideRight(quizPreferences);

  resetPlayerPreferences();
});
retryBtn.addEventListener("click", () => {
  slideRight(finishQuizContainer);
  quizPreferences.style.visibility = "visible";
  // addElement(quizPreferences);
  slideCentre(quizPreferences);
  removeElement(quizContainer);
  slideCentre(quizContainer);
});
reviewQuestionsBtn.addEventListener("click", () => {
  removeElement(finishQuizContainer);
  addElement(reviewContainer);
});

// const keypadArray = document.querySelectorAll("keypad__number");
// const newArray = Array.prototype.slice.call(keypadArray);
// console.log(keypadContainer.lastChild);

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
  const numberButtons = `<button class="keypad__number" value="${number}" onclick="selectNumber(${number})">${number}</button>`;
  keypadContainer.innerHTML += numberButtons;
});

amountOfQuestions.forEach((question) => {
  const questionNumber = `<option value="${question}">${question}</option>`;
  questionNumberInput.innerHTML += questionNumber;
});

// game functions ----------------------------------------------

function startCountdown(seconds) {
  let counter = seconds;
  countdownTimer.innerText = counter;

  countdownTimer.classList.add("timer");

  const interval = setInterval(() => {
    console.log(counter);
    counter--;
    countdownTimer.innerText = counter;

    if (counter < 0) {
      clearInterval(interval);
      console.log("Ding!");
    }
  }, 1000);
}

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
  addElement(quizContainer);
  removeElement(countdownTimerContainer);
  progressBar.style.width = 0;
  currentQuestionNumber < totalQuestions
    ? (nextQuestion.innerText = "Next")
    : (nextQuestion.innerText = "Finish");
  startGame = true;
  populateQuiz(chosenTables);
  startTimer();
}

function populateQuiz(chosenTables) {
  quizProgressTitle.innerText = `${currentQuestionNumber}/${totalQuestions}`;
  if (multiplicationActive && divisionActive) getRandomQuestion(chosenTables);
  else if (multiplicationActive) getMultiplicationQuestion(chosenTables);
  else getDivisionQuestion(chosenTables);
}

function getDivisionQuestion(tablesChoice) {
  divideQuestion = true;
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
  firstNumber.innerText = result[0];
  secondNumber.innerText = result[1];
  symbol.innerText = "/";
  correctAnswer = result[0] / result[1];
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
  saveQuestion();
  if (correctAnswer == userAnswer.innerText) {
    totalCorrectQuestions++;
  }
  if (currentQuestionNumber < totalQuestions) {
    currentQuestionNumber++;
    populateQuiz(chosenTables);
    progressBar.style.width = `${
      ((currentQuestionNumber - 1) / totalQuestions) * 100
    }%`;
  } else {
    progressBar.style.width = "100%";
    pauseTimer();
    slideLeft(quizContainer);
    slideCentre(finishQuizContainer);
    finishQuizMessage.innerText = `You scored ${totalCorrectQuestions} out of ${totalQuestions}`;
    quizFinishTime.innerText = pauseTimer();
    currentQuestionNumber = 1;
    totalCorrectQuestions = 0;
    resetTimer();
    // removeElement(quizPreferences);
    quizPreferences.style.visibility = "hidden";
    slideLeft(quizPreferences);
  }
  if (currentQuestionNumber == totalQuestions) {
    nextQuestion.innerText = "Finish";
  }
  userAnswer.innerText = null;
  multiplyQuestion = false;
  divideQuestion = false;
  quizPreferences.style.visibility = "visible";
  // addElement(quizPreferences);
}

function saveQuestion() {
  const currentQuestion = `<p>${firstNumber.innerText} ${symbol.innerText} ${secondNumber.innerText} = ${correctAnswer}</p>`;
  reviewQuestionsContainer.innerHTML += currentQuestion;
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

// element movement functions ----------------------------
function slideLeft(element) {
  element.style.transform = "translateX(-100vw)";
}
function slideRight(element) {
  element.style.transform = "translateX(100vw)";
}
function slideCentre(element) {
  element.style.transform = "translateX(0)";
}
function removeElement(element) {
  element.style.display = "none";
}
function addElement(element) {
  element.style.display = "block";
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
