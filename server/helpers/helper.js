import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../models/user';

dotenv.config();

const Helper = {
  Tokengenerate(id) {
    const token = jwt.sign({ userId: id },
      process.env.SECRET, { expiresIn: 86400 });
    return token;
  },

  isRegisteredEmail(email) {
    const regUser = users.findUser(email);
    if (regUser) {
      return true;
    }
    return false;
  },

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },
};


export default Helper;
