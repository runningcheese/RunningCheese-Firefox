// ==UserScript==
// @name           RemovableButton.uc.js
// @namespace   runningcheese@qq.com
// @description    新建一个可移动的功能按钮
// @author          runningcheese
// @version         0.0.2
// @license          MIT License
// @compatibility  Firefox 29+
// @charset         UTF-8
// @reviewURL     http://www.runningcheese.com/firefox-v8
// ==/UserScript==





//------------护眼模式-----------
(function () {
	CustomizableUI.createWidget({
		id : "EyesCare",
		label : "护眼模式",
		tooltiptext : "降低网页亮度",
		onClick : function (event) {
			switch (event.button) {
			case 0:
				// 左键：降低网页亮度
  (function(){
        var id = [12]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = !style.enabled;
            style.save();
        }
    })();
				break;
			case 1:
				break;
			case 2:
				break;
			}
		}
	});

	var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#EyesCare[cui-areatype="toolbar"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAP1BMVEUAAAAOCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB89Of5AAAAFHRSTlMADk8f+Ga55KiEB8R758tFMvLaltxBdUoAAABqSURBVBjTjU85DsAwCCtnkt4H/39rixKFDh3KYGwLjBh+FpV1OVPomYXKgqEVBkzQ9c4PnzAWsjxgEIbRyxidO9SVmGihtLqh4lgSAlyH043BG05mLPWM1kTQuSVnFhpJuPTcTc0s759/3jzyAsLvmRbSAAAAAElFTkSuQmCC)'
		 + '}}'
     + '#EyesCare[cui-areatype="menu-panel"] .toolbarbutton-icon, toolbarpaletteitem[place="palette"]> #EyesCare .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAnFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4jUzeAAAAM3RSTlMABhbv2a8D6uiaPi/ktYx0aiojHBDBvIR+b21jWFAI4Mmikol7RDk09tLQq4ZnSdGppJ/ob5bAAAABH0lEQVQ4y61S14KCMBCEhBggFJEm0otiv8L//9sJhDOC+2YeNpCZbGZnV/rk8pLyjLtKhmCLXuIdTqDraW4hyaF7CF/nTJLkUwzhuxPqownhuuE+4io/ALis3PutVaAEERl1aAC+MsbU1y1UoT/uIUSobF4K9ESh81q+AAJFXIu6WWBZH7qpPXW1IIR9OE4Ej7Yz3BoMMNzpP1HQS/1WN+gPni3cKoIMZPqYDae10FXcZFxepNb6aL5jCEPkmFSL9/dbiQmTSu5QcBNf3kS/JtHW7oNMvfGoVdFbgwJ7+roG7ybVLlb/9ZDLkpGKxsrEd+dTqrIXTxo1EpO4RJk3hplGyHg+XcNhthTlWAr2v7Wf4nhuENB5pCdxevCkj64/2IYP2pCFk/cAAAAASUVORK5CYII=)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
})();


//------------护眼模式-----------
(function () {
	CustomizableUI.createWidget({
		id : "NightMode",
		label : "黑夜模式",
		tooltiptext : "启用黑夜模式",
		onClick : function (event) {
			switch (event.button) {
			case 0:
  (function(){
        var id = [13]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = !style.enabled;
            style.save();
        }
    })();
				break;
			case 1:
				break;
			case 2:
				break;
			}
		}
	});

	var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#NightMode[cui-areatype="toolbar"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJUlEQVQ4jZWSMUpDQRRFryF8fecaJK2oO9B1hKzAMkX6tKYxmEJ7iSiiTbAJ2KQQsQ6K2AluQCslIIhZgM1PEfPz/V6YYubNPe8xc6V5lWw3gBHwna6R7YakUsb9GSXAEHiwXZNUkVSxXQPugaGkZKEb6NkeSCpnlMu2B8BxpjkiNm2PJVVzJqzaHkfERlb3ZkT0c8zTRn2gmQXoAgd/AYAO0M0it4DTAoBeRLTmCkmSbAOvyntlaRV4S5JkZxH9GjiTtJRRXgFugIu8CdeAR+DkF2QZuLN9pewvnlEFeIqI3elBmsxbFUji1NAGziWFJIBL2+1C5hSwZ/sDmAAT2+8RcfQvAHA43acZ6RQGAHXbL8B6RGzZfgbqhQEpZN/2p+2vvO4/qg0zQkGEWXwAAAAASUVORK5CYII=)'
		 + '}}'
     + '#NightMode[cui-areatype="menu-panel"] .toolbarbutton-icon, toolbarpaletteitem[place="palette"]> #NightMode .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABbUlEQVRYhe2WrW7DMBRGj1QppKBkbCSkDxEwBY2UlYRUKtoLlO0NRqqCkb5CwdBY4WBBccBIQMgGBksz4GspixTHf9mkbUcySa7v98XX1w7840YCFMABqIAGuACvwBOwlphRKEToCNwBKTABpsBcnh0lpogpPAH2kji3iM8ldi9zg9kCL8DMYc5M5mxDxQugdBRvmygJKEcC1EDmm0Dm1nhuzBVqU4VylFzO6LYKZSW5nClR7dXHAnhDLfHCEJeizgxnPlA93ofeH5kY6SNBHVbOXDBvngq4kVGPYaDCrgTvmEswx7MEB4Y34T3wMBCzllzO2LShjQHvNkxQS3cbYCCTHN435FIS9B3FJgP6KF76imt2wBm4cjCgL6NdqHjbRAlcWxhIJfYxlnhb7MzXenYNJCK+iS2uee4k7xrYSMxo5MDJYOCE3V+TN1PUsdr0jKH7IwqN57vfZcA0vsWAz7uoBv72CmihH/n66HwCrNJviuzT870AAAAASUVORK5CYII=)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
})();



//------------小窗模式-----------
(function () {
	CustomizableUI.createWidget({
		id : "MiniWindowMode",
		label : "小窗模式",
		tooltiptext : "启用小窗模式",
		onClick : function (event) {
			switch (event.button) {
			case 0:
  (function(){
       {window.open(decodeURIComponent(gBrowser.currentURI.spec), "_blank","resizable,scrollbars,status,title").resizeTo(430, 670); }
    })();
				break;
			case 1:
				break;
			case 2:
				break;
			}
		}
	});

	var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#MiniWindowMode[cui-areatype="toolbar"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYElEQVQ4jb2TsQ3AMAgEbzEGSJX9F2CINKTBhbGSCIh8kss/Y8DwAweggCWPehYFpHi54rYqtk0Q3/8qEOBi7ssS+qpgSM6M4Glcsq2CGG71IJKaQgYDX8cCMrLtz9TiBmoOUrzKcbL+AAAAAElFTkSuQmCC)'
		 + '}}'
     + '#MiniWindowMode[cui-areatype="menu-panel"] .toolbarbutton-icon, toolbarpaletteitem[place="palette"]> #MiniWindowMode.toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAdUlEQVRYhe3XwQnAIBBE0d+JpaT/WlJEcslBQrJExVkDM7BH8YGyq+AslkNUIWB2DPgnoGQCCrADWxaAa/MI0XJ03XcgQkgAEUIGeENIAU8IOeCOSAHUCAmge8K1RNGKpwLS3wNf1htggAHrA0Y+GsONyJHnBIpnionzKOIUAAAAAElFTkSuQmCC)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
})();



