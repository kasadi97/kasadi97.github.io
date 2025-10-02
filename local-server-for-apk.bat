@echo off
echo ========================================
echo Локальный тестовый сервер для APK
echo ========================================
echo.

echo Запускаем локальный сервер...
echo Сервер будет доступен по адресу: http://localhost:8080
echo.
echo Для PWABuilder используйте адрес: http://localhost:8080
echo (НЕ используйте GitHub Pages пока он не обновится)
echo.

start /min python -m http.server 8080

echo Сервер запущен в фоновом режиме!
echo.
echo Теперь:
echo 1. Откройте PWABuilder: https://www.pwabuilder.com/
echo 2. Введите URL: http://localhost:8080
echo 3. Создайте новый APK с правильным манифестом
echo.

echo Нажмите любую клавишу для остановки сервера...
pause > nul

echo Останавливаем сервер...
taskkill /f /im python.exe 2>nul
echo Готово!