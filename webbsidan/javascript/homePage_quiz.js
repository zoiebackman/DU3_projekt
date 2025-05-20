
const quizContainer = document.getElementById("mainContainer")
const signOutButton = document.getElementById("signOut");
//Hantering av att logga ut
signOutButton.addEventListener("click", function() {
    const popUpBox = document.getElementById("popUpSignOut");
        const yesButton = document.getElementById("yesButton");
        const noButton = document.getElementById("noButton");
        popUpBox.style.display = "block";
        yesButton.addEventListener("click", function () {
            window.location.href = "logInPage.html"
        });
        noButton.addEventListener("click", function (){
            window.location.href = "homePage.html"
        })
});
//Hantering av quiz-knapparna
const quizButtons = document.querySelectorAll(".quizButton")
quizButtons.forEach(button => {
    button.addEventListener("click", function(){
        const quizCategory = button.textContent.trim();
        quizContainer.innerHTML = "";
        getQuiz(quizCategory);
        getImage(quizCategory);
    })
})
//Fetch till externt API gällande att hämta quiz
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
//Fetch till externt API gällande att hämta bilder
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

// getQuiz()
// hämta alla användare i ordning på score

