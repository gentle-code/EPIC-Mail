import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/POST Messages', () => {
  it('should return an error if Message field is empty', (done) => {
    const testData = {
      subject: 'Andela Fellowship',
      message: '',
      status: 'sent',
    };
    chai
      .request(app)
      .post('/api/v1/messages')
      .send(testData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('message field cannot be empty');
        done(err);
      });
  });

  it('should create a message if details are valid', (done) => {
    const testData = {
      subject: 'Andela Fellowship',
      message: 'You are requested to have EPIC Values to be admitted into Andela',
      status: 'sent',
    };
    chai
      .request(app)
      .post('/api/v1/messages')
      .send(testData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('subject')
          .eql(testData.subject);
        expect(res.body.data).to.have.property('status');
        done(err);
      });
  });
});


describe('/GET Messages', () => {
  it('should fetch all received emails', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data[0]).to.have.property('subject');
        expect(res.body.data[0]).to.have.property('message');
        expect(res.body.data[0]).to.have.property('status').eql('read' || 'unread');
        done(err);
      });
  });

  it('should fetch all unread received emails', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages/unread')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data[0]).to.have.property('subject');
        expect(res.body.data[0]).to.have.property('message');
        expect(res.body.data[0]).to.have.property('status').eql('unread');
        done(err);
      });
  });

  it('should fetch all sent emails', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages/sent')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data[0]).to.have.property('subject');
        expect(res.body.data[0]).to.have.property('message');
        expect(res.body.data[0]).to.have.property('status')
          .eql('sent');
        done(err);
      });
  });

  it('should return an error if id is invalid', (done) => {
    const testData = {
      id: 'tweb',
    };
    chai
      .request(app)
      .get(`/api/v1/messages/${testData.id}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('The given id is invalid');
        done(err);
      });
  });

  it('should return an error if message does not exist', (done) => {
    const testData = {
      id: 2342,
    };
    chai
      .request(app)
      .get(`/api/v1/messages/${testData.id}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Message with the given id does not exist');
        done(err);
      });
  });

  it('should fetch a specific email record', (done) => {
    const testData = {
      id: 1,
    };
    chai
      .request(app)
      .get(`/api/v1/messages/${testData.id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('subject');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data).to.have.property('status');
        done(err);
      });
  });
});


describe('/DELETE Messages route', () => {
  it('should return an error if id is invalid', (done) => {
    const testData = {
      id: '1212A@',
    };
    chai
      .request(app)
      .delete(`/api/v1/messages/${testData.id}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('The given id is invalid');
        done(err);
      });
  });

  it('should return an error if message does not exist', (done) => {
    const testData = {
      id: 11232,
    };
    chai
      .request(app)
      .delete(`/api/v1/messages/${testData.id}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Message with the given id does not exist');
        done(err);
      });
  });

  it('should delete a specific email record', (done) => {
    const testData = {
      id: 1,
    };
    chai
      .request(app)
      .delete(`/api/v1/messages/${testData.id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .eql('Message with the given id has been deleted');
        done(err);
      });
  });
});
