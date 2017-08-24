$(document).ready(function() {

    //Submit Button Link To Dashboard
    $('#signUp').on('submit', function(event) {
        event.preventDefault();
        console.log('sign up button clicked');
        window.location = '/dashboard';
    });

    // Submit User Data To Server & Database
    $('#signupForm').on('submit', function(event) {
        event.preventDefault();
        console.log($(this).serialize());
        $.post('/userData', $(this).serialize(), function(data) {
            console.log(data);
            window.location = '/dashboard';
        });
    });

    //Appending User Data to Dashboard
    var valueMax = $('#progress').attr('aria-valuemax');
    // console.log(valueMax);
    //Calorie Counter Variable
    var calorieCount = 0;
    var progress = $('#progress');
    var ariaNow = progress.attr('aria-valuenow');
    // console.log(ariaNow);
    var style = progress.attr("style");
    console.log(style);
    var equation = ((ariaNow / valueMax) * 100);
    // console.log(equation);

    $.get('/userData', function(data) {
        console.log(data);
        var appendData = data;
        $('#name').empty();
        $('#gender').empty();
        $('#cal-goal').empty();
        $('#name').append(`${appendData[appendData.length - 1]['user_firstname']} ${appendData[appendData.length - 1]['lastName']}`);
        $('#gender').append(`${appendData[appendData.length - 1]['user_gender']}`);
        $('#cal-goal').append(`${appendData[appendData.length - 1]['user_calorieGoal']}`);
        valueMax = appendData[appendData.length - 1]['user_calorieGoal'];
    });

    // Displaying All Food Items in Table Data Form
    $.get('/foodItems', function(data) {
        console.log(data);
        var foodAppend = data;
        for (var i = 0; i < foodAppend.length; i++) {
            $('#foodData').append(`
                <tr>
                    <td>${foodAppend[i]['foodName']}</td>
                    <td>${foodAppend[i]['calories']}</td>
                    <td><input type="checkbox" class="foodCheck"></td>
                </tr>`);
        }
        $('.foodCheck').click(function() {
            // console.log($(this.checked))
            $('#totalCount').empty()
            var thisCals = $($(this).parent().parent()).children()[1].innerText;
            if (this.checked == true) {
                calorieCount += parseInt(thisCals);
                $('#totalCount').text(calorieCount);
                ariaNow = calorieCount;
                bar = (ariaNow / valueMax) * 100;
                // console.log(bar);
                // console.log(ariaNow);
                progress.css("width", bar + '%');
                if (calorieCount >= valueMax) {
                    // console.log(valueMax);
                    // console.log(calorieCount);
                    $('.alert').removeAttr('style');
                } else {
                    $('.alert').attr('style', "display: none");
                }
            } else if (this.checked == false) {
                calorieCount -= parseInt(thisCals);
                $('#totalCount').text(calorieCount);
                ariaNow = calorieCount;
                bar = (ariaNow / valueMax) * 100;
                // console.log(ariaNow);
                progress.css("width", ariaNow);
                progress.css("width", bar + '%');
                if (calorieCount >= valueMax) {
                    // console.log(valueMax);
                    // console.log(calorieCount);
                    $('.alert').attr('style', "display: flex");
                } else {
                    $('.alert').attr('style', "display: none");
                }
            }
            // console.log($('#progress').attr('aria-valuemin'));
            // console.log($('#progress').attr('style'));
            // console.log($('#progress').attr('aria-valuenow'));
            // console.log($('#progress').attr('aria-valuemax'));

        });
    });

    //Displaying All Workout Items in Table Data Form
    $.get('/calories', function(data) {
        console.log(data);
        var exerciseAppend = data;
        for (var i = 0; i < exerciseAppend.length; i++) {
            $('#workoutData').append(`
                <tr>
                    <td>${exerciseAppend[i]['excerciseName']}</td>
                    <td>${exerciseAppend[i]['calories']}</td>
                    <td><input type="checkbox" class="workCheck"></td>
                </tr>`);
        }
        $('.workCheck').click(function() {
            // console.log($(this.checked))
            $('#totalCount').empty()
            var thisCals = $($(this).parent().parent()).children()[1].innerText;
            if (this.checked == true) {
                calorieCount -= parseInt(thisCals);
                $('#totalCount').text(calorieCount);
                ariaNow = calorieCount;
                bar = (ariaNow / valueMax) * 100;
                // console.log(bar);
                // console.log(ariaNow);
                progress.css("width", bar + '%');
                // console.log(ariaNow);
                if (calorieCount >= valueMax) {
                    // console.log(valueMax);
                    // console.log(calorieCount);
                    $('.alert').removeAttr('style');
                } else {
                    $('.alert').attr('style', "display: none");
                }
            } else if (this.checked == false) {
                calorieCount += parseInt(thisCals);
                $('#totalCount').text(calorieCount);
                ariaNow = calorieCount;
                // console.log(ariaNow);
                bar = (ariaNow / valueMax) * 100;
                // console.log(bar);
                // console.log(ariaNow);
                progress.css("width", bar + '%');
                if (calorieCount >= valueMax) {
                    // console.log(valueMax);
                    // console.log(calorieCount);
                    $('.alert').removeAttr('style');
                } else {
                    $('.alert').attr('style', "display: none");
                }
            }
        });

    });

});
//End of doc
