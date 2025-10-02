// Управление локальным хранилищем
class StorageService {
  static STORAGE_KEY = 'cardadvisor_user_cards';

  static getUserCards() {
    try {
      const cards = localStorage.getItem(this.STORAGE_KEY);
      return cards ? JSON.parse(cards) : [];
    } catch (error) {
      console.error('Ошибка загрузки карт:', error);
      return [];
    }
  }

  static saveUserCards(cards) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cards));
      return true;
    } catch (error) {
      console.error('Ошибка сохранения карт:', error);
      return false;
    }
  }

  static addUserCard(newCard) {
    try {
      const existingCards = this.getUserCards();
      const cardWithId = {
        ...newCard,
        id: Date.now().toString()
      };
      const updatedCards = [...existingCards, cardWithId];
      return this.saveUserCards(updatedCards);
    } catch (error) {
      console.error('Ошибка добавления карты:', error);
      return false;
    }
  }

  static removeUserCard(cardId) {
    try {
      const existingCards = this.getUserCards();
      const updatedCards = existingCards.filter(card => card.id !== cardId);
      return this.saveUserCards(updatedCards);
    } catch (error) {
      console.error('Ошибка удаления карты:', error);
      return false;
    }
  }

  static getCardsCount() {
    return this.getUserCards().length;
  }
}