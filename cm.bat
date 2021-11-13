@echo off
TITLE Github Commit Shortcut
echo Add files to commit:
git add .
echo.
set /p commit="Description: "
echo.
git commit -m "%commit%"