# DU3_projekt

> 💡 **Viktigt:** Alla `POST`-förfrågningar kräver att du skickar JSON i request-body.

## 🧠 API Dokumentation – QuizApp

Välkommen till backend-API:et för **QuizApp** – en plats där användare loggar in, svarar på quiz och klättrar på poängtavlan! Här nedan hittar du alla tillgängliga endpoints och hur du kommunicerar med dem.


Endpoints:

### 🔐 `/login`

#### ➕ `GET`

Hämta alla användare.

**Svar:** `200 OK` – Returnerar en array med samtliga användare.

---

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
- `409 Conflict` – Användarnamnet finns inte.

### 🔐 `/createAccount`

#### ➕ `GET`

Hämta alla användare.

**Svar:** `200 OK` – Returnerar en array med samtliga användare.

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
- `400 Bad Request` – Något saknas i inmatningen.
- `409 Conflict` – Användarnamnet finns redan.

### 🏠 `/homePage`

#### 🧾 `GET`

Hämta alla användares poäng – sorterade i fallande ordning.

- **Svar:** `200 OK`

---

### 🔍 `/homePage/Search?username=X`

#### 🔎 `GET`

Sök efter en användare med ett specifikt användarnamn.

- **Svar:**
  - `200 OK` – Användaren hittades.
  - `409 Conflict` – Användaren finns inte.
  - `400 Bad Request` – Tomt sökfält.

#### 💾 `POST`

- **Svar:**
  - `200 OK` – Användaren sparades.
  - `409 Conflict` – Användaren finns ej.
  - `400 Bad Request` – Tomt sökfält.

---

### ❓ `/homePage/Search?quiz=X`

Beskrivning:

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
