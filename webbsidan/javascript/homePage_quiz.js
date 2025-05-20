//homepageQuiz
//tryck på knappen på Homepage -- addeventlistener
//hämta quiz, spara ner i en jsonFil
//

/*const quizButton = document.getElementById("geographyQuiz")
const quizContainer = document.getElementById("mainContainer")
const quizButtons = document.querySelectorAll(".quizButton")
const signOutButton = document.getElementById("signOut");
let quizData;
//fixa så att geography ändras beroende på vilken knapp
let quizCategory;
/* console.log(quizContainer)
console.log("yomnán")
quizContainer.addEventListener("click", function () {
    quizCategory = quizButtons.textContent
    console.log(quizCategory)
}) */

for (let quiz of quizContainer.children) {
    quiz.addEventListener("click", function () {
        quizCategory = quiz.textContent
    })
}

quizButton.addEventListener("click", function () {
    getQuiz("geography")
    quizContainer.innerHTML = ""
    getImage("geography")
})

// export { quizData }

async function getQuiz(quizCategory) {
    const request = `https://the-trivia-api.com/api/questions?categories=${quizCategory}&limit=8&region=SE&difficulty=easy`
    const response = await fetch(request)
    console.log(response)
    quizData = await response.json()
    console.log(quizData)

    localStorage.setItem(`category${quizCategory}`, JSON.stringify(quizData)) // spara data i lokal fil via webbläsaren 
    const quiz = JSON.parse(localStorage.getItem(`category${quizCategory}`)) //hämta lokala filen
    console.log(quiz)
    //spara ner fil lokalt?

}
// await getQuiz(export { quizData })

// const data = getQuiz(quizCategory);

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

    startQuizButton.addEventListener("click", function () {
        window.location.href = "quizPage.html"
    })
}

signOutButton.addEventListener("click", function() {
    window.location.href = "loginPage.html"
});





// getQuiz()

// hämta alla användare i ordning på score

