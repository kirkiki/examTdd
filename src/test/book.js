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


resetDatabase(path.join(__dirname, '../data/books.json'), {"books": []})
it('get books as array of length 0', function(done) {
    chai.request('http://localhost:8080')
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
    chai.request('http://localhost:8080')
    .post('/book')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body.message).to.contains('book successfully added')
        done();                               
    });
});

// tout les packages et fonction nescessaire au test sont importé ici, bon courage

// fait les Tests d'integration en premier
