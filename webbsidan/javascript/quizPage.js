const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
console.log(category);

if (!category) {
  alert("Ingen kategori vald. Du måste välja en kategori på startsidan först.");
  window.location.href = "homePage.html";
}

const activeUser = JSON.parse(localStorage.getItem("activeUser"));
console.log(activeUser);

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

  /*   async function getImage(quizCategory) {
    const request = `https://api.pexels.com/v1/search?query=${quizCategory}&per_page=9`;
    const options = {
      headers: {
        Authorization:
          "V3C5EBsKEQBS1WAmameHcgifua6v5QP6tOmDbzBVmOSPGs0TIgGzENsT",
      },
    };
    const response = await fetch(request, options);
    const images = await response.json();
    console.log(images);

    quizContainer.innerHTML = `<img src=${images.photos[0].src.medium} width="500" height="300" style="object-fit:contain;">`;
  }
  getImage(); */

  nextQuestion();

  function nextQuestion() {
    let seconds = 21;
    countDown.textContent = 21;
    function countDownSeconds() {
      if (countDown.textContent == seconds) {
        seconds--;
        countDown.textContent = String(seconds);
        setTimeout(() => {
          countDownSeconds();
        }, 1000);
      }
      if (countDown.textContent <= 0) {
        counter++;
        nextQuestion();
      }
    }
    countDownSeconds();

    answersBox.innerHTML = `
    <div class="answerFormat" id="answer1"></div>
    <div class="answerFormat" id="answer2"></div>
    <div class="answerFormat" id="answer3"></div>
    <div class="answerFormat" id="answer4"></div>
    `;
    const answers = document.querySelectorAll(".answerFormat");

    if (counter < quizData.length) {
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
          counter++;
          if (newArray[i].isCorrect === true) {
            button.style.backgroundColor = "green";
            scoreCounter++;
            setTimeout(() => {
              //counter++;
              nextQuestion();
            }, 500);
          }
          if (newArray[i].isCorrect === false) {
            button.style.backgroundColor = "red";
            setTimeout(() => {
              //counter++;
              nextQuestion();
            }, 500);
          }
        });
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

getQuiz(category);

//importera variabel från homePage, vilken kategori på quiz som ska användas som argument i qetQuiz. fråga sebbe
//läckt API? fråga GitGuardian
