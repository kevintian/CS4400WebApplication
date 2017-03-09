$(document).ready(function () {

    var picker = new MaterialDatetimePicker({})
        .on('submit', function(d) {
            $('#datetime').val(d);
        });
    var el = document.querySelector('.c-datepicker-btn');
    el.addEventListener('click', function() {
        picker.open();
    }, false);

});
