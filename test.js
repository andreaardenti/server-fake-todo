var assert = require('assert');
const request = require('supertest');
const app = require('./app');

describe('Test read api', function(){
    it('Sto testando la lettura degli utenti', function(done){
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.body.length, 0);
                done(); 
            });
    });

    it('Sto testando il count', function(done){
        request(app)
            .get('/users/count')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(typeof res.body, 'number');
                done(); 
            });
    })

    it('Sto aggiungendo gli utenti', function(done){
        request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .send({name: 'Carlo', surname: 'Leonardi'})
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done(); 
            });
    })
})