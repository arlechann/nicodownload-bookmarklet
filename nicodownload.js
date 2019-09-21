(function(){
	const url = location.href;
	const pattern_nicovideo = /^https?:\/\/www\.nicovideo\.jp\/watch\/(sm[1-9][0-9]*)/

	const matched_nicovideo = pattern_nicovideo.exec(url);
	if(matched_nicovideo === null){
		return;
	}

	const videoID = matched_nicovideo[1];

	console.log(videoID);

	fetch("https://flapi.nicovideo.jp/api/getflv?v=" + videoID, {credentials: "include"})
		.then(function(response){return response.text();})
		.then(function(body){
			const pattern_video_url = /(?<=url=)[^&]+/;

			const matched_video_url = pattern_video_url.exec(body);
			if(matched_video_url === null){
				return;
			}

			const video_url = decodeURIComponent(matched_video_url[0]);
			console.log(video_url);
			window.open(video_url);
		});
})();
