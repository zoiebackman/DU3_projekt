async function handler() {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Content-Type", "application/json");

  if (request.method == "OPTIONS") {
    return new Response(null, { headers: headers });
  }

  if (request.method == "GET") {
  }

  if (request.method == "POST") {
  }

  return new Response(JSON.stringify("Felaktig endpoint!"), {
    status: 400,
    headers: headers,
  });
}
Deno.serve(handler);
