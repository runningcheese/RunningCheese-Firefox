@ECHO OFF & CD /D %~DP0 & TITLE 卸载
>NUL 2>&1 REG.exe query "HKU\S-1-5-19" || (
    ECHO SET UAC = CreateObject^("Shell.Application"^) > "%TEMP%\Getadmin.vbs"
    ECHO UAC.ShellExecute "%~f0", "%1", "", "runas", 1 >> "%TEMP%\Getadmin.vbs"
    "%TEMP%\Getadmin.vbs"
    DEL /f /q "%TEMP%\Getadmin.vbs" 2>NUL
    Exit /b
)

taskkill /f /im IDM* >NUL 2>NUL
taskkill /f /im IEMon* >NUL 2>NUL

If Exist "%Public%" Net Stop IDMWFP >NUL 2>NUL
If Not Exist "%Public%" Net Stop IDMTDI >NUL 2>NUL

If Exist "%Public%" Rundll32 setupapi.dll,InstallHinfSection DefaultUninstall 128 .\idmwfp.inf
If Not Exist "%Public%" Rundll32 setupapi.dll,InstallHinfSection DefaultUninstall 128 .\idmtdi.inf

If Exist "%WinDir%\SysWOW64" Regsvr32 /s /u IDMShellExt64.dll

rd/s/q "%AppData%\IDM"2>NUL
If Exist "%a%" rd/s/q "%ProgramData%\IDM" 2>NUL
rd/s/q "%AllUsersProfile%\Application Data\IDM"2>NUL
reg delete HKCU\Software\DownloadManager /v tvfrdt /f>NUL 2>NUL
reg delete HKCU\Software\DownloadManager /v Email /f>NUL 2>NUL
reg delete HKCU\Software\DownloadManager /v Serial /f>NUL 2>NUL
reg delete HKCU\Software\DownloadManager /v LName /f>NUL 2>NUL
reg delete HKCU\Software\DownloadManager /v FName /f>NUL 2>NUL
reg delete HKCU\Software\DownloadManager /v scansk /f>NUL 2>NUL
reg delete HKCU\Software\DownloadManager /v ExePath /f>NUL 2>NUL
reg delete HKCU\Software\DownloadManager /v TempPath /f>NUL 2>NUL
reg delete HKCU\Software\DownloadManager /v CheckUpdtVM /f>NUL 2>NUL
reg delete HKCU\Software\DownloadManager /v AppDataIDMFolder /f>NUL 2>NUL
reg delete HKCU\Software\DownloadManager /v CommonAppDataIDMFolder /f>NUL 2>NUL
reg delete "HKLM\SOFTWARE\Internet Download Manager" /f>NUL 2>NUL
reg delete "HKLM\SOFTWARE\Wow6432Node\Internet Download Manager" /f>NUL 2>NUL
reg delete HKCU\Software\Classes\CLSID\{07999AC3-058B-40BF-984F-69EB1E554CA7} /f>NUL 2>NUL
reg delete HKCU\Software\Classes\CLSID\{6DDF00DB-1234-46EC-8356-27E7B2051192} /f>NUL 2>NUL
reg delete HKCU\Software\Classes\CLSID\{D5B91409-A8CA-4973-9A0B-59F713D25671} /f>NUL 2>NUL
reg delete HKCU\Software\Classes\CLSID\{7B8E9164-324D-4A2E-A46D-0165FB2000EC} /f>NUL 2>NUL
reg delete HKCU\Software\Classes\CLSID\{5ED60779-4DE2-4E07-B862-974CA4FF2E9C} /f>NUL 2>NUL
reg delete HKLM\Software\Classes\CLSID\{07999AC3-058B-40BF-984F-69EB1E554CA7} /f>NUL 2>NUL
reg delete HKLM\Software\Classes\CLSID\{6DDF00DB-1234-46EC-8356-27E7B2051192} /f>NUL 2>NUL
reg delete HKLM\Software\Classes\CLSID\{D5B91409-A8CA-4973-9A0B-59F713D25671} /f>NUL 2>NUL
reg delete HKLM\Software\Classes\CLSID\{7B8E9164-324D-4A2E-A46D-0165FB2000EC} /f>NUL 2>NUL
reg delete HKLM\Software\Classes\CLSID\{5ED60779-4DE2-4E07-B862-974CA4FF2E9C} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\CLSID\{D0FB58BB-2C07-492F-8BD0-A587E4874B4E} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\CLSID\{0055C089-8582-441B-A0BF-17B458C2A3A8} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\CLSID\{0F947660-8606-420A-BAC6-51B84DD22A47} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\CLSID\{436D67E1-2FB3-4A6C-B3CD-FF8A41B0664D} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\CLSID\{4764030F-2733-45B9-AE62-3D1F4F6F2861} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\CLSID\{52F6F7BD-DF73-44B3-AE13-89E1E1FB8F6A} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\CLSID\{5312C54E-A385-46B7-B200-ABAF81B03935} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\CLSID\{6B9EB066-DA1F-4C0A-AC62-01AC892EF175} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\CLSID\{7D11E719-FF90-479C-B0D7-96EB43EE55D7} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\CLSID\{AC746233-E9D3-49CD-862F-068F7B7CCCA4} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\CLSID\{CDD67718-A430-4AB9-A939-83D9074B0038} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\CLSID\{CDC95B92-E27C-4745-A8C5-64A52A78855D} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\CLSID\{CDD67718-A430-4AB9-A939-83D9074B0038} /f>NUL 2>NUL
reg delete HKLM\Software\Classes\Wow6432Node\CLSID\{07999AC3-058B-40BF-984F-69EB1E554CA7} /f>NUL 2>NUL
reg delete HKLM\Software\Classes\Wow6432Node\CLSID\{6DDF00DB-1234-46EC-8356-27E7B2051192} /f>NUL 2>NUL
reg delete HKLM\Software\Classes\Wow6432Node\CLSID\{D5B91409-A8CA-4973-9A0B-59F713D25671} /f>NUL 2>NUL
reg delete HKCU\Software\Classes\Wow6432Node\CLSID\{7B8E9164-324D-4A2E-A46D-0165FB2000EC} /f>NUL 2>NUL
reg delete HKCU\Software\Classes\Wow6432Node\CLSID\{5ED60779-4DE2-4E07-B862-974CA4FF2E9C} /f>NUL 2>NUL
reg delete HKLM\Software\Classes\Wow6432Node\CLSID\{7B8E9164-324D-4A2E-A46D-0165FB2000EC} /f>NUL 2>NUL
reg delete HKLM\Software\Classes\Wow6432Node\CLSID\{5ED60779-4DE2-4E07-B862-974CA4FF2E9C} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\Wow6432Node\CLSID\{0055C089-8582-441B-A0BF-17B458C2A3A8} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\Wow6432Node\CLSID\{0F947660-8606-420A-BAC6-51B84DD22A47} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\Wow6432Node\CLSID\{436D67E1-2FB3-4A6C-B3CD-FF8A41B0664D} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\Wow6432Node\CLSID\{4764030F-2733-45B9-AE62-3D1F4F6F2861} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\Wow6432Node\CLSID\{52F6F7BD-DF73-44B3-AE13-89E1E1FB8F6A} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\Wow6432Node\CLSID\{5312C54E-A385-46B7-B200-ABAF81B03935} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\Wow6432Node\CLSID\{6B9EB066-DA1F-4C0A-AC62-01AC892EF175} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\Wow6432Node\CLSID\{7D11E719-FF90-479C-B0D7-96EB43EE55D7} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\Wow6432Node\CLSID\{AC746233-E9D3-49CD-862F-068F7B7CCCA4} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\Wow6432Node\CLSID\{CDD67718-A430-4AB9-A939-83D9074B0038} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Classes\Wow6432Node\CLSID\{D0FB58BB-2C07-492F-8BD0-A587E4874B4E} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Wow6432Node\Classes\CLSID\{CDC95B92-E27C-4745-A8C5-64A52A78855D} /f>NUL 2>NUL
reg delete HKLM\SOFTWARE\Wow6432Node\Classes\CLSID\{CDD67718-A430-4AB9-A939-83D9074B0038} /f>NUL 2>NUL
del /q "%userprofile%\桌面\IDM.lnk" >NUL  2>NUL 
del /q "%userprofile%\Desktop\IDM.lnk" >NUL  2>NUL 
taskkill /f /im explorer.exe >NUL 2>NUL & start explorer

CLS && ECHO.&ECHO.卸载完成！是否备份个人设置？
ECHO.&ECHO.是按任意键，否直接关闭窗口！&&PAUSE >NUL 2>NUL

regedit /e "IDM用户配置.reg" HKEY_CURRENT_USER\Software\DownloadManager >NUL 2>NUL
reg delete HKEY_CURRENT_USER\Software\DownloadManager /f>NUL 2>NUL

CLS && ECHO. & ECHO 卸载完成，请按任意键退出！ &&PAUSE >NUL & EXIT