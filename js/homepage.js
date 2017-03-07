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
});