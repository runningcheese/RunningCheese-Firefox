// ==UserScript==
// @name           move_reload_into_urlbar
// @description    move reload into urlbar
// @compatibility  Firefox 57+
// @author         GOLF-AT
// @version        1.0.20171104
//把 Firefox 57 的刷新/停止按钮移到地址栏后面

(function() {
    function moveReloadIntoURL() {
        try {
            var btn0 = document.getElementById("pageActionButton");
            var btn1 = document.getElementById("reload-button");
            if (!btn0 || !btn1) return;

            var btn = document.createElement("toolbarbutton");
            btn.style.margin = '0px';
            btn.setAttribute("id", "stop_reload_button");
            btn.setAttribute("class", btn1.getAttribute("class"));

            btn.addEventListener("command", function(e) {
                var btn = document.getElementById("reload-button");
                if (btn && btn.getAttribute('displaystop'))
                    BrowserStop();
                else
                    BrowserReload(); 
            }, false);
            btn0.parentNode.insertBefore(btn, btn0);
            
            btn1.addEventListener('DOMAttrModified', reloadBtnAttr);
            reloadBtnAttr(); btn1.parentNode.hidden = true;
        }catch(e){ alert(e) }
    }

    function reloadBtnAttr(e) {
        btn = document.getElementById("stop_reload_button");
        if (btn && (!e || e.attrName=='displaystop')) {
            var newVal = e ? e.newValue : document.getElementById(
                "reload-button").getAttribute('displaystop');
            if (newVal)
                btn.style.listStyleImage = "url('chrome://browser/skin/stop.svg')";
            else
                btn.style.listStyleImage = "url('chrome://browser/skin/reload.svg')";
        }
    }

    moveReloadIntoURL();
})();
