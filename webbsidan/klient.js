async function f1() {
  const response = await fetch(
    "https://the-trivia-api.com/api/questions?categories=science&limit=9&region=SE&difficulty=easy"
  );
  const resource = await response.json();
  console.log(resource);
}

f1();

async function f2() {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const resource = await response.json();

  document.body.innerHTML = `
  <img src=${resource.message}></img>
  `;
}

f2();

async function f3() {
  const response = await fetch("http:/localhost:8000/");
  const resource = await response.json();
  console.log(resource)
}