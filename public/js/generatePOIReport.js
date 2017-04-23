/**
 * Created by kevin on 4/23/2017.
 */
$(document).ready(function () {
    var table = $('#example').DataTable({
        "ajax": {
            "url": "../resources/library/getPOIReport.php",
            "type": "GET",
            "dataSrc": ""
        },
        "columns": [
            {"data": "locationName"},
            {"data": "city"},
            {"data": "state"},
            {"data": "min_Mold"},
            {"data": "avg_Mold"},
            {"data": "max_Mold"},
            {"data": "min_AQ"},
            {"data": "avg_AQ"},
            {"data": "max_AQ"},
            {"data": "count_Data"},
            {"data": "flag"},
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