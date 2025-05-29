const quizContainer = document.getElementById("mainContainer");
const signOutButton = document.getElementById("signOut");
const topScore = document.getElementById("topScore");
const userBox = document.getElementById("userBox");
const userNameDiv = document.getElementById("myUserName");

const popUpBox = document.getElementById("popUpSignOut");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const homePageButton = document.getElementById("homePageButton");

let quizCategory;

//Hantering av att logga ut
async function getLoggedInUser() {
  const request = new Request("http://localhost:8000/currentUser");
  const response = await fetch(request);
  const resource = await response.json();

  console.log(resource);

  userNameDiv.textContent = `${resource.user.username} : ${resource.user.score}p`;
}

getLoggedInUser();

homePageButton.addEventListener("click", function () {
  window.location.href = "homePage.html";
});

signOutButton.addEventListener("click", function () {
  popUpBox.style.display = "block";
});
yesButton.addEventListener("click", async function () {
  const request = new Request("http://localhost:8000/currentUser");
  const response = await fetch(request);
  const resource = await response.json();

  const logoutUser = resource.user;

  await fetch("http://localhost:8000/logOut", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(logoutUser),
  });

  window.location.href = "logInPage.html";
});
noButton.addEventListener("click", function () {
  window.location.href = "homePage.html";
});

buttons();
//Hantering av quiz-knapparna
function buttons() {
  const quizButtons = document.querySelectorAll(".quizButton");
  quizButtons.forEach((button) => {
    button.addEventListener("click", function () {
      quizCategory = button.textContent.trim();
      quizContainer.innerHTML = "";
      getImage(quizCategory);
    });
  });
}

//Fetch till externt API gällande att hämta bilder
async function getImage(quizCategory) {
  const request = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    quizCategory
  )}&per_page=9`;
  const options = {
    headers: {
      Authorization: "V3C5EBsKEQBS1WAmameHcgifua6v5QP6tOmDbzBVmOSPGs0TIgGzENsT",
    },
  };
  const response = await fetch(request, options);
  const images = await response.json();
  console.log(images);

  quizContainer.innerHTML = "";

  const otherQuizButton = document.createElement("div");
  otherQuizButton.textContent = `Choose a Different Quiz `;
  otherQuizButton.id = "otherQuizButton";
  quizContainer.appendChild(otherQuizButton);
  console.log("klcik1");

  otherQuizButton.addEventListener("click", function () {
    console.log("klcik2");
    window.location.href = "homePage.html";
  });

  const img = document.createElement("img");
  img.className = "picture";
  img.src = images.photos[0].src.medium;
  img.width = 500;
  img.height = 300;
  img.style.objectFit = "cover";
  quizContainer.appendChild(img);

  const startQuizButton = document.createElement("div");
  startQuizButton.textContent = `Start ${quizCategory} Quiz!`;
  startQuizButton.id = "startQuizButton";
  quizContainer.appendChild(startQuizButton);

  startQuizButton.addEventListener("click", function () {
    if (quizCategory == "Food & Drink") {
      quizCategory = "food_and_drink";
      window.location.href = `quizPage.html?category=${encodeURIComponent(
        quizCategory
      )} `;
    }
    if (quizCategory == "Film & Tv") {
      quizCategory = "film_and_tv";
      window.location.href = `quizPage.html?category=${encodeURIComponent(
        quizCategory
      )}`;
    }
    window.location.href = `quizPage.html?category=${encodeURIComponent(
      quizCategory
    )}`;
  });
}

async function getTopUsers() {
  const request = `http://localhost:8000/quizPage/result`;
  const response = await fetch(request);
  const users = await response.json();

  for (let user of users) {
    const div = document.createElement("div");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    p1.textContent = `✰ ${user.username}`
    p2.textContent = `${user.score} poäng`

    div.classList.add("topPlayers");
    p1.id = ("topScoreName")
    p2.id = ("topScorePoints")
    div.appendChild(p1);
    div.appendChild(p2);
    topScore.appendChild(div);
  }
}

const searchForQuizInput = document.getElementById("searchForQuiz");
const quizLibary = document.getElementById("quizLibrary");
let quizButtonText = document.querySelectorAll(".quizButtonText");

searchForQuizInput.addEventListener("input", function () {
  quizLibary.innerHTML = ``;
  quizLibary.style.height = "492px";
  quizLibary.style.width = "589px";
  for (let text of quizButtonText) {
    if (
      text.textContent
        .toLowerCase()
        .includes(searchForQuizInput.value.toLowerCase())
    ) {
      const div = document.createElement("div");
      const p = document.createElement("p");

      div.classList.add("quizButton");
      p.textContent = text.textContent;
      p.classList.add("quizButtonText");
      div.appendChild(p);
      quizLibary.appendChild(div);

      buttons();
    }
  }
});

getTopUsers();
