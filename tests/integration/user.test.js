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
});