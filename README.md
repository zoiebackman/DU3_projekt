# DU3_projekt
API
Endpoints:
/login
GET - förfrågningar till denna endpoint besvaras med status 200 och returnerar en array med alla användare.

POST-förfrågning till denna endpointen måste ha en JSON-formaterad body:

Logga in:
Beskrivning: Försöker logga in användare.

{ 
     username: string,
     password: string
}

Potentiella svar:
200 - Användare finns i array, användarnamn och lösenord matchar. 
400 - Användarnamn och lösenord matchar ej.
409 - Användarnamnet finns ej i array.

Skapa användare:
Beskrivning: Skapar en ny användare.

{ 
     username: string,
     password: string
}
Potentiella svar:
200 - användarnamn finns ej i array, kommer läggas till i array
400 - användarnamn eller lösenord saknas
409 - användarnamn finns redan

/homePage
GET-förfrågningar till denna endpoint svarar med status 200 och hämtar alla användares poäng i fallande ordning.

/homePage/Search?username=X
Beskrivning: Söker efter en användare med angivet användarnamn.

GET-förfrågning till denna endpoint svarar med status 200 och returnerar den användare som sökningen avser. 
POST-förfrågning till denna endpoint svarar med status 200 och användaren sparas i en array. 
Potentiella svar:
200 - Användaren sparas i array
409 - Användare finns ej 
400 - Tomt sökfält 



/homePage/Search?quiz=X
Beskrivning: 


GET-förfrågning till denna endpoint svarar med status 200 och en returnerar de quiz som matchar sökningen.
Potentiella svar:
200 - De quiz som matchar sökningen returneras 
400 - Inget quiz matchar sökningen
409 - Tomt sökfält


/quizPage
Beskrivning:
Hämtar frågor och svar hos externt API.
GET-förfrågning till denna endpoint svarar med status 200. 
POST-förfrågning som sparar ner varje svar till en ny array.


/quizPage/result
Beskrivning: 
Hämta scoreBoard 
GET-förfrågningar till endpoint svarar med status 200. 