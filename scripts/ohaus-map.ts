/**
 * Явное соответствие «наш товар → страница семейства на ru.ohaus.com».
 *
 * Раньше пары подбирались по похожести названий. Это ненадёжно: их
 * «Вортексы» — это наши «Вихревые смесители Mini», а «MB120» — наш
 * «Анализатор влагосодержания MB120»; нечёткий поиск такие пары либо терял,
 * либо связывал не с тем товаром, и на карточку уезжали чужие особенности.
 * Поэтому соответствие задано списком и проверено вручную.
 *
 * Ключ — slug товара (Product.model, он же slug документа в Sanity).
 * Значение — путь страницы семейства на ru.ohaus.com.
 */
export const OHAUS_URLS: Record<string, string> = {
  // Аналитические весы
  "explorer-semi-micro": "/ru-ru/explorersemi-microbalances-15",
  "explorer-analytical": "/ru-ru/exploreranalytical-15",
  "adventurer-analytical": "/ru-ru/adventureranalytical-12",
  "pioneer-semi-micro": "/ru-ru/pioneersemi-micro-11",
  "pioneer-analytical": "/ru-ru/pioneeranalytical-38",
  "pr-analytical": "/ru-ru/prseriesanalytical-11",

  // Прецизионные весы
  "explorer-precision": "/ru-ru/explorerprecision-15",
  "explorer-high-capacity": "/ru-ru/explorerprecisionhighcapacity-15",
  "adventurer-precision": "/ru-ru/adventurerprecision-15",
  "pioneer-precision": "/ru-ru/pioneerprecision-30",
  "pr-precision": "/ru-ru/prseriesprecision-11",

  // Портативные весы
  "scout-stx": "/ru-ru/scoutstx-15",
  "scout-spx": "/ru-ru/scoutspx-15",
  navigator: "/ru-ru/navigator-16",
  "compass-cx": "/ru-ru/compasscx-14",
  "compass-cr": "/ru-ru/compasscr-14",

  // Механические весы
  "triple-beam-700": "/ru-ru/triplebeam700series-12",
  "triple-beam-dial-1600": "/ru-ru/triplebeamdial-o-gram1600series-12",
  "dial-cent-o-gram-300": "/ru-ru/dial-o-gramandcent-o-gram300series-15",
  "harvard-trip": "/ru-ru/harvardtrip-12",

  // Ювелирные весы
  "scout-sjx": "/ru-ru/scoutsjx-16",

  // Платформенные весы
  "defender-5000-ss": "/ru-ru/defender5000washdown-d52-11",
  "defender-5000": "/ru-ru/defender5000-d52-11",
  "defender-3000-ss": "/ru-ru/defender3000stainlesssteel-12",
  "defender-3000": "/ru-ru/defender3000-15",
  "defender-2000-d24p": "/ru-ru/defender2000-d24p-15",
  "ranger-7000": "/ru-ru/ranger7000-15",
  "ranger-2000": "/ru-ru/ranger2000-15",
  "valor-7000": "/ru-ru/valor7000-15",
  "valor-4000": "/ru-ru/valor4000-12",
  "valor-3000": "/ru-ru/valor3000-12",
  "valor-2000": "/ru-ru/valor2000-13",
  "valor-1000": "/ru-ru/valor1000-v12p-5",

  // Счетные весы
  "ranger-count-2000": "/ru-ru/rangercount2000-13",

  // Терминалы
  td52xw: "/ru-ru/td52xw-14",
  td52p: "/ru-ru/td52p-14",
  t51xw: "/ru-ru/t51xw-15",
  t32xw: "/ru-ru/t32xw-15",
  t31p: "/ru-ru/t31p-15",
  t24p: "/ru-ru/t24p-15",

  // Анализаторы влагосодержания
  mb120: "/ru-ru/mb120-17",
  mb90: "/ru-ru/mb90-18",
  mb27: "/ru-ru/mb27-12",
  mb25: "/ru-ru/mb25-16",
  mb23: "/ru-ru/mb23-12",

  // Анализаторы жидкости и электроды
  "starter-5000-ph": "/ru-ru/starter5000phbench-15",
  ab41ph: "/ru-ru/aquasearcherab41phbenchmeter-12",
  ab33m1: "/ru-ru/aquasearcherab33m1benchmeter-12",
  ab33ph: "/ru-ru/aquasearcherab33phbenchmeter-12",
  ab33ec: "/ru-ru/aquasearcherab33ecbenchmeter-12",
  ab23ph: "/ru-ru/aquasearcherab23phbenchmeter-12",
  ab23ec: "/ru-ru/aquasearcherab23ecbenchmeter-12",
  "starter-400m": "/ru-ru/starter400mphconductivityportable-12",
  "starter-400": "/ru-ru/starter400phportable-9",
  "starter-400d": "/ru-ru/starter400ddoportable-12",
  "starter-300": "/ru-ru/starter300phportable-12",
  "starter-300c": "/ru-ru/starter300cconductivityportable-12",
  "starter-pen": "/ru-ru/starterpenmeters-15",
  "starter-electrodes": "/ru-ru/starterelectrodes-15",

  // Калибровочные гири
  "oiml-individual": "/ru-ru/oimlindividualcalibrationweights-1",
  "oiml-sets": "/ru-ru/oimlcalibrationweightsets-1",

  // Центрифуги
  "frontier-5000-multi-pro": "/ru-ru/frontier5000seriesmultipro-18",
  "frontier-5000-multi": "/ru-ru/frontier5000seriesmulti-12",
  "frontier-5000-micro": "/ru-ru/frontier5000seriesmicro-12",
  "frontier-5000-mini": "/ru-ru/frontier5000seriesmini-12",
  "frontier-rotors-5000": "/ru-ru/frontierrotors-18",

  // Открытые шейкеры
  "heavy-duty-orbital": "/ru-ru/heavydutyorbitalshakers-12",
  "extreme-environment": "/ru-ru/extremeenvironmentshakers-12",
  "light-duty-orbital": "/ru-ru/lightdutyorbitalshakers-12",
  "rocking-waving": "/ru-ru/rockingwavingshakers-12",
  reciprocating: "/ru-ru/reciprocatingshakers-12",
  "high-speed-microplate": "/ru-ru/highspeedmicroplateshakers-15",

  // Шейкеры-инкубаторы и шейкеры-инкубаторы с охлаждением
  "incubating-cooling-thermal": "/ru-ru/incubatingcoolingthermalshakers-12",
  "incubating-cooling-orbital": "/ru-ru/incubatingcoolingorbitalshakers-12",
  "incubating-light-duty-orbital":
    "/ru-ru/incubatinglightdutyorbitalshakers-12",
  "incubating-heavy-duty-orbital":
    "/ru-ru/incubatingheavydutyorbitalshakers-11",
  "incubating-rocking-waving": "/ru-ru/incubatingrockingwavingshakers-12",

  // Вихревые смесители
  "heavy-duty-vortex": "/ru-ru/heavy-dutyvortexmixers-12",
  "multi-tube-vortex": "/ru-ru/multi-tubevortexmixers-12",
  "microplate-vortex": "/ru-ru/microplatevortexmixers-12",
  "mini-vortex": "/ru-ru/vortexmixers-12",

  // Твердотельные термостаты
  "single-block": "/ru-ru/1blockdryblockheaters-12",
  "two-block": "/ru-ru/2blockdryblockheaters-12",
  "four-block": "/ru-ru/4blockdryblockheaters-12",
  "six-block": "/ru-ru/6blockdryblockheaters-12",

  // Верхнеприводные мешалки
  "achiever-5000": "/ru-ru/achiever5000-11",

  // Нагревательные плиты и мешалки
  "guardian-7000": "/ru-ru/guardian7000hotplatestirrers-1",
  "guardian-5000-g51": "/ru-ru/guardian5000hotplatesstirrers-g51-6",
  "guardian-5000-g52": "/ru-ru/guardian5000hotplatesstirrers-8",
  "mini-hotplates": "/ru-ru/minihotplatesstirrers-12",

  // Зажимы LabJaws и подставки
  "multi-purpose-clamps": "/ru-ru/multipurposeclamps-12",

  // Аксессуары для оборудования
  "homogenizer-accessories": "/ru-ru/homogenizersaccessories-17",
  "shaker-accessories": "/ru-ru/shakeraccessories-15",
  "vortexer-accessories": "/ru-ru/vortexeraccessories-15",
  "dry-block-heater-accessories": "/ru-ru/dryblockheateraccessories-15",
};

