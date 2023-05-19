var myAudio = document.getElementById("myAudio");
var playlist = ["./music/2585716642.mp3", "./music/6893f074ac.mp3", "./music/0413c09514e.mp3", "./music/3201e3342d.mp3",
	"./music/6005660TFF1.mp3"
];
var currentTrack = 0;
myAudio.addEventListener("ended", function() {
	currentTrack++;
	if (currentTrack >= playlist.length) {
		currentTrack = 0;
	}
	myAudio.src = playlist[currentTrack];
	myAudio.play();
});