const question1 = document.getElementById("question");
const answers = document.querySelectorAll(".answerFormat");

async function getQuiz(quizCategory) {
  const request = `https://the-trivia-api.com/api/questions?categories=${quizCategory}&limit=8&region=SE&difficulty=easy`;
  const response = await fetch(request);
  const quizData = await response.json();
  console.log(quizData);

  /* localStorage.setItem(`category${quizCategory}`, JSON.stringify(quizData)); // spara data i lokal fil via webbläsaren
  const quiz = JSON.parse(localStorage.getItem(`category${quizCategory}`)); //hämta lokala filen
  console.log(quiz); */

  let counter = 1;
  for (let quiz of quizData) {
    console.log(quiz);
    question1.textContent = `Question ${counter} : ${quiz.question}`;
    console.log(question1);
    console.log(counter);
    counter++;
  }
  console.log("Quiz frågor slut");

  //spara ner fil lokalt?
}

getQuiz("science");

//importera variabel från homePage, vilken kategori på quiz som ska användas som argument i qetQuiz. fråga sebbe
