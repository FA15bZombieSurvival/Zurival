var toggleStatus = false;

$(document).ready(function() {
    $('#nav-toggle').click(function() {
        if(!toggleStatus) {
            /*$('.navbar').css({
                'width': '150px'
            });*/
            $( ".navbar" ).animate({
              width: '150px'
            }, 500, function() {
              // Animation complete.
            });
            $('.nav-hidden').removeClass('hidden');

            $( "#content" ).animate({
              'width': 'calc(100% - 150px)'
            }, 500, function() {
            // Animation complete.
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
              'width': 'calc(100% - 55px)'
            }, 500, function() {
            // Animation complete.
            });
            toggleStatus = false;
        }
    });
});
