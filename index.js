
var mysql = require('mysql');
var express = require('express'),
app = express(),
port = process.env.PORT || 3000;
app.listen(port)
console.log('todo list RESTful API server started on: ' + port);

var con = mysql.createConnection({
    host: "localhost",
    user: "foo",
    password: "bar"
    });
   
app.get('/', function(req, res){
    res.send("Please use the API endpoints, try api/getusers");
})

users = require ('./models/user');

app.get('/api/getusers', function(req, res){
    
    con.query("SELECT * FROM GEE_DB.Users", function (err, res) {
            
        if(err) {
            console.log("error: ", err);
                }
        else{
            return res.send({ error: false, data: results, message: 'users list.' });
        }
    })     
})


app.listen(3001);

console.log("Running on 3001");

con.connect(function(err) {
        if (err) throw err;
    });
   

module.exports = con;

con.query("SELECT * FROM GEE_DB.Users", function (err, res) {
            
    if(err) {
        console.log("error: ", err);
            }
    else{
        console.log(res);
    }
        })     