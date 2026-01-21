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
    // Obtener el ID del playlist de uploads
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
    );

    const channelData = await channelResponse.json();

    if (!channelData.items || channelData.items.length === 0) {
      return Response.json({ error: "Canal no encontrado" }, { status: 404 });
    }

    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Obtener muchos videos para ordenarlos por vistas
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}`
    );

    const videosData = await videosResponse.json();

    if (!videosData.items || videosData.items.length === 0) {
      return Response.json({ videos: [] });
    }

    // Obtener estadísticas de cada video
    const videoIds = videosData.items.map((item: any) => item.contentDetails.videoId).join(",");

    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${apiKey}`
    );

    const statsData = await statsResponse.json();

    // Ordenar por vistas y tomar los top 3
    const topVideos = statsData.items
      .sort((a: any, b: any) => {
        const viewsA = parseInt(a.statistics.viewCount) || 0;
        const viewsB = parseInt(b.statistics.viewCount) || 0;
        return viewsB - viewsA;
      })
      .slice(0, 3)
      .map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
        description: item.snippet.description,
        viewCount: parseInt(item.statistics.viewCount) || 0,
        youtubeUrl: `https://www.youtube.com/watch?v=${item.id}`,
      }));

    return Response.json({ videos: topVideos }, {
      headers: {
        "Cache-Control": "public, s-maxage=7200, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return Response.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
