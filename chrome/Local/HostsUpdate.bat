@echo off

%1 %2
ver|find "5.">nul&&goto :st
mshta vbscript:createobject("shell.application").shellexecute("%~s0","goto :st","","runas",1)(window.close)&goto :eof
:st
copy "%~0" "%windir%\system32\" 



@Echo Off
Title 自动更新HOSTS工具
Pushd %~dp0
If "%PROCESSOR_ARCHITECTURE%"=="AMD64" (Set b=%SystemRoot%\SysWOW64) Else (Set b=%SystemRoot%\system32)
Rd "%b%\test_permission_JayXon" 2>nul
Md "%b%\test_permission_JayXon" 2>nul||(Echo 请使用右键管理员身份运行&&Pause >nul&&Exit)
Rd "%b%\test_permission_JayXon" 2>nul
Set p=Profiles
SetLocal EnableDelayedExpansion
:Menu
Cls
del "%~dp0hosts"
wget --no-check-certificate https://gitee.com/runningcheese/firefox/raw/master/Rules/hosts
del %windir%\System32\drivers\etc\hosts
copy /y "%~dp0hosts" %windir%\System32\drivers\etc\hosts
ECHO.&ECHO.更新完成,请按任意键退出! &PAUSE >NUL 2>NUL