const question1 = document.getElementById("question");
const answers = document.querySelectorAll(".answerFormat");

async function getQuiz(quizCategory) {
  const request = `https://the-trivia-api.com/api/questions?categories=${quizCategory}&limit=8&region=SE&difficulty=easy`;
  const response = await fetch(request);
  const quizData = await response.json();
  console.log(quizData);

  let counter = 1;
  for (let i = 0; i < quizData.length; i++) {
    const newArray = [
      { text: quizData[i].correctAnswer, isCorrect: true },
      { text: quizData[i].incorrectAnswers[0], isCorrect: false },
      { text: quizData[i].incorrectAnswers[1], isCorrect: false },
      { text: quizData[i].incorrectAnswers[2], isCorrect: false },
    ];
    answers.forEach((button, i) => {
      button.textContent = newArray[i].text;
    });
    console.log(newArray);
    question1.textContent = `Question ${counter}: ${quizData[i].question}`;
    counter++;
    answers.forEach((button) => {
      button.addEventListener("click", function () {});
    });
  }
}

getQuiz("science");

//importera variabel från homePage, vilken kategori på quiz som ska användas som argument i qetQuiz. fråga sebbe

const newArray = [
  { text: quizData[i].correctAnswer, isCorrect: true },
  { text: quizData[i].incorrectAnswers[0], isCorrect: false },
  { text: quizData[i].incorrectAnswers[1], isCorrect: false },
  { text: quizData[i].incorrectAnswers[2], isCorrect: false },
];
answers.forEach((button, i) => {
  button.textContent = newArray[i].text;
});

answers.forEach((button) => {
  button.addEventListener("click", function () {});
});
