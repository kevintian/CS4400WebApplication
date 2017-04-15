/**
 * Created by kevin on 4/14/2017.
 */
$(function () {
    $("#login").on('click', function (e) {
        // e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '../resources/library/login.php',
            data: {
                username: $("#username").val(),
                password: $("#password").val()
            },
            success: function (data) {
                try {
                    var userInfo = JSON.parse(data);
                    var url;
                    /* Expected Returns:
                     0:  exact match
                     -1:  string_a < string_b
                     1:  string_a > string_b
                     */
                    if (userInfo["user_type"].localeCompare("City Official") == 0) {
                        url = 'cityOfficialHome.html';
                    } else if (userInfo["user_type"].localeCompare("City Scientist") == 0) {
                        url = 'cityScientistHome.html';
                    } else if (userInfo["user_type"].localeCompare("Admin") == 0) {
                        url = 'adminHome.html';
                    } else {
                        alert(data);
                    }
                    $(location).attr('href', url);
                } catch (e) {
                    alert(data);
                }
            }
        });
    });
});