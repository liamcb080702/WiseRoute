// Vercel serverless function — proxies Google Maps API calls server-side
// This solves the CORS issue since the call is made from Node, not the browser

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "AIzaSyCF5XDID4MtZ199ckkSS02HYekWtVz4uSg";
  const { action } = req.query;

  try {
    if (action === "geocode") {
      const { address } = req.body;
      const r = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`);
      const d = await r.json();
      if (d.status !== "OK") { res.status(400).json({ error: "Address not found" }); return; }
      const loc = d.results[0].geometry.location;
      res.json({ lat: loc.lat, lng: loc.lng, formatted: d.results[0].formatted_address });

    } else if (action === "directions") {
      const { originLat, originLng, destLat, destLng } = req.body;
      const r = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLng}&destination=${destLat},${destLng}&key=${GOOGLE_API_KEY}`);
      const d = await r.json();
      if (d.status !== "OK") { res.status(400).json({ error: "Route not found: " + d.status }); return; }
      const leg = d.routes[0].legs[0];
      const steps = leg.steps.map(s => ({
        instruction: s.html_instructions.replace(/<[^>]+>/g, ""),
        distance: s.distance.text,
        duration: s.duration.text,
      }));
      res.json({
        totalMiles: +(leg.distance.value * 0.000621371).toFixed(1),
        totalTime: leg.duration.text,
        steps,
      });

    } else if (action === "autocomplete") {
      const { input, lat, lng } = req.body;
      const bias = lat ? `&location=${lat},${lng}&radius=50000` : "";
      const r = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=geocode|establishment${bias}&key=${GOOGLE_API_KEY}`);
      const d = await r.json();
      const predictions = (d.predictions || []).map(p => ({
        description: p.description,
        main_text: p.structured_formatting?.main_text || p.description.split(",")[0],
        secondary_text: p.structured_formatting?.secondary_text || "",
      }));
      res.json({ predictions });

    } else if (action === "reversegeocode") {
      const { lat, lng } = req.body;
      const r = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`);
      const d = await r.json();
      const comp = d.results?.[0]?.address_components || [];
      const city = comp.find(c => c.types.includes("locality"))?.long_name || "Your location";
      const state = comp.find(c => c.types.includes("administrative_area_level_1"))?.short_name || "";
      res.json({ city: `${city}${state ? ", " + state : ""}` });

    } else {
      res.status(400).json({ error: "Unknown action" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
