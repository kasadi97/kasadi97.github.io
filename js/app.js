// Главный файл приложения
class App {
  constructor() {
    this.currentScreen = 'home';
    this.currentCategory = null;
    this.userCards = [];
    this.categories = []; // Сохраняем загруженные категории
    this.init();
  }

  async init() {
    // Инициализируем переводы
    TranslationService.init();
    
    // Показываем красивую загрузку
    this.showLoading();
    
    // Добавляем небольшую задержку для демонстрации загрузки
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    await this.loadUserCards();
    await this.loadCategories();
    this.updateCardsCount();
    this.loadHomeBanner();
    this.updateUI();
    this.hideLoading();
    
    // Добавляем welcome анимацию
    this.playWelcomeAnimation();
  }

  loadHomeBanner() {
    const bannerContainer = document.getElementById('home-banner');
    bannerContainer.innerHTML = this.createReferralBanner();
  }

  async loadUserCards() {
    this.userCards = StorageService.getUserCards();
  }

  async loadCategories() {
    try {
      this.showLoading();
      const categories = await DataService.fetchCategories();
      this.categories = categories; // Сохраняем категории
      this.renderCategories(categories);
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
      this.showError('Не удалось загрузить категории');
    }
  }

  renderCategories(categories) {
    const grid = document.getElementById('categories-grid');
    grid.innerHTML = categories.map(category => `
      <div class="category-card" onclick="app.showCategory('${category.id}')">
        <span class="category-card-icon">${category.icon}</span>
        <div class="category-card-name">${TranslationService.translate(category.id)}</div>
        <div class="category-card-count">${category.cards?.length || 0} ${TranslationService.translate('cardsCount')}</div>
      </div>
    `).join('');
  }

  showCategory(categoryId) {
    const category = DataService.getCategoryById(categoryId);
    if (!category) return;

    this.currentCategory = category;
    
    // Обновляем заголовок
    document.getElementById('category-icon').textContent = category.icon;
    document.getElementById('category-title').textContent = category.name;
    
    // Рендерим контент
    this.renderCategoryContent(category);
    
    // Показываем экран
    this.showScreen('category');
  }

  renderCategoryContent(category) {
    const content = document.getElementById('category-content');
    const bestCard = DataService.getBestCard(category);
    const bestUserCard = DataService.getBestUserCard(category, this.userCards);

    let html = '';

    // Лучшая карта пользователя или уведомление
    if (bestUserCard) {
      html += this.renderCardSection(
        bestUserCard,
        '🎯 Лучшая из ваших карт',
        'Используйте эту карту для максимального кэшбэка'
      );
    } else {
      html += `
        <div class="no-user-cards">
          <h3>У вас нет карт в этой категории</h3>
          <p>Добавьте карты в "Мои карты", чтобы получать персональные рекомендации</p>
        </div>
      `;
    }

    // Лучшая карта на рынке
    if (bestCard) {
      html += this.renderCardSection(
        bestCard,
        '🏆 Лучшая карта на рынке',
        'Максимальный кэшбэк в этой категории'
      );
    }

    // Все карты категории
    html += `
      <div class="card-container">
        <h3 class="section-title">Все карты в категории</h3>
        ${category.cards.map(card => {
          const serviceName = card.description.split(' - ')[0];
          const displayTitle = `${serviceName} (${card.bankName})`;
          return `
            <div class="small-card" style="border-left-color: ${card.color}">
              <div class="small-card-info">
                <h4>${displayTitle}</h4>
                <p>${card.cardName}</p>
              </div>
              <div class="small-card-cashback">${card.cashbackPercent}%</div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Добавляем реферальный баннер
    html += this.createReferralBanner();

    content.innerHTML = html;
  }

  renderCardSection(card, title, subtitle) {
    // Извлекаем название сервиса из описания (до первого " - ")
    const serviceName = card.description.split(' - ')[0];
    const displayTitle = `${serviceName} (${card.bankName})`;
    
    return `
      <div class="card-container">
        <h3 class="section-title">${title}</h3>
        <p class="section-subtitle">${subtitle}</p>
        
        <div class="card" style="border-left-color: ${card.color}">
          <div class="card-header">
            <div class="bank-name">${displayTitle}</div>
            <div class="cashback">${card.cashbackPercent}%</div>
          </div>
          
          <div class="card-name">${card.cardName}</div>
          <div class="card-description">${card.description}</div>
        </div>
      </div>
    `;
  }

