export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Не бросаем ошибку при отсутствии env, чтобы сборка не падала до настройки
// переменных окружения (Studio просто не заработает, пока их нет).
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
