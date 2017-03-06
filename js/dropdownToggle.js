/**
 * Created by kevitian on 3/6/2017.
 */
function dropdownToggle() {
    // select the main dropdown button element
    var dropdown = $(this).parent().parent().prev();

    // change the CONTENT of the button based on the content of selected option
    dropdown.html($(this).html() + '&nbsp;</i><span class="caret"></span>');

    // change the VALUE of the button based on the data-value property of selected option
    dropdown.val($(this).prop('data-value'));
}