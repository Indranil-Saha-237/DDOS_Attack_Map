
import { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';

function App() {
  const [arcs, setArcs] = useState<any[]>([]);
  const globeEl = useRef<any>(null);

  useEffect(() => {
    fetch('/api/attacks')
      .then(res => res.json())
      .then(json => {
        // Prepare the arcs for the globe
        // Every attack flies from its coordinates to our "Command Center" (near NYC)
        const formattedArcs = json.data.map((attack: any) => ({
          startLat: attack.coords[0],
          startLng: attack.coords[1],
          endLat: 40.7128, // Target: New York City
          endLng: -74.0060,
          color: attack.type === 'DDoS' ? '#ff0000' : '#ffff00', // Red for DDoS, Yellow for others
          name: `${attack.type} from ${attack.source}`
        }));
        setArcs(formattedArcs);
      })
      .catch(err => console.error("API Error:", err));
  }, []);
  useEffect(() => {
    //Auto rotate Globe
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, [globeEl.current]);
  return (
    <div className="bg-black h-screen w-screen overflow-hidden relative font-mono text-green-500">
      {/* Overlay HUD */}
      <div className="absolute top-10 left-10 z-10 pointer-events-none">
        <h1 className="text-4xl font-black tracking-tighter text-white">
          ZERO-COST <span className="text-red-500">THREAT</span> MAP
        </h1>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-4 border border-red-500/40 bg-red-900/10 backdrop-blur-md rounded-sm">
            <p className="text-[10px] text-red-500 uppercase font-bold">Total Intercepted</p>
            <p className="text-3xl font-bold text-white">{arcs.length}</p>
          </div>
          
          <div className="p-4 border border-green-500/40 bg-green-900/10 backdrop-blur-md rounded-sm">
            <p className="text-[10px] text-green-500 uppercase font-bold">System Status</p>
            <p className="text-xl font-bold text-white uppercase animate-pulse">Protected</p>
          </div>
        </div>

        <div className="mt-4 p-4 border border-white/10 bg-black/40 backdrop-blur-lg rounded-sm w-80">
          <h2 className="text-[10px] uppercase tracking-[0.3em] mb-4 text-white/50 border-b border-white/10 pb-2">
            Packet Inspection Log
          </h2>
          <div className="space-y-3">
            {arcs.slice(0, 6).map((arc, i) => (
              <div key={i} className="text-[10px] flex flex-col gap-1 border-l-2 pl-2" style={{ borderColor: arc.color }}>
                <div className="flex justify-between uppercase">
                  <span className="text-white/40">{new Date().toLocaleTimeString()}</span>
                  <span style={{ color: arc.color }}>
                    {arc.color === '#ff0000' ? 'CRITICAL' : 'WARNING'}
                  </span>
                </div>
                <span className="text-white tracking-wider">{arc.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

       {/* 3D Globe */}
       <Globe
         ref={globeEl}
         globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
         backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
         arcsData={arcs}
         pointLat={(d: any) => d.startLat}
         pointLng={(d: any) => d.startLng}
         pointColor={(d:any) => d.color}
         pointRadius={0.5}
         pointsMerge={false}
         arcColor={'color'}
         arcDashLength={0.4}
         arcDashGap={4}
         arcDashAnimateTime={1500}
         arcStroke={0.4}
         labelsData={arcs}
         labelLat={(d: any) => d.startLat}
         labelLng={(d: any) => d.startLng}
         labelText={(d: any) => d.name}
         labelSize={0.5}
         labelColor={() => 'rgba(255, 255, 255, 0.7)'}
         labelDotRadius={0.3}
       />
   
          {/* Footer Decoration */}
          <div className="absolute bottom-10 right-10 text-right opacity-30 pointer-events-none">
            <p className="text-[10px]">GLOBAL THREAT LEVEL: ELEVATED</p>
            <p className="text-[10px]">ENCRYPTION: AES-256-BIT</p>
          </div>
        </div>
     );
}

export default App;