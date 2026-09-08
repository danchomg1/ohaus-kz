# Изображения товаров и логотип

Сайт берёт картинки товаров из папки `public/`. Пока файла нет — показывается
нейтральный плейсхолдер (не «битая» картинка).

## Правила именования

- Формат: **JPG**, квадрат (рекомендуется 600×600 или 800×800), товар на белом фоне.
- Путь: `public/products/<папка>/<имя>.jpg` — папка и имя **точно как в списке ниже**
  (строчные буквы, дефисы, без пробелов).

### Несколько фото на один товар (1–6)

Можно добавить до 6 изображений на товар. Главное — базовое имя, дополнительные —
то же имя с цифрой `1`…`5` в конце:

```
frontier-5000-multi-pro.jpg    ← главное (обязательное)
frontier-5000-multi-pro1.jpg   ← доп. фото
frontier-5000-multi-pro2.jpg
frontier-5000-multi-pro3.jpg
frontier-5000-multi-pro4.jpg
frontier-5000-multi-pro5.jpg
```

На странице товара появятся миниатюры для переключения. Пропуски в нумерации
допустимы (например, только `...1.jpg` и `...3.jpg`) — сайт покажет те файлы,
которые реально существуют. В списке ниже указано только базовое имя каждого товара.

## Картинки главной страницы

Лежат в `public/home/` и подставляются, **пока в Studio не задана своя картинка**
(«Главная» → слайды Hero, ссылки быстрого доступа, промо). Как только картинку
загрузят в Sanity, показывается она.

| Файл                        | Где                                     |
| --------------------------- | --------------------------------------- |
| `hero-bg-explorer.jpg`      | Баннер, слайд Explorer™ EX              |
| `hero-bg-adventurer.jpg`    | Баннер, слайд Adventurer™ AX            |
| `hero-bg-pioneer.jpg`       | Баннер, слайд Pioneer™ PX               |
| `quick-centrifuges.jpg`     | Быстрая ссылка «Центрифуги Frontier™ 5000» |
| `quick-floor-scales.jpg`    | Быстрая ссылка «Напольные весы»         |
| `quick-moisture.jpg`        | Быстрая ссылка «Анализаторы влагосодержания» |
| `quick-weights.jpg`         | Быстрая ссылка «Калибровочные гири»      |
| `promo.jpg`                 | Баннер «Рекламные акции»                 |

### Фоны главного баннера

Формат — **1920×560** (пропорция 24:7). Именно при ней кадр виден целиком во всю
ширину экрана: высота баннера считается от ширины окна. На узких экранах
включается минимальная высота, и кадр подрезается по бокам.

Готовя новый фон, держите этот размер и оставляйте левую треть спокойной —
поверх неё лежит стеклянная подложка с заголовком и кнопкой. Сильно
контрастные детали слева читаемости не помешают (подложка размывает фон),
но композиция будет спорить с текстом.

Картинки для быстрых ссылок и промо — фирменные снимки OHAUS с ru.ohaus.com.

## Логотип

Сейчас в шапке стоит **`public/logo.png`** — фирменный знак OHAUS, 142×39,
прозрачный фон. Он заменил текстовую надпись «OHAUS», которая была раньше.

- Чтобы поменять логотип, замените этот файл (пропорции ≈ 3,6 : 1,
  прозрачный фон, горизонтальная компоновка).
- Высота отрисовки в шапке — 36px, поэтому для экранов Retina исходник должен
  быть не ниже **72px**; текущий файл ровно на границе и на таких экранах будет
  чуть мягче. Лучше всего SVG — тогда чёткость не зависит от экрана.
- Логотип можно задать и в Studio («Настройки сайта» → Логотип) — тогда
  показывается он, а файл из `public/` остаётся запасным.

## Полный список файлов товаров

### public/products/analytical-balances/
- `explorer-semi-micro.jpg` — Полумикровесы Explorer™
- `explorer-analytical.jpg` — Аналитические весы Explorer™
- `adventurer-analytical.jpg` — Аналитические весы Adventurer™
- `pioneer-semi-micro.jpg` — Полумикровесы Pioneer™
- `pioneer-analytical.jpg` — Аналитические весы Pioneer™
- `pr-analytical.jpg` — Аналитические весы серии PR

