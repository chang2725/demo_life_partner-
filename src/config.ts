// src/config.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:3000/api";

export const AgentId =
  process.env.NEXT_PUBLIC_API_AUTH_TOKEN || "";
