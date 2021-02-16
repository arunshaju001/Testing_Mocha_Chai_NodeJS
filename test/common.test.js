let chai = require('chai');
let chaiHttp  = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing Rest-API', () => {

    // GET Testing
    it('1 should  return status 200 for home page /',function(done){
        chai
            .request('http://localhost:3000')
            .get('/')
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                done(err)
            })
    });
    it('2 should  return status 200 for all /movies',function(done){
        chai
            .request('http://localhost:3000')
            .get('/movies')
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                done(err)
            })
    })
    it('3 should return the status 404 for non existing path', function(done){
        chai
            .request('http://localhost:3000')
            .get('/something')
            .then(function(res){
                expect(res).to.have.status(404);
                done();
            })
            .catch(function(err){
                done(err);
            });
    });
    before(function() {
        chai
            .request('http://localhost:3000')
            .post('/movie')
            .send({
                "name" : "Avengers",
                "language" : "English",
                "rate" : 5,
                "type" : "Action",
                "imageUrl" :  "https://image.ibb.co/f0hhZc/bp.jpg"
            })
            .then(function(res){
                done();
            })
            .catch(function(err){
                done(err)
            })

    });
    it('4 should  return status 200 for existing /movie/moviename',function(done){
        chai
            .request('http://localhost:3000')
            .get('/movie/Avengers')
            .then(function(res){
                expect(res).to.have.status(200);                
                done();
            })
            .catch(function(err){
                done(err)
            })
    })
    after(function() {
        chai
            .request('http://localhost:3000')
            .delete('/movie/Avengers')
            .then(function(res){
                done();
            })
            .catch(function(err){
                done(err)
            })

    });
    it('5 should  return status 500 for nonexisting /movie/moviename',function(done){
        chai
            .request('http://localhost:3000')
            .get('/movie/NoMovieLikeThis')
            .then(function(res){
                expect(res).to.have.status(500);                
                done();
            })
            .catch(function(err){
                done(err)
            })
    })


    // POST Testing
    it('6 should  return status 200 for creating new /movie',function(done){
        chai
            .request('http://localhost:3000')
            .post('/movie')
            .send({
                "name" : "theverynewname",
                "language" : "English",
                "rate" : 5,
                "type" : "Action",
                "imageUrl" :  "https://image.ibb.co/f0hhZc/bp.jpg"
            })
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                done(err)
            })
    })
    after(function() {
        chai
            .request('http://localhost:3000')
            .delete('/movie/theverynewname')
            .then(function(res){
                done();
            })
            .catch(function(err){
                done(err)
            })

    });
    before(function() {
        chai
            .request('http://localhost:3000')
            .post('/movie')
            .send({
                "name" : "uniquename",
                "language" : "English",
                "rate" : 5,
                "type" : "Action",
                "imageUrl" :  "https://image.ibb.co/f0hhZc/bp.jpg"
            })
            .then(function(res){
                done();
            })
            .catch(function(err){
                done(err)
            })

    });
    it('7 should  return status 500 for creating an existing /movie',function(done){
        chai
            .request('http://localhost:3000')
            .post('/movie')
            .send({
                "name" : "uniquename",  
                "language" : "English",
                "rate" : 5,
                "type" : "Action",
                "imageUrl" :  "https://image.ibb.co/f0hhZc/bp.jpg"
            })
            .then(function(res){
                expect(res).to.have.status(422);
                done();
            })
            .catch(function(err){
                done(err)
            })
    })
    after(function() {
        chai
            .request('http://localhost:3000')
            .delete('/movie/uniquename')
            .then(function(res){
                done();
            })
            .catch(function(err){
                done(err)
            })

    });



    // PUT Testing
    before(function() {
        chai
            .request('http://localhost:3000')
            .post('/movie')
            .send({
                "name" : "newname",
                "language" : "Hindi",
                "rate" : 0,
                "type" : "Action",
                "imageUrl" :  "https://image.ibb.co/f0hhZc/bp.jpg"
            })
            .catch(function(err){
                throw(err)
            })

    });
    it('8 should  return status 200 for updating /movie',function(done){
        chai
            .request('http://localhost:3000')
            .put('/movie')
            .send({
                "name" : "newname",
                "language" : "English",
                "rate" : 5,
                "type" : "Action",
                "imageUrl" :  "https://image.ibb.co/f0hhZc/bp.jpg"
            })
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                throw(err)
            })
    })
    after(function() {
        chai
            .request('http://localhost:3000')
            .delete('/movie/newname')
            .catch(function(err){
                throw(err)
            })

    });
    it('9 should  return status 500 for updating non existing /movie',function(done){
        chai
            .request('http://localhost:3000')
            .put('/movie')
            .send({
                "name" : "NonExistingMovieoftheYear",
                "language" : "English",
                "rate" : 5,
                "type" : "Action",
                "imageUrl" :  "https://image.ibb.co/f0hhZc/bp.jpg"
            })
            .then(function(res){
                expect(res).to.have.status(500);
                done();
            })
            .catch(function(err){
                done(err)
            })
    })

    // DELETE Testing
    before(function() {
        chai
            .request('http://localhost:3000')
            .post('/movie')
            .send({
                "name" : "Movietobedeleted",
                "language" : "Hindi",
                "rate" : 0,
                "type" : "Action",
                "imageUrl" :  "https://image.ibb.co/f0hhZc/bp.jpg"
            })
            .catch(function(err){
                throw(err)
            })

    });
    it('10 should  return status 200 for deleteing existing /movie/moviename',function(done){
        chai
            .request('http://localhost:3000')
            .delete('/movie/Movietobedeleted')
            .then(function(res){
                expect(res).to.have.status(200);                
                done();
            })
            .catch(function(err){
                done(err)
            })
    })
    it('11 should  return status 500 for deleteing non existing /movie/moviename',function(done){
        chai
            .request('http://localhost:3000')
            .delete('/movie/Movietobedeleted')
            .then(function(res){
                expect(res).to.have.status(200);                
                done();
            })
            .catch(function(err){
                done(err)
            })
    })
    


})