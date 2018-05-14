// =====================addmenuplus 配置 runningcheese 版======================

// =====================右键菜单定制======================
//复制所选
page([{label:'复制',id:"context-copy",condition:"select",accesskey:"",clone:false},{label:'粘贴所选',id:"context-paste",condition:"input",accesskey:"",clone:false},{label:'剪切所选',id:"context-cut",condition:"input",accesskey:"",clone:false},{label: '删除所选',id: "context-delete",condition:"input",accesskey:"",clone:false}]);




//标签右键菜单项
tab([
{
        id:'context_SmallWindow',
				label : '弹出当前标签',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQ0lEQVQ4jWNgoBL4TyZGMYAcS2ljALGG4XUBMQYS9MJ/PHJEGQATJ8sAnNFFqguIBsQYQHFCwhdTg8QAQpkGbxiQDQDkmEO9y3ip2QAAAABJRU5ErkJggg==",
oncommand : function () {
document.getElementById("nav-bar-overflow-button").click();document.getElementById("popupwindow_ettoolong-browser-action").click();
setTimeout(function(){
(function ()
{if(document.getElementById('main-window').hasAttribute('ontop'))
onTop=false;else onTop=true;
	try {

	Components.utils.import("resource://gre/modules/ctypes.jsm");
	var lib = ctypes.open("user32.dll");
	var funcActiveWindow = 0;
	try
	{
		 funcActiveWindow = lib.declare("GetActiveWindow", ctypes.winapi_abi, ctypes.int32_t);
	}
	catch (ex)
	{
		funcActiveWindow = lib.declare("GetActiveWindow", ctypes.stdcall_abi, ctypes.int32_t);
	}
	
	if (funcActiveWindow != 0)
	{
		var activeWindow = funcActiveWindow();
		
		var funcSetWindowPos = 0;
		try
		{
			funcSetWindowPos = lib.declare("SetWindowPos",
								ctypes.winapi_abi,
								ctypes.bool,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.uint32_t);
		}
		catch(ex)
		{
			funcSetWindowPos = lib.declare("SetWindowPos",
								ctypes.stdcall_abi,
								ctypes.bool,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.uint32_t);		
		}
		
		var hwndAfter = -2;
		if (onTop)
			{hwndAfter = -1;document.getElementById('main-window').setAttribute('ontop','true');}else document.getElementById('main-window').removeAttribute('ontop');

		funcSetWindowPos(activeWindow, hwndAfter, 0, 0, 0, 0, 19);
	}

	lib.close();
	
	} catch (ex) {
		alwaysontop_log(ex);
	}
})()
}, 300);}
},
]);