### public/products/precision-balances/
- `explorer-precision.jpg` — Прецизионные весы Explorer™
- `explorer-high-capacity.jpg` — Большегрузные прецизионные весы Explorer™
- `adventurer-precision.jpg` — Прецизионные весы Adventurer™
- `pioneer-precision.jpg` — Прецизионные весы Pioneer™
- `pr-precision.jpg` — Прецизионные весы серии PR

### public/products/portable-scales-2/
- `scout-stx.jpg` — Scout™ STX
- `scout-spx.jpg` — Scout™ SPX
- `navigator.jpg` — Navigator™
- `compass-cx.jpg` — Compass™ CX
- `compass-cr.jpg` — Compass™ CR

### public/products/centrifuges/
- `frontier-5000-multi-pro.jpg` — Центрифуга Frontier™ 5000 Multi Pro
- `frontier-5000-multi.jpg` — Центрифуга Frontier™ 5000 Multi
- `frontier-5000-micro.jpg` — Микроцентрифуга Frontier™ 5000 Micro
- `frontier-5000-mini.jpg` — Мини-центрифуга Frontier™ 5000 Mini
- `frontier-rotors-5000.jpg` — Роторы Frontier™ 5000

### public/products/open-air-shakers/
- `heavy-duty-orbital.jpg` — Орбитальные шейкеры тяжелого типа
- `extreme-environment.jpg` — Шейкеры для экстремальных условий
- `light-duty-orbital.jpg` — Орбитальные шейкеры легкого типа
- `rocking-waving.jpg` — Шейкеры-качалки и волновые шейкеры
- `reciprocating.jpg` — Возвратно-поступательные шейкеры
- `high-speed-microplate.jpg` — Высокоскоростные шейкеры для микропланшетов

### public/products/incubating-incubating-cooling-shakers/
- `incubating-cooling-thermal.jpg` — Шейкеры-инкубаторы с охлаждением и термошейкеры
- `incubating-cooling-orbital.jpg` — Орбитальные шейкеры-инкубаторы с охлаждением
- `incubating-light-duty-orbital.jpg` — Орбитальные шейкеры-инкубаторы легкого типа
- `incubating-heavy-duty-orbital.jpg` — Орбитальные шейкеры-инкубаторы тяжелого типа
- `incubating-rocking-waving.jpg` — Инкубаторы-качалки и волновые шейкеры-инкубаторы

### public/products/laboratory-vortex-mixers/
- `heavy-duty-vortex.jpg` — Вихревые смесители тяжелого типа
- `multi-tube-vortex.jpg` — Многоместные вихревые смесители для пробирок
- `microplate-vortex.jpg` — Вихревые смесители для микропланшетов
- `mini-vortex.jpg` — Вихревые смесители Mini

### public/products/dry-block-heaters/
- `single-block.jpg` — Твердотельные термостаты на 1 блок
- `two-block.jpg` — Твердотельные термостаты на 2 блока
- `four-block.jpg` — Твердотельные термостаты на 4 блока
- `six-block.jpg` — Твердотельные термостаты на 6 блоков

### public/products/overhead-stirrers/
- `achiever-5000.jpg` — Верхнеприводная мешалка Achiever™ 5000

### public/products/hotplates-stirrers/
- `guardian-7000.jpg` — Магнитные мешалки с подогревом Guardian™ 7000
- `guardian-5000-g51.jpg` — Магнитные мешалки с подогревом Guardian™ 5000 (G51)
- `guardian-5000-g52.jpg` — Магнитные мешалки с подогревом Guardian™ 5000 (G52 UniBlock)
- `mini-hotplates.jpg` — Мини нагревательные плиты и мешалки

