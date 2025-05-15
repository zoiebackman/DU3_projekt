# DU3_projekt

> 💡 **Viktigt:** Alla `POST`-förfrågningar kräver att du skickar JSON i request-body.

## 🧠 API Dokumentation – QuizApp

Välkommen till backend-API:et för **QuizApp** – en plats där användare loggar in, svarar på quiz och klättrar på poängtavlan! Här nedan hittar du alla tillgängliga endpoints och hur du kommunicerar med dem.


Endpoints:
### 🔐 `/getUsers`

#### ➕ `GET`

Returnerar array med alla användare.

**Svar:** `200 OK` – Returnerar en array med samtliga användare.

---


### 🔐 `/login`

#### 🔑 `POST`

Logga in en användare.

**Body:**
Json:
{
"username": "ditt_namn",
"password": "ditt_lösenord"
}

**Svar:**

- `200 OK` – Inloggning lyckades! Användaren finns och lösenordet stämmer.
- `400 Bad Request` – Användarnamn/lösenord matchar inte.

### 🔐 `/createAccount`

---

#### ✨ `POST` –

Skapa ny användare.
**Body:**
Json:
{
"username": "ditt_namn",
"password": "ditt_lösenord"
}

**Svar:**

- `200 OK` – Användaren skapades!
- `400 Bad Request` – Något saknas i inmatningens

### 🏠 `/homePage`

#### 🧾 `GET`

Hämta alla användares poäng – sorterade i fallande ordning.

- **Svar:** `200 OK`
---

### ❓ `/homePage/Search?quiz=X`

Returnerar de quiz som innehåller de bokstäverna som anges i input. 

#### 🧠 `GET`

- **Svar:**
  - `200 OK` – Matchande quiz returneras.
  - `400 Bad Request` – Inget quiz matchar sökningen.
  - `409 Conflict` – Tomt sökfält.

---

### 📄 `/quizPage`

#### 🔄 `GET`

Hämta frågor och svar från ett externt API.

- **Svar:** `200 OK`

#### 📝 `POST`

Spara användarens svar i en ny array.

---

### 🏆 `/quizPage/result`

#### 📊 `GET`

Hämta scoreboarden med användarnas resultat.

- **Svar:** `200 OK`

---
