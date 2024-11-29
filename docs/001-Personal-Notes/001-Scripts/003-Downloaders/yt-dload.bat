@echo off
set /p URL="Enter URL: "
powershell.exe -ExecutionPolicy Bypass -File "%~dp0yt-dload.ps1" -Url "%URL%"
pause
