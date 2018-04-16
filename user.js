# user_pref(key,value) 等同于从about:config修改,删除之后,修改的设置仍然有效
# pref(key,value) 删除之后,修改的设置也将失效

//标签选项
pref("browser.tabs.warnOnClose", false); //关闭最后一个标签不关闭浏览器
pref("browser.tabs.warnOnCloseOtherTabs", false); //关闭标签页提醒
pref("browser.tabs.closeWindowWithLastTab", false); //关闭最后一个标签时不关闭浏览器
pref("browser.sessionstore.max_tabs_undo", 15);//最近撤销标签历史最大数
pref("privacy.userContext.enabled", true);//开启身份标签页
pref("browser.link.open_newwindow.restriction", 0);//新标签页打开链接,而不是窗口
pref("browser.search.openintab", true);//搜索栏新标签页打开
pref("browser.bookmarks.openInTabClosesMenu", false);//中键点击书签不关闭菜单
pref("browser.tabs.loadBookmarksInTabs", true);//打开书签的时候在当前标签页右侧打开
pref("browser.tabs.loadInBackground", true);//中键链接后台打开
pref("browser.tabs.loadBookmarksInBackground", false);//中键书签后台打开
pref("browser.sessionhistory.max_total_viewer", 5);//快进/快退保存的页面总数，减少内存占用
pref("browser.tabs.insertRelatedAfterCurrent", true);//在当前标签右边插入相关标签
pref("browser.tabs.remote.warmup.enabled", true); //提高标签页切换速度
//pref("toolkit.cosmeticAnimations.enabled", false);//关闭标签动画
pref("browser.tabs.tabMinWidth", 100);//标签最小宽度

//关闭自动更新
pref("app.update.auto", false);
pref("app.update.enabled", false);//禁用火狐浏览器更新
pref("app.update.lastUpdateTime.browser-cleanup-thumbnails", 0);
pref("app.update.service.enabled", false);
pref("browser.search.update", false); //不自动升级搜索引擎
pref("extensions.update.enabled", false); //禁用扩展更新和检查更新
pref("extensions.getAddons.cache.enabled", false); //扩展页面扩展不下载自动推荐内容


//偏好设置
pref("browser.bookmarks.max_backups", 3);//书签备份文件的数量
pref("layout.spellcheckDefault", 0); //输入时即拼写检查
pref("ui.osk.enabled", false);//触摸键盘
pref("media.eme.enabled", false);//drm内容
pref("security.OCSP.enabled", 0);//OCSP服务器
pref("browser.search.update", false);//禁用搜索引擎自动更新
pref("dom.popup_maximum", 5); //Firefox弹窗的最大数量
pref("privacy.trackingprotection.pbmode.enabled", false);//跟踪保护
pref("privacy.trackingprotection.enabled", false);
pref("datareporting.healthreport.service.enabled", false);//紧张遥测往prefs.js写入数据
pref("extensions.ui.lastCategory", "addons://list/extension");//附加组件默认打开扩展项
pref("browser.safebrowsing.enabled", false);//safebrowsing
pref("browser.safebrowsing.malware.enabled", false);//关闭欺诈内容和危险软件防护（谷歌网站黑名单）
pref("browser.safebrowsing.phishing.enabled", false);
pref("privacy.resistFingerprinting.block_mozAddonManager", true); //让拓展在Mozilla的网站上正常工作
pref("browser.urlbar.maxRichResults",15); //地址栏里的历史记录数量
pref("browser.sessionstore.max_tabs_undo", 20);//最近撤销标签历史最大数
user_pref("lightweightThemes.selectedThemeID", "firefox-compact-light@mozilla.org");//设置默认主题为亮色


//功能开启
//pref("layout.css.servo.chrome.enabled", true); //FF58+开启stylo引擎 (开启会导致在使用开发者工具栏的时候奔溃)
pref("layout.display-list.retain", true);//FF58+提升浏览器界面绘制性能，只重新计算显示的列表项而非所有列表项
pref("network.standard-url.enable-rust", true);//Rust的URL解析器
pref("network.tcp.tcp_fastopen_enable", true);//TCP快速启用过滤,减少http延迟
pref("dom.ipc.plugins.flash.disable-protected-mode", true);//开启Flash去沙盒
pref("browser.xul.error_pages.expert_bad_cert", true);//自动展开：此连接是不受信任的




//功能去除
pref("extensions.pocket.enabled", false); //关闭自带的pocket
pref("network.dns.disableIPv6", true); //关闭IPV6
pref("signon.rememberSignons", false); //关闭自带的保存密码功能
pref("geo.enabled", false);//禁用地理位置
pref("browser.urlbar.oneOffSearches", false);//地址栏下拉菜单隐藏切换搜索引擎模块
pref("browser.taskbar.lists.enabled", false);//关闭Jumplist跳转列表
pref("dom.vr.enabled", false);//关闭vr
pref("general.warnOnAboutConfig", false);//AboutConfig警告
pref("extensions.e10sBlockedByAddons", false);//扩展禁用列表
pref("accessibility.force_disabled", 1); //禁用无障碍环境
pref("security.sandbox.content.level", 0); //禁用沙盒
pref("security.mixed_content.block_active_content", false); //关闭ssl不安全内容和混合内容保护1 
pref("security.mixed_content.block_display_content", false); //关闭ssl不安全内容和混合内容保护2
pref("security.dialog_enable_delay", 0);//安装附加组件时的等待时间
pref("browser.safebrowsing.downloads.enabled", false);//解决下载卡在最后一秒的问题
pref("browser.backspace_action", 1); //去除退格键使网页后退的功能，改成向上滚动页面。
pref("xpinstall.signatures.required",false); //可以安装未在AMO被验证拓展
pref("browser.urlbar.formatting.enabled", false);//关闭域名高亮
pref("browser.taskbar.lists.enabled", false);//关闭jump list
pref("extensions.pocket.enabled",false); //取消自带的稍后阅读功能
pref("services.sync.engine.addons",false); //取消附加组件的同步功能
pref("services.sync.engine.prefs",false); //取消首选项的同步功能
pref("datareporting.healthreport.uploadEnabled", false);//关闭安全检测健康中心
pref("datareporting.policy.dataSubmissionEnabled", false); //关闭安全检测健康中心
pref("dom.flyweb.enabled", false);//关闭物联网扩展
//pref("dom.event.contextmenu.enabled", false);//破解右键限制 (开启会导致SpeedDail右键菜单重叠)



