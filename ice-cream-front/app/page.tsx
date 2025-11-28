'use server';

import { LoginPageContent } from "@/components/LoginPageContent";
import { isDarkMode } from "@/services/darkMode";

export default async function Home() {
  const dark = await isDarkMode();

  return (
    <>
      <LoginPageContent dark={dark} />
    </>
  );
}
