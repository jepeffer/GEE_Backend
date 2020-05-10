
var mysql = require('mysql');
const cors = require('cors');
const db = require('./USER-DB');
var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var multer = require('multer');
var path = require('path')
var DIR = '/root/Resources';
var archiver = require('archiver');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync(DIR + "/" + file.originalname.substring(0, file.originalname.lastIndexOf('.')))){
        fs.mkdirSync(DIR + "/" + file.originalname.substring(0, file.originalname.lastIndexOf('.')));
    }
      cb(null, DIR + "/" + file.originalname.substring(0, file.originalname.lastIndexOf('.')))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) //Appending extension
    }
  })
  

var upload = multer({storage:storage});
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
       
app.post('/api/upload', cors(), upload.single('file'), function (req, res) {
  console.log("File recieved" + req.file.originalname);
  var filetype = req.file.originalname.substring(req.file.originalname.length, req.file.originalname.length - 3)
  if (filetype !== "zip")
  {
    //console.log("File is not a zip: " + req.file.originalname);
    var output = fs.createWriteStream(DIR + "/" + req.file.originalname.substring(0, req.file.originalname.lastIndexOf('.')) + ".zip");
   // console.log("This is output: " + DIR + "/" + req.file.originalname.substring(0, req.file.originalname.lastIndexOf('.')) + ".zip");
    output.on('close', function() {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
    });
    var archive = archiver('zip');
    archive.pipe(output);
    archive
    .append(fs.createReadStream(req.file + ''), { name: "THIS_ZIP_FILE"+ ".zip" })
    .finalize();

    archive.on('error', function(err) {
      return res.send({
        success: 3
    });
    });
  }
  else{
    console.log("Not a zip: " + req.query.originalname);
  }

if (!req.file) {
    console.log("No file received");
    return res.send({
        success: 2
    });

    } else {
    console.log('file received successfully' + req.file.originalname);
    return res.send({
        success: 0
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
  console.log("Search");
    db.search(req, res).then(result => {
        res.send(result);
    }, reject => {
      console.error(new Date().toISOString(), req.path, "the query ", req.query, "resulted in: ", reject);
      res.send("oops");
    });
    
})

app.get('/searchall', cors(), (req, res, next) => {
  console.log("Search all");
    db.searchall(req, res).then(result => {
        res.send(result);
    }, reject => {
      console.error(new Date().toISOString(), req.path, "the query ", req.query, "resulted in: ", reject);
      res.send("oops");
    });
    
})

app.get('/getfeedback', cors(), (req, res, next) => {
  console.log("Feedback");
    db.getFeedbackByFileID(req, res).then(result => {
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
  console.log("Downloading called");
  filelocation = req.query.filelocation.toString();
  console.log("Now downloading: " + filelocation);
    res.download(filelocation); // Set disposition and send it.
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