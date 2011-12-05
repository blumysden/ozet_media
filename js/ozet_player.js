$(document).ready(function(){
// Stores the value of percentage of track loaded
	
	var global_lp = 0,
		jplayer_ready = false,
		currentFile = null,
		$player = $("#jquery_jplayer");

	// ADAPTED FROM DEMO --------------------------

	$player.jPlayer({
		swfPath: '/media/js/jQuery.jPlayer.1.2.0/',
		ready: function () {
			jplayer_ready = true;
			$(document).trigger('jPlayer:ready', []);
			var jump_html = '',
				vol_html = '';
			
			for (i=0; i < 100; i++){
				jump_html = jump_html + "<a href='#' id='lb-"+i+"'></a>";
				vol_html = vol_html + "<a href='#' id='lv-"+i+"'></a>";
			}
			
			$('#player_progress_ctrl_bar').empty().append($(jump_html));
			$('#player_volume_bar').empty().append($(vol_html));
			$('.player-controls').show();
		},
		customCssIds: true,
		errorAlerts: true
	}).
	jPlayer("onProgressChange", function(lp,ppr,ppa,pt,tt) {
 		var lpInt = parseInt(lp);
 		var ppaInt = parseInt(ppa);

 		global_lp = lpInt;

		$('#player_progress_load_bar span.progress').width(lpInt + '%');
 		$('#player_progress_play_bar span.progress').width(ppaInt + '%');
	});
	
	function togglePlayTo($clicked, show, $controls) {
	    var selectors = ['.player-play', '.player-pause'],
	        showSelector = (show == 'play') ? selectors[0] : selectors[1],
	        hideSelector = (show == 'play') ? selectors[1] : selectors[0];
        $controls = $controls || $clicked.parents('.player-controls');
        $(showSelector, $controls).css('display', 'block');
        $(hideSelector, $controls).css('display', 'none');
	}

	$(".player-play").click( function() {
	    var file = $(this).attr('href');
	        
	    if (!currentFile || (currentFile != file)) {
	        $player.jPlayer('setFile', file);
	        currentFile = file;
	        var $recording = $(this).parents('.recording');
	        if ($recording.length) {
	            $recording.append($('#player_container').show());
	        }
	        $('.recording').not($recording).each(function(){
	            togglePlayTo(null, 'play', $('.player-controls', this));
	        });
	    }
		$player.jPlayer("play");
		togglePlayTo($(this), 'pause');
		return false;
	});

	$(".player-pause").click( function() {
		$player.jPlayer("pause");
		togglePlayTo($(this), 'play');
		return false;
	});

	$(".player-stop").click( function() {
		$player.jPlayer("stop");
		togglePlayTo($(this), 'play');
		return false;
	});

	$("#player_volume_min").click( function() {
		$player.jPlayer("volume", 0);
		return false;
	});

	$("#player_volume_max").click( function() {
		$player.jPlayer("volume", 100);
		return false;
	});

	$("#player_progress_ctrl_bar a").live( "click", function() {
		$player.jPlayer("playHead", this.id.substring(3)*(100.0/global_lp));
		return false;
	});
	
	$("#player_volume_bar a").live( "click", function() {
		$player.jPlayer("volume", this.id.substring(3));
		return false;
	});
});