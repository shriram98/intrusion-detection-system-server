const express=require('express')
const app=express()
const port=8080;
const bcrypt=require('bcrypt')
//const session=require('express-session');

var cors=require('cors');
var bodyParser=require('body-parser');



var MongoClient=require('mongodb').MongoClient;             //Mongodb Connection
var url="mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var dbo=db.db("admindb");
    dbo.createCollection("user",function(err,res){
        if(err) throw err;
        console.log("Collection created");
        db.close();
    });
});


app.use(cors());
app.options('*',cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());                 //json converted to object

app.get('/',function(req,res){
    connection.query('select 1+1 AS Solution',function(err,result,fields){
        if (err) throw err;
        console.log("Solution is " + result[0].Solution);
    })
    res.send('hello');
})
app.post('/signup',function(req,res){
    var responseData=req.body;
    var username=responseData.email;
    var password=responseData.password;

    var data={
        "email":email,
        "password":password
    }

    db.collection('userdetails').insertOne(data,function(err,collection){
        if (err) throw err;
        console.log("Record inserted successfully");
    });
})
    app.get('/',function(req,res){
        res.set({'Access-control-Allow-Origin': '*'});
    }).listen(8000)
    console.log("server listening on port 8000");