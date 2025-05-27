
export class CreateUser {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.score = 0;
    this.logedIn = false;
  }
}