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

  if (request.method == "GET") {
  }

  if (request.method == "POST") {
    if (url.pathname == "/login") {
      const userFile = "user.json";
      const user = Deno.readTextFileSync(userFile);
      const userArray = JSON.parse(user);

      const userAccount = await request.json();

      for (let user of userArray) {
        if (
          user.username == userAccount.username &&
          user.password == userAccount.password
        ) {
          return new Response("Login sucess! :)", {
            status: 200,
            headers: headersCORS,
          });
        }
        if (
          user.password != userAccount.password ||
          user.username != userAccount.password
        ) {
          return new Response("Username OR Password incorrect :(", {
            status: 400,
            headers: headersCORS,
          });
        }

        return new Response("Account not Found! :(", {
          status: 409,
          headers: headersCORS,
        });
      }
    }
  }

  return new Response(JSON.stringify({ error: "Not Found" }), {
    status: 404,
    headers: headersCORS,
  });
}

Deno.serve(handler);
