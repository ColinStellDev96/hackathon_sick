$(document).ready(function(){

    //Submit Button Link To Dashboard
    $('#signUp').on('submit', function (event){
        event.preventDefault();
    });

    $('#signupForm').on('submit', function (event){
        event.preventDefault();
        console.log($(this).serialize());
        $.post('/userData', $(this).serialize(), function(data){
            console.log(data);
        });
    });

});
//End of doc
