
//tryck på knappen på Homepage -- addeventlistener
//hämta quiz, spara ner i en jsonFil
//

const quizButton = document.getElementById("geographyQuiz")
const quizContainer = document.getElementById("mainContainer")

quizButton.addEventListener("click", function () {
    // getQuiz("geography")
    quizContainer.innerHTML = ""

    getImage("geography")

})


async function getQuiz(quizCategory) {
    // const request = `https://the-trivia-api.com/api/questions?categories=${quizCategory}&limit=8&region=SE&difficulty=easy`
    const response = await fetch(request)
    console.log(response)
    const quizData = await response.json()
    console.log(quizData)

    const file = "../../server/quiz.json"
    Deno.writeTextFileSync(file, quizData)

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

    quizContainer.innerHTML = `<img src=${images.photos[0].src.medium} width="500" height="500" style="object-fit:contain;"></img>`

}

// getQuiz()