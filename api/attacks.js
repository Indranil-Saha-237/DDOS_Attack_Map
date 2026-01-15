import axios from 'axios';

const FALLBACK_DATA = [
  { ip: "8.8.8.8", type: "DDoS", target: "Global-DNS", countryCode: "US" },
  { ip: "103.203.57.2", type: "Brute Force", target: "Tokyo-Hub", countryCode: "CN" },
  { ip: "185.220.101.5", type: "Malware", target: "London-DC", countryCode: "DE" },
  { ip: "45.33.2.1", type: "Botnet", target: "US-East", countryCode: "US" },
  { ip: "117.218.201.5", type: "DDoS", target: "India-South", countryCode: "IN" },
  { ip: "190.114.253.1", type: "SQLi", target: "Brazil-Edge", countryCode: "BR" },
  { ip: "210.16.120.1", type: "Exploit", target: "Sydney-Node", countryCode: "AU" }
];

const COUNTRY_COORDS = {
  "US": [37.0902, -95.7129], 
  "CN": [35.8617, 104.1954],
  "RU": [61.5240, 105.3188],
  "DE": [51.1657, 10.4515],  
  "BR": [-14.2350, -51.925], 
  "IN": [20.5937, 78.9629],
  "Unknown": [0, 0]
};

export default async function handler(req, res) {
  // Prevent Vercel from caching the API response
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  try {
    let rawData = [];
    let usedSource = "FALLBACK";

    // Try Live API with SHORT Timeout (2.5s)
    if (process.env.ABUSEIPDB_KEY) {
      try {
        const response = await axios.get('https://api.abuseipdb.com/api/v2/blacklist', {
          params: { limit: 10, confidenceMinimum: 90 },
          headers: { 
            'Key': process.env.ABUSEIPDB_KEY, 
            'Accept': 'application/json' 
          },
          timeout: 2500
        });
        
        rawData = response.data.data.map((item) => ({
          ip: item.ipAddress,
          type: "High Risk",
          target: "Global-Net",
          countryCode: item.countryCode || "Unknown"
        }));
        usedSource = "LIVE_API";
      } catch (e) {
        // Silently fail to fallback
      }
    }

    if (rawData.length === 0) rawData = FALLBACK_DATA;

    const attacksWithCoords = rawData.map((attack, index) => {
      const code = attack.countryCode || "Unknown";
      const baseCoords = COUNTRY_COORDS[code] || [0, 0];
      
      // Randomize slightly so dots don't overlap perfectly
      const randomOffset = [
        (Math.random() - 0.5) * 5, 
        (Math.random() - 0.5) * 5
      ];

      return {
        id: index,
        type: attack.type || "Threat",
        source: attack.ip,
        target: "Server-Node",
        coords: [
          baseCoords[0] + randomOffset[0],
          baseCoords[1] + randomOffset[1]
        ],
        country: code
      };
    });

    res.status(200).json({ source: usedSource, data: attacksWithCoords });

  } catch (error) {
    res.status(500).json({ error: "System Error" });
  }
}