// 页面信息右键菜单
new function () {
	var items = [
{
label : "置顶当前窗口",
id:"context_StickyTab",
onclick : function () {
	(function ()
{if(document.getElementById('main-window').hasAttribute('ontop'))
onTop=false;else onTop=true;
	try {

	Components.utils.import("resource://gre/modules/ctypes.jsm");
	var lib = ctypes.open("user32.dll");
	var funcActiveWindow = 0;
	try
	{
		 funcActiveWindow = lib.declare("GetActiveWindow", ctypes.winapi_abi, ctypes.int32_t);
	}
	catch (ex)
	{
		funcActiveWindow = lib.declare("GetActiveWindow", ctypes.stdcall_abi, ctypes.int32_t);
	}
	
	if (funcActiveWindow != 0)
	{
		var activeWindow = funcActiveWindow();
		
		var funcSetWindowPos = 0;
		try
		{
			funcSetWindowPos = lib.declare("SetWindowPos",
								ctypes.winapi_abi,
								ctypes.bool,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.uint32_t);
		}
		catch(ex)
		{
			funcSetWindowPos = lib.declare("SetWindowPos",
								ctypes.stdcall_abi,
								ctypes.bool,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.int32_t,
								ctypes.uint32_t);		
		}
		
		var hwndAfter = -2;
		if (onTop)
			{hwndAfter = -1;document.getElementById('main-window').setAttribute('ontop','true');}else document.getElementById('main-window').removeAttribute('ontop');

		funcSetWindowPos(activeWindow, hwndAfter, 0, 0, 0, 0, 19);
	}

	lib.close();
	
	} catch (ex) {
		alwaysontop_log(ex);
	}
})()
},	image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGUlEQVQ4jZ2QsUoDURBF8xfvzbm/IWhAFEEtFCwsBRE1nWUqySeIKAoiooWineA/pBEt0qUQP8BiXVAknbA2s/CUbDbmVvPum3vvzDQaYwDoSroep3coJOWSCuBsUoNnSU3gC7iaxKBIa+DyP+IPoAt8lhwwkHT0qxFoSToG7oBl594knXt9AbwAi2Y2J6mQdFOmNH20zMwOgb43PP4J6Tn/BGRAL/3ck5Qn720gk9Tx9wHwHkKYGbVvOz1YCGEa+AYegMFYRwM2fJ1ZN91KTWsRY5z3PQszm3KTV2CpVlym+eitMhk4AW5His1s00dfS7h9STnQB04rxeXeMcbVIVO13Xi3Srzj4pWqgBjjQmW6pHszW69sqMEPppVYpMrPTWIAAAAASUVORK5CYII=",
},
 {
				label : '谷歌站内搜索',
        tooltiptext: '注意：需科学上网',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg==",
				oncommand :function () {
				gBrowser.loadURI("javascript:var%20Bar=location.host+%22%22;q%20=%20%22%22%20+%20(window.getSelection%20?%20window.getSelection()%20:%20document.getSelection%20?%20document.getSelection()%20:%20document.selection.createRange().text);%20if%20(!q)%20q%20=%20prompt(%22\u8BF7\u8F93\u5165\u641C\u7D22\u7684\u5173\u952E\u8BCD:%22,%20%22%22);%20if%20(q!=null)%20{var%20qlocation=%22%20%22;qlocation=('https://www.google.com/search?num=30&hl=zh-CN&newwindow=1&q='+q+'&sitesearch='+Bar+'');window.open(qlocation);}%20void%200");
				}
},{
				label : '百度站内搜索',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg==",
				oncommand :function () {
				gBrowser.loadURI("javascript:var%20Bar=location.host+%22%22;q%20=%20%22%22%20+%20(window.getSelection%20?%20window.getSelection()%20:%20document.getSelection%20?%20document.getSelection()%20:%20document.selection.createRange().text);%20if%20(!q)%20q%20=%20prompt(%22\u8BF7\u8F93\u5165\u641C\u7D22\u7684\u5173\u952E\u8BCD:%22,%20%22%22);%20if%20(q!=null)%20{var%20qlocation=%22%20%22;qlocation=('http://www.baidu.com/s?&ie=UTF-8&oe=UTF-8&cl=3&rn=100&wd=%20%20'+q+'%20%20%20site:%20'+Bar+'');window.open(qlocation);}%20void%200");
				}
},
{
		label: "显示所有地址",
		keyword: 'showl',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHklEQVQ4jWNgGFbgPxQjswnhQQZGvTAYwDDwAlkAAEEYL9GD9eUiAAAAAElFTkSuQmCC"
	},{
		label: "显示所有图片",
		oncommand: function() {
               gBrowser.loadURI("javascript:outText='';for(i=0;i<document.images.length;i++){if(outText.indexOf(document.images%5Bi%5D.src)==-1){outText+='<tr><td><img%20src='+document.images%5Bi%5D.src+'></td><td>'+document.images%5Bi%5D.height+'</td><td>'+document.images%5Bi%5D.width+'</td><td>'+document.images%5Bi%5D.src+'</td></tr>'}};if(outText!=''){imgWindow=window.open('','imgWin','width=800,height=600');imgWindow.document.write%20('<table%20border=1%20cellpadding=10><tr><th>Image</th><th>Height</th><th>Width</th><th>URL</th></tr>'+outText+'</table>');imgWindow.document.close()}else{alert('No%20images!')}");
			   },
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHklEQVQ4jWNgGFbgPxQjswnhQQZGvTAYwDDwAlkAAEEYL9GD9eUiAAAAAElFTkSuQmCC"
	},
{
		label:"查看明文密码",
		url: "javascript:(function()%7Bvar%20IN,F;IN=document.getElementsByTagName('input');for(var%20i=0;i<IN.length;i++)%7BF=IN%5Bi%5D;if(F.type.toLowerCase()=='password')%7Btry%7BF.type='text'%7Dcatch(r)%7Bvar%20n,Fa;n=document.createElement('input');Fa=F.attributes;for(var%20ii=0;ii<Fa.length;ii++)%7Bvar%20k,knn,knv;k=Fa%5Bii%5D;knn=k.nodeName;knv=k.nodeValue;if(knn.toLowerCase()!='type')%7Bif(knn!='height'&&knn!='width'&!!knv)n%5Bknn%5D=knv%7D%7D;F.parentNode.replaceChild(n,F)%7D%7D%7D%7D)()",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAjVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADqhzP4AAAALnRSTlMAtqa4rqqURQbFn4+EciQUDdbAvJxhCs6ximldV1BNSTwmHBr25+XLsnpYMjAfbW7huwAAAKRJREFUGNM9yFWuxEAMBdFqSneYM8yPwftf3sjSKMcfJV9UnMzWm+nMi82/b8vS1MM2AaTc8jJtOqAoWJUe4ieqaVD5CVvDLeuD+yh/YfaYO7XInLqdSEVnCFQiJVWP01o9kfOfSJuJDFhMSyZvTR2vIj4lg93D9Ws8/by7Cxw8lxzgP8aHdjhCyFhVBug267LrW81ixv0dHrMb9VfHwoXgigPAE+P4C0U7fVB0AAAAAElFTkSuQmCC"
	},
 {
		label: "浏览器界面截图",
		oncommand: function(event) {
			var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
			canvas.width = innerWidth;
			canvas.height = innerHeight;
			var ctx = canvas.getContext("2d");
			ctx.drawWindow(window, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
			saveImageURL(canvas.toDataURL(), "Firefox.png");
		}
	},
];
	var menu = PageMenu({
		label: "多功能菜单",
		condition: 'normal',
		insertBefore: 'context-openlinkincurrent',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABBJREFUCNdjgID6fxCaIBcAcUwEeC1dweYAAAAASUVORK5CYII="
	});
	menu(items);
};


//当前页面
new function () {
	var items = [
	{
    label: "编辑当前页面",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAzklEQVQ4y73SIUuDYRAA4FMeNK9Pqz/B4mSbQ2Wg/8E2g+CPEctYXzcZrNaJQYMsj7kiBmHwhZULMsTt+8KuvO8dPPDevRexqUALL/jCHXbL4EvMcY09POC+DP7EIM8mapiXwYeZn2R+hY9S+Fd9mO20quAjzNCtghuJz6vgduKz/3AXP2gs1TuJ26uG9pqL8o6DrJ0mbq7C+5hiGz2Ms50Zjtf57xv0876DEb6X2/krthI9RsRbRNQi4iIixhFxWxTF87rrOsFTvqQem4wFTec0RRu9Et4AAAAASUVORK5CYII=",
      url: "javascript:document.body.contentEditable%20=%20'true';%20document.designMode='on';%20void%200"
},
{
                label: '解除右键限制',
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIVBMVEUAAAAAAAC4uLjb29tmZmY6OjqRkZHr6+vIyMiurq6enp6fJmq8AAAAAXRSTlMAQObYZgAAAGVJREFUCNdjQAJMS5MawHSgoKAYiFEYwMBg6ABkhACxYhhQJgCIhQwNGFgTgAIKLAkMjAZAAQY2ByADKMDABGIABUAiLAlAAQZWoKCQEEg/EDsCBZhBHBYhY2MgBwgmCgoGIbkBAF+5CxbmrSXzAAAAAElFTkSuQmCC",
                oncommand: function() {
                gBrowser.loadURI("javascript:(function(bookmarklets)%7Bfor(var%20i=0;i%3Cbookmarklets.length;i++)%7Bvar%20code=bookmarklets%5Bi%5D.url;if(code.indexOf(%22javascript:%22)!=-1)%7Bcode=code.replace(%22javascript:%22,%22%22);eval(code)%7Delse%7Bcode=code.replace(/%5Es+%7Cs+$/g,%22%22);if(code.length%3E0)%7Bwindow.open(code)%7D%7D%7D%7D)(%5B%7Btitle:%22%E7%A0%B4%E9%99%A4%E5%8F%B3%E9%94%AE%E8%8F%9C%E5%8D%95%E9%99%90%E5%88%B6%22,url:%22javascript:function%20applyWin(a)%7Bif(typeof%20a.__nnANTImm__===%5Cx22undefined%5Cx22)%7Ba.__nnANTImm__=%7B%7D;a.__nnANTImm__.evts=%5B%5Cx22mousedown%5Cx22,%5Cx22mousemove%5Cx22,%5Cx22copy%5Cx22,%5Cx22contextmenu%5Cx22%5D;a.__nnANTImm__.initANTI=function()%7Ba.__nnantiflag__=true;a.__nnANTImm__.evts.forEach(function(c,b,d)%7Ba.addEventListener(c,this.fnANTI,true)%7D,a.__nnANTImm__)%7D;a.__nnANTImm__.clearANTI=function()%7Bdelete%20a.__nnantiflag__;a.__nnANTImm__.evts.forEach(function(c,b,d)%7Ba.removeEventListener(c,this.fnANTI,true)%7D,a.__nnANTImm__);delete%20a.__nnANTImm__%7D;a.__nnANTImm__.fnANTI=function(b)%7Bb.stopPropagation();return%20true%7D;a.addEventListener(%5Cx22unload%5Cx22,function(b)%7Ba.removeEventListener(%5Cx22unload%5Cx22,arguments.callee,false);if(a.__nnantiflag__===true)%7Ba.__nnANTImm__.clearANTI()%7D%7D,false)%7Da.__nnantiflag__===true?a.__nnANTImm__.clearANTI():a.__nnANTImm__.initANTI()%7DapplyWin(top);var%20fs=top.document.querySelectorAll(%5Cx22frame,%20iframe%5Cx22);for(var%20i=0,len=fs.length;i%3Clen;i++)%7Bvar%20win=fs%5Bi%5D.contentWindow;try%7Bwin.document%7Dcatch(ex)%7Bcontinue%7DapplyWin(fs%5Bi%5D.contentWindow)%7D;void%200;%22%7D,%7Btitle:%22%E7%A0%B4%E9%99%A4%E9%80%89%E6%8B%A9%E5%A4%8D%E5%88%B6%E9%99%90%E5%88%B6%22,url:%22javascript:(function()%7Bvar%20doc=document;var%20bd=doc.body;bd.onselectstart=bd.oncopy=bd.onpaste=bd.onkeydown=bd.oncontextmenu=bd.onmousemove=bd.onselectstart=bd.ondragstart=doc.onselectstart=doc.oncopy=doc.onpaste=doc.onkeydown=doc.oncontextmenu=null;doc.onselectstart=doc.oncontextmenu=doc.onmousedown=doc.onkeydown=function%20()%7Breturn%20true;%7D;with(document.wrappedJSObject%7C%7Cdocument)%7Bonmouseup=null;onmousedown=null;oncontextmenu=null;%7Dvar%20arAllElements=document.getElementsByTagName(%5Cx27*%5Cx27);for(var%20i=arAllElements.length-1;i%3E=0;i--)%7Bvar%20elmOne=arAllElements;with(elmOne.wrappedJSObject%7C%7CelmOne)%7Bonmouseup=null;onmousedown=null;%7D%7Dvar%20head=document.getElementsByTagName(%5Cx27head%5Cx27)%5B0%5D;if(head)%7Bvar%20style=document.createElement(%5Cx27style%5Cx27);style.type=%5Cx27text/css%5Cx27;style.innerHTML=%5Cx22html,*%7B-moz-user-select:auto!important;%7D%5Cx22;head.appendChild(style);%7Dvoid(0);%7D)();%22%7D%5D)");
                }
                },
{
       label: "切换文字编码",
       tooltiptext: "左键：UTF-8\n中键：Big5\n右键：GBK",
       onclick: "var code = ['UTF-8', 'Big5', 'GBK']; BrowserSetForcedCharacterSet(code[event.button]);",
       image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAoUlEQVQ4ja2TzRGDIBCFvw4owksKSAvU4tWjxaQEO0gPacECOFEBXh7CGAQNeTM7wy779o8F/ogBWAAPhBPx8hmO5AfggAkwlSRGPk6cHYsurmIWZ4dvZC5V4nNDuEEucqJigA9paDOw6uyAsRXgKVI8h4PuSK2eBsgrKImtBXiRpmtlHzP93WrBqsxQqKQ6g+5n7F6k7lWOQa5+pi/yz9gAOaxLQtLaWOcAAAAASUVORK5CYII="},
{
		label:"页面自动滚屏",
		url:"javascript:var%20_ss_interval_pointer;_ss_speed=3;_ss_speed_pairs=[[0,0],[1,200.0],[1,120.0],[1,72.0],[1,43.2],[1,25.9],[2,31.0],[4,37.2],[8,44.8],[8,26.4],[16,32.0]];_ss_last_onkeypress=document.onkeypress;_ss_stop=function(){clearTimeout(_ss_interval_pointer)};_ss_start=function(){_ss_abs_speed=Math.abs(_ss_speed);_ss_direction=_ss_speed/_ss_abs_speed;_ss_speed_pair=_ss_speed_pairs[_ss_abs_speed];_ss_interval_pointer=setInterval('scrollBy(0,'+_ss_direction*_ss_speed_pair[0]+');%20if((pageYOffset<=1)||(pageYOffset==document.height-innerHeight))%20_ss_speed=0;',_ss_speed_pair[1]);};_ss_adj=function(q){_ss_speed+=q;if(Math.abs(_ss_speed)>=_ss_speed_pairs.length)_ss_speed=(_ss_speed_pairs.length-1)*(_ss_speed/Math.abs(_ss_speed))};_ss_quit=function(){_ss_stop();document.onkeypress=_ss_last_onkeypress;};document.onkeypress=function(e){if((e.charCode==113)||(e.keyCode==27)){_ss_quit();return;};if(e.charCode>=48&&e.charCode<=57)_ss_speed=e.charCode-48;else%20switch(e.charCode){case%2095:_ss_adj(-2);case%2045:_ss_adj(-1);break;case%2043:_ss_adj(2);case%2061:_ss_adj(1);break;};_ss_stop();_ss_start();};_ss_stop();_ss_start();",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABHRSTlMAPvpPlVb7NgAAAC1JREFUCNdjQAEshBmMLIwQBpOIEFRERREqZ2IAU4RqqgsYgMxwACE4AyEFBwC6ugU6mH43HwAAAABJRU5ErkJggg=="
	},{
		label:"页面自动刷新",
		url:"javascript:(function(p){open('','',p).document.write('%3Cbody%20id=1%3E%3Cnobr%20id=2%3E%3C/nobr%3E%3Chr%3E%3Cnobr%20id=3%3E%3C/nobr%3E%3Chr%3E%3Ca%20href=%22#%22onclick=%22return!(c=t)%22%3EForce%3C/a%3E%3Cscript%3Efunction%20i(n){return%20d.getElementById(n)}function%20z(){c+=0.2;if(c%3E=t){c=0;e.location=u;r++}x()}function%20x(){s=t-Math.floor(c);m=Math.floor(s/60);s-=m*60;i(1).style.backgroundColor=(r==0||c/t%3E2/3?%22fcc%22:c/t%3C1/3?%22cfc%22:%22ffc%22);i(2).innerHTML=%22Reloads:%20%22+r;i(3).innerHTML=%22Time:%20%22+m+%22:%22+(s%3C10?%220%22+s:s)}c=r=0;d=document;e=opener.top;u=prompt(%22URL%22,e.location.href);t=u?prompt(%22Seconds%22,60):0;setInterval(%22z()%22,200);if(!t){window.close()}%3C/script%3E%3C/body%3E')})('status=0,scrollbars=0,width=100,height=115,left=1,top=1')",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAANlBMVEUAAAAAAAAfEgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQf2vJAAAAEXRSTlMAHw17Z1b3ybmFRSnn0qgynGqaBMMAAABoSURBVBjTbY/bCoAwDEN725zzMvP/PyuVrVMwD4FDS0IotF30lRw6gddlX1bUwZqNhRU2uIhnIHVu2ZnSYDotsqy4g2c43CGzGr8f5ZVxuteokNz6JWFzLjo+oSxsOcZUPFuYQnpE9Q1ElwJ0eM5iRAAAAABJRU5ErkJggg=="
	},
{
		label:"垂直分屏浏览",
		keyword: 'czfp',
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAZGRnExMS2trbgUhZ3AAAAAXRSTlMAQObYZgAAACVJREFUCNdjYFEUBAIhBwYmAwYGAQZmBQZGBiADiOjAgFsKdwYADc8DzUvmw0wAAAAASUVORK5CYII="
	},{
		label:"水平分屏浏览",
		keyword: 'spfp',
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAZGRnExMS2trbgUhZ3AAAAAXRSTlMAQObYZgAAACZJREFUCNdjgAMnQTBQYVCG8I0YBCAMRnwMQSiAixDDgFuBsBQGAPjBA2Ss8G+fAAAAAElFTkSuQmCC"
	},
		{
       label: "恢复默认窗口",
       tooltiptext: "注意：需要根据自己屏幕的大小手动调整数值",
       oncommand: function(e) {window.innerWidth=1240, window.innerHeight=740; window.moveTo(100, 50);},//可视区域居中
       image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgUlEQVQ4jd3Orw3CYBCG8V9JJQMgKjoCkoQg2IRRukMHqEQiOkM9IyBwFYzQGkB8yaVNERDe5HJ/nrvLy7eV4YxdwAvcA3bDEYYETPV9Oh9mRP/Mj6QHl8DilGrIscEpWNqjC1j5KpqFDipYLTx+6w8eZGixDvgW14DlOHxq4Ac0Am4mHKhHtyEUAAAAAElFTkSuQmCC"},
];

		var menu = PageMenu({
		label: "阅读辅助工具",
		condition: 'normal',
		insertBefore: 'context-openlinkincurrent',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiklEQVQ4je3SIQ7CcAzF4Y8Fj5hBYpEkOBSXWIKY5VQoOAYaw8QMB9gJMBgcCLpkIeEPyQQInmn7fknzmpRvaxB1jhWWmIbXYI8jZi/YNgujwgVr5BijxBm7J5Z3WNUmuSVSJlmWgB/pv+AXFgw7/QYLTGJucHjH2gQ1Tigw8vi2IrxrgtV9L+ivO97LHdW2qVgKAAAAAElFTkSuQmCC"
	});
	menu(items);
};




//复制链接文本地址
new function () {
	var items = [
{	
    label:"复制链接地址",
		oncommand:"Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(decodeURIComponent(gContextMenu.linkURL));;",	
		 image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"
	},
		{
		label:"复制链接文本",
		text:"%LINK_TEXT%",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWNgGCzgPxZMSA2GJKkWEmXAfwYGBg9yDfBgYGCYCcXEWogCjjIwMChDaZIBssY8KCYJ5DGghjhJrlBmwPTjTKg4ToCsAVvAeaCJ0S8dkGQARUl54AAAWsMsNkwmkt8AAAAASUVORK5CYII="
	},
{
		label:"复制链接文本+地址",
		text:"%LINK_TEXT%\n%l",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII="
	},
{
    label: "复制链接源代码",
    tooltiptext: "左键:HTML代码\n中键:UBB代码\n右键:MD代码",
    onclick: function(event) {
        var formats = [
           '<a href="%l" target="_blank">%LINK_TEXT%</a>',
            "[url=%RLINK_OR_URL%]%RLT_OR_UT%[/url]",
            "[%RLT_OR_UT%](%RLINK_OR_URL%)",
        ];
        var str = addMenu.convertText(formats[event.button]);
        addMenu.copy(str);
        if (event.button === 1) { // 中键点击后自动关闭菜单
            document.getElementById("contentAreaContextMenu").hidePopup();
        }
    },
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAAAAAABmZmbc3Ny3t7eRkZE6OjpRDxSxAAAAAXRSTlMAQObYZgAAADJJREFUCNdjwASCECDAIADhY2UwMQoKsgqAGUyMJiAGoyATYzJMhEEYxhDAoh1hBQYAAPxVA4qkxzcpAAAAAElFTkSuQmCC"
},
{
		label:"复制链接编码地址",
		text:"%l",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"
},
{},
{
		label:"搜索链接文本",
		url:"https://www.baidu.com/baidu?wd=%LINK_TEXT%",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg=="
	},
{	
		command:"context-savelink",	
		 image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbklEQVQ4jWNgoDH4PzQNkMVhgCy6QmxAmYGB4TUDA4M9mgH2UHFlYgyBKbaHGoDMJxrANP0nRzMMBEMNCCZHMwyYEKvQk4GB4RnURkL4GVQ9CnjGwMBgTaRl1lD1KIBQgvmPpgZDPcUuoDgMyAYA/mQv97JO38EAAAAASUVORK5CYII="
	},



];
	var menu = PageMenu({ condition:'link', insertBefore:'context-openlink', onpopupshowing: syncHidden });
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="link"] #' + it.command + '{ display: none !important; }')
	});
};

