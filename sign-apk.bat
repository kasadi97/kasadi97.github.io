@echo off
echo ========================================
echo APK Signing Tool для Card Advisor KZ
echo ========================================
echo.

set APK_FILE=%1
if "%APK_FILE%"=="" (
    echo Использование: sign-apk.bat path\to\your.apk
    echo Пример: sign-apk.bat card-advisor-kz.apk
    echo.
    set /p APK_FILE="Введите путь к APK файлу: "
)

if not exist "%APK_FILE%" (
    echo Ошибка: Файл %APK_FILE% не найден!
    pause
    exit /b 1
)

echo Найден APK: %APK_FILE%
echo.

REM Создаем папку для инструментов если её нет
if not exist "tools" mkdir tools
cd tools

REM Проверяем наличие uber-apk-signer
if not exist "uber-apk-signer-1.3.0.jar" (
    echo Скачиваем uber-apk-signer...
    powershell -Command "Invoke-WebRequest -Uri 'https://github.com/patrickfav/uber-apk-signer/releases/download/v1.3.0/uber-apk-signer-1.3.0.jar' -OutFile 'uber-apk-signer-1.3.0.jar'"
    if errorlevel 1 (
        echo Ошибка скачивания! Проверьте интернет соединение.
        pause
        exit /b 1
    )
)

echo.
echo Подписываем APK...
java -jar uber-apk-signer-1.3.0.jar --apks "..\%APK_FILE%" --out ".."

if errorlevel 1 (
    echo.
    echo Ошибка подписи! Проверьте:
    echo 1. Установлена ли Java
    echo 2. Корректен ли APK файл
    echo.
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo ✅ APK успешно подписан!
echo ========================================
echo.

REM Находим подписанный файл
for %%f in (*-aligned-debugSigned.apk) do (
    echo Подписанный APK: %%f
    echo Размер: 
    dir "%%f" | findstr "%%f"
    echo.
    set SIGNED_APK=%%f
)

echo Готово! Теперь можно устанавливать APK на Android устройство.
echo.
echo Для установки:
echo 1. Перенесите файл %SIGNED_APK% на Android устройство
echo 2. Разрешите установку из неизвестных источников
echo 3. Откройте файл и установите приложение
echo.

pause