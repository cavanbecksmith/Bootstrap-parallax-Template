
// 2. This code loads the IFrame Player API code asynchronously.
// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player = new Array();
var videoIDs = ['54m4SDJiL6U', 'Bm81EQ2hgVE', 'vSCu48dF7K0', 'wG3Iz21wCkw', 'Mm0es1H1MWk', 'EfskK_MS_14'];
var videoContainer = $$('#videoContainer')[0];
function onYouTubeIframeAPIReady() {

    for (let i = 0; i < videoIDs.length; i++) {
        const ID = videoIDs[i];
        loadVideo(ID, i)
        console.log(ID);
    }
    
}

//Query All Helper - Transforms NodeList to array
function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
} 

function loadVideo(id, index){

    var container = document.createElement('div');
    var innerContainer = document.createElement('div');
    var title = document.createElement('p');
    title.classList.add('videoTitle');

    container.classList.add('video');
    innerContainer.classList.add('embed-responsive', 'embed-responsive-16by9');
    
    var video = document.createElement("div");
    video.id = id;
    
    container.appendChild(innerContainer);
    innerContainer.appendChild(video);
    container.appendChild(title);
    videoContainer.appendChild(container);

    player[index] = {
        yt: new YT.Player(id, {
            height: '390',
            width: '640',
            videoId: id,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        }),
        videoInfo: null
    };

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        player[index]['videoInfo'] = event.target.getVideoData();
        console.log(player[index].videoInfo);
        title.innerHTML = player[index]['videoInfo']['title'];
        event.target.pauseVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }
    function stopVideo() {
        player.stopVideo();
    }


}

function createVidContainer (container) {}



