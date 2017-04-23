/**
 * Created by kevin on 4/15/2017.
 */
$(document).ready(function () {
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

    // submission
    $('#submit').click(function () {
        //Store form values
        var locationName = $('#locationName').val();
        var cityState = new String($('#cityStateName').text().trim());
        var cityStateArr = cityState.split(",");
        var zipcode = $.trim($('#zipCode').val());

        var zipcode_regex = /^\d{5}$/;
        if (cityState == new String("Select CityState").valueOf()
            || locationName === ""
            || zipcode === "") {
            alert('Please fill out all fields!');
        } else if (!zipcode_regex.test(zipcode)) { //Check if the zipcode is a valid 5 digit zipcode
            alert('Zipcode must be a valid 5 digit zip!');
        } else {
            //submit values
            $.ajax({
                type: 'POST',
                url: '../resources/library/addPOI.php',
                data: {
                    locationName: locationName,
                    city: cityStateArr[0].trim(),
                    state: cityStateArr[1].trim(),
                    zipcode: zipcode
                },
                success: function (data) {
                    //Either shows a success or an error
                    alert(data);
                    location.reload();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                }
            });
        }
    });

});
