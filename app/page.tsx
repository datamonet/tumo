import { ImagePlayground } from "@/components/image-playground";
import { getRandomSuggestions } from "@/lib/suggestions";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function checkSetupRequired() {
  try {
    const userCount = await prisma.user.count();
    return userCount === 0;
  } catch (error) {
    console.error("Error checking user count:", error);
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
