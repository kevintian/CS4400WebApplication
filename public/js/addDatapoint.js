$(document).ready(function () {
    //Populate dropdowns
    $.ajax({
        type: 'GET',
        url: '../resources/library/populateDropdowns.php',
        success: function (data) {
            var result = JSON.parse(data);
            console.log(result);

            //Populate POI names
            $('#locationMenu').empty();
            for (var i = 0; i < result['locations'].length; i++) {
                $('#locationMenu').append('<li><a href="#" data-value="' + (i + 1) + '">' + result['locations'][i] + '</a></li>');
            }

            //Populate data types
            $('#datatypeMenu').empty();
            for (var i = 0; i < result['dataTypes'].length; i++) {
                $('#datatypeMenu').append('<li><a href="#" data-value="' + (i + 1) + '">' + result['dataTypes'][i] + '</a></li>');
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
        .on('submit', function (d) {
            $("#datetimeLabel").addClass('active');
            $('#datetime').val(d.format("YYYY/MM/DD HH:ss:mm"));
        });
    var el = document.querySelector('.c-datepicker-btn');
    el.addEventListener('click', function () {
        picker.open();
    }, false);


    // submission
    $('#submit').click(function () {
        //Store form values
        var poiName = new String($('#locations').text().trim());
        var dataType = new String($('#datatypes').text().trim());
        var datetime = $('#datetime').val();
        var dataValue = $('#dataValue').val();

        if (poiName == new String("Select Location").valueOf()
            || dataType == new String("Select Data Type").valueOf()
            || datetime === ""
            || dataValue === "") {
            alert('Please fill out all fields!');
        } else if (!isNormalInteger(dataValue)) {
            alert('Data value must to be a non-negative integers!');
        } else {
            //submit values
            alert('Valid input');
        }
    });
});

function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return String(n) === str && n >= 0;
}