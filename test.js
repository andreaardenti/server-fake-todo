var assert = require('assert');
const request = require('supertest');
const app = require('./app');

describe('Test todos api', function(){
    it('Sto testando la lettura dei todo', function(done){
        request(app)
            .get('/todos')
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
            .get('/todos/count')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(typeof res.body.count, 'number');
                done(); 
            });
    })

    it('Sto aggiungendo todo', function(done){
        request(app)
            .post('/todos')
            .set('Accept', 'application/json')
            .send({name: 'eat', description: 'eat something', assignedTo: 'tizio', completed: true})
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done(); 
            });
    })

    it('Sto aggiungendo  un secondo todo', function(done){
        request(app)
            .post('/todos')
            .set('Accept', 'application/json')
            .send({name: 'eat', description: 'eat something', assignedTo: 'caio', completed: false})
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done(); 
            });
    })

    it('Sto aggiungendo todo (not present massimo)', function(done){
        request(app)
            .post('/todos')
            .set('Accept', 'application/json')
            .send({name: 'drink', description: 'drink something', assignedTo: 'massimo', completed: true})
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done(); 
            });
    })

    it('Sto testando la lettura dei todo completed', function(done){
        request(app)
            .get('/todos?completed=true')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0].completed, true);
                done(); 
            });
    });

    it('Sto testando la lettura dei todo not completed', function(done){
        request(app)
            .get('/todos?completed=false')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0].completed, false);
                done(); 
            });
    });

    it('Sto testando la lettura dei todo completed', function(done){
        request(app)
            .get('/todos?byUser=tizio')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0].assignedTo, 'tizio');
                done(); 
            });
    });

    it('Sto testando la lettura dei todo completed', function(done){
        request(app)
            .get('/todos?byUser=caio')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0].assignedTo, 'caio');
                done(); 
            });
    });

    it('Sto eliminando un todo', function(done){
        request(app)
            .delete('/todos/0')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                request(app)
                .get('/todos/count')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    assert.equal(typeof res.body.count, 'number');
                    assert.equal(res.body.count, 1);
                    done(); 
                });
            });
    })
})