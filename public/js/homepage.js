/**
 * Created by kevitian on 3/7/2017.
 */
$(document).ready(function() {

    $('#POIcard').on('click', function(event) {
        window.location = "addPOI.html";
    });

    $('#datacard').on('click', function(event) {
        window.location = "addDataPoint.html";
    });

    $('#pendingDataCard').on('click', function(event) {
        window.location = "viewPendingData.html";
    });

    $('#pendingUserCard').on('click', function(event) {
        window.location = "viewPendingUsers.html";
    });

    $('#generateReportsCard').on('click', function(event) {
        window.location = "generatePOIReport.html";
    });

    $('#filterSearchPOICard').on('click', function(event) {
        window.location = "filterSearchPOI.html";
    });

    $('#logout').on('click', function() {
        $.ajax({
            type: 'POST',
            url: '../resources/library/logout.php',
            success: function () {
                $(location).attr('href', 'index.html');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Unable to logout!");
            }
        });
    });
});