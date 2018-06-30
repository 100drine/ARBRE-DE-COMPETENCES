$(document).ready(function(){

    $('.cercle').click(function(){
        $(this).toggleClass ("shad");

    });

    var socket = io();
    $('.cercle1').click(function(){
          socket.emit('up1', "lolipopo");
      });
      
});

$(document).ready(function(){
    $('.trait').click(function(){
        $(this).toggleClass ("traitshad");
        
    });
});

function addvote() {
    
}