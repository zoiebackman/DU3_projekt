async function handler() {
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

  if (contentType !== "application/json" && request.method !== "GET"){
    return new Response (
      JSON.stringify({ error: "Request-Body must be JSON!" }),
      { status: 400, headers: headersCORS}
    );
  } 


  if (request.method == "GET") {
    if (url.pathname == "/login") {
    

    if (request.method == "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: headersCORS,
        });
    }

    if (request.method == "GET") {
        if (url.pathname == "/login") {

        }

        if (url.pathname == "/createAccount") {
        }

        if (url.pathname == "/homePage") {

        }

        if (url.pathname == "/homePage/Search?quiz=X") {

        }

        if (url.pathname == "/quizPage") {

        }
    }

    if (request.method == "POST") {
        if (url.pathname == "/login") {
        }

        if (url.pathname == "/createAccount") {
        }

        i
    }
}
Deno.serve(handler);
