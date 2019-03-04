import uuid from 'uuid/v4';

class Message {
  constructor() {
    this.messages = [];
  }

  createMessage(data) {
    const neWMessage = {
      messageId: uuid(),
      createdOn: new Date(),
      subject: data.subject,
      message: data.message,
      parentMessageId: data.parentMessageId,
      status: data.status,
    };
    this.messages.push(neWMessage);
    return neWMessage;
  }
}

export default new Message();
