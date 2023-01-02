import { isArray, isObject } from '../util/utils.js';
import Danmu from './danmu.js';
class VideoDanmu {
	constructor(video, canvas, option) {
		if (!video || !canvas || !option || !isObject(option)) return false;
		if (!option.danmuData || !isArray(option.danmuData)) return false;
		this.video = video;
		this.canvas = canvas;
		this.canvasCtx = canvas.getContext('2d');
		this.canvas.width = video.offsetWidth;
		this.canvas.height = video.offsetHeight;
		this.danmuPaused = true;

		Object.assign(this, option, {
			speed: 2,
			runTime: 0,
			color: '#fff',
		});

		this.danmuPool = this.createDanmuPool();
		this.render();
		//console.log(this.danmuPool);
	}
	createDanmuPool() {
		return this.danmuData.map((dm) => new Danmu(dm, this));
	}
	render() {
		this.clear();
		this.drawDanmu();
		!this.danmuPaused && window.requestAnimationFrame(this.render.bind(this));
	}
	drawDanmu() {
		let currentTime = this.video.currentTime;
		this.danmuPool.map((danmu) => {
			if (!danmu.stopDrawing && currentTime >= danmu.runTime) {
				if (!danmu.isInitialized) {
					danmu.initialize();
					danmu.isInitialized = true;
				}
				danmu.X -= danmu.speed;
				danmu.draw();
				if (danmu.X <= danmu.width * -1) {
					danmu.stopDrawing = true;
				}
			}
		});
	}
	reset() {
		this.clear();
		let currentTime = this.video.currentTime;
		this.danmuPool.map((danmu) => {
			danmu.stopDrawing = false;
			if (currentTime <= danmu.runTime) {
				danmu.isInitialized = false;
			} else {
				danmu.stopDrawing = true;
			}
		});
	}
	addDanmu(data) {
		return this.danmuPool.push(new Danmu(data, this));
	}
	clear() {
		return this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

export default VideoDanmu;
