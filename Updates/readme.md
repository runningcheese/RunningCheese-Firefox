### 自动更新功能说明
* Firefox 内核更新牵扯到的东西很多，很难做到自动更新，RC Firefox 会定期更新 Firefox 内核。
* 自动更新指的是配置的更新，点击“火箭图标—>更新修复—>自动更新” 就会自动更新。
* 如果你有自己的一些自定义修改，你可以使用“手动更新”选项下载更新包。
* 你可以把你自定义的内容用一个新的文件保存起来，或者记录一下修改的内容。


**自动更新文件:**
* Updates.zip：自动更新的文件打包
* UpdatesUnpackedFiles：Updates.zip 解压后的文件


-------------
### 10-23 更新说明
1、拓展和脚本惯例更新\
2、解决网易云音乐“我的音乐”404的问题\
3、重新换回书签自动居中的CSS样式\
4、更换百度网盘加速下载脚本

**修改内容：**\
\Profiles\V10\chrome\user.js\
\Profiles\V10\chrome\css\chrome.css\
\Profiles\V10\chrome\css\ButtonEventListener.uc.js

-------------
### 10-08 更新说明
1、内核更新至60.2.2 ESR，Flash更新到31.0\
2、解决无法设置为默认浏览器的问题\
3、解决视频播放黄条警告的问题\
4、解决腾讯视频，搜狐视频播放黑屏的问题\
5、解决直播视频网站无法正常播放的问题\
6、拓展和脚本惯例更新

**修改内容：**\
\Firefox 整个Firefox核心程序文件夹\
\Profiles\V10\chrome\user.js\
\Profiles\V10\chrome\css\chrome.css\


-------------
### 09-03 更新说明
1、优化了一些细节，修复了一些BUG。\
2、内核更新至60.2.0 ESR 长期支持版本\
3、修复”小书签栏“中失效了的小书签\
4、新增拓展 Listen 1，集成了“音乐播放器”中，搜索和播放音乐更加方便了\
5、拨号页拓展换用 InfinityTab，添加图标更加简单\
PS:（注意，InfinityTab 拓展默认自带的购物类网站都带有小尾巴，是拓展本身就自带有的，非本作者添加）。


**修改内容：**\
\Profiles\V10\chrome\SubScript\Tabplus.uc.js\
\Profiles\V10\chrome\SubScript\SidebarMod.uc.js\
\Profiles\V10\chrome\SubScript\SimpleMusicPlayer.uc.js\
\Profiles\V10\chrome\SubScript\ButtonEventListener.uc.js\
\Profiles\V10\chrome\css\chrome.css\
\Profiles\V10\chrome\Local\_addmenu.js\

**新增拓展：**\
InfinityTab
Listen 1 

**删除拓展：**\
Speed Dail 2 




-------------
### 07-19 更新说明
1、修正复制所有标签标题和地址的Bug\
2、修改了一些设置\
3、样式管理器弃用Stylish，换用Xstyle\
4、删除拓展 Video Speed Control

**修改内容：**\
\Profiles\V10\user.js \
\Profiles\V10\chrome\Local\_addmenu.js 


-------------
### 06-28 更新说明
1、修正 about:newtab 显示空白的Bug

**修改内容：**\
\Profiles\V10\user.js \
\Profiles\V10\chrome\css\newtab.css 

-------------
### 06-27 更新说明
1、内核更新至60.1.0ESR，需要重新下载安装。\
2、修正书签移动时的错位BUG。  \
3、默认全局开启Flash，不再需要点击启动Flash。\
4、快捷键的部分修改。\
5、新增多身份标签小号功能。\
6、因部分网友不知道如何使用Xstyle，故换用了同类拓展 Stylish。 


**具体文件修改**：

**新增：**\
拓展 [BookmarkTab Here](https://addons.mozilla.org/zh-CN/firefox/addon/bookmark-tab-here/?src=search) 

**修改：**\
\Profiles\V10\user.js \
\Profiles\V10\chrome\css\chrome.css \
\Profiles\V10\chrome\css\newtab.css \
\Profiles\V10\chrome\images\icons\profile.png \
\Profiles\V10\chrome\Local\_keychanger.js \
\Profiles\V10\chrome\SubScript\QuickOpen.uc.js  \
\Profiles\V10\chrome\SubScript\SimpleMusicPlayer.uc.js  \
\Profiles\V10\chrome\SubScript\Tabplus.uc.js  
 
**删除：**\
\Profiles\V10\chrome\SubScript\AddBMHere.uc.js  


-------------
### 06-18 更新说明
1、内核更新至60.0.2ESR，需要重新下载安装。\
2、多处内容修改。

-------------
### 05-14 更新说明
1、杀虫提稳，修正错误。\
2、增加拓展 Add Search。\
3、修正一些菜单选项的错误。\
4、修正微信网页版下的滚动条问题。\
5、增加侧边栏鼠标手势。


-------------
### 05-10 更新说明
1、标签菜单新增一键弹窗置顶播放按钮。\
2、移除拓展 Maximize Video。\
3、修正一些菜单选项的错误。


-------------
### 05-08 更新说明
1、修正两个批处理文件的错误。\
2、修复菜单的错误及排序。\
3、禁用Firefox内核的自动更新。


-------------
### 05-07 更新说明
1、Firefox 内核更新到59.03。\
2、新增控制Firefox内存使用软件Firemin。\
3、标签功能增加在当前标签页右侧打开新标签。\
4、更新了所有能更新的功能，新增加了两个用户脚本。\
5、修改多处错误和存在的BUG，以及一些小细节修改。

-------------
### 05-04 更新说明
1、鼠标手势加入“将当前窗口置顶”的功能，默认手势是“T”字形，“右左下”。\
2、快捷键加入“将当前窗口置顶”的功能，默认快捷键：Alt+]。

-------------
### 04-30 更新说明
1、加入老板键，默认为 Ctrl+~ \
2、加入自动更新功能，为你节省大量更新修复需要花费的时间。 \
3、修复已知菜单选项中存在的BUG。 \
4、将各项可能需要自定义的选项放在一起，方便管理。 \
5、加入各项批处理脚本，比如配置管理功能。 \
6、这将是V10版本小幅更新和BUG修复需要手动更新的最后一次，日后可自动更新。
