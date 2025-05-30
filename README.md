# DU3_projekt

> 💡 **Viktigt:** Alla `POST`-förfrågningar kräver att du skickar JSON i request-body.

## 🧠 API Dokumentation – QuizApp

Välkommen till backend-API:et för **QuizApp** – en plats där användare loggar in, svarar på quiz och klättrar på poängtavlan! Här nedan hittar du alla tillgängliga endpoints och hur du kommunicerar med dem.

`Endpoints`:

### 🔐 `/getUsers`

#### ➕ `GET`

Returnerar array med alla användare.

**Svar:** `200 OK` – Returnerar en array med samtliga användare.

---

### 🏆 `/quizPage/result`

#### 📊 `GET`

Hämta scoreboarden med användarnas resultat.

- **Svar:** `200 OK`

---

### 🙎‍♂️ `/currentUser`

#### ➕ `GET`

Returnerar den användare som är inloggad (där loggedIn === true).

- **Svar:** `200 OK` - Inloggad användare hittades.

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
---

### 🔐 `/createAccount`

#### ✨ `POST`

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
- `409 Bad Request` – Något saknas i inmatningens

---
### ❓ `/updatedScore`

#### ✨ `PUT`
**Body:**
{
"username": "ditt_namn",
"score": 10
}

**Svar:**
  - `200 OK` – Poäng uppdaterades.

---
### ❓ `/logOut`

#### ✨ `PUT`
**Body:**
{
"username": "ditt_namn"
}

**Svar:**
  - `200 OK` – Poäng uppdaterades.
   - `400 Bad Request` – Användare inte inloggad.



