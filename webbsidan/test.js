const button = document.querySelector("button");

button.addEventListener("click", function () {
  //Driver som testar att logga in med icke-existerande användare.
  async function driver_1() {
    const newUser = { username: "Yoman", password: "Liseberg123" };

    const request = new Request("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const response = await fetch(request);
    console.log("Test 1: icke-existerande användare:");
    console.log(response.status);
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
    console.log("Test 2: logga in med existerande användare:");
    console.log(response.status);
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
    const resource = await response.json();
    console.log("Test 3: Testar att skapa ny användare");
    console.log(response.status);
    console.log(resource);
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
    const resource = await response.json();
    console.log("Test 5: Saknas input i inmatningsfält");
    console.log(response.status);
    console.log(resource);
  }
  async function driver_5() {
    const request = new Request("http://localhost:8000/homePage/search?quiz=s");
    const response = await fetch(request);
    const resource = await response.json();
    console.log("Test 5: Söka efter quiz");
    console.log(response.status);
    console.log(resource);
  }
  async function driver_6() {
    const request = new Request("http://localhost:8000/quizPage/result");
    const response = await fetch(request);
    const resource = await response.json();
    console.log("Test 6: Array av highscore");
    console.log(response.status);
    console.log(resource);
  }

  //Driver som returnerar array av alla användare.
  async function driver_Users() {
    const request = new Request("http://localhost:8000/getUsers");
    const response = await fetch(request);
    const resource = await response.json();
    console.log(" En array av alla användare:");
    console.log(response.status);
    console.log(resource);
  }
  //Funktion som hämtar API gällande bilderna
  async function getPicture() {
    //hämta bild/bilder från API
    const response = await fetch(
      "https://api.pexels.com/v1/search?query=Tigers&per_page=1",
      {
        headers: {
          Authorization:
            "V3C5EBsKEQBS1WAmameHcgifua6v5QP6tOmDbzBVmOSPGs0TIgGzENsT",
        },
      }
    );

    const resource = await response.json();
    console.log(resource.photos[0].src);

    const bild = document.getElementById("bild");
    bild.innerHTML = `
        <img src=${resource.photos[0].src.medium}></img>`;
  }
  //Funktion som hämtar API gällande frågor
  async function getQuizQuestions() {
    const response = await fetch(
      //Hämta frågor från API
      "https://the-trivia-api.com/api/questions?categories=science&limit=9&region=SE&difficulty=easy"
    );
    const resource = await response.json();
    console.log(resource);
  }

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
});
