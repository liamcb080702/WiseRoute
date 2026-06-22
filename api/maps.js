export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const KEY = "AIzaSyCF5XDID4MtZ199ckkSS02HYekWtVz4uSg";
  const { action } = req.query;
  const body = req.body || {};

  try {
    if (action === "geocode") {
      const r = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(body.address)}&key=${KEY}`);
      const d = await r.json();
      if (d.status !== "OK") throw new Error("Address not found: " + d.status);
      const loc = d.results[0].geometry.location;
      return res.json({ lat: loc.lat, lng: loc.lng, formatted: d.results[0].formatted_address });

    } else if (action === "directions") {
      const r = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${body.originLat},${body.originLng}&destination=${body.destLat},${body.destLng}&key=${KEY}`);
      const d = await r.json();
      if (d.status !== "OK") throw new Error("Route not found: " + d.status);
      const leg = d.routes[0].legs[0];
      return res.json({
        totalMiles: +(leg.distance.value * 0.000621371).toFixed(1),
        totalTime: leg.duration.text,
        steps: leg.steps.map(s => ({
          instruction: s.html_instructions.replace(/<[^>]+>/g, ""),
          distance: s.distance.text,
          duration: s.duration.text,
        }))
      });

    } else if (action === "autocomplete") {
      const bias = body.lat ? `&location=${body.lat},${body.lng}&radius=50000` : "";
      const r = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(body.input)}&types=geocode|establishment${bias}&key=${KEY}`);
      const d = await r.json();
      return res.json({
        predictions: (d.predictions || []).map(p => ({
          description: p.description,
          main_text: p.structured_formatting?.main_text || p.description.split(",")[0],
          secondary_text: p.structured_formatting?.secondary_text || "",
        }))
      });

    } else if (action === "reversegeocode") {
      const r = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${body.lat},${body.lng}&key=${KEY}`);
      const d = await r.json();
      const comp = d.results?.[0]?.address_components || [];
      const city = comp.find(c => c.types.includes("locality"))?.long_name || "Your location";
      const state = comp.find(c => c.types.includes("administrative_area_level_1"))?.short_name || "";
      return res.json({ city: `${city}${state ? ", " + state : ""}` });

    } else if (action === "nearbystations") {
      const r = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": KEY,
          "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.regularOpeningHours,places.fuelOptions"
        },
        body: JSON.stringify({
          includedTypes: ["gas_station"],
          maxResultCount: 15,
          locationRestriction: {
            circle: { center: { latitude: body.lat, longitude: body.lng }, radius: 50000 }
          }
        })
      });
      const d = await r.json();
      if (d.error) throw new Error(d.error.message);
      return res.json({ places: d.places || [] });

    } else {
      return res.status(400).json({ error: "Unknown action: " + action });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
