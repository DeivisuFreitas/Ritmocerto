const { google } = require("googleapis");					
					
export default async function handler(req, res) {					
res.setHeader("Access-Control-Allow-Origin", "*");					
res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");					
res.setHeader("Access-Control-Allow-Headers", "Content-Type");					
if (req.method === "OPTIONS") { res.status(200).end(); return; }					
					
try {					
const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);					
const auth = new google.auth.GoogleAuth({					
credentials: key,					
scopes: ["https://www.googleapis.com/auth/spreadsheets"],					
});					
const sheets = google.sheets({ version: "v4", auth });					
const SHEET_ID = process.env.GOOGLE_SHEETS_ID;					
					
if (req.method === "POST") {					
const { aba, rows } = req.body;					
await sheets.spreadsheets.values.append({					
spreadsheetId: SHEET_ID,					
range: `${aba}!A1`,					
valueInputOption: "USER_ENTERED",					
insertDataOption: "INSERT_ROWS",					
requestBody: { values: rows },					
});					
res.status(200).json({ ok: true });					
return;					
}					
					
if (req.method === "GET") {					
const { aba } = req.query;					
const response = await sheets.spreadsheets.values.get({					
spreadsheetId: SHEET_ID,					
range: `${aba}!A1:Z1000`,					
});					
res.status(200).json({ values: response.data.values || [] });					
return;					
}					
					
res.status(200).json({ ok: true });					
} catch (e) {					
res.status(500).json({ error: e.message });					
}					
}					
					
					
