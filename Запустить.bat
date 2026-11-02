@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul || (echo Нужен Node.js: https://nodejs.org & pause & exit /b)
if not exist node_modules (echo Устанавливаю библиотеки, это один раз... & call npm install)
start "" http://localhost:5173
call npm run dev
