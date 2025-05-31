class ShowQuestionImage {
  constructor(imageContainer, images, indexOfImage) {
    this.container = imageContainer;
    this.images = images;
    this.indexOfImage = indexOfImage;
  }
  styleImage(indexOfImage) {
    const imgSrc = this.images.photos[indexOfImage].src.medium;

    this.container.innerHTML = `
      <img src="${imgSrc}" width="100%" height="100%" style="object-fit:cover;">
    `;
    this.container.style.display = "flex";
    this.container.style.justifyContent = "center";
    this.container.style.borderRadius = "20px";
  }
}

function showFinalScore(imageContainer, question1, scoreCounter) {
  imageContainer.innerHTML = ""; //ta bort bilden till sista scoreSidan
  const button = document.createElement("button");
  button.classList.add("endbutton");
  button.textContent = "Back to start";
  question1.textContent = "Quiz is done!";
  const finalText = document.createElement("div");
  finalText.innerHTML = `You Scored: <br> ${scoreCounter} out of 80 points!`;
  finalText.classList.add("finalText");
  imageContainer.style.flexDirection = "column";
  imageContainer.style.display = "flex";
  imageContainer.style.border = "none";
  imageContainer.style.justifyContent = "center";
  imageContainer.style.alignItems = "center";
  imageContainer.appendChild(finalText);
  imageContainer.appendChild(button);
  return button;
}

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
console.log(category);
let categoryImage = category;
if (category == "food_and_drink") {
  categoryImage = "Food & Drink";
}
if (category == "film_and_tv") {
  categoryImage = "Film & tv";
}

if (!category) {
  alert("Ingen kategori vald. Du måste välja en kategori på startsidan först.");
  window.location.href = "homePage.html";
}

const question1 = document.getElementById("question");
const answersBox = document.querySelector("#answers");
const countDown = document.getElementById("countDown");
const imageContainer = document.getElementById("imageContainer");
const leavePageButton = document.getElementById("leavePage");
const scoreDivP = document.getElementById("scoreDivP");
scoreDivP.textContent = `0`;

leavePageButton.addEventListener("click", function () {
  window.location.href = "./homePage.html";
});

async function getQuiz(quizCategory, categoryImage) {
  const request = `https://the-trivia-api.com/api/questions?categories=${encodeURIComponent(
    quizCategory
  )}&limit=8&region=SE&difficulty=easy`;
  const response = await fetch(request);
  const quizData = await response.json();
  console.log(quizData);

  let images;
  let counter = 0;
  let scoreCounter = 0;

  async function getImages(categoryImage) {
    const request1 = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      categoryImage
    )}&per_page=9`;
    const options = {
      headers: {
        Authorization:
          "V3C5EBsKEQBS1WAmameHcgifua6v5QP6tOmDbzBVmOSPGs0TIgGzENsT",
      },
    };
    const response1 = await fetch(request1, options);
    images = await response1.json();
    console.log(images);
  }
  console.log(images);
  await getImages(categoryImage);

  const imageContainer = document.getElementById("imageContainer");

  nextQuestion();

  function nextQuestion() {
    let seconds = 21;
    countDown.textContent = 21;
    function countDownSeconds() {
      if (countDown.textContent == seconds) {
        seconds--;
        countDown.textContent = String(seconds);
        countDown.classList.add("animate");
        countDown.classList.remove("animate");
        void countDown.offsetWidth;
        countDown.classList.add("animate");
        setTimeout(() => {
          countDownSeconds();
        }, 1000);
      }
      if (countDown.textContent <= 0) {
        counter++;
        nextQuestion();
      }
    }

    if (counter == 8) {
      countDown.style.visibility = "hidden";
      console.log(countDown);
      console.log(`COUNTRER: ${counter}`);
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
      const pic = new ShowQuestionImage(imageContainer, images, counter);
      pic.styleImage(counter);

      question1.textContent = `Question ${counter + 1} of 8: ${
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
            button.style.background = "#57C785";
            button.style.background =
              "linear-gradient(309deg,rgba(87, 199, 133, 1) 50%, rgba(160, 235, 191, 1) 100%)";
            button.style.color = "white";
            scoreCounter += 10;
            scoreDivP.textContent = `${scoreCounter} p`;
            button.disabled = true;
            setTimeout(() => {
              nextQuestion();
            }, 1000);
          }
          if (newArray[i].isCorrect === false) {
            button.style.color = "white";
            button.style.background = "#f58484";
            button.style.background =
              "linear-gradient(110deg,rgba(245, 132, 132, 1) 0%, rgba(240, 81, 81, 1) 61%)";
            answers.forEach((button, index) => {
              if (newArray[index].isCorrect) {
                button.style.background = "#57C785";
                button.style.background =
                  "linear-gradient(309deg,rgba(87, 199, 133, 1) 50%, rgba(160, 235, 191, 1) 100%)";
                button.style.color = "white";
              }
            });

            setTimeout(() => {
              nextQuestion();
            }, 1000);
          }
        });
      });
    } else {
      async function pointToUser() {
        const request1 = new Request("http://localhost:8000/currentUser");
        const response1 = await fetch(request1);
        const resource1 = await response1.json();
        resource1.user.score = scoreCounter;
        console.log(resource1);

        const request2 = await fetch("http://localhost:8000/updatedScore", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resource1.user),
        });
      }

      const currentScore = document.getElementById("currentScore");
      const pellePicture = document.getElementById("pellePicture");
      if (scoreCounter == 0 || scoreCounter == 10 || scoreCounter == 20) {
        currentScore.innerHTML = `
            
            <img id="pellePicture" src="../../bilder/sadPelle.png" alt="">`;
        pellePicture.style.marginRight = "0px";
      }

      if (scoreCounter == 30 || scoreCounter == 40 || scoreCounter == 50) {
        currentScore.innerHTML = `
            
            <img id="pellePicture" src="../../bilder/Pelleneutral.png" alt="">`;
        pellePicture.style.marginRight = "0px";
      }
      if (scoreCounter == 60 || scoreCounter == 70 || scoreCounter == 80) {
        currentScore.innerHTML = `
            
            <img id="pellePicture" src="../../bilder/PelleHappy.png" alt="">`;
        pellePicture.style.marginRight = "0px";
      }

      pointToUser();
      const button = showFinalScore(imageContainer, question1, scoreCounter);

      button.addEventListener("click", function () {
        window.location.href = "homePage.html";
      });

      answers.forEach((button) => {
        button.textContent = "";
        button.style.boxShadow = "none";
        button.style.backgroundColor = "#5bb0ac00";
      });
    }
  }
}

getQuiz(category, categoryImage);
