import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import configurationService from "@/services/configurationService";
import { Toaster } from "react-hot-toast";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const assistantId = process.env.NEXT_PUBLIC_DOMAIN_ID;

  const config =
    await configurationService.fetchAssistantConfigurationServer(assistantId);

  return {
    title: `${config.metaTitle || "AI Assistant"} | KreateBots`,
    description:
      config.metaDescription ||
      "Start chatting with your AI Assistant built using KreateBots. Get instant answers, support, and intelligent conversations.",
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://storage.googleapis.com/json_articles/dataknobs-logo-2.jpg"
        />
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </head>
      <body className={`antialiased`}>
        <AppProvider>
          {children}
          <Toaster position="top-right" />
        </AppProvider>
      </body>
    </html>
  );
}
