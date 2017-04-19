/**
 * Created by kevin on 4/18/2017.
 */
$(document).ready(function () {
    var table = $('#example').DataTable({
        "ajax": {
            "url": "../resources/library/getPendingUsers.php",
            "type": "GET",
            "dataSrc": ""
        },
        "columns": [
            {"data": "username"},
            {"data": "email"},
            {"data": "city"},
            {"data": "state"},
            {"data": "title"}
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

    $('#example tbody').on('click', 'tr', function () {
        $(this).toggleClass('table-info');
    });

    $('#accept').click( function () {
        alert(table.rows('.table-info').data().length +' row(s) selected' );
    } );

});
/**
 * Created by kevin on 4/17/2017.
 */
