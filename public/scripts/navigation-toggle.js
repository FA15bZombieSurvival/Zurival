var toggleStatus = false;

$(document).ready(function() {
    $('#nav-toggle').click(function() {
        if(!toggleStatus) {
            $('.navbar').css({
                'width': '150px'
            });
            $('.nav-hidden').removeClass('hidden');
            $('#content').css({
                //'width': 'calc(100% - 150px)'
                'margin-left': '150px'
            })
            toggleStatus = true;
        }
        else {
            $('.navbar').css({
                'width': ''
            });
            $('.nav-hidden').addClass('hidden');
            $('#content').css({
                //'width': 'calc(100% - 150px)'
                'margin-left': ''
            })
            toggleStatus = false;
        }
    });
});
