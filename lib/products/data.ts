import type { Product } from "./types";

const CDN = "https://www.ohaus.ru/getmedia";

// Stage 2 — segment «Лабораторные», group «Весы».
// Descriptions are original RU summaries; specs are factual values.
export const products: Product[] = [
  // --- Аналитические весы ---
  {
    listing: ["balances-scales", "analytical-balances"],
    model: "explorer-semi-micro",
    name: "Полумикровесы Explorer™",
    series: "explorer",
    seriesLabel: "Explorer™",
    image: `${CDN}/8a4a0429-2caf-4504-b6c0-c24af11606ae/Explorer_Semi_Micro_600x600`,
    summary:
      "Полумикровесы серии Explorer™ для задач высокой точности с дискретностью 0,01 мг. Цветной сенсорный экран, встроенная автокалибровка AutoCal™ и поддержка пользовательских профилей.",
    specs: [
      { label: "Дискретность", value: "0,01 мг" },
      { label: "Наибольший предел взвешивания", value: "до 220 г" },
      { label: "Калибровка", value: "AutoCal™ (встроенная)" },
      { label: "Дисплей", value: "Цветной сенсорный экран" },
      { label: "Профили пользователей", value: "до 6" },
    ],
  },
  {
    listing: ["balances-scales", "analytical-balances"],
    model: "explorer-analytical",
    name: "Аналитические весы Explorer™",
    series: "explorer",
    seriesLabel: "Explorer™",
    image: `${CDN}/eefd7d71-d9c2-4edc-a195-180d2ec7dc94/Explorer-Analytical_Main_Image_600x600`,
    summary:
      "Аналитические весы Explorer™ с большим цветным сенсорным экраном и коротким временем стабилизации. Модели AD оснащены автоматическими дверцами ветрозащиты.",
    specs: [
      { label: "Калибровка", value: "AutoCal™" },
      { label: "Дисплей", value: "Большой цветной сенсорный экран" },
      { label: "Стабилизация", value: "Короткое время установления" },
      { label: "Ветрозащита", value: "Автоматические дверцы (модели AD)" },
    ],
  },
  {
    listing: ["balances-scales", "analytical-balances"],
    model: "adventurer-analytical",
    name: "Аналитические весы Adventurer™",
    series: "adventurer",
    seriesLabel: "Adventurer™",
    image: `${CDN}/4a2a4123-81be-4b1f-ad00-f8c26b79f252/Adventurer_Analytical_Main_600x600`,
    summary:
      "Аналитические весы Adventurer™ с цветным сенсорным экраном и пиктограммным интерфейсом. Компактная и прочная конструкция, несколько вариантов подключения внешних устройств.",
    specs: [
      { label: "Калибровка", value: "AutoCal™" },
      { label: "Дисплей", value: "Цветной сенсорный экран" },
      { label: "Интерфейс", value: "Пиктограммная навигация" },
      { label: "Конструкция", value: "Компактная, прочная" },
    ],
  },
  {
    listing: ["balances-scales", "analytical-balances"],
    model: "pioneer-semi-micro",
    name: "Полумикровесы Pioneer™",
    series: "pioneer",
    seriesLabel: "Pioneer™",
    image: `${CDN}/9d0ff021-4b68-4b17-b64f-b95afbc8f64b/Pioneer_Semi-Micro_Density_600x600-1`,
    summary:
      "Полумикровесы Pioneer™ для лабораторий с высокими требованиями к точности и повторяемости. Литой металлический корпус, чаша из нержавеющей стали, двойной дисплей и USB-подключение.",
    specs: [
      { label: "Корпус", value: "Литой металл" },
      { label: "Чаша", value: "Нержавеющая сталь" },
      { label: "Дисплей", value: "Двойной линейный" },
      { label: "Интерфейс", value: "USB, антистатическая планка" },
    ],
  },
  {
    listing: ["balances-scales", "analytical-balances"],
    model: "pioneer-analytical",
    name: "Аналитические весы Pioneer™",
    series: "pioneer",
    seriesLabel: "Pioneer™",
    image: `${CDN}/118d9617-db1a-43c6-8a07-7861f118dc78/Pioneer_Analytical_Density_600x600-1`,
    summary:
      "Аналитические весы Pioneer™ — практичное решение для рутинных задач взвешивания. Литой металлический корпус, платформа из нержавеющей стали, вторичный линейный дисплей и USB-интерфейс.",
    specs: [
      { label: "Корпус", value: "Литой металл" },
      { label: "Платформа", value: "Нержавеющая сталь" },
      { label: "Дисплей", value: "Двойной линейный" },
      { label: "Интерфейс", value: "USB" },
    ],
  },
  {
    listing: ["balances-scales", "analytical-balances"],
    model: "pr-analytical",
    name: "Аналитические весы серии PR",
    series: "pr-series",
    seriesLabel: "Серия PR",
    image: `${CDN}/dbde1b5f-7c90-40c2-bee0-adb113fad131/PR_Series_Analytical_Right_1_600x600`,
    summary:
      "Аналитические весы серии PR с компактным корпусом и ярким дисплеем с подсветкой. Интерфейс RS-232 и автоматическая калибровка в отдельных моделях.",
    specs: [
      { label: "Интерфейс", value: "RS-232" },
      { label: "Калибровка", value: "Автоматическая (отдельные модели)" },
      { label: "Дисплей", value: "Яркий, с подсветкой" },
      { label: "Чаша", value: "Нержавеющая сталь" },
    ],
  },

  // --- Прецизионные весы ---
  {
    listing: ["balances-scales", "precision-balances"],
    model: "explorer-precision",
    name: "Прецизионные весы Explorer™",
    series: "explorer",
    seriesLabel: "Explorer™",
    image: `${CDN}/d671adc3-a8d0-425d-b2eb-d9294f6a2e4c/Explorer_Precision_Main_High_600x600`,
    summary:
      "Прецизионные весы Explorer™ с большим цветным сенсорным экраном и быстрой стабилизацией. Модульная конструкция со съёмным терминалом и повышенная устойчивость к вибрациям.",
    specs: [
      { label: "Калибровка", value: "AutoCal™ (опционально)" },
      { label: "Дисплей", value: "Цветной сенсорный экран" },
      { label: "Терминал", value: "Съёмный" },
      { label: "Стабилизация", value: "Быстрая" },
    ],
  },
  {
    listing: ["balances-scales", "precision-balances"],
    model: "explorer-high-capacity",
    name: "Большегрузные прецизионные весы Explorer™",
    series: "explorer",
    seriesLabel: "Explorer™ High Capacity",
    image: `${CDN}/c9b881bc-d7fb-4f9e-9823-2e458374df98/Explorer_High_Capacity_Main_600x600-1`,
    summary:
      "Большегрузные прецизионные весы Explorer™ с цельным прецизионным измерительным блоком. Ударопрочный корпус с защитой IP54, цветной сенсорный терминал и программируемые бесконтактные датчики.",
    specs: [
      { label: "Измерительный блок", value: "Цельнометаллический" },
      { label: "Калибровка", value: "AutoCal™" },
      { label: "Защита", value: "IP54, ударопрочный" },
      { label: "Дисплей", value: "Цветной сенсорный, съёмный терминал" },
    ],
  },
  {
    listing: ["balances-scales", "precision-balances"],
    model: "adventurer-precision",
    name: "Прецизионные весы Adventurer™",
    series: "adventurer",
    seriesLabel: "Adventurer™",
    image: `${CDN}/ab9f36a6-a77f-4739-8708-014aca1b6480/Adventurer_Precision_Main_High_600x600`,
    summary:
      "Прецизионные весы Adventurer™ с цветным сенсорным экраном и пиктограммным интерфейсом. Компактный корпус с большой платформой и защитным чехлом, несколько вариантов подключения.",
    specs: [
      { label: "Калибровка", value: "AutoCal™" },
      { label: "Дисплей", value: "Цветной сенсорный экран" },
      { label: "Платформа", value: "Большая, с защитным чехлом" },
      { label: "Интерфейс", value: "Несколько вариантов подключения" },
    ],
  },
  {
    listing: ["balances-scales", "precision-balances"],
    model: "pioneer-precision",
    name: "Прецизионные весы Pioneer™",
    series: "pioneer",
    seriesLabel: "Pioneer™",
    image: `${CDN}/f5c57a5e-bb8b-4620-a357-1258661485b3/Pioneer_Main_High_600x600`,
    summary:
      "Прецизионные весы Pioneer™ — доступное и надёжное решение для базовых задач. Литой металлический корпус, чаша из нержавеющей стали, двойной дисплей и USB-подключение.",
    specs: [
      { label: "Корпус", value: "Литой металл" },
      { label: "Чаша", value: "Нержавеющая сталь" },
      { label: "Дисплей", value: "Двойной линейный" },
      { label: "Интерфейс", value: "USB, антистатическая планка" },
    ],
  },
  {
    listing: ["balances-scales", "precision-balances"],
    model: "pr-precision",
    name: "Прецизионные весы серии PR",
    series: "pr-series",
    seriesLabel: "Серия PR",
    image: `${CDN}/65e0101d-0d6f-43b9-b004-0484682f968c/PR_Series_Main_600x600-1`,
    summary:
      "Прецизионные весы серии PR с ярким дисплеем и компактным корпусом. Поддержка основных режимов взвешивания, интерфейс RS-232 и встроенная автокалибровка в отдельных моделях.",
    specs: [
      { label: "Дисплей", value: "Яркий, с подсветкой" },
      { label: "Режимы", value: "Три основных режима" },
      { label: "Интерфейс", value: "RS-232" },
      { label: "Калибровка", value: "Автоматическая (отдельные модели)" },
    ],
  },

  // --- Портативные весы ---
  {
    listing: ["portable-scales-2"],
    model: "scout-stx",
    name: "Scout™ STX",
    series: "scout",
    seriesLabel: "Scout™",
    image: `${CDN}/565a7861-ddb5-4570-8c90-e0d6cd87fb11/STX_ASquare_Pan_600x600`,
    summary:
      "Портативные весы Scout™ STX с цветным сенсорным экраном и пиктограммным меню. Время стабилизации до 1 секунды, защита от перегрузки до 10-кратного НПВ, штабелируемый корпус.",
    specs: [
      { label: "Дисплей", value: "Цветной сенсорный экран" },
      { label: "Стабилизация", value: "≤ 1 с" },
      { label: "Защита от перегрузки", value: "10× НПВ" },
      { label: "Конструкция", value: "Штабелируемая" },
    ],
  },
  {
    listing: ["portable-scales-2"],
    model: "scout-spx",
    name: "Scout™ SPX",
    series: "scout",
    seriesLabel: "Scout™",
    image: `${CDN}/e5c80ee4-bb1b-4158-b00f-a84345e24b29/SPX_AFlat_600x600`,
    summary:
      "Портативные весы Scout™ SPX с большим дисплеем с подсветкой для работы при слабом освещении. Время стабилизации около 1 секунды, ударопрочная чаша и встроенная защита от перегрузки.",
    specs: [
      { label: "Дисплей", value: "С подсветкой" },
      { label: "Стабилизация", value: "≈ 1 с" },
      { label: "Чаша", value: "Ударопрочная" },
      { label: "Защита от перегрузки", value: "Встроенная" },
    ],
  },
  {
    listing: ["portable-scales-2"],
    model: "navigator",
    name: "Navigator™",
    series: "navigator",
    seriesLabel: "Navigator™",
    image: `${CDN}/6e97f0d7-4fd8-41ab-914d-4835aaaa6c20/Navigator_ARound_600x600`,
    summary:
      "Портативные весы Navigator™ — универсальное и доступное решение для повседневного взвешивания. Время стабилизации менее 1 секунды и защита от перегрузки до 4-кратного НПВ.",
    specs: [
      { label: "Назначение", value: "Универсальное взвешивание" },
      { label: "Стабилизация", value: "< 1 с" },
      { label: "Защита от перегрузки", value: "4× НПВ" },
    ],
  },
  {
    listing: ["portable-scales-2"],
    model: "compass-cx",
    name: "Compass™ CX",
    series: "compass",
    seriesLabel: "Compass™",
    image: `${CDN}/e3a94da0-8ba1-4726-98f8-1d409126d0be/portable-CX`,
    summary:
      "Портативные весы Compass™ CX с тонким компактным корпусом. Дисплей с подсветкой, до 1000 часов работы от щелочных батарей, штабелирование до 4 единиц.",
    specs: [
      { label: "Питание", value: "до 1000 ч (щелочные элементы)" },
      { label: "Дисплей", value: "С подсветкой" },
      { label: "Хранение", value: "Штабелирование до 4 шт." },
      { label: "Конструкция", value: "Тонкая, компактная" },
    ],
  },
  {
    listing: ["portable-scales-2"],
    model: "compass-cr",
    name: "Compass™ CR",
    series: "compass",
    seriesLabel: "Compass™",
    image: `${CDN}/f2d77193-c433-48e1-b824-8f0e275360e8/portable-CR`,
    summary:
      "Портативные весы Compass™ CR с интуитивным управлением двумя кнопками. Тонкий штабелируемый корпус и большая платформа для объёмных проб.",
    specs: [
      { label: "Управление", value: "Две кнопки" },
      { label: "Платформа", value: "Большая" },
      { label: "Конструкция", value: "Тонкая, штабелируемая" },
    ],
  },

  // ======================= Оборудование =======================

  // --- Центрифуги ---
  {
    listing: ["equipment", "centrifuges"],
    model: "frontier-5000-multi-pro",
    name: "Центрифуга Frontier™ 5000 Multi Pro",
    series: "frontier-5000",
    seriesLabel: "Frontier™ 5000",
    image: `${CDN}/fd00041f-ab81-4414-8158-18d2936ea82c/Multi-Pro-5718R-Centrifuges-Main_blue_screen`,
    summary:
      "Высокоскоростная универсальная лабораторная центрифуга Frontier™ 5000 Multi Pro. Автоматическое распознавание ротора, ЖК-дисплей с подсветкой, корпус из нержавеющей стали и широкая совместимость с роторами.",
    specs: [
      { label: "Тип", value: "Универсальная, высокоскоростная" },
      { label: "Распознавание ротора", value: "Автоматическое" },
      { label: "Дисплей", value: "ЖК с подсветкой" },
      { label: "Корпус", value: "Нержавеющая сталь" },
    ],
  },
  {
    listing: ["equipment", "centrifuges"],
    model: "frontier-5000-multi",
    name: "Центрифуга Frontier™ 5000 Multi",
    series: "frontier-5000",
    seriesLabel: "Frontier™ 5000",
    image: `${CDN}/4d741418-4dae-4075-af4a-d9de7488fb5d/Frontier5000Multi1`,
    summary:
      "Компактная многофункциональная центрифуга Frontier™ 5000 Multi для общелабораторных задач. Совместима со стандартными пробирками 50 и 15 мл, с дополнительным оснащением — до 1,5 мл.",
    specs: [
      { label: "Тип", value: "Многофункциональная" },
      { label: "Пробирки", value: "50 мл, 15 мл (до 1,5 мл с адаптерами)" },
      { label: "Конструкция", value: "Настольная, компактная" },
    ],
  },
  {
    listing: ["equipment", "centrifuges"],
    model: "frontier-5000-micro",
    name: "Микроцентрифуга Frontier™ 5000 Micro",
    series: "frontier-5000",
    seriesLabel: "Frontier™ 5000",
    image: `${CDN}/14dc6ed8-2fbe-4665-8c9f-16a838266294/Micro-5515R-Centrifuges-Main_blue_screen`,
    summary:
      "Высокоскоростная микроцентрифуга Frontier™ 5000 Micro для малых объёмов. Совместима с пробирками 1,5/2 и 5 мл, ПЦР-стриптами, криопробирками и капиллярами.",
    specs: [
      { label: "Тип", value: "Микроцентрифуга, высокоскоростная" },
      { label: "Пробирки", value: "1,5 / 2 / 5 мл, ПЦР-стрипы, капилляры" },
      { label: "Интерфейс", value: "Удобен при работе в перчатках" },
    ],
  },
  {
    listing: ["equipment", "centrifuges"],
    model: "frontier-5000-mini",
    name: "Мини-центрифуга Frontier™ 5000 Mini",
    series: "frontier-5000",
    seriesLabel: "Frontier™ 5000",
    image: `${CDN}/6031bc3a-7195-4b26-8d71-e9f1f139f1bd/Frontier_5000_Series_Mini_AMain_600x600`,
    summary:
      "Компактная мини-центрифуга Frontier™ 5000 Mini с бесщёточным двигателем. Автостарт при закрытии крышки, датчик дисбаланса ротора и двойные защитные переключатели, низкий уровень шума.",
    specs: [
      { label: "Двигатель", value: "Бесщёточный, низковольтный" },
      { label: "Запуск", value: "Автоматический при закрытии крышки" },
      { label: "Безопасность", value: "Датчик дисбаланса, двойная защита" },
    ],
  },
  {
    listing: ["equipment", "centrifuges"],
    model: "frontier-rotors-5000",
    name: "Роторы Frontier™ 5000",
    series: "frontier-5000",
    seriesLabel: "Frontier™ 5000",
    image: `${CDN}/cfc758d5-e981-45dc-a71c-1972a50350d5/Frontier_Rotors_1_600x600`,
    summary:
      "Роторы и аксессуары для центрифуг Frontier™ 5000 из алюминиевого сплава или полипропилена. Простая установка и извлечение проб, совместимость с автоклавированием.",
    specs: [
      { label: "Материал", value: "Алюминиевый сплав / полипропилен" },
      { label: "Стерилизация", value: "Автоклавирование" },
      { label: "Варианты", value: "Под разные объёмы проб" },
    ],
  },

  // --- Открытые шейкеры ---
  {
    listing: ["equipment", "open-air-shakers"],
    model: "heavy-duty-orbital",
    name: "Орбитальные шейкеры тяжелого типа",
    series: "open-air",
    seriesLabel: "Открытые шейкеры",
    image: `${CDN}/1d6d03d1-6de1-49c2-b854-cb8c542cb805/Heavy-Duty-Orbital-Shakers-Main`,
    summary:
      "Орбитальные шейкеры тяжелого типа с цифровым управлением скоростью Accu-Drive. Различные варианты грузоподъёмности, безобслуживаемый двигатель и более 70 аксессуаров.",
    specs: [
      { label: "Движение", value: "Орбитальное" },
      { label: "Управление", value: "Цифровое (Accu-Drive)" },
      { label: "Двигатель", value: "Безобслуживаемый" },
      { label: "Аксессуары", value: "70+ вариантов" },
    ],
  },
  {
    listing: ["equipment", "open-air-shakers"],
    model: "extreme-environment",
    name: "Шейкеры для экстремальных условий",
    series: "open-air",
    seriesLabel: "Открытые шейкеры",
    image: `${CDN}/89001ee7-5083-4897-a1b5-b0f3d7d2d66c/Extreme_Environment_Shakers_AMain_600x600`,
    summary:
      "Шейкеры для эксплуатации в экстремальных условиях, работающие при влажности до 100%. Высокая грузоподъёмность, трёхэксцентриковый привод и прецизионное управление Accu-Drive.",
    specs: [
      { label: "Условия", value: "Влажность до 100%" },
      { label: "Привод", value: "Трёхэксцентриковый" },
      { label: "Управление", value: "Accu-Drive" },
      { label: "Аксессуары", value: "50+ вариантов" },
    ],
  },
  {
    listing: ["equipment", "open-air-shakers"],
    model: "light-duty-orbital",
    name: "Орбитальные шейкеры легкого типа",
    series: "open-air",
    seriesLabel: "Открытые шейкеры",
    image: `${CDN}/0e331c26-278e-4033-8ee7-870dd8bacbdd/Light_Duty_Orbital_Shakers_AMain_600x600`,
    summary:
      "Орбитальные шейкеры легкого типа с аналоговым управлением и плавным ходом. Готовый к работе поддон с резиновым ковриком, мягкий разгон и 20 аксессуаров; есть версия для микропланшетов.",
    specs: [
      { label: "Движение", value: "Орбитальное" },
      { label: "Управление", value: "Аналоговое" },
      { label: "Разгон", value: "Плавный" },
      { label: "Аксессуары", value: "20 вариантов" },
    ],
  },
  {
    listing: ["equipment", "open-air-shakers"],
    model: "rocking-waving",
    name: "Шейкеры-качалки и волновые шейкеры",
    series: "open-air",
    seriesLabel: "Открытые шейкеры",
    image: `${CDN}/fd26a2ee-16cc-4e0e-a971-b05a58160293/Rocking_And_Waving_AMain_600x600`,
    summary:
      "Шейкеры-качалки и волновые шейкеры с электронной регулировкой угла наклона (шаг 1°) и скорости (шаг 1 об/мин). Сенсорная панель управления и плавный разгон.",
    specs: [
      { label: "Угол наклона", value: "Электронный, шаг 1°" },
      { label: "Скорость", value: "Шаг 1 об/мин" },
      { label: "Управление", value: "Сенсорная панель" },
    ],
  },
  {
    listing: ["equipment", "open-air-shakers"],
    model: "reciprocating",
    name: "Возвратно-поступательные шейкеры",
    series: "open-air",
    seriesLabel: "Открытые шейкеры",
    image: `${CDN}/3595e502-c02a-460b-9e4e-e577cb34fc25/High_Speed_Microplate_Shaker_Right`,
    summary:
      "Возвратно-поступательные шейкеры с плавным разгоном и определением нагрузки. Широкая совместимость с аксессуарами и регулируемая интенсивность перемешивания.",
    specs: [
      { label: "Движение", value: "Возвратно-поступательное" },
      { label: "Разгон", value: "Плавный" },
      { label: "Определение нагрузки", value: "Есть" },
    ],
  },
  {
    listing: ["equipment", "open-air-shakers"],
    model: "high-speed-microplate",
    name: "Высокоскоростные шейкеры для микропланшетов",
    series: "open-air",
    seriesLabel: "Открытые шейкеры",
    image: `${CDN}/3595e502-c02a-460b-9e4e-e577cb34fc25/High_Speed_Microplate_Shaker_Right`,
    summary:
      "Высокоскоростные шейкеры для микропланшетов вместимостью до 48 планшетов. Интервальный режим, сенсорное управление со светодиодной индикацией.",
    specs: [
      { label: "Вместимость", value: "до 48 микропланшетов" },
      { label: "Макс. нагрузка", value: "3,2 кг" },
      { label: "Интервальный режим", value: "1–59 с" },
      { label: "Управление", value: "Сенсорное, LED-индикация" },
    ],
  },

  // --- Шейкеры-инкубаторы ---
  {
    listing: ["equipment", "incubating-incubating-cooling-shakers"],
    model: "incubating-cooling-thermal",
    name: "Шейкеры-инкубаторы с охлаждением и термошейкеры",
    series: "incubating",
    seriesLabel: "Шейкеры-инкубаторы",
    image: `${CDN}/42e1db6d-3396-462b-8bec-b5956ce231f3/Incubating_Cooling_Thermal_AMain_600x600`,
    summary:
      "Шейкеры-инкубаторы с охлаждением и термошейкеры с нагревом и охлаждением (до 17 °C ниже окружающей). Сенсорный дисплей с поддержкой 6 языков, память на 5 программ, USB-порт.",
    specs: [
      { label: "Температура", value: "до −17 °C от окружающей" },
      { label: "Дисплей", value: "Сенсорный, 6 языков" },
      { label: "Память", value: "5 программ по 5 этапов" },
      { label: "Интерфейс", value: "USB" },
    ],
  },
  {
    listing: ["equipment", "incubating-incubating-cooling-shakers"],
    model: "incubating-cooling-orbital",
    name: "Орбитальные шейкеры-инкубаторы с охлаждением",
    series: "incubating",
    seriesLabel: "Шейкеры-инкубаторы",
    image: `${CDN}/86f69146-1820-4b64-9b17-11fcdd6823f0/Incubating_Cooling_Orbital_AMain_600x600`,
    summary:
      "Орбитальные шейкеры-инкубаторы с охлаждением и прямым контактным управлением температурой на элементах Пельтье. Совместимость с микропланшетами без аксессуаров, функция калибровки температуры.",
    specs: [
      { label: "Температура", value: "Элементы Пельтье, прямой контакт" },
      { label: "Совместимость", value: "Микропланшеты без аксессуаров" },
      { label: "Калибровка", value: "Температуры" },
    ],
  },
  {
    listing: ["equipment", "incubating-incubating-cooling-shakers"],
    model: "incubating-light-duty-orbital",
    name: "Орбитальные шейкеры-инкубаторы легкого типа",
    series: "incubating",
    seriesLabel: "Шейкеры-инкубаторы",
    image: `${CDN}/d7708c3a-c6be-4bec-84d1-d71574683375/Incubating_Light_Duty_Orbital_AMain_600x600`,
    summary:
      "Орбитальные шейкеры-инкубаторы легкого типа с максимальной нагрузкой 4 кг. Вмещают 4 микропланшета или глубоколуночных планшета, два варианта крышки, калибровка температуры пользователем.",
    specs: [
      { label: "Макс. нагрузка", value: "4 кг" },
      { label: "Вместимость", value: "4 микропланшета" },
      { label: "Крышка", value: "Непрозрачная / прозрачная" },
    ],
  },
  {
    listing: ["equipment", "incubating-incubating-cooling-shakers"],
    model: "incubating-heavy-duty-orbital",
    name: "Орбитальные шейкеры-инкубаторы тяжелого типа",
    series: "incubating",
    seriesLabel: "Шейкеры-инкубаторы",
    image: `${CDN}/188547c0-b787-402c-972f-115d877f5797/Incubating_HD_Orbital_Shaker_16HDG_Right`,
    summary:
      "Орбитальные шейкеры-инкубаторы тяжелого типа с системой принудительной вентиляции Opti-Flow и точной регулировкой скорости Accu-Drive. Трёхэксцентриковый привод, равномерное распределение тепла.",
    specs: [
      { label: "Вентиляция", value: "Opti-Flow (два двигателя)" },
      { label: "Управление", value: "Accu-Drive" },
      { label: "Вместимость", value: "2 × 6 л колбы Эрленмейера" },
    ],
  },
  {
    listing: ["equipment", "incubating-incubating-cooling-shakers"],
    model: "incubating-rocking-waving",
    name: "Инкубаторы-качалки и волновые шейкеры-инкубаторы",
    series: "incubating",
    seriesLabel: "Шейкеры-инкубаторы",
    image: `${CDN}/a17c7422-ee37-4389-abbe-0321c8b2398d/Incubating_Rocking_Waving_AMain_600x600`,
    summary:
      "Инкубаторы-качалки и волновые шейкеры-инкубаторы с электронной регулировкой угла (шаг 1°), скорости (1 об/мин) и температуры (1 °C). Плавный разгон против расплёскивания, режимы 3D и волны.",
    specs: [
      { label: "Угол", value: "Электронный, шаг 1°" },
      { label: "Скорость", value: "Шаг 1 об/мин" },
      { label: "Температура", value: "Шаг 1 °C" },
      { label: "Режимы", value: "3D-качание, волна" },
    ],
  },

  // --- Вихревые смесители ---
  {
    listing: ["equipment", "laboratory-vortex-mixers"],
    model: "heavy-duty-vortex",
    name: "Вихревые смесители тяжелого типа",
    series: "vortex",
    seriesLabel: "Вортексы",
    image: `${CDN}/1237d44f-dd8a-4c42-b82b-08f4b6ff1ce8/Heavy_Duty_Vortex_AMain_600x600`,
    summary:
      "Вихревые смесители (вортексы) тяжелого типа с максимальной нагрузкой 1,1 кг и немецким двигателем для непрерывной работы. Регулировка скорости в цифровых и аналоговых моделях.",
    specs: [
      { label: "Макс. нагрузка", value: "1,1 кг" },
      { label: "Двигатель", value: "Немецкий, для непрерывной работы" },
      { label: "Управление", value: "Цифровое / аналоговое" },
    ],
  },
  {
    listing: ["equipment", "laboratory-vortex-mixers"],
    model: "multi-tube-vortex",
    name: "Многоместные вихревые смесители для пробирок",
    series: "vortex",
    seriesLabel: "Вортексы",
    image: `${CDN}/071728e9-5443-494c-b18f-1e4bb345cd4f/Multi-Tube_Vortex_AMain_600x600`,
    summary:
      "Многоместные вортексы для одновременного перемешивания до 50 проб. Корпус из нержавеющей стали, шесть конфигураций штативов, программируемый импульсный режим в цифровых моделях.",
    specs: [
      { label: "Вместимость", value: "до 50 проб" },
      { label: "Корпус", value: "Нержавеющая сталь" },
      { label: "Штативы", value: "6 конфигураций" },
      { label: "Режим", value: "Программируемый импульсный" },
    ],
  },
  {
    listing: ["equipment", "laboratory-vortex-mixers"],
    model: "microplate-vortex",
    name: "Вихревые смесители для микропланшетов",
    series: "vortex",
    seriesLabel: "Вортексы",
    image: `${CDN}/ff9633e3-20d5-4d09-8d8f-442da57289eb/Microplate_Vortex_AMain_600x600`,
    summary:
      "Вортексы для микропланшетов со специальной фиксацией планшета и немецким двигателем. Полный диапазон скоростей, цифровое и аналоговое управление, безопасное высокоскоростное перемешивание.",
    specs: [
      { label: "Назначение", value: "Микропланшеты" },
      { label: "Двигатель", value: "Немецкий" },
      { label: "Управление", value: "Цифровое / аналоговое" },
    ],
  },
  {
    listing: ["equipment", "laboratory-vortex-mixers"],
    model: "mini-vortex",
    name: "Вихревые смесители Mini",
    series: "vortex",
    seriesLabel: "Вортексы",
    image: `${CDN}/931d0e57-1af2-4036-80b6-84cc7294ef83/Mini_Vortex_Main_600x600`,
    summary:
      "Компактные вортексы Mini с сенсорным запуском и непрерывным режимом. Регулируемая скорость в цифровых и аналоговых моделях, экономичная версия с фиксированной скоростью, нескользящее основание.",
    specs: [
      { label: "Режимы", value: "Сенсорный запуск / непрерывный" },
      { label: "Скорость", value: "Регулируемая или фиксированная" },
      { label: "Основание", value: "Нескользящее" },
    ],
  },

  // --- Твердотельные термостаты ---
  {
    listing: ["equipment", "dry-block-heaters"],
    model: "single-block",
    name: "Твердотельные термостаты на 1 блок",
    series: "dry-block",
    seriesLabel: "Твердотельные термостаты",
    image: `${CDN}/ff60d70f-cf50-4b20-ae42-25836d90bafa/1_Block_Dry_Block_AMain_600x600`,
    summary:
      "Твердотельные термостаты на один нагревательный блок с цифровым или аналоговым управлением. Сенсорная панель в цифровых моделях, раздельная индикация температуры и времени, высокая стабильность.",
    specs: [
      { label: "Блоки", value: "1" },
      { label: "Управление", value: "Цифровое / аналоговое" },
      { label: "Индикация", value: "Раздельная: температура и время" },
    ],
  },
  {
    listing: ["equipment", "dry-block-heaters"],
    model: "two-block",
    name: "Твердотельные термостаты на 2 блока",
    series: "dry-block",
    seriesLabel: "Твердотельные термостаты",
    image: `${CDN}/815ef1a5-9b71-492c-8498-f7da19a97c08/2_Block_Dry_Block_AMain_600x600`,
    summary:
      "Твердотельные термостаты на два нагревательных блока с опциональной подогреваемой крышкой для снижения конденсата. Одноточечная калибровка, цифровые и аналоговые модели.",
    specs: [
      { label: "Блоки", value: "2" },
      { label: "Крышка", value: "Подогреваемая (опция)" },
      { label: "Калибровка", value: "Одноточечная" },
    ],
  },
  {
    listing: ["equipment", "dry-block-heaters"],
    model: "four-block",
    name: "Твердотельные термостаты на 4 блока",
    series: "dry-block",
    seriesLabel: "Твердотельные термостаты",
    image: `${CDN}/6d4936b6-c30c-4ff4-a218-b1633d87e4d9/4_Block_Dry_Block_AMain_600x600`,
    summary:
      "Твердотельные термостаты на четыре нагревательных блока для одновременной обработки нескольких проб. Одноточечная калибровка, сенсорная панель в цифровых моделях.",
    specs: [
      { label: "Блоки", value: "4" },
      { label: "Калибровка", value: "Одноточечная" },
      { label: "Управление", value: "Цифровое / аналоговое" },
    ],
  },
  {
    listing: ["equipment", "dry-block-heaters"],
    model: "six-block",
    name: "Твердотельные термостаты на 6 блоков",
    series: "dry-block",
    seriesLabel: "Твердотельные термостаты",
    image: `${CDN}/cbd4ab42-93bf-40d8-9fcb-c5b70132b355/6_Block_Dry_Block_AMain_600x600`,
    summary:
      "Твердотельные термостаты на шесть нагревательных блоков — максимальная производительность для высокопоточных лабораторий. Одноточечная калибровка, цифровые и аналоговые модели.",
    specs: [
      { label: "Блоки", value: "6" },
      { label: "Применение", value: "Высокопоточные лаборатории" },
      { label: "Калибровка", value: "Одноточечная" },
    ],
  },

  // --- Верхнеприводные мешалки ---
  {
    listing: ["equipment", "overhead-stirrers"],
    model: "achiever-5000",
    name: "Верхнеприводная мешалка Achiever™ 5000",
    series: "achiever-5000",
    seriesLabel: "Achiever™ 5000",
    image: `${CDN}/fd02aeee-2e53-4078-9c56-48ed3023be80/Achiever_Family`,
    summary:
      "Верхнеприводная мешалка Achiever™ 5000 с бесщёточным двигателем и компенсацией крутящего момента. Мощное перемешивание вязких жидкостей, защита от перегрузки и быстрозажимной патрон для замены вала одной рукой.",
    specs: [
      { label: "Двигатель", value: "Бесщёточный, с компенсацией момента" },
      { label: "Патрон", value: "Быстрозажимной, без инструмента" },
      { label: "Защита", value: "Определение перегрузки, автоотключение" },
      { label: "Применение", value: "Вязкие жидкости" },
    ],
  },

  // --- Нагревательные плиты и мешалки ---
  {
    listing: ["equipment", "hotplates-stirrers"],
    model: "guardian-7000",
    name: "Магнитные мешалки с подогревом Guardian™ 7000",
    series: "guardian-7000",
    seriesLabel: "Guardian™ 7000",
    image: `${CDN}/84ea0888-398c-41c0-8e4b-836ad70597c0/Guardian_7000_Left_Beaker_1_600x600`,
    summary:
      "Магнитные мешалки с подогревом Guardian™ 7000 со скоростью перемешивания 60–1600 об/мин. Технологии безопасности SmartPresence™ и SmartLink™, двойной независимый контроль перегрева, мощный двигатель.",
    specs: [
      { label: "Скорость перемешивания", value: "60–1600 об/мин" },
      { label: "Безопасность", value: "SmartPresence™, SmartLink™" },
      { label: "Контроль перегрева", value: "Двойной независимый" },
    ],
  },
  {
    listing: ["equipment", "hotplates-stirrers"],
    model: "guardian-5000-g51",
    name: "Магнитные мешалки с подогревом Guardian™ 5000 (G51)",
    series: "guardian-5000",
    seriesLabel: "Guardian™ 5000",
    image: `${CDN}/e2c1be7d-b6c3-43a6-994d-c68edbea5279/Guardian_5000_Right_Beaker_1_600x600`,
    summary:
      "Магнитные мешалки с подогревом Guardian™ 5000 (G51), скорость 60–1600 об/мин. Ненагревающийся корпус SmartHousing™, индикатор горячей поверхности (выше 40 °C), химически стойкая панель управления.",
    specs: [
      { label: "Скорость перемешивания", value: "60–1600 об/мин" },
      { label: "Корпус", value: "SmartHousing™ (не нагревается)" },
      { label: "Индикатор", value: "Горячая поверхность > 40 °C" },
    ],
  },
  {
    listing: ["equipment", "hotplates-stirrers"],
    model: "guardian-5000-g52",
    name: "Магнитные мешалки с подогревом Guardian™ 5000 (G52 UniBlock)",
    series: "guardian-5000",
    seriesLabel: "Guardian™ 5000",
    image: `${CDN}/9ca8df98-eac7-43e0-9002-3e61f1841015/Guardian-5000_G52_RD_UniBlock_600X600`,
    summary:
      "Магнитные мешалки с подогревом Guardian™ 5000 (G52 UniBlock), скорость 60–1600 об/мин. Ненагревающийся корпус SmartHousing™, индикатор горячей поверхности и надёжная магнитная связь.",
    specs: [
      { label: "Скорость перемешивания", value: "60–1600 об/мин" },
      { label: "Корпус", value: "SmartHousing™ (не нагревается)" },
      { label: "Индикатор", value: "Горячая поверхность > 40 °C" },
    ],
  },
  {
    listing: ["equipment", "hotplates-stirrers"],
    model: "mini-hotplates",
    name: "Мини нагревательные плиты и мешалки",
    series: "mini-hotplates",
    seriesLabel: "Mini Hotplates",
    image: `${CDN}/426fa16d-7484-49e2-8ef0-790bc95c2f88/Mini-Hotplates-and-Stirrers-Main`,
    summary:
      "Компактные нагревательные плиты и мешалки с химически стойкой керамической поверхностью и термостойким полимерным корпусом (cool-touch). Держатель с фиксацией для крепления штатива, лёгкая очистка.",
    specs: [
      { label: "Поверхность", value: "Химически стойкая керамика" },
      { label: "Корпус", value: "Термостойкий полимер (cool-touch)" },
      { label: "Применение", value: "Учебные лаборатории" },
    ],
  },

  // ============== Контрольно-измерительные приборы ==============
  {
    listing: ["instruments-equipment", "water-analysis"],
    model: "starter-5000-ph",
    name: "Стационарный pH-метр Starter 5000",
    series: "starter",
    seriesLabel: "Starter",
    image: `${CDN}/08bfcd03-6244-4d4c-8b28-cd83fc44520e/Starter_5000_PH_Bench_600x600`,
    summary:
      "Стационарный лабораторный pH-метр Starter 5000 с цветным сенсорным дисплеем и классом защиты IP54. Память на 1000 записей и хранение данных калибровки до 10 датчиков.",
    specs: [
      { label: "Параметр", value: "pH" },
      { label: "Дисплей", value: "Цветной сенсорный" },
      { label: "Память", value: "1000 записей" },
      { label: "Защита", value: "IP54" },
    ],
  },
  {
    listing: ["instruments-equipment", "water-analysis"],
    model: "ab41ph",
    name: "Стационарный pH-метр AQUASEARCHER™ AB41PH",
    series: "aquasearcher",
    seriesLabel: "AQUASEARCHER™",
    image: `${CDN}/1efaab38-7ca2-4087-a7be-446b1c403dba/AB41PH_Front_4`,
    summary:
      "Стационарный pH-метр AQUASEARCHER™ AB41PH с дискретностью pH от 0,1 до 0,001 и ЖК-дисплеем 6,5″. Память на 1000 ячеек, интерфейсы RS-232 и USB, функции GLP с управлением паролями.",
    specs: [
      { label: "Параметр", value: "pH (0,1–0,001)" },
      { label: "Дисплей", value: 'ЖК 6,5"' },
      { label: "Память", value: "1000 ячеек" },
      { label: "Интерфейсы", value: "RS-232, USB" },
    ],
  },
  {
    listing: ["instruments-equipment", "water-analysis"],
    model: "ab33m1",
    name: "Многопараметрический прибор AQUASEARCHER™ AB33M1",
    series: "aquasearcher",
    seriesLabel: "AQUASEARCHER™",
    image: `${CDN}/909262e4-a4d2-4a28-b03c-355bab31fb92/AB33M1_Holder_Electrode_Beaker_1`,
    summary:
      "Настольный многопараметрический прибор AQUASEARCHER™ AB33M1: измерение 7 параметров (pH, ОВП, УЭП, TDS, солёность, удельное сопротивление, температура) по двум независимым каналам.",
    specs: [
      { label: "Параметры", value: "7 (pH, ОВП, УЭП, TDS и др.)" },
      { label: "Каналы", value: "2 независимых" },
      { label: "Память", value: "1000 результатов" },
      { label: "Интерфейсы", value: "RS-232, USB" },
    ],
  },
  {
    listing: ["instruments-equipment", "water-analysis"],
    model: "ab33ph",
    name: "Стационарный pH-метр AQUASEARCHER™ AB33PH",
    series: "aquasearcher",
    seriesLabel: "AQUASEARCHER™",
    image: `${CDN}/ec95a1c0-8ce1-4c3b-ac01-0063b4b95cd5/AB33PH_Holder_Electrode_Beaker_1`,
    summary:
      "Стационарный pH-метр AQUASEARCHER™ AB33PH с ЖК-дисплеем 6,5″ и автоматическим определением конечной точки. Память на 1000 результатов, интерфейсы RS-232 и USB.",
    specs: [
      { label: "Параметр", value: "pH" },
      { label: "Дисплей", value: 'ЖК 6,5"' },
      { label: "Память", value: "1000 результатов" },
      { label: "Интерфейсы", value: "RS-232, USB" },
    ],
  },
  {
    listing: ["instruments-equipment", "water-analysis"],
    model: "ab33ec",
    name: "Стационарный кондуктометр AQUASEARCHER™ AB33EC",
    series: "aquasearcher",
    seriesLabel: "AQUASEARCHER™",
    image: `${CDN}/d3251d86-aa5a-484b-ae7b-db455c388a7e/AB33EC_Holder_Electrode_Beaker_1`,
    summary:
      "Стационарный кондуктометр AQUASEARCHER™ AB33EC: УЭП, TDS, солёность и удельное сопротивление. Опорная температура 20 или 25 °C, автоматическая температурная компенсация, поддержка 2- и 4-электродных датчиков.",
    specs: [
      { label: "Параметры", value: "УЭП, TDS, солёность" },
      { label: "Опорная t°", value: "20 / 25 °C" },
      { label: "Компенсация", value: "Автоматическая" },
      { label: "Интерфейсы", value: "RS-232, USB" },
    ],
  },
  {
    listing: ["instruments-equipment", "water-analysis"],
    model: "ab23ph",
    name: "Стационарный pH-метр AQUASEARCHER™ AB23PH",
    series: "aquasearcher",
    seriesLabel: "AQUASEARCHER™",
    image: `${CDN}/e113834a-e3f0-4656-8fbc-7989c4910806/AB23PH_Holder_Electrode_Beaker_1`,
    summary:
      "Стационарный pH-метр AQUASEARCHER™ AB23PH с автоматическим распознаванием буферных растворов и ярким подсвеченным ЖК-дисплеем. Компактный держатель электрода, интуитивный интерфейс.",
    specs: [
      { label: "Параметры", value: "pH, ОВП" },
      { label: "Буферы", value: "Автораспознавание" },
      { label: "Дисплей", value: "ЖК с подсветкой" },
    ],
  },
  {
    listing: ["instruments-equipment", "water-analysis"],
    model: "ab23ec",
    name: "Стационарный кондуктометр AQUASEARCHER™ AB23EC",
    series: "aquasearcher",
    seriesLabel: "AQUASEARCHER™",
    image: `${CDN}/0b0ebdb6-2703-4ba4-82f1-2b4547490100/AB23EC_Holder_Electrode_Beaker_Insert_1`,
    summary:
      "Стационарный кондуктометр AQUASEARCHER™ AB23EC с ЖК-дисплеем 5″ и пошаговыми инструкциями. Измерение УЭП, TDS и солёности, автоматическая температурная компенсация.",
    specs: [
      { label: "Параметры", value: "УЭП, TDS, солёность" },
      { label: "Дисплей", value: 'ЖК 5"' },
      { label: "Компенсация", value: "Автоматическая" },
    ],
  },
  {
    listing: ["instruments-equipment", "water-analysis"],
    model: "starter-400m",
    name: "Портативный многопараметрический прибор Starter 400M",
    series: "starter",
    seriesLabel: "Starter",
    image: `${CDN}/5ca5e38d-cd5a-4dce-bb16-b40044690fdb/water-analysis-Starter-400M`,
    summary:
      "Портативный многопараметрический прибор Starter 400M с классом защиты IP67 и литиевым аккумулятором на 40 часов работы. Защитный резиновый чехол, ЖК-дисплей.",
    specs: [
      { label: "Тип", value: "Многопараметрический, портативный" },
      { label: "Защита", value: "IP67" },
      { label: "Питание", value: "Li-аккумулятор, до 40 ч" },
    ],
  },
  {
    listing: ["instruments-equipment", "water-analysis"],
    model: "starter-400",
    name: "Портативный pH-метр Starter 400",
    series: "starter",
    seriesLabel: "Starter",
    image: `${CDN}/ae81c380-dba9-4d10-9691-cfcc0052f213/water-analysis-Starter-400`,
    summary:
      "Портативный pH-метр Starter 400 с классом защиты IP67 и аккумулятором на 40 часов. Защитный резиновый чехол и яркий подсвеченный ЖК-дисплей.",
    specs: [
      { label: "Параметр", value: "pH" },
      { label: "Защита", value: "IP67" },
      { label: "Питание", value: "до 40 ч" },
    ],
  },
  {
    listing: ["instruments-equipment", "water-analysis"],
    model: "starter-400d",
    name: "Портативный кислородомер Starter 400D",
    series: "starter",
    seriesLabel: "Starter",
    image: `${CDN}/29c7c916-3fa8-4042-97e7-44e5421b7d28/ST400D_1_600x600`,
    summary:
      "Портативный кислородомер Starter 400D с оптическим датчиком растворённого кислорода и классом защиты IP54. Минимальное обслуживание, подсвеченный ЖК-дисплей, подставка и наручный ремень.",
    specs: [
      { label: "Параметр", value: "Растворённый кислород" },
      { label: "Датчик", value: "Оптический" },
      { label: "Защита", value: "IP54" },
    ],
  },
  {
    listing: ["instruments-equipment", "water-analysis"],
    model: "starter-300",
    name: "Портативный pH-метр Starter 300",
    series: "starter",
    seriesLabel: "Starter",
    image: `${CDN}/575b288a-8bdb-41cc-8598-597589270429/ST300ph_1_600x600`,
    summary:
      "Портативный pH-метр Starter 300 с автоматическим распознаванием буферных растворов и классом защиты IP54. Журнал на 30 записей, автоматическая температурная компенсация.",
    specs: [
      { label: "Параметр", value: "pH" },
      { label: "Защита", value: "IP54" },
      { label: "Журнал", value: "30 записей" },
    ],
  },
  {
    listing: ["instruments-equipment", "water-analysis"],
    model: "starter-300c",
    name: "Портативный кондуктометр Starter 300C",
    series: "starter",
    seriesLabel: "Starter",
    image: `${CDN}/dc887aba-5d37-46b1-a515-f452dd628a23/ST300C_600x600`,
    summary:
      "Портативный кондуктометр Starter 300C с четырёхполюсным электродом и встроенным датчиком температуры. Журнал на 30 записей, автоматическая температурная компенсация.",
    specs: [
      { label: "Параметр", value: "УЭП" },
      { label: "Электрод", value: "Четырёхполюсный" },
      { label: "Журнал", value: "30 записей" },
    ],
  },
  {
    listing: ["instruments-equipment", "water-analysis"],
    model: "starter-pen",
    name: "Карманные приборы Starter Pen",
    series: "starter",
    seriesLabel: "Starter",
    image: `${CDN}/df7cfe72-d195-4db3-b28f-8e07aa5b6597/Starter_Pen_AMain_600x600`,
    summary:
      "Карманные приборы Starter Pen в компактном корпусе с классом защиты IP67. Защитный колпачок датчика, автоотключение и наручный ремешок.",
    specs: [
      { label: "Тип", value: "Карманный" },
      { label: "Защита", value: "IP67" },
      { label: "Функции", value: "Автоотключение" },
    ],
  },
  {
    listing: ["instruments-equipment", "water-analysis"],
    model: "starter-electrodes",
    name: "Электроды Starter",
    series: "starter",
    seriesLabel: "Starter",
    image: `${CDN}/8ba8fc21-01dd-45a5-ad00-0d695640da62/Starter_Electrodes_600x600`,
    summary:
      "Электроды Starter в пластмассовом или стеклянном корпусе со встроенным датчиком температуры и автоматической температурной компенсацией. Совместимы со всеми приборами OHAUS.",
    specs: [
      { label: "Корпус", value: "Пластик / стекло" },
      { label: "Датчик t°", value: "Встроенный" },
      { label: "Совместимость", value: "Все приборы OHAUS" },
    ],
  },

  // ================ Анализаторы влагосодержания ================
  {
    listing: ["balances-scales", "moisture-analyzers"],
    model: "mb120",
    name: "Анализатор влагосодержания MB120",
    series: "mb",
    seriesLabel: "MB120",
    image: `${CDN}/67f42646-e22e-4ed2-834c-72d90669410a/MB120_Smartguide_Right_1_600x600`,
    summary:
      "Анализатор влагосодержания MB120 с галогенным нагревом и функцией SmartGuide™ для автоматизированного анализа. Память на 100 методов и 1000 результатов, экспорт данных и перенос методов.",
    specs: [
      { label: "Нагрев", value: "Галогенный" },
      { label: "Память", value: "100 методов, 1000 результатов" },
      { label: "Программы сушки", value: "4 предустановленных" },
    ],
  },
  {
    listing: ["balances-scales", "moisture-analyzers"],
    model: "mb90",
    name: "Анализатор влагосодержания MB90",
    series: "mb",
    seriesLabel: "MB90",
    image: `${CDN}/48d13ed9-1618-414f-8f45-c2e095095d96/MB90_Closed_600x600`,
    summary:
      "Анализатор влагосодержания MB90 с галогенным нагревательным элементом для ускоренного получения результатов. Сенсорное меню с пошаговыми подсказками и обслуживание без инструментов.",
    specs: [
      { label: "Нагрев", value: "Галогенный" },
      { label: "Меню", value: "Сенсорное, с подсказками" },
      { label: "Обслуживание", value: "Без инструментов" },
    ],
  },
  {
    listing: ["balances-scales", "moisture-analyzers"],
    model: "mb27",
    name: "Анализатор влагосодержания MB27",
    series: "mb",
    seriesLabel: "MB27",
    image: `${CDN}/9f4635ba-ca2e-45be-9d37-d8acfc04dd75/MB27_Closed_600x600`,
    summary:
      "Анализатор влагосодержания MB27 с галогенным нагревом и точностью ±0,01% при дискретности 0,001 г. Двойная калибровка (по массе и температуре), сенсорное управление.",
    specs: [
      { label: "Точность", value: "±0,01% при 0,001 г" },
      { label: "Нагрев", value: "Галогенный" },
      { label: "Калибровка", value: "По массе и температуре" },
    ],
  },
  {
    listing: ["balances-scales", "moisture-analyzers"],
    model: "mb25",
    name: "Анализатор влагосодержания MB25",
    series: "mb",
    seriesLabel: "MB25",
    image: `${CDN}/6a228ad5-af6d-4dac-935f-3bdf1362c4e1/MB25_ARight-600x600`,
    summary:
      "Анализатор влагосодержания MB25 с галогенным нагревом и ЖК-дисплеем с подсветкой. Управление одной кнопкой и компактная конструкция для экономии места.",
    specs: [
      { label: "Нагрев", value: "Галогенный" },
      { label: "Дисплей", value: "ЖК с подсветкой" },
      { label: "Управление", value: "Одна кнопка" },
    ],
  },
  {
    listing: ["balances-scales", "moisture-analyzers"],
    model: "mb23",
    name: "Анализатор влагосодержания MB23",
    series: "mb",
    seriesLabel: "MB23",
    image: `${CDN}/764a599d-6b11-448b-8383-8aba1f7526c6/MB23_Closed_600x600`,
    summary:
      "Анализатор влагосодержания MB23 с инфракрасным нагревательным элементом в металлическом исполнении (без стекла) и ЖК-дисплеем с подсветкой. Настройка одной кнопкой, компактный корпус.",
    specs: [
      { label: "Нагрев", value: "Инфракрасный (металл)" },
      { label: "Дисплей", value: "ЖК с подсветкой" },
      { label: "Управление", value: "Одна кнопка" },
    ],
  },

  // ========================== Гири ==========================
  {
    listing: ["weights", "calibration-weights"],
    model: "oiml-individual",
    name: "Калибровочные гири OIML (поштучно)",
    series: "oiml",
    seriesLabel: "OIML",
    image: `${CDN}/e0d5bd37-d304-4a97-b69a-4afbad1e9a64/OIML-Individual-Weight-500mg_1`,
    summary:
      "Отдельные калибровочные гири OIML классов E1, E2, F1, F2 из высококачественной нержавеющей стали (включая Troemner Alloy 8). Полированная поверхность по OIML R 111, сертификат ISO/IEC 17025 с прослеживаемостью к NIST.",
    specs: [
      { label: "Класс", value: "OIML E1, E2, F1, F2" },
      { label: "Материал", value: "Нержавеющая сталь (Alloy 8)" },
      { label: "Стандарт", value: "OIML R 111" },
      { label: "Сертификат", value: "ISO/IEC 17025, NIST" },
    ],
  },
  {
    listing: ["weights", "calibration-weights"],
    model: "oiml-sets",
    name: "Наборы калибровочных гирь OIML",
    series: "oiml",
    seriesLabel: "OIML",
    image: `${CDN}/c60f4851-8dc2-47f1-9963-fa7c348a2362/OIML-Weight-Set-500mg-1mg_1`,
    summary:
      "Наборы калибровочных гирь OIML классов E1, E2, F1, F2 из нержавеющей стали с крайне низкой магнитной восприимчивостью. Сертификат ISO/IEC 17025 с прослеживаемостью к NIST.",
    specs: [
      { label: "Класс", value: "OIML E1, E2, F1, F2" },
      { label: "Материал", value: "Нержавеющая сталь" },
      { label: "Магнитная восприимчивость", value: "Крайне низкая" },
      { label: "Сертификат", value: "ISO/IEC 17025, NIST" },
    ],
  },
];
