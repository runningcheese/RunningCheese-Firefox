// ==UserScript==
// @name            SidebarPlus.uc.js
// @description     侧边栏按钮以及功能增强
// @include         chrome://browser/content/browser.xul
// @charset         UTF-8
// @note            v2018-04-11 精选一些网站
// @note            v2018-04-07 增加一些功能
// @note            v2018-03-31 fix for 57+
// @note            v2017.02.11 增加一些侧边栏按钮及精选国内国外网站 by runningcheese
// @note            v2015.08.05 添加双击页面空白处隐藏侧边栏
// @note            v2013.07.30 添加几个小书签脚本
// @note            v2013.07.26 添加侧栏前进、后退、刷新按钮
// @note            v2013.07.15 侧栏激活挂在主页按钮
// ==/UserScript==
/* *********************使用说明*********************
	此脚本从lastdream2013的SidebarMod.uc.js修改而来，原作者是NightsoN，感谢他们
	去除了某些我用不到的站点以及Splitter，开关直接使用FF自带的按钮或快捷键吧ctrl+B或ctrl+H
	添加侧栏前进、后退以及刷新的3合1按钮
*/


//------------侧边栏按钮------------
(function(){
CustomizableUI.createWidget({
id: "Sidebar-button",
defaultArea: CustomizableUI.AREA_NAVBAR,
label: "侧边栏",
tooltiptext: "左键：历史侧边栏\n右键：书签侧边栏",
onClick: function(event){
switch (event.button) {
case 0:
// 左键：历史侧边栏
SidebarUI.toggle("viewHistorySidebar");
break;
case 1:
// 中键：样式侧边栏
document.getElementById("button__0ad88674-2b41-4cfb-99e3-e206c74a0076_-sidebar-action").click();  Services.prefs.setBoolPref("sidebar.position_start",true); 
break;
case 2:
// 右键：书签侧边栏
event.stopPropagation();
event.preventDefault();
setTimeout(e=>document.getElementById("toolbar-context-menu").hidePopup(), 0); 
SidebarUI.toggle("viewBookmarksSidebar");
break;
}
}
});

	var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#Sidebar-button .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAAAAAAPCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADm16n4AAAAC3RSTlMA7AoynI1/byniVqVdBlsAAAA4SURBVAjXY8AEzIG7RZdKbwxm4E5WMttmpJzNwA0U3cAApChlOO4W2SK90ZuBs0KpfXuTRiWm5QCyBRE/SPD7PAAAAABJRU5ErkJggg==)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
})();



//双击 侧边栏顶部切换停靠位置
(function (doc) {
        var SidebarFloat = doc.getElementById('sidebar-header');
        if (!SidebarFloat) return;
        var menupopup = SidebarFloat.firstChild;
        SidebarFloat.addEventListener("dblclick", function (e) {
            if (e.button == 0) {
           var key = "sidebar.position_start"; Services.prefs.setBoolPref(key, ! Services.prefs.getBoolPref(key)); 
            }
        }, false);
    })(document);