//动画
pref("browser.download.animateNotifications",false); //取消下载提醒动画
pref("browser.fullscreen.animateUp",0);//关闭全屏时工具栏隐藏显示动画
pref("full-screen-api.transition-duration.enter","0 0");//去除全屏淡进淡出效果
pref("full-screen-api.transition-duration.leave","0 0");//去除全屏淡进淡出效果
pref("full-screen-api.warning.delay",0);//去除全屏提醒
pref("full-screen-api.warning.timeout",0);//去除全屏提醒



//开发者工具
pref("devtools.chrome.enabled", true); //chrome界面调试
pref("devtools.debugger.remote-enabled", true); //远程调试
pref("view_source.wrap_long_lines", true);//查看页面源代码时自动换行



//禁用遥测
pref("browser.ping-centre.telemetry", false);
pref("toolkit.telemetry.archive.enabled", false);
pref("toolkit.telemetry.bhrPing.enabled", false);
pref("toolkit.telemetry.enabled", false);
pref("toolkit.telemetry.firstShutdownPing.enabled", false);
pref("toolkit.telemetry.newProfilePing.enabled", false);
pref("toolkit.telemetry.reportingpolicy.firstRun", false);
pref("toolkit.telemetry.shutdownPingSender.enabled", false);
pref("toolkit.telemetry.unified", false);
pref("toolkit.telemetry.updatePing.enabled", false);


//插件
pref("media.gmp-provider.enabled", false); //干掉插件
pref("plugin.scan.plid.all", false); //disable Plugin Scan
pref("dom.ipc.plugins.sandbox-level.flash", 0);//64位flash关闭沙箱
pref("extensions.blocklist.enabled", false);//关闭flash版本过旧被屏蔽的提示
pref("dom.ipc.plugins.flash.disable-protected-mode", true); //直接用火狐禁用flash保护模式
pref("dom.ipc.plugins.flash.subprocess.crashreporter.enabled", false); //flash崩溃报告crashreporter
pref("plugin.state.flash",2);//flash总是开启


//平滑滚动参数
pref("general.smoothScroll.mouseWheel.durationMaxMS", 100);
pref("general.smoothScroll.mouseWheel.durationMinMS", 100);
pref("mousewheel.acceleration.factor", 15);
pref("mousewheel.acceleration.start", 3);
pref("mousewheel.default.delta_multiplier_y", 100);


//开启流媒体API
pref("javascript.options.streams", true); 
pref("dom.streams.enabled", true); 


//Newtab页面
pref("browser.newtabpage.activity-stream.aboutHome.enabled", false);
pref("browser.newtabpage.activity-stream.migrationExpired", true);//newtab不提示导入书签
pref("browser.newtabpage.activity-stream.feeds.section.highlights", false);//newtab关闭集锦
pref("browser.newtabpage.activity-stream.prerender", false);//newtab关闭集锦
pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);//newtab关闭Pocket推荐
pref("browser.newtabpage.activity-stream.feeds.snippets", false);//newtab关闭只言片语
pref("browser.newtabpage.activity-stream.topSitesCount", 12);//newtab常用网站2行显示
pref("browser.onboarding.state", "watermark"); //newtab不提示新手引导
pref("browser.onboarding.tour.onboarding-tour-addons.completed", true);
pref("browser.onboarding.tour.onboarding-tour-customize.completed", true);
pref("browser.onboarding.tour.onboarding-tour-default-browser.completed", true);
pref("browser.onboarding.tour.onboarding-tour-private-browsing.completed", true);
pref("browser.onboarding.tour.onboarding-tour-screenshots.completed", true);
pref("browser.newtabpage.pinned", "[{\"url\":\"https://www.quora.com\",\"label\":\"Quora\"},{\"url\":\"https://www.inoreader.com\",\"label\":\"Inoreader\"},{\"url\":\"https://getpocket.com\",\"label\":\"Pocket\"},{\"url\":\"http://www.youku.com\",\"label\":\"Youku\"},{\"url\":\"https://twitter.com\",\"label\":\"Twitter\"},{\"url\":\"https://weibo.com\",\"label\":\"Weibo\"},{\"url\":\"https://www.instagram.com\",\"label\":\"Instagram\"},{\"url\":\"http://music.163.com\",\"label\":\"Music\"},{\"url\":\"http://www.zhihu.com\",\"label\":\"Zhihu\"},{\"url\":\"http://www.guokr.com\",\"label\":\"Guokr\"},{\"url\":\"http://www.douban.com\",\"label\":\"Douban\"},{\"url\":\"https://www.runningcheese.com\",\"label\":\"Cheese\"}]");






