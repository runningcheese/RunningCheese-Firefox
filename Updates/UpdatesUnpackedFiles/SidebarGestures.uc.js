//为侧边栏增加鼠标手势
location == "chrome://browser/content/browser.xul" && (function () {
    ucjsSidebarGestures = {
        lastX: 0,
        lastY: 0,
        sourceNode: "",
        directionChain: "",
        isMouseDownL: false,
        isMouseDownR: false,
        hideFireContext: false,
        shouldFireContext: false,
        GESTURES: {
            "L": {
								name: "后退",
                cmd: function() {
        var sidebar = document.getElementById('sidebar');
        var webPanel = sidebar.contentDocument.getElementById("web-panels-browser");
        if(webPanel){
            var win = webPanel.contentWindow;
            win.history.back();
}
                }
            },
            "R": {
								name: "前进",
                cmd: function() {
                    var win = ucjsSidebarGestures.getSidebarWindow();
                    win.history.forward();
                }
            },
            "UD": {
								name: "刷新当前页面",
                cmd: function() {
                    var win = ucjsSidebarGestures.getSidebarWindow();
                    win.location.reload();
                }
            },
            "U": {
								name: "向上滚动",
                cmd: function() {
                   goDoCommand('cmd_scrollPageUp');
                }
            },
            "D": {
								name: "向下滚动",
                cmd: function() {
                        goDoCommand('cmd_scrollPageDown');
                }
            },
            "RU": {
								name: "转到页首",
                cmd: function() {
                        goDoCommand('cmd_scrollTop');
                }
            },
            "RD": {
								name: "转到页尾",
                cmd: function() {
                        goDoCommand('cmd_scrollBottom');
                }
            },


        },
        init: function (win) {
            var self = this;

            ["mousedown", "mousemove", "mouseup", "contextmenu", "DOMMouseScroll", "dragend"].forEach(function (type) {
                win.addEventListener(type, self, true);
            });
            win.addEventListener("unload", function () {
                ["mousedown", "mousemove", "mouseup", "contextmenu", "DOMMouseScroll", "dragend"].forEach(function (type) {
                    win.removeEventListener(type, self, true);
                });
            }, false);
        },
        handleEvent: function (event) {
            switch (event.type) {
            case "mousedown":
                if(/object|embed/i.test(event.target.localName)) return;
                if (event.button == 2) {
                    this.sourceNode = event.target;
                    this.isMouseDownR = true;
                    this.hideFireContext = false;
                    [this.lastX, this.lastY, this.directionChain] = [event.screenX, event.screenY, ""];
                }
                if (event.button == 2 && this.isMouseDownL) {
                    this.isMouseDownR = false;
                    this.shouldFireContext = false;
                    this.hideFireContext = true;
                    this.directionChain = "L>R";
                    this.stopGesture(event);
                } else if (event.button == 0) {
                    this.isMouseDownL = true;
                    if (this.isMouseDownR) {
                        this.isMouseDownL = false;
                        this.shouldFireContext = false;
                        this.hideFireContext = true;
                        this.directionChain = "L<R";
                        this.stopGesture(event);
                    }
                }
                break;
            case "mousemove":
                if (this.isMouseDownR) {
                    this.hideFireContext = true;
                    var [subX, subY] = [event.screenX - this.lastX, event.screenY - this.lastY];
                    var [distX, distY] = [(subX > 0 ? subX : (-subX)), (subY > 0 ? subY : (-subY))];
                    var direction;
                    if (distX < 10 && distY < 10) return;
                    if (distX > distY) direction = subX < 0 ? "L" : "R";
                    else direction = subY < 0 ? "U" : "D";
                    if (direction != this.directionChain.charAt(this.directionChain.length - 1)) {
                        this.directionChain += direction;
                        XULBrowserWindow.statusTextField.label = this.GESTURES[this.directionChain] ? "\u624b\u52bf: " + this.directionChain + " " + this.GESTURES[this.directionChain].name : "\u672a\u77e5\u624b\u52bf:" + this.directionChain;
                    }
                    this.lastX = event.screenX;
                    this.lastY = event.screenY;
                }
                break;
            case "mouseup":
                if (event.ctrlKey && event.button == 2) {
                    this.isMouseDownL = false;
                    this.isMouseDownR = false;
                    this.shouldFireContext = false;
                    this.hideFireContext = false;
                    this.directionChain = "";
                    event.preventDefault();
                    XULBrowserWindow.statusTextField.label = "\u53d6\u6d88\u624b\u52bf";
                    break;
                }
                if (this.isMouseDownR && event.button == 2) {
                    if (this.directionChain) this.shouldFireContext = false;
                    this.isMouseDownR = false;
                    this.directionChain && this.stopGesture(event);
                } else if (event.button == 0 && this.isMouseDownL) {
                    this.isMouseDownL = false;
                    this.shouldFireContext = false;
                }
                break;
            case "contextmenu":
                if (this.isMouseDownL || this.isMouseDownR || this.hideFireContext) {
                    var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
                    var contextmenu = pref.getBoolPref("dom.event.contextmenu.enabled");
                    pref.setBoolPref("dom.event.contextmenu.enabled", true);
                    setTimeout(function () {
                        pref.setBoolPref("dom.event.contextmenu.enabled", contextmenu);
                    }, 10);
                    event.preventDefault();
                    event.stopPropagation();
                    this.shouldFireContext = true;
                    this.hideFireContext = false;
                }
                break;
            case "DOMMouseScroll":
                if (this.isMouseDownR) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.shouldFireContext = false;
                    this.hideFireContext = true;
                    this.directionChain = "W" + (event.detail > 0 ? "+" : "-");
                    this.stopGesture(event);
                }
                break;
            case "dragend":
                this.isMouseDownL = false;
            }
        },
        stopGesture: function (event) {
            (this.GESTURES[this.directionChain] ? this.GESTURES[this.directionChain].cmd(this, event) & (XULBrowserWindow.statusTextField.label = "") : (XULBrowserWindow.statusTextField.label = "\u672a\u77e5\u624b\u52bf:" + this.directionChain)) & (this.directionChain = "");
        },
        getSidebarWindow: function(){
            var sidebar = document.getElementById('sidebar');
            var webPanel = sidebar.contentDocument.getElementById("web-panels-browser");
            if(webPanel){
                return webPanel.contentWindow;
            }
        }
    };

    var sidebar = document.getElementById('sidebar');
    sidebar.addEventListener('DOMContentLoaded', function(){
        if (sidebar.contentDocument){
            sidebar.removeEventListener('DOMContentLoaded', arguments.callee, false);
            var wpb = sidebar.contentDocument.getElementById('web-panels-browser');
            if (wpb) {
                ucjsSidebarGestures.init(sidebar.contentWindow);
            }
        }
    }, false);
})()