  createReferralBanner() {
    return `
      <div class="referral-banner">
        <div class="referral-content">
          <div class="referral-icon">
            <img src="icons/freedom-l.png" alt="Freedom Bank" class="bank-logo" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div style="display:none; width:50px; height:50px; background:#FFFFFF; border-radius:8px; 
                       align-items:center; justify-content:center; font-weight:bold; color:#FF6B35;">F</div>
          </div>
          <div class="referral-text">
            <h3>Получите карту Freedom Bank</h3>
            <p>🎁 <strong>1000₸</strong> бонуса при регистрации<br>
            💰 От <strong>1500₸</strong> дополнительных бонусов</p>
            <p class="promo-code">Промокод: <strong>F5CFZKVZ</strong></p>
          </div>
          <div class="referral-action">
            <button class="referral-btn" onclick="window.open('https://freedombank.onelink.me/WNLd/biapz2um', '_blank')">
              Получить карту
            </button>
          </div>
        </div>
      </div>
    `;
  }

  showMyCards() {
    this.renderMyCards();
    this.showScreen('cards');
  }

  renderMyCards() {
    const cardsList = document.getElementById('user-cards-list');
    const emptyState = document.getElementById('empty-cards');
    const countElement = document.getElementById('cards-count-detail');
    const bannerContainer = document.getElementById('my-cards-banner');
    
    countElement.textContent = this.userCards.length;

    if (this.userCards.length === 0) {
      cardsList.innerHTML = '';
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
      cardsList.innerHTML = this.userCards.map(card => `
        <div class="user-card">
          <div class="user-card-info">
            <h4>${card.bankName}</h4>
            <p>${card.cardName}</p>
          </div>
          <button class="delete-btn" onclick="app.deleteCard('${card.id}')" 
                  title="Удалить карту">🗑️</button>
        </div>
      `).join('');
    }
    
    // Добавляем реферальный баннер
    bannerContainer.innerHTML = this.createReferralBanner();
  }

  deleteCard(cardId) {
    if (confirm('Вы уверены, что хотите удалить эту карту?')) {
      if (StorageService.removeUserCard(cardId)) {
        this.loadUserCards();
        this.renderMyCards();
        this.updateCardsCount();
        this.showSuccess('Карта удалена');
      } else {
        this.showError('Не удалось удалить карту');
      }
    }
  }

  showAddCardModal() {
    const modal = document.getElementById('add-card-modal');
    const bankSelect = document.getElementById('bank-select');
    
    // Заполняем список банков
    const banks = DataService.getAllBanks();
    bankSelect.innerHTML = '<option value="">Выберите банк</option>';
    banks.forEach(bank => {
      const option = document.createElement('option');
      option.value = bank;
      option.textContent = bank;
      bankSelect.appendChild(option);
    });
    
    modal.classList.add('show');
    bankSelect.focus();
  }

  hideAddCardModal() {
    const modal = document.getElementById('add-card-modal');
    modal.classList.remove('show');
    
    // Очищаем поля
    document.getElementById('bank-select').value = '';
    document.getElementById('card-name').value = '';
  }

  addCard() {
    const bankName = document.getElementById('bank-select').value;
    const cardName = document.getElementById('card-name').value.trim() || 'Основная карта';

    if (!bankName) {
      this.showError('Выберите банк');
      return;
    }

    const newCard = { bankName, cardName };
    
    if (StorageService.addUserCard(newCard)) {
      this.loadUserCards();
      this.renderMyCards();
      this.updateCardsCount();
      this.hideAddCardModal();
      this.showSuccess('Карта добавлена');
    } else {
      this.showError('Не удалось добавить карту');
    }
  }

  openReferralLink(url) {
    window.open(url, '_blank');
  }

