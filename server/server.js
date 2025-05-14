async function handler(request) {
    const url = new URL(request.url);

    const headersCORS = new Headers();
    headersCORS.set("Access-Control-Allow-Origin", "*");
    headersCORS.set("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
    headersCORS.set("Access-Control-Allow-Headers", "Content-Type");
    headersCORS.set("Content-Type", "application/json");

    if (request.method == "OPTIONS") {
        return new Response(null, {
            status: 204, headers: headersCORS
        })
    }

    const contentType = request.headers.get("content-type");

    if (contentType !== "application/json" && request.method !== "GET") {
        return new Response(
            JSON.stringify({ error: "Request-Body must be JSON!" }),
            { status: 400, headers: headersCORS }
        );
    }

    if (request.method == "POST") {
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
        if (url.pathname == "/createAccount") {
            const userFile = "user.json";
            const user = Deno.readTextFileSync(userFile);
            const userArray = JSON.parse(user);

            const newUserAccount = await request.json();

            for (let user of userArray) {
                if (user.name == newUserAccount.name) {
                    return new Response(
                        JSON.stringify(
                            { error: "Username already exist" },
                            {
                                status: 409,
                                headers: headersCORS,
                            }
                        )
                    );
                }
                if (user.username != newUserAccount.username) {
                    newUserAccount.score = 0;
                    userArray.push(newUserAccount);

                    Deno.writeTextFileSync(userFile, JSON.stringify(userArray));
                    return new Response(JSON.stringify("account added!"), {
                        status: 200,
                        headers: headersCORS,
                    });
                }
            }
        }
    }
    return new Response(
        JSON.stringify({ error: "Not Found" }),
        { status: 404, headers: headersCORS });
}

Deno.serve(handler);