class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.score = 0;
    this.logedIn = false;
  }
}

async function handler(request) {
  const url = new URL(request.url);

  const headersCORS = new Headers();
  headersCORS.set("Access-Control-Allow-Origin", "*");
  headersCORS.set(
    "Access-Control-Allow-Methods",
    "POST, GET, DELETE, PUT, OPTIONS"
  );
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

  if (request.method == "GET") {
    if (url.pathname == "/getUsers") {
      const userFile = "testUser.json";
      const user = Deno.readTextFileSync(userFile);
      const userArray = JSON.parse(user);

      return new Response(JSON.stringify(userArray), {
        status: 200,
        headers: headersCORS,
      });
    }

    if (url.pathname == "/quizPage/result") {
      console.log("result");
      const userFile = "testUser.json";
      const users = Deno.readTextFileSync(userFile);
      const userArray = JSON.parse(users);

      const highScoreArray = userArray.sort((a, b) => {
        return b.score - a.score;
      });

      const topFiveHighScoreArray = highScoreArray.slice(0, 5);

      return new Response(JSON.stringify(topFiveHighScoreArray), {
        status: 200,
        headers: headersCORS,
      });
    }
  }

  if (request.method == "POST") {
    if (url.pathname == "/login") {
      const userFile = "testUser.json";
      const user = Deno.readTextFileSync(userFile);
      const userArray = JSON.parse(user);

      const userAccount = await request.json();
      let userFound = false;
      let rightUser;

      for (let user of userArray) {
        if (
          user.username == userAccount.username &&
          user.password == userAccount.password
        ) {
          rightUser = user;
          userFound = true;
          user.logedIn = true;
          break;
        }
      }
      if (userFound) {
        Deno.writeTextFileSync(userFile, JSON.stringify(userArray, null, 2));
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

    if (url.pathname == "/createAccount") {
      const userFile = "testUser.json";
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

      let newUser = new User(newUserAccount.username, newUserAccount.password);

      userArray.push(newUser);

      Deno.writeTextFileSync(userFile, JSON.stringify(userArray));
      return new Response(JSON.stringify("account added!"), {
        status: 200,
        headers: headersCORS,
      });
    }
  }

  if (request.method == "PUT") {
    if (url.pathname == "/updatedScore") {
      const userFile = "testUser.json";
      const user = Deno.readTextFileSync(userFile);
      const userArray = JSON.parse(user);
      const activeUser = await request.json();
      for (let i = 0; i < userArray.length; i++) {
        if (userArray[i].username == activeUser.username) {
          userArray.splice([i], 1);
          userArray.push(activeUser);
        }
      }
      Deno.writeTextFileSync(userFile, JSON.stringify(userArray));
      return new Response(JSON.stringify({ message: "Score updated" }), {
        status: 200,
        headers: headersCORS,
      });
    }

    if (url.pathname == "/logOut") {
      const userFile = "testUser.json";
      const user = Deno.readTextFileSync(userFile);
      const userArray = JSON.parse(user);
      const logoutUser = await request.json();

      for (let user of userArray) {
        if (user.username == logoutUser.username) {
          user.logedIn = false;
          Deno.writeTextFileSync(userFile, JSON.stringify(userArray, null, 2));
          return new Response(
            JSON.stringify({ message: "Logout successful" }),
            {
              status: 200,
              headers: headersCORS,
            }
          );
        }
      }
    }
  }

  if (request.method == "GET" && url.pathname == "/currentUser") {
    const userFile = "testUser.json";
    const user = Deno.readTextFileSync(userFile);
    const userArray = JSON.parse(user);
    for (let user of userArray) {
      if (user.logedIn === true) {
        return new Response(JSON.stringify({ user }), {
          status: 200,
          headers: headersCORS,
        });
      }
    }
    return new Response(JSON.stringify({ error: "No user logged in" }), {
      status: 404,
      headers: headersCORS,
    });
  }
  return new Response(JSON.stringify({ error: "Not Found" }), {
    status: 404,
    headers: headersCORS,
  });
}

Deno.serve(handler);
