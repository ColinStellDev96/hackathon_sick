$(document).ready(function(){

    //Submit Button Link To Dashboard
    $('#signUp').on('submit', function (event){
        event.preventDefault();
        console.log('sign up button clicked');
        window.location = '/dashboard';
    });

    // Submit User Data To Server & Database
    $('#signupForm').on('submit', function (event){
        event.preventDefault();
        console.log($(this).serialize());
        $.post('/userData', $(this).serialize(), function(data){
            console.log(data);
            window.location = '/dashboard';
        });
    });

    //Appending User Data to Dashboard
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

    //Calorie Counter Variable
    var calorieCount = 0;

    // Displaying All Food Items in Table Data Form
    $.get('/foodItems', function (data) {
        console.log(data);
        var foodAppend = data;
        for (var i = 0; i < foodAppend.length; i++) {
            $('#foodData').append(`
                <tr>
                    <td>${foodAppend[i]['foodName']}</td>
                    <td>${foodAppend[i]['calories']}</td>
                    <td><input type="checkbox" class="foodCheck"></td>
                </tr>`
            );
        }
        // for (key in foodAppend) {
        //     if (key === '_id') {
        //         console.log(_id);
        //     }
        // } //end of for in loop
        $('.foodCheck').click(function (){
            // console.log($(this.checked))
            $('#totalCount').empty()
            var thisCals = $($(this).parent().parent()).children()[1].innerText;
            if (this.checked == true) {
                calorieCount += parseInt(thisCals);
                $('#totalCount').text(calorieCount);
            } else if (this.checked == false) {
                calorieCount -= parseInt(thisCals);
                $('#totalCount').text(calorieCount);
            }
        });
    });

    //Displaying All Workout Items in Table Data Form
    $.get('/calories', function (data) {
        console.log(data);
        var exerciseAppend = data;
        for (var i = 0; i < exerciseAppend.length; i++) {
            $('#workoutData').append(`
                <tr>
                    <td>${exerciseAppend[i]['excerciseName']}</td>
                    <td>${exerciseAppend[i]['calories']}</td>
                    <td><input type="checkbox" class="workCheck"></td>
                </tr>`
            );
        }

        $('.workCheck').click(function (){
            // console.log($(this.checked))
            $('#totalCount').empty()
            var thisCals = $($(this).parent().parent()).children()[1].innerText;
            if (this.checked == true) {
                calorieCount -= parseInt(thisCals);
                $('#totalCount').text(calorieCount);
            } else if (this.checked == false) {
                calorieCount += parseInt(thisCals);
                $('#totalCount').text(calorieCount);
            }
        });

    });

    //Adding Calories to Calorie Count
    // $('#foodCheck').click(function (){
    //     for (var key in foodAppend) {
    //         if (key === _id) {
    //             console.log(_id);
    //         }
    //     }
    // });


    //Removing Calories From Calorie Count









        // $.get('/api_data', function (data){
        //     console.log(data);
        // });




});
//End of doc
