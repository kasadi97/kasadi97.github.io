@echo off
echo 🌐 Создание публичного доступа к localhost через ngrok
echo.

REM Проверяем, установлен ли ngrok
where ngrok >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ ngrok не установлен
    echo.
    echo 📥 Для установки ngrok:
    echo 1. Перейдите на https://ngrok.com/download
    echo 2. Скачайте ngrok для Windows
    echo 3. Распакуйте в папку с проектом или добавьте в PATH
    echo 4. Зарегистрируйтесь на ngrok.com и получите authtoken
    echo 5. Выполните: ngrok authtoken YOUR_TOKEN
    echo.
    pause
    exit /b 1
)

echo ✅ ngrok найден
echo.

REM Запускаем Python сервер в фоне
echo 🐍 Запускаем Python сервер на порту 8080...
start /b python server.py

REM Ждем 2 секунды для запуска сервера
timeout /t 2 /nobreak >nul

REM Запускаем ngrok
echo 🌐 Создаем публичный туннель...
echo.
echo 📱 После запуска ngrok:
echo 1. Скопируйте https URL (например: https://abc123.ngrok.io)
echo 2. Откройте https://www.pwabuilder.com
echo 3. Вставьте скопированный URL
echo 4. Создайте APK
echo.
ngrok http 8080