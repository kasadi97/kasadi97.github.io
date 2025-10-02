@echo off
title APK Builder для Card Advisor
color 0B
echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║                    📱 APK Builder Helper                     ║
echo  ║                  Создание APK из PWA                        ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

set /p choice="🚀 Запустить локальный сервер? (y/n): "
if /i "%choice%"=="y" (
    echo  🌐 Запускаем сервер...
    start cmd /k "python server.py"
    timeout /t 3 /nobreak >nul
)

echo.
echo  📋 Инструкции для создания APK:
echo.
echo  1️⃣  Открываем PWA Builder...
start https://www.pwabuilder.com
echo  ✅ PWA Builder открыт в браузере
echo.
echo  2️⃣  В поле URL введите: http://localhost:8000
echo  3️⃣  Нажмите "Start" для анализа PWA
echo  4️⃣  Дождитесь завершения проверки (зеленые галочки)
echo  5️⃣  Перейдите в раздел "Android"  
echo  6️⃣  Настройте параметры:
echo      📦 Package ID: com.cardadvisor.app
echo      📱 App name: Card Advisor
echo      🔢 Version: 1.0.0
echo  7️⃣  Нажмите "Download" для получения APK
echo.
echo  💡 Альтернативные способы:
echo     🔗 Capacitor: https://capacitorjs.com
echo     🔗 Cordova: https://cordova.apache.org
echo     🔗 TWA Builder: https://github.com/GoogleChromeLabs/bubblewrap
echo.
echo  📚 Подробная инструкция в README.md
echo.
pause