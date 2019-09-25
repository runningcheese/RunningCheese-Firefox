// ==UserScript==
// @name	Firefox_ToolBarButtons.uc.js
// @charset	UTF-8
// Date     2019/09/21 汉化 by Ryan Lieu
// Date		2019‎/06/12 Firefox Nightly 69.0a1 document.createXULElement('toolbarbutton'); → aDocument.createXULElement('toolbarbutton'); 書き換えました。
// Date		2019‎/05/26 Firefox Nightly 69.0a1 createElement → createXULElement 書き換えました。
// Date		2019‎/02/25 ページ情報ボタンの2つあるidを同じidにするのを忘れていたので修正しました。
// Date		2019‎/02/20 タブ移動ボタンをホイールスクロールで左右のタブにフォーカスを移動(タブ切替え？)するようにしました。ズームコントロールボタンをホイールスクロールで拡大縮小するようにしました。開発ツールボタンとCookieとサイトデータを管理ボタンを追加しました。他いろいろ変更しました。
// Date		2019‎/02/04 クッキー表示 は 開発ツールを表示するようにしてみた
// Date		2019‎/02/02 idの重複修正 クッキー表示の修正
// Date		2018‎/07/10 ボタンを追加+いろいろ変更しました。
// Date		2018‎/05/03 アクティブタブを移動するボタンを追加しました。cssの多段タブでのタブ移動に便利？ ショートカットキー(Ctrl+Shift+PageUp/PageDown)でタブ移動出来たりするので使うかはお好みで。
// Date		2018‎/04/04 拡大縮小ボタンを追加しました。
// Date		2018‎/02/05 GitHubのEndor8さんの所でボタンを増やしてくれていたのでそのまま日本語化だけしました。
// Date		2018/01/16 2017/11/09版と同じようにボタンを一つにまとめ直しました。初期導入時、再起動するボタンのみツールバーに表示するようにしてみました。
// Date		2017/11/23 ブックマーク、履歴、同期タブのサイドバーを開閉するボタンを追加して、個別に導入できるようにバラバラにしてみました。
// Date		2017/11/09 RestartFirefoxButton_Movable.uc.js をベースに、再起動+ about:config、プロファイルフォルダ、クッキーマネージャのボタンをセットにしてみました。
// @note	
// @note	初期導入時、再起動するボタンのみツールバーに表示するようにしました。
// @note	その他のボタンは、ツールバーのカスタマイズ内に格納されていると思います。
// @note	カスタマイズから追加したいボタンを好きなところに出して使ってください。
// @note	
// @note	label と tooltiptext が環境によっては、文字化けするので、 Unicode に変換してます。
// @note	
// @note	再起動
// @note	about:config
// @note	新しいタブ
// @note	プロファイルフォルダ
// @note	クッキー (Firefox60ESR)
// @note	ブックマーク サイドバー
// @note	履歴 サイドバー
// @note	同期タブ サイドバー
// @note	ブラウジングライブラリー「ダウンロード」
// @note	タブを更新(保存されているキャッシュを無視して更新)
// @note	オプション
// @note	プラグインについて
// @note	ブラウジングライブラリー「ブックマーク」
// @note	Chromeフォルダ
// @note	ページ情報
// @note	証明書マネージャー
// @note	保存されたログイン情報
// @note	履歴を削除
// @note	拡大 (Ctrl++)
// @note	縮小 (Ctrl+-)
// @note	タブ移動（左：左にタブを移動｜右：右にタブを移動｜ホイール↑：左のタブに移動｜ホイール↓：右のタブに移動）
// @note	ズームコントロール (左 or ホイール↑： 拡大｜中： リセット｜右 or ホイール↓： 縮小)
// @note	開発ツール
// @note	Cookieとサイトデータを管理(一度Firefoxのオプションを開かないとCookieやサイトデータが表示されないようです。)
// @note	カスタムボタン (左 or ホイール↑↓：新しいタブ | 中：about:config | 右：Chromeフォルダ)
// @note	
// @note	Firefox Nightly 69.0a1で動作確認しました。
// @note	http://wiki.nothing.sh/page?userChrome.js%CD%D1%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8#m5c944e2
// @note	↑ここの「サンドボックスが有効になった62以降でもuserChrome.js用スクリプトを利用する方法」を導入して確認しています。
// @note	
// @note	Firefox60ESRなどでabout:系を使いたい場合 openTrustedLinkIn ⇒ openUILinkIn に変更してください。
// @note	
// @note	Firefox61以降クッキーマネージャ？がCookieとサイトデータに変わり廃止されたのでクッキーマネージャ？を開くボタンが使え無くなります。
// @note	
// @note	Firefox68以下でこのスクリプトを使いたい場合 aDocument.createXULElement ⇒ document.createElement に変更してください。
// ==/UserScript==

