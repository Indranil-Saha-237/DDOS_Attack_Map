# 🌐 Live 3D DDoS Attack Map

A high-performance, interactive cyber-warfare visualization tool built with **React**, **Three.js**, and **Serverless Functions**.

![Project Status](https://img.shields.io/badge/Status-Live-green)
![Tech](https://img.shields.io/badge/Tech-React%20%7C%20Three.js%20%7C%20Vercel-blue)
![License](https://img.shields.io/badge/License-MIT-purple)

## 🚀 Overview

This project visualizes real-time global cyber attacks as animated arcs on a 3D interactive globe. It sources live threat intelligence from the **AbuseIPDB API** and visualizes the data using WebGL.

It features a robust **"Resilience Architecture"** designed for zero-cost serverless environments. If the external API fails or times out (common in free tiers), the system seamlessly switches to a cached fallback dataset, ensuring the application **never crashes** and always displays data.

## ✨ Key Features

*   **🌍 Interactive 3D Globe:** Built with `react-globe.gl` and Three.js, featuring auto-rotation, zoom, and glowing arc animations.
*   **📡 Live Threat Intelligence:** Fetches real-time "High Risk" IP addresses from AbuseIPDB.
*   **🛡️ Fail-Safe Backend:** Custom Node.js serverless function that implements a "Try-Live-Then-Fallback" logic to guarantee 100% uptime.
*   **⚡ Zero-Cost Architecture:** Optimized for Vercel's Edge Network with a lightweight footprint (no heavy GeoIP databases).
*   **🎨 Cyberpunk UI:** A "Dark Mode" terminal aesthetic using Tailwind CSS.

## 🛠️ Tech Stack

*   **Frontend:** React 19 (Vite) + TypeScript
*   **Visualization:** react-globe.gl (Three.js wrapper)
*   **Styling:** Tailwind CSS
*   **Backend:** Vercel Serverless Functions (Node.js)
*   **Data Source:** AbuseIPDB API
*   **Deployment:** Vercel

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Indranil-Saha-237/DDOS_Attack_Map.git
    cd DDOS_Attack_Map
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory and add your AbuseIPDB API key (Free Tier):
    ```env
    ABUSEIPDB_KEY=your_api_key_here
    ```

4.  **Run Locally**
    ```bash
    npx vercel dev
    ```
    *   Frontend: `http://localhost:3000`
    *   API Endpoint: `http://localhost:3000/api/attacks`

## 🚀 Deployment

This project is optimized for **Vercel**.

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Add the `ABUSEIPDB_KEY` in the Vercel **Environment Variables** settings.
4.  Deploy!

## 🧠 Architecture Logic

The backend (`/api/attacks`) follows this logic flow to ensure speed and stability:

1.  **Attempt Live Fetch:** Tries to get data from AbuseIPDB with a strict 2.5s timeout.
2.  **Error Handling:** If the API times out or returns a 429 (Rate Limit), it catches the error silently.
3.  **Fallback Strategy:** If no live data is retrieved, it loads a local `fallback_data.json` set to ensure the visualization continues.
4.  **Mapping:** Converts IP addresses to Geocoordinates using a lightweight static country map to avoid memory bloat.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).