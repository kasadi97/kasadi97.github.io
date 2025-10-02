// Данные о категориях и картах с актуальными кэшбеками Казахстана
const CATEGORIES_DATA = [
  {
    id: "groceries",
    name: "Продукты и супермаркеты",
    icon: "🛒",
    cards: [
      {
        bankName: "Freedom Bank",
        cardName: "Freedom Card",
        cashbackPercent: 29,
        description: "Arbuz - до 29% кэшбек",
        referralLink: "https://freedom.kz",
        color: "#FF6B35"
      },
      {
        bankName: "Freedom Bank",
        cardName: "Freedom Card",
        cashbackPercent: 17,
        description: "Choco - до 17% кэшбек",
        referralLink: "https://freedom.kz",
        color: "#FF6B35"
      },
      {
        bankName: "Halyk Bank",
        cardName: "Halyk Card",
        cashbackPercent: 10,
        description: "Гипермаркеты METRO - 10% кэшбек",
        referralLink: "https://halykbank.kz",
        color: "#1E88E5"
      },
      {
        bankName: "БЦК",
        cardName: "БЦК Card",
        cashbackPercent: 8,
        description: "Small & Spar - 8% кэшбек (индивидуально)",
        referralLink: "https://bcc.kz",
        color: "#4CAF50"
      },
      {
        bankName: "Freedom Bank",
        cardName: "Freedom Card (универсальная)",
        cashbackPercent: 7,
        description: "Повышенный кэшбек почти везде - до 7%",
        referralLink: "https://freedom.kz",
        color: "#FF6B35"
      },
      {
        bankName: "Forte",
        cardName: "Яндекс Плюс Forte",
        cashbackPercent: 5,
        description: "Яндекс Go (раздел Еда) - до 5%",
        referralLink: "https://forte.kz",
        color: "#9C27B0"
      },
      {
        bankName: "Forte",
        cardName: "Forte Card",
        cashbackPercent: 5,
        description: "Кафе и рестораны - 5% кэшбек",
        referralLink: "https://forte.kz",
        color: "#9C27B0"
      }
    ]
  },
  {
    id: "gas",
    name: "АЗС и автоуслуги",
    icon: "⛽",
    cards: [
      {
        bankName: "Евразийский банк",
        cardName: "Автокарта",
        cashbackPercent: 10,
        description: "АЗС - до 10% кэшбек",
        referralLink: "https://eubank.kz",
        color: "#E53935"
      },
      {
        bankName: "Bereke Bank",
        cardName: "Bereke Card",
        cashbackPercent: 10,
        description: "АЗС - 10% кэшбек",
        referralLink: "https://berekebank.kz",
        color: "#FFC107"
      },
      {
        bankName: "Forte",
        cardName: "Яндекс Плюс Forte",
        cashbackPercent: 8,
        description: "АЗС - до 8% кэшбек",
        referralLink: "https://forte.kz",
        color: "#9C27B0"
      },
      {
        bankName: "Forte",
        cardName: "Forte Card",
        cashbackPercent: 3,
        description: "АЗС - до 3% кэшбек",
        referralLink: "https://forte.kz",
        color: "#9C27B0"
      }
    ]
  },
  {
    id: "restaurants",
    name: "Рестораны и доставка",
    icon: "🍕",
    cards: [
      {
        bankName: "RBK",
        cardName: "RBK Card",
        cashbackPercent: 25,
        description: "Рестораны ABR и приложение abr+ - до 25%",
        referralLink: "https://rbk.kz",
        color: "#795548"
      },
      {
        bankName: "Freedom Bank",
        cardName: "Freedom Card",
        cashbackPercent: 17,
        description: "Choco - до 17% кэшбек",
        referralLink: "https://freedom.kz",
        color: "#FF6B35"
      },
      {
        bankName: "Forte",
        cardName: "Яндекс Плюс Forte",
        cashbackPercent: 5,
        description: "Яндекс Go (раздел Еда) - до 5%",
        referralLink: "https://forte.kz",
        color: "#9C27B0"
      },
      {
        bankName: "Forte",
        cardName: "Forte Card",
        cashbackPercent: 5,
        description: "Кафе и рестораны - 5% кэшбек",
        referralLink: "https://forte.kz",
        color: "#9C27B0"
      }
    ]
  },
  {
    id: "entertainment",
    name: "Развлечения и кино",
    icon: "🎬",
    cards: [
      {
        bankName: "Евразийский банк",
        cardName: "Автокарта",
        cashbackPercent: 30,
        description: "Кино, концерты, театры, аттракционы - 30%",
        referralLink: "https://eubank.kz",
        color: "#E53935"
      },
      {
        bankName: "Bereke Bank",
        cardName: "Bereke Card (Меморина)",
        cashbackPercent: 30,
        description: "Кино - до 30% (через игру Меморина)",
        referralLink: "https://berekebank.kz",
        color: "#FFC107"
      },
      {
        bankName: "Freedom Bank",
        cardName: "Freedom Card",
        cashbackPercent: 22,
        description: "Ticketon - до 22% кэшбек",
        referralLink: "https://freedom.kz",
        color: "#FF6B35"
      },
      {
        bankName: "Halyk Bank",
        cardName: "Halyk Card",
        cashbackPercent: 15,
        description: "Kinokz - 15% кэшбек",
        referralLink: "https://halykbank.kz",
        color: "#1E88E5"
      }
    ]
  },
  {
    id: "transport",
    name: "Такси и транспорт",
    icon: "🚕",
    cards: [
      {
        bankName: "Activ",
        cardName: "Тариф Семейный",
        cashbackPercent: 100,
        description: "Onay, Avtobys, Tulpar card и CTS - 100% при оплате с баланса",
        referralLink: "https://activ.kz",
        color: "#00BCD4"
      },
      {
        bankName: "Freedom Bank",
        cardName: "Freedom Card",
        cashbackPercent: 100,
        description: "QazAvtoJol (платные дороги) - 100% возврат",
        referralLink: "https://freedom.kz",
        color: "#FF6B35"
      },
      {
        bankName: "Forte",
        cardName: "Яндекс Плюс Forte",
        cashbackPercent: 20,
        description: "Такси - до 20% кэшбек",
        referralLink: "https://forte.kz",
        color: "#9C27B0"
      },
      {
        bankName: "Freedom Bank",
        cardName: "Freedom Card",
        cashbackPercent: 17,
        description: "Авиа и ж/д билеты в приложении Freedom - до 17%",
        referralLink: "https://freedom.kz",
        color: "#FF6B35"
      },
      {
        bankName: "Bereke Bank",
        cardName: "Bereke Card",
        cashbackPercent: 10,
        description: "Такси - 10% кэшбек",
        referralLink: "https://berekebank.kz",
        color: "#FFC107"
      },
      {
        bankName: "Forte",
        cardName: "Forte Card",
        cashbackPercent: 10,
        description: "Такси - 10% кэшбек",
        referralLink: "https://forte.kz",
        color: "#9C27B0"
      },
      {
        bankName: "Alatau City Bank",
        cardName: "Alatau Card",
        cashbackPercent: 7,
        description: "Такси - 7% кэшбек",
        referralLink: "https://alataubank.kz",
        color: "#607D8B"
      },
      {
        bankName: "Евразийский банк",
        cardName: "Автокарта",
        cashbackPercent: 5,
        description: "Такси - 5% кэшбек",
        referralLink: "https://eubank.kz",
        color: "#E53935"
      },
      {
        bankName: "БЦК",
        cardName: "БЦК Card",
        cashbackPercent: 4,
        description: "Такси - 4% кэшбек (индивидуально)",
        referralLink: "https://bcc.kz",
        color: "#4CAF50"
      }
    ]
  },
  {
    id: "pharmacy",
    name: "Аптеки и здоровье",
    icon: "💊",
    cards: [
      {
        bankName: "Forte",
        cardName: "Forte Card",
        cashbackPercent: 7,
        description: "Аптеки - 7% кэшбек",
        referralLink: "https://forte.kz",
        color: "#9C27B0"
      },
      {
        bankName: "Alatau City Bank",
        cardName: "Alatau Card",
        cashbackPercent: 5,
        description: "Медцентры, фитнес, образование - 5%",
        referralLink: "https://alataubank.kz",
        color: "#607D8B"
      }
    ]
  },
  {
    id: "clothing",
    name: "Одежда и красота",
    icon: "👕",
    cards: [
      {
        bankName: "Forte",
        cardName: "Forte Card",
        cashbackPercent: 7,
        description: "Спорт - 7% кэшбек",
        referralLink: "https://forte.kz",
        color: "#9C27B0"
      },
      {
        bankName: "Forte",
        cardName: "Forte Card",
        cashbackPercent: 5,
        description: "Красота и уход - 5% кэшбек",
        referralLink: "https://forte.kz",
        color: "#9C27B0"
      },
      {
        bankName: "Alatau City Bank",
        cardName: "Alatau Card",
        cashbackPercent: 3,
        description: "Одежда и обувь - 3% кэшбек",
        referralLink: "https://alataubank.kz",
        color: "#607D8B"
      }
    ]
  },
  {
    id: "online",
    name: "Интернет-покупки",
    icon: "🛍️",
    cards: [
      {
        bankName: "Freedom Bank",
        cardName: "Freedom Mobile",
        cashbackPercent: 37,
        description: "Смартфоны - до 37% кэшбек",
        referralLink: "https://freedom.kz",
        color: "#FF6B35"
      },
      {
        bankName: "Freedom Bank",
        cardName: "Freedom Drive",
        cashbackPercent: 26,
        description: "Шины - до 26% кэшбек",
        referralLink: "https://freedom.kz",
        color: "#FF6B35"
      },
      {
        bankName: "Alatau City Bank",
        cardName: "Alatau Card",
        cashbackPercent: 20,
        description: "Товары для детей - 20% кэшбек",
        referralLink: "https://alataubank.kz",
        color: "#607D8B"
      },
      {
        bankName: "Forte",
        cardName: "Forte Card",
        cashbackPercent: 20,
        description: "Forte Market - 20% кэшбек",
        referralLink: "https://forte.kz",
        color: "#9C27B0"
      },
      {
        bankName: "Freedom Bank",
        cardName: "Freedom Card",
        cashbackPercent: 19,
        description: "Naimi в приложении Freedom - до 19%",
        referralLink: "https://freedom.kz",
        color: "#FF6B35"
      },
      {
        bankName: "Freedom Bank",
        cardName: "Freedom Card",
        cashbackPercent: 12,
        description: "Туры в приложении Freedom - до 12%",
        referralLink: "https://freedom.kz",
        color: "#FF6B35"
      },
      {
        bankName: "Halyk Bank",
        cardName: "Halyk QR Card",
        cashbackPercent: 10,
        description: "Alser - 10% кэшбек",
        referralLink: "https://halykbank.kz",
        color: "#1E88E5"
      },
      {
        bankName: "Forte",
        cardName: "Forte Card",
        cashbackPercent: 10,
        description: "Forte Travel - 10% кэшбек",
        referralLink: "https://forte.kz",
        color: "#9C27B0"
      },
      {
        bankName: "БЦК",
        cardName: "БЦК Card",
        cashbackPercent: 10,
        description: "Clever - 10% кэшбек (индивидуально)",
        referralLink: "https://bcc.kz",
        color: "#4CAF50"
      },
      {
        bankName: "Евразийский банк",
        cardName: "Автокарта",
        cashbackPercent: 5,
        description: "Зоомагазины и услуги - 5% кэшбек",
        referralLink: "https://eubank.kz",
        color: "#E53935"
      }
    ]
  },
  {
    id: "utilities",
    name: "Коммунальные услуги",
    icon: "🏠",
    cards: [
      {
        bankName: "Activ",
        cardName: "Тариф Семейный",
        cashbackPercent: 20,
        description: "Коммуналка - 20% при оплате с баланса",
        referralLink: "https://activ.kz",
        color: "#00BCD4"
      },
      {
        bankName: "Forte",
        cardName: "Forte Card",
        cashbackPercent: 10,
        description: "Коммуналка, Интернет и ТВ - 10%",
        referralLink: "https://forte.kz",
        color: "#9C27B0"
      }
    ]
  },
  {
    id: "insurance",
    name: "Страхование",
    icon: "🛡️",
    cards: [
      {
        bankName: "Halyk Bank",
        cardName: "Halyk Card",
        cashbackPercent: 50,
        description: "КАСКО - скидка 50%",
        referralLink: "https://halykbank.kz",
        color: "#1E88E5"
      },
      {
        bankName: "Freedom Bank",
        cardName: "Freedom Card",
        cashbackPercent: 23,
        description: "КАСКО - 23% кэшбек",
        referralLink: "https://freedom.kz",
        color: "#FF6B35"
      },
      {
        bankName: "Freedom Bank",
        cardName: "Freedom Card",
        cashbackPercent: 20,
        description: "Страховка для туристов - 20%",
        referralLink: "https://freedom.kz",
        color: "#FF6B35"
      },
      {
        bankName: "Kcell/Activ",
        cardName: "Kcell/Activ",
        cashbackPercent: 10,
        description: "ОГПО, МиниКАСКО, туристическая - 10% OGO бонусов",
        referralLink: "https://kcell.kz",
        color: "#00BCD4"
      },
      {
        bankName: "Freedom Bank",
        cardName: "Freedom Card",
        cashbackPercent: 5,
        description: "ОГПО - 5% кэшбек",
        referralLink: "https://freedom.kz",
        color: "#FF6B35"
      }
    ]
  }
];

