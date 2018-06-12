function customURL(url)
{
	if (url.indexOf('maps.google.com') != -1)
	{
		return document.getElementById('link').href;
	}
	else
	{
		return url;
	}
}

function getSelected()
{
	if (window.getSelection)
	{
		return window.getSelection();
	}
	else if (document.getSelection)
	{
		return document.getSelection();
	}
	else if (document.selection)
	{
		return document.selection.createRange().text;
	}
	return false;
}

function cleanUp()
{
	node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\bshaunsational_qr\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
	if(re.test(els[i].className))a.push(els[i]);

	for(var x in a)
	{
		if (a[x].parentNode)
		{
			a[x].parentNode.removeChild(a[x]);
		}
	}
}
cleanUp();

var selectedText = getSelected();
var qrData = (selectedText == false) ? customURL(document.location.href) : selectedText;

var shade = document.createElement("div");
	shade.setAttribute('class','shaunsational_qr');
	shade.setAttribute('id','shade');
	shade.setAttribute('style','background-color:#000;height:100%;left:0;opacity:0.65;position:fixed;top:0;width:100%;z-index:1001;');
	
var centr = document.createElement("div");
	centr.setAttribute('class','shaunsational_qr');
	centr.setAttribute('id','centr');
	centr.setAttribute('style','background-color:transparent;height:100%;left:0;position:fixed;text-align:center;top:0;width:100%;z-index:1001;');
	
var qrdiv = document.createElement("div");
	qrdiv.setAttribute('class','shaunsational_qr');
	qrdiv.setAttribute('id','qrdiv');
	qrdiv.setAttribute('style','margin:40px auto auto auto;background-color:#FFF;height:320px;width:320px;z-index:1001;-moz-border-radius:20px;');   
   
var qrcode = document.createElement("img");
	qrcode.setAttribute('class','shaunsational_qr');
	qrcode.setAttribute('id','qrcode');
	qrcode.setAttribute('style','margin:10px;cursor:pointer;');
	qrcode.setAttribute('src','https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + decodeURIComponent(qrData));
	qrcode.setAttribute('title','Click to close.');
	
var qrurl = document.createElement("div");
	qrurl.setAttribute('class','shaunsational_qr');
	qrurl.setAttribute('id','qrurl');
qrurl.setAttribute('style','background:#FFF;margin:5px auto auto auto;padding:2px 15px;cursor:pointer;width:290px;font-size:10px;color:#333;-moz-border-radius:20px;text-align:center;overflow:hidden;');
	var qrurl_text = document.createTextNode(qrData);
		qrurl.appendChild(qrurl_text);


centr.appendChild(qrdiv);
centr.appendChild(qrurl);
qrdiv.appendChild(qrcode);
document.body.appendChild(shade);
document.body.appendChild(centr);
document.body.setAttribute('onclick','cleanUp()');
