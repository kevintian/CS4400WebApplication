$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: '../resources/library/populateDropdowns.php',
        success: function (data) {
            var result = JSON.parse(data);
            console.log(result);

            //Populate POI names
            $('#locationMenu').empty();
            for(var i = 0; i < result['locations'].length; i++) {
                $('#locationMenu').append('<li><a href="#" data-value="' + (i+1) + '">' + result['locations'][i] + '</a></li>');
            }

            //Populate data types
            $('#datatypeMenu').empty();
            for(var i = 0; i < result['dataTypes'].length; i++) {
                $('#datatypeMenu').append('<li><a href="#" data-value="' + (i+1) + '">' + result['dataTypes'][i] + '</a></li>');
            }

            //Initialize dropdown toggles
            $('.dropdown-menu a').on('click', dropdownToggle);

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });

    var picker = new MaterialDatetimePicker({})
        .on('submit', function(d) {
            $("#datetimeLabel").addClass('active');
            $('#datetime').val(d);
        });
    var el = document.querySelector('.c-datepicker-btn');
    el.addEventListener('click', function() {
        picker.open();
    }, false);

});
