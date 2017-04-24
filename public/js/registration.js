/**
 * Created by kevitian on 3/6/2017.
 */
var cityOfficial = false;

$(document).ready(function () {

    //Initialize dropdown toggles
    //Populate dropdowns
    $.ajax({
        type: 'GET',
        url: '../resources/library/populateDropdowns.php',
        success: function (data) {
            var result = JSON.parse(data);

            //Populate list of city states
            $('#cityStateMenu').empty();
            for(var i = 0; i < result['locations'].length; i++) {
                $('#cityStateMenu').append('<li><a href="#" data-value="' + (i+1) + '">' + result['cityStates'][i] + '</a></li>');
            }

            //Initialize dropdown toggles
            $('.dropdown-menu a').on('click', dropdownToggle);

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });

    $('#userMenu').click(function () {
        if (new String($('#userType').text().trim()).valueOf() == new String("City Official").valueOf()) {
            $('#cityOfficialForms').fadeIn();
            cityOfficial = true;
        } else {
            $('#cityOfficialForms').fadeOut();
            cityOfficial = false;
        }
    });


    //Validation
    $('#register').click(function () {

        var validContent = true;

        //Store form values
        var name = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var confirmPass = $('#confirm').val();
        var userType = new String($('#userType').text().trim());

        //City official only
        var title = $('#title').val();
        var cityState = new String($('#cityStateName').text().trim());


        if (name == '') {
            $('#usernameForm').addClass("has-danger");
            $('#usernameForm').find(".form-control-feedback").text("Name cannot be blank");
            validContent = false;
        } else {
            $('#usernameForm').removeClass("has-danger");
            $('#usernameForm').find(".form-control-feedback").text("");
        }

        if (email == '') {
            $('#emailForm').addClass("has-danger");
            $('#emailForm').find(".form-control-feedback").text("Email cannot be blank");
            validContent = false;
        } else {
            $('#emailForm').removeClass("has-danger");
            $('#emailForm').find(".form-control-feedback").text("");
        }

        if (password == '') {
            $('#passwordForm').addClass("has-danger");
            $('#passwordForm').find(".form-control-feedback").text("Password cannot be blank");
            validContent = false;
        } else if (password != confirmPass) {
            $('#passwordForm').addClass("has-danger");
            $('#passwordForm').find(".form-control-feedback").text("Passwords must match");
            $('#confirmForm').addClass("has-danger");
            $('#confirmForm').find(".form-control-feedback").text("Passwords must match");
            validContent = false;
        } else {
            $('#passwordForm').removeClass("has-danger");
            $('#passwordForm').find(".form-control-feedback").text("");
            $('#confirmForm').removeClass("has-danger");
            $('#confirmForm').find(".form-control-feedback").text("");
        }

        if (userType == new String("Select User Type").valueOf()) {
            $('#usertypeForm').addClass("has-danger");
            $('#usertypeForm').find(".form-control-feedback").text("Please select a user type");
            validContent = false;
        } else {
            $('#usertypeForm').removeClass("has-danger");
            $('#usertypeForm').find(".form-control-feedback").text("");
        }


        //if user is a city official
        if (cityOfficial) {

            if (title == '') {
                $('#titleForm').addClass("has-danger");
                $('#titleForm').find(".form-control-feedback").text("Title cannot be blank");
                validContent = false;
            } else {
                $('#titleForm').removeClass("has-danger");
                $('#titleForm').find(".form-control-feedback").text("");
            }

            if (cityState == new String("Select CityState").valueOf()) {
                $('#cityStateForm').addClass("has-danger");
                $('#cityStateForm').find(".form-control-feedback").text("Please choose a valid city and state");
                validContent = false;
            } else {
                $('#cityStateForm').removeClass("has-danger");
                $('#cityStateForm').find(".form-control-feedback").text("");
            }
        }

        if (validContent) {
            var cityStateArr = cityState.split(",");

            $.ajax({
                type: 'POST',
                url: '../resources/library/register.php',
                data: {
                    username: name,
                    email: email,
                    password: password,
                    type: userType,
                    title: title,
                    city: cityStateArr[0].trim(),
                    state: cityStateArr[1].trim()
                },
                success: function (data) {
                    var result = JSON.parse(data);

                    alert(result['message']);
                    if (result['success']) {
                        var url;
                        if (userType == new String("City Official").valueOf()) {
                            url = 'cityOfficialHome.php';
                        } else {
                            url = 'cityScientistHome.php';
                        }
                        $(location).attr('href', url);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                }
            });
        }
    });

});