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
});

function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return String(n) === str && n >= 0;
}