// WiseRoute API Proxy - Vercel Serverless Function
// Uses free OpenStreetMap services - no API key needed for geocoding/routing
// Keeps Google Places (New) for gas stations only

const GOOGLE_KEY = "AIzaSyCF5XDID4MtZ199ckkSS02HYekWtVz4uSg";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const { action } = req.query;
  const body = req.body || {};

  try {
    // ── GEOCODE via Nominatim (OpenStreetMap) - FREE, no key ──
    if (action === "geocode") {
      const q = encodeURIComponent(body.address);
      const r = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&addressdetails=1`,
        { headers: { "User-Agent": "WiseRoute/1.0 (wiseroute.app)" } }
      );
      const d = await r.json();
      if (!d || d.length === 0) return res.status(400).json({ error: "Address not found" });
      return res.json({
        lat: parseFloat(d[0].lat),
        lng: parseFloat(d[0].lon),
        formatted: d[0].display_name.split(",").slice(0,3).join(",").trim()
      });

    // ── AUTOCOMPLETE via Photon (OpenStreetMap) - FREE, no key ──
    } else if (action === "autocomplete") {
      const q = encodeURIComponent(body.input);
      const bias = body.lat ? `&lat=${body.lat}&lon=${body.lng}` : "";
      const r = await fetch(
        `https://photon.komoot.io/api/?q=${q}&limit=6&lang=en${bias}`,
        { headers: { "User-Agent": "WiseRoute/1.0" } }
      );
      const d = await r.json();
      const predictions = (d.features || []).map(f => {
        const p = f.properties;
        const main = p.name || p.city || p.street || "";
        const secondary = [p.city, p.state, p.country].filter(Boolean).join(", ");
        const description = [main, secondary].filter(Boolean).join(", ");
        return { description, main_text: main, secondary_text: secondary };
      }).filter(p => p.description);
      return res.json({ predictions });

    // ── DIRECTIONS via OSRM (OpenStreetMap) - FREE, no key ──
    } else if (action === "directions") {
      const { originLat, originLng, destLat, destLng } = body;
      const r = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${originLng},${originLat};${destLng},${destLat}?overview=full&steps=true&annotations=false`,
        { headers: { "User-Agent": "WiseRoute/1.0" } }
      );
      const d = await r.json();
      if (d.code !== "Ok" || !d.routes?.length) {
        return res.status(400).json({ error: "Route not found" });
      }
      const route = d.routes[0];
      const totalMiles = +(route.distance * 0.000621371).toFixed(1);
      const totalMins = Math.round(route.duration / 60);
      const hrs = Math.floor(totalMins / 60);
      const mins = totalMins % 60;
      const totalTime = hrs > 0 ? `${hrs}h ${mins}m` : `${mins} min`;
      const steps = [];
      (route.legs || []).forEach(leg => {
        (leg.steps || []).forEach(step => {
          if (!step.maneuver) return;
          const distMi = step.distance * 0.000621371;
          const durMin = Math.max(1, Math.round(step.duration / 60));
          const type = step.maneuver.type || "";
          const modifier = step.maneuver.modifier || "";
          let instruction = "Continue";
          if (type === "depart") instruction = `Head ${modifier || "forward"}`;
          else if (type === "turn") instruction = `Turn ${modifier} onto ${step.name || "road"}`;
          else if (type === "arrive") instruction = "Arrive at destination";
          else if (type === "merge") instruction = `Merge ${modifier}`;
          else if (type === "on ramp") instruction = `Take ramp ${modifier}`;
          else if (type === "off ramp") instruction = `Take exit ${modifier}`;
          else if (type === "fork") instruction = `Keep ${modifier}`;
          else if (type === "end of road") instruction = `Turn ${modifier}`;
          else if (type === "roundabout") instruction = `Enter roundabout`;
          else if (step.name) instruction = `Continue on ${step.name}`;
          steps.push({
            instruction,
            distance: distMi < 0.1 ? `${Math.round(distMi * 5280)} ft` : `${distMi.toFixed(1)} mi`,
            duration: `${durMin} min`
          });
        });
      });
      return res.json({ totalMiles, totalTime, steps: steps.length ? steps : [{ instruction: "Head to destination", distance: `${totalMiles} mi`, duration: totalTime }] });

    // ── REVERSE GEOCODE via Nominatim - FREE ──
    } else if (action === "reversegeocode") {
      const r = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${body.lat}&lon=${body.lng}&format=json`,
        { headers: { "User-Agent": "WiseRoute/1.0 (wiseroute.app)" } }
      );
      const d = await r.json();
      const addr = d.address || {};
      const city = addr.city || addr.town || addr.village || addr.county || "Your location";
      const state = addr.state_code || addr.state || "";
      return res.json({ city: `${city}${state ? ", " + state : ""}` });

    // ── NEARBY STATIONS via Google Places (New) ──
    } else if (action === "nearbystations") {
      const r = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_KEY,
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
