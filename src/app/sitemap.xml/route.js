export const dynamic = "force-dynamic";
//https://us-central1-onboarding-bot-14200.cloudfunctions.net/expressApi
export async function GET() {
  const response = await fetch(
    "https://us-central1-onboarding-bot-14200.cloudfunctions.net/expressApi/cricket/sitemap.xml"
  );
  const sitemap = await response.text();

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
