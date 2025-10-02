from PIL import Image, ImageDraw, ImageFont
import os

# Создаем папку icons если её нет
os.makedirs('icons', exist_ok=True)

def create_icon(size, filename):
    # Создаем изображение с синим фоном
    img = Image.new('RGB', (size, size), '#3B82F6')
    draw = ImageDraw.Draw(img)
    
    # Рисуем белый прямоугольник (карта)
    card_width = int(size * 0.7)
    card_height = int(size * 0.4)
    card_x = (size - card_width) // 2
    card_y = (size - card_height) // 2
    
    draw.rectangle([card_x, card_y, card_x + card_width, card_y + card_height], 
                  fill='white', outline='#E9ECEF', width=2)
    
    # Рисуем полоску на карте
    stripe_height = int(card_height * 0.2)
    draw.rectangle([card_x + 10, card_y + 10, card_x + card_width - 10, card_y + 10 + stripe_height], 
                  fill='#3B82F6')
    
    # Рисуем кружок (чип)
    chip_size = int(size * 0.08)
    chip_x = card_x + 20
    chip_y = card_y + card_height - 40
    draw.ellipse([chip_x, chip_y, chip_x + chip_size, chip_y + chip_size], 
                fill='#10B981')
    
    # Сохраняем
    img.save(f'icons/{filename}', 'PNG')
    print(f'Created {filename} ({size}x{size})')

# Создаем иконки
try:
    create_icon(192, 'icon-192x192.png')
    create_icon(512, 'icon-512x512.png')
    print("PNG icons created successfully!")
except ImportError:
    print("PIL not installed. Please install with: pip install Pillow")
    print("Or create PNG icons manually using any image editor.")