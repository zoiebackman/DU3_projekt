const button = document.querySelector("button");

button.addEventListener ("click", function(){
    //Driver som testar att logga in med icke-existerande användare.
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

    //Driver som testar att logga in existerande användare.
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
    //Driver som returnerar array av alla användare.
    async function driver_3() {
        const request = new Request("http://localhost:8000/getUsers");
        const response = await fetch (request);
        const resource = await response.json();
        console.log("Test 3: En array av alla användare");
        console.log(response.status);
        console.log(resource);
    }

    // Funktion som hanterar alla async-funktioner och 
    //ser till att dessa körs i korrekt ordning.
    async function driverHandler() {
        await driver_1();
        await driver_2();
        await driver_3();
    }
    driverHandler(); 
})

