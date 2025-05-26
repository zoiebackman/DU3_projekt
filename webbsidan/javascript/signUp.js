createAccountButton.addEventListener("click", function () {
    async function createNewUser() {
        const userNameInput = document.getElementById("createLoginUsername");
        const passwordInput = document.getElementById("createLoginPasswordInput");
        const repeatPasswordInput = document.getElementById("createLoginPasswordInput2");


        if (passwordInput.value != repeatPasswordInput.value) {
            alert("Passwords does not match!")
            repeatPasswordInput.value = "";
            passwordInput.value = "";
            return;
        }

        const request = new Request("http://0.0.0.0:8000/createAccount", {
            method: "POST",
            body: JSON.stringify({
                username: userNameInput.value,
                password: passwordInput.value
            }),
            headers: { "Content-Type": "application/json" }
        });
        const response = await fetch(request);

        if (response.status === 409) {
            return alert("Username already exist!")
        }
        if (response.status === 400) {
            return alert("Empty field!")
        }

        if (response.status === 200) {
            alert("User created!")
            window.location.href = "logInPage.html";
        }

    }
    createNewUser();
})