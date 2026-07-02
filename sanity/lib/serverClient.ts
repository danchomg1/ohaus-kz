import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Серверный клиент с токеном — только для чтения данных на сервере (SSG/ISR).
// Токен берётся из server-only переменной SANITY_API_TOKEN и НЕ попадает
// в клиентский бандл (файл помечен "server-only").
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "published",
});
