#!/usr/bin/env python3
import os
import sys
import subprocess
import urllib.request
from pathlib import Path

def download_apk_signer():
    """Скачиваем uber-apk-signer если его нет"""
    tools_dir = Path("tools")
    tools_dir.mkdir(exist_ok=True)
    
    signer_path = tools_dir / "uber-apk-signer-1.3.0.jar"
    
    if not signer_path.exists():
        print("📥 Скачиваем uber-apk-signer...")
        url = "https://github.com/patrickfav/uber-apk-signer/releases/download/v1.3.0/uber-apk-signer-1.3.0.jar"
        
        try:
            urllib.request.urlretrieve(url, signer_path)
            print("✅ uber-apk-signer скачан успешно!")
        except Exception as e:
            print(f"❌ Ошибка скачивания: {e}")
            return None
    
    return signer_path

def check_java():
    """Проверяем наличие Java"""
    try:
        result = subprocess.run(["java", "-version"], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Java найдена")
            return True
    except FileNotFoundError:
        pass
    
    print("❌ Java не найдена! Установите Java JRE/JDK")
    print("Скачать можно здесь: https://www.oracle.com/java/technologies/downloads/")
    return False

def sign_apk(apk_path):
    """Подписываем APK файл"""
    if not Path(apk_path).exists():
        print(f"❌ APK файл не найден: {apk_path}")
        return False
    
    # Проверяем Java
    if not check_java():
        return False
    
    # Скачиваем signer
    signer_path = download_apk_signer()
    if not signer_path:
        return False
    
    print(f"🔐 Подписываем APK: {apk_path}")
    
    try:
        # Запускаем подпись
        cmd = [
            "java", "-jar", str(signer_path),
            "--apks", apk_path,
            "--out", "."
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            print("✅ APK успешно подписан!")
            
            # Ищем подписанный файл
            for file in Path(".").glob("*-aligned-debugSigned.apk"):
                print(f"📱 Подписанный APK: {file}")
                print(f"📏 Размер: {file.stat().st_size / 1024 / 1024:.2f} MB")
                return True
            
        else:
            print(f"❌ Ошибка подписи: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ Ошибка выполнения: {e}")
        return False

def main():
    print("🔐 APK Signer для Card Advisor KZ")
    print("=" * 40)
    
    if len(sys.argv) > 1:
        apk_path = sys.argv[1]
    else:
        apk_path = input("📂 Введите путь к APK файлу: ").strip()
    
    if sign_apk(apk_path):
        print("\n🎉 Готово! APK подписан и готов к установке!")
        print("\n📱 Для установки на Android:")
        print("1. Перенесите подписанный APK на устройство")
        print("2. Разрешите установку из неизвестных источников")
        print("3. Откройте файл и установите приложение")
    else:
        print("\n❌ Подпись не удалась")

if __name__ == "__main__":
    main()