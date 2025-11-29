export default async function handler(req, res) {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "Missing query" });

  const key = process.env.YT_API_KEY;
  if (!key) return res.status(500).json({ error: "Missing API key" });

  try {
    const params = new URLSearchParams({
      part: "snippet",
      q,
      type: "video",
      maxResults: "20",
      key
    });

    const response = await fetch(
      "https://www.googleapis.com/youtube/v3/search?" + params.toString()
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "YouTube API error" });
  }
}
