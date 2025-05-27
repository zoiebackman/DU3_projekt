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

const activeUser = JSON.parse(localStorage.getItem("activeUser"));
console.log(activeUser);

const question1 = document.getElementById("question");
const answersBox = document.querySelector("#answers");
const countDown = document.getElementById("countDown");
const imageContainer = document.getElementById("imageContainer");

async function getQuiz(quizCategory, categoryImage) {
  const request = `https://the-trivia-api.com/api/questions?categories=${encodeURIComponent(
    quizCategory
  )}&limit=8&region=SE&difficulty=easy`;
  const response = await fetch(request);
  const quizData = await response.json();
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
  await getImages(categoryImage); /// vänta in objektet med bilder, anropa sedan

  function questionImages(indexOfImage) {
    imageContainer.innerHTML = `<img src=${images.photos[indexOfImage].src.medium} width="500" height="300" style="object-fit:contain;">`;
    imageContainer.style.display = "flex";
    imageContainer.style.justifyContent = "center";
    imageContainer.style.alignItems = "center";
    console.log(images);n
  }

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
      console.log(counter)
    }
    countDownSeconds();
    if (counter == 8) {
      countDown.style.visibility = "hidden";
      clearInterval(seconds);
    }

    answersBox.innerHTML = `
  <div class="answerFormat" id="answer1"></div>
  <div class="answerFormat" id="answer2"></div>
  <div class="answerFormat" id="answer3"></div>
  <div class="answerFormat" id="answer4"></div>
  `;
    const answers = document.querySelectorAll(".answerFormat");

    if (counter < quizData.length) {
      questionImages(counter); //skickar med countern till funktionen för att ta ut bild av index

      question1.textContent = `Question ${counter + 1} : ${
        quizData[counter].question
      };`;
      const newArray = [
        //döpa om?
        { text: quizData[counter].correctAnswer, isCorrect: true },
        { text: quizData[counter].incorrectAnswers[0], isCorrect: false },
        { text: quizData[counter].incorrectAnswers[1], isCorrect: false },
        { text: quizData[counter].incorrectAnswers[2], isCorrect: false },
      ];

      newArray.sort(() => Math.random() - 0.5);

      answers.forEach((button, i) => {
        button.textContent = newArray[i].text;
      });

      //clearInterval(countdownInterval);

      answers.forEach((button, i) => {
        button.addEventListener("click", function () {
          counter++;
          if (newArray[i].isCorrect === true) {
            button.style.backgroundColor = "green";
            scoreCounter++;
            setTimeout(() => {
              //counter++;
              nextQuestion();
            }, 1000);
          }
          if (newArray[i].isCorrect === false) {
            button.style.backgroundColor = "red";
            answers.forEach((button, index) => {
              if (newArray[index].isCorrect) {
                button.style.backgroundColor = "green";
              }
            });
            setTimeout(() => {
              //counter++;
              nextQuestion();
            }, 1000);
          }
        });
      });
    } else {
      imageContainer.innerHTML = ""; //ta bort bilden till sista scoreSidan
      const button = document.createElement("button");
      button.classList.add("endbutton");
      button.textContent = "Back to start";
      question1.textContent = "Quiz is done!";
      const finalText = document.createElement("div");
      finalText.textContent = `You scored ${scoreCounter} out of 8`;
      finalText.classList.add("finalText");
      imageContainer.style.flexDirection = "column";
      imageContainer.style.display = "flex";
      imageContainer.style.justifyContent = "center";
      imageContainer.style.alignItems = "center";
      imageContainer.appendChild(finalText);
      imageContainer.appendChild(button);

      button.addEventListener("click", function () {
        window.location.href = "homePage.html";
      });

      answers.forEach((button) => {
        button.textContent = "";
        button.style.backgroundColor = "#5bb0ac00";
      });
    }
  }
}

getQuiz(category, categoryImage);
