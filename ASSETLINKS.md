# Digital Asset Links для Card Advisor KZ

## Что это такое?
Digital Asset Links - это файл, который связывает ваш веб-сайт с Android приложением. Это позволяет:
- Скрыть адресную строку браузера в APK
- Обеспечить нативный опыт приложения
- Позволить приложению открывать ссылки без браузера

## Файлы:
- `/.well-known/assetlinks.json` - основной файл (стандартное расположение)
- `/assetlinks.json` - дублирующий файл в корне (для совместимости)

## Важно!
SHA256 отпечаток в файле должен соответствовать ключу подписи APK. 

## Для PWABuilder:
1. Используйте конфигурацию из `pwabuilder-config.json`
2. Убедитесь, что package_name совпадает: `kz.cardadvisor.pwa`
3. При генерации APK SHA256 отпечаток может измениться - нужно будет обновить файл

## Проверка:
После деплоя файл должен быть доступен по адресу:
https://kasadi97.github.io/card-advisor-kz-pwa/.well-known/assetlinks.json

## Генерация SHA256:
Получить отпечаток можно командой:
```bash
keytool -list -v -keystore android-key.keystore
```