
//http://bbs.kafan.cn/thread-1725944-1-1.html

(function() {
 
    var modifierKey = "alt";        // 组合键, 值可以是: "ctrl"、"alt"、"shift" 和 ""(不使用)
 
    function getEngine(code) {
        switch(String.fromCharCode(code).toLowerCase()) {
 
            // 在这里添加或者修改搜索引擎及其快捷键, 注意格式..
            case "b" : return {name:"百度",               url:"http://www.baidu.com/s?ie=utf-8&bs=a&f=8&rsv_bp=1&wd=" + placeholder};
            case "t" : return {name:"百度贴吧",         url:"http://tieba.baidu.com/f?kw=" + placeholder};
            case "z" : return {name:"百度知道",         url:"http://zhidao.baidu.com/search?word=" + placeholder};
            case "y" : return {name:"百度音乐",         url:"http://music.baidu.com/search?key=" + placeholder};
            case "g" : return {name:"谷歌",               url:"https://www.google.com/search?q=" + placeholder + "&ie=utf-8&client=firefox-a"};
            case "f" : return {name:"谷歌翻译(英->中)",    url:"http://translate.google.cn/#en/zh-CN/" + placeholder};
            case "i" : return {name:"Bing搜索",           url:"http://cn.bing.com/search?q=" + placeholder};
            case "k" : return {name:"TorrentKetty",     url:"http://torrentkitty.org/search/" + placeholder};
            case "s" : return {name:"第一会所资源",           url:"https://www.google.com/search?q=site:sis001.us " + placeholder + "&ie=utf-8&client=firefox-a"};        // 这个你懂的. 不懂的可以搜索试试, 比如: abs-110
 
            default  : return null;
        }
    }
 
/***************************************** 如果不了解的下面的代码, 最好不要改动 *******************************************/
 
    modifierKey = modifierKey? modifierKey+"Key": "";
    var placeholder  = "{placeholder}";
    var engine = null,
        keyword = "",
        url = "",
        tabPosition = 0;
 
    // 添加键盘事件监听
    document.addEventListener("keypress", function(event) {
        var targetName = event.target.nodeName;
        if (targetName==="INPUT" || targetName==="TEXTAREA" || targetName==="textbox") return;      // 快捷键在输入框或地址栏无效
 
        // 检测组合键
        if (modifierKey) {
            if (!event[modifierKey] || (event.altKey + event.shiftKey + event.ctrlKey) > 1) {
                return;
            }
        } else if (event.altKey || event.ctrlKey || event.shiftKey) {
            return;
        }
 
        engine = getEngine(event.charCode);
 
        if (engine) {
            // 输入框, 获取剪贴板内容为默认关键字
            keyword = prompt(engine.name, readFromClipboard());
 
            // 检测输入内容
            if (!keyword.trim()) {              // 如果是纯空格, 或者没有填写. 默认转到搜索引擎的主页
                url = engine.url.match(/.*\.(?:com|cn|net|org)/)[0]; 
            } else {
                url = encodeURI(engine.url.replace(placeholder, keyword));
            }
 
            tabPosition = gBrowser.mCurrentTab._tPos + 1;                                   // 在当前页面的右边打开标签
            gBrowser.moveTabTo(gBrowser.selectedTab = gBrowser.addTab(url), tabPosition);   // 并立即跳转到新标签
        }
    }, false);
})();