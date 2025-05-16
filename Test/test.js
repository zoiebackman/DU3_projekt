const button = document.querySelector("button");
const p = document.createElement("p");
const testDiv = document.getElementById("testBox");

function setColor(response) {
  console.log(response);
  if (response.status === 200) {
    return "green";
  }
  if (response.status === 400 || response.status == 404) {
    return "red";
  }
}

function createDiv(response, textContent) {
  const div = document.createElement("div");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");

  p1.textContent = textContent;
  p2.textContent = `Status: ${response.status}`;
  div.style.backgroundColor = setColor(response.status);

  div.classList.add("testDiv");
  div.appendChild(p1);
  div.appendChild(p2);
  testDiv.appendChild(div);
}

//Driver som testar att logga in med icke-existerande användare.
async function driver_1() {
  const newUser = { username: "Yoman", password: "Liseberg123" };

  const request = new Request("http://localhost:8000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  const response = await fetch(request);
  const testText = "Test 1: icke-existerande användare:";
  createDiv(response, testText);
}

//Driver som testar att logga in existerande användare.
async function driver_2() {
  const newUser = { username: "pelle_boi", password: "fotboll123" };

  const request = new Request("http://localhost:8000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  const response = await fetch(request);

  const testText = "Test 2: logga in med existerande användare:";
  createDiv(response, testText);
}
//Driver som testar att skapa en ny användare.
async function driver_3() {
  const newUser = { username: "Lea", password: "Häst123" };
  const request = new Request("http://localhost:8000/createAccount", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  const response = await fetch(request);

  const testText = "Test 3: icke-existerande användare:";
  createDiv(response, testText);
}
async function driver_4() {
  // Testar att skapa user med tomt inmatningsfält
  const newUser = { username: "", password: "fotboll" };
  const request = new Request("http://localhost:8000/createAccount", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  const response = await fetch(request);
  const testText = "Test 4: Saknas input i inmatningsfält";
  createDiv(response, testText);
}
async function driver_5() {
  const request = new Request("http://localhost:8000/homePage/search?quiz=s");
  const response = await fetch(request);

  const testText = "Test 5: Söka efter quiz";
  createDiv(response, testText);
}
async function driver_6() {
  const request = new Request("http://localhost:8000/quizPage/result");
  const response = await fetch(request);
  const testText = "Test 6: Array av highscore";

  createDiv(response, testText);
}

//Driver som returnerar array av alla användare.
async function driver_Users() {
  const request = new Request("http://localhost:8000/getUsers");
  const response = await fetch(request);

  const testText = "Test 7: Array med alla användare";
  createDiv(response, testText);
}
//Funktion som hämtar API gällande bilderna
/* async function getPicture() {
  //hämta bild/bilder från API
  const response = await fetch(
    "https://api.pexels.com/v1/search?query=Boats&per_page=8",
    {
      headers: {
        Authorization:
          "V3C5EBsKEQBS1WAmameHcgifua6v5QP6tOmDbzBVmOSPGs0TIgGzENsT",
      },
    }
  );

  const resource = await response.json();
  console.log(resource);

  const bild = document.getElementById("bild");
  bild.innerHTML = `
        <img src=${resource.photos[0].src.medium}></img>`;

  createDiv(response, testText);
}
//Funktion som hämtar API gällande frågor
async function getQuizQuestions() {
  const response = await fetch(
    //Hämta frågor från API
    "https://the-trivia-api.com/api/questions?categories=science&limit=9&region=SE&difficulty=easy"
  );
  const resource = await response.json();
  console.log(resource);

} */

// Funktion som hanterar alla async-funktioner och
//ser till att dessa körs i korrekt ordning.
async function driverHandler() {
  await driver_1();
  await driver_2();
  await driver_3();
  await driver_4();
  await driver_5();
  await driver_6();

  await driver_Users();
  await getPicture();
  await getQuizQuestions();
}
driverHandler();
