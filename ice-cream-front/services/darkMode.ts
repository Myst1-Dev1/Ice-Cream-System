"use server";

import { cookies } from "next/headers";

export async function setDarkMode() {
  const cookieStore = await cookies();

  cookieStore.set("dark", "true", {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

export async function clearDarkMode() {
  const cookieStore = await cookies();

  cookieStore.set("dark", "", {
    path: "/",
    maxAge: 0,
  });
}

export async function isDarkMode() {
  const cookieStore = await cookies();
  return cookieStore.get("dark")?.value === "true";
}