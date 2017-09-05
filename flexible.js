/**
 *
 * @param designWidth   设计稿宽度
 * @param designHeight  设计稿高度
 */

var flexible = (function (designWidth, designHeight) {
	designWidth  = designWidth || 640;
	designHeight = designHeight || 1008;

	var docEl = document.documentElement;
	var docBo = document.body;
	var dpr   = window.devicePixelRatio || 1;

	var canResize = true;
	var timer     = null;

	// adjust body font size
	function setBodyFontSize() {
		if (document.body) {
			docBo                = document.body;
			docBo.style.fontSize = (12 * dpr) + 'px';

			var width  = docEl.clientWidth;
			var height = docEl.clientHeight;

			var w = width;
			var h = height;
			var r = 0;
			var x = 0;
			var y = 0;

			if (designWidth > designHeight) {
				if (width > height) {

				} else {
					w = height;
					h = width;
					r = -90;
					y = w;
				}
			} else {
				if (width > height) {
					w = height;
					h = width;
					r = -90;
					y = w;
				} else {

				}
			}

			docBo.style.transformOrigin = '0 0';
			docBo.style.transform       = 'translate(' + x + 'px,' + y + 'px) rotate(' + r + 'deg)';
			docBo.style.width           = w + 'px';
			docBo.style.height          = h + 'px';
		} else {
			document.addEventListener('DOMContentLoaded', setBodyFontSize);
		}
	}

	setBodyFontSize();

	function resetRem() {

		console.log('resetRem');

		var width  = docEl.clientWidth;
		var height = docEl.clientHeight;
		var rem    = 1;


		var w = width;
		var h = height;
		var r = 0;
		var x = 0;
		var y = 0;

		if (designWidth > designHeight) {
			if (width > height) {

			} else {
				w = height;
				h = width;
				r = -90;
				y = w;
			}
		} else {
			if (width > height) {
				w = height;
				h = width;
				r = -90;
				y = w;
			} else {

			}
		}

		rem = w * 100 / designWidth;

		docEl.style.fontSize = rem + 'px';

		if (docBo) {
			docBo.style.transformOrigin = '0 0';
			docBo.style.transform       = 'translate(' + x + 'px,' + y + 'px) rotate(' + r + 'deg)';
			docBo.style.width           = w + 'px';
			docBo.style.height          = h + 'px';
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
		canResize = result;
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
}(640, 1008));