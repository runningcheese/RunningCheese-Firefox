::2016.03.01

@echo off
Title Notepad2映像劫持替換自带记事本
::界面大小，Cols为宽，Lines为高
MODE con: COLS=80 LINES=25

set regkey=HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe

::自动以管理员身份运行bat文件
cd /d %~dp0
%1 start "" mshta vbscript:createobject("shell.application").shellexecute("""%~0""","::",,"runas",1)(window.close)&exit

:menu
cls
ECHO.
ECHO  1、记事本[未劫持]，是否开启劫持？
ECHO  2、记事本[已劫持]，是否取消劫持？
ECHO.
set /p a=请输入操作序号并回车（1、2）：
cls

if %a%==1 goto notepad2
if %a%==2 goto undo

:notepad2
reg add "%regkey%" /v "Debugger" /t REG_SZ /d "%~dp0Notepad2.exe /z" /f
goto exit

:undo
reg delete "%regkey%" /f
goto exit