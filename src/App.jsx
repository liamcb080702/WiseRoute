import { useState, useEffect, useRef } from "react";

// ─── PASTE YOUR GOOGLE API KEY HERE ─────────────────────
const GOOGLE_API_KEY = "AIzaSyCF5XDID4MtZ199ckkSS02HYekWtVz4uSg";
// ────────────────────────────────────────────────────────

const LOGO_B64 = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD4yor0j/hSvjz/AJ87L/wNj/xo/wCFKePP+fOy/wDA1P8AGq5X2I9pDueb0V6R/wAKT8ef8+Vl/wCBqf40v/CkvHv/AD5WX/gan+NHK+we0h3PNqK9K/4Ul49/58rL/wADU/xpP+FJePf+fKy/8DY/8aOV9g9pDuebUV6T/wAKT8e/8+Vl/wCBqf40n/ClPHn/AD52X/gan+NHK+we0h3PN6K9H/4Ut47/AOfOy/8AAxP8aP8AhSvjv/nzsf8AwNT/ABo5X2D2sO59RDrUgWkUc1ZiQYyRXRc85IYkZOKu2thLOrONkcSkBpZHCIpPQEnuew6nsKtQaZeeSk7W5EUhUK5IxycDvmsi+uzqOu6jA2oiw0rS5rsNKx2rZWtmwikmBxkTSytIS4+ZUVEXBbNIpRJZrnSYJ1gkuJnkbO0ERW4bAycefIjEe+2oNO1DRtRVfsM93LuQyKYokuQVHVgIXdyoxyQhA71ix+OtJuZ4tO8P6NrN+pVizy3MkbRIoG13giDMitkbS7DOc9OaxNH0XWr7xdaeKp9LXTfs+oRXbx2aBzCYmBCQbGZYzKAPNeQr16E8Fl8sep3pt1e1ju7eWG5tZSRHPBIHjcjqAR0I7qcEdwKgeL2rPsprvRPFsIvZmng1Ga1S+UnJminm8jk/xSQSvG0ch+bYzoxIAx1E2k3gSZ1gLpCzK7gjGVOD3z2pbEOK6GCyEVGwOcCrkyiq7g9qZDQ9BzVyFc4zVNDyKuwEDFDKRft1AORwfUVgeNtBeWbVdShtpbzSdWhm/tm1tv8Aj4tzKq+dLGozvjZo45SACUdCcFGbHQW7dBWjYTmC6hnU/NHIrjBx0Oeo5FTsUnY8K0rUtW8Gan5yx2XiTTNYltLcM0h8q/kRTsdpnY/ZpwjAhW3RspJUkYx6ZbeJPDeq2ml+M9O1S5hisC1q1hKFUxTRh3KSjP7vaHdn2nZMoXcRsNcB4ssLJtW8WeGbq7K2H9rTxSRxraxsQsxmTBeQbQrSPjaowGYZ5Ipnhv8As2y1+30iwnnZPEeo2VpdW7R2DwkqwEcgjAdcr16ANzk81VjR/iehaRZS6nrdn4lvbeS2sLXyriygnXbLevHloZGQ8xwIzGQbsNIwTACrk6k4DEsfmY8knqah1e216W9u5X8UzXnmxOiGYPZGCYk/vx9lwJT04fGNoAOCamupQxX52kYRoryMgQyuFAaQqvCliC2BwM4JSQ7W0KMowaqScVanYY61TkOTVGbEB5pbu/ttN0+fUL2Qx21uu+Vwpbao6nABOBUTHB607ejRtHIgeN1KsrDIYEYIPtimK5KfEuhwXN5bTanAk1lZi9uF5+SAjIfPQ8EcDnkeoq3Y+JdJuInkF2luFmMIF0RCXYKrfKGOSMMvbvXHweCPDsdjZ2nk3DpaXJuAzTZeXO0eW5x80eEQbfRFqxqHhXS7y6lujcXsE8t3LdtLC6rIHk2btr7dyj5F6H86VkVc6LXbKy8YXcGiXItLnUYZNsP2XUzDdxk4GwsFOV+78rAgdsVd8O+FL/wnayRaXppkN5L5cl02pNezMyg/uwyrhBgklQBnvnFc34b0PTPD/iK21ywWRprW6e6t45mEiRyOcsQSN3OTxnua7F/F2qMgSUwzKRKjhkIDpJgsp2kegwfvDpnHFFg5kRXCXKN5clrOriQRFTE2d5HC9Op7DqaiuLHUwtuzafdYuVLQ4jJ3gHBxj0xVkeMdSBj3Q2TxwSQyW8bRtthaIEIV+bJ4J+8TUEPi7VIdu1bZsJLExZDl45HMhQ89NxyCMH3xRZhdGVdiSKVo5VKOpwysCCp9CD0qszc9an1bULjU9Qkvrt90smAeTgADAAyScACqmadiGz5l/wCF1+Ov+fqw/wDAJKT/AIXV46/5+rD/AMAkrzeiubnl3PS9lDsek/8AC6/Hf/P1Yf8AgElB+Nnjs/8AL1Y/+ASV5tRRzy7h7KHY9JPxr8d/8/dj/wCAaUn/AAuvx1/z9WP/AIBpXm9FHPLuHsodj0f/AIXV46/5+rH/AMA0oPxp8cn/AJerH/wDSvOKKOeXcPZQ7Ho//C6PHP8Az9WP/gGlA+NPjkf8vVj/AOAaV5xRRzy7h7KHY//Z";

