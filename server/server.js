async function handler(request) {
  const url = new URL(request.url);

  const headersCORS = new Headers();
  headersCORS.set("Access-Control-Allow-Origin", "*");
  headersCORS.set("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
  headersCORS.set("Access-Control-Allow-Headers", "Content-Type");
  headersCORS.set("Content-Type", "application/json");

  if (request.method == "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: headersCORS,
    });
  }

  const contentType = request.headers.get("content-type");

  if (contentType !== "application/json" && request.method !== "GET") {
    return new Response(
      JSON.stringify({ error: "Request-Body must be JSON!" }),
      { status: 400, headers: headersCORS }
    );
  }

  //Hämta array med användare
  if (request.method == "GET") {
    if (url.pathname == "/getUsers") {
      const userFile = "user.json";
      const user = Deno.readTextFileSync(userFile);
      const userArray = JSON.parse(user);

      return new Response(JSON.stringify(userArray), {
        status: 200,
        headers: headersCORS,
      });
    }

    if (url.pathname == "/homePage/search") {
      const rightQuizArray = [];
      const searchQuiz = url.searchParams.get("quiz");
      const file = "quiz.json";
      const quizdata = Deno.readTextFileSync(file);
      const quizArray = JSON.parse(quizdata);

      if (!searchQuiz) {
        return new Response(JSON.stringify({ error: "Empty searchfield!" }), {
          status: 400,
          headers: headersCORS,
        });
      }
      for (let quiz of quizArray) {
        if (quiz.category.includes(searchQuiz)) {
          rightQuizArray.push(quiz);
          console.log(rightQuizArray);
        }
      }
      return new Response(JSON.stringify(rightQuizArray), {
        status: 200,
        headers: headersCORS,
      });
    }

    if (url.pathname == "/quizPage") {
      const userFile = "quiz.json";
      const quiz = Deno.readTextFileSync(userFile);
      // byt till json-data som hämtas från api
      // bör stå const quiz = await request.json()
      const quizArray = JSON.parse(quiz);
      return new Response(JSON.stringify(quizArray), {
        status: 200,
        headers: headersCORS,
      });
    }

    if (url.pathname == "/quizPage/result") {
      console.log("inne");
      const userFile = "user.json";
      const users = Deno.readTextFileSync(userFile);
      const userArray = JSON.parse(users);

      const highScoreArray = userArray.sort((a, b) => {
        return b.score - a.score;
      });

      return new Response(JSON.stringify(highScoreArray), {
        status: 200,
        headers: headersCORS,
      });
    }
  }

  if (request.method == "POST") {
    //logga in
    if (url.pathname == "/login") {
      const userFile = "user.json";
      const user = Deno.readTextFileSync(userFile);
      const userArray = JSON.parse(user);

      const userAccount = await request.json();
      let userFound = false;

      for (let user of userArray) {
        if (
          user.username == userAccount.username &&
          user.password == userAccount.password
        ) {
          userFound = true;
          break;
        }
      }
      if (userFound) {
        return new Response(JSON.stringify({ message: "Login successful!" }), {
          status: 200,
          headers: headersCORS,
        });
      } else {
        return new Response(
          JSON.stringify({ error: "Wrong username OR password" }),
          { status: 400, headers: headersCORS }
        );
      }
    }

    // Skapa Konto
    if (url.pathname == "/createAccount") {
      const userFile = "user.json";
      const user = Deno.readTextFileSync(userFile);
      const userArray = JSON.parse(user);

      const newUserAccount = await request.json();

      for (let user of userArray) {
        if (user.username == newUserAccount.username) {
          return new Response(JSON.stringify({ error: "User already exist" }), {
            status: 409,
            headers: headersCORS,
          });
        }
      }

      if (newUserAccount.username == "" || newUserAccount.password == "") {
        //Ifall ett av inmatningsfältet är en tom sträng
        return new Response(
          JSON.stringify({ error: "Missing Username or Password" }),
          { status: 400, headers: headersCORS }
        );
      }

      newUserAccount.score = 0;
      userArray.push(newUserAccount);

      Deno.writeTextFileSync(userFile, JSON.stringify(userArray));
      return new Response(JSON.stringify("account added!"), {
        status: 200,
        headers: headersCORS,
      });
    }
  }

  return new Response(JSON.stringify({ error: "Not Found" }), {
    status: 404,
    headers: headersCORS,
  });
}

Deno.serve(handler);
