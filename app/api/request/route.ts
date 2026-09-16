import { NextResponse } from "next/server";

/**
 * Приём заявки с сайта → сообщение в Telegram.
 *
 * Бот и чат общие с scht.kz: секреты лежат в переменных окружения
 * (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID) — локально в .env.local, на проде
 * в настройках Vercel. В код их вписывать нельзя: всё, что попало в коммит,
 * остаётся в истории git навсегда.
 */

export const runtime = "nodejs";

/** Пределы длины полей — защита от мусора и от переполнения сообщения. */
const LIMITS = {
  name: 100,
  company: 150,
  phone: 30,
  email: 120,
  comment: 2000,
  product: 200,
  page: 300,
} as const;

type Field = keyof typeof LIMITS;

/** Тексты идут в Telegram с parse_mode=HTML — угловые скобки надо экранировать. */
function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function clean(v: unknown, field: Field): string {
  if (typeof v !== "string") return "";
  return v.replace(/\s+/g, " ").trim().slice(0, LIMITS[field]);
}

/** Телефон: минимум 10 цифр, допускаем +, пробелы, скобки, дефисы. */
function isPhone(s: string): boolean {
  const digits = s.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15 && /^[\d\s()+-]+$/.test(s);
}

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
}

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Заявка: не заданы TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID");
    return NextResponse.json(
      { error: "Форма временно недоступна. Позвоните или напишите нам." },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Неверный запрос." }, { status: 400 });
  }

  // Скрытое поле-ловушка: человек его не видит и не заполняет, бот — заполняет.
  // Отвечаем «успехом», чтобы не подсказывать спамеру, что его отсеяли.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, "name");
  const company = clean(body.company, "company");
  const phone = clean(body.phone, "phone");
  const email = clean(body.email, "email");
  const comment = clean(body.comment, "comment");
  const product = clean(body.product, "product");
  const page = clean(body.page, "page");

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Укажите имя.";
  if (!phone) errors.phone = "Укажите номер телефона.";
  else if (!isPhone(phone)) errors.phone = "Проверьте номер телефона.";
  if (email && !isEmail(email)) errors.email = "Проверьте адрес почты.";
  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const lines = [
    "🟥 <b>Сайт Ohaus — новая заявка</b>",
    "",
    `👤 <b>Имя:</b> ${esc(name)}`,
    company ? `🏢 <b>Компания:</b> ${esc(company)}` : null,
    `📞 <b>Телефон:</b> ${esc(phone)}`,
    email ? `✉️ <b>Email:</b> ${esc(email)}` : null,
    product ? `📦 <b>Товар:</b> ${esc(product)}` : null,
    comment ? `💬 <b>Комментарий:</b>\n${esc(comment)}` : null,
    page ? `\n🔗 ${esc(page)}` : null,
  ].filter((l): l is string => l !== null);

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join("\n"),
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        signal: AbortSignal.timeout(15000),
      },
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Заявка: Telegram ответил", res.status, detail);
      return NextResponse.json(
        {
          error: "Не удалось отправить. Попробуйте ещё раз или позвоните нам.",
        },
        { status: 502 },
      );
    }
  } catch (e) {
    console.error("Заявка: ошибка отправки", e);
    return NextResponse.json(
      { error: "Не удалось отправить. Попробуйте ещё раз или позвоните нам." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