/** Категории каталога на их сайте — источник списка семейств для сверки. */
export const CATEGORY_URLS: Record<string, string> = {
  "analytical-balances": "/ru-ru/products/balances-scales/analytical-balances",
  "precision-balances": "/ru-ru/products/balances-scales/precision-balances",
  "portable-scales-2": "/ru-ru/portable-scales-2",
  "mechanical-scales":
    "/ru-ru/products/balances-scales/mechanical-scales-balances",
  "jewelry-scales": "/ru-ru/products/balances-scales/jewelry-scales",
  "bench-scales": "/ru-ru/products/balances-scales/bench-scales",
  "counting-scales": "/ru-ru/products/balances-scales/counting-scales",
  "floor-scales": "/ru-ru/products/balances-scales/floor-scales",
  indicators: "/ru-ru/products/balances-scales/indicators",
  "moisture-analyzers": "/ru-ru/products/balances-scales/moisture-analyzers",
  "water-analysis": "/ru-ru/products/instruments-equipment/water-analysis",
  "calibration-weights": "/ru-ru/products/weights/calibration-weights",
  centrifuges: "/ru-ru/products/equipment/centrifuges",
  "open-air-shakers": "/ru-ru/products/equipment/open-air-shakers",
  "incubating-incubating-cooling-shakers":
    "/ru-ru/products/equipment/incubating-incubating-cooling-shakers",
  "laboratory-vortex-mixers":
    "/ru-ru/products/equipment/laboratory-vortex-mixers",
  "dry-block-heaters": "/ru-ru/products/equipment/dry-block-heaters",
  "overhead-stirrers": "/ru-ru/products/equipment/overhead-stirrers",
  "hotplates-stirrers": "/ru-ru/products/equipment/hotplates-stirrers",
  "labjaws-clamps-supports":
    "/ru-ru/products/equipment/labjaws-clamps-and-supports",
  "equipment-accessories": "/ru-ru/products/equipment/equipment-accessories",
};
