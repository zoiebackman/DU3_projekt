const question1 = document.getElementById("question");
const answers = document.querySelectorAll(".answerFormat");
const countDown = document.getElementById("countDown");

async function getQuiz(quizCategory) {
  const request = `https://the-trivia-api.com/api/questions?categories=${quizCategory}&limit=8&region=SE&difficulty=easy`;
  const response = await fetch(request);
  const quizData = await response.json();
  // console.log(quizData);

  /* localStorage.setItem(`category${quizCategory}`, JSON.stringify(quizData)); // spara data i lokal fil via webbläsaren
  const quiz = JSON.parse(localStorage.getItem(`category${quizCategory}`)); //hämta lokala filen
  console.log(quiz); */

  let counter = 0;
  let answerCounter = 0;

  question1.textContent = `Question ${counter + 1} : ${
    quizData[counter].question
  }`;
  countDown.addEventListener("click", function nextQuestion() {
    counter++;

    if (counter < quizData.length) {
      question1.textContent = `Question ${counter + 1} : ${
        quizData[counter].question
      }`;
      const newArray = [
        { text: quizData[answerCounter].correctAnswer, isCorrect: true },
        { text: quizData[answerCounter].incorrectAnswers[0], isCorrect: false },
        { text: quizData[answerCounter].incorrectAnswers[1], isCorrect: false },
        { text: quizData[answerCounter].incorrectAnswers[2], isCorrect: false },
      ];
      answerCounter++;
      answers.forEach((button, i) => {
        button.textContent = newArray[i].text;
      });

      answers.forEach((button) => {
        button.addEventListener("click", function () {
          if (newArray.isCorrect){
            button.style.backgroundColor = "green";
          }
        });
      });
    } else {
      question1.textContent = "Quizet är slut!";
    }
  });

  //spara ner fil lokalt?
}

getQuiz("science");

//importera variabel från homePage, vilken kategori på quiz som ska användas som argument i qetQuiz. fråga sebbe
//läckt API? fråga GitGuardian
