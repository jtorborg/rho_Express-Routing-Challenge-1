var express = require('express'); //import code from other files into this file; require looks for express in node_modules
//http built-in doesn't need to be installed
var app = express();
var bodyParser = require('body-parser');
var path = require('path'); //require a library called path; built-in, like http, doesn't need to be installed

//middleware functions/routes
app.use(function(req, res, next) { //returns a function apply middleware function to request
    console.log('Got a request!');
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));


//requests with a body

app.post('/', function(req, res) {
    console.log('req.body=', req.body);
    res.sendStatus(200); //OK will print in curl terminal
});


app.get('/', function(req, res) {
    //console.log(req);
    //can only send something once, so once I commented out res.send, res.sendFile worked and the error message went away: Error: Can't set headers after they are sent.

    //res.send('Hello world'); //response sending message from server to client
    //console.log('Received a request at', new Date());
    //res.send(req);
    var filename = path.join(__dirname, 'public/views/index.html');
    console.log('filesname:', filename);
    res.sendFile(filename); //__dirname is the folder this file lives in

    //res.sendFile(path.join(__dirname, 'index.html'));//__dirname is the folder this file lives in

}); //should be listening specifically for GET requests (1st argument is path  <---- localhost:3000/) (handler function also called a middleware functions -- takes two arguments: a request and a response)
//access to request object

// app.get('/kittens', function(req, res) {
//     console.log('Query params:', req.query);
//     if (req.query.age > 2) {
//         res.send('MEOW!')
//     } else {
//         res.send('meow');
//     }
// });
//================================//
//POST route
//store info in memory
var songs = [];
app.post('/songs', function(req, res) { //if we put array in here, array will be recreated and overwritten ever time
    console.log('req.body', req.body);
    var submittedSong = req.body;
    console.log('submittedSong:', submittedSong);
    //add Date property
    var d = new Date;
    submittedSong.dateAdded = d.getMonth().toString() + '/' + d.getDate().toString() + '/' + d.getFullYear().toString();
    console.log("Date added: ", submittedSong.dateAdded);

    for (i = 0; i < songs.length; i++) {
        if (songs[i].title == submittedSong.title && songs[i].artist == submittedSong.artist) {
            submittedSong = false;
            if (submittedSong == false) {
              console.log(submittedSong);//songs.pop(submittedSong);
            }
            // console.log('songs title i', songs[i].title);
            // console.log('submitted song title', submittedSong.title);
            // console.log('song artist i', songs[i].artist);
            // console.log('submitted song artist', submittedSong.artist);
            // if (submittedSong == false) {
            //     res.sendStatus(400);
            // } else {
            //     res.sendStatus(200);
            // }
        }
    } //end of for loop to check for duplicates



    if (submittedSong.title == '' || submittedSong.artist == '') {
        submittedSong = false;
    };

    if (submittedSong == false) {
        console.log('songs:', songs);

        res.sendStatus(400);
    } else {
      songs.push(submittedSong);

        res.sendStatus(200);
    } //end of if/else statement
});

//GET route retrieve array of songs
app.get('/songs', function(req, res) {
    res.send(songs);
});


//=================================//

//middleware for serving static files; html, js, css, images
app.use(express.static('public')); //make public folder publically available; doesn't need path.join dirname ; whatever you ran node from, must be direct from that


app.listen(3000); //listen for requests, but doesn't yet know how to handle http requests
