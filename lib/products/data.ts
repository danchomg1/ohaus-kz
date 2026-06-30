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
];
