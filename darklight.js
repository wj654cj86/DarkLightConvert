import colorconvert from "./colorconvert.js";
let visionMedian = [
	.3, // red
	.9, // yellow
	.6, // green
	.7, // cyan
	.1, // blue
	.4, // magenta
	.3];// red

function hsl2visionHsl(h, s, l) {
	let [r, g, b] = colorconvert.hsl.rgb(h, s, l);
	let vl = (0.3 * r + 0.6 * g + 0.1 * b) / 255;
	return [h, s, vl];
}

function visionHsl2hsl(h, s, vl) {
	let hi = Math.floor(h / 60);
	let hi2 = hi + 1;
	let d = h - hi * 60;
	let m = (visionMedian[hi2] - visionMedian[hi]) * d / 60 + visionMedian[hi];
	let t = (2 * m - 1) * s;
	let l = vl / (t + 1);
	if (l > .5) l = (vl - t) / (1 - t);
	return [h, s, l];
}

function hslConvert(h, s, l) {
	let [ht, st, lt] = hsl2visionHsl(h, s, l);
	lt = 1 - lt;
	return visionHsl2hsl(ht, st, lt);
}

function rgb2visionHsl(r, g, b) {
	let [h, s, l] = colorconvert.rgb.hsl(r, g, b);
	let vl = (0.3 * r + 0.6 * g + 0.1 * b) / 255;
	return [h, s, vl];
}

function visionHsl2rgb(h, s, vl) {
	return colorconvert.hsl.rgb(...visionHsl2hsl(h, s, vl));
}

function rgbConvert(r, g, b) {
	let [ht, st, lt] = rgb2visionHsl(r, g, b);
	lt = 1 - lt;
	return visionHsl2rgb(ht, st, lt);
}

export default { hsl2visionHsl, visionHsl2hsl, hslConvert, rgb2visionHsl, visionHsl2rgb, rgbConvert };