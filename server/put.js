export async function updatedScore(request, header) {
  const userFile = "user.json";
  const user = await Deno.readTextFile(userFile);
  const userArray = JSON.parse(user);
  const activeUser = await request.json();
  for (let i = 0; i < userArray.length; i++) {
    if (userArray[i].username == activeUser.username) {
      userArray.splice([i], 1);
      userArray.push(activeUser);
    }
  }
  await Deno.writeTextFile(userFile, JSON.stringify(userArray));
  return new Response(
    JSON.stringify(
      { message: "Score updated" },
      { status: 200, headers: header }
    )
  );
}

export async function logOut(request, header) {
  const userFile = "user.json";
  const user = await Deno.readTextFile(userFile);
  const userArray = JSON.parse(user);
  const logoutUser = await request.json();

  for (let user of userArray) {
    if (user.username == logoutUser.username) {
      user.logedIn = false;
      Deno.writeTextFileSync(userFile, JSON.stringify(userArray, null, 2));
      return new Response(JSON.stringify({ message: "Logout successful" }), {
        status: 200,
        headers: header,
      });
    }
  }
  return new Response(JSON.stringify({ error: "User not logged in" }), {
    status: 400,
    headers: header,
  })
}
