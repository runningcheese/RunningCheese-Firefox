// ==UserScript==
// @name          QuickOpen.uc.js
// @description   QuickOpen 快速打开指定选项
// @author         Runningcheese
// @namespace   https://www.runningcheese.com
// @include        main
// @license         MIT License
// @compatibility  Firefox 57+
// @charset        UTF-8
// @version        v2018.04.11 
// @update        v2018-03-18 fix for 57+
// @version        v2017.04.02 
// @version        v2017.02.05 
// @version        v2016.01.05 
// @homepage    https://www.runningcheese.com/firefox-v10
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
    id: 'QuickOpen',
    defaultArea: CustomizableUI.AREA_NAVBAR,
    label: '快捷工具',
    tooltiptext: '快速打开指定选项',
    onCreated: function(aNode) {
    aNode.setAttribute('type', 'menu');    
        
 //定义菜单      
        var myMenuJson = 
                                ['xul:menupopup', {id: 'QuickOpen_pop', position:'after_end'},
                                ['xul:menuitem', {label: '我的电脑',oncommand: 'QuickOpenMyComputer();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAApElEQVQ4jcWTIQ7CYAyF/0vgOQH6T/p9DskNCJ5wAySWC3CDSSQnwHCB+XkQc7ghRlAbWcIymlS99jXt60tpilBnagCbiDgAhXoDHp+inPMcWEbEVj0C55RSAmq16csEXNRnJ9hO721Wm6SWveAkBED1X4IxNL7/ukKvzkNV6PyBSQm+XngIwQJYATtbDxTAFahGkTHnPFcjItYRsVdPb/+UQP0CUEY7Z3H6hLEAAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: '管理书签',oncommand: "PlacesCommandHook.showPlacesOrganizer('AllBookmarks');", class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAATElEQVQ4jWNgGGzgPxZMkmZSxAnaTAzGsOEomoKjxLj6P5oAKWEwXA04ysDAYMWACFCSDJjFwMDADmWzQ/kkGUAqoI4BMAbZKZEiAAA7FFJDJW1v5AAAAABJRU5ErkJggg=='}],                                
                                 ['xul:menu', {label:'常用功能' ,class:'menu-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAzUlEQVQ4jaXSIU7EQBSA4S8j+sIFVpD0HIi9wC6CM+0FMFUILA7DDRAIVB0KheoFMKuK2OlmSLZTGl4ymWTe+/95M3lUIqV0SCkdajVVuGmaD/SrJQW8yWtRsouIISLGiBgLeIoN+ikfEQN252w+2K5ocpuZs2CcKbxChx53ZeIXUxF0OOIFDW7XCnq84QnPeF8jaDFkyWvupPuroMUnvgrJvdOfLAomeMh7e+ltNcEjvmvwkuAGD7iegy8J/jdI2JejvLScPne/4sL5+AHddkk+mzKKaQAAAABJRU5ErkJggg=='},
                               ['xul:menupopup', {},
                               ['xul:menuitem', {label: '打开文件',oncommand: 'BrowserOpenFileWindow();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiUlEQVQ4ja3SsQ2AIBCF4b92CHqnYBx2oHECF9LCWXQGem3ORPHAI/qSyxnEjwsRfooHdqW8FdA2n6gZ6AvrpfL5Rg0o5TFd7aRa3QDzhZUmuMYBE5CkOwWpAjMQgU760gok+Rjp6csEE7C1Ak6QBKzyfmwB8owK8gCCAYnyHHJgoP0nGl4OtOUAFiVQKeOOdswAAAAASUVORK5CYII='}],
															['xul:menuitem', {label: '清理痕迹',oncommand: 'Cc["@mozilla.org/browser/browserglue;1"].getService(Ci.nsIBrowserGlue).sanitize(window);',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAb1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABt6r1GAAAAJHRSTlMAzVQUwp9BDPLTp3dwPDUsGPvn39vHtauPh35sZlxMJB736yg/5R5gAAAAhklEQVQY01WPVxLDMAhEJatb1b07TsL9z5goGmckPoB5DAuL7InKoE1VAkLBlESMsKKD8QzVMDagLpITaB3u/mIPCdJRExg+Eqjgyac1Tli/RRDaap5jcxIv02k9/WoY6J6WNPsmvyGLb92BI4H2HrsbvJWovegyF2a5XrhwpTS2hSW+pNc/dQcGVNn7bGYAAAAASUVORK5CYII='}], 
                               ['xul:menuitem', {label: '隐私浏览',oncommand: 'OpenBrowserWindow({private: true});',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4je3RIUzDQBjF8V9CMotEoTCYufopBBqLx1ZOYiZn0JVIVC0WXTuJm6mqmpmY6Dt2CYIESXjJ9a7/vn7fvTv+hJ6wRocPTNhnfg+fcMCA1/gfsIIjtmgLiC5SfIPrsCZsiz6F58cvNcInbgJKhBHPlXEd3xgPLLGTnPeBh2T7qh7tMz/GI76+VH+p4JBd1NHK+1A16Mzn5iod7n4KXGmVfy4LaALawAVus7s260W+tYn3reHS+Wom8wF1Gbtkn/AW77+iE6SaONczlmqVAAAAAElFTkSuQmCC'}],
                               ['xul:menuitem', {label: '历史记录',oncommand: 'PlacesCommandHook.showPlacesOrganizer("History");',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2UlEQVQ4jbXTLVYDMRQF4E9VdANdQA1mXN0sg0VgkcgxyJpqloDCsodYJA5ThRqDQORNG6bJ8HMO95yIebm5k3vfC/+ADe6RMMZKGGJvEdc44oAe61h91I7BaR5+wy6+E65mnC44FyKbUO+K2hNuKj/qgvvFzoD9jHiHh8Zt93JOJyTZZ4kerw2BPs6cMGI1I62ivq0ITHuLAmRrI55x65zRGu8lsWZhwlYO87G49oWFQe7zT3EwC7HWxhaqbeQ8SEsizUEqRf48yhOmx/SCDzntFLVvH9Ov8QntGzLFRkqKRgAAAABJRU5ErkJggg=='}], 
                               ['xul:menuitem', {label: '登录信息',oncommand: 'var x = gBrowser.mCurrentTab._tPos + 1; gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTab("chrome://passwordmgr/content/passwordManager.xul"), x); ',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA4ElEQVQ4jb3TLW4DMRAF4A9UYTlAQG5QWlZeKYco3b1F2bLCReXZA5TkICHLlhT0Bsta4LFiR1ZUVWqfZI3nz54ZP/NHeMSED6whp7DfxB1GLOixxyZkH/Yx4pp4wwlb7GK/htyF/RRxzbKXCIJ3DKEPkSj0pdXOEV2hr8Vhm9AzemkmFT6lXjPOeCqqmwvfXhpsha+4KeMQhw4hD4XvuqJmBeLWZ6nnEs0KJvUM7ovEGQ+FrzmD61d4wWvsh1jceAUSSTIPztJc8ppdeDC2kqmZ2KmZ2PkBE8t2fvUX/h/fXwk8p3xlsGQAAAAASUVORK5CYII='}],  
                                ['xul:menuitem', {label: '故障排除',oncommand: 'var x = gBrowser.mCurrentTab._tPos + 1; gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTab("about:support"), x); ',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsUlEQVQ4jbXSIQ4CQQyF4S9ZNwaJ4hZ4FII74LEruQASg0buCbDY1XsFDoBCIUFsSUYAu7DwkknaTPu3My0/1gh7NKhRIn0K2eCMJQ4B6oSkqJZDmrCr8N9qgVsWmHANe4pTF2CJY1StsMuSRrh0AR5VxljHWcXdrE8HooNnb03aj9x3AcYR2GAbCVUAekNgrp3IKgDHbyAPFf+EbIdAJnqM9hWkzmAfq9AuXaldsOG6A+IHLLa/+ULtAAAAAElFTkSuQmCC'}],           
                               ['xul:menuitem', {label: 'Cookies',oncommand: 'window.openDialog("chrome://browser/content/preferences/cookies.xul");',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWNgoDaQlZU9LCcn9x8XlpWVPYzXAKhCGxxyNnJycv8xJGRkZB7isxUXlpGReYhhOzHexKmOqgbAnIdOE20AjI1OjxpAggEUxwI+QDsDCOVEJHwEpgcAQdpq5UW7wZYAAAAASUVORK5CYII='}],
                               ['xul:menuitem', {label: '关于火狐',oncommand: 'openAboutDialog();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABA0lEQVQ4ja2TMW7CQBBFXSUFLlnW2tn3jxAoKHwPciIiUQeuFOoIyBHoDF1SOGlI4ySWsbFkZcrZ/W/2z84kyX9HCGEMrICDpFJSCeyAZQhhfFMcY1wAhaS1meXOudQ5l5pZLmkNnGKMi1vio5nNugqY2Qw4XkGyLHPAqSmWtAVeGpApUHjvJ79JYClp06woaStp25LfAKs6YGdmedfTW6zkwKFOLJMkuWupdJF0aWHcS/ocDHDOpcB7r4UuQGVhXwd0NbEVUM3EXxO99xOgMLNpHyDG+HD1jdXB8EGqXXgEzjHGZ2DuvR9570fAvMqdO8U/UVumN0lfwIekV+Cpd5mGxDdxo1Tjgl/dlwAAAABJRU5ErkJggg=='}],
                               ]
                               ],
                               ['xul:menu', {label:'系统工具' ,class:'menu-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABM0lEQVQ4jaWSMUvDUBDH/17lndKIvCpNwFTB0qTUtghNFpMOgsTuDgEnB+nYyQ/QDyEurg79EqKLo906+QE6uLvGoWnM0/pK6R9uuHf3/73jOEAjIhoS0VDXozcLngAYrwzJmctpLIX0hBBTZk6YOcmZ5yoDGM/rQogpgF5WTR+CFYYMUs9MzJwoZWk9kOAJtow3hFcXiwiKR0nqZxGAJItKowvb6WOndAfHj7F3cKMH2E4fhhyBt19Qsp7RjooKcHf/VQ8wq01Yxz7MahPtqIjT80ABzPJ/AK7nAvjKml3PRSuUcD0XlUYXh/WOfgeGHP38tvGJVihJ8ATSfIIh73F0cqsH2LUB7NoAVHiE48dw/FgZP12gfgd5dS6vQZvvoMJHOh0t9Kx9SPh1ysvizymvo2/tuWGnVFMwTgAAAABJRU5ErkJggg=='},
                                ['xul:menupopup', {},
                                ['xul:menuitem', {label: '音量控制',oncommand: 'QuickOpenVolume();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWUlEQVQ4jWNgoCFQZmBg+E+pZlwG4DUcJolNEbLByoQ0MyAZgFfjfzSsjCbHgEUcwwBy5EgyAN2VKAGMbAC6M4l2AUVhgAzIigV8hpCcDrApxCdPlEsGOQAAKY8zgtP7s6EAAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: '搜索文件',oncommand: 'EverythingSearch();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4jcXSv0qdQRCG8d9JUmghpBC2sNAIEqshl5D6kE7bkC5WFoJg5zVoAmntRbDJn5sIBEcQAhpIkcDBwkqMGNBmj24+j8Qm5IVlmZnnnZ2B5X+r1wYR8RSf8OQO/hv6mfl1mHjQAdY65kusY6XGs5W5PUFEPMZPjNfUL7zEexw0jc8wlZkn3QleNWZ4kZk7mMJekx+vLHhYX+9hC5MNOFFK+ZyZR6WU49aEmVLKu8FgcD3Bc8z7U8/wIyIW8aFTm6+e6wav3dYmVrGNsRH1JXhUg/4IYGNErlW/bfAbM5n5/S8mEBHT+MLNCvu4qMXL7t2eyp8jqf8gIt7iEG8ycwjd9XoPy5jLzOXhCrv4iI2IuM8Wp1i4D/jvdQWgm0n7Gn2U7gAAAABJRU5ErkJggg=='}],
                                //['xul:menuitem', {label: '记事本',oncommand: 'QuickOpenNotedpad();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAANUlEQVQ4jWNgoCL4TwA3EGMAPrnrhAwhZIA4IUMIGcBAyBBCBqBjkgwgSu2oAcPGAFIwdQAA7bk0hAgVKwIAAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: '计算器',oncommand: 'QuickOpenCALC();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAATklEQVQ4jWNgoCJYw8DA8J8IvAaXAf8ZGBhYCVjCClWH0wAYjQsjq8NrADny1HMBIUCUAbjYJBmA7iWSDMAHhrsXmAloZsZnAMWZiSwAAJGrSHtJfnvHAAAAAElFTkSuQmCC'}],
                                //['xul:menuitem', {label: '命令行',oncommand: 'QuickOpenCMD();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAATklEQVQ4jWNgoBL4TwGGG0CuxbQxQI4SAxQZGBheMzAw2FHiAjuoIWHkGsDAwMCQBxXH5xLauECBATMMMOKdkAsoigVSwCAzgKLMRDYAAKIZQECvdVKSAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '放大镜',oncommand: 'QuickOpenMagnify();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdklEQVQ4jc2SsQ3AIAwEbwGK1NmFDdIwE3OxCCOkZYAU+RSRMEFyIuUkN7Z5vwH4IxtQgKYoyk2RgQokICiScnlmcgWWTm1RbeikaJpFUo9J47RsEdTznYB7BfclwvgZGxCfBC4nvY8UgX1WxOJVkdUj4jp84wDU6yD4kZGU+wAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '屏幕键盘',oncommand: 'QuickOpenOSK();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAAAAAAAAAACDY+nAAAAAAnRSTlMAxOqay5EAAAAiSURBVAjXY0ADUqtWrWRQYGBgYlACAgyW1ioIC0xAFKMCABYYBwHv+ZZuAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: 'IE浏览器',oncommand: 'QuickOpenIE();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABEElEQVQ4jZXSnVuDYRQG8B8EQTAIgkEQBMEgDIIwGA4Hg0EYBMH+gyAIh0EwHIRBEARBEAzDwWAweIP3bD17rmd9nOu64X3ec9/3+eJ/cYpL9DHAwabEHZyjG7jAbQik0SsRHzBHlWGBYebaSclNvEfyFK8FkQoznCSGqxhGwmP0t9ggsBTZS8n7QbjHVSQ9oRUu3UJbN6lAB2O0E+d+CC/xnAnMU4F2uM1+KLuEtRmMs5+fmPyCZlpBrn5mPY7Ud5BiFXl/FUZoJOS8vdGS3PC9+1xkirfC+yJmhnoDFQ7Vq/vL8Ppp+YMYCPVUr+O7RPyQna9Qm2RvLfWh9MKgi2Ns5WTYxot6bXfhsFtKLMUX/+qC1cGn0mkAAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: '关联IDM',oncommand: 'SetIDM();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlUlEQVQ4jWNgoAJYzsDAcB8H/o1Hbj/MgP9E0q/RaJg4w38i8Gso/R6Nz8DAwMCwnoGBQQEHtsEjNxlmwHEGBoYEHHg2HrnNMAPmM5AHGogxQANZITkGMDBAAuw01DCyDNjMAAnx7wwMDA7kGFADNeA6uS7QgOLzUMNINgDZoBxKDEAHcAM2M0AyBjb8Ho/cYTItRgUAX/dLM5/IfscAAAAASUVORK5CYII='}],
                               ['xul:menuitem', {label: '关联记事本',oncommand: 'SetNotepad2();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAANUlEQVQ4jWNgoCL4TwA3EGMAPrnrhAwhZIA4IUMIGcBAyBBCBqBjkgwgSu2oAcPGAFIwdQAA7bk0hAgVKwIAAAAASUVORK5CYII='}],
                               ]
                               ],
							    ['xul:menu', {label:'网络连接' ,class:'menu-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABYUlEQVQ4ja2SL28CQRDFf7ebzKWChKQJokmTGgwCgUHQoFtT06TmHKKSBEWCQuEwKASCD4BBkCD6AapQoFCnTqAqcRU8YPlX1ZdcsjN7783M24FL3AM9M1uZ2dbMtsA30AFyV/4/wUccxxnQB6rAHZD33jeApcRqt8hvQCqBuUgF59xYuTaQOOfGEj5BAcjMbAU8SWxuZtsoimZh6865LrDQqCfJoS5egXIcx5lzrivRIWBAW/FAvuT3GgvN9gIsgTWQ6C6n9lu6e1B+ou5A5uznWuvzwYhN5R4V1+VLLRTIAXUgBebARG1/npFrQAb0QhOXQBmYyn0DOjqnMhagqsodFTlgwO7ts2CUROSi4oqMHau7VihQBDYHU44LVVJcVtwDRsCG8BmFkWZ9PiOXFL+r+objC12gr3EGZ+TEe9/QuXmLDICqjLRcqcb6AaZA5U+y8BVF0UwCdXaLc7H7/4Zf1MVXuPDScn0AAAAASUVORK5CYII='},
                               ['xul:menupopup', {},
                                ['xul:menuitem', {label: 'IE属性设置',oncommand: 'QuickOpenInetcpl();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABYUlEQVQ4ja2SL28CQRDFf7ebzKWChKQJokmTGgwCgUHQoFtT06TmHKKSBEWCQuEwKASCD4BBkCD6AapQoFCnTqAqcRU8YPlX1ZdcsjN7783M24FL3AM9M1uZ2dbMtsA30AFyV/4/wUccxxnQB6rAHZD33jeApcRqt8hvQCqBuUgF59xYuTaQOOfGEj5BAcjMbAU8SWxuZtsoimZh6865LrDQqCfJoS5egXIcx5lzrivRIWBAW/FAvuT3GgvN9gIsgTWQ6C6n9lu6e1B+ou5A5uznWuvzwYhN5R4V1+VLLRTIAXUgBebARG1/npFrQAb0QhOXQBmYyn0DOjqnMhagqsodFTlgwO7ts2CUROSi4oqMHau7VihQBDYHU44LVVJcVtwDRsCG8BmFkWZ9PiOXFL+r+objC12gr3EGZ+TEe9/QuXmLDICqjLRcqcb6AaZA5U+y8BVF0UwCdXaLc7H7/4Zf1MVXuPDScn0AAAAASUVORK5CYII='}],
                               ['xul:menuitem', {label: 'Hosts更新',oncommand: 'HostsUpdate();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAC1JREFUCNdjAAL2BwwsCgysC4AkiM3YwMD/gYFDAITq6hicnBiiooAkkA1UCwC3Lwgg+P+xLwAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: 'Hosts编辑',oncommand: 'HostsEdit();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAACZJREFUCNdjAAL2BwwsChAEYjM2MPB/YOAQAKG6OgYnJwgCsoFqAaKRB28Dt45/AAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: 'Hosts位置',oncommand: 'HostsFolder();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAACZJREFUCNdjAAL2BwwsChAEYjM2MPB/YOAQAKG6OgYnJwgCsoFqAaKRB28Dt45/AAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: 'DNS设置',oncommand: 'SetDNS();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA50lEQVQ4jb3SPUpDURAF4A8bbdxC9mEX8WcBIkYQbN2D2UQsxdYNiCiCgRQK9pogYgpdwPMHC41NUry5ECSP3Nd4YODO3Htmzsxc/hFX+ML1dHChBvkWy+iF1cL7H39UR8E+FtEO/xB3uZUvMQ4FN/hGd9bDo3hUoIMDfAT5fF6VDi7QCDsLYoG9HJlFEBMaITULVUNcwinWpmLbuFduYIDddDGrhULZxhhDnOAFm8HZwCt2UpI0xLc4wwqO8RmJEjmhiX5Om/BTER/lfuWnCgXPuQq2lDNYDX89/FZuAsotPOAXj2ILE+UhOi1pfPDEAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: 'Socks5',oncommand: 'RunShadowsocks();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcqRVCAAAAGnRSTlMADemyrN/XxCUb8XhcUUc7zqSDcPe7jWc/NHRhkYYAAABzSURBVBjTfc5HDsQgDEBRF3ook2Sq73/Q8QJIsslfWPgJIeC23V5WNE8571/74jNstlA8IHiDZoEJmT5QHQzA9REAXB3Q7FvnYqDDRlVnpNjB63VNX+xQOHHGn4MOGmZO4lf2jgTHryXtpYUIM2lwDefpDwA9BCKhzLlxAAAAAElFTkSuQmCC'}],

                                //['xul:menuitem', {label: 'GoAgent',oncommand: 'RunGoAgent();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOl5NtAAAAHXRSTlMA2N3RUuv448C4lhgKbjYo8MrFnl1KQj4RpI2CIfUsPl0AAAB9SURBVBjTbc9HDsMwDAXRoaptyb2m3P+csRVLQIC8zQBc8ZNstUi1UjTaEI1+kEnJ7flzMKO6eHAiM3S+4ysMoFfqBYjH8d4rAVMhQOvsYO3YA4I+oxZuQWgasKF8NBP91lt4qZOIBvZJOxJP5mKKImtVGzBTTdFdaw1/fQAZaQO3wMgRRQAAAABJRU5ErkJggg=='}],
                                //['xul:menuitem', {label: 'Lantern',oncommand: 'RunLantern();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABIUlEQVQ4jZ2SvUrDYBiFn/O1FToIlkDRQcjcoUIXC15BZ8HFO+gl9B5cvA6nQrcOGToXCt5DhtIh0kWQ6NCjpklKxLO8nPP+ni+B0+iHEBbA3rFfVxTqxAhawDzP800PrvI83wBz682Q9Agkbrh2TKz/CUvgHkiALbAyXzZa8LaxaTuCS6BtPi7bqAzYwc0h8FaQP8x3ztdD0gRIJT0BZz7928KZpGfnJ3XND0AaQrgr2YmLZzufuv4ImaThyfOOlw2BrKx/FrZEwKiUH1mv1P8IEbQkzTj4ToGV/8LEfCtpZkvVAZLWboglDYA98OpzYyAOISwkresGvAPTAr/g8C4DIOvBeSE3df0vJN2WJ/pzZo6N9RV0oCvppQPdxuL/4gt7S0KmgzO/sgAAAABJRU5ErkJggg=='}],
                               ]
                               ],
																['xul:menu', {label:'自定义设置' ,class:'menu-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4ja3SPUpDQRAH8B9KJJAUKYR0KYw2Sho7sVDBE4iWaS2CnkAvkICdrU3AE9ioB/ADtLEQQaN9UFOoYBUtnKfmQUgEB5Z57/8xO7O7/FMsYGVI7Wroe+ISXZxjqY9xMfguLtLkGeaiiwec4AatyKeBr2A+/nuihdKQI5RwnwaeUBmywGzovzfcx1Z8F6JQBRMYj5xghdBthw+8oIg9dHAVq4XHyAnWCV0xfOANdRwgN6D9XOjqeEUe3mOmMkZxjEbK2MBR8GU8hw8/dzuCqWitnSrQDnwydMmbARv4wAzGcI1mqkAz8DFMh34zITO+Hs5hMtOAMzgMfeY3kcUObrGLGqpYi1wL/C502X475LEcpvVfqxr4oA7/Hp/fA0aywESMdQAAAABJRU5ErkJggg=='},
                               ['xul:menupopup', {},
                               ['xul:menuitem', {label: '菜单',oncommand:'addMenu.edit(addMenu.FILE); ',onclick:'if (event.button == 2) { if (event.button == 2) { event.preventDefault(); setTimeout(function(){ addMenu.rebuild(true); }, 10);}}',class:'menuitem-iconic', tooltiptext: 'addmenu.js\n左键：编辑配置\n右键：重载配置',image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEUAAADr6+v8/Pzh4eGSkpJVVVVERERBQUErKyscHBwWFhby8vLT09PPz8+2traxsbGhoaGgoKBtbW1ra2sLCwsKCgqT8ZvFAAAAAXRSTlMAQObYZgAAAD9JREFUGNPFzTcSwCAQxVAtGZzT/a/q8o/H9Kh5pejl/UdLrWWTxNO5K0qeCeyW1BmWKgllW0uQcOS0yzHbfy87/AR9dbQdjwAAAABJRU5ErkJggg=='}],
                               ['xul:menuitem', {label: '快捷键',oncommand:'KeyChanger.edit(KeyChanger.file);',onclick:'if (event.button == 2) { event.preventDefault(); setTimeout(function(){ KeyChanger.makeKeyset(true); }, 10);}',class:'menuitem-iconic', tooltiptext: 'keychanger.js\n左键：编辑配置\n右键：重载配置',image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAAAAAAAAAACDY+nAAAAAAnRSTlMAxOqay5EAAAAiSURBVAjXY0ADUqtWrWRQYGBgYlACAgyW1ioIC0xAFKMCABYYBwHv+ZZuAAAAAElFTkSuQmCC'}],
                               ['xul:menuitem', {label: '标签页',oncommand:'Tabplusjs();',class:'menuitem-iconic', tooltiptext: 'Tabplus.uc.js\n左键：编辑配置',image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAVElEQVQ4jc2Ruw0AIAgFr3IFJ3YB13EkhtBGEiuCnxheQgE8DhIgihJQAQG6I2T6kwIq0IDsXJinv2hBNoZXiGjSDaOrFw9gfeDPBbEAlt4CTuNOA8bzPo9tYBnVAAAAAElFTkSuQmCC'}],
                               ['xul:menuitem', {label: '书签栏',oncommand:'window.open("about:config?filter=awesomebookmarkbar", "awesomebookmarkbar", "chrome,resizable=yes,centerscreen").resizeTo(800, 600);',class:'menuitem-iconic', tooltiptext: 'awesomebookmark.uc.js\n左键：编辑配置',image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVQ4jbWSrXLCUBCFkbt7vrwNAoGIQCAqKhCVkUgEohLfh6ngAZDIigpEHgAZgYhAFHNhUiYJJTPdmSvu7p7v7P0Zjf4zImJsZrPBAGAHlIPEZpYDFVBKKoa6byQVT01hZrmkd6BqwEpJH5LmrSJJW+AEnIGDpG1z7Ih4AT6Bb6BOa38DuPsUqCStHk3o7gugdvfFfWEKnPogneJ7SFuDu0+6ar8C2Lc1RcQYOPaKE+B2+2aWR8TrdZ9l2c9fAHVy2wFHoAS+0sc6uPukUyxpnp6ykrRu5IsEO0fEshNgZjNg02Owcve3h8d4Ji7kujf6l14J8wAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '鼠标手势',oncommand: 'MouseGesturesjs();',tooltiptext: 'MouseGestures.uc.js\n左键：编辑配置',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAkFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADDIYgjAAAAMHRSTlMA6kEK4JpdD/7v2su9q5Z5b05FJyAbFAP208K3r6SAZzsxBtbOxbmxpp6QhWJaWSwB0NSsAAAAm0lEQVQY00WOhw7DIAxEzcreTchuRvf+/7+rQYRY4ux7xtKBrqL3vTZ1wVSdBB9ZL4/gYMAzYgAhgMOl9jNXfz18r1GD/g0GMFKiuk04YUdLBc+w00s+EnLugiZMszuCb4xSzfTHcBnhnA9gq7iiLO0OJqFi+dKC2FEqjpuvfJ2+JFvkwawcrskquhUMIUleZKeYgT1Ob1FC9fgHj9IH8vwTbm8AAAAASUVORK5CYII='}],
                               ['xul:menuitem', {label: '偏好设置',oncommand: 'QuickOpenUserjs();',tooltiptext: 'user.js',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoCL4TwA3EGMAPrnrhAwhZIA4IUMIGcBAyJD/SDQyxiaG1TJ8LiBKLdUMIBSdtHcBxQbgczp9XECRAaRg6gAArMpGck8h/nAAAAAASUVORK5CYII='}],
                               ['xul:menuitem', {label: '高级设置',oncommand: 'var x = gBrowser.mCurrentTab._tPos + 1; gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTab("about:config"), x); ',tooltiptext: 'about:config',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHklEQVQ4jWNgGFbgPxQjs/FhvAYMUTAaBqNhQDYAAG8lJtrslB7sAAAAAElFTkSuQmCC'}],
                               ['xul:menuitem', {label: '所有设置',oncommand: 'var x = gBrowser.mCurrentTab._tPos + 1; gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTab("about:about"), x); ',tooltiptext: 'about:about',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHklEQVQ4jWNgGFbgPxQjs/FhvAYMUTAaBqNhQDYAAG8lJtrslB7sAAAAAElFTkSuQmCC'}],  
                               ['xul:menuitem', {label: '界面设置',oncommand: 'ChromeCSS(); ',tooltiptext: 'chrome.css',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAARklEQVQ4jWNgGCxgP5kYDv5D6fkMDAzdUPZhJDlcGMWA1QwMDNcZGBhOMzAwbGdgYHjOwMAwmxQDSAWjBgw/AxrIxIMAAADq9jfGHLxovAAAAABJRU5ErkJggg=='}],  
                               ]
                               ],
                                ['xul:menuitem', {label: '配置文件夹',tooltiptext: 'Profiles', oncommand: 'var canvas = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).launch();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '脚本文件夹',tooltiptext: 'Chrome', oncommand: 'var canvas = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsIFile).reveal();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg=='}],   
                                 //['xul:menuitem', {label: '火狐根目录', tooltiptext: 'Firefox', oncommand: 'QuickOpenApplication();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg=='}], 
                                  //['xul:menuseparator', {}],
																	//['xul:menuitem', {label: '重启浏览器',oncommand: 'Services.startup.quit(Services.startup.eAttemptQuit | Services.startup.eRestart);',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAq0lEQVQ4ja2SvQ3DIBCFv44qXXrXbrMDK2QFhqD2FhmAFbyD9/AILknBU2TH/FnJkxDScd9xBw/aGoFXR15RBlgA3wsMwCRo1T4BEbAt2AMb4FTIaPcq4FrwfIfbV3wU/KzBD2DLwAiswgCh1V5LkTTrTwXMhfzTSFc6GEhfe9BM/xs4ki8OspR/4SOdrxS6DeR9sIdnKpY2KpJzolP81HpOVjfF3Qoks/1fb/8xJcvKSjYUAAAAAElFTkSuQmCC'}],    
                        ]; 
						
        aNode.appendChild(jsonToDOM(myMenuJson, aNode.ownerDocument, {}));
        aNode.setAttribute('menupopup', 'QuickOpen_pop');
    }
});


//定义图标
var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#QuickOpen .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2UlEQVQ4jbWRIRKDMBREn8NhOoPrDLoqtifgAnG9AUfgAJU9SS2uAoOt6gWqIiqjqlrBMhNChoLozjA/2ewu/yfwRxRAC3jVYmtAD5yBXLXfYj4BndZ71U78KtwAK9NLf7fiV8HLMLY9Bvg1ZgM8gSoKqMSbJXMFOOACZDKOI2TinXQzWB0eI76M9kfpbBzgf7UXwJC4j0+w3iXCjPiUfkI0DHM7htlbhud04pulgLsMJXBQmw/VUl8r3SzgDdTBPpdxDMqDs1r6CeLbh+HZvOoa/QwZcFVN4gv6nzt18jn5zAAAAABJRU5ErkJggg==)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);




//定义函数
function	QuickOpenApplication() { var path ="..\\..\\..\\..\\";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));file.launch();};

function	QuickOpenUserjs() { FileUtils.getFile('ProfD',['user.js']).launch();};

function	MouseGesturesjs() { FileUtils.getFile('UChrm',['SubScript', 'MouseGestures.uc.js']).launch();};

function	Tabplusjs() { FileUtils.getFile('UChrm',['SubScript', 'Tabplus.uc.js']).launch();};

function	ChromeCSS() { FileUtils.getFile('UChrm',['css', 'chrome.css']).launch();};

function	EverythingSearch() { FileUtils.getFile('UChrm',['Local', 'Everything','Everything.exe']).launch();};

function	SetNotepad2() { FileUtils.getFile('UChrm',['Local', 'NotePad2','NotePad2.bat']).launch();};

function	SetIDM() { FileUtils.getFile('UChrm',['Local', 'IDM','!绿化.bat']).launch(); FileUtils.getFile('UChrm',['Local', 'IDM','ThunderCross_x86.exe']).launch();};

function	HostsUpdate() {FileUtils.getFile('UChrm',['Local', 'HostsUpdate.bat']).launch();};

function	HostsEdit() { FileUtils.getFile('UChrm',['Local', 'HostsEdit.bat']).launch();};

function	HostsFolder() {
var path ="..\\..\\System32\\drivers\\etc";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsIFile).path));file.launch();
 };

function	SetDNS() { FileUtils.getFile('UChrm',['Local', 'DnsJumper','DnsJumper.exe']).launch();};

function	RunLantern() { FileUtils.getFile('UChrm',['Local', 'Lantern','Lantern.exe']).launch();};

function	RunGoAgent() { FileUtils.getFile('UChrm',['Local', 'XX-Net','start.vbs']).launch();};

function	RunShadowsocks() { FileUtils.getFile('UChrm',['Local', 'Shadowsocks','ShadowsocksR.exe']).launch();};


 function QuickOpenMyComputer(event) {
				var path ="..\\..\\explorer.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsIFile).path));file.launch();
};


 function QuickOpenVolume(event) {
				var path ="..\\sndvol.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsIFile).path));file.launch();
};

 function QuickOpenTaskMGR(event) {
				var path ="..\\taskmgr.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsIFile).path));file.launch();
};


 function QuickOpenIE(event) {
				var path ="..\\..\\..\\Program Files\\Internet Explorer\\iexplore.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsIFile).path));file.launch();
};


 function QuickOpenNotedpad(event) {
				var path ="..\\notepad.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsIFile).path));file.launch();
};


 function QuickOpenInetcpl(event) {
				var path ="..\\inetcpl.cpl";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsIFile).path));file.launch();
};


 function QuickOpenCALC(event) {
				var path ="..\\calc.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsIFile).path));file.launch();
};


 function QuickOpenCMD(event) {
				var path ="..\\cmd.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsIFile).path));file.launch();
};


 function QuickOpenOSK(event) {
				var path ="..\\osk.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsIFile).path));file.launch();
};


 function QuickOpenMagnify(event) {
				var path ="..\\magnify.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsIFile).path));file.launch();
};


