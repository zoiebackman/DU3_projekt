const question1 = document.getElementById("question");
const answers = document.querySelectorAll(".answerFormat");
const countDown = document.getElementById("countDown");

async function getQuiz(quizCategory) {
  const request = `https://the-trivia-api.com/api/questions?categories=${quizCategory}&limit=8&region=SE&difficulty=easy`;
  const response = await fetch(request);
  const quizData = await response.json();


  let counter = 0;
  let scoreCounter = 0;

  question1.textContent = `Question ${counter + 1} : ${
    quizData[counter].question
  }`;
  console.log(quizData);
  const newArray = [
    { text: quizData[counter].correctAnswer, isCorrect: true },
    { text: quizData[counter].incorrectAnswers[0], isCorrect: false },
    { text: quizData[counter].incorrectAnswers[1], isCorrect: false },
    { text: quizData[counter].incorrectAnswers[2], isCorrect: false },
  ];

  newArray.sort(() => Math.random() - 0.5);

  answers.forEach((button, i) => {
    button.textContent = newArray[i].text;
  });

  answers.forEach((button, i) => {
    button.addEventListener("click", function () {
      if (newArray[i].isCorrect === true) {
        button.style.backgroundColor = "green";
        counter++;
        scoreCounter++;
        setTimeout(() => {
          counter++;
          nextQuestion();
        }, 1000);
      }
      if (newArray[i].isCorrect === false) {
        button.style.backgroundColor = "red";
        counter++;
        setTimeout(() => {
          counter++;
          nextQuestion();
        }, 1000);
      }
    });
  });

  function nextQuestion() {
    if (counter < quizData.length) {
      answers.forEach((button) => {
        button.style.backgroundColor = "";
      });

      question1.textContent = `Question ${counter + 1} : ${
        quizData[counter].question
      }`;

      const newArray = [
        { text: quizData[counter].correctAnswer, isCorrect: true },
        { text: quizData[counter].incorrectAnswers[0], isCorrect: false },
        { text: quizData[counter].incorrectAnswers[1], isCorrect: false },
        { text: quizData[counter].incorrectAnswers[2], isCorrect: false },
      ];

      newArray.sort(() => Math.random() - 0.5);

      answers.forEach((button, i) => {
        button.textContent = newArray[i].text;
      });

      answers.forEach((button, i) => {
        button.addEventListener("click", function () {
          if (newArray[i].isCorrect === true) {
            button.style.backgroundColor = "green";
            scoreCounter++;
            setTimeout(() => {
              counter++;
            }, 1000);
          }
          if (newArray[i].isCorrect === false) {
            button.style.backgroundColor = "red";
            setTimeout(() => {
              counter++;
            }, 1000);
          }
        });
      });
    } else {
      question1.textContent = "Quizet är slut!";
      answers.forEach((button, i) => {
        button.textContent = "";
        button.style.backgroundColor = "#5bb0ac00";
      });
    }
  }

}


  //spara ner fil lokalt?

getQuiz("science");

//importera variabel från homePage, vilken kategori på quiz som ska användas som argument i qetQuiz. fråga sebbe
//läckt API? fråga GitGuardian
