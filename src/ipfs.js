var express = require('express');
var fs = require('fs');
var bodyParser = require("body-parser");
var multer = require("multer");
var crypto = require('crypto');
var mime = require('mime');
var ipfs = require("ipfs-js");
var Promise = require('promise');
var session = require('express-session');

var app = express();
var http = require("http");

ipfs.setProvider(require('ipfs-api')('localhost', '5001'));


app.set('json spaces', 40);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

app.use( session({
    secret:'IPFS',
    resave:false,
    saveUninitialized:false
}));

try {
    http.createServer(app).listen(4201);
    console.log('HTTP Server started on port 4201');
} catch (ex) {
    console.log("Express Server:", ex);
}


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});
var upload = multer({
    storage: storage
});

app.post('/upload/ipfs', upload.single('uploadFile'), function (request, response) {
    if (!request.file) {
        response.json({
            msg: 'No Files Found.'
        });
    } else {
        console.log(request);
        ipfs.api.id(function (err, res) {
            if (typeof res !== undefined) {
              var data = "data:"+request.file.mimetype+";base64,"+base64_encode(request.file.path);
                ipfs.add(data, function (err, resHash) {
                    fs.unlink(request.file.path);
                    response.json({
                        msg: resHash
                    });
                });
            }
        });
    }

});


function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

function ipfsUpload(file) {
    var hash = "";
    ipfs.api.id(function (err, res) {
        if (typeof res !== undefined) {
            var data = base64_encode(file);
            ipfs.add(data, function (err, resHash) {
                hash = resHash;
                return hash;
            });
        }
    });
}

