let visionMedian = [
	.3, // red
	.8, // yellow
	.7, // green
	.7, // cyan
	.2, // blue
	.5, // magenta
	.3];// red

function hsl2visionHsl(h, s, l) {
	let hi = Math.floor(h / 60);
	let hi2 = hi + 1;
	let d = h - hi * 60;
	let m = (visionMedian[hi2] - visionMedian[hi]) * d / 60 + visionMedian[hi];
	let ml = l >= .5 ? ((l - .5) * (1 - m) / .5 + m) : (l * m / .5);
	let vl = (ml - l) * s + l;
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

function convert(h, s, l) {
	let [ht, st, lt] = hsl2visionHsl(h, s, l);
	lt = 1 - lt;
	return visionHsl2hsl(ht, st, lt);
}

export default { hsl2visionHsl, visionHsl2hsl, convert };