$(document).ready(function(){

    $('#loginHead').on('click', function (){
        $('#signupForm').hide();
        $('#loginForm').show();
    });

    $('#signUpHead').on('click', function (){
        $('#loginForm').hide();
        $('#signupForm').show();
    });

    $('#signUp').on('submit', function (event){
        event.preventDefault();
    });

    $('#loginbtn').on('submit', function (event){
        event.preventDefault();
    });

});
//End of doc
