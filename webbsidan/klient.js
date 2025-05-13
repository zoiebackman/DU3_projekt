async function f1() {
  const response = await fetch(
    "https://the-trivia-api.com/api/questions?categories=science&limit=9&region=SE&difficulty=easy"
  );
  const resource = await response.json();
  console.log(resource);
}

f1();
