// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.set('debug', true);
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' })



// Get our API routes
const api = require('./server/routes/api');

const app = express();

 mongoose.connect('mongodb://localhost/rvmarket', { useMongoClient: true });
//mongoose.connect('mongodb://brijeshmkt:Annu1999@ds153113.mlab.com:53113/rvmarket', { useMongoClient: true });



// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();

      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
});

var upload = multer({ //multer settings
              storage: storage
          }).single('file');

// Set our api routes
app.use('/api', api);

/** API path that will upload the files */
app.post('/upload', function(req, res) {
  upload(req,res,function(err){
      console.log(req.file.filename);
      if(err){
           res.json({error_code:1,err_desc:err});
           return;
      }
       res.json({filename: req.file.filename, error_code:0,err_desc:null});
  });
});

app.use('/images', express.static('uploads'));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3001';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
