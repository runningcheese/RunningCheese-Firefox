// ==UserScript==
// @name           downloadPlus.uc.js
// @description    从硬盘中删除+下载重命名并可转码+双击复制链接+另存为+保存并打开+完成下载提示音+自动关闭下载产生的空白标签
// @author         w13998686967再次修改整合 (ywzhaiqi、黒仪大螃蟹、Alice0775、紫云飞)
// @include        chrome://browser/content/browser.xul
// @include        chrome://browser/content/browser.xhtml
// @include        chrome://browser/content/places/places.xul
// @include        chrome://mozapps/content/downloads/unknownContentType.xul
// @include        chrome://mozapps/content/downloads/downloads.xul
// @version        2014.11.02 增加多个功能
// @version        2014.06.06 add delay to fix for new userChrome.js
// ==/UserScript==
   
(function() {
   
    var encoding = true //true,(新建下载)弹窗             false,不弹窗
    var rename = true //true,(下载改名)可改名           false,不可改
    var locking = true //true,(下载改名)自动锁定保存文件 false,不锁定
    var encodingConvert = true //true,(下载改名)开启下拉菜单选项 false,关闭下拉菜单选项
    var Convert = true //true,(保存并打开)兼容火狐版本26+(也许会有BUG)     false,火狐版本29+
   
    if (!window.Services) Components.utils.import("resource://gre/modules/Services.jsm");
    if (!window.DownloadUtils) Components.utils.import("resource://gre/modules/DownloadUtils.jsm");
   
    switch (location.href) {
        case "chrome://browser/content/browser.xhtml":
            setTimeout(function() {
                new_Download(); // 新建下载
                downloadsPanel_removeFile(); // 从硬盘中删除
                //downloadSound_Play(); // 下载完成提示音
                downloadFileSize(); // 精确显示文件大小
                autoClose_blankTab(); // 自动关闭下载产生的空白标签
                saveAndOpen_on_main(); // 跟下面的 save_AndOpen 配合使用
                download_dialog_changeName_on_main(); // 跟下面的 download_dialog_changeName 配合使用
                download_speed(); //下载面板显示下载速度
            }, 200);
            break;
        case "chrome://mozapps/content/downloads/unknownContentType.xul":
            setTimeout(function() {
                save_And_Open(); // 保存并打开
                download_dialog_changeName(); // 下载改名
                download_dialog_saveas(); // 另存为...
                download_dialog_saveTo(); // 保存到...
                download_dialog_showCompleteURL(); // 下载弹出窗口双击链接复制完整链接
                download_dialog_doubleclicksaveL(); // 下载弹出窗口双击保存文件项执行下载
                window.sizeToContent(); // 下载弹出窗口大小自适应(确保在添加的按钮之后加载)
            }, 200);
            break;
        case "chrome://browser/content/places/places.xul":
            setTimeout(function() {
                new_Download(); // 新建下载(我的足迹)
                downloadsPanel_removeFile(); // 从硬盘中删除(我的足迹)
            }, 200);
            break;
    }
   
   
    // 下载完成提示音
    function downloadSound_Play() {
        var downloadPlaySound = {
   
            DL_START: null,
            DL_DONE: "file:///C:/WINDOWS/Media/chimes.wav",
            DL_CANCEL: null,
            DL_FAILED: null,
   
            _list: null,
            init: function sampleDownload_init() {
                XPCOMUtils.defineLazyModuleGetter(window, "Downloads",
                    "resource://gre/modules/Downloads.jsm");
   
   
                window.addEventListener("unload", this, false);
   
                //**** 监视下载
                if (!this._list) {
                    Downloads.getList(Downloads.ALL).then(list => {
                        this._list = list;
                        return this._list.addView(this);
                    }).then(null, Cu.reportError);
                }
            },
   
            uninit: function() {
                window.removeEventListener("unload", this, false);
                if (this._list) {
                    this._list.removeView(this);
                }
            },
   
            onDownloadAdded: function(aDownload) {
                //**** 开始下载
                if (this.DL_START);
                this.playSoundFile(this.DL_START);
            },
   
            onDownloadChanged: function(aDownload) {
                //**** 取消下载
                if (aDownload.canceled && this.DL_CANCEL)
                    this.playSoundFile(this.DL_CANCEL)
                    //**** 下载失败
                if (aDownload.error && this.DL_FAILED)
                    this.playSoundFile(this.DL_FAILED)
                    //**** 完成下载
                if (aDownload.succeeded && this.DL_DONE)
                    this.playSoundFile(this.DL_DONE)
            },
   
            playSoundFile: function(aFilePath) {
                if (!aFilePath)
                    return;
                var ios = Components.classes["@mozilla.org/network/io-service;1"]
                    .createInstance(Components.interfaces["nsIIOService"]);
                try {
                    var uri = ios.newURI(aFilePath, "UTF-8", null);
                } catch (e) {
                    return;
                }
                var file = uri.QueryInterface(Components.interfaces.nsIFileURL).file;
                if (!file.exists())
                    return;
   
                this.play(uri);
            },
   
            play: function(aUri) {
                var sound = Components.classes["@mozilla.org/sound;1"]
                    .createInstance(Components.interfaces["nsISound"]);
                sound.play(aUri);
            },
   
            handleEvent: function(event) {
                switch (event.type) {
                    case "unload":
                        this.uninit();
                        break;
                }
            }
        }
        downloadPlaySound.init();
    }
   
    //新建下载
    function new_Download() {
            var createDownloadDialog = function() {
                if (encoding)
                    window.openDialog("data:application/vnd.mozilla.xul+xml;charset=UTF-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPD94bWwtc3R5bGVzaGVldCBocmVmPSJjaHJvbWU6Ly9nbG9iYWwvc2tpbi8iIHR5cGU9InRleHQvY3NzIj8+Cjx3aW5kb3cgeG1sbnM9Imh0dHA6Ly93d3cubW96aWxsYS5vcmcva2V5bWFzdGVyL2dhdGVrZWVwZXIvdGhlcmUuaXMub25seS54dWwiIHdpZHRoPSI1MDAiIGhlaWdodD0iMzAwIiB0aXRsZT0i5paw5bu65LiL6L295Lu75YqhIj4KCTxoYm94IGFsaWduPSJjZW50ZXIiIHRvb2x0aXB0ZXh0PSJodHRwOi8vd3d3LmV4YW1wbGUuY29tL1sxLTEwMC0zXSAgKFvlvIDlp4st57uT5p2fLeS9jeaVsF0pIj4KCQk8bGFiZWwgdmFsdWU9IuaJuemHj+S7u+WKoSI+PC9sYWJlbD4KCQk8dGV4dGJveCBmbGV4PSIxIi8+Cgk8L2hib3g+Cgk8dGV4dGJveCBpZD0idXJscyIgbXVsdGlsaW5lPSJ0cnVlIiBmbGV4PSIxIi8+Cgk8aGJveCBkaXI9InJldmVyc2UiPgoJCTxidXR0b24gbGFiZWw9IuW8gOWni+S4i+i9vSIvPgoJPC9oYm94PgoJPHNjcmlwdD4KCQk8IVtDREFUQVsKCQlmdW5jdGlvbiBQYXJzZVVSTHMoKSB7CgkJCXZhciBiYXRjaHVybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoInRleHRib3giKS52YWx1ZTsKCQkJaWYgKC9cW1xkKy1cZCsoLVxkKyk/XF0vLnRlc3QoYmF0Y2h1cmwpKSB7CgkJCQlmb3IgKHZhciBtYXRjaCA9IGJhdGNodXJsLm1hdGNoKC9cWyhcZCspLShcZCspLT8oXGQrKT9cXS8pLCBpID0gbWF0Y2hbMV0sIGogPSBtYXRjaFsyXSwgayA9IG1hdGNoWzNdLCB1cmxzID0gW107IGkgPD0gajsgaSsrKSB7CgkJCQkJdXJscy5wdXNoKGJhdGNodXJsLnJlcGxhY2UoL1xbXGQrLVxkKygtXGQrKT9cXS8sIChpICsgIiIpLmxlbmd0aCA8IGsgPyAoZXZhbCgiMTBlIiArIChrIC0gKGkgKyAiIikubGVuZ3RoKSkgKyAiIikuc2xpY2UoMikgKyBpIDogaSkpOwoJCQkJfQoJCQkJZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiI3VybHMiKS52YWx1ZSA9IHVybHMuam9pbigiXG4iKTsKCQkJfSBlbHNlIHsKCQkJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiN1cmxzIikudmFsdWUgPSBiYXRjaHVybDsKCQkJfQoJCX0KCQl2YXIgb3duZXIgPSB3aW5kb3cub3BlbmVyOwoJCXdoaWxlKG93bmVyLm9wZW5lciAmJiBvd25lci5sb2NhdGlvbiAhPSAiY2hyb21lOi8vYnJvd3Nlci9jb250ZW50L2Jyb3dzZXIueHVsIil7CgkJCW93bmVyID0gb3duZXIub3BlbmVyOwoJCX0KdmFyIG1haW53aW4gPSBDb21wb25lbnRzLmNsYXNzZXNbIkBtb3ppbGxhLm9yZy9hcHBzaGVsbC93aW5kb3ctbWVkaWF0b3I7MSJdLmdldFNlcnZpY2UoQ29tcG9uZW50cy5pbnRlcmZhY2VzLm5zSVdpbmRvd01lZGlhdG9yKS5nZXRNb3N0UmVjZW50V2luZG93KCJuYXZpZ2F0b3I6YnJvd3NlciIpOwkJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoInRleHRib3giKS5hZGRFdmVudExpc3RlbmVyKCJrZXl1cCIsIFBhcnNlVVJMcywgZmFsc2UpOwoJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoImJ1dHRvbiIpLmFkZEV2ZW50TGlzdGVuZXIoImNvbW1hbmQiLCBmdW5jdGlvbiAoKSB7CQlkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCIjdXJscyIpLnZhbHVlLnNwbGl0KCJcbiIpLmZvckVhY2goZnVuY3Rpb24gKHVybCkgewoJCQkJb3duZXIuc2F2ZVVSTCh1cmwgLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBtYWlud2luLmRvY3VtZW50KTsKCQkJfSk7CgkJCWNsb3NlKCkKCQl9LCBmYWxzZSk7CgkJZG9jdW1lbnQucXVlcnlTZWxlY3RvcigidGV4dGJveCIpLnZhbHVlID0gb3duZXIucmVhZEZyb21DbGlwYm9hcmQoKTsKCQlQYXJzZVVSTHMoKTsKCQldXT4KCTwvc2NyaXB0Pgo8L3dpbmRvdz4=", "name", "top=" + (window.screenY + window.innerHeight / 4 - 50) + ",left=" + (window.screenX + window.innerWidth / 2 - 250));
                else
                    window.openDialog("data:application/vnd.mozilla.xul+xml;charset=UTF-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPD94bWwtc3R5bGVzaGVldCBocmVmPSJjaHJvbWU6Ly9nbG9iYWwvc2tpbi8iIHR5cGU9InRleHQvY3NzIj8+Cjx3aW5kb3cgeG1sbnM9Imh0dHA6Ly93d3cubW96aWxsYS5vcmcva2V5bWFzdGVyL2dhdGVrZWVwZXIvdGhlcmUuaXMub25seS54dWwiIHdpZHRoPSI1MDAiIGhlaWdodD0iMzAwIiB0aXRsZT0i5paw5bu65LiL6L295Lu75YqhIj4KCTxoYm94IGFsaWduPSJjZW50ZXIiIHRvb2x0aXB0ZXh0PSJodHRwOi8vd3d3LmV4YW1wbGUuY29tL1sxLTEwMC0zXSAgKFvlvIDlp4st57uT5p2fLeS9jeaVsF0pIj4KCQk8bGFiZWwgdmFsdWU9IuaJuemHj+S7u+WKoSI+PC9sYWJlbD4KCQk8dGV4dGJveCBmbGV4PSIxIi8+Cgk8L2hib3g+Cgk8dGV4dGJveCBpZD0idXJscyIgbXVsdGlsaW5lPSJ0cnVlIiBmbGV4PSIxIi8+Cgk8aGJveCBkaXI9InJldmVyc2UiPgoJCTxidXR0b24gbGFiZWw9IuW8gOWni+S4i+i9vSIvPgoJPC9oYm94PgoJPHNjcmlwdD4KCQk8IVtDREFUQVsKCQlmdW5jdGlvbiBQYXJzZVVSTHMoKSB7CgkJCXZhciBiYXRjaHVybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoInRleHRib3giKS52YWx1ZTsKCQkJaWYgKC9cW1xkKy1cZCsoLVxkKyk/XF0vLnRlc3QoYmF0Y2h1cmwpKSB7CgkJCQlmb3IgKHZhciBtYXRjaCA9IGJhdGNodXJsLm1hdGNoKC9cWyhcZCspLShcZCspLT8oXGQrKT9cXS8pLCBpID0gbWF0Y2hbMV0sIGogPSBtYXRjaFsyXSwgayA9IG1hdGNoWzNdLCB1cmxzID0gW107IGkgPD0gajsgaSsrKSB7CgkJCQkJdXJscy5wdXNoKGJhdGNodXJsLnJlcGxhY2UoL1xbXGQrLVxkKygtXGQrKT9cXS8sIChpICsgIiIpLmxlbmd0aCA8IGsgPyAoZXZhbCgiMTBlIiArIChrIC0gKGkgKyAiIikubGVuZ3RoKSkgKyAiIikuc2xpY2UoMikgKyBpIDogaSkpOwoJCQkJfQoJCQkJZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiI3VybHMiKS52YWx1ZSA9IHVybHMuam9pbigiXG4iKTsKCQkJfSBlbHNlIHsKCQkJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiN1cmxzIikudmFsdWUgPSBiYXRjaHVybDsKCQkJfQoJCX0KCQl2YXIgb3duZXIgPSB3aW5kb3cub3BlbmVyOwoJCXdoaWxlKG93bmVyLm9wZW5lciAmJiBvd25lci5sb2NhdGlvbiAhPSAiY2hyb21lOi8vYnJvd3Nlci9jb250ZW50L2Jyb3dzZXIueHVsIil7CgkJCW93bmVyID0gb3duZXIub3BlbmVyOwoJCX0KdmFyIG1haW53aW4gPSBDb21wb25lbnRzLmNsYXNzZXNbIkBtb3ppbGxhLm9yZy9hcHBzaGVsbC93aW5kb3ctbWVkaWF0b3I7MSJdLmdldFNlcnZpY2UoQ29tcG9uZW50cy5pbnRlcmZhY2VzLm5zSVdpbmRvd01lZGlhdG9yKS5nZXRNb3N0UmVjZW50V2luZG93KCJuYXZpZ2F0b3I6YnJvd3NlciIpOwkJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoInRleHRib3giKS5hZGRFdmVudExpc3RlbmVyKCJrZXl1cCIsIFBhcnNlVVJMcywgZmFsc2UpOwoJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoImJ1dHRvbiIpLmFkZEV2ZW50TGlzdGVuZXIoImNvbW1hbmQiLCBmdW5jdGlvbiAoKSB7CQlkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCIjdXJscyIpLnZhbHVlLnNwbGl0KCJcbiIpLmZvckVhY2goZnVuY3Rpb24gKHVybCkgewoJCQkJb3duZXIuc2F2ZVVSTCh1cmwgLCBudWxsLCBudWxsLCBudWxsLCB0cnVlLCBudWxsLCBtYWlud2luLmRvY3VtZW50KTsKCQkJfSk7CgkJCWNsb3NlKCkKCQl9LCBmYWxzZSk7CgkJZG9jdW1lbnQucXVlcnlTZWxlY3RvcigidGV4dGJveCIpLnZhbHVlID0gb3duZXIucmVhZEZyb21DbGlwYm9hcmQoKTsKCQlQYXJzZVVSTHMoKTsKCQldXT4KCTwvc2NyaXB0Pgo8L3dpbmRvdz4=", "name", "top=" + (window.screenY + window.innerHeight / 4 - 50) + ",left=" + (window.screenX + window.innerWidth / 2 - 250));
            }
   
            location.href.startsWith('chrome://browser/content/browser.x') && (function() {
                document.getElementById('downloads-button').parentNode.addEventListener('click', function(e) {
                    if (e.target.id == "downloads-button" || e.target.id == "downloads-indicator") {
                        if (e.button == 2) {
                            if (!(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey)) {
                                createDownloadDialog();
                                e.stopPropagation();
                                e.preventDefault();
                            }
                        }
                    }
                }, false);
            })();
   
            location == "chrome://browser/content/places/places.xul" && (function() {
                var button = document.querySelector("#placesToolbar").insertBefore(document.createXULElement("toolbarbutton"), document.querySelector("#clearDownloadsButton"));
                button.id = "createNewDownload";
                button.label = "新建下载";
                button.style.paddingRight = "9px";
                button.addEventListener("command", createDownloadDialog, false);
                window.addEventListener("mouseover", function(e) {
                    button.style.display = (document.getElementById("searchFilter").attributes.getNamedItem("collection").value == "downloads") ? "-moz-box" : "none";
                }, false);
            })();
        }
        // 从硬盘中删除
    function downloadsPanel_removeFile() {
    var removeDownloadfile = {
        currentPanel: 1,
        removeStatus: function () {
            let RMBtn = document.querySelector("#removeDownload");
            if (RMBtn) {
                var listbox, node;
                let flag = removeDownloadfile.currentPanel;
                if (flag == "1") {
                    listbox = document.querySelector("#downloadsListBox");
                    node = listbox && listbox.selectedItems && listbox.selectedItems[0];
                } else if (flag == "3") {
                    listbox = document.querySelector("#downloadsRichListBox");
                    node = listbox && listbox.selectedItems && listbox.selectedItems[0];
                } else {
                    //listbox = document.querySelector("#panelMenu_downloadsMenu");
                    node = document.getElementById("panelDownloadsContextMenu");
                }
                let state = (node && node.getAttribute('state'));
                let exists = (node && node.getAttribute('exists'));
                RMBtn.setAttribute("disabled", "true");
                if (state != "0" && state != "4" && state != "5" && exists == "true") {
                    RMBtn.removeAttribute("disabled");
                }
            }
   
        },
        removeMenu: function (contextMenuId) {
            try {
                removeDownloadfile.removeStatus();
            } catch (e) {
                alert(e.message)
            }
            ;
            let pnl = document.querySelector("#" + contextMenuId);
            if (pnl.querySelector("#removeDownload")) return;
   
            let menuitem = document.getElementById("removeDownload") || document.createXULElement("menuitem"),
                rlm = pnl.querySelector('.downloadRemoveFromHistoryMenuItem');
   
            menuitem.setAttribute("label", rlm.getAttribute("label").indexOf("History") != -1 ? "Delete File" : "\u4ECE\u786C\u76D8\u4E2D\u5220\u9664");
            menuitem.setAttribute("id", "removeDownload");
   
            function removeSelectFile(path) {
                let file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);
                try {
                    file.initWithPath(path);
                } catch (e) {
   
                }
                if (!file.exists()) {
                    if (/\..{0,10}(\.part)$/.test(file.path))
                        file.initWithPath(file.path.replace(".part", ""));
                    else
                        file.initWithPath(file.path + ".part");
                }
                if (file.exists()) {
                    file.permissions |= 0666;
                    file.remove(0);
                }
            }
   
            menuitem.onclick = function (e) {
   
                if (e.target.disabled) return;
                if (removeDownloadfile.currentPanel == "2") {
                    //var ddBox = document.getElementById("panelMenu_downloadsMenu");
                    //if(!ddBox)return;
                    try {
                        let sShell = document.getElementById("panelDownloadsContextMenu")._anchorNode._shell;
                        let path = sShell.download.target.path;
                        removeSelectFile(path);
                        sShell.doCommand("cmd_delete");
                    } catch (e) {
                    }
                } else {
                    var ddBox = document.getElementById("downloadsRichListBox");
                    if (!(ddBox && ddBox._placesView)) {
                        ddBox = document.getElementById("downloadsListBox");
                    }
                    if (!ddBox) return;
                    var len = ddBox.selectedItems.length;
   
                    for (var i = len - 1; i >= 0; i--) {
                        let sShell = ddBox.selectedItems[i]._shell;
                        let path = sShell.download.target.path;
                        removeSelectFile(path);
                        sShell.doCommand("cmd_delete");
                    }
                }
   
            };
   
            try {
                pnl.insertBefore(menuitem, rlm.nextSibling);
            } catch (e) {
                alert(e.message);
            }
            removeDownloadfile.removeStatus();
        },
        removeMenu1: function () {
            removeDownloadfile.currentPanel = "1";
            removeDownloadfile.removeMenu("downloadsContextMenu");
        },
        removeMenu2: function () {
            removeDownloadfile.currentPanel = "2";
            removeDownloadfile.removeMenu("panelDownloadsContextMenu");
        },
        removeMenu3: function () {
            removeDownloadfile.currentPanel = "3";
            removeDownloadfile.removeMenu("downloadsContextMenu");
        },
        inited1:false,
        init1: function () {
                if(removeDownloadfile.inited1)return;
                removeDownloadfile.inited1 = true;
            document.querySelector("#downloadsContextMenu").addEventListener("popupshowing", this.removeMenu1, false);
        },
        inited2:false,
        init2: function () {
                if(removeDownloadfile.inited2)return;
                removeDownloadfile.inited2 = true;
            document.querySelector("#panelDownloadsContextMenu").addEventListener("popupshowing", this.removeMenu2, false);
        },
        inited3:false,
        init3: function () {
                if(removeDownloadfile.inited3)return;
                removeDownloadfile.inited3 = true;
            document.querySelector("#downloadsContextMenu").addEventListener("popupshowing", this.removeMenu3, false);
        },
        init:function () {
            if (location != "chrome://browser/content/places/places.xul") {
                   
                DownloadsPanel._openPopupIfDataReadyOrg = DownloadsPanel._openPopupIfDataReady;
                DownloadsPanel._openPopupIfDataReady = function(){
                    DownloadsPanel._openPopupIfDataReadyOrg();
                    removeDownloadfile.init1();
                }
                   
                var times = 0;
                function checkStatus() {//等待列表弹出
                    let pnl = document.querySelector("#panelDownloadsContextMenu");
                    if (pnl && pnl.querySelector('.downloadRemoveFromHistoryMenuItem')) {
                        removeDownloadfile.init2()
                    } else {
                        times++;
                        if (times > 5) {
                            times = 0;
                            return;
                        }
                        setTimeout(checkStatus, 1000);
                    }
                }
   
                                DownloadsSubview.showOrg = DownloadsSubview.show;
                DownloadsSubview.show = async function show(anchor) {
                    DownloadsSubview.showOrg(anchor);
                    setTimeout(checkStatus, 1000);
                };
   
            } else {
                //我的足迹下载项列表
                removeDownloadfile.init3();
            }
        }
    }
   
    removeDownloadfile.init();
    window.removeDownloadfile = removeDownloadfile;
    }
   
    //精确显示文件大小
    function downloadFileSize() {
        location.href.startsWith('chrome://browser/content/browser.x') && (DownloadUtils.convertByteUnits =
            function DU_convertByteUnits(aBytes) {
                let unitIndex = 0;
                while ((aBytes >= 999.5) && (unitIndex < 3)) {
                    aBytes /= 1024;
                    unitIndex++;
                }
                return [(aBytes > 0) && (aBytes < 100) && (unitIndex != 0) ? (aBytes < 10 ? (parseInt(aBytes * 100) / 100).toFixed(2) : (parseInt(aBytes * 10) / 10).toFixed(1)) : parseInt(aBytes), ['bytes', 'KB', 'MB', 'GB'][unitIndex]];
            });
    }
   
    // 自动关闭下载产生的空白标签
    function autoClose_blankTab() {
        gBrowser.addTabsProgressListener({
            onStateChange (aBrowser, aWebProgress, aRequest, aStateFlags, aStatus) {
                if (!aRequest || !aWebProgress.isTopLevel) return;
                let location;
                try {
                    aRequest.QueryInterface(Ci.nsIChannel);
                    location = aRequest.URI;
                } catch (ex) {}
                if ((aStateFlags & Ci.nsIWebProgressListener.STATE_STOP) &&
                    (aStateFlags & Ci.nsIWebProgressListener.STATE_IS_NETWORK) &&
                    location && location.spec !== 'about:blank' &&
                    aBrowser.documentURI && aBrowser.documentURI.spec === 'about:blank' &&
                    Components.isSuccessCode(aStatus) && !aWebProgress.isLoadingDocument
                ) {
                    gBrowser.removeTab(gBrowser.getTabForBrowser(aBrowser));
                }
            }
        });
    }
   
    // 保存并打开
    function save_And_Open() {
            var saveAndOpen = document.documentElement.getButton("extra2");
            saveAndOpen.parentNode.insertBefore(saveAndOpen, document.documentElement.getButton("accept").nextSibling);
            saveAndOpen.setAttribute("hidden", "false");
            saveAndOpen.setAttribute("label", "\u4FDD\u5B58\u5E76\u6253\u5F00");
            saveAndOpen.addEventListener("command", () => {
                Services.wm.getMostRecentWindow("navigator:browser").saveAndOpen.urls.push(dialog.mLauncher.source.asciiSpec);
                document.querySelector("#save").click();
                document.documentElement.getButton("accept").disabled=0;
                document.documentElement.getButton("accept").click()
            });
        }
        //作用于 main 窗口
    function saveAndOpen_on_main() {
        Components.utils.import("resource://gre/modules/Downloads.jsm");
        saveAndOpen = {
            urls: [],
            init: function() {
                Downloads.getList(Downloads.ALL).then(list => {
                    list.addView({
                        onDownloadChanged: function(dl) {
                            if(dl.progress != 100) return;
                            const index = saveAndOpen.urls.indexOf(dl.source.url);
                            if (Convert) {
                                if (index > -1) {
                                    dl.launch();
                                    saveAndOpen.urls.splice(index, 1);
                                }
                            } else {
                                if (index > -1) {
                                    (new FileUtils.File(dl.target.path)).launch();
                                    saveAndOpen.urls.splice(index, 1);
                                }
                            }
                        },
                        onDownloadAdded: function() {},
                        onDownloadRemoved: function() {},
                    });
                }).then(null, Cu.reportError);
            }
   
        }
        saveAndOpen.init();
    }
   
    // 下载改名
    function download_dialog_changeName() {
            //注:同时关闭改名和下拉菜单会导致下载文件的文件名不显示(非要关闭请默认在28行最前面加//来注释掉该功能)
            if (location != "chrome://mozapps/content/downloads/unknownContentType.xul") return;
            document.querySelector("#mode").addEventListener("select", function() {
                if (dialog.dialogElement("save").selected) {
                    if (!document.querySelector("#locationtext")) {
                        if (rename || encodingConvert) {
                            var orginalString = "";
                            if (encodingConvert) {
                                try {
                                    orginalString = (opener.localStorage.getItem(dialog.mLauncher.source.spec) ||
                                        dialog.mLauncher.source.asciiSpec.substring(dialog.mLauncher.source.asciiSpec.lastIndexOf("/"))).replace(/[\/:*?"<>|]/g, "");
                                    opener.localStorage.removeItem(dialog.mLauncher.source.spec)
                                } catch (e) {
                                    orginalString = dialog.mLauncher.suggestedFileName;
                                }
                            }
                            var location = document.querySelector("#location"), locationtext;
                            if (encodingConvert)
                                locationtext = document.createXULElement("menulist");
                            else
                                locationtext = document.createXULElement("textbox");
                            locationtext.id = "locationtext";
                            if (rename && encodingConvert)
                                locationtext.setAttribute("editable", "true");
                            locationtext.setAttribute("style", "margin-top:-2px;margin-bottom:-3px");
                            locationtext.setAttribute("tooltiptext", "Ctrl+\u70B9\u51FB\u8F6C\u6362url\u7F16\u7801\n\u5DE6\u952E\u003AUNICODE\n\u53F3\u952E\u003AGB2312");
                            locationtext.addEventListener("click", function(e) {
                                if (e.ctrlKey) {
                                    if (e.button == 0)
                                        this.value = decodeURIComponent(this.value);
                                    if (e.button == 2) {
                                        e.preventDefault();
                                        converter.charset = "GB2312";
                                        this.value = converter.ConvertToUnicode(unescape(this.value));
                                    }
                                }
                            }, false);
                            if (rename)
                                locationtext.value = dialog.mLauncher.suggestedFileName;
                            if (encodingConvert) {
                                locationtext.addEventListener("command", function(e) {
                                    if (rename)
                                        locationtext.value = e.target.value;
                                    document.title = "Opening " + e.target.value;
                                });
                                let menupopup = locationtext.appendChild(document.createXULElement("menupopup"));
                                let menuitem = menupopup.appendChild(document.createXULElement("menuitem"));
                                menuitem.value = dialog.mLauncher.suggestedFileName;
                                menuitem.label = "Original: " + menuitem.value;
                                if (!rename)
                                    locationtext.value = menuitem.value;
                                let converter = Components.classes['@mozilla.org/intl/scriptableunicodeconverter']
                                    .getService(Components.interfaces.nsIScriptableUnicodeConverter);
   
                                function createMenuitem(encoding) {
                                        converter.charset = encoding;
                                        let menuitem = menupopup.appendChild(document.createXULElement("menuitem"));
                                        menuitem.value = converter.ConvertToUnicode(orginalString).replace(/^"(.+)"$/, "$1");
                                        menuitem.label = encoding + ": " + menuitem.value;
                                    }
                                    ["GB18030", "BIG5", "Shift-JIS"].forEach(function(item) {
                                        createMenuitem(item)
                                    });
                            }
                            location.parentNode.insertBefore(locationtext, location);
                        }
                    }
                    document.querySelector("#location").hidden = true;
                    document.querySelector("#locationtext").hidden = false;
                } else {
                    document.querySelector("#locationtext").hidden = true;
                    document.querySelector("#location").hidden = false;
                }
            }, false)
            if (locking)
                dialog.dialogElement("save").click();
            else
                dialog.dialogElement("save").selected && dialog.dialogElement("save").click();
            window.addEventListener("dialogaccept", function() {
                if ((document.querySelector("#locationtext").value != dialog.mLauncher.suggestedFileName) && dialog.dialogElement("save").selected) {
                    var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
                    mainwin.eval("(" + mainwin.internalSave.toString().replace("let ", "").replace("var fpParams", "fileInfo.fileExt=null;fileInfo.fileName=aDefaultFileName;var fpParams") + ")")(dialog.mLauncher.source.asciiSpec, null, document.querySelector("#locationtext").value, null, null, false, null, null, referrer, null, false, null, mainwin.PrivateBrowsingUtils.isBrowserPrivate(mainwin.gBrowser.selectedBrowser, Services.scriptSecurityManager.getSystemPrincipal()));
                    document.documentElement.removeAttribute("ondialogaccept");
                }
            }, false);
        }
        //作用于 main 窗口
    function download_dialog_changeName_on_main() {
        const obsService = Cc['@mozilla.org/observer-service;1'].getService(Ci.nsIObserverService);
        const RESPONSE_TOPIC = 'http-on-examine-response';
   
        var respObserver = {
            observing: false,
            observe: function(subject, topic, data) {
                try {
                    let channel = subject.QueryInterface(Ci.nsIHttpChannel);
                    let header = channel.contentDispositionHeader;
                    let associatedWindow = channel.notificationCallbacks
                        .getInterface(Components.interfaces.nsILoadContext)
                        .associatedWindow;
                    associatedWindow.localStorage.setItem(channel.URI.spec, header.split("=")[1]);
                } catch (ex) {};
            },
            start: function() {
                if (!this.observing) {
                    obsService.addObserver(this, RESPONSE_TOPIC, false);
                    this.observing = true;
                }
            },
            stop: function() {
                if (this.observing) {
                    obsService.removeObserver(this, RESPONSE_TOPIC, false);
                    this.observing = false;
                }
            }
        };
   
        respObserver.start();
        addEventListener("beforeunload", function() {
            respObserver.stop();
        })
    }
   
   
    // 另存为...
    function download_dialog_saveas() {
        var saveas = document.documentElement.getButton("extra1");
            saveas.setAttribute("hidden", "false");
            saveas.setAttribute("label", "\u53E6\u5B58\u4E3A");
            saveas.addEventListener("command", function() {
                var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
                mainwin.eval("(" + mainwin.internalSave.toString().replace("let ", "").replace("var fpParams", "fileInfo.fileExt=null;fileInfo.fileName=aDefaultFileName;var fpParams") + ")")(dialog.mLauncher.source.asciiSpec, null, (document.querySelector("#locationtext") ? document.querySelector("#locationtext").value : dialog.mLauncher.suggestedFileName), null, null, null, null, null, null, mainwin.document, 0, null);
                close();
            }, false);
    }
   
    // 保存到...
    function download_dialog_saveTo() {
        //目录路径的反斜杠\要双写\\
        //第一次使用要修改路径，否则无法下载
        //如果使用Firefox3.6 + userChromeJS v1.2,则路径中的汉字要转义为\u6C49\u5B57编码类型,否则会出现乱码
        var cssStr = (function() {/*
            button[label="\4FDD\5B58\5230"] .box-inherit.button-box{
                position: relative;
            }
            button[label="\4FDD\5B58\5230"] dropmarker{
                position: absolute;
                top: 0px;
                right: 2px;
            }
        */}).toString().replace(/^.+\s|.+$/g, "");
        var shadowRoot = document.documentElement.shadowRoot;
        if(shadowRoot){
            var style = document.createElementNS('http://www.w3.org/1999/xhtml', 'html:style');
            style.textContent = cssStr;
            shadowRoot.insertBefore(style,shadowRoot.firstChild);
        }else{
            var style = document.createProcessingInstruction("xml-stylesheet", "type=\"text/css\"" + " href=\"data:text/css;base64," + btoa(cssStr) + "\"");
            document.insertBefore(style, document.firstChild);
        }
        var dir = [
            //["D:\\下载", "压缩"],
            //["D:\\软件", "软件"],
            //["D:\\文档", "文档"],
            //["D:\\音乐", "歌曲"],
            //["D:\\下载", "其他"],
        ["C:\\", "C盘"],
        ["D:\\", "D盘"],
        ["E:\\", "E盘"],
        ["F:\\", "F盘"]
        ];
        var saveTo = document.documentElement._buttons.cancel.parentNode.insertBefore(document.createXULElement("button"), document.documentElement._buttons.cancel);
        var saveToMenu = saveTo.appendChild(document.createXULElement("menupopup"));
        saveTo.classList.toggle("dialog-button");
        saveTo.label = "\u4FDD\u5B58\u5230";
        saveTo.type = "menu";
        saveTo.querySelector('.box-inherit.button-box').appendChild(document.createXULElement('dropmarker'));
        dir.forEach(function(dir) {
            var [name, dir] = [dir[1], dir[0]];
            var item = saveToMenu.appendChild(document.createXULElement("menuitem"));
            item.setAttribute("label", (name || (dir.match(/[^\\/]+$/) || [dir])[0]));
            item.setAttribute("image", "moz-icon:file:///" + dir + "\\");
            item.setAttribute("class", "menuitem-iconic");
            item.onclick = function() {
                var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);
                file.initWithPath(dir.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path) + "\\" + (document.querySelector("#locationtext") ? document.querySelector("#locationtext").value : document.querySelector("#location").value));
                dialog.mLauncher.saveToDisk(file, 1);
                dialog.onCancel = function() {};
                close();
            };
        })
    }
   
    // 下载弹出窗口双击链接复制完整链接
    function download_dialog_showCompleteURL() {
        var s = document.querySelector("#source");
        s.value = dialog.mLauncher.source.spec;
        s.setAttribute("crop", "center");
        s.setAttribute("tooltiptext", dialog.mLauncher.source.spec);
        s.setAttribute("ondblclick", 'Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(dialog.mLauncher.source.spec)')
    }
   
    // 下载弹出窗口双击保存文件项执行下载
    function download_dialog_doubleclicksaveL() {
        addEventListener("dblclick", function(event) {
            event.target.nodeName === "radio" && document.documentElement.getButton("accept").click()
        }, false)
    }
   
    function download_speed() {
        var appVersion = Services.appinfo.version.split(".")[0];
        if (appVersion >= 38 && DownloadsViewItem.prototype._updateProgress) {
            eval("DownloadsViewItem.prototype._updateProgress = " +
                DownloadsViewItem.prototype._updateProgress.toString().replace('status.text', 'status.tip'));
        } else if (appVersion < 38 && DownloadsViewItem.prototype._updateStatusLine) {
            eval("DownloadsViewItem.prototype._updateStatusLine = " +
                DownloadsViewItem.prototype._updateStatusLine.toString().replace('[statusTip', '[status'));
        }
    }
})();