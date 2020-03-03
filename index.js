
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
   
con.connect(function(err) {
        if (err) throw err;
    });

module.exports = con;