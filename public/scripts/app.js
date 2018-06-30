$(document).ready(function(){

    var socket = io();
    $('.cercle').one('click',function(){
        $(this).toggleClass ("shad");
        console.log('La valeur est :' + $(this).attr('value'));
        socket.emit('up', [$(this).attr('value'),$(this).attr('comp')]);
      });
      
});

$(document).ready(function(){
    $('.trait').click(function(){
        $(this).toggleClass ("traitshad");
        
    });
});

function addvote() {
    
}