# OHAUS Kazakhstan — ohaus.kz

Каркас информационно-каталожного сайта официального представительства **OHAUS** в Казахстане. Структурно и визуально близок к `ru.ohaus.com`.

> **Этап 1 — только каркас.** Карточки товаров, реальные тексты и фотографии не заполнены: везде структурные плейсхолдеры/скелетоны. Фирменные ассеты (логотип, фото) подставляются на следующем этапе.

## Технологии

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS 3** (дизайн-токены в `tailwind.config.ts` + CSS-переменные в `app/globals.css`)
- **next/font/google** — Roboto (заголовки) + Open Sans (текст), подмножества `latin` + `cyrillic`
- **lucide-react** — иконки
- ESLint + Prettier

## Команды

```bash
npm install      # установка зависимостей
npm run dev      # локальная разработка (http://localhost:3000)
npm run build    # production-сборка
npm run start    # запуск собранного приложения
npm run lint     # проверка ESLint
```

## Структура

```
app/                        маршруты (App Router)
  layout.tsx                TopBar + Header + {children} + Footer
  page.tsx                  главная: Hero → QuickLinks → PromoBanner
  globals.css               токены + базовые стили
  products/                 каталог (4 уровня динамики) + обзор
  support/ news/ about/
  contacts/ quote/ search/  статические страницы
  not-found.tsx             404
components/
  layout/                   TopBar, Header, MainNav, MegaMenu, MobileNav, Footer, Breadcrumbs, Logo, SearchBox
  home/                     Hero, SeriesTab, QuickLinks, CategoryCard, PromoBanner
  ui/                       Container, Skeleton, SectionHeading, Button, ProductCard
lib/
  catalog.ts                таксономия каталога (сегменты → группы → подкатегории) + хелперы маршрутов
  utils.ts                  cn() — объединение классов
```

## Каталог и маршрутизация

Таксономия задана в [`lib/catalog.ts`](lib/catalog.ts) по сегментам рынка (Лабораторные, Промышленные, Торговые, Пищевая промышленность, Образование). Slug'и сохранены как на исходном сайте.

Все ссылки нормализуются под `/products/...` через `hrefForSlug()`. Динамические страницы каталога валидируют известные уровни (`[category]`, `[subcategory]`) по каталогу и возвращают `notFound()` для неизвестных; уровни `[series]` и `[model]` рендерят скелетоны по запросу. `generateStaticParams` предсобирает известные категории и подкатегории.

## Перенос контента с ru.ohaus.com

Мы — филиал OHAUS, оборудование то же самое, поэтому описания, характеристики
и «Особенности» берутся с `ru.ohaus.com` и переносятся в Sanity.

```bash
npm run scrape            # собрать контент в scripts/.cache/ohaus.json (Sanity не нужна)
npm run scrape -- --fresh # то же, но заново скачать страницы мимо кэша HTML
npm run import-content    # записать собранное в Sanity (нужен .env.local)
```

Какая наша карточка какому их семейству соответствует — задано списком в
[`scripts/ohaus-map.ts`](scripts/ohaus-map.ts) и проверено вручную. Раньше пары
подбирались по похожести названий, из-за чего часть товаров оставалась без
контента, а часть рисковала получить чужой (их «Вортексы» — это наши «Вихревые
смесители Mini», «MB120» — «Анализатор влагосодержания MB120»). Появилось у них
новое семейство — `npm run scrape` скажет об этом в конце отчёта.

Что куда попадает:

| Вкладка на карточке | Поле в Sanity | Источник на ru.ohaus.com    |
| ------------------- | ------------- | --------------------------- |
| текст под названием | `summary`     | `family-description`        |
| Особенности         | `features`    | блоки «картинка + текст»     |
| Характеристики      | `specs`       | фильтры таблицы моделей      |
| Описание            | `details`     | пары «параметр — значение»   |

`import-content` трогает только эти четыре поля: галерея, документы и порядок
товаров остаются как есть. Картинки особенностей заливаются один раз и
опознаются по исходному URL, так что перезапуск их не дублирует. Полезные
флаги: `--dry-run`, `--no-images`, `--no-specs`.

Те же описания и характеристики лежат в [`lib/products/data.ts`](lib/products/data.ts)
— это сид для `npm run migrate`, когда базу заполняют с нуля.

## Деплой на Vercel

Переменные окружения не нужны. `next build` проходит без ошибок → push в Git запускает авто-деплой на Vercel.