(function() {
    Components.utils.import("resource:///modules/CustomizableUI.jsm");
    try {

//      重启浏览器 BrowserUtils.restartApplication(); 
        CustomizableUI.createWidget({
            id: 'restart-ToolBarButton',
            type: 'custom',
            defaultArea: CustomizableUI.AREA_NAVBAR,
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'restart-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: "重启浏览器",
                    tooltiptext: '左键：重新启动 | 滚轮：重新启动 + 清除脚本缓存',
                    style: 'list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABqElEQVRYCe2WvS4EURiGzwp6RIisGYUCHdHpXMBuSCg2aomfkE0ULkShXBFbCBIKiVLiBmzDBaCgoPSzdjxvcbLZyDjnbFSMvI/3Oyff+804mx1jTPbz308gF3gAefpLMAMT0Aua8YFfwyXswR38qoaYdgB1SBzoZirGmAisbMaug3ye7hfQkFe8YowpgG6qBxcxrr59XD0JrswiLmktVAexSXcDFD7Eh8GlEWPMKSjziS+DakHprzlaNUBsUIeqTEA3r7wuLtjy0wBtT6CQBlG2pW1SmmFh6add2hQ6x0OlXBpes7rpugUd3RgeqrSLa997Vgedk5ApO4HsBP7MCUzxl+irjflJD400/CY0u8Yp9VC7wfWQw9xKu7j23enWjguWyu3g3lLAsuqd+t64xZbmPOL94C2FhP13uuKdbDaWKW2+QB0kXVysk9Lnp/qMehRcimg4AmUa+BoES2GhYJFfz6D1G34CSxBDF3RCHkpwDO+QgDJFvC1pgLDhiKIKDdD+T+ilVO+Gg/Q6lXN2tDbELBdgFqahD+rwADW4gircQ6bsBLxO4AsIQ4sIQ7Hi+wAAAABJRU5ErkJggg==")',
                    onclick: 'if (event.button == 0) { \
                                  Services.startup.quit(Ci.nsIAppStartup.eRestart | Ci.nsIAppStartup.eAttemptQuit); \
                              }; \
                              if (event.button == 1) { \
                                  Services.appinfo.invalidateCachesOnRestart(); \
                                  Services.startup.quit(Ci.nsIAppStartup.eRestart | Ci.nsIAppStartup.eAttemptQuit); \
                              };'
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      about:config
        CustomizableUI.createWidget({
            id: 'aboutconfig-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'aboutconfig-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: 'About:Config',
                    tooltiptext: '打开 About:Config',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAA6UlEQVRYCe2U0QrCMAxF69iP+aj+/5sgTL/DLQc2yLbYUNdVGZVekpo0ub0lC6H+qgJpClwl/S54C7BnsUVXJ916hYf4RVcv3YCYgAX4X6M1TqYWTc0/6Z6N3vzCtxSYMVyQsm4by18cX29TFXiOJSYi3bgvZm7SCRIQeIl/EfzVqt8JngbwLFiA/xGtEXEPGWdif+l6+I1Onm10YCd/NbKWAqukBDLccJkerZdbAUYUAhORjk1JZP9O1LnmLQHPiAX42WBNgdfEi3vkZlPReNl7xy0FNEPrtjq+mZ+nwPHmerNktcDhFBgAMopAcXHb5RYAAAAASUVORK5CYII=)',
                    onclick: 'if (event.button == 0) { \
                                  openTrustedLinkIn("about:config", "tab"); \
                              }; '
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      新建标签页
        CustomizableUI.createWidget({
            id: 'newtab-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'newtab-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '新建标签页（后台）',
                    tooltiptext: '新建标签页（后台）',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACS0lEQVRYCe2WO0scURiGx2VBC3UD3sCoqaKIEK/Yayo7Zf1FgmIhio2F1lopQoJ4Sxd/g4WNgY2CYbeI4q3Y6PPqOct6cD0z7mgQlPeZ95sz7/fN2XG8BMH7139+AhUR799BPg0j0Ah1IOU4nMAmrMEBxKo+pu3CTUi2yfVA2UoyYR7yoJvrUy5Sj0IXNBhUj1EvwR9QVj2z1JqBRdcHWnZAw67wKagBn2oJTIN61KunkeI8kipJ74EGHOJfIKq6aVDvDf4TNBMLp0ViaszgLfBctdJ4BJq1gIfSIKl/cA69UK4GGHABmtmPe/WDhHY8gfuknPDlJgkop/eBsrQ6uKRgFg/zwikriD+pFFdzoOxnvKBEobovxu8tWMPPIC79ZdA6SGkdLO4Ghs2FDeNxmp35tXhooviEug2kfR1ixs6093h0/Bmr+j5V4660HgW3v4YF9Z/iBblPwP5xUrAQesnC3cCxuVmz8WLT5lzsdXdd5/aa9Y+mODJ+Z+4GMnerQdBpPE6zM38XD3U3sGUujhqP0+xM/c9Qcu6r/yJ6bCe7LOolnMB9Uk74clMElLNPmNPS6uVSHs5BNVaWBui+BM3sxkNpjpR2rJeyhfq5aqVRb71mzVCHVoLkd1BjFh+CqBqmQb2a8Y06AZGUIr0DGnCFz0Ad+FRPYBauQb3buGZh0ZWkZR7yoGGn+DKkoR2qDKrHqVdAGWXVM8e5ZmDlqY92+9Oh4T70qXvo8arCm3gY0O8JffoRlj9BE0gnHH4FQbAFq3AA73obT+AWdIyZD4azOMgAAAAASUVORK5CYII=)',
                    onclick: 'if (event.button == 0) { \
                                  openTrustedLinkIn("about:newtab", "tabshifted");/*BrowserOpenTab(event);*/ \
                              }; '
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      配置文件夹
        CustomizableUI.createWidget({
            id: 'profilefolder-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'profilefolder-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '配置文件夹',
                    tooltiptext: '在资源管理器中打开配置文件夹',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABiklEQVRYCe2SPU7DQBCFFysVUCCKUPAnuAniLjRIlCBOgrgAgj7URJwBEGUKKEECKihivgdeabJ27E2McWNrnmbmzbzZ9djOdU/LG1goOT8tqdUpTZyZ1JnUtFYbEOY5R28p7diIlQuGcq71DXQXaH0DvYk/opmkz9jczwdXaRIJRY1bkFdg5JwbOecUb+KtPZBI/4j38T1xtEkshAId/gqpmsULnL3EGvkd8D2KxUHFmReG3ZcQqg3wO2AXXANxF3hrfRLxgmLSeJNICBXPEOLt225n3BM+tBRCwOUtyVOVjNeMTaePfc2UysOZBYwbut/nHLee4QwvG7o/fLQ2IRyp1b9DqmbxAbcBQvM9If+Tz7OBA5TLIDRxhyFZJy+6+T4D9b0/8SdgESyBI/AFVNvDWyuaY+tT4yLhLd3ij/GhnUKodoO3lpIIuNlMIsGq9J3FrVgyi1fxqr3hrYkTLBcVSyRENZc0aYZQ2JIUsv9IdhdofQO9iM899QeK0Fa2tL6Byht2DU1v4BvWuV6LLZxwIwAAAABJRU5ErkJggg==)',
                    onclick: 'if (event.button == 0) { \
                                  Services.dirsvc.get("ProfD", Ci.nsIFile).launch(); \
                              }; '
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      Cookie（Firefox60ESR）
        CustomizableUI.createWidget({
            id: 'showCookies-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'showCookies-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: 'Cookie',
                    tooltiptext: '显示 Cookie',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACm0lEQVRYCe2UTU8TURSGB6ugURcmrN3z8TtwRTQWtIl7jJKi8B80CCru3OrChIUbfwA2hD9glGpCpEYXLAkCKtaP8XnM3Dhtph+0uCt5nznnnnvOmds5M0RR76/3BDp7AgOUXYMX8BG2Ezaxz8E9c3CPXjb/RNu4BRX283Bk6qPTYwg3foU/BUNwDgZhFGZhHULeEn4OutZ9Oth0H3sdjoFa4OII5rFB3rDIogrWLGK70iTVNvqJ3QJvKM78B2v3drH1GiPwHX7DOHSkCar2wJs0Y4ecPASVcFbgBsSwASegbTnzu2RbLJv4zncEO5gwijW2jjVHwszXiK1CDsrg3iS2bd0h06IqdhpshMmUe0V2zLVmET8tD2n8WTrYzL/IpnNzfmP49cp68cwx1xprxw0k+KQ8wLtk3dT0s/seLJjCZmmPoPtZL16Y+VdyXoI6y6VRPlu1KrA0+TU2fGol/BUI8gkcsEh/eiz/ynGU8WJ4C+oUF9dfsC21TIbJM9igNRxfKExbqp/5MFX29MniNtcG2yYPYTtV/cz9Mfb0x7XsGeZ7pmVm44T0zB2j4/QAVxqX/NvZxzX5NPYwKpEc3pP0AW4Rj6EC/VAjT1cTYLEF6ryXFAv42zAPWTpOUDBRqP3MwjpMNMelCi21TIYnnsGmFUazmw428OeI2+NXYh9i21aBTIvXsTkI8pccsJiHZrKmQoI95B5+H7StfjL9XCy+jd9IJTZWoF43CcSwA5ehI12iyibO7AJ+ltYIrkJaYyyy/hUTPrweUOIhbDiNn4NGcq/Ipge2ZgG/a9n0EV1sKG/wZ2EYTiaMYI35vpgjS8SsxRyNJmjzAeIW+OLlyfkvGqBrAZ5CGb4l6D+JougqmIPpqfcEDvcE/gAaEsinMEb1SgAAAABJRU5ErkJggg==)',
                    onclick: 'if (event.button == 0) { \
                                     window.open("chrome://browser/content/preferences/cookies.xul","cookie","chrome,dialog,centerscreen,dependent"); \
                                  }; '
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      书签侧边栏
        CustomizableUI.createWidget({
            id: 'BookmarksSidebar-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'BookmarksSidebar-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '书签侧边栏',
                    tooltiptext: '打开/关闭书签侧边栏',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAA30lEQVRYCe2UPQ6CQBCFV4yxsDExxlovoI3X0dIDeAA9hlb2nszOzkbJ+g0hCmSUoPwUDHkvMzxmZ5a3AefsMgfa7kBHMcArWplSamZQZmfrZQ6YA784kPom4wb2H4iNaEnoVvieS3pP4AU2gjNTT7ARzJj6gDc4gh9R5hH0mSKDF8QtnMMeHEDZiMySGHL/FZ6nRUh5hL1zLm/djppceCqKkPIXNmTyhtn1d/QVrAVHpmQ3cEBTEajqf+JQWa5pUVkVG5jS+QrF8jVRctFI64EcwTgxSnLREpKl5sDbgSd2kzvK9qVscgAAAABJRU5ErkJggg==)',
                    onclick: 'if (event.button == 0) { \
                                  SidebarUI.toggle("viewBookmarksSidebar"); \
                              }; '
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      历史侧边栏
        CustomizableUI.createWidget({
            id: 'HistorySidebar-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'HistorySidebar-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '历史侧边栏',
                    tooltiptext: '打开/关闭历史侧边栏',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABO0lEQVRYCe2WWQ6DMAxE3QXOxeWg7aF6F757h6qdh4iUiLCEwAcSladOvU0wtlSz83N2YNiBn0xAan+57k8xzXDYC5R6rofQmllrZo1QCJsI7x9MFXvKSYyPWrZkuUQyKBoxR02Vmd2Et7BUAs770qyRuK/sKRdW+LxQEExFvuQkxseqV6A6A3FFBw7PUOrMHHykQSNdCJvIkgtMEZVyPoTWVm5I7gXojKvhdK3LRCWYyD6CpP6YpSqLb0jAmbsF4hiV1RtCB8Bo5RlH9oZADmZ4Rt0MIXPAdoBGkYWwWCAHLqHUIWuqlZ8kkAOXxNPw20ftnLk6mMi+GET9MVCVxada5iQJOFO2YPVUJ11PwXQA6NhJ9lR3VRK+IAcuhSFkDpho0MhRCLsJ5GA3Ar/wYf8T+g9xns8OZHXgD3iZVXzhF+5ZAAAAAElFTkSuQmCC)',
                    onclick: 'if (event.button == 0) { \
                                  SidebarUI.toggle("viewHistorySidebar"); \
                              }; '
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      同步标签页侧边栏
        CustomizableUI.createWidget({
            id: 'viewTabsSidebar-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'viewTabsSidebar-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '同步标签页侧边栏',
                    tooltiptext: '打开/关闭同步标签页侧边栏',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACAElEQVRYCe2TvUtbYRSHr5WkIDVpSkxFUahbqaOdHOzibHXo4Cz4iUvp0tl/w8WltGsHwa4liIRIjSKlS1E6iKgoUuqkzyNeSMjXrVFo4Ybfc8+555z3nPe+uTcI4l98AvEJ/IcnMMyel6EEB3AMe7ACo9AG96IBuq7BZRPy5J/DnWqIbqfg8H3se3gBWcjAILwDc9ac4Y9AS+pn9Uf4GQTBBVzCJ0hDPaVIWGPtCf4zuJX6WHUENgpZ5T4BzfSAAjfuui/4t9IHVtngM9ankA78qEpTeAj2eBX85a+d+l/gYk8CN5K6qJqBUEs49viN3YS3kISGekq2CC6UFH4UOXyLQtfMYdVLLt6XUyDWAzX1kGgRXPADOwn+n5gK+ZRdZRH9cHiJuPeYoI2LX4hfyji+Pe3tDGcRqtQUtxZ8xz6BWponaM0W1kGib8zhOeL1lCFhb2sX8av0lYjJN9h6ypFwkHUOFv1t4uYwDTVO1vp1bJUOiZjMYhvJ92SHAmtF3xihpkpT4ZpTbJXOiZh8hG2mDAWFG/RxIyncwFmt6g2CbmAMG0XdFEV9ckqvNcHVGXlslRaImNzFPoa7licVvoSztZr7aXwj4SYsfI3fCa3KHj55+WeYrNe0l0QR3MR9UKB3DzSUu5uhwuI/2FY3Yg/fr2l6JSBWfALxCfxbJ3AFpoOf7PsDQxQAAAAASUVORK5CYII=)',
                    onclick: 'if (event.button == 0) { \
                                  SidebarUI.toggle("viewTabsSidebar"); \
                              }; '
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      其他按钮
//      我的足迹：下载项
        CustomizableUI.createWidget({
            id: 'Download-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'Download-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '我的足迹：下载项',
                    accesskey: 'D',
                    tooltiptext: '打开我的足迹：下载项',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABOklEQVRYCe2VMUpDQRRFBxVEizRaiXZmBYLgCiJkC4LuQSuzBUGbrME2bsBGIV3alKaxsBVtFPyeExILjY4h8/MJTLgnb/7Me/fNfwQSQv7kCeQJ/JzAOltdKBKjp97YxrVJSh9SXUKvDfym0hbZgxCCl7glrsJ/Za411j5QpBdhetUpeYICrmEJYjLHXGus3Y0VxM73SXgBDS+IMbVJMNcaa3mcXU0s3kHjU+JvOuPAHHOt4TGdjrD6GHFM/K6TEML43Fwe06uFZQFv0ICxDlm459k561J1hbuNnol7cACv4N4lsXQt0+EGbPhIFNcd1p4RytcaLe7BxnLH2j3C/FSjVW9EjViJdui6DVlJJuCPSZKY/WFiDxmm+McxXFT1VfkFVia8+dd4Jpwl36p8AsnfKBvmCSzcBD4B55ZfLV9GFrEAAAAASUVORK5CYII=)',
                    oncommand: "DownloadsPanel.showDownloadsHistory();"
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      我的足迹：所有书签
        CustomizableUI.createWidget({
            id: 'bookmarks-manager-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'bookmarks-manager-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '我的足迹：所有书签',
                    tooltiptext: '打开我的足迹：所有书签',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABVElEQVRYCe2VXVLDMAyERYErlBvDLWjgTMDwRp84BmE/BmUc8I9MyOQlHW0lS7uWqySN2f7ZeAIXlf5jpbakNOt5WLLT2lomAP7Sh1+J9iMRswZJymzzCewH2HwCV7M7Yp3FUdv+uvmUaxoi0CQWCC/Ko3+V9/hZcdgQg7DgB/FG6yeBPQAxOaVihgik7Gst7oSzmb0JtwJr4rOZEcNR+GVHfY/fIFYYNxemChp4vuQ5VKpxXpoLxTnhu5SeL3k4ok3mvCmRBr2PIX+xqX5x3HuAU6DjfYATooxiAbnJLhU9CuRzeFANjtxkzpsS0aAkpAGNvO5+MDNqcjPz+iwZWdSENBrMzDmDld+szhGlz1rCg7YbzOwkEMtlbVQWyPUZIlBT8S5hGjUOe4AaJ1tDBLLFjiR7gKykNrqs4L+T+wG4iVpTLV6/ljBS3/wSRA65c1adwCftnWUa/fsV/QAAAABJRU5ErkJggg==)',
                    oncommand: "PlacesCommandHook.showPlacesOrganizer('AllBookmarks');"
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      强制刷新（忽略缓存）
        CustomizableUI.createWidget({
            id: 'reload-skip-cache-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'reload-skip-cache-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '强制刷新（忽略缓存）',
                    tooltiptext: '强制刷新当前页面（忽略缓存）',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACGklEQVRYCe2VzUobURiGx2ajiyyELoya1goBcacX4AWIYiCrblK6tIUWWwoiuvcS/NkKCv600Ap6JS5K48K2m24kCdXU/Pi8co5khpiczIyrJrxP3nNOvu+dmZPMxPN6r/99BxIxbMAfMl7DPCThJ5QhtBp0toOPfQrW/uPTDRiBUAoGBufB0EEWxiEHO1AB9ZTwLETSR7rroEAL07bSyRxSofoa/h5CKU+XDXlrxpozdNISVVXQSczhXekF1SXQAe0VaCxYdtYnKtVziafAWfou1bjf1KG5aFrqOOyj4iuobxt30jOqtG1XeBqsFCLs3NUzFOrO0NfRnMey5z25e/e/vWSq9QP8AqLqOwFfIAEL4JMO5FtgMgOSmuQWbaew827cZs26NF1QpK1+jselCYIacAYddUWFivvxuJQkSJlF3KdWX0HNVCSMP6q1OoHf5ogjxuMwm/UrGNbqBAqmaMp4HDZtQs6N31urE/hmPs0aj8Ps7XfsEjZK0Q1UYByiKkOAsqp4Gpy0SVUDPkPYe59WT732UbylBVeGKSyCTmIFD6s1GpVxiaegK2WprkEdlqEb6cpXaVCvMuYYh9IHuhSiq9A/45jX+aXfzRFl6tHB3zGOpBzdZVDgNb4LeZgEPS0HcI1f4XugmgZeAu0iFl1PiVgH+5jWAR7iL3WqVQ/DeKUf0hsiT6EAulrxg/EJLMIQ9NTbAecduAUofYmnD4vK/AAAAABJRU5ErkJggg==)',
                    oncommand: "BrowserReloadSkipCache();"
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      选项
        CustomizableUI.createWidget({
            id: 'Einstellungen-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'Einstellungen-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '选项',
                    tooltiptext: '打开浏览器选项',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAC4klEQVRYCe2WPU9UQRSGB0goxMLYkUAU0IJISyygEIwfFCbgP7CBzg4RbCAY/Qla8wOw0tgZacUodLsUQONXoTHGGARdn2e5A+S6F2dDJCFh877znjnznjOXu3MvG8Lx54jegY9cdyXHD8wPBe3skt88zttYqwuNdbm3zb3bEp6iDRmfoaLXoR7WewH6r2YbvMlUibFreswdiOeoXoLTIYRuKIYYVmC83cPEESMEMV8mvgZFN8MMXIZdMBlPcMaGaon5b2i8io7DEzCihcCcaxVivdYYR86TT8IgLou+oXPwC3S+iU7BJlgE1+6xuAWtsdYe9nI+QH5f2GAJh+ZJVDQzDME+mIp+jNZYSxi8cHu+ZeIeSG2Mkda4ibbBIlxhYQF+zvgSvQmL4KNrT3uPFpnM9zCsQ40ltAPmMUvC71hPng9Zy6OTRBnqXQshXID7opXV19CC96hPBFLFZUY330AnoAexBb0Nf0LXBtAIa31D2muRZCtMwklc76CFF9GIBQJzd9A8Jkm49gKNsLbCxF5eKGE6vmK1+DQaEU/zqZjYo/r0WxfTtXJxraqN1bH20JClbZqFO5Ka2ykoCoouwK/ge1Z0PlNl0QHegnmMZYlXmSqx1l4tJlLYiqnoEN5gzb9+A52A8RDeJfYQ/kIvhd1P3Yewh9p16CYltAPm8YCEp13PXpqbDn9/OkmVod618I/H0Nuo0ZdGyovoBw3lAuojitREO1l72nuUuBBNrCxBjZOoaGbwtdqHpqIfozXWEqa/ijUPMngBPnJzxP5Dcb5JPAW9SKQmXNOzxao11trDXs4HyCfhCS4LIkvM/Y6drxKPQw8gUoUn3JxrFTJ6rTGOnCefDE+vX8V02P1Bcp14BcaGw8QRIwQxXybWi1R/zMwQLMMueGA00uExdLNZNOI+gblHqB4kDXWZaemtfY6KXoeMMXZNT5b+P3I2hOBfW4tnWDsUfGKXSo7mSB3jiN2BP7y110c0/o97AAAAAElFTkSuQmCC)',
                    oncommand: "openPreferences();"
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      查看已安装插件
        CustomizableUI.createWidget({
            id: 'aboutplugins-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'aboutplugins-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '已安装插件',
                    tooltiptext: '查看已安装插件',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAAd0lEQVRYCe2UQQqAMAwEo/j/Lysr9LCRYKGFXEaIsE26TabQCD4IQKCZwDFx/l3U5L2zdWZ3mmoQeQq18DdJlddexfCs6kZetdFO4O0i/dS5Ii0vS3kqzKidAA1AAAIQgMBlD7OLz7vt6T2q/Qr2jIELBCCwQOABixgKHsBVofgAAAAASUVORK5CYII=)',
                    onclick: 'if (event.button == 0) { \
                                  openTrustedLinkIn("about:plugins", "tab"); \
                              }; '
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      Chrome 文件夹
        CustomizableUI.createWidget({
            id: 'Open-Chrome-Folder-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'Open-Chrome-Folder-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: 'Chrome 文件夹',
                    tooltiptext: '打开 Chrome 文件夹',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAA/ElEQVRYCe2USw7CMAxEC+IKlAPCGi4LiGvAns+8hSu3Sqo0BaJKqTzKeBw3jpu0aepTuAOrkfXfI7E5od6a6zlv+nUuHQA567BLcl8uGR84qWmKd6AWsLgOcIiGeOpU7YWYtQpshclmC/lE04YjRRz8RPGrwLybRuMX8WQjGfgEfOC1hxwK4Modxc12ImeB+QCOJinNSAJ+Nj4YancJVsRJ3KwVYT6Ay003koDPwAchjU4QoxOhuNc6vulYPuGvZ9kU4H3To+PirmF0J7mB2oHiHci9BZz23M/ey1tcBybd8d5WI07xDtQCUm7B10586BgU/wShoqr21w58AOURP/T5N51sAAAAAElFTkSuQmCC)',
                    oncommand: 'Services.dirsvc.get("UChrm", Ci.nsIFile).launch();'
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      页面信息
        CustomizableUI.createWidget({
            id: 'context-viewinfo-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'context-viewinfo-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '页面信息',
                    accesskey: 'i',
                    tooltiptext: '查看页面详细信息',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACRklEQVRYCe2WSy8kURiGj46ExZiWGDPJuK0QmcRtZPZY2ZH2iyRkFkJsZsGa1YiEiOuO32BhQ4JJCAvEbdHM83JOp6einVO6hkjI+9T7VdX7fXWqlApj3n9e+QmUxLx+M/kM9MFnqALphM0hLMEsbEOi6mTaGtwFskKuHYpWKRMmIAu6uO5ykrofvkG1RfUA9RQcgbLqGaPWDCy+KmlZBQ27xkegAnz6SOAnqEe9ehpp9mOpjPQmaMAO3gpx1UaDeu/wDdBMLEyTxNS4h9fCc1VH4wFo1i88SD9I3cIFdECx6mLAJWjmd9yrdRJa8RDuk3LClxsmoJzeB8rCauaUgsd4yAunrCD+pNKcPQFlG/GcUrnqoRh8MDOLn4NP+pAJX+6UwBxIGW0c0QX02BOL1pM0N7M3f2gqf4e6HqQtbQLQIxUBUeNmums82nPOUQ38gIdIWRGSrSCk7BmeU/QJuN+ngrnQ/yyiC/hjL/bVepJWY4cdWL+36AL27o8a02I9SXMz9/OHRhewbE/2W0/S3Ez9z1Bw7ot/iB5byRoH9RIO4T4pJ3y5EQLKuSfMbmF1cCoLF6AaK0pddF+BZrbhQRonpRXrpaylfq7qaNRbr1mj1MFKkVwANR7j3RBXPTSoVzPmqVMQS2nSq6AB1/goVIFPnwiMwQ2odwXXLCy+SmmZgCxo2Bk+DRlognKL6kHqGVBGWfWMs68ZWHHqpN39dWi4D911Oz1elXgT/wb0ndDd93G4Ab6AdMhm1xizDL9hG971Np7AXwbVkQ87EcC7AAAAAElFTkSuQmCC)',
                    command: "View:PageInfo"
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      证书管理器
        CustomizableUI.createWidget({
            id: 'context-viewcert-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'context-viewcert-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '证书管理器',
                    tooltiptext: '打开证书管理器',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABpUlEQVRYCe2VvUrDUBiG09JJF1Hrzy7eh4iLqIMX4qbSQRcHL0sUb0ArOCgoUldBnHQwPq/kC2l6TE5OkkFoed98/z/npJAomv7++Q3E7C8iwtANK2uuqmwBxU8Y14dVsUTBAHZgME6p1BXfIF1LKCYSHoNyh3gUO0QGQ6e4o1qNtMQCehkWSbiFqpFUD8xwqMGQ8nu4CsugHOVqeL8s2Te+TOIKNGyhXMG3hJfIfWhQrmrMblSe0e0b6orzPMffKjbpruGfyGM4A2fhAfyCim0gW4OuXac+ckwY4FPsAlkbMR2yxPzFB0/555B5zONQ7B1pkJ2l+VPZSbVxRUVZj+WZ3+xsjvR83GzFxIm6nrwOTiQ6cnxcpX26Hl12yXmCMTRIdzEbf8TYhrUxooNrmI/vOWrgZ4OqtvKq83kFVQdXyq+zwDqTHhKuIYNQZ4E9JmqwKB2zHfz1LnUDFtMS+ekWy/sr20WNQmPpEr1UC1OuKdMHCNEeik5ZNNWrrs6fsGi4d8xngdekm53IV6rsRY+63KGBlvAdbHkj6hr5FtBnivZu4Advd4ddV7S2YAAAAABJRU5ErkJggg==)',
                    oncommand: "window.open('chrome://pippki/content/certManager.xul', 'mozilla:certmanager', 'chrome,resizable=yes,all,width=830,height=400');"
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      已保存的登录信息
        CustomizableUI.createWidget({
            id: 'context-viewpassword-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'context-viewpassword-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '已保存的登录信息',
                    tooltiptext: '打开已保存的登录信息',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACGElEQVRYCe2UT0tUURiHj9LKtBBpcqckuQxcuLNAqo2IH0nQPkUw4jZCEJeSQvQJonKiYEKkNv5bGIELYXoevZcZB09z7swVIbz8nvu+577/zpw7MyHcXv/BCbzkM6zAdzjM0K/iv4Br0yM6v4NGBzaJj4eSr6f089M6fB9/CaahkqG/jG/MnAP8GShFj+lyDDZ+gx2EmIYIvAVzj7AT0LPehxBsuIbtg04yZ50ka7axPckvlY080vuRTvM8/wF1mAM1zM0TsHYWv2tVqbTJIjamPQLmyG5oXku4PnuN7VrfqLTJE2xMPwmYI26G5bmmuPvsK7Zr/abSJoPYmOYJ/AI3kr8ClmGIm7Un2K5lsU1i7/9fje8RtNYeuBfqvzBJd3/jZ1nmeCh+TWYlnk7mhpC6AYdvUzUMvsNLTXiWooUs6UNmk43Dv5Dt8dWwo1BUbvyIInvMYpP1kMx8+A6+a0wh9ZG9Dg7fwibLYQ61UOs6uThLHMFugD08geS/Yoc51EJPwDV9LsmY+HNbJjIFd2EApuEVHIM5B9gZSJLDdsi00OEV/KtkPIVNiscgSX7BamQ24DNUICZz5BkJq/AR/sAp1KEKz6GQamQ34BM8gHYZa6c9p6d13vyq4TbO463W56WRN4417BSP1UWf34lGmgGHNlcle/0l9yvcLuUE8qb+o+V+aTa2gWs99tbd3/graN3MrX8jJ/AXLEmO3yu7zWoAAAAASUVORK5CYII=)',
                    onclick: 'if (event.button == 0) { \
                                  window.open("chrome://passwordmgr/content/passwordManager.xul","PasswordManager","chrome,dialog,centerscreen,dependent,resizable"); \
                              }; '
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      清除历史记录
        CustomizableUI.createWidget({
            id: 'context-deletehistory-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'context-deletehistory-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '清除历史记录',
                    tooltiptext: '清除最近的历史记录',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACKklEQVRYCe2WTUhUURiGT2YGraKQUKKlQhRGv9BmNpFgLgJzEZSLCKlN4CpodRfRwtCl6xBpqRBE4qIWtYg2SS2yCHdBP0iKlaE20/PAXDyJLma8cyWY4X3O+93v3vN9Z849AxNC/ZPvDjTT7gZsi2z+ls4luAm5qpVu78Hmr/C9kJvqzevbnvmB81A9CCHMwHPohVTeq+lp76TTHPheY+6Rq3nzHposgo39loeJ+2EVzH0t+xu8GTJTI5XuQxFsJMvEl0BdZlgB85/wTN/5AQo+gxLYdAAfhPS6h1hdYPgN5ofwTHSOKt/AorP4cUiVhBDMu/1XiVUvQ7oTfcRVq4GZSQjB4jaZJN4P65WEtUVcIVa6c955UQ2+v0dMtMgf/DbsgM2UhH8X4XznLpCvWEeZ8QEsMId3QaoCwWtogfVKwtoiXpTjKbwineLpeSjBDLRDqpME38F7w/hGGiTp/SK+BEegIjXx9ARYxIPXQawKDD+gBOOwCzbSLZI+47N9xFVpJ7PGwELuhn+dLOj1OPnNmp/n3ip4ZrrxLSleRJFKNn+M74ZGuAixDnLxBXzuLp6J4kUsU/EsmHuI2+gOrlzUSwJzT3B/vlg2suEYpSw+jz8F4894G6gRBnOz+D7IXPEiilT/CWdAXWOw+S/8GNRM8SI8kKfpdAKWwAVcx2uuJjpMgA39iX4sx6N4booX4UKm6bwHclX6OtyFQ7l2jpq5E56BKPWfh38BdZekkuhEvfUAAAAASUVORK5CYII=)',
                    oncommand: "window.open('chrome://browser/content/sanitize.xul', 'Toolkit:SanitizeDialog', 'chrome,resizable=yes');"
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      放大 (Ctrl++)
        CustomizableUI.createWidget({
            id: 'zoom-in-ToolBarbutton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'zoom-in-ToolBarbutton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '放大 (Ctrl++)',
                    tooltiptext: '放大 (Ctrl++)',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAB9klEQVRYCe2VTy9DQRTFB1EWJBa6sbCnvoZaiSZtQ2IvVJrUh2DBwhewYM8XkbBoNUKKnUgkFizE3/odmWkaeX3evDYaSeWcnmvuPfeOeW/KmN7PPz6BIfa+DI/gFXywVHxIrJxqCDuPHC1vYP0XXpPPwo6hj05b0A2uEJdgCo5bzqAb8Ay6ul3iAdg2Numgpq/oOgxrqlyRGtXKs0PcFhZwf8IXmIZRoVp55J2PavpZl2ChBvWXrKC+WMMg7yU6CL2xhEMNymg/DILyYlBOj6NKQvk82kCrZo0CG2Ss7qE6SsQLH1TLixjXS3Fk6ui0+6kQh/JiqxLdDuXPWxWErT+RlHkEbYbWwthcO8ovqn1EG4j6CHT/ZVIDaccYdQO3duKkVSfamGPYmnLO63ppzUTdwOl3tTGzVuNI2ppOrHqJu4b6etWVCjLr8YhBOXmqJJTPo95I4KhBNSihvihgkFe3aZA4FjK41OQdnYNRkaaw7a9iepgkH/dQm3hD16GOFgmEckUyr1CebTQ2JnBeQDW6s6q4Qqx/vdPosGUK1ZreF9WIu6xpQ4g/mocfYx+DOXgD67/wmnwWxkbQcNdsiEC34wCtwmdLxfvGmEWoGiQewobH6+jh6g3Xy+VeOI+Da7+0QAsNL6NJ2BWsMrVrw5ndw9+ewBdBVo1PVRcjfwAAAABJRU5ErkJggg==)',
                    oncommand: "FullZoom.enlarge()"
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      缩小 (Ctrl+-)
        CustomizableUI.createWidget({
            id: 'zoom-out-ToolBarbutton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'zoom-out-ToolBarbutton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '缩小 (Ctrl+-)',
                    tooltiptext: '缩小 (Ctrl+-)',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAB6UlEQVRYCe2Vzy5DQRjFB2lrQWKhGwt76jXUSjTRhsReqDSph2DBoi9gwZ4XkbBQjRB0JxKJBQvxt35HZqShaWduG42kck7PZ+Y7Z8bcO2VM7+cfn0CCvS/BA3gF7y1V71NrTj2UnUeWyCqsteA18/OwY+gjaRO6hcvURZiCo5ZT6Do8ha6vRD0A28YGCQp9Qddgs1DNFehRrzzb1G1hDvcHfIZp6Av1yiPvrK/pZ1+cgUuov2QZDcUqBnkv0BgMxiIOBZyg/TAUehwVTMrIod/wDctYxw6qo0SC8E63vIhxWaq9qaPT7ie8Hb8bdTuUcfZ7qvXIIy0yD6H10Fgz1vcO84t6H9Bv+D4C3X+ZFCDtGH03cGNXHLfqRBtrRtcndV6XpTHju4Hjr25jpq1GkbQ1HVkNEncN9fWqKxVkplmeCqpHmEODEcdxCRVQREORxyCvblOMOhIyuBTyhs5AX6RpbPurmAyT5OMOahOv6BrU0SINobkCMy9Qni00MsZwnkMF3VpVXabWv95JdNAyhWpM74t6xBJj2hASjvrFD7GPwCyswloLXjM/DyOj0eIuLEGh27GHVuCTpepdY8wCVA8SDc0Wj5YY4OotrpfLvXABB9d+a54ILX6CJmFXsMKqXVuctXv42xP4BOYNh1fL8HhYAAAAAElFTkSuQmCC)',
                    oncommand: "FullZoom.reduce()"
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      标签切换
        CustomizableUI.createWidget({
            id: 'moveTab-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'moveTab-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    oncontextmenu: 'return(false);',
                    label: '标签切换',
                    tooltiptext: '左：切换到左边标签 | 右：切换到右边标签 |滚轮↑：切换到左边标签 | 滚轮↓：切换到右边标签',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABXklEQVRYCe2Vu24CMRBFET2ipEiZgv+CpCQRVXh9Z5q0KfITJDnHiqW1AGGbXaRIXs3srO25945H3t3RqF2tA60DeR2Y5KUlWTWYhCAODjx84o94rs1J/ML3+E32Avr7z5fEXHsi8QcXKweP5bYDIsmRKCGhyMSIlWNbhCRZgEAJSnYONLGqIjZQ9CEOTTA34EbklDtMXrq9sWCigAXPfVm3CDXO8r4y66HpWxzaYG5IbjVODqYTLphgYkAMcJNbDbVWkb97UGz/vdxClmOqmOJGwl1NTbWD6DN32+LufQUZDmLdb4uaiYgTsQgTk8UeBnK6QVuv1llKF4Yown/CVfFYUbcIgXG+NsqRLR5FLMJWCZQgzpdG/6RyyCVnEV6AQAkkKgKTLEasHL7qTJXbGogkngs/pwyzTEFxuhxZoEtJduKdxRmeaw8kfuAWQrjdJhUUNZgKmQZpHfjvHfgF6a10MEFUqzkAAAAASUVORK5CYII=)',
                    onclick: 'if (event.button == 0) { \
                                  gBrowser.moveTabBackward(); \
                              }; \
                              if (event.button == 2) { \
                                  gBrowser.moveTabForward(); \
                              };',
                    onwheel: 'if (event.deltaY < 0) { \
                                  gBrowser.tabContainer.advanceSelectedTab(-1, true); \
                              } else { \
                                  gBrowser.tabContainer.advanceSelectedTab(1, true); \
                              };'
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      缩放控制
        CustomizableUI.createWidget({
            id: 'zoom-control-ToolBarbutton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'zoom-control-ToolBarbutton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    oncontextmenu: 'return(false);',
                    label: '缩放控制',
                    tooltiptext: '左或滚轮↑：放大 | 按下滚轮：复位 | 右或滚轮↓：缩小',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACUUlEQVRYCe2UQUtUURTHb4kaouCi2cw3qPFz2EoMVBLcRyqGrtrOphBd+BVqIbioLzIQgTakQ+oqSIoWuRAtst9veHdmlFHnvTckwQz/3zvnnnPPuXfeu++F0Pv9x3dgkL3PwTvYhx8J+m/xzTkHt/uapuUhnN/AAfkp6Jru0OkVxIV38JehBPcTxrAr8BHivA38Psitl3Sw6Rl2Ea5ram6JOc61Zh0/lyap/gOnMA6dyrnWWDvRadHleQMEPoP/5ClW6UdWDSTox7jW8DwX/Rq2H1JrlgobbGPvgnIsRwwKEKVvzJwY93FUcRzPYFNriwqLn2OjHH9hoN3DFhP0jcUc4bo8mMY366OUlxrzLX6AjSqHEEahAuZ8/0XfmLlyaP58O8x9aoY6946ZavEw9rJc6ANB86JvjNAFjTAy/xPbUHyejcAVju+/KRtoWxli0LoxfWOEu6d2j+AF7YsQn/l7fHGTxsw5h3BdJa7mdrGpddUh/E4nm1aw3nbRNxZzpOrKdQhnaWFTP6++UgyDYzliUIAofWPmxLg1VRzHM9jUGqAifoiW8ZXNIuXQ/JVDaGzOPMOwwEW/hu2HTHpMlU1+Yx9Bpxpn4ink+hRTHwpcvoGb+IVdBG8tpq3MLZE5A2vWsJlVpHIPbPQ1sfo7+B6uh9h7CSWsMc+Lc2SDmBvCpFfr4hXKR2EaDuH8Bg7IT0FmtVs8NhvE8e14g63CSYL+6xDCE3AOJpuuWzxbxxRVvcU9XPHApbhx+acu0MLFt7EFuBU9Y9VbW5y1e/q3d+Av6qO9kNf4nEIAAAAASUVORK5CYII=)',
                    onclick: 'if (event.button == 0) { \
                                  FullZoom.enlarge(); \
                              }; \
                              if (event.button == 1) { \
                                  FullZoom.reset(); \
                              }; \
                              if (event.button == 2) { \
                                  FullZoom.reduce(); \
                              };',
                    onwheel: 'if (event.deltaY < 0) { \
                                  FullZoom.enlarge(); \
                              } else { \
                                  FullZoom.reduce(); \
                              };'
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      管理Cookie和网站数据（除非您一次打开Firefox选项，否则打不开Cookie和网站数据）
        CustomizableUI.createWidget({
            id: 'siteDataSettings-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'siteDataSettings-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '管理Cookie和网站数据',
                    tooltiptext: '（除非您一次打开Firefox选项，否则打不开Cookie和网站数据）',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACR0lEQVRYCe2VS0sbYRSGRzG1RY1iVyY7L9kq2QV0k5VS0f6CSnErgqCCKKU7V3Xj/ceImxjsJtGFG1G7SrpqvaCFJur4vHSmM04SJ2pAFxPe5zuX73wnM2cmxDCCTzCBYAIvPIG6Kr4/RM0AJCAOEYhCM7h1SZCDPGQgDSkowpMU49QGnIL5RHR2nbPdUFaVJrBA9RcIgZRl2YZ9OIGf8BvcaifogC7ohSTIYowCy1fDMBbBVzNUmKDRLWMrXj17fuqhYBXUSz2n8H11RIWKB7G10hCN1PMQe0/196J/gUYo742WGtFo9dFELLey0ZWKG0pW4LmPYI0e6qWegtBRuZfQLtJzC1mlWew27IP9Ev7CPwOpjeU96CXsxPZBEnpBKrDYEy33nWw7MnFFDFvLn6F6Cto6anDcEm+YzDxMQj8kIA5RiEArhEE6Z7mAHOQhA2nYgRYYg6plUunlLTm36t2B5Xtz78h7+ygm7ch7yNkxDN1B0UpMYJugGWZhF9zPUv53cjOgGtVO4EsFFk0CU510lULV4yy3oNjLFPkw6FFMY737inX2M3uSYiH/QX6wa8IISMMsuoM/2Cs4AO2XQ3tX7IsU9gNIH1lUf4z1lX0311SuQDd4NUpiC/TiCfn2BZP+rx68NbgBXYCmhuuvBUr07HRIZIm/wSfohy5oA1vyldPeGMkl2APT4i92Dh6lGNWbcAp2o8dandXfsSZBm1LVlaZKMiEyA5CAOEQgCq0QBumc5QJykIcMpCEFRQgUTCCYwOudwB1AR78MdDBNnwAAAABJRU5ErkJggg==)',
                    onclick: 'if (event.button == 0) { \
                                  window.open("chrome://browser/content/preferences/siteDataSettings.xul","cookie","chrome,dialog,centerscreen,dependent,resizable,width=700,height=560"); \
                              }; '
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
//      开发者工具
        CustomizableUI.createWidget({
            id: 'toggleToolbox-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'toggleToolbox-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '开发者工具',
                    tooltiptext: '打开开发者工具',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACN0lEQVRYCe2Uzy4DURjFP/+CFAlvoJYNYlesiS1PUGFRC8/AU7BsV+JPWFh5AB7AogkR0ieQSDS0kYzf6ZhEmZl7RyQS6eScnrn3O9+ZmXunY9Y9uivwT1ZgkucI4APMhF6He4Z6Ebqw8mG4+NBI5jmZhj/CCF03sAmXYBrOKGoFVtEIy5yoVxnKYpgNJ9gVWkNzMAkDFJ5gC47BCOpRrzKOo0lf3cKoxme0ANOwSFHeS/Qr1NtgUvUy6oU5XK9QTSVzH7tmJu8OGod1JgOoTGVzmgwt4R1lNVRQH1xhCuACTELVwptUtq7BMB5HTCushuagC+MY3uAj7INJUJYylX2YZNqkIIPPvmNtY41f9ZyiLhQwNKD8G2gHZhm9QBVL5n/sY1VPGfVB9D68YNY1EbNhfq+hgg7QLLjHrL486gtdQz265lAvXf1wCGbFFA15qJvI/AmmbxAOwDY+7892e8b9s4VFT7KH+kLZ6ol9z6L9aZFWhC6cYVDYKuoDZSpbPSVLOKoW/l/rZjYBk6Cle6KowDHUBWXVLcyuoInIUanBAJ7DHhiHRSbluURdUIay5Fe2rpHaU6DagGrQnnH6DbsWPs0O6oIyAkyx+858LNaZVZOWWHvHsANXjFRfQNOg3hYGeUuW8aha+JR163wfxhn7fH4n8NUtzKigmTFKxy1swiUYYY2TAJ7CNCxTVO8NOgp/hBm6ivAz9hnoBsqoC/MYlIH8HvTl0w3oK/h7qd2k7gr81Qq8A41ngVG1G/DpAAAAAElFTkSuQmCC)',
                    onclick: 'if (event.button == 0) { \
                                  let ev = new KeyboardEvent("keypress", {bubbles : true, cancelable : true, keyCode:  KeyboardEvent.DOM_VK_F9, shiftKey : true }); document.getElementById("main-window").dispatchEvent(ev); \
                              }; '
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
// 窗口置顶
        CustomizableUI.createWidget({
            id: 'PinOnTop-ToolBarButton',
            type: 'custom',
            onBuild: function(aDocument) {
                let toolbaritem = aDocument.createXULElement('toolbarbutton');
                let props = {
                    id: 'PinOnTop-ToolBarButton',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: '窗口置顶',
                    tooltiptext: '窗口置顶',
                    style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACAklEQVRYCe2UOy8EYRSGP0TBrrjEErcKcQk6olRIJDSiUUiWbK9Cq9Rr1Kj8AImWRCQuibivSxQqkY3CLay4PG8yG0PWmrGzU4jJ++w533xnznt2ZnaN+T+8vwNNblrmuCl2UNtJzQZkwwr4qiBuUXizmCD6qlljjMwviM+g3LchIpbhDbEOeuERNMQkMaNqpvsdyGzEfBy9pBkfIg+TfZD5PPGrMj7EDI4yPyIGIJk8GSKfzmFYhEO4hii8Qhw6IJUG2Uy8mGPkrtRNdQz0TZMxzt5PaqDgHHT9E7EFHGmUqsTkq+RhaIQSaIM+yIJUirB5BzI/JbaDIwWo2gZdeEUMgRsVUrwAul7MkReAK6nJOleogZ55JbkT9VB0CbouRuyHX8s+xDFdUg2Ry/40vILMl40xNZC2SumwA2q6S/zucQywp5oX4hRoIII3kukurWSgqDXLT2plpf0zYkYkgwc6yyTZEEFr757ouUJ0lKnMb8kVv74TtdZ5/dxIvZNePJnJdJO29bAHWmsoDcfSDPGhc0tEz1RFJ7t5EWupjI99kKGG0HrNWg8TPZHMT+j0BltQDHaVszgA7cesqD+tPPK09ZN5wsA+RJyTXcaDw26+Q79SSKViNrcgDGmrmg4noNuqZxsid6ICJ0VOag4pkvkRsQJ8l8zdfHPfB/w3/Ft34B05r4vKMcttEgAAAABJRU5ErkJggg==)',
                    onclick: 'if (event.button == 0) { \
                                if(document.getElementById("main-window").hasAttribute("ontop")) \
                                onTop=false;else onTop=true; \
                                try { \
                                    Components.utils.import("resource://gre/modules/ctypes.jsm"); \
                                    var lib = ctypes.open("user32.dll"); \
                                    var funcActiveWindow = 0; \
                                    try { \
                                        funcActiveWindow = lib.declare("GetActiveWindow", ctypes.winapi_abi, ctypes.int32_t); \
                                    } catch (ex) { \
                                        funcActiveWindow = lib.declare("GetActiveWindow", ctypes.stdcall_abi, ctypes.int32_t); \
                                    } \
                                    if (funcActiveWindow != 0) { \
                                        var activeWindow = funcActiveWindow(); \
                                        var funcSetWindowPos = 0; \
                                        try { \
                                            funcSetWindowPos = lib.declare("SetWindowPos", \
                                                ctypes.winapi_abi, \
                                                ctypes.bool, \
                                                ctypes.int32_t, \
                                                ctypes.int32_t, \
                                                ctypes.int32_t, \
                                                ctypes.int32_t, \
                                                ctypes.int32_t, \
                                                ctypes.int32_t, \
                                                ctypes.uint32_t); \
                                        } catch(ex) { \
                                            funcSetWindowPos = lib.declare("SetWindowPos", \
                                                ctypes.stdcall_abi, \
                                                ctypes.bool, \
                                                ctypes.int32_t, \
                                                ctypes.int32_t, \
                                                ctypes.int32_t, \
                                                ctypes.int32_t, \
                                                ctypes.int32_t, \
                                                ctypes.int32_t, \
                                                ctypes.uint32_t); \
                                        } \
                                        var hwndAfter = -2; \
                                        if (onTop) { \
                                            hwndAfter = -1;document.getElementById("main-window").setAttribute("ontop","true"); \
                                        } else { \
                                            document.getElementById("main-window").removeAttribute("ontop"); \
                                        } \
                                        funcSetWindowPos(activeWindow, hwndAfter, 0, 0, 0, 0, 19); \
                                    } \
                                    lib.close(); \
                                } catch (ex) { \
                                    alwaysontop_log(ex); \
                                } \
                            };'
                };
                for (let p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
    } catch(e){};
})();