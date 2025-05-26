const quizContainer = document.getElementById("mainContainer");
const signOutButton = document.getElementById("signOut");
const topScore = document.getElementById("topScore");
let quizCategory;

//Hantering av att logga ut
signOutButton.addEventListener("click", function () {
  const popUpBox = document.getElementById("popUpSignOut");
  const yesButton = document.getElementById("yesButton");
  const noButton = document.getElementById("noButton");
  popUpBox.style.display = "block";
  yesButton.addEventListener("click", function () {
    window.location.href = "logInPage.html";
  });
  noButton.addEventListener("click", function () {
    window.location.href = "homePage.html";
  });
});

//Hantering av quiz-knapparna
const quizButtons = document.querySelectorAll(".quizButton");
quizButtons.forEach((button) => {
  button.addEventListener("click", function () {
    quizCategory = button.textContent.trim();
    quizContainer.innerHTML = "";
    getImage(quizCategory);
  });
});

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

  quizContainer.innerHTML = `<img src=${images.photos[0].src.medium} width="500" height="300" style="object-fit:contain;">`;

  const startQuizButton = document.createElement("div");
  startQuizButton.textContent = `Start ${quizCategory} Quiz`;
  startQuizButton.id = "startQuizButton";
  quizContainer.appendChild(startQuizButton);

  startQuizButton.addEventListener("click", function () {
    if (quizCategory == "Food & Drink") {
      quizCategory = "food_and_drink";
      window.location.href = quizPage.html?category=${encodeURIComponent(
        quizCategory)};
    }
    if (quizCategory == "Film & Tv") {
      quizCategory = "film_and_tv";
      window.location.href = quizPage.html?category=${encodeURIComponent(
        quizCategory
      )};
    }
    window.location.href = `quizPage.html?category=${encodeURIComponent(quizCategory)}`;
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
    p1.textContent = user.username;
    p2.textContent = user.score;

    div.classList.add("topPlayers");
    div.appendChild(p1);
    div.appendChild(p2);
    topScore.appendChild(div);
  }
}

getTopUsers();