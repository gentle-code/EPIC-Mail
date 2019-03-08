
import uuid from 'uuid/v4';
import users from '../models/user';
import Helper from '../helpers/helper';

class UserController {
  // Create a new user account
  static signUp(req, res) {
    const encryptedPassword = Helper.hashPassword(req.body.password);
    const User = {
      id: uuid(),
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: encryptedPassword,
    };
    const newUser = users.createUser(User);
    const token = Helper.Tokengenerate(newUser.id);

    return res.status(201).json({
      status: 201,
      data: [{
        token,
        message: 'User sign up was succesfull',
      }],
    });
  }

  static signIn(req, res) {
    const request = req.body;
    const loginDetails = users.userLogin(request);
    return res.status(200).json({
      status: 200,
      data: [loginDetails],
    });
  }
}

export default UserController;
