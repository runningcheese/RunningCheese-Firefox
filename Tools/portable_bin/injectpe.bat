@echo off
if exist "%~dp0firefox.exe" (echo.) && if exist "%~dp0xul.dll" (
echo 已找到需要注入的文件firefox.exe和xul.dll. 
goto platform
) else (
echo 没找到相关文件,请把程序放入浏览器的安装目录执行.
goto eof
)

if  not exist %~dp0firefox.exe (
echo 没找到相关文件,请把程序放入浏览器的安装目录执行.
goto eof
)

:platform
@echo 请选择是注入32位还是64位的firefox.
@set /p fx=[32位请按1,   64位请按2]
if "%fx%"=="1" set arch=X86.exe&goto x86
if "%fx%"=="2" set arch=X64.exe&goto x64
@echo 请输入正确的数字！&ping -n 1 127.0.0.1>nul&goto platform

:x86
@echo 你选择了注入32位的firefox浏览器
injectpe_%arch% firefox.exe portable32.dll
injectpe_%arch% xul.dll portable32.dll
goto err

:x64
@echo 你选择了注入64位的firefox浏览器
injectpe_%arch% firefox.exe portable64.dll
injectpe_%arch% xul.dll portable64.dll

:err
if "%errorlevel%"=="0" echo 注入成功,请仔细阅读readme.txt和portable(example).ini文件!
if "%errorlevel%"=="-1" echo 程序注入失败!

:eof
pause .
@del /s/q injectpe_x*.exe 2>nul 1>nul
if "%fx%"=="1" del /s/q portable64.dll
if "%fx%"=="2" del /s/q portable32.dll
@del /s/q %0