//打开链接的各种方法
new function () {
	var items = [
{
			label: '当前标签打开'
			,image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABWNxwqAAAAB3RSTlMA6xeSuwaF7u2ifAAAADBJREFUCNdjwASshuVAUGjKwOwE4jK5MTAqgCUUGdghKtixMtiBuuAixDLKIQBuOQBI1gi6H+1sQAAAAABJRU5ErkJggg=="
			,oncommand: 'document.getElementById("context-openlinkincurrent").doCommand();'
		},{
		label:"侧边栏中打开",
		oncommand:"openWebPanel(gContextMenu.linkText(), gContextMenu.linkURL);",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPElEQVQ4jWNgoBL4jwcTbQAp4kPUADsGBoZfUJpkA/zxaSZkgB0DEbFEUxfAgAM+Q4ZGNBI0gKK8MHAAANGVMRA9chdTAAAAAElFTkSuQmCC"
	},{
		label:"隐私窗口打开",
		oncommand:"gContextMenu.openLinkInPrivateWindow();",
	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4je3RIUzDQBjF8V9CMotEoTCYufopBBqLx1ZOYiZn0JVIVC0WXTuJm6mqmpmY6Dt2CYIESXjJ9a7/vn7fvTv+hJ6wRocPTNhnfg+fcMCA1/gfsIIjtmgLiC5SfIPrsCZsiz6F58cvNcInbgJKhBHPlXEd3xgPLLGTnPeBh2T7qh7tMz/GI76+VH+p4JBd1NHK+1A16Mzn5iod7n4KXGmVfy4LaALawAVus7s260W+tYn3reHS+Wom8wF1Gbtkn/AW77+iE6SaONczlmqVAAAAAElFTkSuQmCC"
	},
	{
		label:"谷歌缓存打开",
    tooltiptext: '注意：需科学上网',
    oncommand: "gBrowser.addTab('https://webcache.googleusercontent.com/search?q=cache:'+ decodeURIComponent(gContextMenu.linkURL));",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsElEQVQ4jc2QsQ2DMBREX+fGJQO4YgBmYAMkUrpNhkqVCRCsktYFS6RMCo4kIsZ2QZGTfvN9er5/cLAM4IEBmIGHZtbOyxNVAwRgAk6AA6zGaTfJ08QAT/2Qk5c3CugLAF0KEFhu7VhiG43TbpBnF2CUYq/EXp4fQPUFyGkFVLEE1wzEyLN7wgjcgQtQ8+mgBs56G1MAgBa4sZS1dhC0azfet/6jA0t5BzYVsaSD4/QCPKpAHIYO+pIAAAAASUVORK5CYII="
	},	
{},
   {
		label:"IE浏览器打开",
		oncommand: function() {
	try {
		var path ="..\\..\\..\\Program Files\\Internet Explorer\\iexplore.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsIFile).path));
		var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
		process.init(file);
		process.run(false, [gContextMenu.linkURL], 1);
	} catch (ex) {
		alert("打开IE失败!")
	}
},
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABEElEQVQ4jZXSnVuDYRQG8B8EQTAIgkEQBMEgDIIwGA4Hg0EYBMH+gyAIh0EwHIRBEARBEAzDwWAweIP3bD17rmd9nOu64X3ec9/3+eJ/cYpL9DHAwabEHZyjG7jAbQik0SsRHzBHlWGBYebaSclNvEfyFK8FkQoznCSGqxhGwmP0t9ggsBTZS8n7QbjHVSQ9oRUu3UJbN6lAB2O0E+d+CC/xnAnMU4F2uM1+KLuEtRmMs5+fmPyCZlpBrn5mPY7Ud5BiFXl/FUZoJOS8vdGS3PC9+1xkirfC+yJmhnoDFQ7Vq/vL8Ppp+YMYCPVUr+O7RPyQna9Qm2RvLfWh9MKgi2Ns5WTYxot6bXfhsFtKLMUX/+qC1cGn0mkAAAAASUVORK5CYII="
	},
{
  label: 'ME浏览器打开',
  url: 'microsoft-edge:%l',
  image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABFUlEQVQ4jaWToW7DQAyGj+QJ9gZFIfb3S3uDgYLS8KmkMNLeoLC4KGwqGCkYGiobKYs0EDA4VFo2nIFdptstqTbNkpWTbH9n/+eEkJm7V8AD0EXfu/ttCKHIc/PCG+AsqZ/wd3evpoqrC4W5r74Vl2V5ld4i6RnYAPM4ziGHmNnsCwBsJPVAZ2bXwDbvENhmkJ2ZlUPwLKmN5w5oRqYsMsAJqAfAIX4bSb27r6Mmq8HNbCHplELSiwozm/1BxAFw/0OH/wAek+BRUgu8THgHvLr7OgXsE3I9uW1TBtTZOy/G8qKYd2OxIi5ROuNb7GwHHIY1B55Gu4j034g3Dgjh84fKO7mo/oQVkpax/RboJB2BBpjnyR+SCOL+NXWFUQAAAABJRU5ErkJggg=='
},
{
		label:"其他浏览器打开",
		text:"%l",
    tooltiptext: "注意：需要手动指定其他浏览器.exe所在路径",
		exec:"D:\\Internet\\CentBrowser\\Application\\chrome.exe",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4jWNgoAJYzsDAcB8H/o1Hbj/MgP9E0q/RaJg4w38i8Gso/R6Nz8DAwMCwnoGBQQEHtsEjNxlmwHEGBoYEHHg2HrnNMAPmM5AHGogxQAGqkIVcAxgYIAF2moGBQYNcAzYzQEL8OwMDgwM5BtRADbjOgOoVog3QgOLzUMNINgDZoBxKDEAHcAM2M0AyBjb8Ho/cYTItRgUAXItLMzITnmsAAAAASUVORK5CYII="
	},


];
	var menu = PageMenu({ condition: 'link', insertAfter:'context-openlinkintab', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="link"] #' + it.command + '{ display: none !important; }')
	});
};

//复制文本
new function () {
	var items = [
	{ command: 'context-copy',
	  image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII=" },
	{
		label:"复制纯文本",
		text:"%SEL%",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWNgGCzgPxZMSA2GJKkWEmXAfwYGBg9yDfBgYGCYCcXEWogCjjIwMChDaZIBssY8KCYJ5DGghjhJrlBmwPTjTKg4ToCsAVvAeaCJ0S8dkGQARUl54AAAWsMsNkwmkt8AAAAASUVORK5CYII="
	},

];
	
	var menu = PageMenu({ id:'addmenu_context-copy',condition:'select', insertBefore:'context-paste', onpopupshowing: syncHidden,image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII="  });
	menu(items);
	//page({ condition:'select', insertBefore:'context-sep-copylink' });
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="select"] #' + it.command + '{ display: none !important; }')
	});
};




//翻译文本
page([
	{
    id:'addmenu_context-translate',
		label:"翻译选中文本",
		condition: "select",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVR42mNkwATrgXg/EE9iIAIwYhETAOKDQFwOxDuIMeA/A3FgFhCnE+MCZBAMxI1ArEOMFw4AcTIQ30USOwrEcWhiOA2wBeIOILaG8j2AOAKIE0gJRJCmQCC+CsThQOwNxB9IMUAAGoXfiNGMbIA8EG+BBpYnEN8G4jtQORVoGChDxUKAeC22aFTBEViggLSCpg1WIOYEYiN80fgfjzjIkkXIMUOsAaD00ATE2kCcB8RuQOxDigEgb8wA4s1ArADE54FYEBTIuAwgJrm3A3EVIxF5YCaUbgPij1C2MxCvARlOjAG4AvUcKDYAi+YxEXgzorIAAAAASUVORK5CYII=",
	insertAfter: "context-inspect",
	oncommand: "setTimeout(function(){	gBrowser.selectedBrowser.messageManager.sendAsyncMessage('FGgTranslator', readFromClipboard());}, 0);",
}
]);






