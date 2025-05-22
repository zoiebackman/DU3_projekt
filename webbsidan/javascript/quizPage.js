const question1 = document.getElementById("question");
const answers = document.querySelectorAll(".answerFormat");
const countDown = document.getElementById("countDown");

async function getQuiz(quizCategory) {
  const request = `https://the-trivia-api.com/api/questions?categories=${quizCategory}&limit=8&region=SE&difficulty=easy`;
  const response = await fetch(request);
  const quizData = await response.json();
  // console.log(quizData);

  /* localStorage.setItem(`category${quizCategory}`, JSON.stringify(quizData)); // spara data i lokal fil via webbläsaren
  const quiz = JSON.parse(localStorage.getItem(`category${quizCategory}`)); //hämta lokala filen
  console.log(quiz); */
  return quizData;
}

  let answerCounter = 0;

  function getQuestion (counter)  {
  const quizData = getQuiz()

    let questionIndex = counter;
    question1.textContent = `Question ${questionIndex + 1} : ${quizData[questionIndex].question}`;

  if (questionIndex < quizData.length) {
      console.log(quizData)
      question1.textContent = `Question ${questionIndex + 1} : ${quizData[answerCounter].question}`;
    getAnswers(questionIndex) 
  }
  else {
      question1.textContent = "Quizet är slut!";
      question1.textContent = "";
    }
}

  getQuestion(0)

  countDown.addEventListener("click", function nextQuestion() {
    answers.classList.add("reloadColor")
    counter++;
    getQuestion(counter)
  })
  
  
    function getAnswers (questionIndex) {
      let newArray = [
        { text: quizData[questionIndex].correctAnswer, isCorrect: true },
        { text: quizData[questionIndex].incorrectAnswers[0], isCorrect: false },
        { text: quizData[answerCounter].incorrectAnswers[1], isCorrect: false },
        { text: quizData[answerCounter].incorrectAnswers[2], isCorrect: false },
      ];
     
      answers.forEach((button, i) => {
        button.textContent = newArray[i].text;
      });
      const newButtons = document.querySelectorAll(".answerFormat");
      newButtons.forEach((button, i) => {
        button.addEventListener("click", function () {
          if (newArray[i].isCorrect == true){
            button.style.backgroundColor = "green";
          } 
          if(newArray[i].isCorrect == false){
            button.style.backgroundColor = "red";
          }});
       answerCounter++; 
  });

}

  //spara ner fil lokalt?

getQuiz("science");

//importera variabel från homePage, vilken kategori på quiz som ska användas som argument i qetQuiz. fråga sebbe
//läckt API? fråga GitGuardian
