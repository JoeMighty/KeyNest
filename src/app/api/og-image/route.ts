import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        // Disguise as a standard browser to avoid basic bot blocks
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-GB,en;q=0.5",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch url" }, { status: response.status });
    }

    const html = await response.text();

    // Look for og:image meta tag
    const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) 
                      || html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"/i)
                      || html.match(/<meta[^>]*name="twitter:image"[^>]*content="([^"]+)"/i);

    if (ogImageMatch && ogImageMatch[1]) {
      // Decode HTML entities just in case
      const imageUrl = ogImageMatch[1].replace(/&amp;/g, '&');
      return NextResponse.json({ imageUrl });
    }

    return NextResponse.json({ error: "No image found" }, { status: 404 });
  } catch (error) {
    console.error("Error scraping image:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
