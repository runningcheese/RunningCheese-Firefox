// ==UserScript==
// @name          ExtensionOptionsMenu.uc.js
// @description   Symbolleistenschaltfläche zur Add-ons-Verwaltung
// @include       main
// @charset       UTF-8
// @version       3.1.2 Auf Grund von Problemen, wurde die Fensteranzeige der Erweiterungseinstellungen entfernt
// @version       3.1.1 Öffnen des Erweiterungen-Ordners funktionierte nicht
// @version       3.1.0 Unterstützt Fx 57 oder später. System Add-ons, konnten nicht deaktiviert werden
// @version       3.0.10 Fx52以降で右クリック時に出る既存メニューを出ないように修正 (2ch該当スレより拝借)
// @version       3.0.9 表示したくないアドオンを設定できるように(コメントアウト内の説明参照)、選択アドオンのidをAlt+左クリックでコピーできるように
// @version       3.0.8 再起動に関する修正
// @version       3.0.7 メニューにアイコンが出ていなかったのを修正
// @version       3.0.6 互換性を考慮して書き換え デフォルトでボタンはカスタマイズパレットに配置
// @version       3.0.5 ツールチップに操作法を表示するように コメントアウト内CSSを更新
// @version       3.0.4 一部アドオンの設定画面が機能していなかったのを修正、メニューパネル内でドロップマーカーが出ないようにするCSSを追記
// @version       3.0.3 ボタンをツールバーパレットから自由に配置できるように変更(メニューパネル内への配置にも対応 ※コメントアウト内のcssを追加するように)
// ==/UserScript==
/*

Schaltflächensymbol:
Linksklick: Erweiterungsliste anzeigen
Mittelklick: Firefox neustarten
Rechtsklick: Add-ons-Manager öffnen

Erweiterungen:
Linksklick: Erweiterungseinstellungen öffnen, wenn vorhanden
Mittelklick: Internetseite der Erweiterung öffnen
Rechtsklick: Erweiterungen aktivieren/deaktivieren
Strg + Linksklick: Erweiterungsordner öffnen
Strg + Mittelklick: Erweiterungs-ID in Zwischenablage kopieren
Strg + Rechtsklick: Erweiterung entfernen / Deinstallation rückgängig machen 
*Nach Firefox-Neustart kann dies nicht mehr Rückgängig gemacht werden.

Bei "blackListArray" in Zeile 50 können Add-ons, die nicht im Menü angezeigt werden sollen,
mit der ID des Add-ons eingegeben werden. Sie können die ID mit Strg + Mittelklick kopieren.
Einige Systemerweiterungen werden standardmäßig hinzugefügt.

*/

'use strict';

