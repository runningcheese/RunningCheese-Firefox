:: by runningcheese
:: 清除Firefox配置的缓存文件和文件夹

rd /s /q "%~dp0..\..\..\AppData"
rd /s /q "%~dp0..\..\..\bookmarkbackups"
rd /s /q "%~dp0..\..\..\chrome_debugger_profile"
rd /s /q "%~dp0..\..\..\crashes"
rd /s /q "%~dp0..\..\..\datareporting"
rd /s /q "%~dp0..\..\..\gmp"
rd /s /q "%~dp0..\..\..\gmp-gmpopenh264"
rd /s /q "%~dp0..\..\..\minidumps"
rd /s /q "%~dp0..\..\..\sessionstore-backups"
rd /s /q "%~dp0..\..\..\weave"

del /f /q "%~dp0..\..\..\webappsstore.sqlite"
del /f /q "%~dp0..\..\..\formhistory.sqlite"
del /f /q "%~dp0..\..\..\blocklist.xml"
del /f /q "%~dp0..\..\..\cert_override.txt"

