$(document).ready(function () {
    $.datetimepicker.setLocale('fr-FR');
    $('#datetimepicker').datetimepicker({
        format: 'd/m/Y H:i',
    });
});