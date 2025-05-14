const button = document.querySelector("button");

button.addEventListener ("click", function(){
    async function driver_1(){
        const newUser = { username: "Yoman", password: "Liseberg123" };

        const request = new Request("http://localhost:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
        const response = await fetch(request);

        console.log("Test 1: icke-existerande användare:")
        console.log( response.status);
    }

    async function driver_2(){
        const newUser = { username: "pelle_boi", password: "fotboll123" };

        const request = new Request("http://localhost:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
        const response = await fetch(request);
        console.log("Test 2: logga in med existerande användare:")
        console.log( response.status);
    }

    // Funktion som hanterar alla async-funktioner och 
    //ser till att dessa körs i korrekt ordning.
    async function driverHandler() {
        await driver_1();
        await driver_2();
    }
    driverHandler(); 
})

