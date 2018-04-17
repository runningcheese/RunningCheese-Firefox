:: by runningcheese
@echo off
echo set WshShell = WScript.CreateObject("WScript.Shell")>tmp.vbs
echo strDesktop = WshShell.SpecialFolders("Desktop")>>tmp.vbs
echo set oShellLink = WshShell.CreateShortcut(strDesktop ^& "\Firefox.lnk")>>tmp.vbs
echo oShellLink.TargetPath ="%~dp0Firefox\firefox.exe">>tmp.vbs
echo oShellLink.WindowStyle ="1">>tmp.vbs
echo oShellLink.Hotkey = "CTRL+SHIFT+F">>tmp.vbs
echo oShellLink.IconLocation = "%~dp0Firefox\firefox.exe">>tmp.vbs
echo oShellLink.Description = "">>tmp.vbs
echo oShellLink.WorkingDirectory = strDesktop>>tmp.vbs
echo oShellLink.Save>>tmp.vbs
call tmp.vbs
del /f /q tmp.vbs