@echo off
echo ========================================
echo Установка Java и подпись APK
echo ========================================
echo.

REM Проверяем наличие Java
java -version 2>nul
if errorlevel 1 (
    echo Java не найдена! Устанавливаем...
    echo.
    
    REM Проверяем наличие Chocolatey
    choco -v 2>nul
    if errorlevel 1 (
        echo Устанавливаем Chocolatey...
        powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"
        
        if errorlevel 1 (
            echo Ошибка установки Chocolatey!
            echo Скачайте Java вручную: https://www.oracle.com/java/technologies/downloads/
            pause
            exit /b 1
        )
    )
    
    echo Устанавливаем Java через Chocolatey...
    choco install openjdk11 -y
    
    if errorlevel 1 (
        echo Ошибка установки Java!
        echo Скачайте Java вручную: https://www.oracle.com/java/technologies/downloads/
        pause
        exit /b 1
    )
    
    echo Java установлена! Перезапустите командную строку.
    pause
    exit /b 0
) else (
    echo ✅ Java найдена!
)

echo.
echo Теперь используйте команду:
echo python sign_apk.py your-apk-file.apk
echo.
echo Или:
echo sign-apk.bat your-apk-file.apk
echo.

pause