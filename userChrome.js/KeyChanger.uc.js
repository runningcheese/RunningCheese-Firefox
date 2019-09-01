// ==UserScript==
// @name           KeyChanger.uc.js
// @author         Griever
// @namespace      http://d.hatena.ne.jp/Griever/
// @include        main
// @description    为火狐添额外的快捷键
// @license        MIT License
// @charset        UTF-8
// @version        2018.12.3.1
// @note           0.0.2 メニューを右クリックで設定ファイルを開けるようにした
// @note           0.0.2 Meta キーを装飾キーに使えるようになったかもしれない（未テスト）
// @note           0.0.2 Windows キーを装飾キーに使えるようになったかもしれない（未テスト Firefox 17 以降）
// @note           2018.1.25.2 Firefox59+ 修复
// ==/UserScript==

location == "chrome://browser/content/browser.xul" && (function () {
    var useScraptchpad = true;  // 如果不存在编辑器，则使用代码片段速记器，否则设置编辑器路径
    //let {classes: Cc, interfaces: Ci, utils: Cu, results: Cr} = Components;
    window.KeyChanger = {
        get file() {
            var aFile = FileUtils.getFile("UChrm", ["local", "_keychanger.js"], false);
            if (!aFile.exists()) {
                saveFile(aFile, '');
                alert('_keychanger配置为空，该文件在local目录下');
            }
            delete this.file;
            return this.file = aFile;
        },
        get FILE() {
            return this.file;
        },
        isBuilding: false,
        makeKeyset: function (isAlert) {
            KeyChanger.isBuilding = true;
            var s = new Date();
            var keys = this.makeKeys();
            if (!keys) {
                isBuilding = false;
                return this.alert('KeyChanger', 'Load error.');
            }
            var keyset = document.getElementById('keychanger-keyset');
            if (keyset)
                keyset.parentNode.removeChild(keyset);
            keyset = document.createElement('keyset');
            keyset.setAttribute('id', 'keychanger-keyset');
            keyset.appendChild(keys);

            var df = document.createDocumentFragment();
            Array.slice(document.getElementsByTagName('keyset')).forEach(function (elem) {
                df.appendChild(elem);
            });
            var insPos = document.getElementById('mainPopupSet');
            insPos.parentNode.insertBefore(keyset, insPos);
            insPos.parentNode.insertBefore(df, insPos);
            var e = new Date() - s;
            if (isAlert) {
                this.alert('KeyChanger: Loaded', e + 'ms');
            }
            setTimeout(function () {
                KeyChanger.isBuilding = false;
            }, 100);

        },
        makeKeys: function () {
            var str = this.loadText(this.file);
            if (!str)
                return null;

            var sandbox = new Components.utils.Sandbox(new XPCNativeWrapper(window));
            var keys = Components.utils.evalInSandbox('var keys = {};\n' + str + ';\nkeys;', sandbox);
            if (!keys)
                return null;
            var dFrag = document.createDocumentFragment();

            Object.keys(keys).forEach(function (n) {
                let keyString = n.toUpperCase().split("+");
                let modifiers = "", key, keycode, k;

                for (let i = 0, l = keyString.length; i < l; i++) {
                    k = keyString[i];
                    switch (k) {
                        case "CTRL":
                        case "CONTROL":
                        case "ACCEL":
                            modifiers += "accel,";
                            break;
                        case "SHIFT":
                            modifiers += "shift,";
                            break;
                        case "ALT":
                        case "OPTION":
                            modifiers += "alt,";
                            break;
                        case "META":
                        case "COMMAND":
                            modifiers += "meta,";
                            break;
                        case "OS":
                        case "WIN":
                        case "WINDOWS":
                        case "HYPER":
                        case "SUPER":
                            modifiers += "os,";
                            break;
                        case "":
                            key = "+";
                            break;
                        case "BACKSPACE":
                        case "BKSP":
                        case "BS":
                            keycode = "VK_BACK";
                            break;
                        case "RET":
                        case "ENTER":
                            keycode = "VK_RETURN";
                            break;
                        case "ESC":
                            keycode = "VK_ESCAPE";
                            break;
                        case "PAGEUP":
                        case "PAGE UP":
                        case "PGUP":
                        case "PUP":
                            keycode = "VK_PAGE_UP";
                            break;
                        case "PAGEDOWN":
                        case "PAGE DOWN":
                        case "PGDN":
                        case "PDN":
                            keycode = "VK_PAGE_DOWN";
                            break;
                        case "TOP":
                            keycode = "VK_UP";
                            break;
                        case "BOTTOM":
                            keycode = "VK_DOWN";
                            break;
                        case "INS":
                            keycode = "VK_INSERT";
                            break;
                        case "DEL":
                            keycode = "VK_DELETE";
                            break;
                        default:
                            if (k.length === 1) {
                                key = k;
                            } else if (k.indexOf("VK_") === -1) {
                                keycode = "VK_" + k;
                            } else {
                                keycode = k;
                            }
                            break;
                    }
                }
                let elem = document.createElement('key');
                if (modifiers !== '')
                    elem.setAttribute('modifiers', modifiers.slice(0, -1));
                if (key)
                    elem.setAttribute('key', key);
                else if (keycode)
                    elem.setAttribute('keycode', keycode);

                let cmd = keys[n];
                switch (typeof cmd) {
                    case 'function':
                        elem.setAttribute('oncommand', '(' + cmd.toSource() + ').call(this, event);');
                        break;
                    case 'object':
                        Object.keys(cmd).forEach(function (a) {
                            elem.setAttribute(a, cmd[a]);
                        }, this);
                        break;
                    default:
                        elem.setAttribute('oncommand', cmd);
                }
                dFrag.appendChild(elem);
            }, this);
            return dFrag;
        },
        createMenuitem: function () {
            var menuitem = document.createElement('menuitem');
            menuitem.setAttribute('id', 'toolsbar_KeyChanger_rebuild');
            menuitem.setAttribute('label', 'KeyChanger');
            menuitem.setAttribute('tooltiptext', '左键：重载配置\n右键：编辑配置');
            menuitem.setAttribute('oncommand', 'setTimeout(function(){ KeyChanger.makeKeyset(true); }, 10);');
            menuitem.setAttribute('onclick', 'if (event.button == 2) { event.preventDefault();KeyChanger.edit(KeyChanger.file); }');
            var insPos = document.getElementById('devToolsSeparator');
            insPos.parentNode.insertBefore(menuitem, insPos);
        },
        loadText: function (aFile) {
            var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
            var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
            fstream.init(aFile, -1, 0, 0);
            sstream.init(fstream);

            var data = sstream.read(sstream.available());
            try {
                data = decodeURIComponent(escape(data));
            } catch (e) {
            }
            sstream.close();
            fstream.close();
            return data;
        },
        alert: function (aMsg, aTitle, aCallback) {
            var callback = aCallback ? {
                observe: function (subject, topic, data) {
                    if ("alertclickcallback" != topic)
                        return;
                    aCallback.call(null);
                }
            } : null;
            var alertsService = Cc["@mozilla.org/alerts-service;1"].getService(Ci.nsIAlertsService);
            alertsService.showAlertNotification(
                "chrome://global/skin/icons/information-32.png", aTitle || "addMenu",
                aMsg + "", !!callback, "", callback);
        },
        edit: function (aFile, aLineNumber) {
            if (KeyChanger.isBuilding) return;
            if (!aFile || !aFile.exists() || !aFile.isFile()) return;

            var editor;
            try {
                editor = Services.prefs.getComplexValue("view_source.editor.path", Ci.nsIFile);
            } catch (e) {
            }

            if (!editor || !editor.exists()) {
                if (useScraptchpad) {
                    this.openScriptInScratchpad(window, aFile);
                    return;
                } else {
                    alert("请先设置编辑器的路径!!!");
                    var fp = Cc['@mozilla.org/filepicker;1'].createInstance(Ci.nsIFilePicker);
                    fp.init(window, "设置全局脚本编辑器", fp.modeOpen);
                    fp.appendFilter("执行文件", "*.exe");
                    if (fp.show() == fp.returnCancel || !fp.file)
                        return;
                    else {
                        editor = fp.file;
                        Services.prefs.setCharPref("view_source.editor.path", editor.path);
                    }
                }
            }

            // 调用自带的
            var aURL = userChrome.getURLSpecFromFile(aFile);
            var aDocument = null;
            var aCallBack = null;
            var aPageDescriptor = null;
            gViewSourceUtils.openInExternalEditor({
                URL: aURL,
                lineNumber: aLineNumber
            }, aPageDescriptor, aDocument, aLineNumber, aCallBack);

        },
        openScriptInScratchpad: function (parentWindow, file) {
            let spWin = window.openDialog("chrome://devtools/content/scratchpad/index.xul", "Toolkit:Scratchpad", "chrome,dialog,centerscreen,dependent");
            spWin.top.moveTo(0, 0);
            spWin.top.resizeTo(screen.availWidth, screen.availHeight);
            spWin.addEventListener("load", function spWinLoaded() {
                spWin.removeEventListener("load", spWinLoaded, false);

                let Scratchpad = spWin.Scratchpad;
                Scratchpad.setFilename(file.path);
                Scratchpad.addObserver({
                    onReady: function () {
                        Scratchpad.removeObserver(this);
                        Scratchpad.importFromFile.call(Scratchpad, file);
                    }
                });
            }, false);
        },
        exec: function (path, arg) {
            var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsIFile);
            var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
            try {
                var a = (typeof arg == 'string' || arg instanceof String) ? arg.split(/\s+/) : [arg];
                file.initWithPath(path);
                process.init(file);
                process.run(false, a, a.length);
            } catch (e) {
                this.log(e);
            }
        },
        log: function () {
            Services.console.logStringMessage("[KeyChanger] " + Array.slice(arguments));
        },
    };

    window.KeyChanger.createMenuitem();
    window.KeyChanger.makeKeyset();

})();