var EOM = {

	showVersion:  true,    // Versionsinfo anzeigen (true = Versionsinfo anzeigen, false = nicht anzeigen)
	showAll:      true,    // Alles anzeigen, auch bei Erweiterungen ohne Einstellungen
	showDisabled: true,    // deaktivierte Erweiterungen anzeigen (deaktivierte Add-ons anzeigen)
	autoRestart:  false,   // Firefox nach Installation bzw. Deinstallation automatisch neu starten
	iconURL:      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAACkUlEQVQ4T43T60tTYRwH8HMQ9QQJRSBJ50xU8BL1QpJMsbxNc162edxcYlAoZdkFh6gZurF5WV6nc7M/oBdBb7q9DSPEVBDbZtN0c5tzNymolwXht2eDhVO0Dnx4Hn6/5/me8xx4KOqQR2rcYfjpIC81BpXiqWBnxUSgpWQ0kHrY+gN1xdOdu/XTQfDGIMSGAET6AMpG/TbhiD/uv0LqTYF7cmPgN2/wQzzhh2jMB+Gwz1I65I3/Z8A1o5eRTXqP85M+pVTv260Z86JieNtcMridXNjnZvI1Lia31xV7IIgf99AKg/e1wrAN+YQHtXoPJKNbqBrewlWdG6UDLlzRupCv3sTFns3vFx47SqJCFHoPoyAb5eNb4MlGyYgb1UNuiHQulPW7UKRx4rJqE5d6HMjpdiC7066mRFpHvFTnbCHuSJ84E+rIJumQExKdEzVE5YAT5RoHCnvsyO3aQHb7Os63rSHrwRoy76+qqErNBi/ut4PYrdFsKCWDDoj77CjvXUdu+yqyWleQcsuK5GYrBE0WcE0Wm6DZmsk1W7VEI1XRu6YUqb6gUh22W9BhQ8ZtCwQ3PoEjQuM+psi5SSBNCR/Zusq7bSju+IyMpmWwjUvgrh+hcWks6scVKs0tBQ/NSG5YBKtYNHOKRRxt4WUogKufTwmh8lqXU9MaFlY42UcLJ5tnOfk8yPwov0j/LfGNUIe/huXnYrm6uTiOn2UI7GEjcxMxTrwifu7rq6KOw0o+MAT2SI8sYGtnaVJ/s68fFUCfONd2jK2e+cFWv0dY1bu+mPiTocsTmyR8kU56X//2wmtmuiMvoMkkdEkEp3K0N08XPZsKScwzdNB0zFlSz0pIaxBG6mQ0JBU/1yXmm878AbFQoHrb98HyAAAAAElFTkSuQmCC',

	blackListArray: [
		"clicktoplay-rollout@mozilla.org",
		"firefox@getpocket.com",
		"screenshots@mozilla.org",
		"followonsearch@mozilla.com",
		"formautofill@mozilla.org",
		"onboarding@mozilla.org",
		"shield-recipe-client@mozilla.org",
		"webcompat@mozilla.org",
		"activity-stream@mozilla.org",
		"presentation@mozilla.org",
		"aushelper@mozilla.org",
		"webcompat-reporter@mozilla.org",
		"e10srollout@mozilla.org"
	],

	sort: {
		enabled: 0,
		disabled: 1
			// 0, 0 - In alphabetischer Reihenfolge
			// 0, 1 - Reihenfolge wie im Add-On-Manager
	},

	init: function() {
		var style = `
			@namespace url('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul');
			#eom-button {
				list-style-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAACkUlEQVQ4T43T60tTYRwH8HMQ9QQJRSBJ50xU8BL1QpJMsbxNc162edxcYlAoZdkFh6gZurF5WV6nc7M/oBdBb7q9DSPEVBDbZtN0c5tzNymolwXht2eDhVO0Dnx4Hn6/5/me8xx4KOqQR2rcYfjpIC81BpXiqWBnxUSgpWQ0kHrY+gN1xdOdu/XTQfDGIMSGAET6AMpG/TbhiD/uv0LqTYF7cmPgN2/wQzzhh2jMB+Gwz1I65I3/Z8A1o5eRTXqP85M+pVTv260Z86JieNtcMridXNjnZvI1Lia31xV7IIgf99AKg/e1wrAN+YQHtXoPJKNbqBrewlWdG6UDLlzRupCv3sTFns3vFx47SqJCFHoPoyAb5eNb4MlGyYgb1UNuiHQulPW7UKRx4rJqE5d6HMjpdiC7066mRFpHvFTnbCHuSJ84E+rIJumQExKdEzVE5YAT5RoHCnvsyO3aQHb7Os63rSHrwRoy76+qqErNBi/ut4PYrdFsKCWDDoj77CjvXUdu+yqyWleQcsuK5GYrBE0WcE0Wm6DZmsk1W7VEI1XRu6YUqb6gUh22W9BhQ8ZtCwQ3PoEjQuM+psi5SSBNCR/Zusq7bSju+IyMpmWwjUvgrh+hcWks6scVKs0tBQ/NSG5YBKtYNHOKRRxt4WUogKufTwmh8lqXU9MaFlY42UcLJ5tnOfk8yPwov0j/LfGNUIe/huXnYrm6uTiOn2UI7GEjcxMxTrwifu7rq6KOw0o+MAT2SI8sYGtnaVJ/s68fFUCfONd2jK2e+cFWv0dY1bu+mPiTocsTmyR8kU56X//2wmtmuiMvoMkkdEkEp3K0N08XPZsKScwzdNB0zFlSz0pIaxBG6mQ0JBU/1yXmm878AbFQoHrb98HyAAAAAElFTkSuQmCC');
			}

			.addon-disabled > .menu-iconic-left { filter: grayscale(1); }
			.addon-disabled label { color: Gray !important; }
			.addon-uninstall label { font-weight: bold !important; }
			.addon-uninstall label:after { content: '-'; }

			#eom-button[cui-areatype="menu-panel"],
			toolbarpaletteitem[place="palette"] > #eom-button {
				list-style-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFHklEQVRYw8WXXYhd1RXHf+vcOxPj+JGYBow6M2rb1FISI77EkEDEB1GiEkdN24ciCYXSmtI+BBJBBdtEiYhCDCgkioIPmsSvByUY6BQ1pgi2Tj+gLU2aGUJJp5PpfNzcmXv3Xn8f9rlfmdwZkgm4YLEP+5y99n+v9V9r7WOS+CaleDGLNu79b29mehTjXonFEosEHdGpRteoi9Mh8l5w3uzfdu3p89m4bcdx/vjMzRcOoG/v6awjs5fM2CCBk1QSBhgszWB5wbTOjeV3Pvefn/9u2zJvZy+7UAALCra4YNyCoJ0qHwvwnaKx5BKHQFZfJ+WbKk1LjTkA0TGXtQv2QKXqkyH4V8hLyo8qCeT5mFTOeIw+UA0+cUkBHNy6bCpE/SxG/UquL+USDnKBK+3tOurRt4aoJ/t33DB1SULwo72nFgGGo05j7K2t1+978MVTtwKr5BhSLfZRUR8f2d79xl27Brvu3HlyUXRwCRd4JHMxBkQAm6sO/HDPqbuB7cD6mrsliAJhuDukw+cq3Mm/EdHB3RBOjAmERH8Uz37x25sPz+qBvheGso5idqk3J4r17gKYHUDR6ALW455zKzeS571yxje4J+QNMKlICJdQ4kcdrFzr5uSAQRF3FIVonKCWedTi2gQAb31ufEwqVJ5GicIMAH27T3wLoBp8/IPHv12RHNyIngA0ZRlOKwAElqPLcg9FgTt47gV3EWPC5K4GCe/9zb+6O4q2p5DZ9wFi1J+j9NjCThuTFc5GjyjtWI85ZvVnCaKLStWpBNU1OgQXMaoOuh42iCde+UGxmFyjzZl4wPMAG9yYuX94YNt3X924+zgKyYDRcGWIolJxShWnXBFTFacaEwld6dTJ1wCcMGOX4G/AL4AfQ3MI3O+JWDKehk4Tj93/9D9WZcUCeGo0LnF2OjJRFpPlyFTVCVFoJneStcaLl7HstcF9K2LvloEB4H1gaR2AXItjDhjLR1gFrPQQVY2yibOR/5cipelYj6PlgG32GnYGs4GT+1ZEgJP7V072bhk4UKvCNQBLlPvecjdkGRaqKoyVIiOTgXLFcUFmTSdsEHw2mQSVmidO7l+p3s1fxToAd3VYk/+EmJiMDI8HJsspl7LMUtAu/AJVBcKMnloqN3pBCD6dAZYlNo+OR0YmqoSYNjYjlb+Lkw5QcdZm5CGOWGZLQ4Dh8Sqj4wEDChkBV4E5wzyrLEK6os3eIQGI/j+5MTJWZXQiYIkDnyGOYPZUSvyLlqtAq4GPAHo2HbsO2AgsAZ7OQ6D3y9Nh7ehEIEt1IeI8P/j26nd7Nv3hKeZ/c/5pzyPHpoF/Aj8BNuTzCUA16PXxydBL9FusADh/Aft9z0NHu8iyVE/nJ8uAnefMzbwPdPcdXZoXotHBg2tCT9+ni7HsTF6H2+c5TOQGi8DVuc4lcfDQ2mILO4cOrRluSRVJRn7XmynHwfab8SVQagJwpeAOpEeB6+f3Y+JCGbQh4c6h99a9er4X3Q9+ehhXCdg1v1uxWpr9ufrXdsuG3lkbkP7eZl1D5wTgylquMa36y+77+s8b6+77+rtxbW6zrqaF8wKwJAUz6xz+/NcVYvikzS/Qw14Zu7/zqpuuMLPLa1q87JouD6WHQHcz2+8TGjIzK567eQ7qMuDK6ZE/dU0Nf/HGgmtWLLBs4e35u1pKdMTy8Pfi1MiNtZRKjS0UvHzmpqxrYbF5vkkKyP/tofQEkLWk4bkAgK5Uy+dViltYlTens8A4MPU1jYiz7Re8VU8AAAAASUVORK5CYII=');
			}
		`;

		style = style.replace(/\s+/g, " ");
		var sspi = document.createProcessingInstruction(
			'xml-stylesheet',
			'type="text/css" href="data:text/css,' + encodeURIComponent(style) + '"'
		);
		document.insertBefore(sspi, document.documentElement);
		sspi.getAttribute = function(name) {
			return document.documentElement.getAttribute(name);
		};

		const XUL_NS = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';
		var btn = document.createElementNS(XUL_NS, 'toolbarbutton');
		btn.setAttribute('id', 'eom-button');
		btn.setAttribute('label', 'Extension Options Menu');
		btn.setAttribute('tooltiptext', 'Extension Options Menu');
		btn.setAttribute('class', 'toolbarbutton-1 chromeclass-toolbar-additional');
		btn.setAttribute('type', 'menu');
		btn.addEventListener('click', EOM.iconClick);

		var mp = btn.appendChild(document.createElementNS(XUL_NS, 'menupopup'));
		mp.setAttribute('id', 'eom-button-popup');
		mp.setAttribute('onclick', 'event.preventDefault(); event.stopPropagation(); setTimeout(function(){document.getElementById("toolbar-context-menu").hidePopup();}, 0);');
		mp.addEventListener('popupshowing', (event) => EOM.populateMenu(event));

		function copyList() {
			AddonManager.getAddonsByTypes(["extension"], function(extensions) {
				Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper).copyString(extensions.map(function(item, id) {
					return (id + 1 + ". " + item.name + " [" + item.version + "]" + "\nID:" + item.id);
				}).join("\n"));
			});
			XULBrowserWindow.statusTextField.label = "Add-ons-Liste in Zwischenablage kopieren";
		};

		var mMenus = [
			{
				alabel: 'Firefox neu starten',
				label: 'Script-Cache löschen',
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgElEQVQ4jY2RfUzMARjHv7tODnmJOxGm3LnKe3fnoh+W184ypjmZpZrQFLOSstns5g/cIXq9fuqQUd4tx0jFcLVRrSxNNE2bsUYY5Sr09Y9u2Nz6/vk83+ez5/s8gBvFAbKCUKw7Hz6o3KrDDHfev5Qmx/BCAVvKklR1b8rSWHMovM+ignJAw6IeEZU7FC3tNxeSjWvJF8l8Z0/tu5eyqKloiWd6MjDELcCqg/5hqk8bm8LIulCyQiCrjGRVCjuupbN04+Tygyoo3EIypkNVluDd0OsIJe+F8KV5IjtFFXkhnM7iRF5eM+aaEfBwDeTpEGDVQcgLwTyTAl4AIGqhrNg+uvlzaTBti3D0nEGa2W6ZRNoW87VpAfPnwuAC2I1eLa3FMT8cphVOUQtNfz1XA1XJqkH3bQJWAkBJhMcZ54mp/Hl4Fq8aPM+5AFUxsi42JLFR3PwtQ40J/ySShAHS31sFPt873smjKjqihr5yOSo3DH7NO2vZkm/8njUb+v/dJg6Q1e6Sv2FOIOs3jfzqalxYjlM/CrXsvrWVxSs9TwFAjh7q0wKsohbyft8RJcZWJ4zp+nTAj4/WD/v45+vCWtN9SHsk2zINLJiPvVYdNjRbo2mP9X9i8cM4ADAp4FUoINYmIP6kgNV/5bwaIS3tOaEmr0Tybe5qPtg553N3dRa/1Yi8ETvNYQ6A7/+iAQDMAfC9bZQ97jT7k0ULyevR5KUo8qzAnrt7WJ6oeSpqMdMtRNRCXrJMkl27bWTHh/3jfzJDSWb4s/eYmg37QliwALvdAvplCcJUR8yI953mKayP9/5ycRls2cHQAZAMCGDyw6grBumz4qUS83ENgtx5fwEzyhRmLMK7zwAAAABJRU5ErkJggg==",
				oncommand: "Services.appinfo.invalidateCachesOnRestart() || BrowserUtils.restartApplication();",
				style: "min-width: 260px;"
			},
			{
				label: "Erweiterungsordner öffnen",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADEElEQVQ4jY2RXUiTcRjF/9JFpBAapk5NnWzzI5vTbb5uuunrtFm5XCpi7tVEs0zU9aFFk6wmiV9RfrRqkRgZhVIZSjXUNDPCmaamlZQQ0gdFVxGFbu10paXzonN5Hs6P5zkPISsVniYjArXAzv8vceVyIi8A71g7hNW9k56eQsfFEYeQtUlOzqFJ69dzV4uuIbw4LxLB7CCyfNDGccgujcE9rqgvM4D6ZAjmvKjm+HYUbWShLYxn65Rsfro87iHwI9H5YBUYsankGqQXnkNycQyBlSaIK+7i6x4pblFBn/e6usMUswVP4vgzjKMr6y/ANYhFonIR1WxGTMsrSI2TEBnGwG8cgUjfjY+7JeiL5eM8zx/jieEYUYThPhVireP6Zi4iHEhk9im/Q20vvAuvQNBoRkjDMJry9mM0NRrv0yi8U0fgTZIIU4lCjNECm1kuQDXbh/m7RVzxARJ/pJLI8uF3oguc+iG0ZqSiR03jbbIYw2oRLhdSMCvCYIoIfqZycfH5twUHIs1d2LDXgI3F1+Bf8xjeVf1w1/fAu/QmprcJUX9UCk27EvcSQtEZHjRo94Z18qwPXsc64FczCK8zj+B2+iHoWiNS9BVo04hwSB+FlNZ45FRIoaigPtgBjuZtvlXZUIDx4cNIb2rGhvJOfDFrYOpVIePmVqS0JkBlVEDZSEN8Ujy7FExRurIMx0N0tdrA0S5jPKxzJdA0n4OHrg1fzAxeDqpxp0sJ7VUaygYa7JKA64SQNUuAg7t9yw06PoY7d+F1vwbWuRL8nNmHH1M5sEwzmJ9Ih2VUDX1LLGJrYsDRhsAjj3t7CcAkuYW2N9LfrF91sH4qg3VOC8tsAb5PZMMyzWDApMLOszLIqmQ2ySkZhMejEFAknFx2/8EsbtCD1sSpoY5kWOe0MF2NHzhTxPv9a1KD+907EK4T2/ilIoSWRdrc0tmMk8Rli12JRzTstK4rCfML74ttN+qo5NIstqq3ha46fThY4Ug7J7MY7rfgYspCBM7OduFFZW/34uWm+vivOgxw9HSiXPgr7T+DX3N5gyCN2AAAAABJRU5ErkJggg==",
				oncommand: "FileUtils.getFile('ProfD', ['extensions']).reveal();"
			},
			{
				label: "Add-ons-Liste in die Zwischenablage kopieren",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABlSURBVDhP5Y5BCsAgEAP3i/1AP+D/zxUlwWBXXQueOhAQzQStcN3p2UmVFK80C7QGH1aEBniOBPqhgRnsQB8P8KzRe+i/+YHCO+htQNPjdaB/G4D6hoWekFzQohfUxngSg4pglgGUsQ0ZR4jGSwAAAABJRU5ErkJggg==",
				oncommand: '(' + copyList.toString() + ')()'
			}
		];

		var menugroup = mp.appendChild($C("menugroup", {
			id: "eom-menugroup"
		}));
		mp.appendChild($C('menuseparator'));

		for (let i = 0, menu; menu = mMenus[i]; i++) {
			menugroup.appendChild($C("menuitem", {
				label: menu.alabel,
				tooltiptext: menu.label,
				image: menu.image,
				class: "menuitem-iconic",
				oncommand: menu.oncommand,
				style: menu.style || "max-width: 10px;"
			}));
		};

		function $C(name, attr) {
			var el = document.createElement(name);
			if (attr) {
				Object.keys(attr).forEach(function(n) {
					el.setAttribute(n, attr[n]);
				});
			};
			return el;
		};

		gNavToolbox.palette.appendChild(btn);
		var toolbars = Array.slice(document.querySelectorAll('toolbar'));
		for (var i = 0; i < toolbars.length; i++) {
			var toolbar = toolbars[i];
			var currentset = toolbar.getAttribute('currentset');
			if (currentset.split(',').indexOf(btn.id) >= 0) {
				var j;
				(i === 0) ? j = 1 : j = 0;
				toolbars[j].currentSet += ',' + btn.id;
				toolbar.currentSet = currentset;
			}
		}
	},

	populateMenu: function(event) {
		var prevState;
		var showItem = true;

		var popup = event.target;
		if (popup !== event.currentTarget) {
			return;
		}

		while (popup.childElementCount > 2) {
			popup.removeChild(popup.lastChild);
		}

		var addons;
		AddonManager.getAddonsByTypes(['extension'], function(aAddons) {
			addons = aAddons;
		});

		var thread = Services.tm.mainThread;
		while (addons === void 0) {
			thread.processNextEvent(true);
		}

		addons.sort((a, b) => {
			var ka = this.key(a);
			var kb = this.key(b);
			return (ka < kb) ? -1 : 1;
		}).forEach((addon) => {
			if (!addon.appDisabled && ((addon.isActive && addon.optionsURL)
				 || ((addon.userDisabled && this.showDisabled)
				 || (!addon.userDisabled && this.showAll)))) {
				var state = addon.isActive;
				if (this.sort.disabled === 1 && (prevState && state !== prevState)) {
					popup.appendChild(document.createElement('menuseparator'));
				}
				prevState = state;

				var mi = document.createElement('menuitem');
				var label = addon.name;
				if (this.showVersion) label = label += ' ' + '[' + addon.version + ']';
				mi.setAttribute('label', label);
				mi.setAttribute('class', 'menuitem-iconic');
				mi.setAttribute('tooltiptext', 'ID : ' + addon.id + '\nGröße : ' + Math.floor(addon.size / 1024) + ' KB' + '\n\nLinksklick = Add-On-Einstellungen öffnen\nRechtsklick = Add-On aktivieren / deaktivieren\nMittelklick = Add-On-Homepage öffnen\nStrg + Linksklick = Add-on-Ordner öffnen\nStrg + Rechtsklick = Add-ons deinstallieren / rückgängig machen\n* Nach Firefox-Neustart kann diese Aktion nicht mehr Rückgängig gemacht werden.\nStrg + Mittelklick = Addon ID kopieren');
				var icon = addon.iconURL || addon.iconURL64 || this.iconURL || '';
				mi.setAttribute('image', icon);
				mi.addEventListener('click', (event) => this.handleClick(event));
				mi._Addon = addon;

				if (!addon.optionsURL && addon.isActive) {
					mi.setAttribute('style', 'color: Gray');
				}
				if (!addon.operationsRequiringRestart) {
					mi.setAttribute('style', 'color: Green');
				}

				this.setDisable(mi, addon.userDisabled);
				this.setUninstall(mi, this.isPending(addon));

				if (this.blackListArray) {
					for (var i = 0; i < this.blackListArray.length; i++) {
						if (this.blackListArray[i] == addon.id.toLowerCase()) {
							showItem = false;
							break;
						} else {
							showItem = true;
						}
					}
				}
				if (showItem) popup.appendChild(mi);
			}
		});
	},

	iconClick: function(event) {
		if (event.target !== event.currentTarget) {
			return;
		}
		if (event.button === 1) {
			EOM.restart();
		} else if (event.button === 2) {
			event.preventDefault();
			event.stopPropagation();
			setTimeout(function() {
				document.getElementById("toolbar-context-menu").hidePopup();
			}, 0);
			BrowserOpenAddonsMgr('addons://list/extension');
		}
	},

	handleClick: function(event) {
		var mi = event.target;
		if (mi !== event.currentTarget) {
			return;
		}
		if (!('_Addon' in mi)) {
			return;
		}

		var addon = mi._Addon;
		var pending = this.isPending(addon);
		var hasMdf = event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;

		switch (event.button) {
			case 0:
				if (addon.optionsURL && !hasMdf) {
					this.openAddonOptions(addon);
				} else if (event.ctrlKey) {
					this.browseDir(addon); 
				}
				break;
			case 1:
				if (addon.homepageURL && !hasMdf) {
					openURL(addon.homepageURL);
				} else if (event.ctrlKey) {
					Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper).copyString(addon.id);
				}
				break;
			case 2:
				if (!hasMdf) {
					var stateDisabled = addon.userDisabled = !addon.userDisabled;
					this.setDisable(mi, stateDisabled);
					if (addon.operationsRequiringRestart && this.autoRestart) {
						EOM.restart();
					}
				} else if (event.ctrlKey) {
					if (pending) {
						addon.cancelUninstall();
					} else {
						addon.uninstall();
					}
					this.setUninstall(mi, pending);
				}
				break;
		}
	},

	setDisable: function(mi, dis) {
		var cls = mi.classList;
		dis ? cls.add('addon-disabled') : cls.remove('addon-disabled');
	},

	setUninstall: function(mi, uninst) {
		var cls = mi.classList;
		uninst ? cls.add('addon-uninstall') : cls.remove('addon-uninstall');
	},

	isPending: function(addon) {
		return addon.pendingOperations & AddonManager.PENDING_UNINSTALL;
	},

	openAddonOptions: function(addon) {
		var optionsURL = addon.optionsURL || '';
		if (!addon.isActive || !optionsURL) {
			return;
		}
		switch (Number(addon.optionsType)) {
			case 3:
				"switchToTabHavingURI" in window ? switchToTabHavingURI(optionsURL, true) : openTab("contentTab", { contentPage: optionsURL });
			break;
			default:
				openDialog(optionsURL, addon.name, 'chrome,titlebar,toolbar,resizable,scrollbars,centerscreen,dialog=no,modal=no');
		}
	},

	browseDir: function(addon) {
		var dir = Services.dirsvc.get('ProfD', Ci.nsIFile);
		var nsLocalFile = Components.Constructor('@mozilla.org/file/local;1', 'nsIFile', 'initWithPath');
		dir.append('extensions');
		dir.append(addon.id);
		var fileOrDir = dir.path + (dir.exists() ? '' : '.xpi');
		try {
			new nsLocalFile(fileOrDir).reveal();
		} catch (e) {
			var addonDir = /.xpi$/.test(fileOrDir) ? dir.parent : dir;
			try {
				if (addonDir.exists()) {
					addonDir.launch();
				}
			} catch (e) {
				var uri = Services.io.newFileURI(addonDir);
				var protSvc = Cc['@mozilla.org/uriloader/external-protocol-service;1'].getService(Ci.nsIExternalProtocolService);
				protSvc.loadUrl(uri);
			}
		}
	},

	key: function(addon) {
		var sort = this.sort;
		var sortPos = addon.isActive ? sort.enabled : sort.disabled;
		return sortPos + '\n' + addon.name.toLowerCase();
	},

	restart: function() {
		('BrowserUtils' in window) ? BrowserUtils.restartApplication() : Application.restart();
	}

};
EOM.init();

