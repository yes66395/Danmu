import { getTextWidth, getTextPosition } from '../util/utils.js';
class Danmu {
	constructor(danmu, fCtx) {
		this.content = danmu.content;
		this.runTime = danmu.runTime;
		this.danmu = danmu;
		this.ctx = fCtx;
		this.initialize();
	}
	initialize() {
		this.color = this.danmu.color || this.ctx.color;
		this.speed = this.danmu.speed || this.ctx.speed;
		this.fontSize = 40;
		this.width = getTextWidth(this.content, this.fontSize);
		getTextPosition(this.ctx.canvas, this.fontSize, this);
	}
	draw() {
		this.ctx.canvasCtx.font = this.fontSize + 'px sans-serif';
		this.ctx.canvasCtx.fillStyle = this.color;
		this.ctx.canvasCtx.fillText(this.content, this.X, this.Y);
	}
}
export default Danmu;