  showScreen(screenName) {
    // Скрываем все экраны
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    
    // Показываем нужный экран
    document.getElementById(`${screenName}-screen`).classList.add('active');
    this.currentScreen = screenName;
  }

  switchLanguage(lang) {
    TranslationService.setLanguage(lang);
    
    // Обновляем активную кнопку языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Обновляем весь UI
    this.updateUI();
    
    // Перерендериваем текущий экран
    if (this.currentScreen === 'cards') {
      this.renderMyCards();
    } else if (this.currentScreen === 'category' && this.currentCategory) {
      this.renderCategoryContent(this.currentCategory);
    } else {
      // Быстрый рендер главной без задержки
      if (this.categories.length > 0) {
        this.renderCategories(this.categories);
      } else {
        this.loadCategories();
      }
      this.loadHomeBanner();
    }
  }

  updateUI() {
    // Обновляем активную кнопку языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${TranslationService.currentLanguage}"]`).classList.add('active');
    
    // Обновляем основные элементы интерфейса
    document.querySelector('.app-subtitle').textContent = TranslationService.translate('appSubtitle');
    
    // Обновляем статистику
    const statsText = document.querySelector('.stats-text');
    const cardsCount = document.getElementById('cards-count').textContent;
    statsText.innerHTML = `${TranslationService.translate('cardsRegistered')} <span id="cards-count">${cardsCount}</span> ${TranslationService.translate('cardsCount')}`;
    
    // Обновляем кнопку управления картами
    document.querySelector('.stats-container .btn').textContent = TranslationService.translate('manageCards');
  }

  showHome() {
    this.showScreen('home');
  }

  updateCardsCount() {
    const count = this.userCards.length;
    document.getElementById('cards-count').textContent = count;
    
    const detailElement = document.getElementById('cards-count-detail');
    if (detailElement) {
      detailElement.textContent = count;
    }
  }

  showLoading() {
    document.getElementById('loading').style.display = 'flex';
  }

  hideLoading() {
    document.getElementById('loading').style.display = 'none';
  }

  showSuccess(message) {
    this.showNotification(message, 'success');
  }

  showError(message) {
    this.showNotification(message, 'error');
  }

  showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Добавляем стили
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '600',
      zIndex: '10000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      backgroundColor: type === 'error' ? '#e74c3c' : 
                     type === 'success' ? '#27ae60' : '#3498db'
    });
    
    document.body.appendChild(notification);
    
    // Показываем уведомление
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Скрываем через 3 секунды
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  playWelcomeAnimation() {
    // Анимация появления карточек категорий с задержкой
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'all 0.4s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });

    // Мягкая анимация заголовка
    const title = document.querySelector('.app-title');
    title.style.transform = 'translateY(-10px)';
    title.style.transition = 'all 0.6s ease';
    setTimeout(() => {
      title.style.transform = 'translateY(0)';
    }, 300);
  }
}

// Глобальные функции для HTML
function showHome() {
  app.showHome();
}

function showMyCards() {
  app.showMyCards();
}

function showAddCardModal() {
  app.showAddCardModal();
}

function hideAddCardModal() {
  app.hideAddCardModal();
}

function addCard() {
  app.addCard();
}

// Обработка нажатия Enter в модальном окне
document.addEventListener('DOMContentLoaded', function() {
  const bankSelect = document.getElementById('bank-select');
  const cardNameInput = document.getElementById('card-name');
  
  // Обработка выбора банка
  if (bankSelect) {
    bankSelect.addEventListener('change', function(e) {
      if (e.target.value) {
        // Можно добавить логику если нужно
      }
    });
    
    bankSelect.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addCard();
      }
    });
  }
  
  // Обработка ввода названия карты
  if (cardNameInput) {
    cardNameInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addCard();
      }
    });
  }

  // Закрытие модального окна по клику вне его
  document.getElementById('add-card-modal').addEventListener('click', function(e) {
    if (e.target === this) {
      hideAddCardModal();
    }
  });
});

// Инициализация приложения
let app;
document.addEventListener('DOMContentLoaded', function() {
  app = new App();
});