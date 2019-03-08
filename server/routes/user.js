import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.post('/signup', UserController.signUp);

export default router;
