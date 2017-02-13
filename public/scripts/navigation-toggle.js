var toggleStatus = false;

$(document).ready(function() {
    // Read sass variables
    $('#nav-toggle').click(function() {
        if(!toggleStatus) {
            $( ".navbar" ).animate({
              width: '150px'
            }, 500, function() {
              // Animation complete.
            });
            $('.nav-hidden').removeClass('hidden');

            $('#content').animate({
                marginLeft: '+=95px',
                width: '-=95px'
            });
          toggleStatus = true;
        }
        else {
            $( ".navbar" ).animate({
              width: '55px'
            }, 500, function() {
            // Animation complete.
            });
            $('.nav-hidden').addClass('hidden');
            $( "#content" ).animate({
              marginLeft: '-=95px',
              width: '+=95px'
            }, 500, function() {
            // Animation complete.
            });
            toggleStatus = false;
        }
    });
});
