export async function getUsers(header) {
  const userFile = "user.json";
  const user = await Deno.readTextFile(userFile);
  const userArray = JSON.parse(user);

  return new Response(JSON.stringify(userArray), {
    status: 200,
    headers: header,
  });
}
export async function quizPage_result(header) {
  const userFile = "user.json";
  const users = await Deno.readTextFile(userFile);
  const userArray = JSON.parse(users);

  const highScoreArray = userArray.sort((a, b) => {
    return b.score - a.score;
  });

  const topFiveHighScoreArray = highScoreArray.slice(0, 5);

  return new Response(JSON.stringify(topFiveHighScoreArray), {
    status: 200,
    headers: header,
  });
}

export async function currentUser(header) {
  const userFile = "user.json";
  const user = await Deno.readTextFile(userFile);
  const userArray = JSON.parse(user);
  for (let user of userArray) {
    if (user.logedIn === true) {
      return new Response(JSON.stringify({ user }), {
        status: 200,
        headers: header,
      });
    }
  }
  return new Response(JSON.stringify({ error: "No user logged in" }), {
    status: 404,
    headers: header,
  });
}
