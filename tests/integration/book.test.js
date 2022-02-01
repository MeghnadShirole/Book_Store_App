import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

import fs from 'fs';

import app from '../../src/index.js';

describe('Books APIs Test', () => {

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
});


const jsonFileUser = fs.readFileSync('tests/integration/user.json')
const userData = JSON.parse(jsonFileUser)
let jwtToken = '';

it('given user when logged in should return status 200', (done) => {
    request(app)
        .post('/api/v1/users/adminLogin')
        .send(userData.validAdminLogin)
        .end((err, res) => {
            jwtToken = res.body.data;
            expect(res.statusCode).to.be.equal(HttpStatus.OK);
            expect(res.body.data).to.be.not.null;
            done();
        });
});

const jsonFileBook = fs.readFileSync('tests/integration/book.json')
const bookData = JSON.parse(jsonFileBook);
let invalidToken = '';
let _id = '';

// add book test
describe('POST /addBook', () => {
    it('given new book when added should return status 201', (done) => {
        console.log("in addbook test ====>token==>", `${jwtToken}`);
        request(app)
            .post('/api/v1/books')
            .set('token', `${jwtToken}`)
            .send(bookData.validBook)
            .end((err, res) => {
                _id = res.body.data._id;
                expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
                done();
            });
    });

    it('given user when not authenticated should return status 401', (done) => {
        invalidToken = `${jwtToken}`.slice(12);
        request(app)
            .post('/api/v1/books')
            .set('token', `${invalidToken}`)
            .send(bookData.validBook)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);
                done();
            });
    });

    it('given user when authenticated and not able to add book should return status 500', (done) => {
        request(app)
            .post('/api/v1/books')
            .set('token', `${jwtToken}`)
            .send(bookData.invalidBook)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
                done();
            });
    });
});

//Get all books test
describe('GET /getAllBooks', () => {
    it('given request when books fetched successfully should return status 200', (done) => {
        request(app)
            .get('/api/v1/books')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(HttpStatus.OK);
                done();
            });
    });

    it('given user when not able to fetch books should return status 500', (done) => {
        request(app)
            .get('/api/v1/books')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
                done();
            });
    });
});

//Get single book test
describe('GET /getbook', () => {
    it('given request when book fetched successfully should return status 200', (done) => {
        request(app)
            .get('/api/v1/books/' + `${_id}`)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(HttpStatus.OK);
                done();
            });
    });

    it('given user when not able to fetch a book should return status 500', (done) => {
        request(app)
            .get('/api/v1/books/')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
                done();
            });
    });
});

//update book test
describe('PUT /update', () => {
    it('given user when able to update a book should return status 202', (done) => {
        request(app)
            .put('/api/v1/books/' + `${_id}`)
            .set('token', `${jwtToken}`)
            .send(bookData.validUpdate)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
                done();
            });
    });

    it('given user when not able to update a book should return status 500', (done) => {
        request(app)
            .put('/api/v1/books/' + `${_id}`)
            .set('token', `${jwtToken}`)
            .send(bookData.invalidUpdate)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
                done();
            });
    });
});

//delete book test
describe('DELETE /delete', () => {
    it('given user when able to delete a book should return status 202', (done) => {
        request(app)
            .delete('/api/v1/books/' + `${_id}`)
            .set('token', `${jwtToken}`)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
                done();
            });
    });

    it('given user when not able to delete a book should return status 404', (done) => {
        request(app)
            .delete('/api/v1/books/')
            .set('token', `${jwtToken}`)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(HttpStatus.NOT_FOUND);
                done();
            });
    });
});