const question1 = document.getElementById("question");
const answersBox = document.querySelector("#answers");
const countDown = document.getElementById("countDown");
const imageContainer = document.getElementById("imageContainer");

async function getQuiz(quizCategory) {
  const request = `https://the-trivia-api.com/api/questions?categories=${quizCategory}&limit=8&region=SE&difficulty=easy`;
  const response = await fetch(request);
  const quizData = await response.json();

  let counter = 0;
  let scoreCounter = 0;

  question1.textContent = `Question ${counter + 1} : ${quizData[counter].question
    }`;
  countDown.addEventListener("click", function nextQuestion() {
    counter++;

    if (counter < quizData.length) {
      question1.textContent = `Question ${counter + 1} : ${quizData[counter].question
        }`;
      const newArray = [
        { text: quizData[counter].correctAnswer, isCorrect: true },
        { text: quizData[counter].incorrectAnswers[0], isCorrect: false },
        { text: quizData[counter].incorrectAnswers[1], isCorrect: false },
        { text: quizData[counter].incorrectAnswers[2], isCorrect: false },
      ];

      answerCounter++;
      answers.forEach((button, i) => {
        button.textContent = newArray[i].text;
      });

      answers.forEach((button) => {
        button.addEventListener("click", function () { });
      });
    } else {
      const button = document.createElement("button");
      button.classList.add("endbutton");
      button.textContent = "Back to start";
      question1.textContent = "Quiz is done!";
      const finalText = document.createElement("div");
      finalText.textContent = `You scored ${scoreCounter} out of 8`;
      finalText.classList.add("finalText");
      imageContainer.style.display = "flex";
      imageContainer.style.flexDirection = "column";
      imageContainer.style.justifyContent = "center";
      imageContainer.style.alignItems = "center";
      imageContainer.appendChild(finalText);
      imageContainer.appendChild(button);

      button.addEventListener("click", function () {
        window.location.href = "HomePage.html";
      });

      answers.forEach((button) => {
        button.textContent = "";
        button.style.backgroundColor = "#5bb0ac00";
      });
    }
  }
}

getQuiz("science");

//importera variabel från homePage, vilken kategori på quiz som ska användas som argument i qetQuiz. fråga sebbe
//läckt API? fråga GitGuardian
