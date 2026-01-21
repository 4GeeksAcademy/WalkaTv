export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return Response.json(
      { error: "API Key o Channel ID no configurados" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${apiKey}`
    );

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return Response.json({ error: "Canal no encontrado" }, { status: 404 });
    }

    const channel = data.items[0];
    const stats = channel.statistics;
    const snippet = channel.snippet;

    const formattedStats = {
      subscribers: parseInt(stats.subscriberCount) || 0,
      views: parseInt(stats.viewCount) || 0,
      videoCount: parseInt(stats.videoCount) || 0,
      title: snippet.title,
      description: snippet.description,
      thumbnail: snippet.thumbnails.default.url,
    };

    return Response.json(formattedStats, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return Response.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
