$(document).ready(function(){
    
    var currentMedia = null;
    
    function getPlayer() {
        return $('#jquery_jplayer_1');
    }
    
    function getContainer() {
        return $('#jp_container_1');
    }
    
    // set up player
    getPlayer().jPlayer({
        ready: function () {
            $('ul.player-controls').css('display', 'block');
            $(document).trigger('ozetPlayer:ready', [ getPlayer() ]);
        },
        swfPath: OZET_MEDIA_URL + 'js/jQuery.jPlayer.2.1.0/',
        supplied: 'mp3'
    });
    
    // activate song links:
    $('a.player-play').click(function(){
        var file = $(this).attr('href'),
            $container = getContainer(),
            $recording = $(this).parents('.recording');
        if (!currentMedia || currentMedia != file) {
            currentMedia = file;
            getPlayer().jPlayer('setMedia', { mp3: file });
            $recording.after($container);
            $container.css('display', 'block');
            $('ul.player-controls').removeClass('player-playing');
        }
        $(this).parents('ul').addClass('player-playing');
        getPlayer().jPlayer('play');
        return false;
    });
    
    $('a.player-pause').click(function(){
        $(this).parents('ul').removeClass('player-playing');
        getPlayer().jPlayer('pause');
        return false;
    });
    
    $('a.player-stop').click(function(){
        $(this).parents('ul').removeClass('player-playing');
        getPlayer().jPlayer('stop');
        return false;
    });
    
});