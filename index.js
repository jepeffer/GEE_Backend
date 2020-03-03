
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
    res.send("Hello World");
})

app.listen(3000);

console.log("Running on 3000");

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