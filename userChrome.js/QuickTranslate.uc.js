// ==UserScript==
// @name          QuickTranslate.uc.js
// @description   可移动多功能翻译按钮
// @author         Runningcheese
// @reference     Crab
// @namespace   https://www.runningcheese.com
// @include        main
// @license         MIT License
// @compatibility  Firefox 57+
// @charset        UTF-8
// @update        v2018-05-07 fix translateion problem
// @update        v2018-03-18 fix for 57+
// @version        v2016-12-12 
// @version        v2016-01-05 
// @version        v2016-12-12 
// @homepage    https://www.runningcheese.com/v10
// ==/UserScript==

//载入脚本
function jsonToDOM(json, doc, nodes) {

    var namespaces = {
        html: 'http://www.w3.org/1999/xhtml',
        xul: 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul'
    };
    var defaultNamespace = namespaces.html;

    function namespace(name) {
        var m = /^(?:(.*):)?(.*)$/.exec(name);        
        return [namespaces[m[1]], m[2]];
    }

    function tag(name, attr) {
        if (Array.isArray(name)) {
            var frag = doc.createDocumentFragment();
            Array.forEach(arguments, function (arg) {
                if (!Array.isArray(arg[0]))
                    frag.appendChild(tag.apply(null, arg));
                else
                    arg.forEach(function (arg) {
                        frag.appendChild(tag.apply(null, arg));
                    });
            });
            return frag;
        }

        var args = Array.slice(arguments, 2);
        var vals = namespace(name);
        var elem = doc.createElementNS(vals[0] || defaultNamespace, vals[1]);

        for (var key in attr) {
            var val = attr[key];
            if (nodes && key == 'id')
                nodes[val] = elem;

            vals = namespace(key);
            if (typeof val == 'function')
                elem.addEventListener(key.replace(/^on/, ''), val, false);
            else
                elem.setAttributeNS(vals[0] || '', vals[1], val);
        }
        args.forEach(function(e) {
            try {
                elem.appendChild(
                                    Object.prototype.toString.call(e) == '[object Array]'
                                    ?
                                        tag.apply(null, e)
                                    :
                                        e instanceof doc.defaultView.Node
                                        ?
                                            e
                                        :
                                            doc.createTextNode(e)
                                );
            } catch (ex) {
                elem.appendChild(doc.createTextNode(ex));
            }
        });
        return elem;
    }
    return tag.apply(null, json);
}