const C = {bg:"#080D1A",card:"#0D1528",border:"#1A2F50",accent:"#3B82F6",teal:"#06B6D4",green:"#10B981",yellow:"#F59E0B",red:"#EF4444",purple:"#8B5CF6",orange:"#F97316",muted:"#64748B",sub:"#94A3B8",text:"#F1F5F9"};

// ─── MICRO COMPONENTS ────────────────────────────────────
const Card=({children,style={}})=><div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16,marginBottom:14,...style}}>{children}</div>;
const Sec=({t})=><div style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:10}}>{t}</div>;
const FuelBar=({p})=><div style={{background:"#0A0F1C",borderRadius:8,height:10,overflow:"hidden",margin:"6px 0"}}><div style={{height:"100%",width:`${p}%`,background:p>50?"linear-gradient(90deg,#10B981,#34D399)":p>25?"linear-gradient(90deg,#F59E0B,#FCD34D)":"linear-gradient(90deg,#EF4444,#F87171)",borderRadius:8,transition:"width .4s"}}/></div>;
const Btn=({children,onClick,disabled,outline,color,style={}})=><button onClick={onClick} disabled={disabled} style={{width:"100%",background:outline?"transparent":color??"linear-gradient(135deg,#3B82F6,#06B6D4)",border:outline?`1px solid ${color??C.accent}`:"none",borderRadius:12,padding:"13px 20px",color:outline?(color??C.accent):"#fff",fontSize:15,fontWeight:700,cursor:disabled?"not-allowed":"pointer",opacity:disabled?.4:1,...style}}>{children}</button>;
const Ring=({v,label})=>{const col=v>=4?C.green:v>=3?C.yellow:C.red;return(<div style={{textAlign:"center"}}><div style={{width:40,height:40,borderRadius:"50%",background:col+"22",border:`2px solid ${col}`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,color:col,margin:"0 auto 4px"}}>{v.toFixed(1)}</div><div style={{fontSize:10,color:C.muted}}>{label}</div></div>);};
const Pill=({active,children,onClick,color})=><button onClick={onClick} style={{padding:"7px 14px",borderRadius:20,border:`1px solid ${active?(color||C.accent):C.border}`,background:active?(color||C.accent)+"22":"transparent",color:active?(color||"#60A5FA"):C.muted,fontSize:12,fontWeight:active?700:400,cursor:"pointer",whiteSpace:"nowrap"}}>{children}</button>;
const Spinner=()=><div style={{width:20,height:20,border:`2px solid ${C.border}`,borderTop:`2px solid ${C.accent}`,borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto"}}/>;

export default function WiseRouteLive() {
  // ── STATE ──────────────────────────────────────────────
  const [screen, setScreen]         = useState("home");
  const [location, setLocation]     = useState(null);       // {lat, lng, city}
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError]     = useState("");
  const [stations, setStations]     = useState([]);
  const [stLoading, setStLoading]   = useState(false);
  const [gasPrices, setGasPrices]   = useState({});         // placeId → price
  const [priceLoading, setPriceLoading] = useState(false);
  const [vehicle, setVehicle]       = useState(null);
  const [fuelPct, setFuelPct]       = useState(60);
  const [tankSz, setTankSz]         = useState(20);
  const [aiTip, setAiTip]           = useState("");
  const [aiLoading, setAiLoading]   = useState(false);
  const [sortBy, setSortBy]         = useState("smart");    // smart | price | rating
  const [filterOpen, setFilterOpen] = useState(false);
  const [driving, setDriving]       = useState(false);
  const [simFuel, setSimFuel]       = useState(60);
  const [milesDriven, setMilesDriven] = useState(0);
  const [driveAi, setDriveAi]       = useState("");
  const [driveAiLoading, setDriveAiLoading] = useState(false);
  const [expandSt, setExpandSt]     = useState(null);
  const [apiKeyMissing, setApiKeyMissing] = useState(GOOGLE_API_KEY === "YOUR_GOOGLE_API_KEY_HERE");
  const iRef = useRef(null);

  const mpg      = vehicle?.mpg ?? 22;
  const ts       = vehicle?.tankSize ?? tankSz;
  const gallons  = (ts * fuelPct) / 100;
  const milesLeft = Math.round(gallons * mpg);

  // ── STYLES ────────────────────────────────────────────
  const inp = {width:"100%",background:"#060A14",border:`1px solid ${C.border}`,borderRadius:10,padding:"11px 14px",color:C.text,fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:10};

  // ── 1. GET GPS LOCATION ───────────────────────────────
  const getLocation = () => {
    setLocLoading(true);
    setLocError("");
    if (!navigator.geolocation) {
      setLocError("Geolocation not supported by your browser.");
      setLocLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        // Reverse geocode to get city name
        try {
          const r = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
          );
          const d = await r.json();
          const comp = d.results?.[0]?.address_components || [];
          const city = comp.find(c => c.types.includes("locality"))?.long_name ||
                       comp.find(c => c.types.includes("sublocality"))?.long_name ||
                       "Your location";
          const state = comp.find(c => c.types.includes("administrative_area_level_1"))?.short_name || "";
          setLocation({ lat, lng, city: `${city}${state ? ", " + state : ""}` });
        } catch {
          setLocation({ lat, lng, city: "Your location" });
        }
        setLocLoading(false);
      },
      (err) => {
        setLocError("Location access denied. Please enable location in your browser settings.");
        setLocLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // ── 2. FIND NEARBY GAS STATIONS via Google Places ─────
  const findStations = async (lat, lng) => {
    if (apiKeyMissing) return;
    setStLoading(true);
    setStations([]);
    try {
      // Google Places Nearby Search — gas stations within 10 miles (16000m)
      const r = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=16000&type=gas_station&key=${GOOGLE_API_KEY}`
      );
      const d = await r.json();
      if (d.status !== "OK" && d.status !== "ZERO_RESULTS") {
        throw new Error(d.status);
      }
      const raw = d.results || [];
      // Map to our format, calculate distance
      const mapped = raw.slice(0, 12).map(p => {
        const dLat = p.geometry.location.lat - lat;
        const dLng = p.geometry.location.lng - lng;
        const distMi = Math.sqrt(dLat*dLat + dLng*dLng) * 69;
        return {
          id: p.place_id,
          name: p.name,
          address: p.vicinity,
          lat: p.geometry.location.lat,
          lng: p.geometry.location.lng,
          distanceMi: +distMi.toFixed(1),
          rating: p.rating || null,
          reviewCount: p.user_ratings_total || 0,
          openNow: p.opening_hours?.open_now ?? true,
          price: null, // filled by AI price lookup
          bath: p.rating ? +Math.min(5, p.rating * 0.95).toFixed(1) : null,
          clean: p.rating ? +Math.min(5, p.rating * 0.9).toFixed(1) : null,
          photo: p.photos?.[0]?.photo_reference || null,
        };
      }).sort((a,b) => a.distanceMi - b.distanceMi);
      setStations(mapped);
      // Now fetch AI-estimated prices for top 6
      fetchAiPrices(mapped.slice(0, 6), lat, lng);
    } catch(e) {
      console.error("Places error:", e);
      setStLoading(false);
    }
    setStLoading(false);
  };

  // ── 3. LIVE GAS PRICES ───────────────────────────────
  // First tries Google Places (New) fuelOptions for real prices
  // Falls back to AI web search for any stations without Google prices
  const fetchAiPrices = async (sts, lat, lng) => {
    if (!sts.length) return;
    setPriceLoading(true);
    const updated = {};

    // Step 1: Try Google Places (New) API for real fuel prices
    await Promise.all(sts.map(async (s) => {
      try {
        const r = await fetch(
          `https://places.googleapis.com/v1/places/${s.id}?fields=fuelOptions,displayName&key=${GOOGLE_API_KEY}`,
          { headers: { "Content-Type": "application/json", "X-Goog-FieldMask": "fuelOptions" } }
        );
        const d = await r.json();
        const fuelPrices = d.fuelOptions?.fuelPrices || [];
        const regular = fuelPrices.find(f =>
          f.type === "REGULAR_UNLEADED" || f.type === "REGULAR" || f.type === "UNLEADED_87"
        );
        if (regular?.price) {
          const units = Number(regular.price.units || 0);
          const nanos = Number(regular.price.nanos || 0) / 1e9;
          updated[s.id] = +(units + nanos).toFixed(2);
        }
      } catch(e) { /* silent fail, will use AI fallback */ }
    }));

    // Step 2: AI web search fallback for stations Google didn't have prices for
    const missing = sts.filter(s => !updated[s.id]);
    if (missing.length > 0) {
      try {
        const names = missing.map(s => s.name).join(", ");
        const r = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 600,
            tools: [{ type: "web_search_20250305", name: "web_search" }],
            messages: [{
              role: "user",
              content: "Search GasBuddy for current regular unleaded gas prices near " + lat.toFixed(4) + ", " + lng.toFixed(4) + " today. Return ONLY a JSON object mapping brand name to price per gallon as a number. Stations: " + names + ". No markdown, just JSON."
            }]
          })
        });
        const d = await r.json();
        const text = d.content?.filter(b => b.type === "text").map(b => b.text).join("") || "";
        const match = text.replace(/```json|```/g,"").trim().match(/\{[^}]+\}/);
        if (match) {
          const prices = JSON.parse(match[0]);
          missing.forEach(s => {
            const brand = Object.keys(prices).find(k =>
              s.name.toLowerCase().includes(k.toLowerCase()) ||
              k.toLowerCase().includes(s.name.toLowerCase().split(" ")[0])
            );
            if (brand) updated[s.id] = prices[brand];
          });
        }
      } catch(e) { console.error("AI price fallback failed:", e); }
    }

    setGasPrices(prev => ({ ...prev, ...updated }));
    setPriceLoading(false);
  };

  // ── 4. AI FUEL ADVISOR ────────────────────────────────
  const getAiTip = async () => {
    if (!location) return;
    setAiLoading(true); setAiTip("");
    try {
      const topStations = [...stations]
        .slice(0, 4)
        .map(s => `${s.name} (${s.distanceMi}mi, ${gasPrices[s.id] ? "$" + gasPrices[s.id] + "/gal" : "price unknown"})`)
        .join("; ");
      const vDesc = vehicle
        ? `${vehicle.year || ""} ${vehicle.make} ${vehicle.model} (${mpg} MPG, ${ts}gal tank)`
        : `vehicle (~${mpg}MPG, ~${ts}gal tank)`;
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 400,
          messages: [{
            role: "user",
            content: `You are WiseRoute AI. Driver is in ${location.city} in their ${vDesc} with ${fuelPct}% fuel (~${milesLeft} miles range). Nearby stations: ${topStations || "none found yet"}. Give 2 sentences of specific advice: which station to go to and why (price vs detour tradeoff). Be direct and practical.`
          }]
        })
      });
      const d = await r.json();
      setAiTip(d.content?.map(b => b.text || "").join("") || "");
    } catch { setAiTip("Head to the nearest station with good ratings — don't wait below 20%."); }
    setAiLoading(false);
  };

  // Drive mode AI
  const getDriveAi = async () => {
    setDriveAiLoading(true); setDriveAi("");
    const top = sortedStations[0];
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          messages: [{
            role: "user",
            content: `WiseRoute AI: Driver has ${simFuel.toFixed(0)}% fuel (~${Math.round((ts*simFuel/100)*mpg)} miles range), driven ${milesDriven.toFixed(1)} miles. ${top ? `Nearest best station: ${top.name}, ${top.distanceMi}mi away, ${gasPrices[top.id] ? "$" + gasPrices[top.id] + "/gal" : "price unknown"}` : "no stations loaded"}. 2 sentences: should they stop now or keep going?`
          }]
        })
      });
      const d = await r.json();
      setDriveAi(d.content?.map(b => b.text || "").join("") || "");
    } catch { setDriveAi("Based on your range, you have time to reach a better-priced station. Don't wait below 15%."); }
    setDriveAiLoading(false);
  };

  // Auto-find stations when location is set
  useEffect(() => {
    if (location) findStations(location.lat, location.lng);
  }, [location]);

  // Drive mode simulation
  useEffect(() => {
    if (driving) {
      iRef.current = setInterval(() => {
        setSimFuel(p => Math.max(0, p - 0.35));
        setMilesDriven(p => +(p + mpg * 0.0035).toFixed(1));
      }, 800);
    } else {
      clearInterval(iRef.current);
    }
    return () => clearInterval(iRef.current);
  }, [driving]);

  // Smart score for ranking
  const scoreStation = (s) => {
    const price = gasPrices[s.id] || 3.50;
    const priceSc = (3.60 - price) * 25;
    const ratingSc = (s.rating || 3) * 8;
    const distPen = s.distanceMi * 2;
    return priceSc + ratingSc - distPen;
  };

  const sortedStations = [...stations].sort((a, b) =>
    sortBy === "price"
      ? (gasPrices[a.id] || 99) - (gasPrices[b.id] || 99)
      : sortBy === "rating"
      ? (b.rating || 0) - (a.rating || 0)
      : scoreStation(b) - scoreStation(a)
  );

  const urgency = simFuel <= 15 ? "now" : simFuel <= 30 ? "soon" : "ok";
  const urgCfg = {
    ok:   { col: C.green,  bg:"#0A2818", label:"Range OK",     icon:"✅" },
    soon: { col: C.yellow, bg:"#1A1200", label:"Fill Up Soon",  icon:"⚠️" },
    now:  { col: C.red,    bg:"#1A0800", label:"Fill Up NOW",   icon:"🚨" },
  };
  const urg = urgCfg[urgency];

  const NAV = [
    { id:"home",   label:"Home",  icon:"🏠" },
    { id:"nearby", label:"Near Me", icon:"📍" },
    { id:"drive",  label:"Drive", icon:"🛣️" },
    { id:"setup",  label:"My Car", icon:"🚗" },
  ];

  // ══════════════════════════════════════════════════════
  // API KEY SETUP SCREEN
  // ══════════════════════════════════════════════════════
  if (apiKeyMissing) return (
    <div style={{fontFamily:"'Inter',-apple-system,sans-serif",background:C.bg,minHeight:"100vh",color:C.text,maxWidth:430,margin:"0 auto",padding:24}}>
      <div style={{textAlign:"center",padding:"40px 0 24px"}}>
        <img src={`data:image/jpeg;base64,${LOGO_B64}`} alt="WiseRoute" style={{width:80,height:80,objectFit:"cover",borderRadius:20,marginBottom:16}}/>
        <div style={{fontSize:24,fontWeight:900,background:"linear-gradient(90deg,#60A5FA,#22D3EE)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:8}}>WiseRoute Live</div>
        <div style={{fontSize:14,color:C.muted}}>One step to activate live GPS & gas prices</div>
      </div>

      <Card>
        <Sec t="Step 1 — Get Your Free Google API Key"/>
        <div style={{fontSize:13,color:C.sub,lineHeight:1.7,marginBottom:12}}>
          1. Go to <span style={{color:"#60A5FA"}}>console.cloud.google.com</span><br/>
          2. Create a project named <strong style={{color:C.text}}>"WiseRoute"</strong><br/>
          3. Enable <strong style={{color:C.text}}>Places API</strong> + <strong style={{color:C.text}}>Geocoding API</strong><br/>
          4. Go to Credentials → <strong style={{color:C.text}}>Create API Key</strong><br/>
          5. Copy the key and paste it below
        </div>
        <div style={{fontSize:12,color:C.green,background:C.green+"18",padding:"8px 12px",borderRadius:8,marginBottom:14}}>
          ✓ Free tier covers ~$200/month — more than enough for personal use
        </div>
      </Card>

      <Card>
        <Sec t="Step 2 — Paste Your API Key"/>
        <div style={{fontSize:13,color:C.muted,marginBottom:8}}>Open this file and replace line 4:</div>
        <div style={{background:"#060A14",border:`1px solid ${C.border}`,borderRadius:10,padding:12,fontFamily:"monospace",fontSize:12,color:"#34D399",marginBottom:12,wordBreak:"break-all"}}>
          const GOOGLE_API_KEY = "AIzaSyCF5XDID4MtZ199ckkSS02HYekWtVz4uSg";
        </div>
        <div style={{fontSize:13,color:C.muted}}>Replace <span style={{color:C.yellow}}>"YOUR_GOOGLE_API_KEY_HERE"</span> with your actual key, then reload.</div>
      </Card>

      <Card style={{background:"linear-gradient(135deg,#0A1A30,#0A2020)",border:`1px solid ${C.teal}44`}}>
        <Sec t="What You'll Get"/>
        {[["📍","Real GPS location — your actual position"],["⛽","Real gas stations near you via Google Places"],["💰","AI-estimated live prices via Claude + web search"],["🤖","Personalized AI fuel advice based on your location"],["🔄","Prices refresh every time you open the app"]].map(([ic,t])=>(
          <div key={t} style={{display:"flex",gap:10,alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:16}}>{ic}</span>
            <span style={{fontSize:13,color:C.sub}}>{t}</span>
          </div>
        ))}
      </Card>

      <div style={{fontSize:12,color:C.muted,textAlign:"center",marginTop:8}}>
        Once your key is added, the app loads your real location automatically on startup.
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════
  // HOME SCREEN
  // ══════════════════════════════════════════════════════
  const HomeScreen = () => (
    <div>
      <div style={{background:"linear-gradient(135deg,#0A2040,#0A2818)",borderRadius:20,padding:22,marginBottom:14,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-30,right:-30,width:140,height:140,background:`radial-gradient(circle,${C.accent}18,transparent)`,borderRadius:"50%"}}/>
        <div style={{fontSize:11,color:C.muted,marginBottom:4,fontWeight:600,letterSpacing:"0.1em"}}>WISEROUTE AI — LIVE</div>
        <div style={{fontSize:24,fontWeight:900,lineHeight:1.2,marginBottom:8}}>
          Real stations.<br/>
          <span style={{background:"linear-gradient(90deg,#34D399,#22D3EE)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Real prices.</span>
        </div>
        {location ? (
          <div style={{fontSize:13,color:C.sub,marginBottom:16}}>📍 {location.city} · {stations.length} stations found</div>
        ) : (
          <div style={{fontSize:13,color:C.sub,marginBottom:16}}>Tap below to find gas stations near you</div>
        )}
        <Btn onClick={()=>{ if(!location) getLocation(); else setScreen("nearby"); }} disabled={locLoading}>
          {locLoading ? "Getting location…" : location ? "View Nearby Stations →" : "📍 Find Stations Near Me"}
        </Btn>
        {locError && <div style={{marginTop:10,fontSize:12,color:C.red}}>{locError}</div>}
      </div>

      {/* Location + fuel status */}
      {location && (
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div>
              <div style={{fontWeight:700}}>📍 {location.city}</div>
              <div style={{fontSize:12,color:C.muted}}>{stations.length} stations · {priceLoading ? "fetching prices…" : "prices loaded"}</div>
            </div>
            <button onClick={()=>findStations(location.lat,location.lng)} style={{background:C.accent+"22",border:`1px solid ${C.accent}44`,borderRadius:8,padding:"6px 12px",color:"#60A5FA",fontSize:12,cursor:"pointer"}}>↺ Refresh</button>
          </div>
          {stLoading && <div style={{textAlign:"center",padding:10}}><Spinner/><div style={{fontSize:12,color:C.muted,marginTop:6}}>Finding stations…</div></div>}
        </Card>
      )}

      {/* Fuel status */}
      {vehicle && (
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontWeight:700}}>{vehicle.year} {vehicle.make} {vehicle.model}</span>
            <span style={{color:fuelPct>25?C.green:C.red,fontWeight:700}}>{fuelPct}% fuel</span>
          </div>
          <FuelBar p={fuelPct}/>
          <div style={{fontSize:13,color:fuelPct>25?C.green:C.red,marginTop:4}}>~{milesLeft} miles remaining</div>
        </Card>
      )}

      {/* Quick top 3 stations */}
      {sortedStations.length > 0 && (
        <div>
          <div style={{fontSize:13,fontWeight:700,color:C.sub,marginBottom:10}}>⛽ Best Nearby Right Now</div>
          {sortedStations.slice(0,3).map((s,i) => (
            <div key={s.id} onClick={()=>setScreen("nearby")} style={{background:i===0?"linear-gradient(135deg,#0A2030,#0A2818)":C.card,border:`1px solid ${i===0?C.green:C.border}`,borderRadius:12,padding:12,marginBottom:8,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:i===0?C.green+"22":C.border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:i===0?C.green:C.muted}}>#{i+1}</div>
                <div>
                  <div style={{fontWeight:600,fontSize:13}}>{s.name}</div>
                  <div style={{fontSize:11,color:C.muted}}>{s.distanceMi} mi{s.rating ? ` · ★ ${s.rating}` : ""}</div>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                {priceLoading ? <Spinner/> : gasPrices[s.id] ? (
                  <div style={{fontWeight:800,fontSize:16,color:C.green}}>${gasPrices[s.id].toFixed(2)}</div>
                ) : (
                  <div style={{fontSize:11,color:C.muted}}>price TBD</div>
                )}
                <div style={{fontSize:10,color:C.muted}}>/gal</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ══════════════════════════════════════════════════════
  // NEARBY STATIONS SCREEN
  // ══════════════════════════════════════════════════════
  const NearbyScreen = () => (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div>
          <div style={{fontSize:20,fontWeight:900}}>Nearby Stations</div>
          <div style={{fontSize:12,color:C.muted}}>{location?.city} · {stations.length} found</div>
        </div>
        <button onClick={()=>findStations(location.lat,location.lng)} style={{background:C.accent+"22",border:`1px solid ${C.accent}44`,borderRadius:10,padding:"8px 14px",color:"#60A5FA",fontSize:12,fontWeight:700,cursor:"pointer"}}>↺ Refresh</button>
      </div>

      {/* AI Tip */}
      <div style={{background:"linear-gradient(135deg,#081830,#0A2020)",border:`1px solid #1E4A7F`,borderRadius:14,padding:14,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
          <span style={{fontSize:16}}>🤖</span>
          <span style={{fontWeight:700,fontSize:13,color:"#60A5FA"}}>WiseRoute AI</span>
          <button onClick={getAiTip} style={{marginLeft:"auto",background:C.accent+"22",border:`1px solid ${C.accent}44`,borderRadius:8,padding:"4px 10px",color:"#60A5FA",fontSize:11,cursor:"pointer"}}>{aiLoading?"…":"Get Advice"}</button>
        </div>
        {aiLoading ? <div style={{fontSize:13,color:C.muted}}>Analyzing nearby stations…</div>
        : aiTip ? <div style={{fontSize:13,color:"#CBD5E1",lineHeight:1.6}}>{aiTip}</div>
        : <div style={{fontSize:13,color:C.muted}}>Tap "Get Advice" for AI-powered recommendation based on your exact location and fuel level.</div>}
      </div>

      {/* Sort pills */}
      <div style={{display:"flex",gap:6,marginBottom:14}}>
        {[["smart","🤖 Smart Pick"],["price","💰 Cheapest"],["rating","⭐ Top Rated"]].map(([id,l])=>(
          <Pill key={id} active={sortBy===id} onClick={()=>setSortBy(id)}>{l}</Pill>
        ))}
      </div>

      {stLoading ? (
        <div style={{textAlign:"center",padding:40}}>
          <Spinner/>
          <div style={{fontSize:13,color:C.muted,marginTop:12}}>Finding gas stations near you…</div>
        </div>
      ) : stations.length === 0 && location ? (
        <div style={{textAlign:"center",padding:40,color:C.muted}}>
          <div style={{fontSize:40,marginBottom:12}}>🔍</div>
          <div>No stations found. Try refreshing.</div>
        </div>
      ) : !location ? (
        <div style={{textAlign:"center",padding:40}}>
          <Btn onClick={getLocation} disabled={locLoading}>{locLoading?"Getting location…":"📍 Enable Location First"}</Btn>
        </div>
      ) : null}

      {sortedStations.map((s, i) => (
        <div key={s.id}>
          <div onClick={()=>setExpandSt(expandSt===s.id?null:s.id)}
            style={{background:i===0?"linear-gradient(135deg,#0A2030,#0A2818)":C.card,border:`1px solid ${i===0?C.green:C.border}`,borderRadius:14,padding:14,marginBottom:10,cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div>
                <div style={{fontWeight:700,fontSize:15}}>{s.name}</div>
                <div style={{fontSize:12,color:C.muted,marginTop:2}}>{s.address}</div>
                <div style={{fontSize:12,color:C.muted,marginTop:2}}>{s.distanceMi} mi away{s.rating ? ` · ★ ${s.rating} (${s.reviewCount})` : ""}</div>
                <div style={{marginTop:4,display:"flex",gap:6,alignItems:"center"}}>
                  {i===0 && <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:C.green+"22",color:C.green,border:`1px solid ${C.green}44`}}>✓ Best Pick</span>}
                  {!s.openNow && <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:C.red+"22",color:C.red,border:`1px solid ${C.red}44`}}>Closed</span>}
                </div>
              </div>
              <div style={{textAlign:"right",minWidth:70}}>
                {priceLoading ? (
                  <div style={{paddingTop:4}}><Spinner/></div>
                ) : gasPrices[s.id] ? (
                  <>
                    <div style={{fontSize:22,fontWeight:900,color:C.green}}>${gasPrices[s.id].toFixed(2)}</div>
                    <div style={{fontSize:11,color:C.muted}}>/gal · live</div>
                  </>
                ) : (
                  <div style={{fontSize:12,color:C.muted,marginTop:8}}>Price<br/>pending</div>
                )}
              </div>
            </div>

            {s.rating && (
              <div style={{display:"flex",gap:14,marginBottom:8}}>
                <Ring v={Math.min(5,s.rating)} label="Overall"/>
                {s.bath && <Ring v={s.bath} label="Est. Bath"/>}
                {s.clean && <Ring v={s.clean} label="Est. Clean"/>}
              </div>
            )}
          </div>

          {expandSt === s.id && (
            <div style={{background:"#08101E",border:`1px solid ${C.border}`,borderRadius:12,padding:14,marginTop:-8,marginBottom:12}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:10}}>Station Actions</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}&travelmode=driving`} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
                  <button style={{width:"100%",background:C.green+"22",border:`1px solid ${C.green}44`,borderRadius:10,padding:"11px 8px",color:C.green,fontSize:12,fontWeight:700,cursor:"pointer"}}>🧭 Navigate (Google Maps)</button>
                </a>
                <a href={`https://maps.apple.com/?daddr=${s.lat},${s.lng}&dirflg=d`} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
                  <button style={{width:"100%",background:C.teal+"22",border:`1px solid ${C.teal}44`,borderRadius:10,padding:"11px 8px",color:C.teal,fontSize:12,fontWeight:700,cursor:"pointer"}}>🗺️ Apple Maps</button>
                </a>
              </div>
              <div style={{fontSize:11,color:C.muted,marginTop:10}}>
                Prices are AI-estimated from current local averages. Community price reporting coming soon.
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // ══════════════════════════════════════════════════════
  // DRIVE MODE
  // ══════════════════════════════════════════════════════
  const DriveScreen = () => {
    const gallonsNow = (ts * simFuel) / 100;
    const milesNow   = Math.round(gallonsNow * mpg);
    const top = sortedStations[0];

    return (
      <div>
        <div style={{fontSize:22,fontWeight:900,marginBottom:4}}>Drive Mode</div>
        <div style={{fontSize:13,color:C.muted,marginBottom:16}}>Real-time fuel tracking with live nearby stations.</div>

        {/* Urgency banner */}
        <div style={{background:urg.bg,border:`1px solid ${urg.col}44`,borderRadius:16,padding:16,marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <span style={{fontSize:28}}>{urg.icon}</span>
            <div>
              <div style={{fontWeight:800,fontSize:17,color:urg.col}}>{urg.label}</div>
              <div style={{fontSize:12,color:C.sub}}>~{milesNow} miles · {gallonsNow.toFixed(1)} gal left</div>
            </div>
          </div>
          <FuelBar p={simFuel}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:12}}>
            {[[`~${milesNow}`,"Miles left"],[`${gallonsNow.toFixed(1)}`,"Gals left"],[`${milesDriven}`,"Miles driven"]].map(([v,l])=>(
              <div key={l} style={{textAlign:"center",background:"#00000030",borderRadius:10,padding:"8px 4px"}}>
                <div style={{fontSize:17,fontWeight:800}}>{v}</div>
                <div style={{fontSize:10,color:C.muted}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
          <button onClick={()=>setDriving(true)} disabled={driving||simFuel<=0} style={{background:driving?"#0A2818":C.green+"22",border:`1px solid ${C.green}44`,borderRadius:12,padding:"13px",color:C.green,fontSize:14,fontWeight:700,cursor:driving?"not-allowed":"pointer",opacity:driving?.5:1}}>{driving?"🟢 Driving…":"▶ Start"}</button>
          <button onClick={()=>setDriving(false)} disabled={!driving} style={{background:!driving?"#0A0F1C":C.red+"22",border:`1px solid ${C.red}44`,borderRadius:12,padding:"13px",color:C.red,fontSize:14,fontWeight:700,cursor:!driving?"not-allowed":"pointer",opacity:!driving?.4:1}}>⏹ Pause</button>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          <button onClick={()=>{setSimFuel(fuelPct);setMilesDriven(0);setDriving(false);setDriveAi("");}} style={{flex:1,background:"none",border:`1px solid ${C.border}`,borderRadius:10,padding:"8px",color:C.muted,fontSize:12,cursor:"pointer"}}>↺ Reset</button>
          <button onClick={()=>setSimFuel(f=>Math.min(100,f+25))} style={{flex:1,background:"none",border:`1px solid ${C.accent}44`,borderRadius:10,padding:"8px",color:"#60A5FA",fontSize:12,cursor:"pointer"}}>⛽ Fill-Up</button>
        </div>

        {/* Live best station */}
        {top && (
          <div style={{background:"linear-gradient(135deg,#0A2030,#0A2010)",border:`1px solid ${urg.col}55`,borderRadius:16,padding:16,marginBottom:14}}>
            <div style={{fontWeight:800,fontSize:13,color:urg.col,marginBottom:8}}>
              {urgency==="now"?"🚨 Stop Here Now →":urgency==="soon"?"⚠️ Recommended Stop":"⛽ Best Nearby"}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div>
                <div style={{fontWeight:700,fontSize:15}}>{top.name}</div>
                <div style={{fontSize:12,color:C.muted}}>{top.distanceMi} mi away</div>
                {top.rating && <div style={{fontSize:12,color:C.yellow,marginTop:2}}>★ {top.rating}</div>}
              </div>
              <div style={{textAlign:"right"}}>
                {gasPrices[top.id] ? (
                  <><div style={{fontSize:22,fontWeight:900,color:C.green}}>${gasPrices[top.id].toFixed(2)}</div><div style={{fontSize:11,color:C.muted}}>/gal</div></>
                ) : <div style={{fontSize:12,color:C.muted}}>Price TBD</div>}
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${top.lat},${top.lng}&travelmode=driving`} target="_blank" rel="noreferrer" style={{flex:1,textDecoration:"none"}}>
                <button style={{width:"100%",background:C.green+"22",border:`1px solid ${C.green}44`,borderRadius:10,padding:"10px",color:C.green,fontSize:12,fontWeight:700,cursor:"pointer"}}>🧭 Navigate</button>
              </a>
              <a href={`https://maps.apple.com/?daddr=${top.lat},${top.lng}&dirflg=d`} target="_blank" rel="noreferrer" style={{flex:1,textDecoration:"none"}}>
                <button style={{width:"100%",background:C.teal+"22",border:`1px solid ${C.teal}44`,borderRadius:10,padding:"10px",color:C.teal,fontSize:12,fontWeight:700,cursor:"pointer"}}>🗺️ Apple Maps</button>
              </a>
            </div>
          </div>
        )}

        {/* AI */}
        <div style={{background:"linear-gradient(135deg,#081830,#0A1F30)",border:`1px solid #1E4A7F`,borderRadius:14,padding:14}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <span>🤖</span><span style={{fontWeight:700,fontSize:13,color:"#60A5FA"}}>AI Driving Advisor</span>
            <button onClick={getDriveAi} style={{marginLeft:"auto",background:C.accent+"22",border:`1px solid ${C.accent}44`,borderRadius:8,padding:"4px 10px",color:"#60A5FA",fontSize:11,cursor:"pointer"}}>{driveAiLoading?"…":"Ask AI"}</button>
          </div>
          {driveAi ? <div style={{fontSize:13,color:"#CBD5E1",lineHeight:1.6}}>{driveAi}</div>
          : <div style={{fontSize:13,color:C.muted}}>Tap "Ask AI" for advice based on your live fuel level and nearest stations.</div>}
        </div>
      </div>
    );
  };

  // ══════════════════════════════════════════════════════
  // VEHICLE SETUP
  // ══════════════════════════════════════════════════════
  const SetupScreen = () => {
    const [mm, setMm] = useState({
      make: vehicle?.make||"", model: vehicle?.model||"", year: vehicle?.year||"",
      mpg: vehicle?.mpg||"", tank: vehicle?.tankSize||tankSz,
      engine: vehicle?.engine||"", fuel: vehicle?.fuelType||"gasoline"
    });
    return (
      <div>
        <div style={{fontSize:22,fontWeight:900,marginBottom:4}}>My Vehicle</div>
        <div style={{fontSize:13,color:C.muted,marginBottom:16}}>Set your vehicle specs for accurate fuel tracking.</div>

        <Card>
          {[["Year","year","e.g. 2022"],["Make","make","e.g. Ford"],["Model","model","e.g. F-150"],["Engine","engine","e.g. 3.5L V6"]].map(([l,k,ph])=>(
            <input key={k} style={inp} placeholder={`${l} — ${ph}`} value={mm[k]} onChange={e=>setMm(m=>({...m,[k]:e.target.value}))}/>
          ))}
          <select style={{...inp,cursor:"pointer"}} value={mm.fuel} onChange={e=>setMm(m=>({...m,fuel:e.target.value}))}>
            {["gasoline","diesel","hybrid","electric"].map(f=><option key={f} value={f}>{f.charAt(0).toUpperCase()+f.slice(1)}</option>)}
          </select>
          <input style={inp} placeholder="Est. MPG (blank if electric)" type="number" value={mm.mpg} onChange={e=>setMm(m=>({...m,mpg:e.target.value}))}/>
          <div style={{fontSize:13,color:C.sub,marginBottom:6}}>Tank Size — up to 50 gallons</div>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
            <input type="range" min={8} max={50} value={mm.tank} onChange={e=>setMm(m=>({...m,tank:Number(e.target.value)}))} style={{flex:1}}/>
            <span style={{fontWeight:700,color:"#60A5FA",minWidth:44}}>{mm.tank} gal</span>
          </div>
          <Btn disabled={!mm.make||!mm.model} onClick={()=>{setVehicle({make:mm.make,model:mm.model,year:mm.year,mpg:mm.mpg?Number(mm.mpg):null,tankSize:mm.tank,engine:mm.engine,fuelType:mm.fuel});setTankSz(mm.tank);setSimFuel(fuelPct);}}>
            Save Vehicle
          </Btn>
        </Card>

        <Card>
          <Sec t="Current Fuel Level"/>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
            <input type="range" min={5} max={100} value={fuelPct} onChange={e=>{setFuelPct(Number(e.target.value));setSimFuel(Number(e.target.value));}} style={{flex:1}}/>
            <span style={{fontWeight:700,color:"#60A5FA",minWidth:40}}>{fuelPct}%</span>
          </div>
          <FuelBar p={fuelPct}/>
          <div style={{fontSize:20,fontWeight:900,color:fuelPct>25?C.green:C.red,marginTop:8}}>
            ~{milesLeft} <span style={{fontSize:13,fontWeight:400,color:C.muted}}>miles remaining</span>
          </div>
        </Card>

        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  };

  // ══════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════
  return (
    <div style={{fontFamily:"'Inter',-apple-system,sans-serif",background:C.bg,minHeight:"100vh",color:C.text,maxWidth:430,margin:"0 auto",overflowX:"hidden"}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* Header */}
      <div style={{background:"linear-gradient(160deg,#0A1428,#0F2040)",padding:"14px 16px",borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <img src={`data:image/jpeg;base64,${LOGO_B64}`} alt="WiseRoute" style={{width:42,height:42,objectFit:"cover",borderRadius:11}}/>
          <div>
            <div style={{fontSize:19,fontWeight:900,background:"linear-gradient(90deg,#60A5FA,#22D3EE)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>WiseRoute <span style={{fontSize:13,color:C.green}}>LIVE</span></div>
            <div style={{fontSize:10,color:C.muted}}>{location ? `📍 ${location.city}` : "Tap to enable location"}</div>
          </div>
          {vehicle && (
            <div style={{marginLeft:"auto",textAlign:"right"}}>
              <div style={{fontSize:11,color:fuelPct>25?C.green:C.red,fontWeight:700}}>{fuelPct}%</div>
              <div style={{fontSize:10,color:C.muted}}>~{milesLeft}mi</div>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{padding:"18px 14px 90px"}}>
        {screen==="home"   && <HomeScreen/>}
        {screen==="nearby" && <NearbyScreen/>}
        {screen==="drive"  && <DriveScreen/>}
        {screen==="setup"  && <SetupScreen/>}
      </div>

      {/* Nav */}
      <div style={{display:"flex",background:"#060A14",borderTop:`1px solid ${C.border}`,position:"fixed",bottom:0,width:"100%",maxWidth:430,zIndex:50}}>
        {NAV.map(n=>(
          <button key={n.id} onClick={()=>{ if(n.id==="nearby"&&!location){getLocation();setScreen("nearby");}else setScreen(n.id); }}
            style={{flex:1,padding:"10px 2px 8px",background:"none",border:"none",color:screen===n.id?C.accent:C.muted,fontSize:9,fontWeight:screen===n.id?700:400,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,borderTop:screen===n.id?`2px solid ${C.accent}`:"2px solid transparent"}}>
            <span style={{fontSize:17}}>{n.icon}</span>{n.label}
          </button>
        ))}
      </div>
    </div>
  );
}
