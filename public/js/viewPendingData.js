$(document).ready(function () {
    var table = $('#example').DataTable({
        "ajax": {
            "url": "../resources/library/getPendingData.php",
            "type": "GET",
            "dataSrc": ""
        },
        "columns": [
            {"data": "locationName"},
            {"data": "dateSubmitted"},
            {"data": "dataValue"},
            {"data": "type"}
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

    $('#accept').click(function () {
        //Datatables adds a bunch of random info to the end of the table.rows('.table-info').data() array so we make our own
        var selectedElements = [];
        for (var i = 0; i < table.rows('.table-info').data().length; i++) {
            selectedElements.push(table.rows('.table-info').data()[i]);
            // console.log(JSON.stringify(table.rows('.table-info').data()[i]));
        }

        //Update the data in the database
        if (selectedElements.length > 0) {
            console.log(JSON.stringify(selectedElements));

            $.ajax({
                type: 'POST',
                url: '../resources/library/updatePendingData.php',
                data: {
                    //1 means accept the data, 0 means reject the data
                    acceptData: 1,
                    selected: JSON.stringify(selectedElements)
                },
                success: function (data) {
                    //Either shows a success or an error
                    alert(data);
                    location.reload();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                }
            });
        }
    });

    $('#reject').click(function () {
        //Datatables adds a bunch of random info to the end of the table.rows('.table-info').data() array so we make our own
        var selectedElements = [];
        for (var i = 0; i < table.rows('.table-info').data().length; i++) {
            selectedElements.push(table.rows('.table-info').data()[i]);
            // console.log(JSON.stringify(table.rows('.table-info').data()[i]));
        }

        //Update the data in the database
        if (selectedElements.length > 0) {
            console.log(JSON.stringify(selectedElements));

            $.ajax({
                type: 'POST',
                url: '../resources/library/updatePendingData.php',
                data: {
                    //1 means accept the data, 0 means reject the data
                    acceptData: 0,
                    selected: JSON.stringify(selectedElements)
                },
                success: function (data) {
                    //Either shows a success or an error
                    alert(data);
                    location.reload();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                }
            });
        }
    });

});
/**
 * Created by kevin on 4/17/2017.
 */
