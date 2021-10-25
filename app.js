const express=require("express");
const app=express();
const mysql=require("mysql")
const bodyParser = require('body-parser')



app.use(express.json());
app.use(express.urlencoded({extended:true}))

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())

//create connection
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodesql'
});

//connection

db.connect(function(err){
    if(err){
        console.log(err)
        throw err;
    }
    console.log("connected")

})
app.get("/createdb",function(req,res){
    let sql= 'CREATE DATABASE nodesql' ;
    db.query(sql,function(err,result){
        if(err) {
            console.log(err)
            throw err
        }
        console.log(result)
        res.send('CONNECTED')

    })

})
app.get("/createtable",function(req,res){
    let sql=' CREATE TABLE posts (id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql,function(err,result){
if(err)throw err
console.log(result);
res.send("table craeted")
    })
})

app.get("/addpost",function(req,res){

    console.log("==========",req.body.title)
    let post={title:req.body.title,body:req.body.body}
    let sql='INSERT INTO posts SET?';
    let query=db.query(sql,post,function(err,result){
        if(err)throw err
        console.log(result);
        res.send("data inserted")

    })
})
app.get("/allpost",function(req,res){
    let sql='SELECT * FROM posts';
    db.query(sql,function(err,result){
        if(err)throw err
        console.log(result);
        res.json({data:result})

    })

})

app.get("/postById/:id",function(req,res){
    let sql=`SELECT * FROM posts WHERE id=${req.params.id}`;
    db.query(sql,function(err,result){
        if(err)throw err
        console.log(result)
        res.json({data:result})

    })
})

//UPDATE BY ID
app.get("/updateById/:id",function(req,res){
    let title="modufy title";
    let sql=`UPDATE posts SET title= '${title}' WHERE id=${req.params.id}`;
    db.query(sql,function(err,result){
        if(err) throw err
        console.log(result);
        res.json({data:result})
    })
})

//DELETE BY ID
app.get("/deleteById/:id",function(req,res){
    let sql=`DELETE FROM posts WHERE id=${req.params.id}`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log(result)
        res.json({data:result})

    })
})
app.listen(3000
    
    
    ,function(){
    console.log("server is listening")
})