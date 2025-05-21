async function getQuiz(quizCategory) {
  const request = `https://the-trivia-api.com/api/questions?categories=${quizCategory}&limit=8&region=SE&difficulty=easy`;
  const response = await fetch(request);
  console.log(response);
  quizData = await response.json();
  console.log(quizData);

  localStorage.setItem(`category${quizCategory}`, JSON.stringify(quizData)); // spara data i lokal fil via webbläsaren
  const quiz = JSON.parse(localStorage.getItem(`category${quizCategory}`)); //hämta lokala filen
  console.log(quiz);
  //spara ner fil lokalt?

  
}
