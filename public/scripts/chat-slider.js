var visibility = false;

$(document).ready(function() {
    $('#arrow').click(function() {
        if(!visibility) {
            $('#chat').animate({
                'right': '0'
            }, 1000, function() {
                console.log('Animation complete');
            });
            $('#arrow').css('transform', 'rotate(180deg)');
            visibility = true;
        }
        else {
            $('#chat').animate({
                'right': '-275px'
            }, 1000, function() {
                console.log('Animation complete');
            });
            $('#arrow').css('transform', 'rotate(180deg)');
            visibility = false;
        }
    });
});
