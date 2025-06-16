import { Suspense } from "react";
import loadable from "next/dynamic"; // 👈 renamed from 'dynamic'
import configurationService from "@/services/configurationService";
import DashboardLayout from "@/layouts/DashboardLayout";

export const dynamic = "force-dynamic"; // 👈 keep this for forcing dynamic rendering

const Chatbot = loadable(() => import("@/components/dashboard/Chatbot"), {
  suspense: true,
});

export async function generateMetadata() {
  const assistantId = process.env.NEXT_PUBLIC_DOMAIN_ID;

  const config =
    await configurationService.fetchAssistantConfigurationServer(assistantId);

  return {
    title: `${config.metaTitle || "Chat with your AI Assistant"} | KreateBots`,
    description:
      config.metaDescription ||
      "Start chatting with your AI Assistant built using KreateBots. Get instant answers, support, and intelligent conversations.",
  };
}

export default function Page() {
  return (
    <DashboardLayout route="chatbot">
      <Suspense>
        <Chatbot />
      </Suspense>
    </DashboardLayout>
  );
}
