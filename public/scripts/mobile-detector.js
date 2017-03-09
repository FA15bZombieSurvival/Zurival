/**
 *  This script detects mobile devices and disables contentparts of it
 */
$(document).ready(function() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('#play-button').css({
            'visibility': 'hidden'
        });
    }
})
