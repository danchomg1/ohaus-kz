import type { Metadata } from "next";
import { Plus } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Узнать цены",
  description: "Список запроса цен OHAUS Kazakhstan.",
};

const field =
  "w-full border border-ohaus-line bg-white px-3 py-2.5 text-sm text-ohaus-ink placeholder:text-ohaus-muted focus:border-ohaus-red focus:outline-none focus:ring-1 focus:ring-ohaus-red";
const label = "mb-1.5 block font-heading text-sm font-bold text-ohaus-ink";

export default function QuotePage() {
  return (
    <Container className="max-w-3xl">
      <Breadcrumbs items={[{ title: "Узнать цены" }]} />
      <SectionHeading
        as="h1"
        title="Узнать цены"
        subtitle="Заполните форму — мы подготовим коммерческое предложение. (Каркас формы, отправка будет подключена позже.)"
      />

      {/* Requested items list (placeholder) */}
      <div className="mb-8 border border-ohaus-line">
        <div className="flex items-center justify-between border-b border-ohaus-line bg-ohaus-bg-soft px-4 py-3">
          <h2 className="font-heading text-sm font-bold text-ohaus-ink">
            Список запроса
          </h2>
          <span className="text-xs text-ohaus-muted">Позиций: 0</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 px-4 py-10 text-center">
          <p className="text-sm text-ohaus-muted">
            Список пуст. Добавьте продукты из каталога.
          </p>
          <Button href="/products" variant="outline">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Перейти в каталог
          </Button>
        </div>
      </div>

      {/* Contact form scaffold (no submit logic) */}
      <form className="space-y-5 pb-16" aria-label="Форма запроса цен">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="q-name" className={label}>
              Имя
            </label>
            <input id="q-name" name="name" type="text" className={field} />
          </div>
          <div>
            <label htmlFor="q-company" className={label}>
              Компания
            </label>
            <input
              id="q-company"
              name="company"
              type="text"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="q-email" className={label}>
              Email
            </label>
            <input id="q-email" name="email" type="email" className={field} />
          </div>
          <div>
            <label htmlFor="q-phone" className={label}>
              Телефон
            </label>
            <input id="q-phone" name="phone" type="tel" className={field} />
          </div>
        </div>
        <div>
          <label htmlFor="q-message" className={label}>
            Сообщение
          </label>
          <textarea id="q-message" name="message" rows={5} className={field} />
        </div>
        <Button type="button" size="lg">
          Отправить запрос
        </Button>
      </form>
    </Container>
  );
}
