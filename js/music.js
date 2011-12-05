$(document).ready(function(){
    $('a.score').colorbox({
        onComplete: function(){
            var $current = $('#cboxCurrent'),
            text = $current.text();
            $current.text(text.replace('image', 'Page'));
        }
    });
});
