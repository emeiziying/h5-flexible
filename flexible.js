/**
 *
 * @param designWidth   设计稿宽度
 * @param designHeight  设计稿高度
 * @param orientation   内容方向 portrait || landscape
 * @param policy        适配策略 fixed_height || fixed_width || no_border
 */

var flexible = (function (designWidth, designHeight, orientation, policy) {
	designWidth  = designWidth || 640;
	designHeight = designHeight || 1008;
	orientation  = orientation || 'portrait';
	policy       = policy || 'fixed_width';

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

			console.log('setBodyFontSize');

			var width  = docEl.clientWidth;
			var height = docEl.clientHeight;

			console.log(width, height);

			if (docBo) {
				if (width < height) {
					docBo.style.transform = 'rotate(-90deg)';
					docBo.style.width     = height + 'px';
					docBo.style.height    = width + 'px';
				} else {
					docBo.style.transform = 'rotate(0)';
					// docBo.style.width     = width + 'px';
					// docBo.style.height    = height + 'px';
				}
			}

		} else {
			document.addEventListener('DOMContentLoaded', setBodyFontSize);
		}
	}

	setBodyFontSize();

	function resetRem() {

		console.log('resetRem');


		var rem    = 1;
		var width  = docEl.clientWidth;
		var height = docEl.clientHeight;

		console.log(width, height);


		var isWider = width / height > ( designWidth / designHeight);
		var isWidth = true;

		switch (policy) {
			case 'fixed_width':
				isWidth = true;
				break;
			case 'fixed_height':
				isWidth = false;
				break;
			case 'no_border':
				isWidth = isWider;
				break;
			default:
		}

		console.log(isWider);
		console.log(isWidth);

		if (isWidth) {
			rem = width * 100 / designWidth;
		} else {
			rem = height * 100 / designHeight;
		}

		if (docBo) {
			if (width < height) {
				docBo.style.transform = 'rotate(-90deg)';
				docBo.style.width     = height + 'px';
				docBo.style.height    = width + 'px';
			} else {
				docBo.style.transform = 'rotate(0)';
				docBo.style.width     = width + 'px';
				docBo.style.height    = height + 'px';
			}
		}

		console.log(rem);

		docEl.style.fontSize = rem + 'px';

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
}(640, 1008, 'portrait', 'no_border'));