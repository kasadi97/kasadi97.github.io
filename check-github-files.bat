@echo off
echo Проверка доступности файлов на GitHub Pages...
echo.

echo Основная страница:
curl -I https://kasadi97.github.io/card-advisor-kz-pwa/ | findstr "HTTP"

echo.
echo Манифест:
curl -I https://kasadi97.github.io/card-advisor-kz-pwa/manifest.json | findstr "HTTP"

echo.
echo PNG иконка 192x192:
curl -I https://kasadi97.github.io/card-advisor-kz-pwa/icons/icon-192x192.png | findstr "HTTP"

echo.
echo PNG иконка 512x512:
curl -I https://kasadi97.github.io/card-advisor-kz-pwa/icons/icon-512x512.png | findstr "HTTP"

echo.
echo Service Worker:
curl -I https://kasadi97.github.io/card-advisor-kz-pwa/sw.js | findstr "HTTP"

echo.
echo Все файлы проверены!
echo Теперь можно использовать PWABuilder: https://www.pwabuilder.com/
echo URL для ввода: https://kasadi97.github.io/card-advisor-kz-pwa/

pause