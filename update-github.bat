@echo off
echo Коммит PNG иконок и обновленного манифеста...

git add .
git commit -m "feat: add PNG icons and update manifest for PWABuilder compliance"
git push origin main

echo Готово! Проверьте GitHub Pages: https://kasadi97.github.io/card-advisor-kz-pwa/
echo Используйте этот URL в PWABuilder для создания APK

pause