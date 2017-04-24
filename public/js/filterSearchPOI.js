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

            //Populate list of cities
            $('#cityMenu').empty();
            for (var i = 0; i < result['locations'].length; i++) {
                var city = result['cityStates'][i].split(",")[0].trim();
                $('#cityMenu').append('<li><a href="#" style="color:#0275d8" data-value="' + (i + 1) + '">' + city + '</a></li>');
            }

            //Populate list of cities
            $('#stateMenu').empty();
            for (var i = 0; i < result['locations'].length; i++) {
                var state = result['cityStates'][i].split(",")[1].trim();
                $('#stateMenu').append('<li><a href="#" style="color:#0275d8" data-value="' + (i + 1) + '">' + state + '</a></li>');
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
            "data": function (d) {
                //Get all of the data from the form.
                var poiName = new String($('#locations').text().trim());
                var city = new String($('#cityName').text().trim());
                var state = new String($('#stateName').text().trim());
                var flagged = $('#flagged > .btn.active').text().trim();
                var zipcode = $.trim($('#zipCode').val());
                var startTime = $('#startDate').val();
                var endTime = $('#endDate').val();

                //Check if zipcode is valid
                var zipcode_regex = /^\d{5}$/;
                if (zipcode !== "" && !zipcode_regex.test(zipcode)) {
                    alert("Please input a valid 5 digit zipcode!");
                }

                //Set unfilled out forms to null
                if (poiName == new String("Select Location").valueOf()) {
                    poiName = null;
                }

                if (city == new String("Select City").valueOf()) {
                    //Corresponding values for city and state
                    city = null;
                }

                if (state == new String("Select State").valueOf()) {
                    //Corresponding values for city and state
                    state = null;
                }

                if (zipcode === "") {
                    zipcode = null;
                }
                if (flagged === "Both") {
                    flagged = null;
                }

                if (startTime === "") {
                    startTime = null;
                }
                if (endTime === "") {
                    endTime = null;
                }

                d.locationName = poiName;
                d.city = city;
                d.state = state;
                d.zipCode = zipcode;
                d.flag = flagged;
                d.dateFlaggedStart = startTime;
                d.dateFlaggedEnd = endTime;
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
        "pageLength": 7,
    });

    //Hides padding on left
    $('.mdl-grid').first().hide();

    //Formats bottom properly
    $('.mdl-grid').last().find();


    var startPicker = new MaterialDatetimePicker({}).on('submit', function (d) {
        $("#startDateLabel").addClass('active');
        $('#startDate').val(d.format("YYYY/MM/DD HH:mm:ss"));
    });

    var start = document.querySelector('#startDate');
    start.addEventListener('click', function () {
        startPicker.open();
    }, false);

    var endPicker = new MaterialDatetimePicker({}).on('submit', function (d) {
        $("#endDateLabel").addClass('active');
        $('#endDate').val(d.format("YYYY/MM/DD HH:mm:ss"));
    });

    var end = document.querySelector('#endDate');
    end.addEventListener('click', function () {
        endPicker.open();
    }, false);


    //Buttons
    $('#clearFilters').click(function () {
        location.reload();
    });

    $('#applyFilters').click(function () {
        table.ajax.reload();
    });

    $('#example tbody').on('click', 'tr', function () {
        console.log(table.row(this).data()['locationName']);
        $(location).attr('href', 'POIDetail.html?location=' + table.row(this).data()['locationName']);
    });
});