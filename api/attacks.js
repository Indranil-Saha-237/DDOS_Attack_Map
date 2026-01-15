import axios from 'axios';

// 1. RICH GLOBAL FALLBACK DATA (50 Realistic Records)
const FALLBACK_DATA = [
    { ip: "45.33.2.1", type: "DDoS", target: "US-West-Node", countryCode: "US" },
    { ip: "103.203.57.2", type: "Brute Force", target: "Tokyo-Hub", countryCode: "JP" },
    { ip: "185.220.101.5", type: "Malware", target: "London-DC", countryCode: "GB" },
    { ip: "117.218.201.5", type: "DDoS", target: "India-South", countryCode: "IN" },
    { ip: "190.114.253.1", type: "SQLi", target: "Brazil-Edge", countryCode: "BR" },
    { ip: "210.16.120.1", type: "Exploit", target: "Sydney-Node", countryCode: "AU" },
    { ip: "82.165.1.1", type: "Botnet", target: "Frankfurt-DC", countryCode: "DE" },
    { ip: "109.234.1.1", type: "DDoS", target: "Moscow-Hub", countryCode: "RU" },
    { ip: "202.1.1.1", type: "Scan", target: "Singapore-Edge", countryCode: "SG" },
    { ip: "1.1.1.1", type: "DDoS", target: "Cloud-DNS", countryCode: "AU" },
    { ip: "177.1.1.1", type: "Brute Force", target: "Sao-Paulo", countryCode: "BR" },
    { ip: "218.1.1.1", type: "SQLi", target: "Beijing-Hub", countryCode: "CN" },
    { ip: "41.1.1.1", type: "Exploit", target: "Cairo-Node", countryCode: "EG" },
    { ip: "197.1.1.1", type: "Malware", target: "Lagos-DC", countryCode: "NG" },
    { ip: "105.1.1.1", type: "DDoS", target: "Cape-Town", countryCode: "ZA" },
    { ip: "201.1.1.1", type: "Scan", target: "Mexico-City", countryCode: "MX" },
    { ip: "186.1.1.1", type: "Botnet", target: "Buenos-Aires", countryCode: "AR" },
    { ip: "94.1.1.1", type: "Exploit", target: "Paris-Edge", countryCode: "FR" },
    { ip: "151.1.1.1", type: "SQLi", target: "Milan-Node", countryCode: "IT" },
    { ip: "80.1.1.1", type: "DDoS", target: "Madrid-Hub", countryCode: "ES" },
    { ip: "110.1.1.1", type: "Malware", target: "Seoul-DC", countryCode: "KR" },
    { ip: "211.1.1.1", type: "Brute Force", target: "Busan-Node", countryCode: "KR" },
    { ip: "60.1.1.1", type: "Scan", target: "Bangkok-Hub", countryCode: "TH" },
    { ip: "124.1.1.1", type: "DDoS", target: "Jakarta-Edge", countryCode: "ID" },
    { ip: "203.1.1.1", type: "SQLi", target: "Manila-Node", countryCode: "PH" },
    { ip: "115.1.1.1", type: "Exploit", target: "Ho-Chi-Minh", countryCode: "VN" },
    { ip: "175.1.1.1", type: "Malware", target: "Kuala-Lumpur", countryCode: "MY" },
    { ip: "101.1.1.1", type: "DDoS", target: "Taipei-Hub", countryCode: "TW" },
    { ip: "5.1.1.1", type: "Scan", target: "Istanbul-Node", countryCode: "TR" },
    { ip: "89.1.1.1", type: "Brute Force", target: "Warsaw-DC", countryCode: "PL" },
    { ip: "77.1.1.1", type: "SQLi", target: "Kyiv-Edge", countryCode: "UA" },
    { ip: "85.1.1.1", type: "Exploit", target: "Amsterdam-Hub", countryCode: "NL" },
    { ip: "81.1.1.1", type: "Malware", target: "Brussels-DC", countryCode: "BE" },
    { ip: "91.1.1.1", type: "DDoS", target: "Stockholm-Node", countryCode: "SE" },
    { ip: "92.1.1.1", type: "Scan", target: "Oslo-Edge", countryCode: "NO" },
    { ip: "93.1.1.1", type: "SQLi", target: "Helsinki-Hub", countryCode: "FI" },
    { ip: "95.1.1.1", type: "Exploit", target: "Copenhagen-DC", countryCode: "DK" },
    { ip: "193.1.1.1", type: "Malware", target: "Vienna-Node", countryCode: "AT" },
    { ip: "194.1.1.1", type: "DDoS", target: "Zurich-Edge", countryCode: "CH" },
    { ip: "195.1.1.1", type: "Brute Force", target: "Prague-Hub", countryCode: "CZ" },
    { ip: "212.1.1.1", type: "Scan", target: "Athens-Node", countryCode: "GR" },
    { ip: "213.1.1.1", type: "SQLi", target: "Lisbon-DC", countryCode: "PT" },
    { ip: "217.1.1.1", type: "Exploit", target: "Dublin-Edge", countryCode: "IE" },
    { ip: "181.1.1.1", type: "Malware", target: "Santiago-Node", countryCode: "CL" },
    { ip: "181.2.1.1", type: "DDoS", target: "Bogota-Hub", countryCode: "CO" },
    { ip: "190.2.1.1", type: "Scan", target: "Lima-DC", countryCode: "PE" },
    { ip: "200.1.1.1", type: "SQLi", target: "Caracas-Edge", countryCode: "VE" },
    { ip: "131.1.1.1", type: "Exploit", target: "Tel-Aviv-Node", countryCode: "IL" },
    { ip: "37.1.1.1", type: "Malware", target: "Riyadh-Hub", countryCode: "SA" },
    { ip: "185.1.1.1", type: "DDoS", target: "Dubai-Edge", countryCode: "AE" }
];

