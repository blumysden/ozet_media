$(document).ready(function(){
    
    function getPlayer() {
        return $('#jquery_jplayer_1');
    }
    
    function getContainer() {
        return $('#jp_container_1');
    }
    
    // set up player
    getPlayer().jPlayer({
        ready: function () {},
        swfPath: OZET_MEDIA_URL + 'js/jQuery.jPlayer.2.1.0/',
        supplied: 'mp3'
    });
    
    // activate song links:
    $('p.song a').click(function(){
        var file = $(this).attr('href'),
            $container = getContainer();
        getPlayer().jPlayer('setMedia', { mp3: file });
        $('.jp-title li', $container).text($(this).text());
        $(this).parent().after($container);
        $container.css('display', 'block');
        getPlayer().jPlayer('play');
        return false;
    });
    
});