let visionMedian = [
	.3, // red
	.9, // yellow
	.6, // green
	.7, // cyan
	.1, // blue
	.4, // magenta
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
