// ==UserScript==
// @name           moveButton.uc.js
// @description    移动或克隆按钮/菜单到任意位置
// @author         ywzhaiqi
// @namespace      ywzhaiqi@gmail.com
// @include        main
// @charset        UTF-8
// @version        0.0.2
// @note           2013/05/22 ver0.0.2，新增参数 clone: true（克隆按钮/菜单，原来的保留）
// @note           2013/05/21 初始版本
// ==/UserScript==

/*
功能：移动或克隆按钮/菜单到任意位置

建议只移动不可移动的按钮。如果移动后位置不正确可能用css固定了，如果移动后出现空白

填写的 buttons 说明

    id: 要移动的按钮/菜单的 Id

    示例1： 移动 "翻译按钮" 到 "scriptish按钮" 的前面
        { id: "translatorButton", insertBefore: "scriptish-button" },
    示例2： 移动 "翻译按钮" 到 "scriptish按钮" 的后面
        { id: "translatorButton", insertAfter: "scriptish-button" },
    示例3： 移动 "翻译按钮" 到 "附加组件栏" 的第一个位置
        { id: "translatorButton", bar: "addon-bar", pos: 1 }
    示例4：移动 "翻译按钮" 到 原来的第一个位置。（不推荐，建议用css调整）
        { id: "translatorButton", pos: 1 }
    示例5：移动 "工具菜单" 到 系统按钮弹出的菜单 "选项" 的下面。
        { id: "tools-menu", insertAfter: "appmenu_customize"}
    示例6：克隆 "工具菜单" 到 系统按钮弹出的菜单 "选项" 的下面。
        { id: "tools-menu", insertAfter: "appmenu_customize", clone: true }

    参考的工具栏或按钮的Id：
        nav-bar（导航工具栏）
            unified-back-forward-button（前进后退按钮）
            urlbar-container（整个地址栏）
                urlbar-icons（地址栏图标，如地址栏下拉按钮、刷新按钮等，uc脚本一般插入的位置）
            search-container（整个搜索栏）
            home-button（主页按钮）

        PersonalToolbar（书签栏）
            personal-bookmarks（书签栏中书签部分）
        addon-bar（附加组件栏）
            status-bar（状态栏，在附加组件栏中，按钮为不可移动）

    主要参考了 addMenu.uc.js 和 rebuild_userChrome.uc.xul
 */

(function(){

var moveButton = {
    buttons:[





    ],









    interval: 1, // 0.2秒间隔
    maxcount: 1, // 最大100回，至少 interval * maxcount 秒
    count: 0,
    timer: null,

    init: function(){
        this.run();
    },
    uninit: function(){

    },
    handleEvent: function(e){
        switch (e.type){
            case "beforecustomization":
                break;
            case "aftercustomization":
                break;
        }
    },
    run: function(){
        this.timer = setInterval(function(self) {
            if (++self.count > self.maxcount || self.move())
                clearInterval(self.timer);
        }, this.interval, this);
    },
    move: function(){
        var i = 0;
        while (i < this.buttons.length){
            var info = this.buttons[i];
            var button = $(info.id);
            if(button){
                button = (info.clone == true) ? button.cloneNode(true) : button;
                let ins;
                if (info.insertBefore && (ins = $(info.insertBefore))){
                    setTimeout(function(ins, button){
                        ins.parentNode.insertBefore(button, ins);
                    }, 100, ins, button);
                    this.buttons.splice(i, 1);
                    continue;
                }
                if (info.insertAfter && (ins = $(info.insertAfter))){
                    setTimeout(function(ins, button){
                        ins.parentNode.insertBefore(button, ins.nextSibling);
                    }, 100, ins, button);
                    this.buttons.splice(i, 1);
                    continue;
                }
                if (info.pos && (parseInt(info.pos, 10) > 0)){
                    let bar = $(info.bar);
                    setTimeout(function(ins, bar, button){
                        bar = bar || button.parentNode;
                        (ins = bar.children[parseInt(info.pos, 10) - 1]) ?
                            bar.insertBefore(button, ins) :
                            bar.appendChild(button);
                    }, 100, ins, bar, button);
                    this.buttons.splice(i, 1);
                    continue;
                }
            }
            i++;
        }
        return this.buttons.length == 0 ? true : false;
    }
};

moveButton.init();


function debug() { content.console.log(arguments); }
function $(id) { return document.getElementById(id); }
function $A(args) { return Array.prototype.slice(args); }

})();