### public/products/water-analysis/
- `starter-5000-ph.jpg` — Стационарный pH-метр Starter 5000
- `ab41ph.jpg` — Стационарный pH-метр AQUASEARCHER™ AB41PH
- `ab33m1.jpg` — Многопараметрический прибор AQUASEARCHER™ AB33M1
- `ab33ph.jpg` — Стационарный pH-метр AQUASEARCHER™ AB33PH
- `ab33ec.jpg` — Стационарный кондуктометр AQUASEARCHER™ AB33EC
- `ab23ph.jpg` — Стационарный pH-метр AQUASEARCHER™ AB23PH
- `ab23ec.jpg` — Стационарный кондуктометр AQUASEARCHER™ AB23EC
- `starter-400m.jpg` — Портативный многопараметрический прибор Starter 400M
- `starter-400.jpg` — Портативный pH-метр Starter 400
- `starter-400d.jpg` — Портативный кислородомер Starter 400D
- `starter-300.jpg` — Портативный pH-метр Starter 300
- `starter-300c.jpg` — Портативный кондуктометр Starter 300C
- `starter-pen.jpg` — Карманные приборы Starter Pen
- `starter-electrodes.jpg` — Электроды Starter

### public/products/moisture-analyzers/
- `mb120.jpg` — Анализатор влагосодержания MB120
- `mb90.jpg` — Анализатор влагосодержания MB90
- `mb27.jpg` — Анализатор влагосодержания MB27
- `mb25.jpg` — Анализатор влагосодержания MB25
- `mb23.jpg` — Анализатор влагосодержания MB23

### public/products/calibration-weights/
- `oiml-individual.jpg` — Калибровочные гири OIML (поштучно)
- `oiml-sets.jpg` — Наборы калибровочных гирь OIML

### public/products/bench-scales/
- `defender-5000-ss.jpg` — Defender™ 5000, нержавеющая сталь
- `defender-5000.jpg` — Defender™ 5000
- `defender-3000-ss.jpg` — Defender™ 3000, нержавеющая сталь
- `defender-3000.jpg` — Defender™ 3000
- `defender-2000-d24p.jpg` — Defender™ 2000 (D24P)
- `ranger-7000.jpg` — Ranger™ 7000
- `ranger-2000.jpg` — Ranger™ 2000
- `valor-7000.jpg` — Valor™ 7000
- `valor-4000.jpg` — Valor™ 4000
- `valor-3000.jpg` — Valor™ 3000
- `valor-2000.jpg` — Valor™ 2000
- `valor-1000.jpg` — Valor™ 1000

### public/products/counting-scales/
- `ranger-count-2000.jpg` — Счётные весы Ranger™ Count 2000

### public/products/indicators/
- `td52xw.jpg` — Многофункциональный терминал TD52XW
- `td52p.jpg` — Многофункциональный терминал TD52P
- `t51xw.jpg` — Промышленный терминал T51XW
- `t32xw.jpg` — Промышленный терминал T32XW
- `t31p.jpg` — Базовый терминал T31P
- `t24p.jpg` — Экономичный терминал T24P

### public/products/jewelry-scales/
- `scout-sjx.jpg` — Ювелирные весы Scout™ SJX

### public/products/mechanical-scales/
- `triple-beam-700.jpg` — Весы Triple Beam™ серии 700
- `triple-beam-dial-1600.jpg` — Весы Triple Beam Dial-O-Gram™ серии 1600
- `dial-cent-o-gram-300.jpg` — Весы Dial-O-Gram™ и Cent-O-Gram™ серии 300
- `harvard-trip.jpg` — Весы Harvard Trip™

### public/products/labjaws-clamps-supports/
- `multi-purpose-clamps.jpg` — Многоцелевые зажимы LabJaws™

### public/products/equipment-accessories/
- `homogenizer-accessories.jpg` — Принадлежности для гомогенизаторов
- `shaker-accessories.jpg` — Принадлежности для шейкеров
- `vortexer-accessories.jpg` — Принадлежности для вортексов
- `dry-block-heater-accessories.jpg` — Принадлежности для твердотельных термостатов

## Если фото не класть вручную

У каждого товара в `lib/products/data.ts` есть ссылка на фирменное фото OHAUS.
Команда `npm run import-images` скачивает их и подставляет товарам с пустой
галереей — локальные файлы нужны только там, где хочется своё фото.

## Ещё не наполнены (нужны данные + фото)

- **Напольные весы** (`floor-scales`) — на ru.ohaus.com в этой категории нет
  карточек семейств, брать нечего. Страница остаётся пустой, пока не пришлёте
  список моделей.
