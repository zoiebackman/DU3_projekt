const loginButton = document.getElementById("loginButton");
const createAccountButton = document.getElementById("createAccountButton");
const clickHereCreateButton = document.getElementById("clickHere");

loginButton.addEventListener("click", function () {
  const userNameInput = document.getElementById("loginUserNameInput");
  const passwordInput = document.getElementById("loginPasswordInput");

  fetch("http://0.0.0.0:8000/login", {
    method: "POST",
    body: JSON.stringify({
      username: userNameInput.value,
      password: passwordInput.value,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (response.status == 400) {
        alert("wrong password or username");
        return;
      } else {
        return response.json();
      }
    })
    .then((resource) => {
      let activeUser = resource;
      localStorage.setItem("activeUser", JSON.stringify(activeUser));
      window.location.href = "homePage.html";
    });
});
