import colorconvert from "./colorconvert.js";
import darklight from "./darklight.js";

function 設定顏色(字背) {
	let 字背css = 字背 == '字' ? 'color' : 'backgroundColor';
	let 原 = document.querySelector(`#原${字背}色`);
	let 原rgb = colorconvert.hex.rgb(原.value);
	原色示範.style[字背css] = 原.value;
	let 新 = document.querySelector(`#新${字背}色`);
	let 新rgb = darklight.rgbConvert(...原rgb);
	新.value = colorconvert.rgb.hex(...新rgb);
	新色示範.style[字背css] = 新.value;
}

設定顏色('字');
設定顏色('背');

原色示範.innerHTML = 新色示範.innerHTML = 示範文字.value.replace('\n', '<br>');

原字色.onchange = () => 設定顏色('字');
原背色.onchange = () => 設定顏色('背');
示範文字.onchange = () => 原色示範.innerHTML = 新色示範.innerHTML = 示範文字.value.replace('\n', '<br>');

function 測試() {
	let count = 0;
	for (let i = 0; i < 1000; i++) {
		let [h, s, l] = [Math.random() * 360, Math.random(), Math.random()];
		let [h2, s2, l2] = darklight.visionHsl2hsl(...darklight.hsl2visionHsl(h, s, l));
		[l, l2] = [l, l2].map(l => l.toFixed(2));
		if (l == l2) count++;
		console.log(l == l2,
			'h:' + h.toFixed(0),
			's:' + s.toFixed(2),
			'l:' + l,
			'l2:' + l2);
	}
	console.log(count);
}

function 測試2() {
	let count = 0;
	for (let i = 0; i < 1000; i++) {
		let [r, g, b] = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
		let [r2, g2, b2] = darklight.visionHsl2rgb(...darklight.rgb2visionHsl(r, g, b));
		[r, g, b] = [r, g, b].map(c => c.toFixed(0));
		[r2, g2, b2] = [r2, g2, b2].map(c => c.toFixed(0));
		let bl = r == r2 && g == g2 && b == b2;
		if (bl) count++;
		console.log(bl,
			'r:' + r,
			'g:' + g,
			'b:' + b,
			'r2:' + r2,
			'g2:' + g2,
			'b2:' + b2);
	}
	console.log(count);
}
