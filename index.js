const express = require('express')
const app =express()

const bodyParser = require('body-parser')
// Request Body parsing Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const dbConnection = require('./src/utils/mysql.connector')

const { Post } = require('./src/posts/post.model')
//const post = require('./src/posts/post.model')

//Update existing post

app.patch('/api/v1/posts/:id', function(req, res) {

    //get id, select post from db, update the  post of it exists
    //console.log(req.params)
    const sql2 = `SELECT * FROM posts WHERE id=${req.params.id} LIMIT 1`
    
    return dbConnection.query(sql2, function(err, rows){
        if (err) throw err

        const post = req.body
        console.log(post)

        if (rows.length >= 1){
            
            const updateSql = `UPDATE posts SET name='${post.name}',summary='${post.summary} WHERE id=${rows[0].id}`

            console.log(updateSql)

            return dbConnection.query(updateSql, function(err, result){
                return res.json(result)
            })
        } else {
            return res.status(404).json({
                status: false,
                statusCode: 404,
                message: `post with id ${req.params.id} does not exist` 
            })
        }
        //return res.json(rows)
    })
    
})

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
    
    const { name, imageUrl, summary } = req.body // destructure sent properties from the REQUEST body
    var sql = `INSERT INTO posts (name, imageurl, summary) VALUES ('${name}','${imageUrl}','${summary}')`;

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