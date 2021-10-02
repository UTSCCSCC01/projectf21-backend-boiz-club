const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiThings = require('chai-things');
const server = 'http://localhost:8080';
const should = chai.should();
const constants = require('../constants');
const ApiPrefix=constants.ApiPrefix;
chai.use(chaiHttp);
chai.use(chaiThings);


describe('Create User Test', () => {
  it('Should return a 400 status due to bad email', (done) => {
    const badUser = {
      email: 'not an email',
      username: 'test123',
      password: '1954',
    };
    const error = {
      'value': '@not an email',
      'msg': 'Please enter a valid email address',
      'param': 'email',
      'location': 'body',
    };
    chai.request(server)
        .post(ApiPrefix+'/users')
        .send(badUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Bad request');
          res.body.errors.should.be.a('array');
          res.body.errors.should.include.something.that.deep.equals(error);
          done();
        });
  });
  it('Should return a 400 status due to repeated email', (done) => {
    const badUser = {
      email: 'newuser@gmail.com',
      username: 'test123',
      password: '1954',
    };
    const error = {
      'value': badUser.email,
      'msg': 'Email already in use',
      'param': 'email',
      'location': 'body',
    };
    chai.request(server)
        .post(ApiPrefix+'/users')
        .send(badUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Bad request');
          res.body.errors.should.be.a('array');
          res.body.errors.should.include.something.that.deep.equals(error);
          done();
        });
  });
  it('Should return a 400 status due to bad username', (done) => {
    const badUser = {
      email: 'newemail@gmail.com',
      username: 'test@123',
      password: '1954',
    };
    const error = {
      'value': badUser.username,
      'msg': 'Username must be alphanumeric',
      'param': 'username',
      'location': 'body',
    };
    chai.request(server)
        .post(ApiPrefix+'/users')
        .send(badUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Bad request');
          res.body.errors.should.be.a('array');
          res.body.errors.should.include.something.that.deep.equals(error);
          done();
        });
  });
  it('Should return a 400 status due to repeated username', (done) => {
    const badUser = {
      email: 'newemail@gmail.com',
      username: 'test',
      password: '1954',
    };
    const error = {
      'value': badUser.username,
      'msg': 'Username already in use',
      'param': 'username',
      'location': 'body',
    };
    chai.request(server)
        .post(ApiPrefix+'/users')
        .send(badUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Bad request');
          res.body.errors.should.be.a('array');
          res.body.errors.should.include.something.that.deep.equals(error);
          done();
        });
  });
    it('Should return a 200 status and create new user (Clean up database after running this command)', (done) => {
    const user = {
      email: 'newemail@gmail.com',
      username: 'tester',
      password: 'test',
    };
    chai.request(server)
        .post(ApiPrefix+'/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
  });
});
