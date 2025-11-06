@echo off
title Patidar Loan Auto Upload
color 0A
echo ------------------------------------------
echo   🚀 PATIDAR LOAN AUTO-UPLOAD TO NETLIFY
echo ------------------------------------------
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Installing Node.js is required.
    echo 👉 Please install from https://nodejs.org and then re-run this file.
    pause
    exit
)

REM Install Netlify CLI globally if not already installed
npm list -g netlify-cli >nul 2>nul
if %errorlevel% neq 0 (
    echo 📦 Installing Netlify CLI...
    npm install -g netlify-cli
)

echo.
echo 🌐 Opening Netlify Login Page in Chrome...
start chrome https://app.netlify.com/authorize

echo.
echo 🔑 Please login to Netlify using your email: priyanshjasapara8@gmail.com
echo After login, come back to this window.
pause

echo.
echo 🚀 Deploying your website...
netlify deploy --prod --dir=patidar_loan_website

echo.
echo ✅ Deployment complete!
echo ------------------------------------------
echo Your live site link will appear above.
echo ------------------------------------------
pause
