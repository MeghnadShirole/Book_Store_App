import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

import fs from 'fs';

import app from '../../src/index.js';

describe('User APIs Test', () => {
    before((done) => {
        const clearCollections = () => {
            for (const collection in mongoose.connection.collections) {
                mongoose.connection.collections[collection].deleteOne(() => {});
            }
        };

        const mongooseConnect = async() => {
            await mongoose.connect(process.env.userDATABASE_TEST);
            clearCollections();
        };

        if (mongoose.connection.readyState === 0) {
            mongooseConnect();
        } else {
            clearCollections();
        }

        done();
    });

    const jsonFileUser = fs.readFileSync('tests/integration/user.json')
    const userData = JSON.parse(jsonFileUser);
    let token = '';

    //register user test
    describe('POST /adminRegistration', () => {
        it('given new user when added should return status 201', (done) => {
            request(app)
                .post('/api/v1/users/adminRegistration')
                .send(userData.validAdminRegistration)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
                    done();
                });
        });

        it('given user when not registered should return status 500', (done) => {
            request(app)
                .post('/api/v1/users/adminRegistration')
                .send(userData.invalidAdminRegistration)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
                    done();
                });
        });

        it('given user when provides empty details should return status 500', (done) => {
            request(app)
                .post('/api/v1/users/adminRegistration')
                .send(userData.emptyAdminRegistration)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
                    done();
                });
        });
    });

    describe('POST /userRegistration', () => {
        it('given new user when added should return status 201', (done) => {
            request(app)
                .post('/api/v1/users/userRegistration')
                .send(userData.validUserRegistration)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
                    done();
                });
        });

        it('given user when not registered should return status 500', (done) => {
            request(app)
                .post('/api/v1/users/userRegistration')
                .send(userData.invalidUserRegistration)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
                    done();
                });
        });

        it('given user when provides empty details should return status 500', (done) => {
            request(app)
                .post('/api/v1/users/userRegistration')
                .send(userData.emptyUserRegistration)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
                    done();
                });
        });
    });

    // user login test
    describe('POST /adminLogin', () => {
        it('given user when logged in should return status 200', (done) => {
            request(app)
                .post('/api/v1/users/adminLogin')
                .send(userData.validAdminLogin)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.OK);
                    expect(res.body.data).to.be.not.null;
                    done();
                });
        });

        it('given user when denied login should return status 401', (done) => {
            request(app)
                .post('/api/v1/users/adminLogin')
                .send(userData.invalidAdminLogin)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);
                    done();
                });
        });

        it('given user when not found in database should return status 404', (done) => {
            request(app)
                .post('/api/v1/users/adminLogin')
                .send(userData.invalidLogin)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.NOT_FOUND);
                    done();
                });
        });
    });

    describe('POST /userLogin', () => {
        it('given user when logged in should return status 200', (done) => {
            request(app)
                .post('/api/v1/users/userLogin')
                .send(userData.validUserLogin)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.OK);
                    expect(res.body.data).to.be.not.null;
                    done();
                });
        });

        it('given user when denied login should return status 401', (done) => {
            request(app)
                .post('/api/v1/users/userLogin')
                .send(userData.invalidUserLogin)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);
                    done();
                });
        });

        it('given user when not found in database should return status 404', (done) => {
            request(app)
                .post('/api/v1/users/userLogin')
                .send(userData.invalidLogin)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.NOT_FOUND);
                    done();
                });
        });
    });

    // forget password test
    describe('POST /forgerPassword', () => {
        it('given user when provides valid email should get mail should return status 200', (done) => {
            request(app)
                .post('/api/v1/users/forgetPassword')
                .send(userData.forgetPassword)
                .end((err, res) => {
                    token = res.body.data;
                    expect(res.statusCode).to.be.equal(HttpStatus.OK);
                    expect(err).to.not.exist;
                    done();
                });
        });

        it('given user when provides invalid email should return status 500', (done) => {
            request(app)
                .post('/api/v1/users/forgetPassword')
                .send(userData.invalidEmail)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
                    done();
                });
        });
    });

    // reset password test
    describe('POST /resetPassword', () => {
        it('given user when able to reset password should return status 202', (done) => {
            request(app)
                .post('/api/v1/users/resetPassword/' + `${token}`)
                .send(userData.validPassword)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
                    done();
                });
        });

        it('given user when not able to reset password should return status 500', (done) => {
            request(app)
                .post('/api/v1/users/resetPassword/' + `${token}`)
                .send(userData.invalidPassword)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
                    done();
                });
        });
    });
});