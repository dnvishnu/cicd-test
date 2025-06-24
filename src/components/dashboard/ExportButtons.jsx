"use client";
import chatbotService from "@/services/chatbotService";
import { Copy, Download, ThumbsUp, ThumbsDown, FileText } from "lucide-react";

const TooltipIcon = ({ label, onClick, icon: Icon, className }) => (
  <div className="group relative flex items-center">
    <button onClick={onClick} className="hover:cursor-pointer">
      <Icon size={18} className={`transition-colors ${className}`} />
    </button>
    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-95 whitespace-nowrap rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-800 opacity-0 shadow-md transition-all group-hover:scale-100 group-hover:opacity-100">
      {label}
    </span>
  </div>
);

const ExportButtons = ({ msg, title }) => {
  const handleExportToDocs = () => {
    if (!window.google?.accounts?.oauth2) {
      console.error("Google OAuth script not loaded");
      return;
    }

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id:
        "230317394473-bm2gai77hf8m7ogu2lrr5r9c1191oldb.apps.googleusercontent.com",
      scope:
        "https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/drive.file",
      callback: async (tokenResponse) => {
        const accessToken = tokenResponse.access_token;

        const createRes = await fetch(
          "https://docs.googleapis.com/v1/documents",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: title }),
          },
        );

        const { documentId } = await createRes.json();

        await fetch(
          `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              requests: [
                {
                  insertText: {
                    location: { index: 1 },
                    text: msg.text,
                  },
                },
              ],
            }),
          },
        );

        window.open(
          `https://docs.google.com/document/d/${documentId}/edit`,
          "_blank",
        );
      },
    });

    tokenClient.requestAccessToken();
  };

  return (
    <div className="me-8 mt-12 flex items-center justify-end space-x-8 text-gray-400">
      <TooltipIcon
        label="Copy"
        onClick={() => navigator.clipboard.writeText(msg.text)}
        icon={Copy}
        className="hover:text-black"
      />
      <TooltipIcon
        label="Download"
        onClick={() => chatbotService.downloadTextFile(msg.text)}
        icon={Download}
        className="hover:text-blue-600"
      />
      <TooltipIcon
        label="Like"
        onClick={() => {}}
        icon={ThumbsUp}
        className="hover:text-green-600"
      />
      <TooltipIcon
        label="Dislike"
        onClick={() => {}}
        icon={ThumbsDown}
        className="hover:text-red-600"
      />
      <TooltipIcon
        label="Export to Google Docs"
        onClick={handleExportToDocs}
        icon={FileText}
        className="hover:text-indigo-600"
      />
    </div>
  );
};

export default ExportButtons;
