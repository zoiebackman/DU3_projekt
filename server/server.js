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
}
Deno.serve(handler);
