import { Suspense } from "react";
import loadable from "next/loadable";
import DashboardLayout from "@/layouts/DashboardLayout";
import configurationService from "@/services/configurationService";

export const dynamic = "force-dynamic";

const Profile = dynamic(() => import("@/components/dashboard/Profile"), {
  suspense: true,
});

export async function generateMetadata() {
  const assistantId = process.env.NEXT_PUBLIC_DOMAIN_ID;

  const config =
    await configurationService.fetchAssistantConfigurationServer(assistantId);

  return {
    title: `${config.metaTitle || "Your AI Assistant Profile"} | KreateBots`,
    description:
      config.metaDescription ||
      "Customize your AI Assistant experience. Update your preferences, configurations, and personalize your chatbot using KreateBots.",
  };
}
export default function Page() {
  return (
    <DashboardLayout route="profile">
      <Suspense>
        <Profile />
      </Suspense>
    </DashboardLayout>
  );
}
