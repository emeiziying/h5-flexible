(function (designWidth, designHeight) {
	designWidth  = designWidth || 640;
	designHeight = designHeight || 1008;

	var docEl    = document.documentElement;
	var remStyle = document.createElement("style");
	var dpr      = window.devicePixelRatio || 1;
	var tid      = null;

	function refreshRem() {
		var width  = docEl.getBoundingClientRect().width;
		var height = docEl.getBoundingClientRect().height;

		var rem = width * 100 / designWidth;

		remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
	}

	if (docEl.firstElementChild) {
		docEl.firstElementChild.appendChild(remStyle);
	} else {
		var wrap = document.createElement("div");
		wrap.appendChild(remStyle);
		document.write(wrap.innerHTML);
		wrap = null;
	}

	//要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
	refreshRem();

	window.addEventListener("resize", function () {
		clearTimeout(tid); //防止执行两次
		tid = setTimeout(refreshRem, 300);
	}, false);

	window.addEventListener("pageshow", function (e) {
		if (e.persisted) { // 浏览器后退的时候重新计算
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);

	if (document.readyState === "complete") {
		document.body.style.fontSize = "16px";
	} else {
		document.addEventListener("DOMContentLoaded", function (e) {
			document.body.style.fontSize = "16px";
		}, false);
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
		docEl.removeChild(fakeBody);
	}
}(640, 1008));