(function () {

if (!document.getElementById('sidebar-box')) return;
if (!window.SidebarMod) {
	window.SidebarMod = {
		operaLikeToggler: true,//Opera Style
		sitelist:[
		

{name: '常用选项',
	favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAVDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADMzdu6AAAAEnRSTlMAfzpDTCEK38+9s6iFeGqNVjKYYQrKAAAAcElEQVQY02WOWw6FIAxEp7wRQe3+F3t7sUUTz8cknNBOMUmNS8SLURNtb7ETfLGH5z84JPwU7KA4vgUWKpiWKDXKx5iDii30rB1Gkqk++LKRozbJ5mGCRtLVbj+flnkcZVrCyfoTke2wwELHJSn1X34e5wRDvcBIqAAAAABJRU5ErkJggg==',
	childs: [
{
				name: '书签',
				url: 'chrome://browser/content/bookmarks/bookmarksPanel.xul',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEUAAAAAAAAAAAAAAAAHBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACqim21AAAAFXRSTlMAj1RtD9/Xq38owriYeDMHhR4XSjowWlNmAAAAcElEQVQY022PSw6EMAxDHactbekHmOH+V53FJBIIvIj1LFmKYVoW3FRq3W+BkHLlkIAUHAb7qoDWzO8ByNk6xwRmocopQLuURfw6P9wU/5ac99W+LRZ8Nsy8BWRa0MmkGsnsw6IcQJBoVciwhQ0v+gFTkgJxFZPPfQAAAABJRU5ErkJggg=='
			},
{
				name: '历史',
				url: 'chrome://browser/content/history/history-panel.xul',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAAAAAAAaDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnTjqAAAAAE3RSTlMAOgmRUhfX9e2FM38r37Ygc2eeqdJPywAAAHVJREFUGNNtj0sOxDAIQyEp5NukHe5/1wFUFpX6Fg5Yghj4hNopwoOiP0rGlDDL8fS1A28tenWHSgdYt5Wz2NTIKtcPjNxUGFWwuoGniiSVJBv8CQOGrGua4SPGvhcDciw1YimVCY5/G8GcXiOqRPT3cY3giz/gegN1WNJGDQAAAABJRU5ErkJggg=='
			},
{
			name: '下载',
			url: 'about:downloads',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbklEQVQ4jWNgoDH4PzQNkMVhgCy6QmxAmYGB4TUDA4M9mgH2UHFlYgyBKbaHGoDMJxrANP0nRzMMBEMNCCZHMwyYEKvQk4GB4RnURkL4GVQ9CnjGwMBgTaRl1lD1KIBQgvmPpgZDPcUuoDgMyAYA/mQv97JO38EAAAAASUVORK5CYII='
						},
{
		 name: '显示地址',
		 url: "javascript:%20void(prompt('link%20to%20this%20page',%20location.href));",
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII='
			},{
		 name: '自动刷新',
		 url: "javascript:(function(p){open('','',p).document.write('%3Cbody%20id=1%3E%3Cnobr%20id=2%3E%3C/nobr%3E%3Chr%3E%3Cnobr%20id=3%3E%3C/nobr%3E%3Chr%3E%3Ca%20href=%22#%22onclick=%22return!(c=t)%22%3EForce%3C/a%3E%3Cscript%3Efunction%20i(n){return%20d.getElementById(n)}function%20z(){c+=0.2;if(c%3E=t){c=0;e.location=u;r++}x()}function%20x(){s=t-Math.floor(c);m=Math.floor(s/60);s-=m*60;i(1).style.backgroundColor=(r==0||c/t%3E2/3?%22fcc%22:c/t%3C1/3?%22cfc%22:%22ffc%22);i(2).innerHTML=%22Reloads:%20%22+r;i(3).innerHTML=%22Time:%20%22+m+%22:%22+(s%3C10?%220%22+s:s)}c=r=0;d=document;e=opener.top;u=prompt(%22URL%22,e.location.href);t=u?prompt(%22Seconds%22,60):0;setInterval(%22z()%22,200);if(!t){window.close()}%3C/script%3E%3C/body%3E')})('status=0,scrollbars=0,width=100,height=115,left=1,top=1')",
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsklEQVQ4jaXTvRGDMAyG4WeBdOmpabNDVmAFD0HNFhmAFRghLUtkBEpSoIJ/nMvX+E6nV/4syeSpxCszd6s7N/Soc5kCDd74xNlgxPMKrjEgoYjbi4iPET+Fu4DmKgOuzuAHhh1YgKcwtFf2Zkro1sHR9NYcFZG/LHBgf6PI2xb410Hntx606+B6QXY7H/YH09QOVYXFcgfuXKx0Cri23MQUN1/+h2cU2PsLuU1Wo88Z6xfYZCqNojAzKgAAAABJRU5ErkJggg=='
			},{
		 name: '解除限制',
		 url: 'javascript:(function(bookmarklets)%7Bfor(var%20i=0;i%3Cbookmarklets.length;i++)%7Bvar%20code=bookmarklets%5Bi%5D.url;if(code.indexOf(%22javascript:%22)!=-1)%7Bcode=code.replace(%22javascript:%22,%22%22);eval(code)%7Delse%7Bcode=code.replace(/%5Es+%7Cs+$/g,%22%22);if(code.length%3E0)%7Bwindow.open(code)%7D%7D%7D%7D)(%5B%7Btitle:%22%E7%A0%B4%E9%99%A4%E5%8F%B3%E9%94%AE%E8%8F%9C%E5%8D%95%E9%99%90%E5%88%B6%22,url:%22javascript:function%20applyWin(a)%7Bif(typeof%20a.__nnANTImm__===%5Cx22undefined%5Cx22)%7Ba.__nnANTImm__=%7B%7D;a.__nnANTImm__.evts=%5B%5Cx22mousedown%5Cx22,%5Cx22mousemove%5Cx22,%5Cx22copy%5Cx22,%5Cx22contextmenu%5Cx22%5D;a.__nnANTImm__.initANTI=function()%7Ba.__nnantiflag__=true;a.__nnANTImm__.evts.forEach(function(c,b,d)%7Ba.addEventListener(c,this.fnANTI,true)%7D,a.__nnANTImm__)%7D;a.__nnANTImm__.clearANTI=function()%7Bdelete%20a.__nnantiflag__;a.__nnANTImm__.evts.forEach(function(c,b,d)%7Ba.removeEventListener(c,this.fnANTI,true)%7D,a.__nnANTImm__);delete%20a.__nnANTImm__%7D;a.__nnANTImm__.fnANTI=function(b)%7Bb.stopPropagation();return%20true%7D;a.addEventListener(%5Cx22unload%5Cx22,function(b)%7Ba.removeEventListener(%5Cx22unload%5Cx22,arguments.callee,false);if(a.__nnantiflag__===true)%7Ba.__nnANTImm__.clearANTI()%7D%7D,false)%7Da.__nnantiflag__===true?a.__nnANTImm__.clearANTI():a.__nnANTImm__.initANTI()%7DapplyWin(top);var%20fs=top.document.querySelectorAll(%5Cx22frame,%20iframe%5Cx22);for(var%20i=0,len=fs.length;i%3Clen;i++)%7Bvar%20win=fs%5Bi%5D.contentWindow;try%7Bwin.document%7Dcatch(ex)%7Bcontinue%7DapplyWin(fs%5Bi%5D.contentWindow)%7D;void%200;%22%7D,%7Btitle:%22%E7%A0%B4%E9%99%A4%E9%80%89%E6%8B%A9%E5%A4%8D%E5%88%B6%E9%99%90%E5%88%B6%22,url:%22javascript:(function()%7Bvar%20doc=document;var%20bd=doc.body;bd.onselectstart=bd.oncopy=bd.onpaste=bd.onkeydown=bd.oncontextmenu=bd.onmousemove=bd.onselectstart=bd.ondragstart=doc.onselectstart=doc.oncopy=doc.onpaste=doc.onkeydown=doc.oncontextmenu=null;doc.onselectstart=doc.oncontextmenu=doc.onmousedown=doc.onkeydown=function%20()%7Breturn%20true;%7D;with(document.wrappedJSObject%7C%7Cdocument)%7Bonmouseup=null;onmousedown=null;oncontextmenu=null;%7Dvar%20arAllElements=document.getElementsByTagName(%5Cx27*%5Cx27);for(var%20i=arAllElements.length-1;i%3E=0;i--)%7Bvar%20elmOne=arAllElements;with(elmOne.wrappedJSObject%7C%7CelmOne)%7Bonmouseup=null;onmousedown=null;%7D%7Dvar%20head=document.getElementsByTagName(%5Cx27head%5Cx27)%5B0%5D;if(head)%7Bvar%20style=document.createElement(%5Cx27style%5Cx27);style.type=%5Cx27text/css%5Cx27;style.innerHTML=%5Cx22html,*%7B-moz-user-select:auto!important;%7D%5Cx22;head.appendChild(style);%7Dvoid(0);%7D)();%22%7D%5D)',
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqUlEQVQ4jbWTwQ0EIQhFf10URD80YAmeKcEeKMEi2MMOGV3UncMuiTER3uejEfhHqKqXUpyIXERcVb215o9AInIAyyUie5HeuwMIgRRm5gCcmdciRLRPXu6iQXIyWD/Cqurh5Nrv7rv5RjjOmDnVz4oHGABEJI2bBHZw5I4CJ3jpYJzpGwy872zKf0BHOGpS4rJ0hOMJtzWjiJlN60kDAECtdfkP0ty/iheIvOXe3xfsVQAAAABJRU5ErkJggg=='
			},
{
		 name: '显示图片',
		 url: "javascript:outText='';for(i=0;i<document.images.length;i++){if(outText.indexOf(document.images%5Bi%5D.src)==-1){outText+='<tr><td><img%20src='+document.images%5Bi%5D.src+'></td><td>'+document.images%5Bi%5D.height+'</td><td>'+document.images%5Bi%5D.width+'</td><td>'+document.images%5Bi%5D.src+'</td></tr>'}};if(outText!=''){imgWindow=window.open('','imgWin','width=800,height=600');imgWindow.document.write%20('<table%20border=1%20cellpadding=10><tr><th>Image</th><th>Height</th><th>Width</th><th>URL</th></tr>'+outText+'</table>');imgWindow.document.close()}else{alert('No%20images!')}",
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsklEQVQ4jc3SvQ2DQAyGYZY4yd/rmoqWlgEQXZZgimwXNqBOjegoU5HmiCDkBxJFiiV358f23SXJXwTQuPu4J4HTDXD3cW/TRc0WwMxKYDCz8iUgqZBUfASYWQX0QDcd3LyCpAPQScol5e+QFQAMkvLZKjnQm1kVp8uAs6T6GdDdd5kQdz/G6eoJWQEhhPTRqBFpp4sNIaQR3feM8wC6rwAzyxY1QBu/6GVjjkCzp+nv4goaQ1+Hc93jJgAAAABJRU5ErkJggg=='
			},
{
		 name: '页内打开',
		 url: "javascript:function%20kZRjr(o){var%20a%20=%20document.links,i=a.length;while(i--){a[i].target='_self';}i=o.length;while(i--){kZRjr(o[i]);}}kZRjr(top);",
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAUElEQVQ4jWNgGCyAjYGBYRIDA8NrBgaG/0Tg11D1bDADJjEwMOxmYGAQJ9JCcaj6VpjAaxI0IxvyGsb5T6JmDH2DzwB8MUAfF4xUA8jFlAEAeaY4lePz57gAAAAASUVORK5CYII='
			},

	]
	},

{name: '国外网站',
	favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABEklEQVQ4ja3SoU+CYRDH8U9gc0YLyY3RaGwEM8VisVAIRJP/gJsRs4VoJZkoBqOVxkYjsml5g8X0Bg136Cu8YtDv9oTnnrt77nd3/BMne96amOIVBSZpu8QQuigxqAluYJFBR2jjHu95rmSWOdYbQ4UBnmqSzjPBFPppaKfzEhc4xg2utxKcpv8jDqVjkQ9whllqLjGukXaH0eYyynLWqbPKcZ5tHiofauEts05qnOsoxCQ+GYtud3HwS3A/fb/REzIK0YN9zESTd5j7WpKfOMdKdn+bZmYvxLK0tt47eFaztR2hfShmu1LpcDLAS1aww1ToL3ErRtkQizUSy7Wo+7lKT+hfipGWYi9mWVljX/Cf+ADPsD6Jpy6mewAAAABJRU5ErkJggg==',
 id:'sidebarpage',
	childs: [
{
			name: 'Twitter',
			url: 'https://mobile.twitter.com/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAqFBMVEUAAABNnNZSpeNUquw7eqtOn9pMn9tSpuVTqulWrfBRod9UquxTqupRod5ImtVNoN1QqetVqelLnNhKoONVrO9fwP9UqutTpeZSpONOouFVq+1KlchFltVQqORSo99TqOdQo+IugcdVrvJRo+RVq+pQpudLnNk0lL1Gn+UtWXlXsfRZtPQHDBhVrO5WrfBVrO9Wr/FUq+xbu/tYretTqelXsfRasPBSpeTa/vOqAAAALXRSTlMABLq5NCoh9dPMqKeilFZDNDAQCfbw7+3j0rukopyYkod3dG1kX1ozLSwnFg1mfTAtAAAAm0lEQVQY03WPRw7CQAxFnd47vfdueyYJcP+boRkIG8Rbfb1vWTb8YHQhNc0DHF1w16DJPCm9ZHaCrAnVUDUUxCT7Nrj0GKcGlEiIWE9vAEsSzShZICNybQM4Zo+IUMNtAVC2pCIrIQZqXR5gB8WgiOgrCi1W948Rc3hzsVj3gb76erZ3PiMTW5WunfApVe/vu+fyTWxNoq0Df3gBlY4VuZsJdXYAAAAASUVORK5CYII='
						},{
			name: 'Instagram',
			url: 'https://www.instagram.com/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAACQFBMVEUAAACAZ1R7YE5yW0qKb2CVb1x7ZViOZVdiP0I6JiGAZVVsVUgrARM3EQg4kcRpT0BkRD55XUtpU4OFaVx8U0lvVUQjEw8nBgunjX+PeXGPe22AdG2PdWWAamKIa150XlKEW06LUDFuUkVbRDg/FSRDHxNkSTldOzRTPjGVey2CWlSSRU41HBYnGhIAAAH////g0b/ayrbYxKzSwavOuqE3LCwCDxD58u//+Owqu+r07N3u5tfp3dHi1L/dzrvVx7PNv6nSvaTHs5iyno6nlIdoS3mQeG9kXVs8Qk6UYkhRPjgXKCZAKyRFKyNEIBgCDxgMFxD9+/IUsu37+Ovv6+j78eX28OLo4dz16Nji3tXs4s/n2svl2cnf1MnJycnq38jg1MLe1MHe073Xx7DNvbDQxK3Tw62wq6fVv6W9t6PSup/AsZ7Gtp3NtpzKr5Q6fJO4oZFBdJBmco7Bq42ckIyVjYpibIe5n4ItYIG3nIBrh35zd3mSf3ZUMHWFc2pJYmqKdWhMRmN2Z2GWa16PcFyxeVsrUVc0UFebc1SaZ1RLSVSrcFMiSFOYbVBwWVBHUFB9YU81Uk+paU2VakycXUpGKkpBJkoYOEiPYkeaYEU0LUSUYUNhSkPn5UKRXkEjQUEmKEGRi0CRVD9vTT3h1zs7PTglLzc5MTSbMDRBNDP3LjEbLS/RLCwQICuHPypJNCqgUSkiGCjn5SYyJib/IiZXLiUzJiQnDyOXSiINFiBLJx4lHx4dFRQLDAQOCASBJQBcifjvAAAALnRSTlMA7e3u7e3t7V5e9vb29vLy8vDu7u7u7u7t7e3t7e3t7e3t5OTk5NDQ0NBgYGBgmit8wwAAARtJREFUGNMFwQNiAwEQAMCNk9q2eRfbdlLbtm3btm27/VpnAGKjHVyCSQQCKcjNKTIGgHx9zFO9r8+ML218IuwvMoRd7vBU97rdLd2iEdk/DQe758fEnr/lkanDWzNy82QPnucHDSsT3a2N6qEXk8nsAT6dA0cVXZb2OraGk5yW4Qte1LLcFsSy0DeGNKMo1xvw6Sh6hlg3Vyf3TjgJWf7gJ0rlshDrw9v36JwwiUoEPFWQMoiwf34NBk0Ov4gIAWIhX8n6WJu+eu3NLGQEgistX1A8e6HVsvRVeSVMHNjQaQXZiu07o14pkkjlthBSU0oTS+rV/QoGQ1rdFgqU4drKcjqdyZTJ5E0d8xSAuAhnLBaDwWBx7o5R8fAPkv5TRaxPYM0AAAAASUVORK5CYII='
						},
{
			name: 'Facebook',
			url: 'https://m.facebook.com/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAl0lEQVQ4jWNgoAYw86k/bOXX9J8UbOZTfxhugEvs7P8eSYtJwi6xs//DDcCnMCx31f9j5x79//X7z//3H7//v3H3NVyOKAP2n7j3Hx2QZMDXbz///////39+3RK4/0kyAAZcYmdhyOE1ABd4/PwjZQYsWXecOANg/oUBGN8hYhJ5YYBNbjgZ4BK/4DCpBrjFLzxCZF7FDwAGzvrijJjlXgAAAABJRU5ErkJggg=='
						},{
			name: 'Youtube',
			url: 'https://www.youtube.com/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAz1BMVEUAAAD////lLSfAFx3spKTOAADPJCXvs7PUIyPRISLYJSPdKCTJHCDAFx3lLSfAFx3lLSbFGB7JIh3HBwfIAADfREHRLy/45OTzvr3WODfw1tXbUVDOHyHOHyHbKCXKHSDIHCDdJyTlLSflLSfAFx2/Fx3qMCngLia/ExbeJB6uFBm+ERO0FBnbIxzjKybbJyXEGh7KHR/HHB/eKSXYJCLUIiLRICHOHiDGGyDoLirgKyffKyfLISPGGBvOFRbUExLUBALEAAHdIBzcGhbGCw51TfyoAAAALnRSTlMA/qmp/P79/PT08OHhpKOfkIxE/v78/Pv7+/r68fDo58zIm5qXl4B+eWdiXFZMi05ZjAAAAJVJREFUGNONz8UCgkAUQNE3inTb3R3IDCod6v9/kw9XLDmru71Qg70313oD6StzZwNcg1tFcIRlyBiLPu+IlUIFFKfU9XLnbwayh/JBf9zKHCwZxAdqcYSMhhmWCNITdQRCuF6KJcH0hdqcwBcpjzUB1UWxW3xjtzSHBfUppUlCEaYKZ/9e4R8ALtbW0JpIMzbWqcbrD0iZHNqhgn5zAAAAAElFTkSuQmCC'
						},
{
			name: '9GAG',
			url: 'https://m.9gag.com/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxUlEQVQ4jZWTsRGDMAxF2cDvT8Ai3oM1GIGOJbJDVmAQ+pR0abgjacydEZJz0Z0bW/qS/v/uuiAkzcAO7JLmKO8WKaUB2CR96gNsKaUhLAR6YLWFDtAK9LZ4Ag4neQEW5/4Apnpf2+ktKVfvudxd8loAZ/e+nNsUFiBLejkgpwouHx6RY6vArtFSZKlJLaQ97botO3SScpHsIlsIUPkgdJ2k2QVwRt6sjJ47Q4C/jWRW+GnlerpbtD4TMDaZt4SdRgIeUd4Xoa6rOttLlsoAAAAASUVORK5CYII='
						},{
			name: 'TED',
			url: 'http://www.ted.com',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdElEQVQ4jWNgoBZ4qi376Jm23Adi8FNt2UcYBjzTlvtPCqa+AU+1ZOc91ZZd8VRbdsUzbdm1mJpk18Lkn2rJziMYJlD/wgz4QFKA3lYR4kM34LaKEN+oAUPKgPsKAgLoCem+goAASS5AzlxPtWUfkeQCUgAAdv/PDbvrDVgAAAAASUVORK5CYII='
						},
{
			name: 'Wikihow',
			url: 'http://zh.m.wikihow.com/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVElEQVQ4jY2T30uaYRiG/Wuik514EoNJsVVEsDUiwlifUJnS0CQzv2k19jEQ3eYmWkqJxdaIwaQwLTUIi8rSkSxHEMQEiRzBCPqCoKNrBy1HPxa9cMP7HDzXez/3w6vwzJtL4yuiPLU1LIfSdjmUtssfvw2V71Nbw/L4iih7Yv2yN265ov6SIrhqw+bXojG3YHJpMDoEuofUGB0CJpcGjbkFm19LcNWGL2G5JkUobZctng4qKpU0qhvokdqoqFSiMbfQPaSmolKJ6OtiYsN+rdkbt8gKb9wiT2YGadU30ahuwJewUFWtwuTSYHJpaNU38Sk7fOPrlwCirwtVfQ3PepupfVpLXXMdDx8/wubXMpkZvB0wtiziS1hQ1ddQVa3C5teirLqPqr6GwJKVwJL1dsBIcoCxZRGLpwOjQyC4aqNHakPnfIJroRMpLPB+vhdnRIcUFpDCAm+jz/EnxXPABXFiw87Ehh13zMDX728oHm+TK6TY2c8wkw2wuZcgV0iRL66TzE/jmO28DLiQO2ZgJDnA4fE+AKdnJ4wuWtncS3BxZrKB/wNGkgNIYYEv6Q8AJPPT6IMPcEZ0APw8/IEUFv5lcFNAjtkuorlQ2cHBUYHf8q8ywBnR4Vnouxvg4KjA2u4c+eL63QCji9ZLI0RzIdpH7iGFhbuN4I4ZGF20li2fnp0QXHpJrpAqhxjNhc5DvMm+O2ZgMvWanf0Mm3sJ8sV1ZrIB1nbnyqtMbH/GGdGh8Mb7S1e/qT8pyp6FPlkKt8uv/upd1Cg7ZjvLtSuil/3JF6U/ttTKA0K+IGEAAAAASUVORK5CYII='
						},
{
			name: 'Wikipedia',
			url: 'https://zh.m.wikipedia.org/wiki/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABjklEQVQ4jaWToYrDQBCGx0RGR1dVxdfGxOQN6iIjSk1MXQ8iDkpFVWQeISa2qqpQ6gJXFQIxLSsSCDW57Hfmmru2HBx3Aytm2P323392RESk7/tXrfUbUP9maa3f+r5/lc/DL/wx+r5/EeDyVwBwkbqu3/M8B0ApRVVVFEVxlyulaJpGl2VJWZY0TaOLoqCu63c5n8/1bDbDsixc1+VwOJAkCZZl4fs+eZ4ThiGj0YjtdsvxeGQ8HjOdTlFK1fJpDCKCbduDNtM0h3y5XDKfzwHoug7P8yjLEuALkKYpIkJVVQDs93tEhCRJiKKIrusAiOOY1Wp1u+cLAGAYBp7nDSocx0FEOJ1OQy0IAm6ePQGiKEJEaNuW76pupmZZRhiG37twD+i6DhFhsVgAkCQJhmHgOA4AYRiy2+1+BgD4vo9pmmRZRpqmgxfr9ZrNZsNDPAOUUogIlmVxvV4BsG377il3AK11/1h1XZcgCIY8jmMmk8njNrTWvWitn75y27ZD227e3Ix9AFz+P0z/HecPSANlwPFAIAUAAAAASUVORK5CYII='
						},            
	]
	},

{name: '国内网站',
	favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABDElEQVQ4jb3ToW4CURAF0GMRKBSuBoVGYXArSCUfwAdgalbwBfxAg+ofNEFXVuCqMBgMYkWxDY6k4g3tY7sNxXSSSd7unTtz985b/ine8IEtntC7tUEXrSCWeMf4lgZ3mKAfz4No0qhkhGe8ZoQHrLDHIt6V0udcxCKKpkF6qeHtwPuhap+DjzG1kylZR6M1dphFjqJmcibPsIkJ5+hIrq+CUOJUqyHkHFxfzUbyplsHlpjHuUAVWdTqBpJpB9znwC6bXmEYWf2ipAg1X3HKzn9pMJZMvVAwyMBKWk/TTetF/QU2CcJMMrTucjtkL6XbN22SNZQM2uIYWUk/0DEkz33fkavRktb1Y+f1+AQEET4cDdInTwAAAABJRU5ErkJggg==',
	childs: [
{
      name: '新浪微博',
      url: 'http://m.weibo.cn/',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABTVBMVEUAAAAAAADjHyW4uLhgYmLhExfvkADiJyjeGxzdGCbgKSTeGRvjUBffYBH6///t////9/j/8fLL4uH/2NnQ0NC+y8uLpqXyn6D9jI93i4t4ionsbG9XWVnnRklDQ0MkJCQUFxfiIyj9mADgFBj+ogDdAwfgEhbxlAD5mADxP0PlKSreESvwkwDiDRDxlADhGSfgIyb4mgDWgADiFy3EgQDxlwHfCg/ylAD9lQHzJirgGynfFiX6LTHjKSzliQDaHiHjDA/GAADkEhbxlADynQCQWADZnwDfISPclgDwkwC/fgDOEhLbHyPxlAD2mgDoDBDvAC7rjgDsjwDMdAD////lJCjgDBDgBgviHCDhFRn/kpTqVlnmOz/kKCzhEBXeAAT2mAD/3d6yxcX7nqD0nZ9/mpn0j5Lwi47miYv6f4I9Xl3oOT0bOzvkLzPiGCoKOc6VAAAAVHRSTlMA/tL+/qaMZ2JKNRkJBf7+/v7+/v7+/v7+/v7+/v7+/v78+/r49/Dq5OLi4ODU0crKyr63trSzsrGqqKWgnZeShYFya2FZWFVTUE5NREM7NzYxJhObZE0TAAAAxElEQVQY033Ixa4CQRRF0VON23N3d3fB3fVWC+4O/z8EEiYkhDXa2VjA8/Qdmxnah+tyaNp6hwGweNPacgpjUYHzO8D8eZN5ewWg41yWBf3/u/Hnw3cBBApKSZTPJXH4F/fbz2A6lQo76yuV+qH0DISDsEm51aWt3TWiffE+CeAqT8snjDEV0UARAJRapD5WHTE1Ub74AuArR3sHG4xt0rbIDQBMjx1q9LtVahYVHSYsrttsu5btXWqMmEq4rb8aZ8SMuUY5GiMfE/vy4wAAAABJRU5ErkJggg=='
       },{
			name: '知乎日报',
			url: 'http://kanzhihu.pro/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAw1BMVEVi0f8wwf0tv/wrvfgDmc0NodcHnNEWp+IUpd8Qottl0//l9/4hs+4dsOkJndQEm88aq+cQpdwKn9UFls0Bl8sDlcv0/f8+xf2v4fap3vQjtvEeruwUo94KmtEBlMnr+v8oufQZrOUYquT4/f/c8/zS8PzK7fs0wPuo4vp61fq35fl20fYouvUouvQkt/Eis/Ass+0gqN4Qndbf9fu/6fgoufWj2vIwt/GQ0++Ez+5fwedhwuVbvuMpquNHsNwWotATkrsPqyMnAAAAuklEQVQY003HVxKCQBBF0VYHGBlAJ0gSJJhzznH/q7KBssrz0f0umKYJP1V4tT8edr00Hlffg0ZhOuz3h9NywnJxTCcu833mTtJ0sYRVGM7d2Xm93vjuPAxXYFnWiG266LkfYYBt20nQLhinBAOyPEsCoxC9rnmegUHpYbCNKKXRDq8BnDdvLNg2S5xz0IS2u7BBcNcqIBwnjh8z5jtICAG63iJSyjjWK0AI6SApCWkV4KOU6qGOUgS9v3y4Ew0x8HFQAAAAAElFTkSuQmCC'
						},{
      name: 'ONE一个',
      url: 'http://wufazhuce.com/',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA9klEQVQ4je3RMUvDYBDG8TeCoIvWwQ5B3QSpo+DqqpPfQMHR7oJTQUFwKeL3aGo0DUYUBXGoUlQklLq7NfemaU0Qh79DhCLp5lLQ4eGe6Qd3p4yq8Juof+AnMGkH5J20T9j9OXUqmI4wWg1QlTaqEmSBlZuQ0kuX4mOPrYceztsHixchJT/mqJWweR8x52qWLjUFT2eBg2bMiJXKh82Yfb+f49eE3acus65m7VpT8MIssHobsfP8zkY9YrsRsefHmDVNvf1JuZWwftchdyYsX3UwBq1gWMKMq5k/T/v09y3yjmDWhAVPM2YL4yeCsgYBQ/HGPwp8AZZWrx7eI2yVAAAAAElFTkSuQmCC'
       },{
      name: '青年图摘',
      url: 'https://qingniantuzhai.com/',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAB3VBMVEX////9/f39///m6e3AwMb7//7//v/9/P///vn49vj39PPf3t/a19nOzdLLycz+/v72+Pzz9fbw9PX39fPy7vL89/Hr6enp5eba4OTo5uLX3d3FyM7DyMrAw8n+/f///vf////1///6///b8v202utfpNIacrj9///0/f/y/f/n9v/k+P3//vrz9fjE5/Ww3fTi7PKu0+ik0Ofk5OSYxOHh3+AdjNzX2dgji9cliNQWgtMjhs7Gx8tTmMcLeMa7wcMRdr46gbowgLkpernu///u/P/O8P7z+Pvg8Pn5+Pj49PjT8vju9vb59vXd7vX19PTs8vTt8fPM6vPX6fPe6PLz8vHn7PD68+/v7++k1+/F4uvi5efO2+S81eSOy+R9veOoyeKbxuFjuOHX3uCkyt+90968y96EvNubx9p9udlTn9jc29fP09eoytePvdeTvNaPu9WAttXHy9OEudMahdMmidEuitAsiNBWnc9MmM9+ss45kM4Wgc5opctnnstKkss7jctcnMoMeMnJyMdEjsclfsfBxMZansQifMQqg8MXe8PCxMIefsIIdMIogcBFir8xgb1Vkbwhe7sAaboAZ7cTbbM2fbEWcq8odK4AYakjcKgZaahUhacWZJ8RWooFPSyqAAAAIHRSTlPv/e/v7/vv7+/v7+/v7+/g7+/v7+/v7+/v7+/v7+/g4LIH5V0AAAEISURBVBjTHcjTdgMBEADQSbJJ49TGLGPbqm3btm3b/tae5j5eUIkgM08pEwiylfkCEBeBEN3hLkywh93IA5i6IpG2Djj6a7HidAgg9aiGGg7eHay/zqvRGEiBXDvORfesOrrHsdmJThnkIBPbtyFJ4eznQzkvCyTa3ZNJvaHMiOat+DimA5iiaxt6Q1sldqyeT5BJAOZHz8UCieqmoJdb+o/G2PLKLdvbd+z3fM1gMmQUs08u73Xk0u8KnZEtUpBWm96fQ9s+3+FNZLDUkgZ8Z33VTpx74e7Zt4/fERFA3bSFohkbQ1NjP98NfOBhe2CxVaMt0TV3j2pQCCoAiZwgFIoCQi4GfuEfTMs8p+k60I8AAAAASUVORK5CYII='
       },
{
      name: '豆瓣网',
      url: 'http://m.douban.com',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABGElEQVRYhWNgKOfzZCgXfMZQLvifzvgZQzmfJ8MAWY5wxABaDsGDzgEP3j36Tyvw4N2jUQcMgTQwaBxw4dllqgX9hWeXh7gDbry6/b9hdwdJ+Mar29RzwIarW0mO2w1Xt446YBg5YMATIaVgaDoAhnfc3As36NGHJ/8VOvTx4kcfnsDV77i5l3B6IaQgZU0eim/Ue0xxqlXvMUVRm7Imj3IHyLRpoxhasLkKp9qCzVUoamXatCl3AEO54P9Lz6/CDd15ax9OdTtv7YOru/T8KnFZlhhFnQcmwg3+8fvHf64aKQw1XDVS/3/8/gFX13lgInkOoDUYdQBZaYCmeNQBDAPZOS0TfM7AUMrnxVAm+HwAHPCEoZTPCwCpFBoqmuUyPAAAAABJRU5ErkJggg=='
       },{
      name: '果壳网',
      url: 'http://m.guokr.com/',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA4klEQVQ4jZXRoQ6DMBAGYB5iZpnBoCdHZjA8wOYa/BSCDINAkBBmcAjkknksdhq3JwCFm+INbuq6o/Q6dknlfX/b39rcDrDmBI8jlJ0HZefB+bKTx1oL4HLWunPAaYa/0rXAtgqNQNa6Erje90vAdAuaXnYeiNiWyyLxvwCHmIAiDeaA7il0WW2gzqM5oCJqOgVE4usB+hT6eWoDRRrwwLYKtem0gTqPeMBpBkifJxYQsf0b6KdxAWADeH0WyF5vAIAFggAus0A/jYCja8AIYDod2gDWxwI0HaefRgnQ99d5BB+ezV767XUN9QAAAABJRU5ErkJggg=='
       }, {
		 name: '句子迷',
		 url: 'http://m.juzimi.com/',
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABgFBMVEUAAADhaQDyewbzfQfjbADfVwD1ggviagDgYwDhZQD1gQveaQH1gw31fwrjbADgXQDhYADfWABQ5kRO6EX1hA5R5kTsdAT3ggjjbQDgWgA3/FD0fQXhagDhaAD2bQDzfwniawDjZgDoUAA1+k1G6UDibADiagBF6kT0ggzxggv////4gwD/6s72fALjZgD81q37tWH3iBP3hRD4hgX3gAP1cQDiYwDhYADhWADfUQD//f354Mr41rn92rD90qD905z6ypr4sGr6sVrslkn+rz7ofyLneBT1dgD1bQDkawD1agDhXAD/+vT89vL78uv+9er87uH/7dL75dD84sf52b7827f3z6j91ab1zJ/1xZn8zJX8yZL7yZH5v4TxtYD5tXv3uHr9w3L5sWr7t2jup2ftpWX8uGH/jVn6q1I8+E/smU/+tUtM50JL50H3mjz5oDv4mTD3lCr2jSX7nSL/pCDxdB/6kxbvgBb9mhT6kAi6hgf/Xwa5ewDQaQD1YgDmXgAGZ/1OAAAAKnRSTlMADfLo6OiwsLBJRTj4+Pj48vLv7enn59fX18C1tbWrpKSkpKNCQkIyDgyvW7uYAAAA7klEQVQY0yXPxWKDABBF0Wm8Sd3d9RGgOMRd6+7u7i6/XghnN3c1jyzVg20Oh7PfT7YqX+6NlUVBED0TlbszO82X8owkMXL7pBl6jA3MJXg+Gl2L3XUTjRo5IATbEesnnxbGbUF6fcpkFjDFeMi9Duxsx+Lxq+egGVqo/iSyCMvBuxnkGqor68sQlE2cfgRxztaSSy2HIZa2kGKCuGed5OXUCCwpZQkPSh+Ncdo8VhP7h/nCLB5/A0S93PGu/pdM7q0AX5/j5usduqFxMwBCZz/Xw9YYb7GoZi/T6Zfvm4tWe/6Aq6HRPRQY6Wpq/geaODHRno1+SgAAAABJRU5ErkJggg=='
			},   
{
		 name: '煎蛋网',
		 url: 'http://i.jandan.net/',
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABkklEQVQ4jX2Tu0sDQRDGRxuxsJH4QLSy9W/Qyl4QrARrEazsLKwES0EEQWwURGx8NGIjCEEtBAslaBGMj/gIPpa5GBNj9mdxe/ES7xz4uN2Zb7+ZuZ0VIAtoFL6SD2rfo2MOWSHObApvfIDPxQmwmViaOKWQ3UNxGlTACPZOQFt8H1/157VWwKZAe3x3qQ5GwBvwE8QKfAyCET5zwtutQF5A3do4FCdjBMwH3DRBRcicC3sbAgi23MjehhOpCKQT4ZQhAW8YnhuqWakIrHbDZqe/VlfRcwPoVEjA5hRv+Jdg3Lci/uHdtl8BE+IUJ4GyCuWkVgNBMCDjEPYVQjxrVPg+VtSVFm4hCvk6njUqWKPYA7joh7S7shgBW26ElMDlCNgD10LwE19v/xfIu/JT4t9Y5BzczfgiQe9BO8H+SuBp6Z9BAtBZjrZa8S674DEBLwmuT9o53e2A9/XIUa6xbM6SaO5lYW4eSgUoFRgdGqOnvQ+vVM/2a6t5zjeZrC6vrOlh8qzq297Z1+WVNTVG/zznH3wYY1UC31I3AAAAAElFTkSuQmCC'
			},
	]
	},

],

		makeButton: function (sitelist, parent) {
			var i,
				len = sitelist.length,
				item,
				btn,
				menu,
				menupopup,
				menuitem,
				frag = document.createDocumentFragment();
				insertpoint = document.querySelector('#sidebar-header .close-icon');
			for (i = 0; i < len; i++) {
				item = sitelist[i];
				if (item.childs) {
					if (!parent) {
						btn = frag.appendChild(document.createElement('toolbarbutton'));
						btn.setAttribute('tooltiptext', item.name);
						btn.setAttribute('type', 'menu');
						btn.setAttribute('style', getIconStyle(item));
						menupopup = btn.appendChild(document.createElement('menupopup'));
						SidebarMod.makeButton(item.childs, menupopup);
					} else {
						if (item === 'sep') {
							parent.appendChild(document.createElement('menuseparator'));
						} else {
							menu = parent.appendChild(document.createElement('menu'));
							menu.setAttribute('id', item.name);
							menu.setAttribute('label', item.name);
							menu.setAttribute('class', 'menu-iconic');
							menu.setAttribute('style', getIconStyle(item));
							menupopup = menu.appendChild(document.createElement('menupopup'));
							SidebarMod.makeButton(item.childs, menupopup);
						}
					}
				} else if (parent) {
					if (item === 'sep') {
						parent.appendChild(document.createElement('menuseparator'));
					} else {
						menuitem = parent.appendChild(document.createElement('menuitem'));
						menuitem.setAttribute('label', item.name);
						menuitem.setAttribute('tooltiptext', item.name);
						menuitem.setAttribute('url', item.url);
						menuitem.setAttribute('class', 'menuitem-iconic');
						// menuitem.setAttribute('src', item.favicon);
                        menuitem.setAttribute('style', getIconStyle(item));
						menuitem.setAttribute('oncommand', 'openWebPanel(this.getAttribute("tooltiptext"), this.getAttribute("url"))');
                        menuitem.setAttribute('onclick', 'SidebarMod.itemClicked(event, this.getAttribute("url"));');
					}
				} else {
					btn = frag.appendChild(document.createElement('toolbarbutton'));
					btn.setAttribute('tooltiptext', item.name);
					btn.setAttribute('style', getIconStyle(item));
					btn.setAttribute('url', item.url);
					btn.setAttribute('onclick', 'openWebPanel(this.getAttribute("tooltiptext"), this.getAttribute("url"))');
				}
			}
			insertpoint.parentNode.insertBefore(frag, insertpoint);

            function getIconStyle(item){
                if(item.style){
                    return item.style;
                }else{
                    if(!item.favicon){
                        return item.childs && getIconStyle(item.childs[0]);
                    }
                    return 'list-style-image: url("' + item.favicon + '")';
                }
            }
		},
		makeSplitter: function () {
			var sidebarBox = document.getElementById('sidebar-box'),
				splitter = sidebarBox.parentNode.insertBefore(document.createElement('splitter'), sidebarBox),
				sidebarBoxArrow;
			splitter.setAttribute('id', 'sidebar-box-splitter');
			splitter.setAttribute('onclick', 'toggleSidebar();');
			sidebarBoxArrow = splitter.appendChild(document.createElement('div'));
			sidebarBoxArrow.id = 'sidebar-box-arrow';
			sidebarBoxArrow.className = sidebarBox.hidden ? 'right' : '';
			//sidebarBoxArrow.className = sidebarBox.collapsed ? 'right' : '';
		},

//添加侧栏前进、后退、刷新按钮
			addControlBtn: function(){
				var SHBtn = document.getElementById("sidebar-header");
				if(SHBtn) {
					var _sidebarBtn = document.createElement('toolbarbutton');
					_sidebarBtn.setAttribute('type', 'button');
					_sidebarBtn.setAttribute("tooltiptext","左键：后退\n中键：刷新\n右键：前进");
					_sidebarBtn.setAttribute("class", "toolbarbutton-icon");
					_sidebarBtn.setAttribute("image","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAYAAAAMJL+VAAAAbUlEQVQ4jWNgGK5Ajpbq7RgYGH4xMDAoEKleAarejhTDiVJMqj5yDSdKP6WG4zUnhEjDWxkYGL5AaWIsCYEJ/GdgYCghwnW/oGq/EKG2BKqWgYGBDj5AFqRJHFDLEpomVZL00TQnwwBNyyKqAgAC4Cdg6UykrwAAAABJRU5ErkJggg==");
					_sidebarBtn.addEventListener("click",
					function(event) {
						var webPanel = document.getElementById('sidebar').contentDocument.getElementById("web-panels-browser");
						if (event.button == 2) {
							event.preventDefault();
							event.stopPropagation();
							webPanel.contentWindow.history.forward();
						} else if (event.button == 1){
							webPanel.contentWindow.location.reload();
						} else {
							webPanel.contentWindow.history.back();
						}
					},
					false);
					SHBtn.insertBefore(_sidebarBtn, SHBtn.childNodes[2]);
				}
			},




			toggleSidebar: function (commandID, forceOpen) {
				var sidebarBox = document.getElementById("sidebar-box"),
				sidebar = document.getElementById("sidebar"),
				sidebarTitle = document.getElementById("sidebar-title"),
				sidebarBoxArrow = document.getElementById('sidebar-box-arrow'),
				lastcommand = commandID || sidebarBox.getAttribute('sidebarcommand') || sidebarBox.getAttribute('sidebarlastcommand') || 'viewHistorySidebar';
				
				if (!commandID && sidebarBox.hidden) {
					if (sidebarBox.getAttribute('sidebarcommand') === '') {
						toggleSidebar(lastcommand, true);
						sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
					} else {
						sidebarBox.hidden = false;
						if (sidebarBoxArrow) sidebarBoxArrow.className = '';
					}
					return;
				}
				
				if (!commandID) commandID = sidebarBox.getAttribute("sidebarcommand");
				let sidebarBroadcaster = document.getElementById(commandID);
				
				if (sidebarBroadcaster.getAttribute("checked") == "true") {
					if (!forceOpen) {
						if (sidebarBox.getAttribute('sidebarcommand') !== 'viewWebPanelsSidebar') {
							sidebar.setAttribute("src", "about:blank");
							sidebar.docShell.createAboutBlankContentViewer(null);
							sidebarBox.setAttribute("sidebarcommand", "");
							sidebarTitle.value = "";
							sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
						}
						sidebarBox.setAttribute("sidebarcommand", "");
						sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
						sidebarBroadcaster.removeAttribute("checked");
						sidebarBox.hidden = true;
						if (sidebarBoxArrow) sidebarBoxArrow.className = 'right';
						gBrowser.selectedBrowser.focus();
					} else {
						fireSidebarFocusedEvent();
					}
					return;
				}
				
				var broadcasters = document.getElementsByAttribute("group", "sidebar");
				for (let broadcaster of broadcasters) {
					if (broadcaster.localName != "broadcaster") continue;
					if (broadcaster != sidebarBroadcaster) broadcaster.removeAttribute("checked");
					else sidebarBroadcaster.setAttribute("checked", "true");
				}
				
				sidebarBox.hidden = false;
				if (sidebarBoxArrow)sidebarBoxArrow.className = '';
				
				var url = sidebarBroadcaster.getAttribute("sidebarurl");
				var title = sidebarBroadcaster.getAttribute("sidebartitle");
				if (!title) title = sidebarBroadcaster.getAttribute("label");
				sidebar.setAttribute("src", url);
				sidebarBox.setAttribute("sidebarcommand", sidebarBroadcaster.id);
				if ( title &&  title !== '') sidebarTitle.value = title;
				sidebarBox.setAttribute("src", url);
				sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
				
				if (sidebar.contentDocument.location.href != url) sidebar.addEventListener("load", sidebarOnLoad, true);
				else fireSidebarFocusedEvent();
			},

			modifySidebarClickBehaviour: function () {
				var sidebar = document.getElementById('sidebar');
				sidebar.addEventListener('DOMContentLoaded', function(){
					if (sidebar.contentDocument){
						sidebar.removeEventListener('DOMContentLoaded', arguments.callee, false);
						var wpb = sidebar.contentDocument.getElementById('web-panels-browser');
						if (wpb) {
							wpb.onclick = null;
						}
					}
				}, false);
				
				eval("window.asyncOpenWebPanel = " + window.asyncOpenWebPanel.toString().slice(0, -1) + 
					'var wpb = sidebar.contentDocument.getElementById("web-panels-browser");' +
					'if (wpb) wpb.onclick = null;' + '}'
				);
				
				eval("window.openWebPanel = " + window.openWebPanel.toString().slice(0, -1) + 
					'var wpb = sidebar.contentDocument.getElementById("web-panels-browser");' +
					'if (wpb) wpb.onclick = null;' + '}'
				);
			},

			init: function() {
				window.toggleSidebar = this.toggleSidebar;
				this.makeButton(this.sitelist);
				this.addControlBtn();
				this.addControlBtnAutoHide();
				this.modifySidebarClickBehaviour();
			}
		};
		
		SidebarMod.init();
	}
})();




