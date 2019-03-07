import express from 'express';
import MessageController from '../controllers/messageController';

const router = express.Router();

router.post('/', MessageController.createMessage);
router.get('/', MessageController.getMessages);

export default router;
