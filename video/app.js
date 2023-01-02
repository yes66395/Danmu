import VideoDanmu from './danmu/videodanmu.js';
import danmuData from './util/data.js';

((doc) => {
	const oDanmuVideo = doc.getElementById('video');
	const oDanmuCanvas = doc.getElementById('canvas');
	const oDanmuInput = doc.querySelector('.danmu-input');
	const oDanmuBtn = doc.querySelector('.danmu-btn');
	const oColorText = doc.querySelector(`input[type='color']`);
	//console.log(oColorText);

	const init = () => {
		window.videoDanmu = new VideoDanmu(oDanmuVideo, oDanmuCanvas, {
			danmuData,
		});
		bindEvent();
	};

	function bindEvent() {
		oDanmuVideo.addEventListener('play', handleVidePlay, false);
		oDanmuVideo.addEventListener('pause', handleVidePaused, false);
		oDanmuVideo.addEventListener('seeked', handleVideoSeek, false);
		oDanmuBtn.addEventListener('click', handleDanmuBtnClick, false);
	}
	function handleVidePlay() {
		videoDanmu.danmuPaused = false;
		videoDanmu.render();
	}
	function handleVidePaused() {
		videoDanmu.danmuPaused = true;
	}
	function handleVideoSeek() {
		videoDanmu.reset();
	}
	function handleDanmuBtnClick() {
		if (videoDanmu.danmuPaused) return;
		const inputValue = oDanmuInput.value.trim();
		if (inputValue.length === 0) return;

		const colorValue = oColorText.value;
		const currentTime = oDanmuVideo.currentTime;
		const _data = {
			content: inputValue,
			color: colorValue,
			runTime: currentTime,
		};
		videoDanmu.addDanmu(_data);
		oDanmuInput.value = '';
	}
	init();
})(document);
