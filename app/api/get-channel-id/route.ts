export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const forHandle = "Walkaatv"; // Handle sin el @

  if (!apiKey) {
    return Response.json({ error: "API Key no configurada" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${forHandle}&key=${apiKey}&maxResults=1`
    );

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const channelId = data.items[0].snippet.channelId;
      return Response.json({ 
        channelId,
        channelTitle: data.items[0].snippet.title,
        message: `Copia este Channel ID en tu .env.local: ${channelId}`
      });
    }

    return Response.json({ error: "Canal no encontrado" }, { status: 404 });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
