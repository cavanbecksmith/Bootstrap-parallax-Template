function calculateTotalValue(length) {
  var minutes = Math.floor(length / 60),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString(),
    seconds = seconds_str.substr(0, 2),
    time = minutes + ':' + seconds

  return time;
}

function calculateCurrentValue(currentTime) {
  var current_hour = parseInt(currentTime / 3600) % 24,
    current_minute = parseInt(currentTime / 60) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed(),
    current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

  return current_time;
}


function seek(evt) {
  var percent = evt.offsetX / this.offsetWidth;
  player.currentTime = percent * player.duration;
  progressbar.value = percent / 100;
}

function eachAudioPlayer(){

  $('.audio-player').each(function(id){

    var $this=$(this),
    playerContainer=$(this),
    $playBtn=$(this).find('.play-btn'),
    player = playerContainer.find('audio')[0],
    isPlaying = false,
    progressbar = playerContainer.find('.seekObj')[0];


    progressbar.addEventListener("input", input);

		function input(){
			togglePlay(true);
			var perc = Number((progressbar.value * player.duration) / 100).toString();
			// player.currentTime = Number(progressbar.value / 100).toString();
			player.currentTime = perc;
			console.log(perc);
		}


    $playBtn.click(function(){
      togglePlay();
    })

    function togglePlay(paused) {
      if (player.paused === false || paused) {
        player.pause();
        isPlaying = false;
        
        $playBtn.removeClass('pause');

        $playBtn.addClass('fa-play');
        $playBtn.removeClass('fa-pause');

      } else if(!paused) {
        player.play();
        $playBtn.addClass('pause');

        $playBtn.addClass('fa-pause');
        $playBtn.removeClass('fa-play');
        
        isPlaying = true;
      }
    }

    $(this).find('audio').bind('timeupdate',function(){

      var length = player.duration;
			var totalLength = calculateTotalValue(length);
      var current_time = player.currentTime;
			var currentTime = calculateCurrentValue(current_time);

			// console.log(player.currentTime, player.currentTime / player.duration);

      playerContainer.find(".end-time").html(totalLength);
      playerContainer.find(".start-time").html(currentTime);
      if(isPlaying){
	      var progresstime = parseInt(player.currentTime / player.duration * 100).toString();
	      progressbar.value = progresstime;	
      }


      if (player.currentTime == player.duration) {
        $('.play-btn').removeClass('pause');
      }

    });
  })

}

eachAudioPlayer();

// initPlayers(jQuery('#player-container').length);
// initPlayers('.player-container-1');