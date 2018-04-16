@echo off

%1 %2
ver|find "5.">nul&&goto :st
mshta vbscript:createobject("shell.application").shellexecute("%~s0","goto :st","","runas",1)(window.close)&goto :eof
:st
copy "%~0" "%windir%\system32\" 



@echo 现在请修改Hosts文件，并保存；如果你被提示因为权限问题而拒绝保存，请以管理员身份运行此程序
@notepad "%SystemRoot%\system32\drivers\etc\hosts" 

@ipconfig /flushdns 
@echo 正在刷新缓存，程序会自动退出。。。
@exit 