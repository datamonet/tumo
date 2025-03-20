import { ImagePlayground } from "@/components/image-playground";
import { getRandomSuggestions } from "@/lib/suggestions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function checkSetupRequired() {
  try {
    const response = await fetch(
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/auth/user-exists`
        : "http://localhost:3000/api/auth/user-exists",
      { cache: "no-store" }
    );
    const data = await response.json();
    return !data.exists;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
}

export default async function Page() {
  const setupRequired = await checkSetupRequired();

  if (setupRequired) {
    redirect("/setup");
  }

  return <ImagePlayground suggestions={getRandomSuggestions()} />;
}
