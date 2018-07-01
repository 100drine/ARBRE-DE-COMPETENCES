$(document).ready(function(){
    $('.trait').click(function(){
        $(this).toggleClass ("traitshad");
        
    });
    var socket = io();
    $('.cercle').one('click',function(){
        $(this).toggleClass ("shad");
        console.log('La valeur est :' + $(this).attr('value'));
        socket.emit('up', [$(this).attr('value'),$(this).attr('comp')]);
      });
    
    socket.on('toligth', function(dcomp){           // dcomp pour datacomp;
        console.log("recuperation de tolight "+dcomp[0]+" et "+dcomp[1])
        if(dcomp[1]!=0){
            // dcomp[0]=i et dcomp[1]=note de la competence
            console.log('changement de class!');
            
            $('.cercle[comp='+ dcomp[0] +'][value='+ dcomp[1] +']').toggleClass ("shad");
        }
    })
});


function addvote() {
    
}