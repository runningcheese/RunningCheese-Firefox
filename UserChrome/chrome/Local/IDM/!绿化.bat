@ECHO OFF & CD /D %~DP0 & TITLE 绿化
>NUL 2>&1 REG.exe query "HKU\S-1-5-19" || (
    ECHO SET UAC = CreateObject^("Shell.Application"^) > "%TEMP%\Getadmin.vbs"
    ECHO UAC.ShellExecute "%~f0", "%1", "", "runas", 1 >> "%TEMP%\Getadmin.vbs"
    "%TEMP%\Getadmin.vbs"
    DEL /f /q "%TEMP%\Getadmin.vbs" 2>NUL
    Exit /b
)

taskkill /f /im IDM* >NUL 2>NUL
taskkill /f /im IEMon* >NUL 2>NUL

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

:: Windows All
reg delete HKCU\SOFTWARE\DownloadManager /v tvfrdt /f>NUL 2>NUL
reg add "HKCU\Software\DownloadManager" /f /v "LName" /d "Version" >NUL
reg add "HKCU\Software\DownloadManager" /f /v "FName" /d "All Users" >NUL
reg add "HKCU\Software\DownloadManager" /f /v "Email" /d "info@tonec.com" >NUL
reg add "HKCU\Software\DownloadManager" /f /v "Serial" /d "VM2HP-0L5CH-REJPM-7YSKI" >NUL
if "%PROCESSOR_ARCHITECTURE%"=="x86"  reg add "HKLM\Software\Internet Download Manager" /f /v LName /d "Version" >NUL
if "%PROCESSOR_ARCHITECTURE%"=="x86"  reg add "HKLM\Software\Internet Download Manager" /f /v FName /d "All Users" >NUL
if "%PROCESSOR_ARCHITECTURE%"=="x86"  reg add "HKLM\Software\Internet Download Manager" /f /v Email /d "info@tonec.com" >NUL
if "%PROCESSOR_ARCHITECTURE%"=="x86"  reg add "HKLM\Software\Internet Download Manager" /f /v Serial /d "VM2HP-0L5CH-REJPM-7YSKI" >NUL
if "%PROCESSOR_ARCHITECTURE%"=="AMD64"  reg add "HKLM\Software\WOW6432Node\Internet Download Manager" /f /v LName /d "Version" >NUL
if "%PROCESSOR_ARCHITECTURE%"=="AMD64"  reg add "HKLM\Software\WOW6432Node\Internet Download Manager" /f /v FName /d "All Users" >NUL
if "%PROCESSOR_ARCHITECTURE%"=="AMD64"  reg add "HKLM\Software\WOW6432Node\Internet Download Manager" /f /v Email /d "info@tonec.com" >NUL
if "%PROCESSOR_ARCHITECTURE%"=="AMD64"  reg add "HKLM\Software\WOW6432Node\Internet Download Manager" /f /v Serial /d "VM2HP-0L5CH-REJPM-7YSKI" >NUL
reg add HKCU\Software\DownloadManager /f /v ToolbarStyle /d "Faenza" >NUL
reg add HKCU\Software\DownloadManager /f /v LstCheck  /d "31/12/99" >NUL
reg add HKCU\Software\DownloadManager /f /v TipStartUp /t REG_DWORD /d 1 >NUL
reg add HKCU\Software\DownloadManager /f /v LaunchOnStart /t REG_DWORD /d 0 >NUL
reg add HKCU\Software\DownloadManager /f /v FSSettingsChecked /t REG_DWORD /d 1 >NUL
reg add HKCU\Software\DownloadManager /f /v LanguageID /t REG_DWORD /d "0x00000804" >NUL

:: Windows 64-Bit
If "%PROCESSOR_ARCHITECTURE%"=="AMD64" regsvr32 /s IDMIECC64.dll
If "%PROCESSOR_ARCHITECTURE%"=="AMD64" regsvr32 /s IDMGetAll64.dll
If "%PROCESSOR_ARCHITECTURE%"=="AMD64" regsvr32 /s downlWithIDM64.dll

:: Windows 7/8/10
If Exist "%Public%" idmBroker.exe -RegServer

:: Windows All
Start /Wait /B "" "%~dp0IDMan.exe" /rtr /isupdt /setlngid 2052 /fulllngfile idm_chn2.lng

:: Windows 7/8/10
If Exist "%Public%" Uninstall.exe -instdriv

:: Windows 7/8/10
If Exist "%Public%" Rundll32 setupapi.dll,InstallHinfSection DefaultInstall 128 .\idmwfp.inf
:: Windows XP
If Not Exist "%Public%" Rundll32 setupapi.dll,InstallHinfSection DefaultInstall 128 .\idmtdi.inf

:: Windows 7/8/10
If Exist "%Public%" Net Start IDMWFP >NUL 2>NUL
:: Windows XP
If Not Exist "%Public%" Net Start idmtdi >NUL 2>NUL

CLS & ECHO.&ECHO 绿化完成，是否创建桌面快捷方式？
ECHO. & ECHO 是按任意键，否直接关闭窗口即可！&&PAUSE >NUL
mshta VBScript:Execute("Set a=CreateObject(""WScript.Shell""):Set b=a.CreateShortcut(a.SpecialFolders(""Desktop"") & ""\IDM.lnk""):b.TargetPath=""%~dp0IDMan.exe"":b.WorkingDirectory=""%~dp0"":b.Save:close")
CLS && ECHO. & ECHO 创建完成，任意键退出！ &&PAUSE>NUL & EXIT