//定义按钮
CustomizableUI.createWidget({
    id: 'QuickTranslate',
    defaultArea: CustomizableUI.AREA_NAVBAR,
    label: '翻译',
    tooltiptext: '左键：翻译\n右键：翻译选项',
    onCreated: function(aNode) {
        aNode.setAttribute('oncommand', 'PageTranslationOpenWindowICIBA();');     

        
 //定义菜单      
        var myMenuJson = 
                                ['xul:menupopup', {id: 'QuickTranslate_pop'},

                                ['xul:menuitem', {label: '有道页内翻译',oncommand: 'event.stopPropagation(); PageTranslationYoudao();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyklEQVQ4jc1QsQ3CMBB0R5seJJ/F2wPQpUtHSwN1RoiYgA0YgVEYIQNQuEFCiS1lhNDg5IE4gQpO+ub0d39/QvwVaujcK9N6ZVoP3dwACCFErWjH+VGTblGZNhhYIOF8VHyd06K/ZOwU/wYnacWingJfSUoD76DPUYPnRSq6bhRte94c4gagNbtUOlBWSUqdpH2fbLn57IXIhGIHcRE043FDaTxVVDwECyTcoIbORwUO+uhA2WOKr6/H/nbQpQWSaQPo5lU4GfvnuAOO7rs1HAnRyQAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '谷歌页内翻译',oncommand: 'event.stopPropagation(); PageTranslationGoogleInPage();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVklEQVQ4jY3TzU4TURwF8PEBeAiew4WBBBQ6lBaQmhhduWKhMUYSIyYqIbadaacWhSA1GgOGREiMVCrqQiUBIVhipnbu5E4/cL6IkrTQe9fHRduRABEXZ/k7/3MXVxhMMPV8gmMgwdGf4OhTOIIKRyDO4Q/vjgI49a8IHjyEe+McPZEKPbHAw4cLYhx+meHG9HZHuVxuPS6EkBahCQ9f741x+GMc8qufcBwXOzs7cF0XjuPAtm3Ytg3TNE0h2IBBhSOUZHB/VTC5vA9/o+BS8jfyeR2u63pxHMcrEgLx+tVAnCPxdh+LG3tQi1X4Yxw9MocoMSx91mAYhgcPrhB6D0zO0ipG5mpYJ1XcnK1BlDlEiWN0xsD6ZhbR1AyWV9aQ1yl0o9AoiNXxtec1lO0KVvNVZGkVmW97ECUOn8Qhjm1jRJnG3fGnuKVM4Wr4MVLz6XpB860La3tQ0vsQZY6gwlCwKriQZPBJHN2RGu5PpbHydQMTs/OYS7+HZVmwLAtCj8whyhyXJxmCCoMo1WdffMQQiDN0Rxm6ogxDDzdxPTyOYXkCRNdRLBZhmiaEJmjG10h39C/uijAMSA6G7im4nXiCPCEoFAoolUoQfFHmoSOwgc9FGM6Ga5jLZDHzegl3kilopL5C6Hqw6x5BDfgXM3SGGcZelkCIjsUPn7wVwulh0tI5QlqPy5krHzvaQhm0hd6hPZTB9Ow6NI2AUgpKab3gpM/S3v+GdgwuIfViFar6A4QQ6LoOSikMw/iPgr6F0alnX7C19R2qqiKXy0HTNBBCkMvltD/vDPwyHNhJmwAAAABJRU5ErkJggg=='}],
                                ['xul:menuseparator', {}],
                                ['xul:menuitem', {label: '谷歌弹窗翻译',oncommand: 'event.stopPropagation(); PageTranslationGoogle();',tooltiptext: '注意：需科学上网',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVklEQVQ4jY3TzU4TURwF8PEBeAiew4WBBBQ6lBaQmhhduWKhMUYSIyYqIbadaacWhSA1GgOGREiMVCrqQiUBIVhipnbu5E4/cL6IkrTQe9fHRduRABEXZ/k7/3MXVxhMMPV8gmMgwdGf4OhTOIIKRyDO4Q/vjgI49a8IHjyEe+McPZEKPbHAw4cLYhx+meHG9HZHuVxuPS6EkBahCQ9f741x+GMc8qufcBwXOzs7cF0XjuPAtm3Ytg3TNE0h2IBBhSOUZHB/VTC5vA9/o+BS8jfyeR2u63pxHMcrEgLx+tVAnCPxdh+LG3tQi1X4Yxw9MocoMSx91mAYhgcPrhB6D0zO0ipG5mpYJ1XcnK1BlDlEiWN0xsD6ZhbR1AyWV9aQ1yl0o9AoiNXxtec1lO0KVvNVZGkVmW97ECUOn8Qhjm1jRJnG3fGnuKVM4Wr4MVLz6XpB860La3tQ0vsQZY6gwlCwKriQZPBJHN2RGu5PpbHydQMTs/OYS7+HZVmwLAtCj8whyhyXJxmCCoMo1WdffMQQiDN0Rxm6ogxDDzdxPTyOYXkCRNdRLBZhmiaEJmjG10h39C/uijAMSA6G7im4nXiCPCEoFAoolUoQfFHmoSOwgc9FGM6Ga5jLZDHzegl3kilopL5C6Hqw6x5BDfgXM3SGGcZelkCIjsUPn7wVwulh0tI5QlqPy5krHzvaQhm0hd6hPZTB9Ow6NI2AUgpKab3gpM/S3v+GdgwuIfViFar6A4QQ6LoOSikMw/iPgr6F0alnX7C19R2qqiKXy0HTNBBCkMvltD/vDPwyHNhJmwAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '必应弹窗翻译',oncommand: 'event.stopPropagation(); PageTranslationBing();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMUlEQVQ4jY2SsU7DMBCG/TJYYqpEPDojcbq0NGM7sXdnggnigYFOyVDqLLBAkRJLTIwJSwdYw8gj8AQ/Q0kaO6HNSZbPp/P332+ZkJ7hSo2uvNdFV2rwMEOVGw28UVjl5bZZaqi8hA3aqzB/KOBKDVWUrcZ6ir/dgLlSY/HxAx5mmD++d15u7jzMjDNxpcbZyzeE+mz563o4bteaY9nj2bktwP97F7upS72yUgdLfNDIA428g9SD/6APZG84SoDGwoDQeFurly3CEh+OEmBKIFgPcWwBCCHkKPJwt7nA+dvIFBg/C9wUV3VhsbnF4L4NmKYT0Fjg9HVoApgSSL/WBuBkZQKm6QQ08jDLgraF8ZPAdX6JJnCw3AFo5IHGArMs2NVsi44SYIkPlviozraFrvgFK3TyTsPvtF8AAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: '百度弹窗翻译',oncommand: 'event.stopPropagation(); PageTranslationBaidu();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaWSy0sCURjF/XfuRugukha1CzeBCBKIFFFIBEGrCoRwE4EErlskoYW0EFy0iBAkCMFNBCGuKrqjNg6OgzOTjY+5nhbh3ehMrw/O8vud73E8hDL8Rx5CGf5ajoBCsQuvT0IubwIATk51xA/bsPkPAdFtBYQyLIXeUCpbYtybQtcd0Na+LHb2WiCUYTXaRC5vCsBdyXIG3D/0QCjD2qaCl9cB9g9UPFb66OgcuzEVmayBpmKjVLamAxJJTTg9PQ+mHm1+sQ5CGS4ujUlAJmuAUIaZOQkdnaNS7SMYlhGKyKjVh7B6I2EQi6uTAJsDV9fvqFT7YNIQsws10eAPNNDWODa2FHh9Eoq3H85faKk2/IHGRGCWV2RYvZH7Fzo6n9o8VmS9CcPkzoBUWv82umfnhjNgfEg3pdK6M8AwuUihP9DA0bGGRFJDMCyLYLmu8NsSgP/oExgMERjFwInkAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '沪江划词翻译',oncommand: 'event.stopPropagation(); PageTranslationXiaod();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA/klEQVQ4jaWTrQoCQRSFbxK0GDRosFjF6BvYtmwWfACzUQQfYN9BLD7ANtMW1x88iiKoiCCbRFxcgwYvjGvRgUGU3TV85TDzMXM5l8iiNNlkUJ/MUNhkkEVpel1GJGwy6GUE9QnJURKZceaD2CD2TWIqgvaxDd/3P2DB6Hk9FKaFaII3Zz4jj3wwgXWxoK001Pd1eOzJvHPsBBN0T115sLarydxlN7ygtCgpX0mNUuEExVlREWTH2XCC8rIsc/EQiA/jwQWJYQKma8p8fp0Hm8FN3HC4H8CCledXNpVoPeAHo+E0fhdJX+toOS2FptNEdVtFbpL7UuW/l+nPdX4C2sIzGfYkF+oAAAAASUVORK5CYII='}],
                                ['xul:menuseparator', {}],
                                ['xul:menuitem', {label: '繁体转为简体',oncommand: 'event.stopPropagation(); PageTranslationSimpleChinese();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAAAAAADs4udxvSaxAAAAAXRSTlMAQObYZgAAABtJREFUCNdjQADW0BAgycaAi2ANAbEccBMgAABgfgLQN3XpGgAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '简体转为繁体',oncommand: 'event.stopPropagation(); PageTranslationTraditionalChinese();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAAAAAADs4udxvSaxAAAAAXRSTlMAQObYZgAAABtJREFUCNdjQAKsoSFAUoUBK8EaAmI54CHAAACTvgQ4AxXYAgAAAABJRU5ErkJggg=='}],

                               ];
        aNode.appendChild(jsonToDOM(myMenuJson, aNode.ownerDocument, {}));
        aNode.setAttribute('contextmenu', 'QuickTranslate_pop');
    }
});


//定义图标
var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#QuickTranslate .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+UlEQVQ4jbXTrU7EUBAF4M9geAE0DrMOQbIKi22CQuFQ+whVfYAaHA+xYhWiom5FLX5NxSYkuEpEp5u7pbRBcJIrZu78nDN3Lv+AKxRo0MVpkMfdLDIcUWKNJ9T4xCHusrnkFrdhP0bnzSiuxfMU7SNWiS/HdqLROhidycmD9hjvkTDGq35OJzS/BG71UsYY5J3Q4WIisMJ1Yt+E/RY5iwW2emkbvZzh1Piak5DhLrpV2OElmlxG7JmEdIgl9km3+wlmpdEQ02fcJ/5d0E2xitgfWzksUhV06yj2MEpuLWxjpx9Qodc7aC4trHIqp8BHUqwJ3+Jn+jO+AVv+QUmXPpATAAAAAElFTkSuQmCC)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);




//定义函数
 function	PageTranslationYoudao() {	gBrowser.loadURI("javascript:%20void((function()%20{var%20element%20=%20document.createElement('script');element.id%20=%20'outfox_seed_js';element.charset%20=%20'utf-8',element.setAttribute('src',%20'http://fanyi.youdao.com/web2/seed.js?'%20+%20Date.parse(new%20Date()));document.body.appendChild(element);})())");};

function PageTranslationGoogle() {
		gBrowser.loadURI("javascript:(function(){var%20t=((window.getSelection&&window.getSelection())||(document.getSelection&&document.getSelection())||(document.selection&&document.selection.createRange&&document.selection.createRange().text));var%20e=(document.charset||document.characterSet);if(t!=''){window.open('https://translate.google.com/translate_t?hl=zh-CN#auto|zh-CN|'+t);}else{window.open('https://translate.google.com/translate?u='+decodeURIComponent(location.href)+'&hl=zh-CN&ie='+e+'&sl=auto&tl=zh-CN');};})();");
	};



 function PageTranslationGoogleInPage() {
		gBrowser.loadURI("javascript:{d=document;b=d.body;o=d.createElement('scri'+'pt');o.setAttribute('src','https://translate.glgoo.com/translate_a/element.js?cb=googleTranslateElementInit');o.setAttribute('type','text/javascript');b.appendChild(o);v=b.insertBefore(d.createElement('div'),b.firstChild);v.id='google_translate_element';v.style.display='none';p=d.createElement('scri'+'pt');p.text='function%20googleTranslateElementInit(){new%20google.translate.TranslateElement({pageLanguage:%22%22},%22google_translate_element%22);}';p.setAttribute('type','text/javascript');b.appendChild(p);}void%200");
	};

  function  PageTranslationBing() {
		gBrowser.addTab('www.microsofttranslator.com/bv.aspx?from=&to=zh-CHS&a=' + decodeURIComponent(gBrowser.currentURI.spec)); 
	};

  function  PageTranslationBingInPage() {
		gBrowser.loadURI('www.microsofttranslator.com/bv.aspx?from=&to=zh-CHS&a=' + decodeURIComponent(gBrowser.currentURI.spec)); 
	};

  function  PageTranslationBaidu() {
		gBrowser.loadURI("javascript:(function(){window.open('http://fanyi.baidu.com/transpage?query='+unescape(document.location.href)+'&from=auto&to=zh&source=url&render=1')})();");
	};

  function PageTranslationXiaod() {
		gBrowser.loadURI("javascript:void((function(){hjelm=document.createElement('script');hjelm.setAttribute('src','http://dict.hjenglish.com/app/js/dict_ajax.js');document.body.appendChild(hjelm);})())");
	};

 
function PageTranslationOpenWindowICIBA(event) {
window.open("http://m.iciba.com/","爱词霸翻译","resizable,scrollbars,status,title","centerscreen").resizeTo(420, 670);
};


  function PageTranslationSimpleChinese() {
		gBrowser.loadURI('javascript:(function(){var%20s=document.getElementById("tongwenlet_cn");if(s!=null){document.body.removeChild(s);}var%20s=document.createElement("script");s.language="javascript";s.type="text/javascript";s.src="https://git.oschina.net/runningcheese/JiathisQR.js/raw/master/bookmarklet_cn.js";s.id="tongwenlet_cn";document.body.appendChild(s);%20})();');
	};


  function PageTranslationTraditionalChinese() {
		gBrowser.loadURI('javascript:(function(){var%20s=document.getElementById("tongwenlet_tw");if(s!=null){document.body.removeChild(s);}var%20s=document.createElement("script");s.language="javascript";s.type="text/javascript";s.src="https://git.oschina.net/runningcheese/JiathisQR.js/raw/master/bookmarklet_tw.js";s.id="tongwenlet_tw";document.body.appendChild(s);%20})();');
	};


//引入 FGgTranslator 翻译代码
messageManager.loadFrameScript('data:application/javascript;charset=UTF-8,'+ encodeURIComponent('('+ (function(){
// @name           FGgTranslator
// @author         Crab
// @version        2016.09.17.1.2.6
// @Note           gBrowser.selectedBrowser.messageManager.sendAsyncMessage('FGgTranslator', readFromClipboard());
// ==/FireGesturesScript==
	var FGgTranslator = {
			offset: {
				x: 50,   //翻译框出现的位置相对于鼠标手势结束时的横坐标位移
				y: 10,   //纵坐标位移, 值越大越往 上/左
			},
			google: 'https://translate.google.cn/',
			//link: 'http://173.194.127.152/', //直接使用服务器IP，
											 //可以换一个比较通畅的google翻译服务器地址或IP,
											 //注意地址或IP最后还有还有"/"。
			service: 'baidu',
			bingAppId: '',
			selectText: null,
			boxElements:null,
			to: 'zh',
			from: 'auto',
			checkLanguge: 'auto',
			camelCase: false,
			preSelection: [],
			originDocument: null,
			_languages:{
				'google-bing':{
					en: '英语 English',
					ja: '日语 Japanese',
					fr: '法语 French',
					ru: '俄语 Russian',
					de: '德语 German',
					ko: '韩语 Korean',
					ar: '阿拉伯语 Arabic',
					et: '爱沙尼亚语 Estonian',
					bg: '保加利亚语 Bulgarian',
					pl: '波兰语 Polish',
					fa: '波斯语 Persian',
					da: '丹麦语 Danish',
					fi: '芬兰语 Finnish',
					ht: '海地克里奥尔语 Haitian Creole',
					nl: '荷兰语 Dutch',
					ca: '加泰罗尼亚语 Catalan',
					cs: '捷克语 Czech',
					lv: '拉脱维亚语 Latvian',
					lt: '立陶宛语 Lithuanian',
					ro: '罗马尼亚语 Romanian',
					mt: '马耳他语 Maltese',
					ms: '马来语 Malay',
					no: '挪威语 Norwegian',
					pt: '葡萄牙语 Portuguese',
					sv: '瑞典语 Swedish',
					sk: '斯洛伐克语 Slovak',
					sl: '斯洛文尼亚语 Slovenian',
					th: '泰语 Thai',
					tr: '土耳其语 Turkish',
					cy: '威尔士语 Welsh',
					ur: '乌尔都语 Urdu',
					uk: '乌克兰语 Ukrainian',
					el: '希腊语 Greek',
					es: '西班牙语 Spanish',
					hu: '匈牙利语 Hungarian',
					it: '意大利语 Italian',
					hi: '印地语 Hindi',
					id: '印尼语 Indonesian',
					vi: '越南语 Vietnamese',
				},
				google: {
					'zh-TW': '中文(繁体)',
					'zh-CN': '中文(简体)',
					sq: '阿尔巴尼亚语 Albanian',
					az: '阿塞拜疆语 Azerbaijani',
					ga: '爱尔兰语 Irish',
					eu: '巴斯克语 Basque',
					be: '白俄罗斯语 Belarusian',
					is: '冰岛语 Icelandic',
					bs: '波斯尼亚语 Bosnian',
					af: '布尔语(南非荷兰语) Afrikaans',
					tl: '菲律宾语 Filipino',
					km: '高棉语 Khmer',
					ka: '格鲁吉亚语 Georgian',
					gu: '古吉拉特语 Gujarati',
					ha: '豪萨语 Hausa',
					gl: '加利西亚语 Galician',
					kn: '卡纳达语 Kannada',
					hr: '克罗地亚语 Croatian',
					la: '拉丁语 Latin',
					lo: '老挝语 Lao',
					mr: '马拉地语 Marathi',
					mk: '马其顿语 Macedonian',
					mi: '毛利语 Maori',
					mn: '蒙古语 Mongolian',
					bn: '孟加拉语 Bengali',
					hmn: '苗语 Hmong',
					zu: '南非祖鲁语 Zulu',
					ne: '尼泊尔语 Nepali',
					pa: '旁遮普语 Punjabi',
					sr: '塞尔维亚语 Serbian',
					eo: '世界语 Esperanto',
					sw: '斯瓦希里语 Swahili',
					ceb: '宿务语 Cebuano',
					so: '索马里语 Somali',
					te: '泰卢固语 Telugu',
					ta: '泰米尔语 Tamil',
					iw: '希伯来语 Hebrew',
					hy: '亚美尼亚语 Armenian',
					ig: '伊博语 Igbo',
					yi: '意第绪语 Yiddish',
					jw: '印尼爪哇语 Javanese',
					yo: '约鲁巴语 Yoruba'
				},
				bing: {
					'zh-CHT': '中文(繁体)',
					'zh-CHS': '中文(简体)',
					mww: '白苗文 Hmong Daw',
					tlh: '克林贡语 Klingon',
					he: '希伯来语 Hebrew'
				},
				baidu:{
					cht: '中文(繁体)',
					zh: '中文(简体)',
					en: '英语',
					yue: '粤语',
					wyw: '文言文',
					jp: '日语',
					de: '德语',
					ru: '俄语',
					fra: '法语',
					kor: '韩语',
					est: '爱沙尼亚语',
					ara: '阿拉伯语',
					bul: '保加利亚语',
					pl: '波兰语',
					dan: '丹麦语',
					fin: '芬兰语',
					nl: '荷兰语',
					cs: '捷克语',
					rom: '罗马尼亚语',
					pt: '葡萄牙语',
					swe: '瑞典语',
					slo: '斯洛文尼亚语',
					th: '泰语',
					spa: '西班牙语',
					el: '希腊语',
					it: '意大利语',
					hu: '匈牙利语'
				},
				langMap: [
					['zh-CN', 'zh-CHS', 'zh'],
					['zh-TW', 'zh-CHT', 'cht'],
					['ar', 'ar', 'ara'],
					['fr', 'fr', 'fra'],
					['ko', 'ko', 'kor'],
					['ja', 'ja', 'jp'],
					['es', 'es', 'spa'],
					['et', 'et', 'est'],
					['bg', 'bg', 'bul'],
					['da', 'da', 'dan'],
					['fi', 'fi', 'fin'],
					['ro', 'ro', 'rom'],
					['sv', 'sv', 'swe'],
					['sl', 'sl', 'slo']
				],
				baiduLM: {
					zh: '',
					cht: '',
					en: ['yue', 'wyw'],
					jp: ['yue', 'wyw'],
					yue: 'zh,cht',
					th: ['yue', 'wyw'],
					ara: ['yue', 'wyw'],
					est: ['yue', 'wyw'],
					bul: ['yue', 'wyw'],
					pl: ['yue', 'wyw'],
					fra: ['yue', 'wyw'],
					fin: ['yue', 'wyw'],
					spa: ['yue', 'wyw'],
					dan: ['yue', 'wyw'],
					wyw: 'zh,cht',
					kor: ['yue', 'wyw'],
					ru: ['yue', 'wyw'],
					pt: ['yue', 'wyw'],
					de: ['yue', 'wyw'],
					it: ['yue', 'wyw'],
					cs: ['yue', 'wyw'],
					rom: ['yue', 'wyw'],
					swe: ['yue', 'wyw'],
					slo: ['yue', 'wyw'],
					hu: ['yue', 'wyw'],
					el: ['yue', 'wyw'],
					nl: ['yue', 'wyw']
				}
			},

			get languages(){
				var _l = this._languages,
					s = _l[this.service];
					l = {},
					gb = 'google-bing';
				if(!!~gb.indexOf(this.service))
					for(var i in _l[gb]) l[i] = _l[gb][i];
				for(var i in s) l[i] = s[i];
				return l;
			},

			init: function(event, clipboardText){
				if(!content.document.body) return;
				this.selectText = this.getSelection(event);
				if(this.selectText.replace(/\s+/g,'') === ''){
					if(clipboardText && clipboardText.trim()){
						this.selectText = clipboardText.replace(/\n+/g,'\n');
					}else{
						return;
					}
				}

				if(!this.boxElements){
					this.getTranslateBox();
					this.boxElements.box.drag = {
						status: false,
						X     : 0,
						Y     : 0
					};

					this.boxElements.style = 
							this.setStyle(this.boxElements.box);

					//nightly 41 050622 (http://whereswalden.com/2015/06/20/)
					//https://bugzilla.mozilla.org/show_bug.cgi?id=1146136
					({
						from      : this.from,
						to        : this.to,
						camelCase : this.camelCase,
						service   : this.service,
						bingAppId : this.bingAppId
					} = this.getPref());

					content.document.addEventListener('mousedown',this, false);
					content.document.addEventListener('mouseup',this, false);
					content.document.addEventListener('mousemove',this, false);
					content.document.addEventListener('keypass',this, false);
					content.addEventListener('unload',this, false);
					this.boxElements.detail.addEventListener('DOMMouseScroll', this, false);
					(this.originDocument = event.view.document).addEventListener('mousedown',this, false);
				}

				var pageXY = (function(e){
					var target = e.view,
						top = 0,
						left = 0,
						rect = null;
					while(target != null && target != content.top){
						rect = target.frameElement.getBoundingClientRect();
						top += rect.top || 0;
						left += rect.left || 0;
						target = target.parent;
					}
					return {
						x: left + e.clientX,
						y: top + e.clientY
					};
				})(event);

				this.boxElements.box.style.top = pageXY.y + content.pageYOffset - this.offset.y +'px';
				this.boxElements.box.style.left = pageXY.x + content.pageXOffset - this.offset.x +'px';

				this.setTranslateText();
			},

			googleService: function(res){
				var {strFilter: sF, title: ftt, resultText: resultText} = this.filter,
					ftt = ftt.bind(this.filter),
					resultBox = this.boxElements.resultBox;


				var text = JSON.parse(res.responseText.replace(/\[,+|,{2,}(?!\])|,+\]/g, function(str){
						return Array.prototype.join.call(str, 'null');
					})),
					rt = '',//译文
					rp = '',//注音
					languages = this.languages;

				if(!res.responseText || !text[0]){
					return this.statusAlert('未知错误');
				}

				//原文所属语言
				this.checkLanguge = text[2];

				var t = text[0];
				for(var i=0;i<t.length;i++){
					//译文
					if(!t[i][0] && !t[i][1]) continue;
					rt += ftt(t[i][0], t[i][1], 
						(languages[text[2]] + 
							' -&gt; ' + languages[this.to]));
					rp += t[i][1];
				}
				//注音
				rp = t[t.length - 1][3] ? ftt(t[t.length - 1][3], rp) : '';

				//显示翻译文本
				this.boxElements.resultText = resultText(rt);

				//显示注音
				this.boxElements.phonetic = rp;

				/*//////////////////////////////////*/
				/*
				<span class="_FgGTr-D-t1-Ci">[词性]</span>
				<ul class="_FgGTr-D-t1-Ul">
					<li class="_FgGTr-D-t1-li">
						<span>未翻译文本</span>
						<span>
							<ul>
								<li>译文1</li>
							</ul>
						</span>
					</li>
				</ul>*/

				if(text[1]){
					var t1 = text[1],
						sp = li = '';
					for(var m=0;m<t1.length;m++){
						li = '<span class="_FgGTr-D-t1-Ci">['+ sF(t1[m][0]) 
							+ '].</span><ul class="_FgGTr-D-t1-Ul">';
						for(var n=0;n<t1[m][2].length;n++){
							li += '<li class="_FgGTr-D-t1-li"><span>'
								+ sF(t1[m][2][n][0]) +'</span><span><ul>'
							for(var l=0;l<t1[m][2][n][1].length;l++){
								li += '<li>'+ sF(t1[m][2][n][1][l]) +'</li>';
							}
							li += '</ul></span></li>';
						}
						sp += li + '</ul>';
					}
					if(!!sp){
						var span = content.document.createElement('span');
						span.innerHTML = sp;
						this.boxElements.detail.appendChild(span);
					}
				/*//////////////////////////////////*/
				/*
				<span class="_FgGTr-D-t5-Ul"><ul>
					<li class="_FgGTr-D-t5-li1">
						<span>未翻译文本</span>
					</li>
				</ul>
				<ul>
					<li class="_FgGTr-D-t5-li2">
						<span>
							<span>译文0</span>
							<ul>
								<li>译文1</li>
							</ul>
						</span>
					</li>
				</ul></span>*/
				}else if(text[5]){
					var t5 = text[5],
						li1 = li2 = '',
						filter = {};
					for(var j=0;j<t5.length;j++){
						if(!(t5[j][0] in filter) && t5[j][2] && 
							(t5[j][2].length!=1 || (t5[j][0] != t5[j][2][0][0])) &&
							!sF(t5[j][0], t5[j][2][0][0])
						){
							li1 += '<li class="_FgGTr-D-t5-li1"><span>'+sF(t5[j][0])+'</span></li>';
							li2 += '<li class="_FgGTr-D-t5-li2"><span><span>'
								+sF(t5[j][2][0][0])+'</span><ul>';
							for(var k=0;k<t5[j][2].length;k++){
								li2 += '<li>'+sF(t5[j][2][k][0])+'</li>';
							}
							li2 += '</ul></span></li>';
							filter[t5[j][0]] = true;
						}
					}

					if(!!li1 && !!li2){
						var span = content.document.createElement('span');
						span.innerHTML = '<ul>'+li1+'</ul><ul>'+li2+'</ul>';
						this.boxElements.detail.appendChild(span);
						this.boxElements.detail.moreUl = span.lastChild;
					}
				}

				//设置滚动条
				this.setClassName(this.boxElements.detail, '_FgGTrDetailOverflow', false);
				if(text[1] || text[5]){
					this.setScrollbar();
				}
			},

			getGoogleTK: function(str){
				function b(a, b) {
					for (var d = 0; d < b.length - 2; d += 3) {
						var c = b.charAt(d + 2),
							c = "a" <= c ? c.charCodeAt(0) - 87 : Number(c),
							c = "+" == b.charAt(d + 1) ? a >>> c : a << c;
						a = "+" == b.charAt(d) ? a + c & 4294967295 : a ^ c
					}
					return a
				}

				function tk(a) {
					for (var e = ['406398','2087938574'], h = Number(e[0]) || 0, g = [], d = 0, f = 0; f < a.length; f++) {
						var c = a.charCodeAt(f);
						128 > c ? g[d++] = c : (2048 > c ? g[d++] = c >> 6 | 192 : (55296 == (c & 64512) && f + 1 < a.length && 56320 == (a.charCodeAt(f + 1) & 64512) ? (c = 65536 + ((c & 1023) << 10) + (a.charCodeAt(++f) & 1023), g[d++] = c >> 18 | 240, g[d++] = c >> 12 & 63 | 128) : g[d++] = c >> 12 | 224, g[d++] = c >> 6 & 63 | 128), g[d++] = c & 63 | 128)
					}
					a = h;
					for (d = 0; d < g.length; d++) a += g[d], a = b(a, "+-a^+6");
					a = b(a, "+-3^+b+-f");
					a ^= Number(e[1]) || 0;
					0 > a && (a = (a & 2147483647) + 2147483648);
					a %= 1E6;
					return a.toString() + "." + (a ^ h)
				}
				return tk(str);
			},

			bingService: function(res, details){
				this.statusAlert('');
				var {strFilter: sF, title: ftt, resultText: resultText} = this.filter,
					ftt = ftt.bind(this.filter),
					resultBox = this.boxElements.resultBox,
					sentRequest = this.sentRequest.bind(this),
					detailBox = this.boxElements.detail;
				var bingTrantor = function(res){
						var text = res.responseText;
						if(!text){
							this.loadingAnimation();
							return this.statusAlert('未知错误');
						}
						try{
							text = JSON.parse(text);
						}catch(ex){
							this.loadingAnimation();
							return this.statusAlert('服务器响应格式错误');
						}

						//原文所属语言
						this.checkLanguge = text.from;

						var cText = this.camelCaseText.trim(),
							oText = cText.split('\n'), //原文
							rt = '', //译文
							languages = this.languages;

						for(var i=0;i<text.items.length;i++){
							//译文
							rt += ftt(text.items[i].text, oText[i], 
								(languages[text.from] + 
									' -&gt; ' + languages[this.to]))
										.replace(/\<\/span\>/, '<br />$&');
						}

						//显示翻译文本
						this.boxElements.resultText = resultText(rt);

						//详细
						text.items.length == 1 && (text.items[0].wordAlignment || ' ').split(' ').length == 1 && sentRequest({
							method: 'GET',
							url: 'https://www.bing.com/translator/api/Dictionary/Lookup?from='
								+ this.checkLanguge +'&to='+ this.to +'&text='+ encodeURIComponent(cText),
							rqType: 'bingDictCallback',
							headers:{
								Cookie: this.bingAppId
							}
						}, function(res){
							var text = res.responseText;
							try{
								text = JSON.parse(text);
							}catch(ex){}
							if(!text) return;
							var sp = li = '';
							for(var pt of text.items){
								li = '<span class="_FgGTr-D-t1-Ci">['+ pt[0].posTag
									+ '].</span><ul class="_FgGTr-D-t1-Ul">';
								for(var item of pt){
									li += '<li class="_FgGTr-D-t1-li"><span>'
										+ sF(item.displayTarget) +'</span><span><ul>';
									for(var bt of item.backTranslations){
										li += '<li>'+ sF(bt.displayText) +'</li>';
									}
									li += '</ul></span></li>';
								}
								sp += li + '</ul>';
							}
							if(!!sp){
								var span = content.document.createElement('span');
								span.innerHTML = sp;
								this.boxElements.detail.appendChild(span);
							}
							//设置滚动条
							this.setClassName(detailBox, '_FgGTrDetailOverflow', false);
							this.setScrollbar();
						}.bind(this));
				}.bind(this);

				if(typeof details.retry == 'number'){//先获取请求翻译页面获取令牌cookies作为appid
					if(details.retry > 3) return this.statusAlert(this.service + ' 服务发生未知错误');
					sentRequest({
						url: 'https://www.bing.com/translator/?to='+ this.to +'&text=' +  this.camelCaseText,
						retry: details.retry
					}, function(res){
						var ck = res.getResponseHeader('Set-Cookie').split('\n');
						this.setPref.call(this, {bingAppId: (this.bingAppId = ['mtstkn', 'MUID'].map(function(i){
							for(var c of ck){
								var m = c.match(new RegExp(i+'=[^;]+'));
								if(m) return m[0];
							}
							return '';
						}).join('; '))}); //保存bingAppId
						(details.headers || (details.headers = {}))['Cookie'] = this.bingAppId;
						sentRequest(details, bingTrantor);
					}.bind(this));
				}else{
					bingTrantor(res);
				}
			},

			baiduService: function(res, details){
				var {title: ftt, resultText: resultText, strFilter: sF} = this.filter,
					ftt = ftt.bind(this.filter),
					resultBox = this.boxElements.resultBox,
					detailBox = this.boxElements.detail,
					sentRequest = this.sentRequest.bind(this),
					setScrollbar = this.setScrollbar.bind(this),
					text = res.responseText,
					err = function(msg){
						this.loadingAnimation();
						return this.statusAlert(msg || '未知错误');
					}.bind(this);

				if(text == '') return err();
				try{
					text = JSON.parse(text);
					if(text.error != 0 && text.msg != 'success') return err(text.msg)
				}catch(ex){
					return err('服务器响应格式错误');
				}
				//原文所属语言
				this.checkLanguge = text.lan || 'auto';

				//当自动检测到为zh/en, 且翻译目标语言为zh/en时，默认翻译为 en/zh
				if(this.from == 'auto' 
					&& this.checkLanguge == this.to 
					&& ['zh', 'en', 'cht'].indexOf(this.to)>-1
				){
					this.to = ( ['zh', 'cht'].indexOf(this.to)>-1 ? 'en' : this.to);
					this.setResultLink();
					this.updateLanguages();
				}

				details.postData = 'from='+ (this.from == 'auto' ? this.checkLanguge : this.from)
							+ '&to=' + this.to + '&query=' + details.tText + '&transtype=hash&simple_means_flag=3'; //'&transtype=realtime';
				details.url = 'http://fanyi.baidu.com/v2transapi';
				//上次请求清除，重新添加
				this.loadingAnimation();
				sentRequest.call(this, details, function(res){
					clearInterval(resultBox.loading);
					var text = res.responseText,
						tRD = null,
						tDM = null,
						languages = this.languages,
						rt = '';//译文
					if(text == '') return err();
					try{
						text = JSON.parse(text);
					}catch(ex){
						return err('服务器响应格式错误');
					}

					var tt_r = text.trans_result,
						td_r = text.dict_result;

					if(tt_r){
						//重新设置原文所属语言
						this.checkLanguge = tt_r.from;

						//翻译结果
						tRD = tt_r.data;

						var ara_ru = !!~['ara', 'ru'].indexOf(this.checkLanguge);

						for(var p of tRD){
							if(!!p.result && p.dst){
								for(var ci of p.result){
									var range = ci[4][0].split('|').map(function(r){return parseInt(r, 10)}),
										spr = ci[3], _spr = ci[1]; //添加 空格、换行
									spr.forEach(function(s){
										s = s.split('|');
										if(s.length){
											_spr = _spr.split('');
											_spr.splice(s[0] == '0' ? 0 : _spr.length, 0, s[1]); //0为句前，1为末尾
											_spr = _spr.join('');
										}
									});
									rt += ftt(_spr,
										this.filter.cut(p.src, range[0], range[0] + range[1], ara_ru),
										(languages[this.checkLanguge] + ' -&gt; ' + languages[this.to]));
								}
							}else{
								rt += ftt(p.dst, p.src, (languages[this.checkLanguge] + ' -&gt; ' + languages[this.to]));
							}
							if(p != tRD[tRD.length-1])
								rt = rt.replace(/(\<span title\="[^"]+?" class\=")([^"]+?)("\>[^\<]+)\<\/span\>$/,
											'$1$2 _FgGTrR-T-Span-P$3</span><br />');
						}
					}else{
						this.checkLanguge = null;
					}
					this.boxElements.resultText = 
						resultText(rt == '' ? this.camelCaseText : rt);

					var dictResult = null;
					//简单翻译
					if(td_r){
						var tSM = td_r.simple_means;
						if(tSM){
							var smUL = '',
								tSM_symbols = tSM.symbols,
								tSM_word_name = [];
							if(td_r.err_words){ //大小写区别单词
								tSM_word_name.push(tSM.word_name);
								for(var tEW of td_r.err_words){
									if(Array.isArray(tEW.symbols)){
										tSM_symbols = tSM_symbols.concat(tEW.symbols);
									}
									tSM_word_name.push(tEW.word_name);
								}
							}
							for(var p of tSM_symbols){
								var ph = [];
								if(tSM_word_name.length){
									smUL += '<b class="_FgGTr-bd-sm-WordName">' + tSM_word_name[tSM_symbols.indexOf(p)];
								}
								if(!p.word_symbol){
									p.ph_en && ph.push('[英]:['+ p.ph_en + ']');
									p.ph_am && ph.push('[美]:['+ p.ph_am + ']');
									(p.ph_en == p.ph_am) && ph.pop();
									if (ph.join(', ') != '') smUL += '<div class="_FgGTr-bd-sm-Phonetic">'+ ph.join(', ') +'</div>';
								}else{
									smUL += '<div class="_FgGTr-bd-sm-Phonetic">'+ p.word_symbol +'</div>';
								}
								if(tSM_word_name.length){
									smUL += '</b>';
								}
								for(var parts of p.parts){
									//parts.part      en->zh
									//parts.means.word_mean zh->en
									//词性 zh->en parts.part_name
									parts.part_name && (smUL += '<div class="_FgGTr-bd-sm-partsName"><b>['+ parts.part_name +']</b>');
									if(parts.part){
										smUL += '<div class="_FgGTr-bd-sm-parts"><b>'+ parts.part +'</b><ul>';
										for(var means of parts.means)
											smUL += '<li>' + means + '</li>';
										smUL += '</ul></div>';
									}else if(parts.means){
										smUL += '<ul class="_FgGTr-bd-sm-parts _FgGTr-bd-sm-parts-sg">';
										for(var means of parts.means){
											if(Array.isArray(parts.means)){
												if(typeof means == 'string'){
													smUL += '<li>' + means + '</li>';
												}else if(typeof means == 'object' && means.word_mean){
													smUL += '<li>' + means.word_mean + '</li>';
												}
											}else if(means.word_mean){
												smUL += '<li>' + means.word_mean + '</li>';
											}
										}
										smUL += '</ul>';
									}
									parts.part_name && (smUL += '</div>');
								}
							}
							//单词其他形式
							if(tSM.exchange){
								var exc = {
									'word_done': '过去分词',
									'word_past': '过去式',
									'word_ing': '现在进行时',
									'word_pl': '复数',
									'word_est': '最高级',
									'word_er': '比较级',
									'word_third': '第三人称单数'
								}, _exc = '';
								for(var wx in exc){
									if((wx in tSM.exchange) && tSM.exchange[wx]){
										_exc += '<li><i>' + exc[wx] + ':</i><span>';
										for(var wxc of tSM.exchange[wx]){
											_exc += '<a target="_blank" href="http://fanyi.baidu.com/#' 
														+ (this.checkLanguge || this.from) +'/'+ this.to +'/'
														+ wxc +'">' + wxc + '</a>';
										}
										_exc += '</span></li>';
									}
								}
								if(_exc !='') smUL += '<ul class="_FgGTr-bd-sm-exchange">' + _exc + '</ul>';
							}
							if(smUL != ''){
								dictResult = content.document.createElement('div');
								dictResult.id = '_FgGTr-bd-dict-result';
								dictResult.innerHTML = smUL;
								detailBox.appendChild(dictResult);
							}
						}

						//其他语言 jp <-> en
						var tCt = td_r.content,
							tVe = td_r.voice;
						if(tCt){
							var tcUL = '';
							for(var i of tCt){
								tcUL += '<ul>'
								for(var m of i.mean){
									tcUL += '<li class="_FgGTr-bd-sm-parts">'+ (m.pre ? '<b>'+ m.pre +'</b>' : '') + '<ul>';
									for(var c in m.cont){
										tcUL += '<li>' + c + '</li>';
									}
									tcUL += '</ul></li>';
								}
								tcUL += '</ul>'
							}
							if(tcUL != ''){
								dictResult = content.document.createElement('div');
								dictResult.id = '_FgGTr-bd-dict-result';
								dictResult.innerHTML = tcUL;
								detailBox.appendChild(dictResult);
							}
						}
						if(tVe){
							var _ph = {}, ph = '';
							for(var i of tVe) for(var p in i) _ph[p] = i[p];
							if(_ph.en_phonic && _ph.us_phonic){//en -> jp 读音
								ph = (_ph.en_phonic == _ph.us_phonic)
									? '[EN]:' + _ph.en_phonic
									: '[EN]:' + _ph.en_phonic + '' + ', [US]:' + _ph.us_phonic;

							}else if(_ph.phonic){//jp -> en 读音
								ph = _ph.phonic;
							}
							(ph != '') && (this.boxElements.phonetic = '<span class="_FgGTrR-T-Span">' + ph + '<span>');
						}
					}

					//其他详细翻译
					var tab = '', synthesize = '', net = '', cizu = '',
						tongfanyici = '', baike = '', tContent = '',
						zhxiyi = '', enxiyi = '';
					var setTab = function(tName){
						for(var i in tName){
							if(tName[i] != ''){
								tab += '<li>' + i + '</li>';
								tContent += '<li>' + tName[i] + '</li>';
							}
						}
						if(tContent && tab){
							tContent = '<div><ul class="_FgGTr-bd-tContent">' + tContent + '</ul></div>';
							detailBox.innerHTML += ('<ul class="_FgGTr-bd-drTab">'+ tab + '</ul>' + tContent);
						}

						var tabs = detailBox.querySelectorAll('._FgGTr-bd-drTab>li'),
							contents = detailBox.querySelectorAll('._FgGTr-bd-tContent>li');
						for(var i=0, len = tabs.length; i<len; i++){
							if(i == 0) {
								tabs[0].classList.add('_FgGTr-bd-drTab-current');
								contents[0].classList.add('_FgGTr-bd-tContent-current');
								tabs[0].parentNode.style
									.setProperty('min-width', (tabs[0].offsetWidth + 4) * len + 'px', 'important');
								//设置当前标签后才设置滚动条
								setScrollbar(contents[0].parentNode.parentNode);
							}
							tabs[i].onclick = (function(t){
								return function(){
									if(tabs[t].classList.contains('_FgGTr-bd-drTab-current')) return;

									//记录上一个的滚动位置
									var perv = detailBox.querySelector('._FgGTr-bd-tContent-current');
									if(perv){
										if(!perv.WHTB)
											perv.WHTB = {};
										perv.WHTB.T = perv.parentNode.offsetTop;
									}
									for(var i=0; i<len; i++){
										tabs[i].classList[i == t ? 'add' : 'remove']('_FgGTr-bd-drTab-current');
										contents[i].classList[i == t ? 'add' : 'remove']('_FgGTr-bd-tContent-current');
									}
									setScrollbar(contents[t].parentNode.parentNode);
								}
							})(i);
						}
					};

					//4个基础标签 & 后来新增的2个扩展标签
					if(td_r && ((typeof td_r == 'object') && !Array.isArray(td_r) || dictResult)){
						if(td_r.synthesize_means && td_r.synthesize_means.symbols 
								&& td_r.synthesize_means.symbols.length){ //汉英辞典
							for(var i of td_r.synthesize_means.symbols){
								synthesize += '<li>';
								if(i.xg != ''){
									synthesize += '<b>' + td_r.synthesize_means.word_name 
										+ ' <span>[' + i.word_symbol + ']</span></b>';
								}
								for(var cys of (i.cys.length && i.cys || i.parts.length && i.parts)){
									if(cys.part_name){
										synthesize += '<h5>[' + cys.part_name + ']</h5>';
									}
									if(cys.means && cys.means.length){
										synthesize += '<ul class="_FgGTr-bd-synthesizeCys">';
										for(means of cys.means){
											synthesize += '<li><h6>' + means.word_mean+ '</h6>';
											if(means.ljs && means.ljs.length){
												synthesize += '<ul class="_FgGTr-bd-synthesizeLjs">';
												for(var ljs of means.ljs)
													synthesize += '<li><ul><li>'+ ljs.ly + '</li><li>' + ljs.ls + '</li></ul></li>';
												synthesize += '</ul>';
											}
											synthesize += '</li>';
										}
										synthesize += '</ul>';
									}
								}
								synthesize += '</li>';
							}
							if(synthesize != '') synthesize = '<ul class="_FgGTr-bd-synthesize">' + synthesize + '</ul>';
						}
						if(td_r.net_means){ //网络析义
							for(var i of td_r.net_means)
								net += '<li><span>' + i.means + '</span></li>';
							if(net != '') net = '<ul class="_FgGTr-bd-net-means">' + net + '</ul>';
						}

						var _cizu = (td_r.cizu && td_r.cizu.length && td_r.cizu) || (td_r.cizuxiyu 
								&& td_r.cizuxiyu.cizu && td_r.cizuxiyu.cizu.length && td_r.cizuxiyu.cizu);
						if(_cizu){ //短语词组
							for(var i of _cizu){
								cizu += '<li><span>'+ (i.cz_name || i.cizu_name) +'</span>';
								if(i.jx && i.jx.length){
									cizu += '<ul class="_FgGTr-bd-czjx">';
									for(var jx of i.jx){
										cizu += '<li><span>' + (jx.jx_en || jx.jx_cn_mean) + '</span>';
										if(jx.lj && jx.lj.length){
											cizu += '<ul class="_FgGTr-bd-czlj">';
											for(var lj of jx.lj){
												cizu += '<li>'+ lj.lj_ly +'</li><li>' + lj.lj_ls + '</li>';
											}
											cizu += '</ul>';
										}
										cizu += '</li>'
									}
									cizu += '</ul>';
								}
								cizu += '</li>';
							}
							if(cizu != '') cizu = '<ul class="_FgGTr-bd-cizu">' + cizu + '</ul>';
						}

						if((td_r.tongyici && td_r.tongyici.length) //同反义词
							|| (td_r.fanyici && td_r.fanyici.length)){
							tongfanyici = (function(tfyc){
								var ul = [];
								for(var tf in tfyc){
									if(tfyc[tf]){
										var str = '';
										for(var i of tfyc[tf]){
											if(i.means){//en->zh
												str += '<li><b>'+ i.part_name +'</b><span><ul class="_FgGTr-bd-part-name">';
												for(var m of i.means){
													str += '<li><h6>' + m.word_mean + '</h6><ul class="_FgGTr-bd-word-mean">';
													for(var cis of m.cis){
														str += '<li><a target="_blank" href="http://fanyi.baidu.com/#' 
															+ (this.checkLanguge || this.from) +'/'+ this.to +'/'
															+ cis.ci_name +'">' + cis.ci_name + '</a></li>';
													}
													str += '</ul></span></li>';
												}
												str += '</ul></span></li>';
											}else if(i.ci_name){//zh->en
												str += '<li><h6>' + i.ci_name + '</h6></li>';
											}
										}
										if(str != '') ul.push('<h5 class="_FgGTr-bd-tongfanyiciTitle">'+ ('同反'.charAt(tf)) 
											+'义词</h5><ul class="_FgGTr-bd-tongfanyici">' + str + '</ul>');
									}
								}
								return ul.join('');
							}).call(this, [td_r.tongyici, td_r.fanyici]);
						}

						var _baike = td_r.baike_means && td_r.baike_means.content && td_r.baike_means;
						if(_baike){//百科析义
							baike = '<div class="_FgGTr-bd-baike"><span>'+ _baike.content.replace(/\&amp;/g, '&') 
								+'</span><a title="前往百科页面" href="'+ _baike.link +'" target="_blank"></a></div>';
						}

						if(td_r.zdict){// 中中析义
							zhxiyi = (function(zdict){
								var arr = [];
								for(var zd in zdict){
									var xiyi = '';
									if(!zdict[zd] || (
										(!zdict[zd].means || !zdict[zd].means.length) && !zdict[zd].chenyu)
									) continue;

									var cyu = zdict[zd].chenyu;
									if(cyu){//成语解释
										var _cyu = {
											explain:  '解释',
											from:     '出处',
											example:  '例句',
											grammer:  '语法',
											synonyms: '同义词',
											antonym:  '反义词'
										};
										xiyi += '<div class="_FgGTr-bd-zdictTitle">成语解释</div><div class="_FgGTr-bd-zdictCyu">';
										if(cyu.pinyin) xiyi += '<b>' + td_r.zdict.word + ' <span>[' + cyu.pinyin + ']</span></b>';
										xiyi += '<ul>';
										for(var cy in _cyu){
											if(!cyu[cy]) continue;
											xiyi += '<li><b>' + _cyu[cy] + ':</b><span>' + cyu[cy] + '</span></li>';
										}
										xiyi += '</ul></div>';
										arr.push(xiyi);
										xiyi = '';
									}

									if(zdict[zd].means && zdict[zd].means.length){//字词、引证解释
										xiyi += '<div class="_FgGTr-bd-zdictTitle">'+ ['字词', '引证'][zd] + '解释</div>' 
											+ '<ul class="_FgGTr-bd-zdictMs">';
										for(var means of zdict[zd].means){
											xiyi += '<li>';
											if(means.pinyin)
												xiyi += '<b>' + td_r.zdict.word + ' <span>[' + means.pinyin + ']</span></b>';
											for(var exp of means.exp){
												if(zd == 1 && exp.pos) xiyi += '<div class="_FgGTr-bd-zdictPos"><h5>' + exp.pos + '</h5>';
												for(var des of exp.des){
													//去掉原先的序号 (1) / 1.
													xiyi += '<h6>' + des.main.replace(/^(?:\(\d+\)(?!\.)|\d+\.)/,'') + '</h6>';
													if(des.sub && des.sub.length){
														xiyi += '<ul class="_FgGTr-bd-zdictSub">';
														for(var sub of des.sub)
															if(sub) xiyi += '<li>' + sub + '</li>';
														xiyi += '</ul>';
													}
												}
												if(zd == 1 && exp.pos) xiyi += '</div>';
											}
											xiyi += '</li>';
										}
										xiyi += '</ul>';
										arr.push(xiyi);
									}
								}
								arr = arr.join('</li><li>');
								return arr ? '<ul class="_FgGTr-bd-zdict"><li>' + arr + '</li></ul>': '';
							}).call(this, [td_r.zdict.simple, td_r.zdict.detail]);
						}

						if(td_r.edict && td_r.edict.item && td_r.edict.item.length){// 英英析义
							for(var item of td_r.edict.item){
								enxiyi += '<li><h5>' + item.pos + '</h5>';
								for(var tg of item.tr_group){
									enxiyi += '<h6 class="_FgGTr-bd-edictTg">' + tg.tr + '</h6>';
									if(tg.example && tg.example.length){
										//例句
										enxiyi += '<ul class="_FgGTr-bd-edictExample">';
										for(var example of tg.example){
											enxiyi += '<li>' + example + '</li>';
										}
										enxiyi += '</ul>';
									}
									if(tg.similar_word && tg.similar_word.length){
										//同义词synonym
										enxiyi += '<h6>synonym:</h6><ul class="_FgGTr-bd-edictSynonym">';
										for(var synonym of tg.similar_word){
											enxiyi += '<li><a target="_blank" href="http://fanyi.baidu.com/#' 
													+ (this.checkLanguge || this.from) +'/'+ this.to +'/'
													+ synonym +'">' + synonym + '</a></li>';
										}
										enxiyi += '</ul>';
									}
								}
								enxiyi += '</li>';
							}
							if(enxiyi != '') enxiyi = '<ul class="_FgGTr-bd-edict">' + enxiyi + '</ul>';
						}
					}

					setTab({//标签 & 标签内容
						'中中析义': zhxiyi,
						'英英析义': enxiyi,
						'汉英辞典': synthesize,
						'短语词组': cizu,
						'同反义词': tongfanyici,
						'网络析义': net,
						'百科析义': baike
					});

					if(!tt_r && !td_r && text.error == 999 && text.from != null){
						this.checkLanguge = text.from;
						if(text.query)
							this.boxElements.resultText = text.query;
					}
				}.bind(this));
			},

			setTranslateText: function(word){
				word = (word || this.camelCaseText).trim();

				var details = {},
					callback = null,
					sentRequest = this.sentRequest,
					detailBox = this.boxElements.detail;

				//清除翻译文本
				this.boxElements.resultText = '';

				//清除状态
				this.boxElements.alertBox = '';

				//清空原来的
				while(detailBox.children.length){
					detailBox.removeChild(detailBox.firstChild);
				}
				detailBox.style.minWidth = '';
				this.setClassName(detailBox, '_FgGTrDetailOverflow', false);

				//清除注音
				this.boxElements.phonetic = '';

				//设置链接
				this.setResultLink();

				if(this.service == 'google'){
					details.url = this.google + 'translate_a/single?client=t&hl=auto&dt=bd&dt=ex&dt=ld&dt=md&sl=' + this.from + '&tl=' + this.to
										+ '&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at&ie=UTF-8&oe=UTF-8&source=btn&srcrom=1&ssel=0&tsel=0&tk='+ this.getGoogleTK(word) +'&q='
										+ encodeURIComponent(word) + '&getTime=';
					details.timeout = 10000;
				}else if(this.service == 'bing'){
					details.url = 'https://www.bing.com/translator/api/Translate/TranslateArray?from='+ (this.from == 'auto' ? '-' : this.from) +'&to=' + this.to;
					details.method = 'POST';
					details.headers = {
						'Content-Type': 'application/json; charset=utf-8',
						'Cookie': this.bingAppId,
						'X-Requested-With': 'XMLHttpRequest',
						'Referer': 'https://www.bing.com/translator/?to=' + this.to + '&text='+encodeURIComponent(word)
					};
					details.postData = JSON.stringify(word.split('\n').map(function(t){
						return {id: ''.substr.call(Math.random(), 9, 11), text: t}
					}));
				}else if(this.service == 'baidu'){
					details.method = 'POST';
					details.tText = encodeURIComponent(word);
					details.url = 'http://fanyi.baidu.com/langdetect';
					details.postData = 'query='+ encodeURIComponent(this.filter.cut(word, 0, 50)).replace(/%20/g, '+');
					details.headers = {
						'Content-Type': 'application\/x-www-form-urlencoded;',
						'X-Requested-With': 'XMLHttpRequest',
						'Accept':'*\/*'
					};
				}
				this.loadingAnimation();
				details.url && sentRequest.call(this, details, callback);
			},

			updateLanguages: function(both){
				var index = ['google', 'bing', 'baidu'].indexOf(this.service),
					languages = this.languages,
					updateList = {},
					lg = this._languages.langMap;

				for(var i of lg){
					for(var j of i){
						if(j == this.from)
							this.from = i[index];
						if(j == this.to)
							this.to = i[index];
					}
				}

				//如果不支持翻译的语言则设置为自动
				(!languages[this.from]) && (this.from = 'auto');
				(!languages[this.to]) && (this.to = lg[0][index]);

				if(index == 2){//baidu
					//数组为以外的语言，字符串（,）分割为只能翻译语言，空字符串为全能翻译语言。
					var _lm = this._languages.baiduLM,
						baiduLM = {};
					for(var m in _lm){
						if(typeof _lm[m] == 'string' && _lm[m] != ''){
							_lm[m].split(',').forEach(function(o){
								(baiduLM[m] || (baiduLM[m] = [])).push(o);
							});
						}else{
							for(var o in _lm){
								(_lm[m] == '' ? true : !~_lm[o].indexOf(m)) && (o != m)
									&& ((baiduLM[m] || (baiduLM[m] = [])).push(o));
							}
						}
					}

					both && (updateList.from = languages);
					var blm = baiduLM[this.from];
					if(blm){
						updateList.to = {};
						for(var i of blm){
							updateList.to[i] = languages[i];
						}
						(!~blm.indexOf(this.to)) && (this.to = blm[0]);
					}else if(this.from == 'auto'){
						updateList.to = languages;
					}
				}else{
					both && (updateList.from = languages);
					updateList.to = languages;
				}

				this.updateSelectMenu(updateList);
			},

			updateSelectMenu: function(obj){
				var o = this.boxElements,
					optionsBox = o.optionsBox,
					select = optionsBox.getElementsByClassName('_FgGTrOptionsSelect'),
					{from: fromList, to: toList} = obj;
				if(!select.length) return;

				for(var i=0;i<select.length;i++){
					if(select[i].className.indexOf('Service')<0){
						var itemsText = '', item = '',
							languages = [fromList, toList][i];
						if(languages){
							for(item in languages){
								var isZH = languages[item].indexOf('中文') == 0, //中文排在前
									option = '<option value="'+ item +'">'+ languages[item] +'</option>';
								itemsText = (isZH ? (option + itemsText) : (itemsText + option));
							}
							select[i].innerHTML = (i != 1 ? '<option value="auto">自动检测</option>' : '') + itemsText;
						}
					}
				}

				select[0].value = this.from;
				select[1].value = this.to;
			},

			sentRequest: function(details, callback){
				var resultBox = this.boxElements.resultBox;

				if(resultBox.ajaxRequest && resultBox.ajaxRequest.status !== 200){
					resultBox.ajaxRequest.abort();
				}

				var {url, method, postData, headers, rqType, timeout} = details;
				if(!url) return;

				var ld = rqType !='bingDictCallback';
				resultBox.ajaxRequest = this.ajax({
					method : method || 'GET',
					url : url + (/\=$/.test(url) ? new Date().getTime() : ''),
					timeout: timeout || 5000,
					postData: postData,
					headers: headers || {},
					onload : function(res) {
						res = res.target;
						if (res.status == 200) {
							if(callback){
								callback(res);
							}else{
								clearInterval(resultBox.loading);
								this[this.service + 'Service'](res, details);
							}
						}else if(res.status == 404 || res.status / 500 >= 1){
							ld && this.loadingAnimation();
							ld && this.statusAlert('错误：访问'+ this.service +'翻译服务器出错。');
						}else if(res.status == 403){
							var json;
							try{
								json = JSON.parse(res.responseText);
							}catch(e){
								this.statusAlert('错误：访问'+ this.service +'翻译服务器出错。Code:' + res.status);
							}
							if(json && json.message){
								clearInterval(resultBox.loading);
								details.retry = (details.retry || 0) + 1;
								this[this.service + 'Service'](res, details);
							}else{
								this.statusAlert('错误：访问'+ this.service +'翻译服务器出错。Code:' + res.status);
							}
						}else if(res.status == 414 || res.status == 400){
							if(this.service == 'google'){
								this.statusAlert('错误：要翻译的文本过长。');
							}else{
								ld && this.statusAlert('错误：网络错误');
							}
							ld && this.loadingAnimation();
						}
					}.bind(this),

					ontimeout: function(e){
						ld && this.loadingAnimation();
						ld && this.statusAlert('错误：访问'+ this.service +'翻译服务器超时。');
						e.target.abort();
					}.bind(this),

					onerror: function(e){
						ld && this.loadingAnimation();
						ld && this.statusAlert('错误：访问'+ this.service +'翻译服务器发生错误。');
						e.target.abort();
					}.bind(this)
				});
			},

			getTranslateBox: function (){
				var box = content.document.createElement('div');
				box.id = '_FgGTrMainBox';
				box.innerHTML = '\
					<div id="_FgGTrResult">\
						<div>\
							<a title="前往翻译页面" target="_blank">\
								<span class="_FgGTrResultText">loading</span>\
							</a>\
						</div>\
						<div class="_FgGTrSoundAndAlertBox">\
							<a class="_FgGTrSoundButton" title="发音"></a>\
							<span class="_FgGTrAlertBox _FgGTr-text-label"></span>\
							<span class="_FgGTrSoundPhonetic"></span>\
						</div>\
						<div class="_FgGTrDetail"></div>\
						<div class="_FgGTrOptions">\
							<a class="_FgGTrOptionsToggle" title="设置">▼</a>\
						</div>\
					</div>\
					<div class="_FgGTrOptionsBox"></div>';
				content.document.body.appendChild(box);

				this.boxElements = {
					box: box,
					toggleOn: false,
					style: null,
					set resultText(text) this.resultBox.innerHTML = text,
					get resultText() this.resultBox.textContent,
					set phonetic(text) this.phoneticBox.innerHTML = text,
					set alertBox(text) this.alertBox.textContent = text,
					get alertBox() this.get('AlertBox'),
					get phoneticBox() this.get('SoundPhonetic'),
					get soundButton() this.get('SoundButton'),
					get resultBox() this.get('ResultText'),
					get toggleButton() this.get('OptionsToggle'),
					get optionsBox()  this.get('OptionsBox'),
					get detail() this.get('Detail'),
					get swapButton() this.get('SwapButton'),
					get saveButton() this.get('OptionsSave'),
					get cancelButton() this.get('OptionsCancel'),
					get checkbox() this.get('OptionsCheckbox'),
					get serviceSelect() this.get('OptionsService'),
					get: function(name) {
						return this.box.querySelector('._FgGTr'+ name);
					}
				};
			},

			setResultLink: function(){
				var obj = {
					text        : encodeURIComponent(this.camelCaseText.trim()),
					from        : this.from,
					to          : this.to,
					checkLanguge: this.checkLanguge
				};
				var link = this.boxElements.resultBox.parentNode;
				if(this.service == 'google'){
					link.href = (this.google.indexOf('translate') < 0 
							//无法使用服务器IP直接连接至谷歌翻译页面
							? 'https://translate.google.com.hk/'
							: this.google) + '?text='+ obj.text +'&langpair='+ obj.from +'|'+ obj.to;
				}else if(this.service == 'bing'){
					link.href = 'https://www.bing.com/translator/default.aspx?to='+ obj.to +'&text='+ obj.text;
				}else if(this.service == 'baidu'){
					link.href = 'http://fanyi.baidu.com/#'
						+ obj.from + '/' + obj.to + '/' + obj.text;
				}
			},

			loadingAnimation: function(){
				var resultBox = this.boxElements.resultBox,
					_loading = null;
				clearInterval(resultBox.loading);
				resultBox.textContent = 'loading..';
				_loading = resultBox.loading = setInterval(function(){
					try{
						if(resultBox.textContent.length<10){
							resultBox.textContent += '.';
						}else{
							resultBox.textContent = 'loading';
						}
					}catch(ex){
						clearInterval(_loading);
					}
				}, 500);
			},

			setOptionsBox: function(){
				var o = this.boxElements;
				this.setClassName(o.toggleButton.parentNode, '_FgGTrOptionsHidden', true);
				if(o.optionsBox.children.length){
					return this.toggleHidden(o.optionsBox);
				}
				var optionsBox = o.optionsBox;
				optionsBox.innerHTML = '\
					<div>\
						<span class="_FgGTr-text-label">从:</span>\
						<select class="_FgGTrOptionsSelect _FgGTrOptionsSelectFrom"></select>\
						<a class="_FgGTrSwapButton" title="交换"></a>\
						<span class="_FgGTr-text-label">译作:</span>\
						<select class="_FgGTrOptionsSelect _FgGTrOptionsSelectTo"></select>\
					</div>\
					<div>\
						<span>\
							<span class="_FgGTr-text-label">服务:</span>\
							<select class="_FgGTrOptionsSelect _FgGTrOptionsService">\
								<option value="google">google</option>\
								<option value="bing">bing</option>\
								<option value="baidu">baidu</option>\
							</select>\
						</span>\
						<span id="_FgGTrOptionsCheckboxSpan">\
							<input type="checkbox" class="_FgGTrOptionsCheckbox" />\
							<span class="_FgGTr-text-label">驼峰式</span>\
						</span>\
						<span id="_FgGTrOptionsButtonSpan">\
							<a class="_FgGTrOptionsButton _FgGTrOptionsSave">保存</a>\
							<a class="_FgGTrOptionsButton _FgGTrOptionsCancel">取消</a>\
						</span>\
					</div>';
				var select = optionsBox.getElementsByClassName('_FgGTrOptionsSelect');

				//更新选择语言框
				this.updateLanguages(true);

				o.toggleOn = true;
				o.checkbox.checked    = this.camelCase;
				o.serviceSelect.value = this.service;

				o.optionsBox.addEventListener('change', this, false);
			},

			getPlayList: function(){
				var str = this.camelCaseText;
				if(this.service == 'google'){
					var strArr = str.split(/(?=[ \u3000\n\r\t\s\,\.\?\!\！\？\。\，\u4e00-\u9fa5])/),
						strArr2 = [], strLeng = '',
						u1 = this.google + 'translate_tts?q=',
						u2 = '&tl=' + this.checkLanguge + '&prev=input&client=t';
					for(var j=0; j<strArr.length; j++){
						if((strLeng + strArr[j]).length<=100){
							strLeng += strArr[j];
						}else{
							strArr2.push(u1 + encodeURIComponent(strLeng) + u2 + '&tk=' + this.getGoogleTK(strLeng));
							strLeng = strArr[j];
						}
						if(j==strArr.length-1){
							strArr2.push(u1 + encodeURIComponent(strLeng) + u2 + '&tk=' + this.getGoogleTK(strLeng));
						}
					}
					return strArr2;
				}else if(this.service == 'bing'){
					return ['https:/www.bing.com/translator/api/language/Speak?gender={gender}&locale={locale}&media=audio/mp3&text='+encodeURI(str.replace(/ +/g, '+'))];
				}else if(this.service == 'baidu'){
					var lan = (this.checkLanguge || (this.from == 'auto' ? this.checkLanguge : this.from)),
						lan = (lan == 'cht' ? 'zh' : lan),
						part = '&text=' + encodeURIComponent(str);
					return [(lan != 'zh')
							? 'http://fanyi.baidu.com/gettts?source=web&lan=' + lan + part
							: 'http://tts.baidu.com/text2audio?pid=101&ie=UTF-8&lan=' + lan + part
					];
				}
			},

			_audioSource: null,
			_audioCtx: null,
			playSound: function(pl){
				if(this._audioSource){
					try{
						this._audioSource.stop();
						this._audioSource = null;
						this._audioCtx.close();
						this._audioCtx = null;
					}catch(ex){
						console.error(ex);
					}
				}
				var that = this,
					PL = pl || that.getPlayList.call(that),
					PS = that.playSound.bind(that);

				if(that.service == 'bing' && !pl){
					var from = (that.checkLanguge || (that.from == 'auto' ? that.checkLanguge : that.from)),
						lang = {'en': 'en-US', 'zh-CHS': 'zh-CN', 'zh-CHT': 'zh-TW', 'ja': 'ja-JP'};//常用语言
					if(from in lang){
						PL = PL.map(function(u){
							return u.replace('{gender}', 'Male').replace('{locale}', lang[from]);
						});
					}else{
						return that.ajax({
							method: 'GET',
							timeout: 5000,
							headers: { Cookie: this.bingAppId},
							url: 'https://www.bing.com/translator/api/Language/GetSpeechDialectsForLocale?locale=' + from,
							onload: function(res) {
								res = res.target.responseText;
								var l;
								try{
									l = JSON.parse(res);
								}catch(ex){
									that.statusAlert('Bing 发音服务响应格式错误。', 1000);
								}
								l = l.pop();
								that.playSound.call(that, PL.map(function(u){
									return u.replace('{gender}', l.genders.shift()).replace('{locale}', l.locale);
								}));
							},
							onerror: function(){
								that.statusAlert('Bing 发音服务网络错误。', 1000);
							},
							ontimeout:function(){
								that.statusAlert('Bing 发音服务网络超时。', 1000);
							}
						});
					}
				}


				var header = {
					//google当使用服务器IP时要发送Host，否则返回404无法发音
					google: {
						Host: !~this.google.indexOf('google') ? 'translate.google.com' : this.google.match(/https?:\/\/([^\/]+)/)[1], 
						Referer: !~this.google.indexOf('google') ? 'https://translate.google.com/' : this.google
					},
					bing: {Host:'www.bing.com', Referer:'https://www.bing.com/translator/', Cookie: this.bingAppId},
					baidu: {Referer:'http://fanyi.baidu.com'}
				};
				this._audioCtx = new content.AudioContext();
				this._audioSource = this._audioCtx.createBufferSource();
				var playIndex = function(idx){
					PL[idx] && that.ajax({
						method: 'GET',
						timeout: 5000,
						responseType: 'arraybuffer',
						url: PL[idx],
						headers: (that.service in header) ? header[that.service] : [],
						onload: function(res) {
							res = res.target;
							if (res.status == 200) {
								if(!that._audioSource) return;
								that._audioCtx.decodeAudioData(res.response, function(buffer) {
									that._audioSource.buffer = buffer;
									that._audioSource.connect(that._audioCtx.destination);
									that._audioSource.start(0);
									that.statusAlert('共'+ PL.length
										+ '段语音，正在播放第' + (idx + 1) + '段。', 2500);
								}, function(e){
									that._audioSource = null;
									that._audioCtx.close();
									that.statusAlert('错误: 第'+ ((!!~idx ? idx : 0) + 1) +'段语音加载失败。', 2500);
								});
								that._audioSource && (that._audioSource.onended = function(){
									idx += 1;
									if(idx == PL.length){
										idx = 0;
										this.stop();
										that._audioSource = null;
										that._audioCtx.close();
										that._audioCtx = null;
									}else{
										playIndex(idx);
									}
								});
							}else if(res.status == 404 || res.status / 500 >= 1){
								if(that.service == 'google' && res.status == 404){
									that.statusAlert('错误：无此语音，或文本过长。', 1000);
								}else{
									that.statusAlert('网络错误。', 1000);
								}
							}
						},
						ontimeout: function(e){
							that.statusAlert('错误：访问'+ that.service +'翻译服务器超时。');
							e.target.abort();
						}
					});
				};
				playIndex(0);
			},

			statusAlert: function(text, delay){
				clearTimeout(this.boxElements.alertBox.hideTimer);
				this.setClassName(this.boxElements.alertBox, '_FgGTrAlertBoxHide', false);
				this.boxElements.alertBox = text;
				this.boxElements.alertBox.hideTimer = setTimeout(function(){
					try{
						!delay || this.setClassName(this.boxElements.alertBox, 
														'_FgGTrAlertBoxHide', true);
					}catch(ex){
						clearTimeout(arguments.callee);
					}
				}.bind(this), typeof delay == 'number' ? delay : 1000);
			},

			ajax: function(obj){
				var req = Components.classes['@mozilla.org/xmlextras/xmlhttprequest;1']
									.createInstance(Components.interfaces.nsIXMLHttpRequest);
				req.open(obj.method, obj.url, true);
				if(obj.headers){
					for(var i in obj.headers){
						req.setRequestHeader(i, obj.headers[i]);
					}
				}
				if(obj.responseType) req.responseType = obj.responseType;
				if(obj.timeout) req.timeout = obj.timeout;
				if(obj.ontimeout) req.ontimeout = obj.ontimeout;
				if(obj.onerror) req.onerror = obj.onerror;
				req.send(obj.postData && obj.method=='POST' ? obj.postData : null);
				req.onload = obj.onload;
				return req;
			},

			removeTranslateBox: function(){
				this.selectText = null;
				if(this._audioSource){
					try{
						this._audioSource.stop();
						this._audioSource = null;
						this._audioCtx.close();
						this._audioCtx = null;
					}catch(ex){
						console.error(ex);
					}
				}

				this.preSelection = [];
				if(this.boxElements){
					clearInterval(this.boxElements.resultBox.loading);
					this.boxElements.detail.removeEventListener('DOMMouseScroll', this, false);
					content.document.body.removeChild(this.boxElements.box);
					this.boxElements = null;
				}
				content.document.removeEventListener('mousedown',this, false);
				content.document.removeEventListener('mouseup',this, false);
				content.document.removeEventListener('mousemove',this, false);
				content.document.removeEventListener('keypass',this, false);
				content.removeEventListener('unload', this, false);
				this.originDocument.removeEventListener('mousedown',this, false);
			},

			setScrollbar: function(element){
				if(!this.boxElements) return;
				var detailBox = this.boxElements.detail;

				if(element && detailBox.scrollbar && detailBox.scrollbar.bar){
					try{
						//移除原来的滚动条, 由detail滚动条切换到baidu try
						element.removeChild(detailBox.scrollbar.bar);
						this.setClassName(element, '_FgGTrDetailOverflow', false);
					}catch(ex){}
					detailBox.scrollbar.bar = null;
				}
				var scrollBox = element || detailBox,
					contentBox = scrollBox.firstChild;
				scrollBox.style.minWidth = '';

				if(!contentBox) return;

				//缓存宽高
				var bdTab = detailBox.querySelector('._FgGTr-bd-tContent-current'),
					WHTB = (bdTab && bdTab.WHTB || (bdTab && (bdTab.WHTB = {}))),
					antiBlink = function(add){
						//消除伸缩闪烁
						bdTab || this.setClassName(this.boxElements.box, '_FgGTr-AntiBlink', add);
						bdTab && this.setClassName(bdTab.parentNode, '_FgGTr-AntiBlink', add);
				}.bind(this);
				antiBlink(true);

				setTimeout(function(){
					var detailHeight = 150,
						contentStyle = content.getComputedStyle(contentBox, null),
						contentHeight = (bdTab && (typeof WHTB.H == 'number'))
									? WHTB.H : parseInt(contentStyle.height),
						contentWidth = (bdTab && (typeof WHTB.W == 'number'))
									? WHTB.W : parseInt(contentStyle.width);

					if(bdTab && !WHTB.H){
						//如果未设置
						WHTB.H = contentHeight;
						WHTB.W = contentWidth;
					}

					if(contentHeight < 250) return antiBlink(false);
					var scrollbar = content.document.createElement('div'),
						thumb = content.document.createElement('div');
					scrollbar.className = '_FgGTr-scrollbar';
					thumb.className = '_FgGTr-thumb';

					detailBox.scrollbar = {
						scrollBox: scrollBox,
						bar: scrollbar,
						thumb: thumb,
						status: false,
						contentBox: contentBox,
						Y: 0,
						barHeight: parseInt(detailHeight),
						thumbHeight: Math.max(parseInt(detailHeight / 
									contentBox.offsetHeight * detailHeight), 10),
					};

					//上次滚动位置
					if(bdTab){
						contentBox.style.top = (!WHTB.T ? 0 : WHTB.T) + 'px';
						thumb.style.top = (!WHTB.B ? 0 : WHTB.B) + 'px';
					}

					this.setClassName(scrollBox, '_FgGTrDetailOverflow', true);

					if(contentWidth>=382){
						contentWidth = 382
					}else{
						contentWidth += 12;
					}

					scrollBox.style.setProperty('min-width', contentWidth + 'px','important');
					thumb.style.setProperty('height', detailBox.scrollbar.thumbHeight + 'px','important');

					scrollbar.appendChild(thumb);
					scrollBox.appendChild(scrollbar);

					antiBlink(false);
				}.bind(this), (bdTab && typeof WHTB.H == 'number') ? 0 : 50);
			},

			onScroll: function(event){
				var od = this.boxElements.detail,
					scroll = od.scrollbar,
					bdTab = od.querySelector('._FgGTr-bd-tContent-current');
				if(!scroll || !scroll.bar) return;
				var scrollBox = scroll.scrollBox || od,
					sbHeight = scroll.bar.offsetHeight;
				if(event.type == 'mousedown'){
					if(event.target == scroll.thumb){
						scroll.status = true;
						scroll.Y = event.clientY - scroll.thumb.offsetTop;
						return true;
					}
					return;
				}else if(event.type == 'mousemove'){
					var T = event.clientY - scroll.Y,
						Y = 0, p = 0;
					if(T <= scroll.bar.offsetTop){
						Y = scroll.bar.offsetTop;
					}else if(T >= sbHeight - scroll.thumbHeight){
						Y = sbHeight - scroll.thumbHeight;
					}else{
						Y = T;
					}
					p = (scroll.thumb.offsetTop - scroll.bar.offsetTop) / 
								(sbHeight - scroll.thumbHeight);
					if(p>=0.95){
						p = 1;
					}else if(p<0.05){
						p = 0;
					}

					scroll.contentBox.style.top = 
								parseInt((scrollBox.offsetHeight - 
									scroll.contentBox.offsetHeight) * p) + 'px';

					scroll.thumb.style.top = Y +'px';
					if(bdTab){
						if(!bdTab.WHTB)
							bdTab.WHTB = {};
						bdTab.WHTB.B = Y
					}

				}else if(event.type == 'DOMMouseScroll'){
					if(scrollBox.contains(event.target)){
						event.preventDefault();
						var s = parseInt(0 - event.detail * 4),
							ct = scroll.contentBox.offsetTop + s,
							cy = 0, p = 0, t = 0,
							outerHeight = scrollBox.offsetHeight,
							innerHeight = scroll.contentBox.offsetHeight;

						if(ct <= outerHeight - innerHeight){
							cy = outerHeight - innerHeight;
						}else if(ct>=0){
							cy = 0;
						}else{
							cy = ct;
						}
						p = cy/(outerHeight - innerHeight);

						if(p>=0.95){
							p = 1;
						}else if(p<0.05){
							p = 0;
						}

						t = parseInt((sbHeight - scroll.thumbHeight) * p);
						if(t<=0){
							t=0;
						}else if(t>= sbHeight - scroll.thumbHeight){
							t = sbHeight - scroll.thumbHeight;
						}

						scroll.thumb.style.top = parseInt(t*p) + 'px';
						scroll.contentBox.style.top = cy + 'px';

						if(bdTab){
							if(!bdTab.WHTB)
								bdTab.WHTB = {};
							bdTab.WHTB.B = parseInt(t*p);
						}
					}

					//渐变过渡
					this.setClassName(scroll.bar, '_FgGTrScrolling', true);
					if(event.type == 'DOMMouseScroll' && scroll.contentBox.contains(event.target))
						this.setClassName(scroll.contentBox, '_FgGTrScrolling', true);
					clearTimeout(scroll.scrTimer);
					scroll.scrTimer = setTimeout(function(){
						if(event.type == 'DOMMouseScroll'){
							this.setClassName(scroll.contentBox, '_FgGTrScrolling', false);
						}
						this.setClassName(scroll.bar, '_FgGTrScrolling', false);
					}.bind(this), 500);
				}
			},

			handleEvent: function(event){
				var box = this.boxElements.box;
				if(!box) return;
				var target = event.target,
					drag = box.drag,
					o = this.boxElements;
				if(!event.altKey && event.type == 'mousedown' && event.button==0){
					if(box.contains(target)){
						switch(target){
							case o.soundButton:
								this.playSound();
								break;
							case o.toggleButton:
								this.setOptionsBox();
								break;
							case o.saveButton:
								this.setPref();
								this.toggleHidden();
								break;
							case o.cancelButton:
								this.toggleHidden();
								break;
							case o.swapButton:
								this.swapLanguages();
								break;
							default:
								if(this.onScroll(event))
									break;
								var eTarget = event.explicitOriginalTarget,
									oTarget = event.originalTarget;

								if ((o.detail.contains(target) 
									|| o.resultBox.contains(target) 
									|| o.phoneticBox.contains(target))
									&& eTarget.nodeType == 3 && oTarget.nodeType == 1
									|| target.classList.contains('_FgGTrOptionsSelect')
								) return;

								drag.status = true;
								this.setClassName(o.box, '_FgGTrOptionsGrab', true);
								drag.X = event.clientX - box.offsetLeft;
								drag.Y = event.clientY - box.offsetTop;
						}
					}else{
						this.removeTranslateBox();
					}
					if(!~Array.prototype.slice.call(box.querySelectorAll('._FgGTrOptionsSelect'))
							.indexOf(target) &&
							(drag.status || (o.detail.scrollbar && o.detail.scrollbar.status))){
						event.preventDefault();
					}
				}
				if(event.type == 'mouseup' || event.type == 'keypass'){
					if(event.type == 'mouseup'){
						box.drag.status = false;
						o.detail.scrollbar && (o.detail.scrollbar.status = false);
						this.setClassName(o.box, '_FgGTrOptionsGrab _FgGTrOptionsGrabbing', false);
					}

					clearTimeout(o.selectionTimer);
					if(((o.detail.children[0] && o.detail.children[0] != target && 
									o.detail.children[0].contains(target))
								&& !(target.classList && target.classList.contains('_FgGTr-D-t1-Ci'))
						) || event.altKey || event.button!=0
					) return;
					o.selectionTimer = setTimeout(function(){
						var selection = content.getSelection();
						if(selection.focusNode 
							&& box.contains(selection.focusNode) 
							&& selection.toString().replace(/\s/g, '') !='')
							return;
						for (var i in this.preSelection){
							selection.addRange(this.preSelection[i]);
						}
					}.bind(this),50);
				}
				if(event.type == 'mousemove'){
					if(drag.status){
						this.setClassName(o.box, '_FgGTrOptionsGrabbing', true);
						this.setClassName(o.box, '_FgGTrOptionsGrab',false);
						box.style.left = event.clientX - drag.X + 'px';
						box.style.top  = event.clientY - drag.Y + 'px';
					}
					if(o.detail.scrollbar && o.detail.scrollbar.status){
						this.onScroll(event);
					}


					if(o.detail.moreUl && o.detail.moreUl.contains(target)){
						Array.prototype.forEach.call(o.detail.moreUl.children, function(li){
							if(li.contains(target)){
								li.getElementsByTagName('ul')[0].style.top 
										= li.getClientRects()[0].top + 16 +'px';
							}
						});
					}
				}

				if(event.type == 'DOMMouseScroll'){
					this.onScroll(event);
				}

				if(event.type == 'change'){
					if(box.contains(target)){
						if(target == o.checkbox){
							this.toggleCamelCase();
						}else if(target.className){
							if(/Select[^ ]/.test(target.className)){
								this.selectLanguages(event);
								if(target == o.get('OptionsSelectFrom'))
									this.updateLanguages();
							}else if(target.className.indexOf('Service')>0){
								this.toggleService();
							}
						}
					}
				}
				if(event.type == 'unload'){
					clearInterval(o.resultBox.loading);
					this.removeTranslateBox();
					content.FGgTranslator = null;
				}
			},

			toggleCamelCase: function(){
				var checked = this.boxElements.checkbox.checked;
				this.camelCase = this.camelCase != checked ?
							 checked : this.camelCase;

				this.setTranslateText();
			},

			toggleService: function(){
				this.service = this.boxElements.serviceSelect.value;
				this.updateLanguages(true);
				this.setTranslateText();
			},

			swapLanguages: function(){
				var select = this.boxElements.box.getElementsByClassName('_FgGTrOptionsSelect'),
					[from, to] = [select[0].value, select[1].value];

				//先设置form更新列表后才设置to
				select[0].value = to;
				this.from = select[0].value;
				this.updateLanguages(true);

				select[1].value = 
						Array.prototype.some.call(select[1].options, function(i){return i.value == from})
						? from : select[1].options[0].value;
				this.to = select[1].value;
				this.setTranslateText();
			},

			selectLanguages: function(event){
				var target = event.target;
				if(target.className.indexOf('SelectTo')>0){
					this.to = target.value;
				}else{
					this.from = target.value;
				}
				this.setTranslateText();
			},

			toggleHidden: function(elm){
				var o = this.boxElements,
					t = o.toggleOn,
					c = '_FgGTrOptionsHidden';
				if(elm){
					this.setClassName(elm, c, t);
				}else{
					this.setClassName(o.toggleButton.parentNode, c, !t);
					this.setClassName(o.optionsBox, c, t);
				}
				o.toggleOn = !t;
			},

			setClassName: function(elm, className, add){
				if(!elm) return;
				var classList = elm.className.split(' '),
					_classList = [];
				className = className.split(' ');

				for(var i=0;i<className.length;i++){
					var find = 0;
					for(var j=0;j<classList.length;j++){
						if(className[i] == classList[j]){
							if(!add && classList[0]!=''){
								classList.splice(j,1);
							}
						}else{
							if(add) find++;
						}
					}
					if(add && find == classList.length){
						_classList.push(className[i]);
					}
				}
				if(add){
					classList = classList[0]!='' ? classList.concat(_classList) : _classList;
				}

				classList = classList.sort().join(' ');
				if(elm.className.split(' ').sort().join(' ') != classList){
					elm.className = classList;
				}
			},

			xpPref:function(value){
				var pref = 'FireGestures.FGgTranslator.optionJSON';
				if(arguments.length==0){
					return Services.prefs.getCharPref(pref);
				}else{
					//Services.prefs.setCharPref(pref, value);
					sendAsyncMessage('FGgTranslator:savePreferences', [pref, value]);
					return value;
				}
			},

			getPref: function(){
				try{
					var pref = JSON.parse(this.xpPref());
					!pref.service && (pref.service = this.service);
					return pref;
				}catch(ex){
					var pref = {
						from:         this.from,
						to:           this.to,
						camelCase:    this.camelCase,
						service:      this.service,
						bingAppId:    this.bingAppId
					};
					this.xpPref(JSON.stringify(pref));
					return pref;
				}
			},

			setPref: function(json){
				if(json){
					var pref = this.getPref();
					for(var i in json)
						pref[i] = json[i];
					this.xpPref(JSON.stringify(pref));
				}else{
					this.xpPref(JSON.stringify({
						from:         this.from,
						to:           this.to,
						camelCase:    this.camelCase,
						service:      this.service,
						bingAppId:    this.bingAppId
					}));
				}
			},

			get camelCaseText() {
				return (this.camelCase 
							? this.selectText
								.replace(/([A-Z0-9])([A-Z])([a-z])/g, function(a, b, c, d){
									return b + ' ' + c.toLowerCase() + d;
								}).replace(/([a-z])([A-Z])/g, function(a, b, c){
									return b + ' ' + c.toLowerCase();
								}).replace(/([A-Za-z])\.([A-Za-z])/g, function(a, b, c){
									return b + ' ' + c.toLowerCase();
								})
							: this.selectText);
			},

			filter: {
				strFilter: function(str, num){
					num = num || 0;
					var f = [{
							'&':'&amp;',
							'\'':'&#x27;',
							'"':'&#x22;',
							'<':'&lt;',
							'>':'&gt;',
							'/':'&#47;',
						},
						' "\'“”‘’、｛｝{}[]【】.。…~·～〜，,;；:：' +
						'-=+*&＆＄$￥＊*＾^％%＃#＠@~()（）<>《》?？！!'
						],
						sF = arguments.callee;

					if(typeof num == 'number'){
						return str.replace(/./g, function(s){
								return num == 0 ? 
									(f[0][s] ? f[0][s] : s) : 
									(!!~f[1].indexOf(s) ? '' : s);
							});
					}else{
						return sF(str, 1).toLowerCase() == 
									sF(num, 1).toLowerCase();
					}
				},

				resultText: function(str){
					return str.replace(/(^\<span title\="[^"]+?" class\="[^"]+?"\>)((\<br \/\>)?[\s]?)*/,'$1')
					.replace(/\<span title\="[^"]+?" class\="[^"]+?"\>\<\/span\>/g,'')
					.replace(/(\<span title\="[^"]+?" class\=")([^"]+?)("\>[^\<]+)\<br \/\><\/span\>/g,
						'$1$2 _FgGTrR-T-Span-P$3</span><br />');
				},

				title: function(text, title, rt){
					return '<span'+(title ? (' title="' 
						+ (rt ? rt.replace(/\s[A-Za-z]+/g, '') +'\n' : '') 
						+'原文:\n\t'+ this.strFilter(title) +'"') : '')
						+' class="_FgGTrR-T-Span">'
						+ (this.strFilter(text).replace(/\n+/g,'<br />')) + '</span>';
				},

				cut: function(str, start, end, ru){
					var step = 0, string = '', i = 0, l = str.length;
					for (; i < l; i++) {
						step += (ru
							? ((/^[\u0600-\u06ff]+$/.test(str[i]) 
								|| /^[\ufb50\ufdff]+$/.test(str[i]) 
								|| /^[\ufe70-\ufefc]+$/.test(str[i]) 
								|| /^[\u0400-\u052F]+$/.test(str[i])) ? 2 : 1)
							: (/^[\u0391-\uFFE5]+$/.test(str.substr(i, 1)) ? 3 : 1));
						if (end < step)
							return string;
						else if (start < step)
							string += str.substr(i, 1);
					}
					return string;
				}
			},

			getSelection: function(event){
				var view = event.view,
					selection = view.getSelection(),
					txt = '';

				if(!this.selectText || !this.boxElements.box.contains(event.target)){
					this.preSelection = [];
					for (var i = 0; i < selection.rangeCount; i++){
						this.preSelection.push(selection.getRangeAt(i));
					}
				}

				if(event && Array.prototype.some
					.call(view.document.querySelectorAll('TEXTAREA, input'), function(item){
							return item.contains(event.target);
						})
				){
					txt = event.target.value.substr(event.target.selectionStart, 
													event.target.selectionEnd - 
													event.target.selectionStart);
				}else{
					try{
						txt = (function (elemt){
							var str = '',
								childs = elemt.childNodes;
							for (var child of childs) {
								if (child.nodeType == 1){
									var style = content.getComputedStyle(child);
									if (style.display == 'none' || style.visibility != 'visible'){
										continue;
									}else if(style.display == 'block'){
										str += arguments.callee(child) + '\n';
									}else if(child.tagName == 'BR'){
										str +=  '\n';
									}else{
										str += arguments.callee(child);
									}
								}else if (child.nodeType == 3){
									str += child.nodeValue;
								}
							}
							return str;
						})(selection.getRangeAt(0).cloneContents());
					}catch(ex){
						return '';
					}
				}

				return txt.replace(/(\&nbsp\;)/g,' ')
							.replace(/(\n\s*\n)/g,'\n')
							.replace(/\n+/g,'\n');
			},

			setStyle: function(element){
				var style = content.document.createElement('style'),
					cssText = (function(){/*
						#_FgGTrMainBox, 
						#_FgGTrMainBox :-moz-any(
							a, span, div, ul, li, img, b, i,
							h6, h5, input, select, option){
							margin:1px;
							padding:0;
							font-size:12px;
							font-weight:normal;
							font-family:"微软雅黑";
							font-style:normal;
							text-align:left;
							line-height:16px;
							background:none;
							color:#000;
							white-space:normal;
							border:none;
							max-width: none;
							min-width: 0;
							max-height:none;
							min-height:0;
							word-wrap: break-word;
							height: auto;
							width: auto;
							vertical-align: baseline;
							box-shadow: none;
							text-shadow:none;
							outline: none;
							text-indent:0;
							box-sizing: content-box;
							float:none;
						}
						#_FgGTrMainBox #_FgGTrResult b{
							font-weight: bold;
						}
						._FgGTrOptionsSelect{
							background:#FFF;
						}
						#_FgGTrMainBox span::after,
						#_FgGTrMainBox span::before{
							display:none;
						}
						#_FgGTrMainBox {
							position:absolute;
							border: 1px solid #7eb7fd;
							border-radius: 8px;
							background:#ebf4fc;
							padding:5px;
							z-index: 10000000000;
							box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
							max-width: 400px;
							min-height: 26px;
							min-width: 71px;
						}
						#_FgGTrMainBox._FgGTrOptionsGrab{
							cursor: -moz-grab;
						}
						#_FgGTrMainBox._FgGTrOptionsGrabbing{
							cursor: -moz-grabbing;
						}
						#_FgGTrMainBox audio{
							display:none;
						}
						._FgGTrR-T-Span{
							border-bottom:1px dotted transparent;
						}
						._FgGTrResultText ._FgGTrR-T-Span{
							font-size:13px;
						}
						._FgGTrResultText,
						._FgGTrR-T-Span{
							color: #4899FF;
							cursor: pointer;
						}
						._FgGTrR-T-Span:hover{
							position: relative;
							border-color:#555;
							top:0px;
							left:0px;
						}
						._FgGTrR-T-Span._FgGTrR-T-Span-P::after{
							content:"¶";
							display:inline-block;
							width:1em;
							color:transparent;
						}
						._FgGTrR-T-Span._FgGTrR-T-Span-P:hover::after{
							color:#555;
						}
						._FgGTrSoundPhonetic:not(:empty){
							margin-bottom:5px;
							display: block;
						}
						._FgGTrSoundPhonetic >span._FgGTrR-T-Span,
						._FgGTr-bd-synthesize>li>b>span,
						._FgGTr-bd-zdictMs>li>b>span,
						._FgGTr-bd-zdictCyu>b>span,
						._FgGTr-bd-zdict h5>span,
						._FgGTr-bd-sm-Phonetic{
							color:#078723;
						}
						#_FgGTrMainBox #_FgGTrResult>div:first-child>a{
							text-decoration: none;
							outline: none;
						}
						#_FgGTrMainBox #_FgGTrResult>div:first-child{
							margin-bottom:5px;
						}
						._FgGTrDetail:not(:empty), 
						._FgGTr-bd-drTab + ._FgGTrDetailOverflow{
							position: relative;
							padding-bottom:4px;
						}

						#_FgGTrMainBox._FgGTr-AntiBlink #_FgGTrResult ._FgGTrDetail,
						._FgGTr-bd-tContent._FgGTr-AntiBlink{
							position: absolute;
							opacity:0;
							pointer-events:none;
							min-width: 382px;
						}
						._FgGTr-bd-drTab>div{
							min-height:20px;
						}

						._FgGTrDetailOverflow{
							height:150px;
							overflow-y:hidden;
							padding-right:7px;
						}
						._FgGTrDetail>span{
							display:inline-block;
						}
						._FgGTrDetailOverflow>:-moz-any(span, ._FgGTr-bd-tContent){
							position:absolute;
						}
						._FgGTr-scrollbar{
							height:calc(100% - 2px);
							position: absolute;
							right:3px;
							display: inline-block;
							width:1px;
							z-index:1000;
							background:transparent content-box;
							transition: background-color .3s ease-in-out .1s;
						}
						._FgGTr-thumb{
							border-radius:2px;
							right:-3px;
							position: absolute;
							background-color:rgba(0,0,0,.2);
							box-shadow:0 0 5px rgba(100,100,100,.3);
							width:7px;
							transition-duration: .5s;
							transition-property: background-color, box-shadow;
							transition-timing-function: ease-out;
						}
						._FgGTr-scrollbar:hover,
						._FgGTr-scrollbar._FgGTrScrolling{
							background-color:rgba(100,100,100,.3);
							transition: background-color .1s ease-in-out .1s;
						}
						._FgGTr-scrollbar>._FgGTr-thumb:hover,
						._FgGTr-scrollbar._FgGTrScrolling>._FgGTr-thumb{
							background-color: rgba(0,0,0,.8);
						}

						._FgGTrOptionsHidden {
							display:none;
						}
						._FgGTrSwapButton {
							padding:2px;
							margin-left:5px;
							display:inline-block;
							width:10px;
							height:10px;
							position:relative;
							top:3px;
							border-radius:3px;
							background:#63b8ff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAMklEQVQYlWNggIL/////ZyAE/iOAOzaMrggnIM1EktyIz+3oAlitxOdG/B4i2kRi3AgAn4TF6Ws4tvgAAAAASUVORK5CYII=") no-repeat 2px 2px;
						}
						._FgGTrSwapButton:hover {
							background-color:#836FFF;
						}
						._FgGTrSoundButton {
							display:inline-block;
							width:16px;
							height:16px;
							background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeUlEQVQ4jWNgoCN4z8DA0ECKhvlo/P0MDAz/GRgYzjMwMAgQo/k/FvECqPh6YjRjM4CBgYGhHyrnQEgzsgHIzhZggIQHiiv+48DI8vuxWESSAcj8hgExAK8X0CVIDkRchmADeKORkBOJSkjIhiADkpIyNkByZiIKAAAF70uREOxIPQAAAABJRU5ErkJggg==") no-repeat;
						}

						._FgGTr-D-t1-Ci{
							color: #666;
							font-weight: bold;
							display:block;
						}
						._FgGTr-bd-zdictCyu>ul,
						._FgGTr-D-t1-Ul{
							display:table;
						}
						._FgGTr-bd-zdictCyu>ul>li,
						._FgGTr-D-t1-li{
							display:table-row;
						}
						._FgGTr-bd-zdictCyu>ul>li>:-moz-any(b, span),
						._FgGTr-D-t1-li>span {
							display:table-cell;
						}
						._FgGTr-D-t1-li>span:first-child{
							color: #D2691E;
							padding-right:15px;
							white-space:pre;
							vertical-align:middle;
						}
						._FgGTr-D-t1-li>span:last-child{
							max-width: 360px;
						}
						._FgGTr-D-t1-li>span:last-child>ul:hover{
							background:#ccc;
						}
						._FgGTr-bd-edictSynonym>li,
						._FgGTr-D-t1-li>span:last-child>ul>li{
							display:inline-block;
							color: #336FB8;
						}
						._FgGTr-bd-edictSynonym>li:not(:last-child)::after,
						._FgGTr-D-t1-li>span:last-child>ul>li:not(:last-child)::after{
							content:",";
							color:#000;
							display:inline-block;
							margin-right:2px;
						}

						#_FgGTrMainBox :-moz-any(._FgGTrSoundButton,._FgGTrOptionsButton,._FgGTrOptionsToggle){
							position:relative;
							color: #4a9bff;
							cursor: pointer;
							font-size: 10px;
							text-decoration: none;
							opacity:.5;
						}
						#_FgGTrMainBox :-moz-any(._FgGTrSoundButton,._FgGTrOptionsButton):active{
							opacity:1;
						}
						#_FgGTrMainBox :-moz-any(._FgGTrSoundButton,._FgGTrOptionsButton):hover{
							left:0px;
							top:0px;
							color:#ffffff;
						}
						._FgGTrOptionsToggle{
							opacity:1;
							top:-7px;
							left:2px;
							-moz-user-select: none;
						}
						._FgGTrOptionsToggle:hover{
							color:#A020F0;
							top:-6px;
							left:3px;
						}
						._FgGTrOptions{
							text-align:right;
							height:2px;
						}
						._FgGTrOptionsBox:not(:empty){
							background-color: #ebf4fc ;
							border-radius: 0 0 7px 7px;
							line-height: 24px;
							min-height: 48px;
							text-align: center;
							min-width:255px;
							padding-top: 2px;
						}
						._FgGTrOptionsBox>div{
							text-align: center;
						}
						._FgGTrOptionsBox>div:last-child{
							padding: 4px 0;
						}
						._FgGTrOptionsSelect{
							font-family:"微软雅黑";
							font-size: 12px;
							text-align:left;
							border: 1px solid #ccc;
							margin: 0;
							padding: 0;
							width: 88px;
							height: 24px;
							color:#000;
							outline: 0;
						}
						._FgGTrOptionsService{
							width: 65px;
						}
						._FgGTrOptionsCheckbox{
							position: relative;
							top: 2px;
							vertical-align: baseline;
						}
						._FgGTrOptionsCheckbox+span{
							margin-right:15px;
						}
						._FgGTrOptionsButton{
							-moz-user-select: none;
							background:#3b8cff;
							border: 1px solid #3b8cff;
							border-radius: 4px;
							color: #ffffff;
							height: 19px;
							padding: 0px 5px 0;
							font-size:12px;
							opacity:1;
						}
						._FgGTr-text-label{
							pointer-events: none;
							-moz-user-select: none;
						}
						#_FgGTrMainBox ul{
							list-style:none;
							display:inline-block;
						}
						#_FgGTrMainBox li{
							height:16px;
							list-style:none;
							line-height:16px;
						}
						._FgGTrDetailDictBing{
							color: #1F4072;
						}
						._FgGTrDetailDictB{
							font-weight: bold;
							display: block;
						}
						#_FgGTrMainBox :-moz-any(._FgGTr-D-t5-li1, ._FgGTr-D-t5-li2) :-moz-any(span,li){
							white-space: pre;
						}
						._FgGTr-D-t5-li1{
							margin-right:15px;
						}
						._FgGTr-D-t5-li1 >span{
							color: #D2691E;
						}
						._FgGTr-D-t5-li2>span{
							position:relative;
						}
						._FgGTr-D-t5-li2 >span>span{
							color: #336FB8;
							padding:0 4px;
							border: 2px solid transparent;
						}
						._FgGTr-D-t5-li2>span>ul>li{
							color: #336FB8;
						}
						._FgGTr-D-t5-li2>span>ul>li:not(:first-child){
							border-top: 1px dotted #555;
						}
						._FgGTr-D-t5-li2 >span>span:hover,
						._FgGTr-D-t5-li2>span>ul>li:hover{
							background:#ccc;
						}
						._FgGTr-D-t5-li2>span>ul{
							position:fixed;
							display:none;
							padding:4px 4px;
							margin-top:-22px;
							border: 1px solid #7eb7fd;
							border-radius: 8px;
							background:#ebf4fc;
							z-index: 10000;
							box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
						}
						._FgGTr-D-t5-li2:hover >span>ul{
							display:block;
						}
						._FgGTr-bd-sm-partsName{
							display: flex;
						}
						._FgGTr-bd-sm-partsName>b{
							color: #D2691E;
							white-space: pre;
						}
						._FgGTr-bd-sm-parts li{
							display: inline-block;
							margin-left: 10px;
							color: #1373B0;
						}
						._FgGTr-bd-sm-parts li:not(:last-child)::after{
							content: ';';
							color: #000;
						}
						._FgGTr-bd-sm-parts:not(._FgGTr-bd-sm-parts-sg) {
							height: auto;
							display: flex;
						}
						._FgGTr-bd-sm-parts._FgGTr-bd-sm-parts-sg>li,
						._FgGTr-bd-sm-WordName > div{
							margin:0 0 0 5px;
							word-wrap: normal;
						}
						._FgGTr-bd-sm-exchange>li>span,
						._FgGTr-bd-sm-exchange>li,
						._FgGTr-bd-sm-exchange{
							display: flex;
						}
						._FgGTr-bd-sm-exchange>li>span,
						._FgGTr-bd-sm-exchange>li{
							flex-direction: column;
						}
						._FgGTr-bd-sm-exchange>li{
							border-right: 1px dashed #AAA;
						}
						._FgGTr-bd-sm-exchange>li:last-child{
							border-right: none;
						}
						._FgGTr-bd-edict h6:not([class]),
						._FgGTr-bd-sm-exchange>li>i{
							font-style:italic;
							padding: 0 2px;
							font-size:90%;
							color: #888;
						}
						._FgGTr-bd-sm-exchange>li>i{
							border-bottom:1px dashed #AAA;
							padding-bottom: 2px;
							text-align: center;
						}
						._FgGTr-bd-sm-exchange>li>i+span{
							padding: 0 2px;
						}
						._FgGTr-bd-edictSynonym>li>a,
						._FgGTr-bd-sm-exchange>li>span>a{
							text-align: center;
							color: #08008B;
						}

						._FgGTrDetailOverflow>span._FgGTrScrolling ._FgGTr-D-t5-li2 >span>ul{
							display:none;
						}
						._FgGTrAlertBox{
							color: #F60;
							opacity: 1;
							display:inline-block;
							position:relative;
							top:-3px;
							height:16px;
							transition: opacity .2s ease-in-out .2s;
						}
						._FgGTrAlertBox._FgGTrAlertBoxHide{
							opacity: 0;
							transition: opacity .3s ease-in-out .5s;
						}

						._FgGTr-bd-drTab-current{
							background-color: #D7E3E9;
							font-weight: bold;
						}
						._FgGTr-bd-drTab+div{
							border:1px solid #7eb7fd;
							min-height: 16px;
						}
						._FgGTr-bd-drTab>li {
							display: inline-block;
							padding: 2px 4px;
							margin: 1px 2px -2px;
							border: 1px solid #7eb7fd;
							border-radius: 5px 5px 0 0;
							border-bottom: 2px solid #D7E3E9;
							cursor: pointer;
							-moz-user-select: none;
							position: relative;
							z-index:1;
						}

						._FgGTr-bd-drTab>li:first-child{
							margin-left: 0;
						}
						._FgGTr-bd-drTab>li:not(._FgGTr-bd-drTab-current){
							color: #666;
						}
						._FgGTr-bd-drTab>li::after{
							display: block;
							width: calc(100% + 2px);
							height: 1px;
							content: '';
							position: absolute;
							bottom: -2px;
							left: -1px;
							background-color: #7eb7fd;
						}
						._FgGTr-bd-drTab>li._FgGTr-bd-drTab-current::after{
							width: 1px;
						}
						._FgGTr-bd-tContent>li:not(._FgGTr-bd-tContent-current){
							display:none;
						}
						._FgGTr-bd-net-means>li {
							padding:0px 5px;
							list-style: inside decimal;
							font-size: 90%;
							color:#777;
						}
						._FgGTr-bd-net-means>li:hover {
							background-color: #ccc;
						}
						._FgGTr-bd-net-means>li>span {
							color: #1373B0;
						}
						._FgGTr-bd-tContent>li {
							display: block;
							height: auto;
							margin: 5px 0;
						}
						._FgGTr-bd-tongfanyici li {
							height: auto;
						}
						._FgGTr-bd-tContent :-moz-any(h5, h6, b) {
							font-weight: bold;
						}
						._FgGTr-bd-tContent h5 {
							margin-left:5px;
							color: #000;
							font-size: 12px;
						}
						._FgGTr-bd-zdictCyu>ul>li>b,
						._FgGTr-bd-sm-WordName,
						._FgGTr-bd-tContent h6 {
							color: #0E4780;
						}
						._FgGTr-bd-tongfanyici>li {
							display: flex;
						}
						._FgGTr-bd-tongfanyici>li>b {
							position: absolute;
							padding-left: 10px;
						}
						._FgGTr-bd-tongfanyici>li>b:not(:empty)+span{
							margin-top: 16px;
						}
						._FgGTr-bd-sm-WordName > div,
						._FgGTr-bd-word-mean>li {
							display: inline-block;
						}
						._FgGTr-bd-word-mean>li>a{
							color: #1373B0;
							text-decoration: none;
							padding: 0 2px;
						}
						._FgGTr-bd-edictSynonym>li>a,
						._FgGTr-bd-sm-exchange>li>span>a,
						._FgGTr-bd-word-mean>li>a{
							text-decoration: none;
						}
						._FgGTr-bd-edictSynonym>li>a:hover,
						._FgGTr-bd-sm-exchange>li>span>a:hover,
						._FgGTr-bd-word-mean>li>a:hover{
							text-decoration: underline;
							background-color: #ccc;
							border-radius: 3px;
							box-shadow:inset 0 0 4px rgba(0,0,0,.3);
							transition: background-color 200ms, box-shadow 200ms;
						}
						._FgGTr-bd-word-mean>li:not(:last-child)::after {
							content:',';
							color:#666;
						}
						._FgGTr-bd-tongfanyici h6 {
							margin:0;
						}
						._FgGTr-bd-cizu li{
							height:auto;
						}

						._FgGTr-bd-tContent {
							background-color: #D7E3E9;
							width: 100%;
						}
						._FgGTr-bd-synthesize>li>b + ._FgGTr-bd-synthesizeCys,
						._FgGTr-bd-synthesize>li>h5 + ._FgGTr-bd-synthesizeCys,
						._FgGTr-bd-zdictMs>li>:-moz-any(h6, ul),
						._FgGTr-bd-edict>li>:-moz-any(h6, ul),
						._FgGTr-bd-tongfanyici>li>b+span,
						._FgGTr-bd-tongfanyici>li>h6,
						._FgGTr-bd-czjx>li {
							margin-left: 20px;
						}
						._FgGTr-bd-zdictPos{
							margin-left: 25px;
						}
						._FgGTr-bd-zdictMs ._FgGTr-bd-zdictPos>h5,
						._FgGTr-bd-synthesize>li>h5{
							color: #D2691E;
							margin-left: -20px;
						}
						._FgGTr-bd-zdictCyu>:-moz-any(ul, b),
						._FgGTr-bd-synthesize>li>h5,
						._FgGTr-bd-synthesizeCys{
							margin-left:10px;
						}
						._FgGTr-bd-synthesize ._FgGTr-bd-synthesizeCys{
							width: calc(100% - 10px);
						}
						._FgGTr-bd-synthesize>li>h5 + ._FgGTr-bd-synthesizeCys,
						._FgGTr-bd-synthesize>li>b + ._FgGTr-bd-synthesizeCys{
							width: calc(100% - 20px);
						}
						._FgGTr-bd-synthesize>li>b,
						._FgGTr-bd-cizu>li>span,
						._FgGTr-bd-zdictMs>li>b,
						._FgGTr-bd-edict>li>h5,
						._FgGTr-bd-zdict h5{
							font-size: 12px;
							display: block;
							font-weight: bold;
							margin-left: 5px;
							color: #0E4780;
						}
						._FgGTr-bd-zdictTitle,
						._FgGTr-bd-tongfanyiciTitle{
							font-weight: bold;
							font-style: italic;
							color:#333;
							text-shadow:0 0 2px #fff;
						}
						._FgGTr-bd-zdictCyu>ul>li>b{
							vertical-align: middle;
							text-align: right;
							padding-right:2px;
						}

						._FgGTr-bd-synthesizeCys,
						._FgGTr-bd-tongfanyici,
						._FgGTr-bd-part-name,
						._FgGTr-bd-edict>li,
						._FgGTr-bd-zdictPos,
						._FgGTr-bd-zdictMs,
						._FgGTr-bd-czjx {
							counter-reset: bd-czjx;
						}
						._FgGTr-bd-synthesize>li>b,
						._FgGTr-bd-czjx>li>span,
						._FgGTr-bd-zdictMs>li>b,
						._FgGTr-bd-edict>li>h6,
						._FgGTr-bd-tContent b,
						._FgGTr-bd-sm-parts b,
						._FgGTr-bd-zdict h5{
							font-weight: bold;
							color: #124DF6;
						}
						._FgGTr-bd-tContent b,
						._FgGTr-bd-sm-parts b{
							white-space: pre;
						}

						._FgGTr-bd-tongfanyici>li>b:not(:empty)+span
							>._FgGTr-bd-part-name>li>h6:not(:empty)::before,
						._FgGTr-bd-synthesizeCys>li>h6:not(:empty)::before,
						._FgGTr-bd-tongfanyici>li>h6:not(:empty)::before,
						._FgGTr-bd-zdictMs>li>h6:not(:empty)::before,
						._FgGTr-bd-czjx>li>span:not(:empty)::before,
						._FgGTr-bd-zdictPos>h6:not(:empty)::before,
						._FgGTr-bd-edictTg:not(:empty)::before {
							content: counter(bd-czjx)". ";
							counter-increment: bd-czjx;
							display: inline-block;
							margin-right:3px;
							color: #777;
							font-size:90%;
						}
						._FgGTr-bd-synthesizeLjs>li>ul,
						._FgGTr-bd-synthesizeLjs,
						._FgGTr-bd-synthesize ul,
						._FgGTr-bd-tongfanyici,
						._FgGTr-bd-synthesize,
						._FgGTr-bd-net-means,
						._FgGTr-bd-zdictMs,
						._FgGTr-bd-drTab,
						._FgGTr-bd-czjx,
						._FgGTr-bd-cizu,
						._FgGTr-bd-czlj{
							display: block;
							width: 100%;
						}

						._FgGTr-bd-synthesizeLjs>li:not(:last-child){
							border-bottom:1px dashed #888;
						}

						._FgGTr-bd-synthesizeLjs>li>ul>li:last-child,
						._FgGTr-bd-czlj>li:nth-child(2n),
						._FgGTr-bd-zdictCyu>ul>li>span,
						._FgGTr-bd-tongfanyici>li>h6,
						._FgGTr-bd-edictExample>li{
							color: #1373B0;
							width: 100%;
						}
						._FgGTr-bd-zdictSub>li{
							color: #1373B0;
						}
						._FgGTr-bd-zdictSub:empty{
							display:none;
						}
						._FgGTr-bd-sm-WordName ~ ._FgGTr-bd-sm-parts,
						._FgGTr-bd-edictExample,
						._FgGTr-bd-zdictSub{
							display: block;
						}
						._FgGTr-bd-tContent ._FgGTr-bd-synthesizeLjs>li>ul>li,
						._FgGTr-bd-tContent ._FgGTr-bd-czlj>li,
						._FgGTr-bd-edictExample>li,
						._FgGTr-bd-zdictSub>li{
							list-style: outside none circle;
							margin-left: 1em;
							width: calc(100% - 1em);
						}
						._FgGTr-bd-tContent ._FgGTr-bd-czlj>li:-moz-any(:nth-child(4n+3), :nth-child(4n+4)),
						._FgGTr-bd-tContent ._FgGTr-bd-synthesizeLjs>li:nth-child(2n)>ul>li{
							list-style: outside none square;
						}
						._FgGTr-bd-synthesizeLjs>li>ul>li:hover,
						._FgGTr-bd-zdictCyu>ul>li>span:hover,
						._FgGTr-bd-tongfanyici>li>h6:hover,
						._FgGTr-bd-edictExample>li:hover,
						._FgGTr-bd-zdictSub>li:hover,
						._FgGTr-bd-czlj>li:hover{
							background-color: #F5ECD4;
							transition: background-color 200ms;
						}

						._FgGTr-bd-baike{
							text-indent: 2em;
							margin-left:5px;
							margin-right: 5px;
							position: relative;
						}
						._FgGTr-bd-baike>span{
							vertical-align: text-top;
							text-decoration: none;
							color: #1373B0;
						}
						._FgGTr-bd-baike>span+a{
							position: absolute;
							width: 12px;
							height:12px;
							display: inline-block;
							background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAA1klEQVQYlWXPLW7DQBAF4JH3vflx1swBJaV7gYCyHqJSaQ8SWBIQ5iOYRIp6jZJIAblCcWFRgQuitRJ3pIfmmxmNyKJM7YgGUw0Tf/MqH2aQc15HxCPJDcHPJb4Ci8FgX04fS186p4+3EA0mCYsLyTMT30g+LU/PEA2m1tt3ERGFbm+bpnZU6GmGrr4TEQmNFyT8oMGkST9KXzqSm7zKhztYsUK3AJ6dPrbSPoiI/IO1NOmrQr9zzuvrBouB5Dks9q6+q1HoKSyGu+mw2C+/DItL6UtXzR/HIDykMtZTxgAAAABJRU5ErkJggg==') no-repeat 0 1px;
							opacity: 0.4;
							bottom: -3px;
							right: -3px;
						}
						._FgGTr-bd-baike>span+a:hover{
							opacity: 0.6;
						}
					*/}).toString().replace(/^.+\s|.+$/g,'')
						.replace(/\s+\/\/.*/g,'')
						.replace(/;\n/g,' !important;\n')
						.replace(/\n\t+\./g,'\n#_FgGTrMainBox .');
				style.textContent = cssText
						.replace(/\n\t+\$[^;]+;\$/g,'').replace(/\&/g,'&amp;');
				element.appendChild(style);
				return style;
			},
	};
	var target = null;
	addEventListener('mousedown',function(){
		target = null;
	}, false);
	addEventListener('mouseup',function(event){
		target = event;
	}, false);

	addMessageListener('FGgTranslator', function(message){
		setTimeout(function(){
			FGgTranslator.init(target, message.data);
			target = null;
		}, 0)
	});
}).toString() + ')();'), true);

messageManager.addMessageListener('FGgTranslator:savePreferences', function(message){
	Services.prefs.setCharPref.apply(null, message.data);
});


