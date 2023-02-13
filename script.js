const start = document.getElementById("startGame");
const firstNumber = document.getElementById("number1");
const secondNumber = document.getElementById("number2");
const thisAnswer = document.getElementById("answer");
const nextQuestion = document.getElementById("nextQuestion");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const symbol = document.getElementById("symbol");

let startGame = false;
let currentCount = 1;
let multiplyQuestion = false;
let divideQuestion = false;

start.addEventListener("click", function () {
  runGame([1, 4, 5, 9]);
});
nextQuestion.addEventListener("click", function () {
  checkAnswer(10, [1, 4, 5, 9]);
});
divide.addEventListener("click", function () {
  getDivisibleNumbers([1, 4, 5, 9]);
});

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const answers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 27,
  30, 32, 33, 35, 36, 40, 42, 44, 45, 48, 49, 50, 54, 55, 56, 60, 63, 64, 66,
  70, 72, 77, 80, 81, 84, 88, 90, 96, 99, 100, 108, 110, 120, 121, 132, 144,
];

function getRandomNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getDivisibleNumbers(tablesChoice) {
  divideQuestion = true;
  console.log(divideQuestion ? "divide question" : null);
  // const tablesChoice = tablesChoice;
  function getRandomDivisibleAnswer(tablesChoice) {
    const randomAnswer = getRandomAnswer();
    const randomTable = getRandomTable(tablesChoice);
    if (randomAnswer % randomTable === 0)
      if (randomAnswer / randomTable > 12) return;
      else {
        // firstNumber.innerText = randomAnswer;
        // secondNumber.innerText = randomTable;
        // thisAnswer.innerText = randomAnswer / randomTable;
        // console.log(firstNumber, secondNumber, thisAnswer);

        return [randomAnswer, randomTable];
      }
    return;
  }

  let result;
  while (!result) result = getRandomDivisibleAnswer([1, 4, 5, 9]);
  console.log(result);
  firstNumber.innerText = result[0];
  secondNumber.innerText = result[1];
  thisAnswer.innerHTML = result[0] / result[1];
  return result;
}

// getDivisibleNumbers([1, 3, 4, 9]);

// console.log(getDivisibleNumbers());

// getRandomDivisibleAnswer([1, 4, 5, 9]);

function getRandomAnswer() {
  return answers[Math.floor(Math.random() * answers.length)];
}

function getRandomTable(tablesChoice) {
  return tablesChoice[Math.floor(Math.random() * tablesChoice.length)];
}

function runGame(tablesChoice) {
  startGame = true;
  console.log(currentCount);
  populateGame(tablesChoice);
}

function populateGame(tablesChoice) {
  multiplyQuestion = true;
  console.log(multiplyQuestion ? "multiply question" : null);
  const number1 = getRandomTable(tablesChoice);
  const number2 = getRandomNumber();
  const answer = number1 * number2;
  firstNumber.innerText = number1;
  secondNumber.innerText = number2;
  thisAnswer.innerText = answer;
  console.log(number1, number2, number1 * number2);
}

function checkAnswer(questionCount, tablesChoice) {
  if (currentCount < questionCount) {
    const randomQuestion = [populateGame, getDivisibleNumbers];
    console.log(randomQuestion);
    const pickRandomQuestion = Math.floor(
      Math.random() * randomQuestion.length
    );
    multiplyQuestion = false;
    divideQuestion = false;
    // console.log(pickRandomQuestion);
    // console.log("hello");
    randomQuestion[pickRandomQuestion]([1, 4, 5, 9]);
    if (multiplyQuestion) symbol.innerText = "X";
    else if (divideQuestion) symbol.innerText = "/";
    // console.log("hello");

    // populateGame(tablesChoice);
    currentCount++;
  } else {
    currentCount = 0;
  }
  console.log(currentCount, questionCount);
}
