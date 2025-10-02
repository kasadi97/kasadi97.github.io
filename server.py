#!/usr/bin/env python3
"""
Простой HTTP сервер для PWA Card Advisor
Запустите: python server.py
Откройте в браузере: http://localhost:8000
"""

import http.server
import socketserver
import os
import sys

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Добавляем заголовки для PWA и отключаем кэш
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '-1')
        self.send_header('Service-Worker-Allowed', '/')
        super().end_headers()

    def guess_type(self, path):
        mimetype = super().guess_type(path)
        # Исправляем MIME типы для PWA
        if path.endswith('.webmanifest') or path.endswith('manifest.json'):
            return 'application/manifest+json'
        elif path.endswith('.js'):
            return 'application/javascript'
        return mimetype

def main():
    # Переходим в директорию с файлами PWA
    web_dir = os.path.dirname(os.path.realpath(__file__))
    os.chdir(web_dir)
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 Сервер запущен на порту {PORT}")
        print(f"📱 Откройте в браузере: http://localhost:{PORT}")
        print(f"🌐 Для создания APK используйте: https://www.pwabuilder.com")
        print(f"📂 Корневая папка: {web_dir}")
        print("\nДля остановки нажмите Ctrl+C")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Сервер остановлен")
            httpd.shutdown()

if __name__ == "__main__":
    main()