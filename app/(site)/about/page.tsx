import type { Metadata } from "next";
import { Send, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PageHero, { PAGE_BG } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { resolveContacts } from "@/lib/contacts";
import { getSiteSettings } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "О компании",
  description:
    "ТОО «Schneider Group» — официальный дистрибьютор OHAUS в Казахстане. С 2014 года поставляем лабораторное, аналитическое, измерительное и испытательное оборудование.",
  alternates: { canonical: "/about" },
};

/** Короткие факты о компании — выносим над текстом, их читают первыми. */
const FACTS = [
  { value: "с 2014", label: "года на рынке Казахстана" },
  { value: "OHAUS", label: "официальный дистрибьютор" },
  { value: "95", label: "моделей оборудования в каталоге" },
  { value: "РК и СНГ", label: "география поставок" },
];

export default async function AboutPage() {
  const c = resolveContacts(await getSiteSettings());

  return (
    <>
      <BreadcrumbJsonLd items={[{ title: "О компании" }]} />
      <PageHero
        title="О компании"
        subtitle="ТОО «Schneider Group» — официальный дистрибьютор OHAUS в Казахстане."
        crumbs={[{ title: "О компании" }]}
        image={PAGE_BG.company}
      />

      <Container>
        <div className="py-12 lg:py-16">
          {/* Факты */}
          <div className="mb-12 grid grid-cols-2 gap-px border border-ohaus-line bg-ohaus-line lg:grid-cols-4">
            {FACTS.map((f) => (
              <div key={f.label} className="bg-white p-5">
                <p className="font-heading text-2xl font-bold text-ohaus-red">
                  {f.value}
                </p>
                <p className="mt-1 text-sm leading-snug text-ohaus-muted">
                  {f.label}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
            <div className="max-w-2xl space-y-10">
              <section>
                <h2 className="font-heading text-xl font-bold text-ohaus-ink sm:text-2xl">
                  Кто мы
                </h2>
                <span
                  className="mt-3 block h-1 w-12 bg-ohaus-red"
                  aria-hidden="true"
                />
                <div className="text-ohaus-ink/90 mt-4 space-y-4 text-base leading-relaxed">
                  <p>
                    ТОО «Schneider Group» работает на рынке Казахстана с 2014
                    года. Основное направление — комплексные поставки
                    лабораторного, аналитического, измерительного и
                    испытательного оборудования для предприятий добывающей,
                    промышленной и сельскохозяйственной отраслей, а также для
                    организаций, которые занимаются контролем качества и
                    безопасности.
                  </p>
                  <p>
                    Мы поставляем оборудование по всей территории Республики
                    Казахстан и в страны ближнего зарубежья. Этот сайт посвящён
                    направлению <strong>OHAUS</strong> — весам и лабораторному
                    оборудованию, официальным дистрибьютором которого мы
                    являемся.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-ohaus-ink sm:text-2xl">
                  Что мы поставляем
                </h2>
                <span
                  className="mt-3 block h-1 w-12 bg-ohaus-red"
                  aria-hidden="true"
                />
                <div className="text-ohaus-ink/90 mt-4 space-y-4 text-base leading-relaxed">
                  <p>
                    Полная линейка OHAUS: аналитические, прецизионные,
                    портативные и механические весы, промышленные платформенные
                    и счётные весы, весовые терминалы, анализаторы
                    влагосодержания, приборы для анализа жидкости и электроды,
                    калибровочные гири классов E1–F2.
                  </p>
                  <p>
                    Лабораторное оборудование: центрифуги и роторы, открытые
                    шейкеры и шейкеры-инкубаторы, вихревые смесители,
                    твердотельные термостаты, нагревательные плиты с мешалками,
                    верхнеприводные мешалки, зажимы и принадлежности.
                  </p>
                  <p>
                    Подбираем модель под техническое задание заказчика: по
                    наибольшему пределу взвешивания и дискретности, по классу
                    точности, по условиям эксплуатации — от чистой лаборатории
                    до влажного пищевого производства.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-ohaus-ink sm:text-2xl">
                  Почему с нами работают
                </h2>
                <span
                  className="mt-3 block h-1 w-12 bg-ohaus-red"
                  aria-hidden="true"
                />
                <ul className="text-ohaus-ink/90 mt-4 space-y-3 text-base leading-relaxed">
                  <li className="border-l-2 border-ohaus-line pl-4">
                    <strong>Официальный статус.</strong> Оборудование идёт от
                    производителя, с заводской гарантией и документами.
                  </li>
                  <li className="border-l-2 border-ohaus-line pl-4">
                    <strong>Подбор под задачу.</strong> Специалисты помогают
                    выбрать оборудование, оптимально отвечающее техническим
                    требованиям, — без переплаты за лишние функции.
                  </li>
                  <li className="border-l-2 border-ohaus-line pl-4">
                    <strong>Цены и сроки.</strong> Конкурентоспособная стоимость
                    и надёжные сроки поставки.
                  </li>
                  <li className="border-l-2 border-ohaus-line pl-4">
                    <strong>Сервис.</strong> Гарантийное и послегарантийное
                    обслуживание поставленного оборудования.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-xl font-bold text-ohaus-ink sm:text-2xl">
                  Другие наши направления
                </h2>
                <span
                  className="mt-3 block h-1 w-12 bg-ohaus-red"
                  aria-hidden="true"
                />
                <div className="text-ohaus-ink/90 mt-4 space-y-4 text-base leading-relaxed">
                  <p>
                    Помимо OHAUS, Schneider Group является официальным
                    представителем и партнёром ряда ведущих мировых
                    производителей. Среди них{" "}
                    <strong>Thermo Fisher Scientific</strong> — приборы для
                    молекулярно-биологических исследований, биохимические
                    анализаторы, микропланшетное оборудование и лабораторные
                    дозаторы.
                  </p>
                  <p>
                    С 2020 года мы также партнёр и торговый дом ТОО «АЛЕКСПОРТ»
                    — производителя оборудования для измельчения, дробления,
                    истирания, рассева и обогащения материалов.
                  </p>
                  <p>
                    Полный перечень направлений — на сайте компании{" "}
                    <a
                      href="https://www.scht.kz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-ohaus-red hover:underline"
                    >
                      scht.kz
                    </a>
                    .
                  </p>
                </div>
              </section>
            </div>

            {/* Боковая колонка с призывом */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="border border-ohaus-line bg-ohaus-bg-soft p-6">
                <h2 className="font-heading text-lg font-bold text-ohaus-ink">
                  Обсудим вашу задачу
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ohaus-muted">
                  Расскажите, что нужно взвешивать или измерять, — подберём
                  модель и подготовим коммерческое предложение.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <Button href="/request">
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Оставить заявку
                  </Button>
                  <a
                    href={c.phoneHref}
                    className="inline-flex items-center justify-center gap-2 font-heading text-sm font-bold text-ohaus-ink transition-colors hover:text-ohaus-red"
                  >
                    <Phone
                      className="h-4 w-4 text-ohaus-red"
                      aria-hidden="true"
                    />
                    {c.phone}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </>
  );
}
