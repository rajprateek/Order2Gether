$(document).ready(function () {
            $('#joinTab').click(function() {
                $('#createTab').removeClass('active');
                $(this).addClass('active');
            });
            $('#createTab').click(function() {
                $('#joinTab').removeClass('active');
                $(this).addClass('active'); 
            });
});