//当前页面
new function () {
	var items = [
{
label:"侧边栏中打开",
id:"context_TabFloatSidebar",
oncommand:function() {openWebPanel(document.title, gBrowser.currentURI.spec);},
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPElEQVQ4jWNgoBL4jwcTbQAp4kPUADsGBoZfUJpkA/zxaSZkgB0DEbFEUxfAgAM+Q4ZGNBI0gKK8MHAAANGVMRA9chdTAAAAAElFTkSuQmCC"
},{
		label:"隐私窗口打开",
		oncommand:"openLinkIn(gBrowser.currentURI.spec, 'window',{private:true});",
	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4je3RIUzDQBjF8V9CMotEoTCYufopBBqLx1ZOYiZn0JVIVC0WXTuJm6mqmpmY6Dt2CYIESXjJ9a7/vn7fvTv+hJ6wRocPTNhnfg+fcMCA1/gfsIIjtmgLiC5SfIPrsCZsiz6F58cvNcInbgJKhBHPlXEd3xgPLLGTnPeBh2T7qh7tMz/GI76+VH+p4JBd1NHK+1A16Mzn5iod7n4KXGmVfy4LaALawAVus7s260W+tYn3reHS+Wom8wF1Gbtkn/AW77+iE6SaONczlmqVAAAAAElFTkSuQmCC"
},
{
label:"新窗口中打开",
id:"context_openTabInWindow2",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeklEQVQ4jWNgoCIIYWBgSCADw8F9BgaG/2RgisB/BgYGhv1k4ARkA2DOmM/AwNANZR9GUoANN6AbsJqBgeE6AwPDaQYGhu0MDAzPGRgYZpNiQAmRfm7HZYACkQY4jBqAYcB9mAGrGSDpgBDejmYAAwOUQyp2INLFhAEA5eleWwKUSVMAAAAASUVORK5CYII=",
oncommand:"gBrowser.replaceTabWithWindow(TabContextMenu.contextTab);",
},
	{
		label:"谷歌缓存打开",
    tooltiptext: '注意：需科学上网',
    oncommand: "gBrowser.addTab('https://webcache.googleusercontent.com/search?q=cache:' + decodeURIComponent(gBrowser.currentURI.spec));",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsElEQVQ4jc2QsQ2DMBREX+fGJQO4YgBmYAMkUrpNhkqVCRCsktYFS6RMCo4kIsZ2QZGTfvN9er5/cLAM4IEBmIGHZtbOyxNVAwRgAk6AA6zGaTfJ08QAT/2Qk5c3CugLAF0KEFhu7VhiG43TbpBnF2CUYq/EXp4fQPUFyGkFVLEE1wzEyLN7wgjcgQtQ8+mgBs56G1MAgBa4sZS1dhC0azfet/6jA0t5BzYVsaSD4/QCPKpAHIYO+pIAAAAASUVORK5CYII="
	},	
{},
{
		label:"IE浏览器打开",
		oncommand: function() {
	try {
		var path ="..\\..\\..\\Program Files\\Internet Explorer\\iexplore.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsIFile).path));

		var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
		process.init(file);
		process.run(false, [gBrowser.currentURI.spec], 1);
	} catch (ex) {
		alert("打开IE失败!")
	}
},
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABEElEQVQ4jZXSnVuDYRQG8B8EQTAIgkEQBMEgDIIwGA4Hg0EYBMH+gyAIh0EwHIRBEARBEAzDwWAweIP3bD17rmd9nOu64X3ec9/3+eJ/cYpL9DHAwabEHZyjG7jAbQik0SsRHzBHlWGBYebaSclNvEfyFK8FkQoznCSGqxhGwmP0t9ggsBTZS8n7QbjHVSQ9oRUu3UJbN6lAB2O0E+d+CC/xnAnMU4F2uM1+KLuEtRmMs5+fmPyCZlpBrn5mPY7Ud5BiFXl/FUZoJOS8vdGS3PC9+1xkirfC+yJmhnoDFQ7Vq/vL8Ppp+YMYCPVUr+O7RPyQna9Qm2RvLfWh9MKgi2Ns5WTYxot6bXfhsFtKLMUX/+qC1cGn0mkAAAAASUVORK5CYII="},
{
  label: 'ME浏览器打开',
  url: 'microsoft-edge:%u',
  image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABFUlEQVQ4jaWToW7DQAyGj+QJ9gZFIfb3S3uDgYLS8KmkMNLeoLC4KGwqGCkYGiobKYs0EDA4VFo2nIFdptstqTbNkpWTbH9n/+eEkJm7V8AD0EXfu/ttCKHIc/PCG+AsqZ/wd3evpoqrC4W5r74Vl2V5ld4i6RnYAPM4ziGHmNnsCwBsJPVAZ2bXwDbvENhmkJ2ZlUPwLKmN5w5oRqYsMsAJqAfAIX4bSb27r6Mmq8HNbCHplELSiwozm/1BxAFw/0OH/wAek+BRUgu8THgHvLr7OgXsE3I9uW1TBtTZOy/G8qKYd2OxIi5ROuNb7GwHHIY1B55Gu4j034g3Dgjh84fKO7mo/oQVkpax/RboJB2BBpjnyR+SCOL+NXWFUQAAAABJRU5ErkJggg=='
},
{
		label:"其他浏览器打开",
		text:"%u",
    tooltiptext: "注意：需要手动指定其他浏览器.exe所在路径",
		exec:"D:\\Internet\\CentBrowser\\Application\\chrome.exe",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4jWNgoAJYzsDAcB8H/o1Hbj/MgP9E0q/RaJg4w38i8Gso/R6Nz8DAwMCwnoGBQQEHtsEjNxlmwHEGBoYEHHg2HrnNMAPmM5AHGogxQAGqkIVcAxgYIAF2moGBQYNcAzYzQEL8OwMDgwM5BtRADbjOgOoVog3QgOLzUMNINgDZoBxKDEAHcAM2M0AyBjb8Ho/cYTItRgUAXItLMzITnmsAAAAASUVORK5CYII="
	},	

];
	
var menu = TabMenu({id:"context_SidebarOpen",  insertAfter: 'context_StickOnTop', image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPElEQVQ4jWNgoBL4jwcTbQAp4kPUADsGBoZfUJpkA/zxaSZkgB0DEbFEUxfAgAM+Q4ZGNBI0gKK8MHAAANGVMRA9chdTAAAAAElFTkSuQmCC", onpopupshowing: syncHidden });
	menu(items);
};




//当前页面
new function () {
	var items = [
{
				label : '翻译当前页面',
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyklEQVQ4jc1QsQ3CMBB0R5seJJ/F2wPQpUtHSwN1RoiYgA0YgVEYIQNQuEFCiS1lhNDg5IE4gQpO+ub0d39/QvwVaujcK9N6ZVoP3dwACCFErWjH+VGTblGZNhhYIOF8VHyd06K/ZOwU/wYnacWingJfSUoD76DPUYPnRSq6bhRte94c4gagNbtUOlBWSUqdpH2fbLn57IXIhGIHcRE043FDaTxVVDwECyTcoIbORwUO+uhA2WOKr6/H/nbQpQWSaQPo5lU4GfvnuAOO7rs1HAnRyQAAAABJRU5ErkJggg==",
				oncommand :
			function() {
               gBrowser.loadURI("javascript:%20void((function()%20{var%20element%20=%20document.createElement('script');element.id%20=%20'outfox_seed_js';element.charset%20=%20'utf-8',element.setAttribute('src',%20'http://fanyi.youdao.com/web2/seed.js?'%20+%20Date.parse(new%20Date()));document.body.appendChild(element);})())");

				},
			}, 
{
				label : '谷歌页内翻译',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVklEQVQ4jY3TzU4TURwF8PEBeAiew4WBBBQ6lBaQmhhduWKhMUYSIyYqIbadaacWhSA1GgOGREiMVCrqQiUBIVhipnbu5E4/cL6IkrTQe9fHRduRABEXZ/k7/3MXVxhMMPV8gmMgwdGf4OhTOIIKRyDO4Q/vjgI49a8IHjyEe+McPZEKPbHAw4cLYhx+meHG9HZHuVxuPS6EkBahCQ9f741x+GMc8qufcBwXOzs7cF0XjuPAtm3Ytg3TNE0h2IBBhSOUZHB/VTC5vA9/o+BS8jfyeR2u63pxHMcrEgLx+tVAnCPxdh+LG3tQi1X4Yxw9MocoMSx91mAYhgcPrhB6D0zO0ipG5mpYJ1XcnK1BlDlEiWN0xsD6ZhbR1AyWV9aQ1yl0o9AoiNXxtec1lO0KVvNVZGkVmW97ECUOn8Qhjm1jRJnG3fGnuKVM4Wr4MVLz6XpB860La3tQ0vsQZY6gwlCwKriQZPBJHN2RGu5PpbHydQMTs/OYS7+HZVmwLAtCj8whyhyXJxmCCoMo1WdffMQQiDN0Rxm6ogxDDzdxPTyOYXkCRNdRLBZhmiaEJmjG10h39C/uijAMSA6G7im4nXiCPCEoFAoolUoQfFHmoSOwgc9FGM6Ga5jLZDHzegl3kilopL5C6Hqw6x5BDfgXM3SGGcZelkCIjsUPn7wVwulh0tI5QlqPy5krHzvaQhm0hd6hPZTB9Ow6NI2AUgpKab3gpM/S3v+GdgwuIfViFar6A4QQ6LoOSikMw/iPgr6F0alnX7C19R2qqiKXy0HTNBBCkMvltD/vDPwyHNhJmwAAAABJRU5ErkJggg==",
				oncommand :
				function ()
				{
					gBrowser.loadURI("javascript:{d=document;b=d.body;o=d.createElement('scri'+'pt');o.setAttribute('src','https://translate.glgoo.com/translate_a/element.js?cb=googleTranslateElementInit');o.setAttribute('type','text/javascript');b.appendChild(o);v=b.insertBefore(d.createElement('div'),b.firstChild);v.id='google_translate_element';v.style.display='none';p=d.createElement('scri'+'pt');p.text='function%20googleTranslateElementInit(){new%20google.translate.TranslateElement({pageLanguage:%22%22},%22google_translate_element%22);}';p.setAttribute('type','text/javascript');b.appendChild(p);}void%200");
				},
			},
{},
{
    label: "谷歌弹窗翻译",
    tooltiptext: '注意：需科学上网',
    url: "javascript:(function(){var%20t=((window.getSelection&&window.getSelection())||(document.getSelection&&document.getSelection())||(document.selection&&document.selection.createRange&&document.selection.createRange().text));var%20e=(document.charset||document.characterSet);if(t!=''){window.open('https://translate.google.com/translate_t?hl=zh-CN#auto|zh-CN|'+t);}else{window.open('https://translate.google.com/translate?u='+decodeURIComponent(location.href)+'&hl=zh-CN&ie='+e+'&sl=auto&tl=zh-CN');};})();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVklEQVQ4jY3TzU4TURwF8PEBeAiew4WBBBQ6lBaQmhhduWKhMUYSIyYqIbadaacWhSA1GgOGREiMVCrqQiUBIVhipnbu5E4/cL6IkrTQe9fHRduRABEXZ/k7/3MXVxhMMPV8gmMgwdGf4OhTOIIKRyDO4Q/vjgI49a8IHjyEe+McPZEKPbHAw4cLYhx+meHG9HZHuVxuPS6EkBahCQ9f741x+GMc8qufcBwXOzs7cF0XjuPAtm3Ytg3TNE0h2IBBhSOUZHB/VTC5vA9/o+BS8jfyeR2u63pxHMcrEgLx+tVAnCPxdh+LG3tQi1X4Yxw9MocoMSx91mAYhgcPrhB6D0zO0ipG5mpYJ1XcnK1BlDlEiWN0xsD6ZhbR1AyWV9aQ1yl0o9AoiNXxtec1lO0KVvNVZGkVmW97ECUOn8Qhjm1jRJnG3fGnuKVM4Wr4MVLz6XpB860La3tQ0vsQZY6gwlCwKriQZPBJHN2RGu5PpbHydQMTs/OYS7+HZVmwLAtCj8whyhyXJxmCCoMo1WdffMQQiDN0Rxm6ogxDDzdxPTyOYXkCRNdRLBZhmiaEJmjG10h39C/uijAMSA6G7im4nXiCPCEoFAoolUoQfFHmoSOwgc9FGM6Ga5jLZDHzegl3kilopL5C6Hqw6x5BDfgXM3SGGcZelkCIjsUPn7wVwulh0tI5QlqPy5krHzvaQhm0hd6hPZTB9Ow6NI2AUgpKab3gpM/S3v+GdgwuIfViFar6A4QQ6LoOSikMw/iPgr6F0alnX7C19R2qqiKXy0HTNBBCkMvltD/vDPwyHNhJmwAAAABJRU5ErkJggg=="
},{
    label: "必应弹窗翻译",
    oncommand: function() {gBrowser.addTab('www.microsofttranslator.com/bv.aspx?from=&to=zh-CHS&a=' + decodeURIComponent(gBrowser.currentURI.spec));},
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMUlEQVQ4jY2SsU7DMBCG/TJYYqpEPDojcbq0NGM7sXdnggnigYFOyVDqLLBAkRJLTIwJSwdYw8gj8AQ/Q0kaO6HNSZbPp/P332+ZkJ7hSo2uvNdFV2rwMEOVGw28UVjl5bZZaqi8hA3aqzB/KOBKDVWUrcZ6ir/dgLlSY/HxAx5mmD++d15u7jzMjDNxpcbZyzeE+mz563o4bteaY9nj2bktwP97F7upS72yUgdLfNDIA428g9SD/6APZG84SoDGwoDQeFurly3CEh+OEmBKIFgPcWwBCCHkKPJwt7nA+dvIFBg/C9wUV3VhsbnF4L4NmKYT0Fjg9HVoApgSSL/WBuBkZQKm6QQ08jDLgraF8ZPAdX6JJnCw3AFo5IHGArMs2NVsi44SYIkPlviozraFrvgFK3TyTsPvtF8AAAAASUVORK5CYII="
},
{
    label: "百度弹窗翻译",
    url: "javascript:(function(){window.open('http://fanyi.baidu.com/transpage?query='+ decodeURIComponent(document.location.href)+'&from=auto&to=zh&source=url&render=1')})();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaWSy0sCURjF/XfuRugukha1CzeBCBKIFFFIBEGrCoRwE4EErlskoYW0EFy0iBAkCMFNBCGuKrqjNg6OgzOTjY+5nhbh3ehMrw/O8vud73E8hDL8Rx5CGf5ajoBCsQuvT0IubwIATk51xA/bsPkPAdFtBYQyLIXeUCpbYtybQtcd0Na+LHb2WiCUYTXaRC5vCsBdyXIG3D/0QCjD2qaCl9cB9g9UPFb66OgcuzEVmayBpmKjVLamAxJJTTg9PQ+mHm1+sQ5CGS4ujUlAJmuAUIaZOQkdnaNS7SMYlhGKyKjVh7B6I2EQi6uTAJsDV9fvqFT7YNIQsws10eAPNNDWODa2FHh9Eoq3H85faKk2/IHGRGCWV2RYvZH7Fzo6n9o8VmS9CcPkzoBUWv82umfnhjNgfEg3pdK6M8AwuUihP9DA0bGGRFJDMCyLYLmu8NsSgP/oExgMERjFwInkAAAAAElFTkSuQmCC"
},
{
    label: "沪江划词翻译",
    url: "javascript:void((function(){hjelm=document.createElement('script');hjelm.setAttribute('src','http://dict.hjenglish.com/app/js/dict_ajax.js');document.body.appendChild(hjelm);})())",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA/klEQVQ4jaWTrQoCQRSFbxK0GDRosFjF6BvYtmwWfACzUQQfYN9BLD7ANtMW1x88iiKoiCCbRFxcgwYvjGvRgUGU3TV85TDzMXM5l8iiNNlkUJ/MUNhkkEVpel1GJGwy6GUE9QnJURKZceaD2CD2TWIqgvaxDd/3P2DB6Hk9FKaFaII3Zz4jj3wwgXWxoK001Pd1eOzJvHPsBBN0T115sLarydxlN7ygtCgpX0mNUuEExVlREWTH2XCC8rIsc/EQiA/jwQWJYQKma8p8fp0Hm8FN3HC4H8CCledXNpVoPeAHo+E0fhdJX+toOS2FptNEdVtFbpL7UuW/l+nPdX4C2sIzGfYkF+oAAAAASUVORK5CYII="
},
{},
{
		label:"繁体转为简体",
		url:"javascript:(function(){var%20s=document.getElementById(%22tongwenlet_cn%22);if(s!=null){document.body.removeChild(s);}var%20s=document.createElement(%22script%22);s.language=%22javascript%22;s.type=%22text/javascript%22;s.src=%22https://git.oschina.net/runningcheese/JiathisQR.js/raw/master/bookmarklet_cn.js%22;s.id=%22tongwenlet_cn%22;document.body.appendChild(s);%20})();",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAAAAAADs4udxvSaxAAAAAXRSTlMAQObYZgAAABtJREFUCNdjQADW0BAgycaAi2ANAbEccBMgAABgfgLQN3XpGgAAAABJRU5ErkJggg=="
	},{
		label:"简体转为繁体",
		url:"javascript:(function(){var%20s=document.getElementById(%22tongwenlet_cn%22);if(s!=null){document.body.removeChild(s);}var%20s=document.createElement(%22script%22);s.language=%22javascript%22;s.type=%22text/javascript%22;s.src=%22https://git.oschina.net/runningcheese/JiathisQR.js/raw/master/bookmarklet_tw.js%22;s.id=%22tongwenlet_cn%22;document.body.appendChild(s);%20})();",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAAAAAADs4udxvSaxAAAAAXRSTlMAQObYZgAAABtJREFUCNdjQAKsoSFAUoUBK8EaAmI54CHAAACTvgQ4AxXYAgAAAABJRU5ErkJggg=="
	},

];
	
var menu = PageMenu({condition: 'normal', insertBefore: 'context-openlinkincurrent',image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVR42mNkwATrgXg/EE9iIAIwYhETAOKDQFwOxDuIMeA/A3FgFhCnE+MCZBAMxI1ArEOMFw4AcTIQ30USOwrEcWhiOA2wBeIOILaG8j2AOAKIE0gJRJCmQCC+CsThQOwNxB9IMUAAGoXfiNGMbIA8EG+BBpYnEN8G4jtQORVoGChDxUKAeC22aFTBEViggLSCpg1WIOYEYiN80fgfjzjIkkXIMUOsAaD00ATE2kCcB8RuQOxDigEgb8wA4s1ArADE54FYEBTIuAwgJrm3A3EVIxF5YCaUbgPij1C2MxCvARlOjAG4AvUcKDYAi+YxEXgzorIAAAAASUVORK5CYII=", onpopupshowing: syncHidden });
	menu(items);
};







//当前页面
new function () {
	var items = [
{
    label: "分享当前页面",
    url: "javascript:(function(){var%20w=window,d=document,s;if(!w.jiathis){w.jiathis=1;s=d.createElement('script');s.src='http://www.jiathis.com/code/j.js';d.getElementsByTagName('head')[0].appendChild(s);s=null}else{$CKE.center()}})()",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA50lEQVQ4y8XTrU5DQRQE4K9pgigJTQBbheEBcBVViApUE1Q9FokDg+QtkFVYLLW1VQQUhn8MioAZksvl0tuCYJPN7mbnzJkze5Z/Gvu4+k1gGyO84n3R4F6ynuNsEYIlHCd4gFt05iXYwEVkf8o/yF0twRA32Mu5j2kUzSRo4xQTbBbKmGK7gKsk6KbWk0ImkT0qYb8QNHEUyf0SsFMwrpKgFaMmMa08isb9qGCQt33OOowXWyXjvhE0KgzcwW4aZwVjXGe/ijWsZy43atr2CS84xCUecI9H3OFtVh80I7P7l1/XqgN8AN+8M6oUp8chAAAAAElFTkSuQmCC"
},
{ 
    label: "邮件发送当前页",
    id: 'context-sendlink',clone :false,
    command:'Browser:SendLink',
    condition: "normal",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jc3SL24CQRSA8R9s0pA1SBSqGlfHBUrIOmQ9FlnJGTgDJ6ikd6gtDgchVTUoyFbsE7CdEBbTvmQmeTPzffPmD/8hXnBE2bAdMYLvaP0Gm06xwVbYZvhE7wa4CPAx2KrDHB/oXoEH+MJT5BcCWOAdeQLuR9nF2dgvASzxhuxsLI/qXmtrk4KHECwjzyJfJKoqWyFo1SZyrLBGR3W5zzjVBe2EFQ4Yq553j0kCvjzHnVG2scPwDngYrJHqYzT9yttg/zh+ALjrRgDEp5xKAAAAAElFTkSuQmCC",
},{
    label: "发送到百度云",
    url: "javascript:void%20(function(d)%20{var%20e%20=%20d.createElement('script');e.byebj=true;e.src%20=%20'http://s.wenzhang.baidu.com/js/pjt/content_ex/page/bookmark.js?s=bm&t='%20+%20(+new%20Date());var%20b%20=%20d.getElementsByTagName('body')[0];b.firstChild%20?%20b.insertBefore(e,%20b.firstChild)%20:%20b.appendChild(e);}(document));",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVQ4jXWRvWtUQRTFTxI3vhnWmccD3eKnKfxCBIuVFEFBFGstxIBBDIhgIRaihUWsFDWC+AUa1FLEVgv/ABvBoEFBiKAIKqMG4bEQwiJ+rM08HB6bqe6cc8+Ze89ItQPsANp98K3AnjqeNhTAfUk9ST3gaMIdrPAsy+aBVl18JIpuAquALfF+C7gY6zZggGlr7RJwHBiQ9342z/NPwGjNtJ1Ms6vGbbPWfjPGfBlsNpsPO53OiKTBSA4Bp0MIc8AZ4EQI4RlwDmgkPqYoinuV47740iljzFdjzGdgffLi2kaj8d1auwCcjL2H6jlcTkZe3Sfk3Fq7EPk7KbESuBuJUeBarCeBgdgzHrEZoJ3n+UfgAWAFTEVyQ2K6XVLPe//Wez8X+Z0Jvy5i0wKGgQsROJw07U9WmkjwAxG7Cph0lSlJPWPMB+BSnOCF9/5VFNwAHlXiSrciyelP3H+pLMsJYI2kY5J8s9ncW5blbFEUj4HzkoYr0WBi8Lcsy3FJM91ud1MI4UdFhBA63W53s6TrZVlOSvpZcUNV4Zx7bYxxIYQnwG/n3EtJY5Iy59xz59zZEMLTVqt1W9KVxcXFX/WvrrIYybLsXczgTZ7n8zGb98DGvqJljMb0/xd2L9f3D0Qbo6wQfg5rAAAAAElFTkSuQmCC"
},{
    label: "发送到有道云",
    url: "javascript:(function(){CLIP_HOST='http://note.youdao.com/yws';try{var%20x=document.createElement('SCRIPT');x.type='text/javascript';x.src=CLIP_HOST+'/YNoteClipper.js?'+(new%20Date().getTime()/100000);x.charset='utf-8';document.getElementsByTagName('head')[0].appendChild(x);}catch(e){alert(e);}})();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVQ4jXWRvWtUQRTFTxI3vhnWmccD3eKnKfxCBIuVFEFBFGstxIBBDIhgIRaihUWsFDWC+AUa1FLEVgv/ABvBoEFBiKAIKqMG4bEQwiJ+rM08HB6bqe6cc8+Ze89ItQPsANp98K3AnjqeNhTAfUk9ST3gaMIdrPAsy+aBVl18JIpuAquALfF+C7gY6zZggGlr7RJwHBiQ9342z/NPwGjNtJ1Ms6vGbbPWfjPGfBlsNpsPO53OiKTBSA4Bp0MIc8AZ4EQI4RlwDmgkPqYoinuV47740iljzFdjzGdgffLi2kaj8d1auwCcjL2H6jlcTkZe3Sfk3Fq7EPk7KbESuBuJUeBarCeBgdgzHrEZoJ3n+UfgAWAFTEVyQ2K6XVLPe//Wez8X+Z0Jvy5i0wKGgQsROJw07U9WmkjwAxG7Cph0lSlJPWPMB+BSnOCF9/5VFNwAHlXiSrciyelP3H+pLMsJYI2kY5J8s9ncW5blbFEUj4HzkoYr0WBi8Lcsy3FJM91ud1MI4UdFhBA63W53s6TrZVlOSvpZcUNV4Zx7bYxxIYQnwG/n3EtJY5Iy59xz59zZEMLTVqt1W9KVxcXFX/WvrrIYybLsXczgTZ7n8zGb98DGvqJljMb0/xd2L9f3D0Qbo6wQfg5rAAAAAElFTkSuQmCC"
},{
    label: "发送到为知笔记",
    tooltiptext: "注意：需要修改为你的为知笔记ID",
       url: "javascript:window.open('http://note.wiz.cn/url2wiz?url=' + encodeURIComponent(document.location.href)+'&folder=%2FMy%20Notes%2F&user=为知笔记ID&content-only=false&bookmark=1');",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVQ4jXWRvWtUQRTFTxI3vhnWmccD3eKnKfxCBIuVFEFBFGstxIBBDIhgIRaihUWsFDWC+AUa1FLEVgv/ABvBoEFBiKAIKqMG4bEQwiJ+rM08HB6bqe6cc8+Ze89ItQPsANp98K3AnjqeNhTAfUk9ST3gaMIdrPAsy+aBVl18JIpuAquALfF+C7gY6zZggGlr7RJwHBiQ9342z/NPwGjNtJ1Ms6vGbbPWfjPGfBlsNpsPO53OiKTBSA4Bp0MIc8AZ4EQI4RlwDmgkPqYoinuV47740iljzFdjzGdgffLi2kaj8d1auwCcjL2H6jlcTkZe3Sfk3Fq7EPk7KbESuBuJUeBarCeBgdgzHrEZoJ3n+UfgAWAFTEVyQ2K6XVLPe//Wez8X+Z0Jvy5i0wKGgQsROJw07U9WmkjwAxG7Cph0lSlJPWPMB+BSnOCF9/5VFNwAHlXiSrciyelP3H+pLMsJYI2kY5J8s9ncW5blbFEUj4HzkoYr0WBi8Lcsy3FJM91ud1MI4UdFhBA63W53s6TrZVlOSvpZcUNV4Zx7bYxxIYQnwG/n3EtJY5Iy59xz59zZEMLTVqt1W9KVxcXFX/WvrrIYybLsXczgTZ7n8zGb98DGvqJljMb0/xd2L9f3D0Qbo6wQfg5rAAAAAElFTkSuQmCC"
},
{
    label: "发送到Evernote",
    url: "javascript:(function(){EN_CLIP_HOST='http://www.evernote.com';try{var%20x=document.createElement('SCRIPT');x.type='text/javascript';x.src=EN_CLIP_HOST+'/public/bookmarkClipper.js?'+(new%20Date().getTime()/100000);document.getElementsByTagName('head')[0].appendChild(x);}catch(e){location.href=EN_CLIP_HOST+'/clip.action?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);}})();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVQ4jXWRvWtUQRTFTxI3vhnWmccD3eKnKfxCBIuVFEFBFGstxIBBDIhgIRaihUWsFDWC+AUa1FLEVgv/ABvBoEFBiKAIKqMG4bEQwiJ+rM08HB6bqe6cc8+Ze89ItQPsANp98K3AnjqeNhTAfUk9ST3gaMIdrPAsy+aBVl18JIpuAquALfF+C7gY6zZggGlr7RJwHBiQ9342z/NPwGjNtJ1Ms6vGbbPWfjPGfBlsNpsPO53OiKTBSA4Bp0MIc8AZ4EQI4RlwDmgkPqYoinuV47740iljzFdjzGdgffLi2kaj8d1auwCcjL2H6jlcTkZe3Sfk3Fq7EPk7KbESuBuJUeBarCeBgdgzHrEZoJ3n+UfgAWAFTEVyQ2K6XVLPe//Wez8X+Z0Jvy5i0wKGgQsROJw07U9WmkjwAxG7Cph0lSlJPWPMB+BSnOCF9/5VFNwAHlXiSrciyelP3H+pLMsJYI2kY5J8s9ncW5blbFEUj4HzkoYr0WBi8Lcsy3FJM91ud1MI4UdFhBA63W53s6TrZVlOSvpZcUNV4Zx7bYxxIYQnwG/n3EtJY5Iy59xz59zZEMLTVqt1W9KVxcXFX/WvrrIYybLsXczgTZ7n8zGb98DGvqJljMb0/xd2L9f3D0Qbo6wQfg5rAAAAAElFTkSuQmCC"
},
{
    label: "发送到Onenote",
    url: "javascript:(function(){var%20jsCode=document.createElement('script');jsCode.setAttribute('src','https://www.onenote.com/Clipper/Root?ClipperId=ON-95a88c52-50d6-4c35-b134-2bdd4f682242&ClipperType=Bookmarklet&ClipperVersion=2.0.2');jsCode.setAttribute('id','oneNoteCaptureRootScript');jsCode.setAttribute('type','text/javascript');document.body.appendChild(jsCode);})()",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVQ4jXWRvWtUQRTFTxI3vhnWmccD3eKnKfxCBIuVFEFBFGstxIBBDIhgIRaihUWsFDWC+AUa1FLEVgv/ABvBoEFBiKAIKqMG4bEQwiJ+rM08HB6bqe6cc8+Ze89ItQPsANp98K3AnjqeNhTAfUk9ST3gaMIdrPAsy+aBVl18JIpuAquALfF+C7gY6zZggGlr7RJwHBiQ9342z/NPwGjNtJ1Ms6vGbbPWfjPGfBlsNpsPO53OiKTBSA4Bp0MIc8AZ4EQI4RlwDmgkPqYoinuV47740iljzFdjzGdgffLi2kaj8d1auwCcjL2H6jlcTkZe3Sfk3Fq7EPk7KbESuBuJUeBarCeBgdgzHrEZoJ3n+UfgAWAFTEVyQ2K6XVLPe//Wez8X+Z0Jvy5i0wKGgQsROJw07U9WmkjwAxG7Cph0lSlJPWPMB+BSnOCF9/5VFNwAHlXiSrciyelP3H+pLMsJYI2kY5J8s9ncW5blbFEUj4HzkoYr0WBi8Lcsy3FJM91ud1MI4UdFhBA63W53s6TrZVlOSvpZcUNV4Zx7bYxxIYQnwG/n3EtJY5Iy59xz59zZEMLTVqt1W9KVxcXFX/WvrrIYybLsXczgTZ7n8zGb98DGvqJljMb0/xd2L9f3D0Qbo6wQfg5rAAAAAElFTkSuQmCC"
},
{
		label:"发送到本地Onenote",
    tooltiptext: "注意：需要手动指定OneNote.exe所在路径",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVQ4jXWRvWtUQRTFTxI3vhnWmccD3eKnKfxCBIuVFEFBFGstxIBBDIhgIRaihUWsFDWC+AUa1FLEVgv/ABvBoEFBiKAIKqMG4bEQwiJ+rM08HB6bqe6cc8+Ze89ItQPsANp98K3AnjqeNhTAfUk9ST3gaMIdrPAsy+aBVl18JIpuAquALfF+C7gY6zZggGlr7RJwHBiQ9342z/NPwGjNtJ1Ms6vGbbPWfjPGfBlsNpsPO53OiKTBSA4Bp0MIc8AZ4EQI4RlwDmgkPqYoinuV47740iljzFdjzGdgffLi2kaj8d1auwCcjL2H6jlcTkZe3Sfk3Fq7EPk7KbESuBuJUeBarCeBgdgzHrEZoJ3n+UfgAWAFTEVyQ2K6XVLPe//Wez8X+Z0Jvy5i0wKGgQsROJw07U9WmkjwAxG7Cph0lSlJPWPMB+BSnOCF9/5VFNwAHlXiSrciyelP3H+pLMsJYI2kY5J8s9ncW5blbFEUj4HzkoYr0WBi8Lcsy3FJM91ud1MI4UdFhBA63W53s6TrZVlOSvpZcUNV4Zx7bYxxIYQnwG/n3EtJY5Iy59xz59zZEMLTVqt1W9KVxcXFX/WvrrIYybLsXczgTZ7n8zGb98DGvqJljMb0/xd2L9f3D0Qbo6wQfg5rAAAAAElFTkSuQmCC",
		oncommand: function(){
			var onenotePath = "C:\\Program Files\\Microsoft Office\\Office15\\Onenote.exe";
			var focusedWindow = document.commandDispatcher.focusedWindow;
			var selection = new String(focusedWindow.getSelection());
			if (selection.length == 0) {
				 goDoCommand('cmd_selectAll');
				 var allSelection = new String(focusedWindow.getSelection());
				 if (allSelection.length == 0)return;
				 goDoCommand('cmd_copy');
				 goDoCommand('cmd_selectNone');
			}
			else
			{
				 goDoCommand('cmd_copy');
			}
			var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
			file.initWithPath(onenotePath);
			var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
			process.init(file);
			var args = ["/sidenote", "/paste"];
			process.run(false, args, args.length);
		}
},

];
	
var menu = PageMenu({condition: 'normal', insertBefore: 'context-openlinkincurrent',image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA50lEQVQ4y8XTrU5DQRQE4K9pgigJTQBbheEBcBVViApUE1Q9FokDg+QtkFVYLLW1VQQUhn8MioAZksvl0tuCYJPN7mbnzJkze5Z/Gvu4+k1gGyO84n3R4F6ynuNsEYIlHCd4gFt05iXYwEVkf8o/yF0twRA32Mu5j2kUzSRo4xQTbBbKmGK7gKsk6KbWk0ImkT0qYb8QNHEUyf0SsFMwrpKgFaMmMa08isb9qGCQt33OOowXWyXjvhE0KgzcwW4aZwVjXGe/ijWsZy43atr2CS84xCUecI9H3OFtVh80I7P7l1/XqgN8AN+8M6oUp8chAAAAAElFTkSuQmCC", onpopupshowing: syncHidden });
	menu(items);
};


//图片
new function () {
	var items = [
	{command: 'context-copyimage-contents',
	 image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII="
	},
 {
    label:"复制图像地址",
	  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA50lEQVQ4jb3SPUpDURAF4A8bbdxC9mEX8WcBIkYQbN2D2UQsxdYNiCiCgRQK9pogYgpdwPMHC41NUry5ECSP3Nd4YODO3Htmzsxc/hFX+ML1dHChBvkWy+iF1cL7H39UR8E+FtEO/xB3uZUvMQ4FN/hGd9bDo3hUoIMDfAT5fF6VDi7QCDsLYoG9HJlFEBMaITULVUNcwinWpmLbuFduYIDddDGrhULZxhhDnOAFm8HZwCt2UpI0xLc4wwqO8RmJEjmhiX5Om/BTER/lfuWnCgXPuQq2lDNYDX89/FZuAsotPOAXj2ILE+UhOi1pfPDEAAAAAElFTkSuQmCC",
	  class: "context-copyimage", 
	  oncommand: "gContextMenu.copyMediaLocation();",
},{
		label: '谷歌以图搜图',
    tooltiptext: '注意：需科学上网',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg==",
   oncommand: function() {
        var url = encodeURIComponent(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL);
        gBrowser.addTab('https://www.google.com/searchbyimage?safe=off&image_url=' + url);
    }
	},
{
    label: "更多以图搜图",
    condition: "image",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg==",
    oncommand: function() {
        var url = encodeURIComponent(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL);
        gBrowser.addTab('https://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=' + url);
        gBrowser.addTab('https://image.baidu.com/pcdutu?queryImageUrl=' + url);
        gBrowser.addTab('https://pic.sogou.com/ris?query=' + url);
    }
},{},
{
    label: "OCR文字识别",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMA8pCEUxQK59CV0pPm8Xt3/wAAAFlJREFUCNdjQALBCzhMQTSLuAJToQOQ4TuNgSHzCgMDqyRIeGIAA3MZ7927F9INGDgUQCJMC4AESATJEKAUSISpAagYxM0xgGrfGAA0cBsDQ/YVuBVwSxEAAEPFFhtdnlGhAAAAAElFTkSuQmCC",
    oncommand: function() {
        //apikey
        var apikey = "aee93efca6438819212e64aa47711ee0";
   
        var base64str = img2base64(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL).replace("data:image/jpeg;base64,", "");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", "http://apis.baidu.com/apistore/idlocr/ocr", true);
        xmlHttp.setRequestHeader("apikey", apikey);
        var formData = new FormData();
        for(var d of ("fromdevice=pc&clientip=10.10.10.0&detecttype=LocateRecognize&languagetype=CHN_ENG&imagetype=1&image=" + base64str).split('&'))
            formData.append.apply(formData, d.split('=', 2));
        xmlHttp.send(formData);
        xmlHttp.onload = function() {
            if (xmlHttp.status == 200) {
                var data = JSON.parse(xmlHttp.responseText);
                if (data.errNum != 0)
                    alert("错误：" + data.errMsg);
                else {
                    var str = "";
                    for (var i in data.retData) str += data.retData[i].word;
                    alert("识别内容：" + str);//弹窗提示
                    addMenu.copy(str);//自动复制识别内容到剪贴板
                }
            }
        };
   
        function img2base64(imgsrc) {
            if (typeof imgsrc == 'undefined') return "";
   
            const NSURI = "http://www.w3.org/1999/xhtml";
            var img = new Image();
            var that = this;
            var canvas,
                isCompleted = false;
            img.onload = function() {
                var width = this.naturalWidth,
                    height = this.naturalHeight;
                canvas = document.createElementNS(NSURI, "canvas");
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);
                isCompleted = true;
            };
            img.onerror = function() {
                Components.utils.reportError("Count not load: " + imgsrc);
                isCompleted = true;
            };
            img.src = imgsrc;
   
            var thread = Cc['@mozilla.org/thread-manager;1'].getService().mainThread;
            while (!isCompleted) {
                thread.processNextEvent(true);
            }
   
            var data = canvas ? canvas.toDataURL("image/jpeg", 1) : "";
            canvas = null;
            return data;
        }
    }
},
{
    label: "用PS打开图片",
   tooltiptext: "注意：需要手动指定Photoshop.exe所在路径",
   image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAAbGxsbGxsbGxsbGxsAAAC8TvM5AAAABHRSTlMA+cXUPrUbAwAAAD9JREFUCNdjgAMmFzBQYGCB8B2QGKyhAVAGAyuCERoAYbDC1LAGgBggFawQKSCAMlhD4QYiM5gdBYFARAHuCgDDrgkmIWoUrQAAAABJRU5ErkJggg==",
    oncommand: function() {
        var path ="..\\..\\..\\Program Files\\\Adobe\\Adobe Photoshop CC 2018\\photoshop.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsIFile).path));file.launch();

    },
},{
    label: "在线编辑图片",
    condition: "image",
    tooltiptext: "图片地址已经复制到粘贴板",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEUAAAAbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxvvg6/eAAAAEnRSTlMA+ehJNOrxZz3e1MVLKyXEfVKQKrX3AAAAWUlEQVQY043PSQ6AMAgFUAQ6Dyr3P6xYo8Gu+hckPEICsJAiJruC2KlYIE8vxPiH6pDsyonMSAY8A7Cr0FJ4ALWoHBhSGNBhSI7QnUx34AztbrJsX6Qs/HoBLJEDskHKRZMAAAAASUVORK5CYII=",
    oncommand: "gContextMenu.copyMediaLocation(); gBrowser.selectedTab = gBrowser.addTab('https://photoeditor.polarr.co/');",
},
{
		label: 'QR二维码解析',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASklEQVQ4jWNgoBL4jwUzINH41GAoROajG4BTD7oGfAZgk8NrOlYN2AzA5b//RKihHGAznRhMWxcwMGCGxeBIB3gNwMYfIumAbAAAQZVapq3RMcUAAAAASUVORK5CYII=",
   oncommand: function() {
        var url = decodeURIComponent(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL);
        gBrowser.addTab('https://zxing.org/w/decode?u=' + url);
    }
},
{
		label:"复制Base64码",
		text:"%IMAGE_BASE64%",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbElEQVQ4jWNgGAzgPwUYbgC5FmMYcBTJdA8smo4yMDAo4zIgD4oZoIrQXZYHFcNpALLp6EAZKo/XBf+RbEH3AkwjUQbg8xpBA5ABsq3o0aeMzYCZaM7GFr14XQBTgGwLyQaQAlAMoCgpDywAAF13Uxwj2+klAAAAAElFTkSuQmCC"
	},
];
	
	var menu = PageMenu({ condition:'image', id:'context-copyimage_new',insertAfter:'context-viewimage', icon:'image', 	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII=",onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
	});
};



//快捷回复
new function(){
	var items = [
		{label:"用户名Username", input_text: "你的用户名",image:" "},
		{label:"邮箱E-mail", input_text: "你的邮箱@qqcom",image:" "},
		{label:"网站Website", input_text: "http://www.yoursite.com",image:" "},
    {},
		{label:"不明觉厉~~~", input_text: "虽然不知道LZ在说什么但是感觉很厉害的样子～",image:" "},
		{label:"不用客气~~~", input_text: "不用客气，大家互相帮助……\n\u256E\uFF08\u256F\u25C7\u2570\uFF09\u256D",image:" "},
		{label:"反馈情况再说", input_text: "Mark，看反馈情况再说。。。",image:" "},
		{label:"看起来很不错", input_text: "看起来很不错哦，收藏之~~~\n谢谢LZ啦！！！",image:" "},
		{label:"谢谢楼主分享", input_text: "谢谢楼主的分享!这个绝对要顶！！！",image:" "},
		{label:"楼上正解~~~", input_text: "楼上正解……\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",image:" "},
		{label:"坐等楼下解答", input_text: "坐等楼下高手解答~~~⊙_⊙",image:" "},
		{label:"这个要支持~~~", input_text: "很好、很强大，这个一定得支持！！！",image:" "},
		{label:"不明真相的~~~", input_text: "不明真相的围观群众~~~\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",image:" "},
		{label:"没图没真相~~~", input_text: "没图没真相，纯支持下了~~~",image:" "},
		{label:"嘿嘿~~~", input_text: "\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",image:" "}
	];
	var menu = PageMenu({
		label:"快速输入...",
		condition:"input",
    insertBefore:"context-searchselect",
		position: 1,
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAATlBMVEUAAAABAQEFBQUFBQUAAAAFBQUBAQEFBQUFBQUBAQEBAQEBAQEFBQUFBQUFBQUFBQUFBQUBAQEFBQUFBQUFBQUFBQUFBQUFBQUFBQUDAwNxFq0VAAAAGXRSTlMA5xCm+wj2i5Tu7eudShoMB+/Df35nWiolwh78/gAAAGNJREFUGNN9ykkSgCAMRNEmRnAWZ7n/RU2hSBaWvcp/Feg5NofuwtBmgHDvlC4xsADiYo/tIpCb2goCuRtpAd0JOuNBtQM9QDzG7tPHbjFMTs4EhbW8QgF3vYeCuB+YwzuLj12wlgVNTTHpdAAAAABJRU5ErkJggg==",
		oncommand: function(event){
			var input_text = event.target.getAttribute('input_text');
			if(input_text) {
				addMenu.copy(input_text);
				goDoCommand("cmd_paste");
			}
		}
	});
	menu(items);
};




//颜文字输入
var Specialcharacters = PageMenu({
                label:"颜文字输入",
			         	condition:"input",
                insertBefore:"context-searchselect",
                oncommand: function(event){
                        var input_text = event.target.getAttribute('input_text');
                        if(input_text) {
                                addMenu.copy(input_text);
                                goDoCommand("cmd_paste");
                }
        },
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAAD4+PghISERERExMTEUFBSVlZVPT08eHh4YGBi8vLyioqKBgYF4eHhJSUlBQUHg4ODR0dG1tbWamppzc3NgYGBXV1ft7e3i4uKvr6+oqKiPj4+JiYkoKCgkJCQICAgmMdadAAAAAXRSTlMAQObYZgAAAINJREFUGNNti1cSAyEMQwX20mGzJb3d/5YxJX+rGSw/IeNQJztp7eflz4ayAlSiPPij+qLc3vokPBIfZNqMmCpuT0QWnxT8F3WZ5IlrqfYjma4HQwMI4FsrcAPML6QC0dlirY2FJGSzlfcV7t5+GIi2GAW+oGn3j2qrGwwEJq1JBxzpB9l0A8JvhjyGAAAAAElFTkSuQmCC"
});

Specialcharacters([
	{id: "spe-charaters", style: "display:none;"}
]);


var SPE4 = PageMenu({
	label: "卖萌",
	condition: "input",
	insertBefore: "spe-charaters",
});
SPE4([
                {label: "｡◕‿◕｡", input_text:"｡◕‿◕｡"},
                {label: "(●'‿'●) ", input_text:"(●'‿'●) "},
                {label: "(ง •̀_•́)ง", input_text:"(ง •̀_•́)ง"},
                {label: "(๑•̀ω•́๑)", input_text:"(๑•̀ω•́๑)"}, 
                {label: "(๑¯∀¯๑)", input_text:"(๑¯∀¯๑)"},
                {label: "(๑•̀ㅂ•́)و✧", input_text:"(๑•̀ㅂ•́)و✧"},
                {label: "(๑•́ ₃ •̀๑) ", input_text:"(๑•́ ₃ •̀๑) "},
                {label: "_(:з」∠)_", input_text:"_(:з」∠)_"},
                {label: "(ฅ´ω`ฅ)", input_text:"(ฅ´ω`ฅ)"},
                {label: " (¬､¬)", input_text:" (¬､¬) "},
                {label: " ( ˙ε ˙ ) ", input_text:" ( ˙ε ˙ )"},
                {label: "(๑¯ิε ¯ิ๑) ", input_text:"(๑¯ิε ¯ิ๑) "},
                {label: "_(•̀ω•́ 」∠)_", input_text:"_(•̀ω•́ 」∠)_"},    

]);

var SPE6 = PageMenu({
	label: "不开心",
	condition: "input",
	insertBefore: "spe-charaters",
});
SPE6([
                {label: "Ծ‸Ծ", input_text:"Ծ‸Ծ"},
                {label: "●﹏●", input_text:"●﹏●"},
                {label: "≥﹏≤", input_text:"≥﹏≤"},
                {label: "◔ ‸◔？", input_text:"◔ ‸◔？"},
                {label: "ᕙ(⇀‸↼‵‵)ᕗ ", input_text:"ᕙ(⇀‸↼‵‵)ᕗ "},
                {label: "ヘ(-ω-ヘ)", input_text:"ヘ(-ω-ヘ)"},
                {label: "(￣_￣|||)", input_text:"(￣_￣|||)"},
                {label: "(눈_눈)", input_text:"(눈_눈)"},
                {label: "o(╥﹏╥)o", input_text:"o(╥﹏╥)o"},
                {label: "(￣▽￣*)b", input_text:"(￣▽￣*)b"},
                {label: "(｡•ˇ‸ˇ•｡)", input_text:"(｡•ˇ‸ˇ•｡)"},
                {label: "(｡•́︿•̀｡)", input_text:"(｡•́︿•̀｡)"},
                {label: "Σ(๑０ω０๑) ", input_text:"Σ(๑０ω０๑)"},
                 {label: "( ´◔‸◔`)", input_text:"( ´◔‸◔`)"},
                {label: "( ´･ᴗ･` )", input_text:"( ´･ᴗ･` )"},
                {label: "( ⊙⊙)!!", input_text:"( ⊙⊙)!!"}, 
                {label: "(｡ì _ í｡)", input_text:"(｡ì _ í｡)"}, 

]);

var SPE5 = PageMenu({
	label: "Emoji",
	condition: "input",
	insertBefore: "spe-charaters",
});
SPE5([
                {label: "😂", input_text:"😂"},
                {label: "😍", input_text:"😍"},
                {label: "😘", input_text:"😘"},
                {label: "😝", input_text:"😝"},
                {label: "😒", input_text:"😒"},
                {label: "😓", input_text:"😓"},
                {label: "😭", input_text:"😭"},
                {label: "😱", input_text:"😱"},
                {label: "😡", input_text:"😡"},
                {label: "😎", input_text:"😎"},
                {label: "❤️", input_text:"❤️"},
                {label: "💔", input_text:"💔"},
                {label: "👍", input_text:"👍"},
                {label: "👎", input_text:"👎"},
                {label: "👌", input_text:"👌"},
                {label: "🤝", input_text:"🤝"},

]);

var SPE7 = PageMenu({
	label: "表情包",
	condition: "input",
	insertBefore: "spe-charaters",
});
SPE7([
                {label: "Instereting", input_text:'<img src="http://ww2.sinaimg.cn/large/7a6a15d5gy1fcl9t6ejgzj2050050jr7.jpg"/>'},
                {label: "辣眼睛", input_text:'<img src="http://ww3.sinaimg.cn/large/7a6a15d5gy1fcl8r7n590j20d10cbk1y.jpg"/>'},
                {label: "爱心发射", input_text:'<img src="http://ww1.sinaimg.cn/large/7a6a15d5gy1fcl8s0pnqnj2060060aah.jpg"/>'},
                {label: "不错不错", input_text:'<img src="http://ww4.sinaimg.cn/large/7a6a15d5gy1fcl9wbtpwgg2046046jtp.gif"/>'},
                {label: "我不能接受", input_text:'<img src="http://ww4.sinaimg.cn/large/7a6a15d5gy1fcl8sipccsj208w06k0tf.jpg"/>'},
                {label: "可以，这很清真", input_text:'<img src="http://ww3.sinaimg.cn/large/7a6a15d5gy1fcl9i616lcj205i04wglr.jpg"/>'},    
                {label: "不可以，这不清真", input_text:'<img src="http://ww2.sinaimg.cn/large/7a6a15d5gy1fcl9ii6wkwj206l05wgm5.jpg"/>'},   
                {label: "厉害了，我的哥", input_text:'<img src="http://ww2.sinaimg.cn/large/7a6a15d5gy1fcl9jhl9btj20dc0a0aa7.jpg"/>'},    
                {label: "老哥，稳", input_text:'<img src="http://ww2.sinaimg.cn/large/7a6a15d5gy1fcl9jsvmwhj204e04e0sk.jpg"/>'},    
                {label: "尼克杨问题号脸", input_text:'<img src="http://ww1.sinaimg.cn/large/7a6a15d5gy1fcl6ba3jznj208k086glk.jpg"/>'},    
                {label: "在座的各位都是垃圾", input_text:'<img src="http://ww1.sinaimg.cn/large/7a6a15d5gy1fcl8ogllg0j206r03tt8o.jpg"/>'},                
                {label: "别说了....我", input_text:'<img src="http://ww4.sinaimg.cn/large/7a6a15d5gy1fcl9kl6q47g207u078av3.gif"/>'},    
                {label: "exo me?", input_text:'<img src="http://ww4.sinaimg.cn/large/7a6a15d5gy1fcl9l01y74j205k05kq2s.jpg"/>'},    
                {label: "哎呦，好叼哦", input_text:'<img src="http://ww3.sinaimg.cn/large/7a6a15d5gy1fcmq68293hj205k063js0.jpg"/>'},    
                {label: "又在背后说我帅", input_text:'<img src="http://ww1.sinaimg.cn/large/7a6a15d5gy1fcl9thd9a2j204404fglg.jpg"/>'},    
                {label: "鸡年大吉吧", input_text:'<img src="http://ww2.sinaimg.cn/large/7a6a15d5gy1fcl9vw59yaj204w050glj.jpg"/>'},  
                {label: "如此厚颜无耻之人", input_text:'<img src="http://ww2.sinaimg.cn/large/7a6a15d5gy1fcl8q2ekhkg208w06oe81.gif"/>'},  
]);

var SPE1 = PageMenu({
	label: "特殊图形",
	condition: "input",
	insertBefore: "spe-charaters",
});
SPE1([
{label: "❤♥♡",	input_text: "❤♥♡"},	
{label: "☻☺",	input_text: "☻☺"},	
{label: "♂♀",	input_text: "♂♀"},	
{label: "★☆",	input_text: "★☆"},	
{label: "■◻",	input_text: "■◻"},	
{label: "●○",	input_text: "●○"},	
{label: "▲▼",	input_text: "▲▼"},	
{label: "►◄",	input_text: "►◄"},	
{label: "√×",	input_text: "√×"},	
{label: "♪♫♬♩",	input_text: "♪♫♬♩"},	
{label: "♠♥♣♦", input_text: "♠♥♣♦"},	
]);

var SPE3 = PageMenu({
	label: "特殊字符",
	condition: "input",
	insertBefore: "spe-charaters",
});
SPE3([
{label: "©®™",	input_text: "©®™"},
{label: "のあぃ",	input_text: "のあぃ"},
{label: "•",	input_text: "•"},
{label: "×÷",	input_text: "×÷"},
{label: "≠≈",	input_text: "≠≈"},
{label: "↑↓",	input_text: "↑↓"},
{label: "←→",	input_text: "←→"},
{label: "»«",	input_text: "»«"},
{label: "「」",	input_text: "「」"},
{label: "『』",	input_text: "『』"},
{label: "℃℉",	input_text: "℃℉"},
]);









new function () {
	var items = [
{
label : "关闭重复标签",
id:"context_CloseSameTab",
 	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAkUlEQVQ4jc3SPQrDMAwF4G/Kks1rT5MDhRwgB+vaHsFTltwlHaqCMXFTSCkVCMzTz3uSxT9ahxEZW3gOrDsqvmDFFQP68CGwNXKazCvmNwQzllZwDBYhOxWxFBjcMe01yCG1LEjVW+Tsqtg8561ZazV9oea7DU6P8OkSbxpLPP2NnDykUskUTK8lLoEdnvLv7QFhATCavYcOYgAAAABJRU5ErkJggg==",
oncommand : function () {
	var num = gBrowser.browsers.length;
	var msg = "";
	for (var i = 0; i < num; i++)
	{
		var a = gBrowser.getBrowserAtIndex(i);
		try
		{
			for (var j = 0; j < num; j++)
			{
				if (j != i)
				{
					var b = gBrowser.getBrowserAtIndex(j);
					if (a.currentURI.spec == b.currentURI.spec)
					{
						//gBrowser.alert(a.currentURI.spec);
						if (msg != "")
							msg += "\n";
						msg += b.currentURI.spec;
						gBrowser.removeTab(gBrowser.tabContainer.childNodes[j]);
						num--;
						j--;
						//Not executing "i--" because there won't be tabs equal before the one on i
					}
				}
			}
		}
		catch(e)
		{
			Components.utils.reportError(e);
		}
	}
	if (msg != ""){
		//alert("\u5173\u95ED\u7684\u91CD\u590D\u6807\u7B7E\u9875:\n\n" + msg);
		}
	else
		alert("\u6CA1\u6709\u91CD\u590D\u6807\u7B7E\u9875");
},
},{
		label: "关闭右侧标签",
    id:"context_closeTabsToTheLast",
    oncommand:  function() {gBrowser.removeTabsToTheEndFrom(gBrowser.mCurrentTab);	},
	 image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAOUlEQVQ4jWNgGGzgPxQPNwPyGBhyGRgY/kNp8lwAMySTgaGNGAPwYnwuoZoLsGqmKAyIBQNvwBAEAIkvKboNt20DAAAAAElFTkSuQmCC"
	},{
    command:"context_closeLeftTabs",
	image:"",
	},
    {
		label: "关闭左侧标签",
    id:"context_closeTabsToTheFirst",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEUAAABuAABpAAAAAACOszMyAAAAA3RSTlMAbYYu/vchAAAAH0lEQVQI12NABswHkIkSIMF0AUiw//8PYkHF0NWhAgAbAQzws7ptnwAAAABJRU5ErkJggg==",
		oncommand: function closeTabsToTheFirst() { for (let i = TabContextMenu.contextTab._tPos - 1; i >= 0; i--) if (!gBrowser.tabs[i].pinned){ gBrowser.removeTab(gBrowser.tabs[i], {animate: true});}}
},
{
		label: "关闭其他标签",
    id:"context_removeAllTabsButCurrent",
		oncommand: "gBrowser.removeAllTabsBut(TabContextMenu.contextTab);",
 	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAATElEQVQ4jdXSQQrAMAhE0edxs0iOkWvbVQsFs2m7aD64cWQcRH5NkEFuYjDoQQ76yqCaAY1ZCVWC06Qxb40ndS18leCTG6zY7A/25QBZhDm3YCnePQAAAABJRU5ErkJggg==",
	},
{
		label: "关闭所有标签",
    id:"context_closeAllTabs",
		oncommand: "gBrowser.removeAllTabsBut(gBrowser.mCurrentTab); gBrowser.removeCurrentTab();",
 	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAP0lEQVQ4jWNgGHbgPwMDgz0eeXuoGoIKsBmCT46gQqI1Y9NAsmZ0Q8jSTLEBFHmBokCkOBqpkpAIAbJihHYAAKNEHEuIZ/qnAAAAAElFTkSuQmCC",
	},

	];
	var menu = TabMenu({id:"context_CloseTab", onpopupshowing: syncHidden});
	menu(items);
};







new function () {
	var items = [
    {label:"复制当前标签标题",oncommand: function() {addMenu.copy(addMenu.convertText("%TITLES%"));},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWNgGCzgPxZMSA2GJKkWEmXAfwYGBg9yDfBgYGCYCcXEWogCjjIwMChDaZIBssY8KCYJ5DGghjhJrlBmwPTjTKg4ToCsAVvAeaCJ0S8dkGQARUl54AAAWsMsNkwmkt8AAAAASUVORK5CYII="},
	{label:"复制当前标签地址",oncommand: function() {addMenu.copy(addMenu.convertText("%URL%"));},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA50lEQVQ4jb3SPUpDURAF4A8bbdxC9mEX8WcBIkYQbN2D2UQsxdYNiCiCgRQK9pogYgpdwPMHC41NUry5ECSP3Nd4YODO3Htmzsxc/hFX+ML1dHChBvkWy+iF1cL7H39UR8E+FtEO/xB3uZUvMQ4FN/hGd9bDo3hUoIMDfAT5fF6VDi7QCDsLYoG9HJlFEBMaITULVUNcwinWpmLbuFduYIDddDGrhULZxhhDnOAFm8HZwCt2UpI0xLc4wwqO8RmJEjmhiX5Om/BTER/lfuWnCgXPuQq2lDNYDX89/FZuAsotPOAXj2ILE+UhOi1pfPDEAAAAAElFTkSuQmCC"},
	{label:"复制当前标签标题和地址",oncommand: function() {addMenu.copy(addMenu.convertText("%TITLES%\n%URL%"));},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII="},
	{label:"复制当前标签源代码",oncommand: function() {addMenu.copy(addMenu.convertText( '<a href="%URL%" target="_blank">%TITLES%</a>'));},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAAAAAABmZmbc3Ny3t7eRkZE6OjpRDxSxAAAAAXRSTlMAQObYZgAAADJJREFUCNdjwASCECDAIADhY2UwMQoKsgqAGUyMJiAGoyATYzJMhEEYxhDAoh1hBQYAAPxVA4qkxzcpAAAAAElFTkSuQmCC"},
	{label:"复制当前标签MD源代码",oncommand: function() {(function(){
            var txt="";var url=gBrowser.currentURI.spec;var title=gBrowser.contentTitle;txt+="["+title+"]"+"("+url+")";this.clipboard.copyString(txt);    
    })();},
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAb0lEQVQ4jWNgGAzgPwUYbgC5FlPPACUsBsHEzzAgnHyGkAFpULE0JPG7UJqBgYGhg4GBoRyXAe+QbDgD5aMb4MLAwLAblwF3odgFiU2yAeVQfjkOA2bi88IZNIkzDJiBCLMdwwByAHUNoCgpDywAAOcYVL2aysArAAAAAElFTkSuQmCC"},


{}, 
{label:"复制所有标签标题",oncommand: function() {(function(){
           var titles = "";
            Array.slice(gBrowser.tabContainer.childNodes).forEach(function(tab) {
                titles += tab.label + "\n";
            });
            this.clipboard.copyString(titles);   
    })();},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWNgGCzgPxZMSA2GJKkWEmXAfwYGBg9yDfBgYGCYCcXEWogCjjIwMChDaZIBssY8KCYJ5DGghjhJrlBmwPTjTKg4ToCsAVvAeaCJ0S8dkGQARUl54AAAWsMsNkwmkt8AAAAASUVORK5CYII="},
	{label:"复制所有标签地址",oncommand: function() {(function(){
            var URLs = "";
            Array.slice(gBrowser.tabContainer.childNodes).forEach(function(tab) {
                var url = gBrowser.getBrowserForTab(tab).currentURI.spec;
                URLs += url + "\n";
            });
            this.clipboard.copyString(URLs);      
    })();},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA50lEQVQ4jb3SPUpDURAF4A8bbdxC9mEX8WcBIkYQbN2D2UQsxdYNiCiCgRQK9pogYgpdwPMHC41NUry5ECSP3Nd4YODO3Htmzsxc/hFX+ML1dHChBvkWy+iF1cL7H39UR8E+FtEO/xB3uZUvMQ4FN/hGd9bDo3hUoIMDfAT5fF6VDi7QCDsLYoG9HJlFEBMaITULVUNcwinWpmLbuFduYIDddDGrhULZxhhDnOAFm8HZwCt2UpI0xLc4wwqO8RmJEjmhiX5Om/BTER/lfuWnCgXPuQq2lDNYDX89/FZuAsotPOAXj2ILE+UhOi1pfPDEAAAAAElFTkSuQmCC"},
	{label:"复制所有标签标题和地址",oncommand: function() {(function() {
            var txt = "";
            Array.slice(gBrowser.tabContainer.childNodes).forEach(function(tab) {
                 var url = gBrowser.getBrowserForTab(tab).currentURI.spec;
                txt += tab.label + "\n" + url + "\n";
            });
            this.clipboard.copyString(txt); 
        })();},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII="},
{label:"复制所有标签标源代码",oncommand: function() {(function() {
            var txt = "";
            Array.slice(gBrowser.tabContainer.childNodes).forEach(function(tab) {
                 var url = gBrowser.getBrowserForTab(tab).currentURI.spec;
                txt += "<a href=" + "\""+ url +"\" "+  "target=\"_blank\">" +  tab.label + "</a>"+ "<br>"+ "\r";
            });
            this.clipboard.copyString(txt); 
        })();},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAAAAAABmZmbc3Ny3t7eRkZE6OjpRDxSxAAAAAXRSTlMAQObYZgAAADJJREFUCNdjwASCECDAIADhY2UwMQoKsgqAGUyMJiAGoyATYzJMhEEYxhDAoh1hBQYAAPxVA4qkxzcpAAAAAElFTkSuQmCC"},
{label:"复制所有标签标MD源代码",oncommand: function() {(function() {
            var txt="";Array.slice(gBrowser.tabContainer.childNodes).forEach(function(tab){var url=gBrowser.getBrowserForTab(tab).currentURI.spec;txt+="["+title+"]"+"("+url+")\\"+"\r"});this.clipboard.copyString(txt);
        })();},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAb0lEQVQ4jWNgGAzgPwUYbgC5FlPPACUsBsHEzzAgnHyGkAFpULE0JPG7UJqBgYGhg4GBoRyXAe+QbDgD5aMb4MLAwLAblwF3odgFiU2yAeVQfjkOA2bi88IZNIkzDJiBCLMdwwByAHUNoCgpDywAAOcYVL2aysArAAAAAElFTkSuQmCC"},



	];
	var menu = TabMenu({id:"context_TabInfoCopy",onpopupshowing: syncHidden});
	menu(items);
};






//隐藏相同项。必须，不能删除
function syncHidden(event) {
	Array.slice(event.target.children).forEach(function(elem){
		var command = elem.getAttribute('command');
		if (!command) return;
		var original = document.getElementById(command);
		if (!original) {
				elem.hidden = true;
				return;
		};
		elem.hidden = original.hidden;
		elem.collapsed = original.collapsed;
		elem.disabled = original.disabled;
	});
};


