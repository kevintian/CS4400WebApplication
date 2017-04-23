/**
 * Created by kevin on 4/23/2017.
 */
$(document).ready(function () {

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
});