/**
 *
 * @param designWidth   设计稿宽度
 * @param designHeight  设计稿高度
 * @param scalePolicy   缩放策略
 */

var Flexible = function (designWidth, designHeight, scalePolicy) {
	designWidth  = designWidth || 640;
	designHeight = designHeight || 1008;
	scalePolicy  = scalePolicy || 'no_border';

	var docEl = document.documentElement;
	var docBo = document.body;
	var dpr   = window.devicePixelRatio || 1;

	var canResize = true;
	var timer     = null;

	// 获取css
	function getCssText(w, h, r, x, y) {
		return 'transform-origin:0 0;transform:translate(' + x + 'px,' + y + 'px) rotate(' + r + 'deg);-webkit-transform:translate(' + x + 'px,' + y + 'px) rotate(' + r + 'deg);width:' + w + 'px;height:' + h + 'px;';
	}

	function getWHRXY(width, height) {
		var w = width;
		var h = height;
		var r = 0;
		var x = 0;
		var y = 0;

		// 设计稿横屏
		if (designWidth > designHeight) {
			// 屏幕竖屏
			if (width <= height) {
				w = height;
				h = width;
				r = 90;
				x = h;
			}
		}
		// 设计稿竖屏
		else {
			// 屏幕横屏
			if (width > height) {
				w = height;
				h = width;
				r = 90;
				x = h;
			}
		}

		return [w, h, r, x, y];
	}

	function getRem(w, h) {
		var ratioDWH = designWidth / designHeight;
		var ratioWH  = w / h;

		var isWider    = ratioWH > ratioDWH;
		var isFixWidth = false;

		switch (scalePolicy) {
			case 'fixed_width':
				isFixWidth = true;
				break;
			case 'fixed_height':
				isFixWidth = false;
				break;
			case 'no_border':
				isFixWidth = isWider;
				break;
			default:
		}

		var rem = (isFixWidth ? w / designWidth : h / designHeight) * 100;

		return rem;
	}

	// adjust body font size
	function setBodyFontSize() {
		if (document.body) {
			docBo                = document.body;
			docBo.style.fontSize = (12 * dpr) + 'px';

			var width  = docEl.clientWidth;
			var height = docEl.clientHeight;

			var whrxy = getWHRXY(width, height);

			var w = whrxy[0];
			var h = whrxy[1];
			var r = whrxy[2];
			var x = whrxy[3];
			var y = whrxy[4];

			docBo.style.cssText = getCssText(w, h, r, x, y);
		} else {
			document.addEventListener('DOMContentLoaded', setBodyFontSize);
		}
	}

	setBodyFontSize();

	function resetRem() {
		var width  = docEl.clientWidth;
		var height = docEl.clientHeight;

		var whrxy = getWHRXY(width, height);

		var w = whrxy[0];
		var h = whrxy[1];
		var r = whrxy[2];
		var x = whrxy[3];
		var y = whrxy[4];

		var rem = getRem(w, h);

		docEl.style.fontSize = rem + 'px';

		if (docBo) {
			docBo.style.cssText = getCssText(w, h, r, x, y);
		}

		timer = null;
	}

	resetRem();

	function resizeWithDelay(duration) {
		duration = duration || 0;
		timer && clearTimeout(timer);
		timer = setTimeout(resetRem, duration);
	}

	function initListener() {
		// reset rem unit on page resize
		window.addEventListener('resize', function () {
			if (canResize) {
				resizeWithDelay(300);
			}
		});

		if ('orientationchange' in window) {
			window.addEventListener('orientationchange', function () {
				resizeWithDelay(300);
			});
		}

		window.addEventListener('pageshow', function (e) {
			if (e.persisted) {
				resizeWithDelay(300);
			}
		});
	}

	initListener();

	function switchResize(result) {
		canResize = result != undefined ? result : !canResize;

		return canResize;
	}

	// detect 0.5px supports
	if (dpr >= 2) {
		var fakeBody             = document.createElement('body');
		var testElement          = document.createElement('div');
		testElement.style.border = '.5px solid transparent';
		fakeBody.appendChild(testElement);
		docEl.appendChild(fakeBody);
		if (testElement.offsetHeight === 1) {
			docEl.classList.add('hairlines')
		}
		docEl.removeChild(fakeBody)
	}

	return {
		switchResize: switchResize
	};
};