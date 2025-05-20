const loginButton = document.getElementById("loginButton");
const clickHereCreateButton = document.getElementById("clickHere");
const createAccountButton = document.getElementById("createAccountButton");

//homepageQuiz
//tryck på knappen på Homepage -- addeventlistener
//hämta quiz, spara ner i en jsonFil
//

const quizButton = document.getElementById("geographyQuiz")
const quizContainer = document.getElementById("mainContainer")

quizButton.addEventListener("click", function () {
    getQuiz("geography")
    quizContainer.innerHTML = ""
    getImage("geography")

})

async function getQuiz(quizCategory) {
    const request = `https://the-trivia-api.com/api/questions?categories=${quizCategory}&limit=8&region=SE&difficulty=easy`
    const response = await fetch(request)
    console.log(response)
    const quizData = await response.json()
    console.log(quizData)

    localStorage.setItem(`category${quizCategory}`, JSON.stringify(quizData)) // spara data i lokal fil via webbläsaren 
    const quiz = JSON.parse(localStorage.getItem(`category${quizCategory}`)) //hämta lokala filen
    console.log(quiz)
    //spara ner fil lokalt?

}

async function getImage(quizCategory) {
    const request = `https://api.pexels.com/v1/search?query=${quizCategory}&per_page=9`
    const options = {
        headers: {
            Authorization: "V3C5EBsKEQBS1WAmameHcgifua6v5QP6tOmDbzBVmOSPGs0TIgGzENsT"
        }
    }
    const response = await fetch(request, options)
    const images = await response.json()
    console.log(images)

    quizContainer.innerHTML = `<img src=${images.photos[0].src.medium} width="500" height="300" style="object-fit:contain;">`

    const startQuizButton = document.createElement("div")
    startQuizButton.textContent = `Start ${quizCategory} Quiz`
    startQuizButton.id = "startQuizButton"
    quizContainer.appendChild(startQuizButton)

}

// getQuiz()

loginButton.addEventListener("click", function () {
    const userNameInput = document.getElementById("loginUserNameInput");
    const passwordInput = document.getElementById("loginPasswordInput");

    fetch("http://0.0.0.0:8000/login", {
        method: "POST",
        body: JSON.stringify({
            username: userNameInput.value,
            password: passwordInput.value,
        }),
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => {
            if (response.status == 400) {
                alert("wrong password or username");
                return;
            } else {
                return response.json();
            }
        })
        .then((resource) => {
            console.log(resource);
        });
});

