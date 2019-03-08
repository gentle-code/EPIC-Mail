import uuid from 'uuid/v4';

class User {
  constructor() {
    this.users = [];
  }

  createUser(data) {
    const newUser = {
      id: uuid(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    };
    this.users.push(newUser);
    return newUser;
  }
}


export default new User();
