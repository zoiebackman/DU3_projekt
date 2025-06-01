import * as GET from "./get.js";
import * as POST from "./post.js";
import * as PUT from "./put.js";

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
      return await GET.getUsers(headersCORS);
    }

    if (url.pathname == "/quizPage/result") {
      return await GET.quizPage_result(headersCORS);
    }

    if (url.pathname == "/currentUser") {
      return await GET.currentUser(headersCORS);
    }
  }

 if (request.method == "POST") {

    if (url.pathname == "/login") {
      return await POST.login(request, headersCORS);
    }

    if (url.pathname == "/createAccount") {
      return await POST.createAccount(request, headersCORS);
    }
  }
  if (request.method == "PUT") {
    if (url.pathname == "/updatedScore") {
      return await PUT.updatedScore(request, headersCORS);
    }

    if (url.pathname == "/logOut") {
      return await PUT.logOut(request, headersCORS);
    }
  }

  return new Response(JSON.stringify({ error: "Not Found" }), {
    status: 404,
    headers: headersCORS,
  });
}

Deno.serve(handler);
