export default async function handler(req, res) {
  const { code } = req.query;
  const CLIENT_ID = "259363";
  const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

  if (req.method === "GET" && code) {
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
      res.redirect(`https://ritmocerto.vercel.app?strava_token=${data.access_token}&strava_athlete=${data.athlete?.id}&strava_refresh=${data.refresh_token}`);
    } else {
      res.redirect(`https://ritmocerto.vercel.app?strava_error=true`);
    }
    return;
  }

  if (req.method === "POST") {
    const { access_token } = req.body;
    // Busca todos os tipos de atividade (sem filtro de sport_type)
    const activitiesRes = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=30&page=1`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    const activities = await activitiesRes.json();
    res.json(activities);
    return;
  }

  res.json({ ok: true });
}
