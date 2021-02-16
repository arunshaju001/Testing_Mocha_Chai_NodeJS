const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
var db;
const mongourl = 'mongodb://127.0.0.1:27017/'
const col_name = 'MovieTest';

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

MongoClient.connect(mongourl,{ useUnifiedTopology: true },(err,client) => {
    if(err) throw err;
    db = client.db('Tests')
    app.listen(port, ()=> {
        console.log(`Server running on port ${port}`)
    })
})

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to API Testing</h1>')
});

app.get('/movies',(req,res) => {
    db.collection(col_name).find().toArray( async (err,result) => {
        if(err) throw err;
        else{
            res.status(200).send(result)
        }
})
})

app.get('/movie/:name',(req,res) => {
    db.collection(col_name).findOne({name:req.params.name}, (err,result) => {
        if(result == null || err){
            res.status(500).send()
        } 
        else{
            res.status(200).send(result)
        }
})
})

app.post('/movie',(req,res) => {
    
    var newmovie = {
        name : req.body.name,
        language : req.body.language,
        rate : req.body.rate ,
        type : req.body.type,
        imageUrl : req.body.imageUrl 
      }
     db.collection(col_name).insertOne(newmovie, (err,result) => {
            if(err){ 
                if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate username
                    return res.status(422).send();
                  }
                throw err;
            }
            res.status(200).send(result)
        })
        
})

app.put('/movie',(req,res) => {
    
    var newmovie = {
        name : req.body.name,
        language : req.body.language,
        rate : req.body.rate ,
        type : req.body.type,
        imageUrl : req.body.imageUrl 
      }
     db.collection(col_name).findOne({name:req.body.name},(err,result) => {
        if(result == null || err){ 
            return res.status(500).send()
        }
        else{
            db.collection(col_name).findOneAndUpdate({name:req.body.name},{$set :newmovie},(err,result) => {
                if(result == null || err){ 
                    res.status(500).send()
                    throw err;
                }
                res.status(200).send(result)
                })
        }
        })
})

app.delete('/movie/:name',(req,res) => {
    db.collection(col_name).deleteOne({name:req.params.name}, (err,result) => {
        
        if(result == null || err){
            res.status(500).send()
        } 
        else{
            res.status(200).send(result)
        }
})
})
