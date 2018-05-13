:: by runningcheese
@echo off
echo set WshShell = WScript.CreateObject("WScript.Shell")>tmp.vbs
echo set oShellLink = WshShell.CreateShortcut("%~dp0..\..\..\..\..\"  ^& "\Firefox Profiles.lnk")>>tmp.vbs
echo oShellLink.TargetPath ="%~dp0..\..\..\..\..\Firefox\firefox.exe">>tmp.vbs
echo oShellLink.Arguments = "-no-remote -p">>tmp.vbs
echo oShellLink.WindowStyle ="1">>tmp.vbs
echo oShellLink.IconLocation = "%~dp0..\..\..\..\..\Firefox\firefox.exe">>tmp.vbs
echo oShellLink.Description = "">>tmp.vbs
echo oShellLink.WorkingDirectory = "%~dp0" >>tmp.vbs
echo oShellLink.Save>>tmp.vbs
call tmp.vbs
del /f /q tmp.vbs