const COUNTRY_COORDS = {
    "US": [37.09, -95.71], "CN": [35.86, 104.19], "RU": [61.52, 105.32],
    "DE": [51.16, 10.45], "BR": [-14.23, -51.92], "IN": [20.59, 78.96],
    "FR": [46.22, 2.21], "GB": [55.37, -3.43], "CA": [56.13, -106.34],
    "AU": [-25.27, 133.77], "JP": [36.20, 138.25], "KR": [35.90, 127.76],
    "SG": [1.35, 103.81], "EG": [26.82, 30.80], "NG": [9.08, 8.67],
    "ZA": [-30.55, 22.93], "MX": [23.63, -102.55], "AR": [-38.41, -63.61],
    "IT": [41.87, 12.56], "ES": [40.46, -3.74], "TH": [15.87, 100.99],
    "ID": [-0.78, 113.92], "PH": [12.87, 121.77], "VN": [14.05, 108.27],
    "MY": [4.21, 101.97], "TW": [23.69, 120.96], "TR": [38.96, 35.24],
    "PL": [51.91, 19.14], "UA": [48.37, 31.16], "NL": [52.13, 5.29],
    "BE": [50.50, 4.46], "SE": [60.12, 18.64], "NO": [60.47, 8.46],
    "FI": [61.92, 25.74], "DK": [56.26, 9.50], "AT": [47.51, 14.55],
    "CH": [46.81, 8.22], "CZ": [49.81, 15.47], "GR": [39.07, 21.82],
    "PT": [39.39, -8.22], "IE": [53.41, -8.24], "CL": [-35.67, -71.54],
    "CO": [4.57, -74.29], "PE": [-9.18, -75.01], "VE": [6.42, -66.58],
    "IL": [31.04, 34.85], "SA": [23.88, 45.07], "AE": [23.42, 53.84],
    "Unknown": [0, 0]
};

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    try {
        let rawData = [];
        let usedSource = "FALLBACK";

        if (process.env.ABUSEIPDB_KEY) {
            try {
                const response = await axios.get('https://api.abuseipdb.com/api/v2/blacklist', {
                    params: { limit: 15, confidenceMinimum: 90 },
                    headers: { 'Key': process.env.ABUSEIPDB_KEY, 'Accept': 'application/json' },
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
                // Fail silently
            }
        }

        if (rawData.length === 0) rawData = FALLBACK_DATA;

        const attacksWithCoords = rawData.map((attack, index) => {
            const code = attack.countryCode || "Unknown";
            const baseCoords = COUNTRY_COORDS[code] || [0, 0];

            // Random jitter so points don't stack exactly on country centers
            const jitterLat = (Math.random() - 0.5) * 4;
            const jitterLng = (Math.random() - 0.5) * 4;

            return {
                id: index,
                type: attack.type || "Threat",
                source: attack.ip,
                target: attack.target || "Server-Node",
                coords: [baseCoords[0] + jitterLat, baseCoords[1] + jitterLng],
                country: attack.countryCode
            };
        });

        res.status(200).json({ source: usedSource, data: attacksWithCoords });
    } catch (error) {
        res.status(500).json({ error: "System Error" });
    }
}