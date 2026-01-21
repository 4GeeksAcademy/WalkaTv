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
    // Primero obtener el ID del playlist de uploads
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
    );

    const channelData = await channelResponse.json();

    if (!channelData.items || channelData.items.length === 0) {
      return Response.json({ error: "Canal no encontrado" }, { status: 404 });
    }

    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Obtener los últimos videos del playlist
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=6&order=date&key=${apiKey}`
    );

    const videosData = await videosResponse.json();

    if (!videosData.items || videosData.items.length === 0) {
      return Response.json({ videos: [] });
    }

    const videos = videosData.items.map((item: any) => ({
      id: item.contentDetails.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      youtubeUrl: `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`,
    }));

    return Response.json({ videos }, {
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
