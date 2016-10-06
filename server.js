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
    var d = new Date;
    submittedSong.dateAdded = d.getMonth().toString() + '/' + d.getDate().toString() + '/' + d.getFullYear().toString();
    console.log("Date added: ", submittedSong.dateAdded);
    ///set property to variable and compare

    var songTitle = submittedSong.title;
    var songArtist = submittedSong.artist;

    // var boolean = songs.includes(submittedSong.title + submittedSong.artist);
    // console.log(boolean);
    // var boolean2 = songs.includes('{ title: ' + submittedSong.title + ', artist: ' + submittedSong.artist + ', dateAdded: ' + submittedSong.dateAdded + ' })';
    // console.log(boolean2);


    for (i = 0; i < songs.length; i++) {
        if (songTitle[i] == songTitle && songArtist[i] == songArtist) {
            submittedSong == false;
            if (submittedSong.title != false && submittedSong.artist != false && submittedSong != false) {
                songs.push(submittedSong);
                console.log('songs:', songs);
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        }
    }
    if (submittedSong.title == '') {
        submittedSong.title == false;
    };
    if (submittedSong.artist == '') {
        submittedSong.artist == false;
    };
    if (submittedSong.title != false && submittedSong.artist != false) {
        songs.push(submittedSong);
        console.log('songs:', songs);
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

//GET route retrieve array of songs
app.get('/songs', function(req, res) {
    res.send(songs);
});


//=================================//

//middleware for serving static files; html, js, css, images
app.use(express.static('public')); //make public folder publically available; doesn't need path.join dirname ; whatever you ran node from, must be direct from that


app.listen(3000); //listen for requests, but doesn't yet know how to handle http requests
