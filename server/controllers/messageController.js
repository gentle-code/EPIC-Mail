import uuid from 'uuid/v4';
import messages from '../models/messages';
import { messageValidation } from '../helpers/validatemessage';

// MessageController

class MessageController {
  // Create a new message

  static createMessage(req, res) {
    const { error } = messageValidation(req.body);
    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }
    const newMessage = {
      messageId: uuid(),
      createdOn: new Date(),
      subject: req.body.subject || '',
      message: req.body.message || '',
      parentMessageId: req.body.parentMessageId || 0,
      status: req.body.status || '',
    };
    return res.send(({
      status: 201,
      data: [newMessage],
    }));
  }

  static getMessages(req, res) {
    const receivedMessages = messages.getAllMessages();
    if (receivedMessages.length === 0) {
      return res.send(({
        status: 404,
        error: 'No messages Found',
      }));
    }
    return res.send(({
      status: 201,
      data: [receivedMessages],
    }));
  }
}

export default MessageController;
