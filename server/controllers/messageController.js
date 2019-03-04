import uuid from 'uuid/v4';
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
}

export default MessageController;
