// ==UserScript==
// @name           LinkLocationbarLite.uc.js
// @namespace      无
// @include        main
// @version        2018.05.14 修正firefox 60+ by YYK
// @version        2018.01.25 修正地址栏边距
// ==/UserScript==

(function(){
	if (!isElementVisible(gURLBar)) return;

	var loadingStat = true;

	var Bar = $('urlbar'),
		sTxt = XULBrowserWindow.statusTextField;
	var additionBar = $C('label', {
		id: 'addtion-link',
		value: '',
//		crop: 'center',
//		flex: '1',
		style: "color: green; margin: 0px 0px 0px 1px; padding: 5px 0px 0px 0px; box-ordinal-group:99;"
	});
	Bar.appendChild(additionBar);
//	Bar.insertBefore(additionBar, Bar.firstChild);

	sTxt.__defineGetter__('label', function() {
		return this.getAttribute("label");
	});
	sTxt.__defineSetter__('label', function(str) {
		if (str) {
			this.setAttribute('label', str);
			var txt = str.substr(0, 39) + '...' + str.substr(str.length - 39, 39) + ' ';
			if (this.getAttribute('type') == 'overLink') {
				if (str.length > 80) {
					additionBar.value = '➥ ' + txt;
				} else {
					additionBar.value = '➥ ' + str + ' ';
				}
			} else {
				if (loadingStat == true) {
					if (str.length > 80) {
						additionBar.value = txt;
					} else {
						additionBar.value = str + ' ';
					}
				} else {
					this.style.opacity = 1;
					additionBar.value = '';
				}
			}
		} else {
			this.style.opacity = 0;
			additionBar.value = '';
		}
		if (this.style.opacity == 0) {
			sTxt.removeAttribute('mirror');
		}
		return str;
	});

	function $(id) { return document.getElementById(id);}

	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n)  { return el.setAttribute(n, attr[n]);});
		return el;
	}
})();