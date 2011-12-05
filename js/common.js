$(document).ready(function(){
    
    // BACKGROUNDS ------------------------------------------------------------
    
    var bgImgSelector = '#background img',
        $background = $('#background'),
        bgRatio = $(bgImgSelector).attr('width') /
            $(bgImgSelector).attr('height'),
        wH = $(window).height(),
        wW = $(window).width();
    
    function resizeBg() {
        $background.width(wW).height(wH);
        
        var dH = $(document).height(),
            dW = $(document).width(),
            useH = (wH > dH) ? wH : dH,
            useW = (wW > dW) ? wW : dW,
            newH,
            newW;
        
        if (useW > useH) {
            newW = useW;
            newH = Math.floor(useW/bgRatio);
        }
        if (useW < useH || newH < useH) {
            newH = useH;
            newW = Math.floor(useH * bgRatio);
        }
        var marginTop = useH - newH,
            marginLeft = useW - newW;
        
        $background.width(useW).height(useH);
        $(bgImgSelector).attr('width', newW).
            attr('height', newH).css('margin-top', marginTop).
            css('margin-left', marginLeft);
    }
    
    resizeBg();
    
    // NAV --------------------------------------------------------------------
    
    var narrowPositioning = false;
    
    function repositionNav() {
        var minW = parseInt($('body').css('min-width')),
            $nav = $('#main_nav');
        if (wW < minW && !$nav.hasClass('narrow-window')) {
            $nav.addClass('narrow-window');
        } else if (wW > minW && $nav.hasClass('narrow-window')) {
            $nav.removeClass('narrow-window');
        }
    }
    
    // ---- NAV EVENT HANDLERS
    
    // $('#nav_contact > a').click(function() {
    //     $(this).next('ul').toggleClass('expanded');
    //     return false
    // });
    
    // KICKOFF -----------------------------------------------------------------
    function resizeHandler(){
        wH = $(window).height();
        wW = $(window).width();
        resizeBg();
        repositionNav();
    }
    
    $(window).resize(resizeHandler);
    
});