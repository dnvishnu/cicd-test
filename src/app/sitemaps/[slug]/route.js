export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const { slug } = await params;

  try {
    const response = await fetch(
      `https://us-central1-onboarding-bot-14200.cloudfunctions.net/expressApi/sitemaps/${slug}`
    );

    if (!response.ok) {
      console.error(`Failed to fetch sub-sitemap: ${response.statusText}`);
      return new Response("<urlset></urlset>", {
        status: 404,
        headers: {
          "Content-Type": "application/xml",
        },
      });
    }

    const sitemap = await response.text();

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (err) {
    console.error("Error fetching sub-sitemap:", err);
    return new Response("<urlset></urlset>", {
      status: 500,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }
}
