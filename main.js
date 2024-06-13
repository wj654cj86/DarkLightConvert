import colorconvert from "./colorconvert.js";
import darklight from "./darklight.js";

function 設定顏色(字背) {
	let 字背css = 字背 == '字' ? 'color' : 'backgroundColor';
	let 原 = document.querySelector(`#原${字背}色`);
	let 原hsl = colorconvert.hex.hsl(原.value);
	原色示範.style[字背css] = 原.value;
	let 新 = document.querySelector(`#新${字背}色`);
	let 新hsl = darklight.convert(...原hsl);
	新.value = colorconvert.hsl.hex(...新hsl);
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
		let [h2, s2, l2] = darklight.visionHsl2hsl(...darklight.hsl2visionHsl(h, s, l))
		if (l.toFixed(3) == l2.toFixed(3)) count++;
		console.log(l.toFixed(3) == l2.toFixed(3),
			'h:' + h.toFixed(3),
			's:' + s.toFixed(3),
			'l:' + l.toFixed(3),
			'l2:' + l2.toFixed(3));
	}
	console.log(count);
}
