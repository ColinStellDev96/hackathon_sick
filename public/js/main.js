$(document).ready(function(){

    //Submit Button Link To Dashboard
    $('#signUp').on('submit', function (event){
        event.preventDefault();
        console.log('sign up button clicked');
        window.location = '/dashboard';
    });

    $('#signupForm').on('submit', function (event){
        event.preventDefault();
        console.log($(this).serialize());
        $.post('/userData', $(this).serialize(), function(data){
            console.log(data);
            window.location = '/dashboard';
        });
    });




    $.get('/userData', function (data){
        console.log(data);
        var appendData = data;
        $('#name').empty();
        $('#gender').empty();
        $('#cal-goal').empty();
            $('#name').append(`${appendData[appendData.length - 1]['user_firstname']} ${appendData[appendData.length - 1]['lastName']}`);
            $('#gender').append(`${appendData[appendData.length - 1]['user_gender']}`);
            $('#cal-goal').append(`${appendData[appendData.length - 1]['user_calorieGoal']}`);
    });




});
//End of doc
