@echo off
TITLE Github Push Shortcut
echo Add files to commit:
git add .
echo.
set /p commit="Description: "
echo.
git commit -m "Format files and %commit%"
git push origin master