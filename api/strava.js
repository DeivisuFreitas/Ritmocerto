export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const CLIENT_ID = "259363";
  const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

  if (req.method === "GET") {
    const { code } = req.query;
    if (code) {
      const response = await fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
          grant_type: "authorization_code",
        }),
      });
      const data = await response.json();
      if (data.access_token) {
        res.redirect(302, `https://ritmocerto.vercel.app?strava_token=${data.access_token}&strava_athlete=${data.athlete?.id}&strava_refresh=${data.refresh_token}`);
      } else {
        res.redirect(302, `https://ritmocerto.vercel.app?strava_error=true`);
      }
      return;
    }
    res.status(200).json({ ok: true });
    return;
  }

  if (req.method === "POST") {
    try {
      const { access_token } = req.body;
      if (!access_token) {
        res.status(400).json({ error: "Token não fornecido" });
        return;
      }
      const activitiesRes = await fetch(
        "https://www.strava.com/api/v3/athlete/activities?per_page=30&page=1",
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      const activities = await activitiesRes.json();
      res.status(200).json(activities);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
