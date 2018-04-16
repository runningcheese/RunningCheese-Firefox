::原作者: dupontjoy
::2015.07.05 22:00  添加删除项
::2015.06.30 13:00  加入prefs.js
::2015.06.19 16:00  添加重启
::2015.06.12 20:00  先复制后删除，不影响原文件
::2015.06.08 14:00  添加开始备份前的提示
::2015.06.01 20:00  更名为Profiles，删除一些不必要的项目
::2015.05.27 18:00  换用Autoproxy，不再备份Foxy数据
::2015.04.16 08:00  更新备份项，添加说明
::2015.01.26 12:00  搞定了时间问题

echo off
Title 备份Firefox配置文件夹
ECHO.&ECHO.即将开始Profiles配置打包。需要关闭Firefox程序，请保存必要的资料! 按任意键继续！&PAUSE >NUL 2>NUL

rem 设置备份路径以及临时文件夹
taskkill /im firefox.exe
@echo 关闭火狐浏览器后自动开始备份……
cd /d %~dp0
::从批处理所在位置到配置文件夹（Profiles），共跨了3层
set BackDir=..\..
set TempFolder=..\..\Temp\Profiles

taskkill /im firefox.exe

rem 复制目标文件到临时文件夹

::以下是文件夹
xcopy "%BackDir%\autoproxy" %TempFolder%\autoproxy\  /s /y /i
xcopy "%BackDir%\chrome" %TempFolder%\chrome\  /s /y /i
xcopy "%BackDir%\extensions" %TempFolder%\extensions\ /s /y /i
xcopy "%BackDir%\extension-data" %TempFolder%\extension-data\ /s /y /i
xcopy "%BackDir%\gm_scripts" %TempFolder%\gm_scripts\ /s /y /i
xcopy "%BackDir%\ReadItLater" %TempFolder%\ReadItLater\ /s /y /i
xcopy "%BackDir%\searchplugins" %TempFolder%\searchplugins\ /s /y /i 
xcopy "%BackDir%\startupCache" %TempFolder%\startupCache\ /s /y /i 
xcopy "%BackDir%\storage" %TempFolder%\storage\ /s /y /i 
xcopy "%BackDir%\superstart" %TempFolder%\superstart\ /s /y /i 


::需要删除的项
::del %TempFolder%\extensions\support@lastpass.com\platform\Darwin\  /s /q

::以下是文件

xcopy "%BackDir%\blocklist.xml" %TempFolder%\ /y
xcopy "%BackDir%\cert_override.txt" %TempFolder%\ /y
xcopy "%BackDir%\cert8.db" %TempFolder%\ /y
xcopy "%BackDir%\extensions.ini" %TempFolder%\ /y
xcopy "%BackDir%\extensions.json" %TempFolder%\ /y
xcopy "%BackDir%\firegestures.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\key3.db" %TempFolder%\ /y
xcopy "%BackDir%\mimeTypes.rdf" %TempFolder%\ /y
xcopy "%BackDir%\localstore.rdf" %TempFolder%\ /y
xcopy "%BackDir%\permissions.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\quicklaunch.sqlite %TempFolder%\ /y
xcopy "%BackDir%\pluginreg.dat" %TempFolder%\ /y
xcopy "%BackDir%\prefs.js" %TempFolder%\ /y
xcopy "%BackDir%\stylish.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\user.js" %TempFolder%\ /y
xcopy "%BackDir%\xulstore.json" %TempFolder%\ /y


::读取版本号和日期及时间
::从批处理所在位置到Firefox程序文件夹（firefox），共跨了4层
for /f "usebackq eol=; tokens=1,2 delims==" %%i in ("..\..\..\..\Firefox\application.ini")do (if %%i==Version set ver=%%j)
::设置备份文件路径以及文件名

::完整日期和时间
set tm1=%time:~0,2%
set tm2=%time:~3,2%
set tm3=%time:~6,2%
set tm4=%time:~0,8%
set da1=%date:~0,4%
set da2=%date:~5,2%
set da3=%date:~8,2%
set ArchiveName=C:\Users\Administrator\Desktop\Profiles_%da1%%da2%%da3%-%tm1%%tm2%%tm3%_%ver%.7z

::小时数小于10点时的修正
set /a tm1=%time:~0,2%*1
if %tm1% LSS 10 set tm1=0%tm1%
set ArchiveName=C:\Users\Administrator\Desktop\Profiles_%da1%%da2%%da3%-%tm1%%tm2%%tm3%_%ver%.7z

rem 开始备份
7z.exe u -up1q3r2x2y2z2w2 %ArchiveName% "%TempFolder%"
@echo 备份完成！并删除临时文件夹！
rd "%TempFolder%" /s/q

ECHO.&ECHO.Firefox配置已打包完成，请按任意键 重启Firefox 并退出！&PAUSE >NUL 2>NUL

@ping 127.0.0.1>nul
@start ..\..\..\..\Firefox\firefox.exe

@exit