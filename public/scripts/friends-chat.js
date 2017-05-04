$(document).ready(function() {
    /**
     * Open chat function
     */
    $('#openchat').click(function() {
        $('#chat').css({
            'visibility': 'visible'
        });
    });
    /**
     * Close chat function
     */
    $('#closeChat').click(function() {
        $('#chat').css({
            'visibility': 'hidden'
        });
    })
    /**
     * Send message (frontend function)
     */
    $('#sendmessage').click(function() {
        var text = $('#chattext').val();
        $('main').append('<p id="message"><b>{{ user.username }}</b> ' + text + '</p>' )
        $('#chattext').val('');
    });
    /**
     * Search for new friends hide control
     */
    $('#friendsSearchInput').focus(function() {
        $('#searchFriendsTable').css({
            'visibility': 'visible',
            'width': 'auto',
            'height': 'auto',
            'z-index': '10 !important'
        });
    });
    $('#friendsSearchInput').focusout(function() {
        $('#searchFriendsTable').css({
            'visibility': 'hidden',
            'width': '',
            'height': '',
            'z-index': ''
        });
    });
});
