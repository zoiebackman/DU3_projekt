const p = document.createElement("p");
const testDiv = document.getElementById("testBox");

function createDiv(response, textContent, expectedStatus) {
  function setColor(status) {
    console.log(response);
    if (status === 200) {
      return "(309deg, rgba(87, 199, 133, 1) 50%, rgba(160, 235, 191, 1) 100%)";
    }
    if (
      response.status === 400 ||
      response.status == 404 ||
      response.status == 409
    ) {
      return "(110deg, rgba(245, 132, 132, 1) 0%, rgba(240, 81, 81, 1) 61%)";
    }
  }
  const div = document.createElement("div");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");

  p1.textContent = textContent;
  p2.textContent = `Status: ${response.status}`;
  p3.textContent = `(Expected status: ${expectedStatus})`;
  div.style.backgroundImage = `linear-gradient${setColor(response.status)}`;

  div.classList.add("testDiv");
  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(p3);
  testDiv.appendChild(div);
}

async function driver_Users() {
  const request = new Request("http://localhost:8000/getUsers");
  const response = await fetch(request);

  const testText = "Test 1: Array of Users";
  createDiv(response, testText, 200);
}

async function driver_2() {
  const newUser = { username: "Yoman", password: "Liseberg123" };
  const request = new Request("http://localhost:8000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  const response = await fetch(request);
  const testText = "Test 2: Non-Existing User:";
  createDiv(response, testText, 400);
}

async function driver_3() {
  const newUser = { username: "pelle_boi", password: "fotboll123" };

  const request = new Request("http://localhost:8000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  const response = await fetch(request);

  const testText = "Test 3: Login with Non-Existning User:";
  createDiv(response, testText, 200);
}
async function driver_4() {
  const newUser = {
    username: "Lea",
    password: "Häst123",
    score: 30,
    logedIn: false,
  };
  const request = new Request("http://localhost:8000/createAccount", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  const response = await fetch(request);

  const testText = "Test 4: Create New User";
  createDiv(response, testText, 200);
}
async function driver_5() {
  const newUser = { username: "", password: "fotboll" };
  const request = new Request("http://localhost:8000/createAccount", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  const response = await fetch(request);
  const testText = "Test 5: Text Missing In Input-Field";
  createDiv(response, testText, 400);
}

async function driver_6() {
  const request = new Request("http://localhost:8000/quizPage/result");
  const response = await fetch(request);
  const testText = "Test 6: Array With Highscore";

  createDiv(response, testText, 200);
}

async function driver_7() {
  const request = new Request("http://localhost:8000/currentUser");
  const response = await fetch(request);
  const testText = "Test 7: Get LoggedIn User";
  createDiv(response, testText, 200);
}
async function driver_8() {
  const user = {
    username: "Lea",
    password: "Häst123",
    score: 30,
    logedIn: true,
  };
  const request = new Request("http://localhost:8000/logOut", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const response = await fetch(request);
  const testText = "Test 8: User Logout";
  createDiv(response, testText, 200);
}

async function driver_9() {
  const request = new Request("http://localhost:8000/getUsers");
  const response = await fetch(request);
  const testText = "Test 9: New Array With Users";
  createDiv(response, testText, 200);
}
async function driver_10() {
  const request = new Request("http://localhost:8000/currentUser");
  const response = await fetch(request);
  const testText = "Test 10: No User Logged In";
  createDiv(response, testText, 200);
}
async function driver_11() {
  const user = {
    username: "Lea",
    password: "Häst123",
    score: 60,
    logedIn: true,
  };
  const request = new Request("http://localhost:8000/updatedScore", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const response = await fetch(request);
  const testText = "Test 11: Updated User Score";
  createDiv(response, testText, 200);
}
async function driver_12() {
  const newUser = {
    username: "Lea",
    password: "Häst323",
    score: 30,
    logedIn: false,
  };
  const request = new Request("http://localhost:8000/createAccount", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  const response = await fetch(request);

  const testText = "Test 12: Create User With Already Existing Username";
  createDiv(response, testText, 409);
}

async function driverHandler() {
  await driver_Users();
  await driver_2();
  await driver_3();
  await driver_4();
  await driver_5();
  await driver_6();
  await driver_7();
  await driver_8();
  await driver_9();
  await driver_11();
  await driver_12();
}
driverHandler();