// Функции для работы с данными
class DataService {
  static getCategories() {
    return CATEGORIES_DATA;
  }

  static getCategoryById(id) {
    return CATEGORIES_DATA.find(cat => cat.id === id);
  }

  static getBestCard(category) {
    if (!category?.cards?.length) return null;
    return category.cards.reduce((best, current) => 
      current.cashbackPercent > best.cashbackPercent ? current : best
    );
  }

  static getBestUserCard(category, userCards) {
    if (!userCards?.length || !category?.cards?.length) return null;

    const availableUserCards = category.cards.filter(categoryCard => 
      userCards.some(userCard => 
        userCard.bankName === categoryCard.bankName && 
        userCard.cardName === categoryCard.cardName
      )
    );

    if (!availableUserCards.length) return null;

    return availableUserCards.reduce((best, current) => 
      current.cashbackPercent > best.cashbackPercent ? current : best
    );
  }

  // Симуляция загрузки с сервера
  static async fetchCategories() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(CATEGORIES_DATA);
      }, 500);
    });
  }

  // Получить список всех банков
  static getAllBanks() {
    const banksSet = new Set();
    CATEGORIES_DATA.forEach(category => {
      category.cards.forEach(card => {
        banksSet.add(card.bankName);
      });
    });
    return Array.from(banksSet).sort();
  }
}