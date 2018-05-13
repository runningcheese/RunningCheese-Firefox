:: RunningCheese Firefox ¸üÐÂ³ÌÐò
wget -c -N --no-check-certificate https://raw.githubusercontent.com/runningcheese/RunningCheese-Firefox/master/Updates/Updates.zip
7z x Updates.zip -y
move /y "%cd%\user.js" "%~dp0..\..\..\..\V10"
move /y "%cd%\userChrome.css" "%~dp0..\..\..\chrome"
move /y "%cd%\userContent.css" "%~dp0..\..\..\chrome"
move /y "%cd%\_addmenu.js" "%~dp0..\..\..\chrome\Local"
move /y "%cd%\_keychanger.js" "%~dp0..\..\..\chrome\Local"
move /y "%cd%\*.uc.js" "%~dp0..\..\SubScript\"
move /y "%cd%\*.css" "%~dp0..\..\css\"
move /y "%cd%\*.bat" "%~dp0..\..\Local\Updates\"
move /y "%cd%\*.png" "%~dp0..\..\images\icons\"
:: move /y "%cd%\*.xpi" "%~dp0..\..\..\extensions\"
del /f Updates.zip

exit



