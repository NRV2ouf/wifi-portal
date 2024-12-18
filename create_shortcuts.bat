@echo off
REM Define shortcut properties
set ExecutableName=main.exe
set ShortcutName=Authenticate
set DesktopShortcutPath=%USERPROFILE%\Desktop\%ShortcutName%.lnk
set StartupShortcutPath=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\%ShortcutName%.lnk
set ExecutablePath=%~dp0%ExecutableName%

REM Create Desktop Shortcut
echo Creating Desktop shortcut...
call :CreateShortcut "%DesktopShortcutPath%" "%ExecutablePath%"

REM Create Startup Shortcut
echo Creating Startup folder shortcut...
call :CreateShortcut "%StartupShortcutPath%" "%ExecutablePath%"

echo Shortcuts created successfully!
pause
exit /b

:CreateShortcut
REM Arguments: %1 = Shortcut Path, %2 = Target Path
set WScriptFile=%TEMP%\CreateShortcut.vbs
echo Set WshShell = WScript.CreateObject("WScript.Shell") > "%WScriptFile%"
echo Set Shortcut = WshShell.CreateShortcut("%~1") >> "%WScriptFile%"
echo Shortcut.TargetPath = "%~2" >> "%WScriptFile%"
echo Shortcut.WorkingDirectory = "%~dp2" >> "%WScriptFile%"
echo Shortcut.Save >> "%WScriptFile%"
cscript /nologo "%WScriptFile%"
del "%WScriptFile%"
exit /b