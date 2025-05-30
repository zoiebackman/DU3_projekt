import { User } from "./modules/class.js";

export async function login(request, header) {
  const userFile = "user.json";
  const user = await Deno.readTextFile(userFile);
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
      headers: header,
    });
  } else {
    return new Response(
      JSON.stringify({ error: "Wrong username OR password" }),
      { status: 400, headers: header }
    );
  }
}

export async function createAccount(request, header) {
  const userFile = "user.json";
  const user = await Deno.readTextFile(userFile);
  const userArray = JSON.parse(user);

  const newUserAccount = await request.json();

  for (let user of userArray) {
    if (user.username == newUserAccount.username) {
      return new Response(JSON.stringify({ error: "User already exist" }), {
        status: 409,
        headers: header,
      });
    }
  }

  if (newUserAccount.username == "" || newUserAccount.password == "") {
    return new Response(
      JSON.stringify({ error: "Missing Username or Password" }),
      { status: 400, headers: header }
    );
  }

  let newUser = new User(newUserAccount.username, newUserAccount.password);

  userArray.push(newUser);

  Deno.writeTextFileSync(userFile, JSON.stringify(userArray));
  return new Response(JSON.stringify("account added!"), {
    status: 200,
    headers: header,
  });
}
