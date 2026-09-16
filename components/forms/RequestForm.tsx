"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Values = {
  name: string;
  company: string;
  phone: string;
  email: string;
  comment: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = {
  name: "",
  company: "",
  phone: "",
  email: "",
  comment: "",
};

const field =
  "w-full border bg-white px-3 py-2.5 text-sm text-ohaus-ink placeholder:text-ohaus-muted focus:border-ohaus-red focus:outline-none focus:ring-1 focus:ring-ohaus-red";
const label = "mb-1.5 block font-heading text-sm font-bold text-ohaus-ink";

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Укажите имя.";
  if (!v.phone.trim()) e.phone = "Укажите номер телефона.";
  else if (v.phone.replace(/\D/g, "").length < 10)
    e.phone = "Проверьте номер телефона.";
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "Проверьте адрес почты.";
  return e;
}

/**
 * Форма заявки. Отправляет в /api/request, оттуда — в Telegram.
 * `product` — название товара, если пришли с его карточки: уходит в заявку
 * отдельной строкой, чтобы менеджер сразу видел, о чём речь.
 */
export default function RequestForm({ product }: { product?: string }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle",
  );
  const [serverError, setServerError] = useState("");

  function set(k: keyof Values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [k]: e.target.value }));
      if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    };
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    setServerError("");
    try {
      const fd = new FormData(e.currentTarget);
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          product: product ?? "",
          page: typeof window !== "undefined" ? window.location.href : "",
          website: fd.get("website") ?? "", // ловушка для ботов
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("sent");
        return;
      }
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }
      setServerError(
        data.error ||
          "Не удалось отправить. Попробуйте ещё раз или позвоните нам.",
      );
      setStatus("failed");
    } catch {
      setServerError(
        "Нет связи с сервером. Проверьте интернет и попробуйте ещё раз.",
      );
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 border border-ohaus-line bg-ohaus-bg-soft px-6 py-12 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-ohaus-red" aria-hidden="true" />
        <p className="font-heading text-lg font-bold text-ohaus-ink">
          Заявка отправлена
        </p>
        <p className="max-w-md text-sm text-ohaus-muted">
          Спасибо, {values.name.trim()}. Менеджер свяжется с вами по номеру{" "}
          <span className="whitespace-nowrap font-semibold text-ohaus-ink">
            {values.phone.trim()}
          </span>{" "}
          в рабочее время.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-2"
          onClick={() => {
            setValues(EMPTY);
            setStatus("idle");
          }}
        >
          Отправить ещё одну
        </Button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5"
      aria-label="Форма заявки"
    >
      {product ? (
        <p className="border-l-4 border-ohaus-red bg-ohaus-bg-soft px-4 py-3 text-sm text-ohaus-ink">
          Интересует: <span className="font-semibold">{product}</span>
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="r-name" className={label}>
            Имя <span className="text-ohaus-red">*</span>
          </label>
          <input
            id="r-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "r-name-err" : undefined}
            className={cn(
              field,
              errors.name ? "border-ohaus-red" : "border-ohaus-line",
            )}
          />
          {errors.name ? (
            <p id="r-name-err" className="mt-1 text-xs text-ohaus-red">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="r-company" className={label}>
            Компания{" "}
            <span className="font-normal text-ohaus-muted">
              (необязательно)
            </span>
          </label>
          <input
            id="r-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={set("company")}
            className={cn(field, "border-ohaus-line")}
          />
        </div>

        <div>
          <label htmlFor="r-phone" className={label}>
            Телефон <span className="text-ohaus-red">*</span>
          </label>
          <input
            id="r-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 7__ ___ __ __"
            required
            value={values.phone}
            onChange={set("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "r-phone-err" : undefined}
            className={cn(
              field,
              errors.phone ? "border-ohaus-red" : "border-ohaus-line",
            )}
          />
          {errors.phone ? (
            <p id="r-phone-err" className="mt-1 text-xs text-ohaus-red">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="r-email" className={label}>
            Email{" "}
            <span className="font-normal text-ohaus-muted">
              (необязательно)
            </span>
          </label>
          <input
            id="r-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "r-email-err" : undefined}
            className={cn(
              field,
              errors.email ? "border-ohaus-red" : "border-ohaus-line",
            )}
          />
          {errors.email ? (
            <p id="r-email-err" className="mt-1 text-xs text-ohaus-red">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="r-comment" className={label}>
          Комментарий{" "}
          <span className="font-normal text-ohaus-muted">(необязательно)</span>
        </label>
        <textarea
          id="r-comment"
          name="comment"
          rows={5}
          placeholder="Какое оборудование интересует, задача, сроки — всё, что поможет подготовить предложение."
          value={values.comment}
          onChange={set("comment")}
          className={cn(field, "border-ohaus-line")}
        />
      </div>

      {/* Ловушка для ботов: поле спрятано от людей, автозаполнители его тоже не трогают. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="r-website">Сайт</label>
        <input
          id="r-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "failed" && serverError ? (
        <p
          role="alert"
          className="border-l-4 border-ohaus-red bg-ohaus-bg-soft px-4 py-3 text-sm text-ohaus-ink"
        >
          {serverError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={sending}>
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Отправляем…
            </>
          ) : (
            "Отправить заявку"
          )}
        </Button>
        <p className="text-xs text-ohaus-muted">
          Отправляя заявку, вы соглашаетесь на обработку указанных данных для
          связи с вами.
        </p>
      </div>
    </form>
  );
}
