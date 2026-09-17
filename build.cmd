@echo off
setlocal
set "NODE=C:\Program Files\nodejs\node.exe"
if not exist "%NODE%" set "NODE=node"
cd /d "%~dp0"
"%NODE%" "node_modules\next\dist\bin\next" build %*
