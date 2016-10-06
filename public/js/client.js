console.log('Client side js loaded.');
//will show up in browser developer tools
$(function() {
        console.log('jquery loaded');
        getSongs();
        //ask the server for songs, and then draw them

        //listen for submit events and send new songs to the server
        $('form').on('submit', function(event) {
            event.preventDefault();
            var formData = $(this).serialize();



            $.ajax({
                type: 'POST',
                url: '/songs',
                data: formData,
                success: getSongs
            }); //end of ajax POST
            $(this).find('input[type=text]').val('');

        }); //end of event listener





        function getSongs() {
            $.ajax({
                type: 'GET',
                url: '/songs', ///relative to localhost 3000
                success: function(songs) {
                    //put songs in unordered list
                    //use append
                    $("#songs").empty();
                    songs.forEach(function(song) {
                        var $li = $('<li></li>');
                        $li.append('<p> Title: ' + song.title + '</p>');
                        $li.append('<p> Artist: ' + song.artist + '</p>');
                        $li.append('<p> Date Added: ' + song.dateAdded + '</p>');

                        $("#songs").append($li);
                    });
                }
            });
        } //end of getSongs function




    }) //end of doc ready function
