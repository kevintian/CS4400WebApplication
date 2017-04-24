/**
 * Created by kevin on 4/23/2017.
 */
$(document).ready(function () {

    $('#POIHeader').html('Point of Interest: ' + getParameterByName('location'));

    //Populate dropdowns
    $.ajax({
        type: 'GET',
        url: '../resources/library/populateDropdowns.php',
        success: function (data) {
            var result = JSON.parse(data);

            //Populate data types
            $('#datatypeMenu').empty();
            for (var i = 0; i < result['dataTypes'].length; i++) {
                $('#datatypeMenu').append('<li><a href="#" style="color:#0275d8" data-value="' + (i + 1) + '">' + result['dataTypes'][i] + '</a></li>');
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
            "url": "../resources/library/getPOIDetail.php",
            "data": function (d) {

                var locationName = getParameterByName('location');

                //Get all of the data from the form.
                var dataType = new String($('#datatypes').text().trim());
                var minValue = $('#minValue').val();
                var maxValue = $('#maxValue').val();
                var startTime = $('#startDate').val();
                var endTime = $('#endDate').val();

                //Set unfilled out forms to null
                if (dataType == new String("Select Data Type").valueOf()) {
                    dataType = null;
                }

                if (minValue === "") {
                    minValue = undefined;
                }

                if (maxValue === "") {
                    maxValue = undefined;
                }

                if (startTime === "") {
                    startTime = null;
                }
                if (endTime === "") {
                    endTime = null;
                }

                d.locationName = locationName;
                d.type = dataType;
                d.minValue = minValue;
                d.maxValue = maxValue;
                d.startTime = startTime;
                d.endTime = endTime;
            },
            "type": "POST",
            "dataSrc": ""
        },
        "columns": [
            {"data": "type"},
            {"data": "dataValue"},
            {"data": "dateSubmitted"}
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
        "initComplete": function () {
            $('#example_wrapper').addClass('flex-column')
        }
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
        if (isNormalInteger($('#maxValue').val()) && isNormalInteger($('#minValue').val())) {
            table.ajax.reload();
        } else {
            alert("Please enter a valid, non negative integer");
        }
    });


    //Check current status of the flag and style the button properly
    updateFlagButton();


    $('#flagPoint').click(function () {
        var flag = $('#flagPoint').text();
        if (flag == "Flag POI") {
            flag = 1; //this means flag the poi
        } else {
            flag = 0;
        }
        $.ajax({
            type: 'POST',
            url: '../resources/library/flagPOI.php',
            data: {
                locationName: getParameterByName('location'),
                flag: flag
            },
            success: function (data) {
                alert(data);
                updateFlagButton();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    });

});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function updateFlagButton() {
    $.ajax({
        type: 'POST',
        url: '../resources/library/currentFlagStatus.php',
        data: {
            locationName: getParameterByName('location')
        },
        success: function (data) {
            if (data === '0') {
                $('#flagPoint').attr("class", "btn btn-danger btn-resize");
                $('#flagPoint').html("Flag POI")
            } else {
                $('#flagPoint').attr("class", "btn btn-success btn-resize");
                $('#flagPoint').html("Unflag POI")
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return String(n) === str && n >= 0;
}