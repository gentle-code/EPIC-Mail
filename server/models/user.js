import uuid from 'uuid/v4';
// eslint-disable-next-line import/no-cycle
import Helper from '../helpers/helper';

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

  findUser(email) {
    return this.users.find(user => user.email === email);
  }

  userLogin(data) {
    const foundUser = this.findUser(data.email);
    const token = Helper.Tokengenerate(foundUser.id);
    return { token, foundUser };
  }
}


export default new User();
