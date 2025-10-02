@echo off
echo 📱 Создание APK для Card Advisor KZ
echo.

echo 🎯 Выберите способ создания APK:
echo.
echo 1. GitHub Pages + PWABuilder (РЕКОМЕНДУЕТСЯ - БЫСТРО)
echo 2. Ngrok + PWABuilder (Временный доступ)
echo 3. Capacitor (Нативное приложение)
echo 4. Показать все варианты
echo.

set /p choice="Введите номер (1-4): "

if "%choice%"=="1" goto github_pages
if "%choice%"=="2" goto ngrok
if "%choice%"=="3" goto capacitor
if "%choice%"=="4" goto show_all

:github_pages
echo.
echo 📚 СПОСОБ 1: GitHub Pages + PWABuilder
echo.
echo ✅ Ваш код уже загружен в GitHub репозиторий
echo 📁 Репозиторий: https://github.com/kasadi97/card-advisor-kz-pwa
echo.
echo 📋 Следующие шаги:
echo.
echo 1. Откройте: https://github.com/kasadi97/card-advisor-kz-pwa/settings/pages
echo 2. В разделе "Source" выберите: Deploy from a branch
echo 3. Branch: main
echo 4. Folder: / (root)
echo 5. Нажмите "Save"
echo.
echo ⏱️ Подождите 2-3 минуты...
echo.
echo 6. Ваше приложение будет доступно по адресу:
echo    https://kasadi97.github.io/card-advisor-kz-pwa/
echo.
echo 7. Откройте: https://www.pwabuilder.com
echo 8. Введите URL: https://kasadi97.github.io/card-advisor-kz-pwa/
echo 9. Нажмите "Start" и создайте APK
echo.
goto end

:ngrok
echo.
echo 🌐 СПОСОБ 2: Ngrok туннель
echo.
echo 📋 Требуется установка ngrok:
echo 1. Перейдите на: https://ngrok.com/download
echo 2. Скачайте ngrok для Windows
echo 3. Зарегистрируйтесь и получите authtoken
echo 4. Выполните: ngrok authtoken YOUR_TOKEN
echo.
echo 🚀 После установки запустите:
echo    ngrok-tunnel.bat
echo.
goto end

:capacitor
echo.
echo 📱 СПОСОБ 3: Capacitor (Нативное приложение)
echo.
echo 📋 Требования:
echo - Node.js (https://nodejs.org)
echo - Android Studio (https://developer.android.com/studio)
echo.
echo 📋 Команды для выполнения:
echo 1. npm install
echo 2. npm run install-capacitor
echo 3. npm run capacitor:init
echo 4. npm run capacitor:add
echo 5. npm run capacitor:build
echo.
goto end

:show_all
echo.
echo 📋 ВСЕ СПОСОБЫ СОЗДАНИЯ APK:
echo.
echo 1. 📚 GitHub Pages + PWABuilder
echo    ✅ Бесплатно
echo    ✅ Быстро (5 минут)
echo    ✅ Не требует установки ПО
echo.
echo 2. 🌐 Ngrok + PWABuilder  
echo    ✅ Быстрый доступ к localhost
echo    ❌ Требует регистрации на ngrok.com
echo    ❌ Временный URL
echo.
echo 3. 📱 Capacitor
echo    ✅ Полный контроль
echo    ✅ Нативные функции
echo    ❌ Требует Android Studio
echo    ❌ Сложнее в настройке
echo.
echo 4. 🌐 Netlify/Vercel + PWABuilder
echo    ✅ Бесплатный хостинг
echo    ✅ Автоматические деплои
echo    ✅ Простая настройка
echo.
echo 5. 🔧 Android Studio + TWA
echo    ✅ Максимальный контроль
echo    ❌ Самый сложный
echo    ❌ Требует знаний Android разработки
echo.

:end
echo.
echo 📖 Подробные инструкции смотрите в файле: APK_ALTERNATIVES.md
echo.
pause