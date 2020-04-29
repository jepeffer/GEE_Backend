
var mysql = require('mysql');
const cors = require('cors');
const db = require('./USER-DB');
var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var multer = require('multer');
var DIR = '/root/Resources';
var upload = multer({dest: DIR});
var port = 3002;

app = express();


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://valor-software.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

// No file bombs here
app.use(bodyParser.json({
    limit: '20mb'
    }));

app.get('/api', function (req, res) {
        res.end('file catcher example');
      });
       
app.post('/api/upload',upload.single('file'), function (req, res) {
if (!req.file) {
    console.log("No file received");
    return res.send({
        success: false
    });

    } else {
    console.log('file received successfully');
    return res.send({
        success: true
    })
    }
});

var con = mysql.createConnection({
    host: "localhost",
    user: "foo",
    password: "bar"
    });
   
app.get('/', function(req, res){
    res.send("Please use the API endpoints, try api/getusers");
})

users = require ('./models/user');

app.get('/users', cors(), (req, res, next)=> {
    db.getUsers(req, res).then(result => {
    res.send(result);
}, reject => {
  console.error(new Date().toISOString(), req.path, "the query ", req.query, "resulted in: ", reject);
  res.send("oops");
});
});

app.get('/registerUser', cors(), (req, res, next)=> {
    db.registerUser(req, res).then(result => {
    res.send(result);
}, reject => {
  console.error(new Date().toISOString(), req.path, "the query ", req.query, "resulted in: ", reject);
  res.send("oops");
});
});

app.get('/search', cors(), (req, res, next) => {
    db.search(req, res).then(result => {
        res.send(result);
    }, reject => {
      console.error(new Date().toISOString(), req.path, "the query ", req.query, "resulted in: ", reject);
      res.send("oops");
    });
    
})

app.get('/upload', cors(), (req, res, next) => {
    db.upload(req, res).then(result => {
        res.send(result);
    }, reject => {
      console.error(new Date().toISOString(), req.path, "the query ", req.query, "resulted in: ", reject);
      res.send("oops");
    });
    
})

app.get('/download',cors(), function(req, res){
    const file = `/root/Resources/test.txt`;
    res.download(file); // Set disposition and send it.
  });

/*app.get('/users', cors(), (req, res, next) => {
    console.log("I AM HERE!!");
    for (const key in req.query) {
    //console.log(key)
   // console.log(req.query[key]);
    }

    con.query('SELECT * FROM GEE_DB.Users', function (error, results, fields) {
      
    }); 
})*/

con.connect(function(err) {
        if (err) throw err;
    });
   
module.exports = con;
port = process.env.PORT || 3002;
app.listen(port);
console.log('open on port: ' + port);