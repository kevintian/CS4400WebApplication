/**
 * Created by kevin on 4/23/2017.
 */
$(document).ready(function () {

    //Populate dropdowns
    $.ajax({
        type: 'GET',
        url: '../resources/library/populateDropdowns.php',
        success: function (data) {
            var result = JSON.parse(data);

            //Populate POI names
            $('#locationMenu').empty();
            for (var i = 0; i < result['locations'].length; i++) {
                $('#locationMenu').append('<li><a href="#" style="color:#0275d8" data-value="' + (i + 1) + '">' + result['locations'][i] + '</a></li>');
            }

            //Populate list of city states
            $('#cityStateMenu').empty();
            for(var i = 0; i < result['locations'].length; i++) {
                $('#cityStateMenu').append('<li><a href="#" style="color:#0275d8" data-value="' + (i+1) + '">' + result['cityStates'][i] + '</a></li>');
            }

            //Initialize dropdown toggles
            $('.dropdown-menu a').on('click', dropdownToggle);

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });

    //Get the default data - aka a list of all POIs
    var table = $('#example').DataTable({
        "ajax": {
            "url": "../resources/library/getFilteredPOI.php",
            "data": {
                "locationName" : null,
                "city" : null,
                "state" : null,
                "zipCode" : null,
                "flag" : null,
                "dateFlagged" : null
            },
            "type": "POST",
            "dataSrc": ""
        },
        "columns": [
            {"data": "locationName"},
            {"data": "city"},
            {"data": "state"},
            {"data": "zipCode"},
            {"data": "flag"},
            {"data": "dateFlagged"}
        ],
        columnDefs: [
            {
                targets: [0, 1, 2],
                className: 'mdl-data-table__cell--non-numeric'
            }
        ],
        "searching": false,
        "lengthChange": false,
        "oLanguage": {
            "oPaginate": {
                "sPrevious": "Prev"
            }
        },
        "pageLength": 7
    });

    //Hides padding on left
    $('.mdl-grid').first().hide();

    //Formats bottom properly
    $('.mdl-grid').last().find();

    var picker = new MaterialDatetimePicker({})
        .on('submit', function (d) {
            $("#datetimeLabel").addClass('active');
            $('#datetime').val(d.format("YYYY/MM/DD HH:mm:ss"));
        });
    var el = document.querySelector('.c-datepicker-btn');
    el.addEventListener('click', function () {
        picker.open();
    }, false);
});