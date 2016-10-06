Express Routing Challenge
Recall that the server is running JavaScript, so our normal js code works! If statements, else, loops, variables, all that jazz. We're going to do a little validation of the data the user is POSTing to our server.

Instructions
Take the lecture code and add some logic to our POST route on the server.

Don't allow the user to add duplicate songs.
Don't allow the user to add songs with a blank artist or title field.
Before pushing to our array, add a property to the new song object for the dateAdded with the current date. You'll have to look up the Date object in javascript.
On the client...

Add the dateAdded to our DOM display for our songs.
NOTE: You're going to have to send back a status code of 400 if there are problems. That means your client code needs to be able to handle the error case and tell the user!
