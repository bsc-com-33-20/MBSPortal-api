const express = require('express')
const app =express()

const bodyParser = require('body-parser')
// Request Body parsing Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const dbConnection = require('./src/utils/mysql.connector')

const { Post } = require('./src/posts/post.model')
//const post = require('./src/posts/post.model')

app.get('/api/v1', function(req, res){
    return res.json(req.headers)
})

app.get('/api/v1/posts', function(req, res){
    var sql1 = "SELECT * FROM posts";
    dbConnection.query(sql1, function (err, result) {
        if (err) throw err;
        console.log(res);
        return res.json(result)
    });
    //return res.json([post])
})

app.post('/api/v1/posts', function(req, res){
    
    const { name, imageurl, summery } = req.body // destructure sent properties from the REQUEST body
    var sql = `INSERT INTO posts (name, imageurl, summery) VALUES ('${name}','${imageurl}','${summery}')`;

    //var sql = "INSERT INTO posts (name,imageurl,summery) VALUES ('Bisiness Inc', 'https://business.com', 'abcdef ghijk' )";
        dbConnection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            return res.json(result)
        });
        return console.log(req.body)
})

/*var sql = "INSERT INTO posts (name,iamgurl,summery) VALUES ('Company Inc', 'https://example.com', 'whaterver there is' )";
        dbConnection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });

*/        
app.listen(3000, function(){
    console.log(' MBS listening on port 3000')

    dbConnection.connect(function(err){
        if (err) throw(err);
        console.log('connected to MySQL')
        
    })
});