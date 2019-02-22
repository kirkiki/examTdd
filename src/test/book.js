import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiNock from 'chai-nock';
import chaiAsPromised from 'chai-as-promised';
import path from 'path';
import nock from 'nock';

import server from '../server';
import resetDatabase from '../utils/resetDatabase';

chai.use(chaiHttp);
chai.use(chaiNock);
chai.use(chaiAsPromised);


describe('Test intégration (Empty database)', () => {
    beforeEach(() => {
        const pathBook = path.resolve('../data/books.json');
            resetDatabase(path.join(__dirname, '../data/books.json'), {"books": []})
    });

    it('get books as array of length 0', function(done) {
        chai.request('http://localhost:8081')
        .get('/book')
        .end(function(err, res) {
            expect(res.body).is.a('Object');
            expect(res).to.have.status(200);
            expect(res.body.books).to.be.a('array');
            expect(res.body.books).to.have.lengthOf(0)
            done();                               
        });
    });
    it('post books', function(done) {
        chai.request('http://localhost:8081')
        .post('/book')
        .send({
                'title': 'Coco raconte Channel 2',
                'years': 1990,
                'pages': 400
            })
        .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body.message).to.contains('book successfully added')
            done();                               
        });
    });
});
var obj = {"books": [{"id":"0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9","title":"Coco raconte Channel 2","years":1990,"pages":400}]}


describe('Test intégration2 (Empty database)', () => {
    beforeEach(() => {
        const pathBook = path.resolve('../data/books.json');
            resetDatabase(path.join(__dirname, '../data/books.json'), obj)
    });

    it('get books', function(done) {
        chai.request('http://localhost:8081')
        .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
        .end((err, res) => {
            if (err) console.log(err)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body.message).to.equal('book fetched')
                expect(res.body.book.title).to.be.a('string')
                expect(res.body.book.title).to.equal("Coco raconte Channel 2")
                expect(res.body.book.years).to.be.a('number')
                expect(res.body.book.years).to.equal(1990)
                expect(res.body.book.pages).to.be.a('number')
                expect(res.body.book.pages).to.equal(400)
                done()
        })
    });

    it('put books', function(done) {
        chai.request('http://localhost:8081')
        .put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .set('content-type', 'application/x-www-form-urlencoded')
        .send({
            title: 'Coco raconte Channel 42',
            years: 1990,
            pages: 480
        })
        .end((err, res) => {
            if (err) console.log(err)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body.message).to.equal('book successfully updated')
                done()
        })
    });

    it('delete books', function(done) {
        chai.request('http://localhost:8081')
        .delete('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
        .end((err, res) => {
            if (err) console.log(err)
                expect(res).to.have.status(200)
                expect(res.body.message).to.equal('book successfully deleted')
                done()
        })
    });
});

describe('Test intégration2 (Empty database)', () => {

    it('nock tests get', function(done) {
        nock('http://localhost:8081')
        .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
        .reply(200, {"books": []})
        
        chai.request('http://localhost:8081')
        .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
        .end((err, res) => {
            if (err) console.log(err)
                expect(res).to.have.status(200)
                expect(res.body.books).to.be.a('array')
                done()
        })
    });
    it('nock tests post', function(done) {
        nock('http://localhost:8081')
        .post('/book')
        .reply(200, {"message": "book successfully added"})
        
        chai.request('http://localhost:8081')
        .post('/book')
        .send({
                'title': 'Coco raconte Channel 2',
                'years': 1990,
                'pages': 400
            })
        .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body.message).to.contains('book successfully added')
            done();                               
        });
    });
    it('nock tests put', function(done) {
        nock('http://localhost:8081')
        .put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
        .reply(200, {"message": "book successfully updated"})
        
        chai.request('http://localhost:8081')
        .put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
        .end((err, res) => {
            if (err) console.log(err)
                expect(res).to.have.status(200)
                expect(res.body.message).to.contains('book successfully updated')
                done()
        })
    });
    it('nock tests put', function(done) {
        nock('http://localhost:8081')
        .delete('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
        .reply(200, {"message": "book successfully deleted"})
        
        chai.request('http://localhost:8081')
        .delete('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
        .end((err, res) => {
            if (err) console.log(err)
                expect(res).to.have.status(200)
                expect(res.body.message).to.contains('book successfully deleted')
                done()
        })
    });
});



// tout les packages et fonction nescessaire au test sont importé ici, bon courage

// fait les Tests d'integration en premier
