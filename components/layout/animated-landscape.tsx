"use client"

import React from "react"

export const AnimatedLandscape = ({ className }: { className?: string }) => {
  return (
    <div className={`relative w-full overflow-visible pointer-events-none ${className || ""}`} style={{ height: '240px' }}>
      <svg
        className="absolute bottom-0 left-0 w-full h-full object-cover sm:object-fill overflow-visible"
        viewBox="0 0 1440 240"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#417B31" />
            <stop offset="100%" stopColor="#2F5C23" />
          </linearGradient>

          {/* Glow for sun */}
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB800" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#FFB800" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="sunAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFAA00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFAA00" stopOpacity="0" />
          </radialGradient>
        </defs>

        <style>{`
          .pm-anim-blade {
            transform-origin: 1220px 105px;
            animation: spin 10s linear infinite;
          }
          .pm-anim-truck {
            animation: drive 25s linear infinite;
          }
          .pm-anim-bird1 {
            animation: fly 15s linear infinite;
          }
          .pm-anim-bird2 {
            animation: fly 18s linear infinite 3s;
          }
          .pm-anim-bird3 {
            animation: fly 12s linear infinite 6s;
          }

          @keyframes spin {
            100% { transform: rotate(360deg); }
          }
          @keyframes drive {
            0% { transform: translateX(-200px); }
            100% { transform: translateX(1600px); }
          }
          @keyframes fly {
            0% { transform: translate(-50px, 80px) scale(0.6); }
            25% { transform: translate(350px, 65px) scale(0.65); }
            50% { transform: translate(750px, 85px) scale(0.7); }
            75% { transform: translate(1150px, 70px) scale(0.75); }
            100% { transform: translate(1550px, 80px) scale(0.8); }
          }
          
          .pm-anim-cloud1 { animation: drift 60s linear infinite -10s; }
          .pm-anim-cloud2 { animation: drift 80s linear infinite -40s; }
          .pm-anim-cloud3 { animation: drift 50s linear infinite -25s; }
          .pm-anim-cloud4 { animation: drift 70s linear infinite -55s; }
          .pm-anim-cloud5 { animation: drift 90s linear infinite -75s; }
          
          @keyframes drift {
            0% { transform: translateX(-200px); }
            100% { transform: translateX(1600px); }
          }
        `}</style>

        {/* ── MASSIVE SUN GLOW ── */}
        <circle cx="200" cy="120" r="140" fill="url(#sunAura)" />
        <circle cx="200" cy="120" r="60" fill="url(#sunGlow)" />
        <circle cx="200" cy="120" r="16" fill="#FFC72C" />

        {/* ── MOVING CLOUDS ── */}
        <g fill="#ffffff" opacity="0.07">
          <g className="pm-anim-cloud1">
            <path d="M 0 0 Q 20 -20 50 0 Q 80 -10 100 10 Q 110 30 80 30 L 0 30 Q -20 10 0 0 Z" transform="translate(0, 40) scale(1)" />
          </g>
          <g className="pm-anim-cloud2">
            <path d="M 0 0 Q 20 -20 50 0 Q 80 -10 100 10 Q 110 30 80 30 L 0 30 Q -20 10 0 0 Z" transform="translate(0, 80) scale(0.8)" />
          </g>
          <g className="pm-anim-cloud3">
            <path d="M 0 0 Q 30 -30 70 0 Q 110 -15 140 10 Q 150 40 110 40 L 0 40 Q -30 10 0 0 Z" transform="translate(0, 20) scale(0.6)" />
          </g>
          <g className="pm-anim-cloud4">
            <path d="M 0 0 Q 20 -20 50 0 Q 80 -10 100 10 Q 110 30 80 30 L 0 30 Q -20 10 0 0 Z" transform="translate(0, 110) scale(0.7)" />
          </g>
          <g className="pm-anim-cloud5">
            <path d="M 0 0 Q 30 -30 70 0 Q 110 -15 140 10 Q 150 40 110 40 L 0 40 Q -30 10 0 0 Z" transform="translate(0, 60) scale(0.9)" />
          </g>
        </g>

        {/* ── HILLS / BACKGROUND TERRAIN ── */}
        <path
          d="M0 240 L0 180 Q200 160 400 175 T800 170 T1200 185 L1440 175 L1440 240 Z"
          fill="#356529"
        />

        {/* ── DETAILED BACKGROUND SILHOUETTES ── */}
        <g>
          {/* Left Background Cityscape */}
          <g transform="translate(500, 130)">
            <rect x="0" y="10" width="40" height="60" fill="#2B3A4A" />
            <rect x="5" y="5" width="10" height="5" fill="#1E293B" /> {/* Roof structure */}
            <g fill="#475569" opacity="0.3">
              <rect x="5" y="20" width="8" height="15" />
              <rect x="15" y="20" width="8" height="15" />
              <rect x="25" y="20" width="8" height="15" />
            </g>
            
            <rect x="45" y="20" width="35" height="50" fill="#1E293B" />
            <rect x="50" y="15" width="25" height="5" fill="#0F172A" />
            <g fill="#60A5FA" opacity="0.15">
              {Array.from({ length: 4 }).map((_, r) => (
                Array.from({ length: 3 }).map((_, c) => (
                  <rect key={'bg1'+r+c} x={50 + c * 10} y={25 + r * 10} width="6" height="6" />
                ))
              ))}
            </g>

            <rect x="85" y="0" width="25" height="70" fill="#334155" />
            <polygon points="85 0, 97 -10, 110 0" fill="#1E293B" /> {/* Peaked roof */}
          </g>
          
          {/* Right Background Cityscape (With Solar) */}
          <g transform="translate(1050, 120)">
            {/* Main Building */}
            <rect x="0" y="0" width="55" height="80" fill="#2B3A4A" />
            <rect x="0" y="-3" width="55" height="3" fill="#1E293B" /> {/* Cornice */}
            
            {/* Solar Panels on Roof */}
            <g fill="#3B82F6" opacity="0.7">
              <polygon points="5 -15, 15 -15, 12 -5, 2 -5" />
              <polygon points="20 -15, 30 -15, 27 -5, 17 -5" />
              <polygon points="35 -15, 45 -15, 42 -5, 32 -5" />
            </g>
            <g stroke="#1E293B" strokeWidth="1">
              <line x1="12" y1="-5" x2="12" y2="0" />
              <line x1="27" y1="-5" x2="27" y2="0" />
              <line x1="42" y1="-5" x2="42" y2="0" />
            </g>

            {/* Glowing Windows */}
            <g fill="#FEF08A" opacity="0.3">
              <rect x="8" y="15" width="15" height="10" />
              <rect x="32" y="15" width="15" height="10" />
              <rect x="8" y="35" width="15" height="10" />
              <rect x="32" y="55" width="15" height="10" />
            </g>
            <g fill="#60A5FA" opacity="0.1">
              <rect x="32" y="35" width="15" height="10" />
              <rect x="8" y="55" width="15" height="10" />
            </g>

            {/* Secondary Building */}
            <rect x="60" y="25" width="45" height="55" fill="#1E293B" />
            <rect x="65" y="15" width="15" height="10" fill="#0F172A" /> {/* Water tank/HVAC */}
            <rect x="85" y="20" width="10" height="5" fill="#0F172A" />
            
            {/* Secondary Windows */}
            <g fill="#475569" opacity="0.5">
              {Array.from({ length: 4 }).map((_, r) => (
                <rect key={'bg2'+r} x="65" y={35 + r * 10} width="35" height="5" />
              ))}
            </g>
          </g>
          
          {/* Detailed Silhouetted Trees */}
          <g fill="#1E293B">
            {/* Tree 1 */}
            <rect x="1108" y="190" width="4" height="10" />
            <path d="M1110 160 L1100 195 L1120 195 Z" />
            <path d="M1110 145 L1103 175 L1117 175 Z" />
            <path d="M1110 130 L1106 155 L1114 155 Z" />
            
            {/* Tree 2 */}
            <rect x="1130" y="190" width="3" height="10" />
            <path d="M1131.5 165 L1124 195 L1139 195 Z" />
            <path d="M1131.5 150 L1126 175 L1137 175 Z" />
            <path d="M1131.5 135 L1128 155 L1135 155 Z" />
          </g>
        </g>

        {/* ── GROUND ── */}
        <path d="M0 200 L1440 200 L1440 240 L0 240 Z" fill="url(#groundGrad)" />

        {/* ── DETAILED TREES (Left side) ── */}
        <g>
          {/* Leafy Tree */}
          <rect x="330" y="190" width="6" height="15" fill="#4A3B32" />
          <circle cx="325" cy="180" r="12" fill="#295E1E" />
          <circle cx="340" cy="180" r="14" fill="#214A17" />
          <circle cx="333" cy="168" r="12" fill="#356529" />
          
          {/* Layered Pine */}
          <rect x="368" y="190" width="4" height="15" fill="#3D291F" /> {/* Trunk */}
          <path d="M370 160 L358 195 L382 195 Z" fill="#214A17" />
          <path d="M370 145 L360 175 L380 175 Z" fill="#295E1E" />
          <path d="M370 130 L363 155 L377 155 Z" fill="#356529" />
        </g>

        {/* ── FOREGROUND BUILDINGS & BATTERIES ── */}
        <g>
          {/* DETAILED BATTERY ENERGY STORAGE SYSTEMS (Containerized) */}
          <g transform="translate(40, 160)">
            {/* Base platform */}
            <rect x="0" y="35" width="160" height="5" fill="#1F2937" />
            
            {/* Battery Container 1 */}
            <g transform="translate(10, 0)">
              <rect x="0" y="0" width="40" height="35" rx="2" fill="#E2E8F0" />
              {/* Ribbed texture */}
              <g fill="#CBD5E1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <rect key={'rib1'+i} x={4 + i * 5} y="0" width="2" height="35" />
                ))}
              </g>
              {/* HVAC Unit on side */}
              <rect x="5" y="5" width="15" height="15" fill="#94A3B8" />
              <circle cx="12.5" cy="12.5" r="5" fill="#1E293B" />
              {/* Door & Display */}
              <rect x="25" y="8" width="10" height="27" fill="#64748B" />
              <rect x="27" y="12" width="6" height="4" fill="#10B981" /> {/* Green light */}
              <rect x="0" y="33" width="40" height="2" fill="#FF8A1C" /> {/* Orange base stripe */}
            </g>

            {/* Battery Container 2 */}
            <g transform="translate(60, 0)">
              <rect x="0" y="0" width="40" height="35" rx="2" fill="#E2E8F0" />
              <g fill="#CBD5E1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <rect key={'rib2'+i} x={4 + i * 5} y="0" width="2" height="35" />
                ))}
              </g>
              {/* HVAC Unit */}
              <rect x="5" y="5" width="15" height="15" fill="#94A3B8" />
              <circle cx="12.5" cy="12.5" r="5" fill="#1E293B" />
              {/* Door & Display */}
              <rect x="25" y="8" width="10" height="27" fill="#64748B" />
              <rect x="27" y="12" width="6" height="4" fill="#3B82F6" /> {/* Blue light */}
              <rect x="0" y="33" width="40" height="2" fill="#FF8A1C" />
            </g>

            {/* Battery Container 3 */}
            <g transform="translate(110, 0)">
              <rect x="0" y="0" width="40" height="35" rx="2" fill="#E2E8F0" />
              <g fill="#CBD5E1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <rect key={'rib3'+i} x={4 + i * 5} y="0" width="2" height="35" />
                ))}
              </g>
              {/* HVAC Unit */}
              <rect x="5" y="5" width="15" height="15" fill="#94A3B8" />
              <circle cx="12.5" cy="12.5" r="5" fill="#1E293B" />
              {/* Door & Display */}
              <rect x="25" y="8" width="10" height="27" fill="#64748B" />
              <rect x="27" y="12" width="6" height="4" fill="#10B981" />
              <rect x="0" y="33" width="40" height="2" fill="#FF8A1C" />
            </g>
          </g>

          {/* COMMERCIAL / RESIDENTIAL BESS UNITS (Palletized for shipping) */}
          <g transform="translate(230, 175)">
            {/* Wooden Pallets */}
            <rect x="0" y="20" width="25" height="3" fill="#B45309" />
            <rect x="35" y="20" width="25" height="3" fill="#B45309" />
            
            {/* Unit 1 */}
            <rect x="2" y="0" width="21" height="20" rx="1" fill="#F8FAFC" />
            <rect x="2" y="2" width="21" height="3" fill="#1E293B" /> {/* Top vent */}
            <rect x="10" y="8" width="5" height="5" fill="#334155" /> {/* Logo placeholder */}
            <circle cx="12.5" cy="16" r="1" fill="#10B981" /> {/* LED */}
            
            {/* Unit 2 */}
            <rect x="37" y="0" width="21" height="20" rx="1" fill="#F8FAFC" />
            <rect x="37" y="2" width="21" height="3" fill="#1E293B" />
            <rect x="45" y="8" width="5" height="5" fill="#334155" />
            <circle cx="47.5" cy="16" r="1" fill="#3B82F6" />
            
            {/* Strapping / packaging */}
            <line x1="12.5" y1="0" x2="12.5" y2="20" stroke="#94A3B8" strokeWidth="0.5" />
            <line x1="47.5" y1="0" x2="47.5" y2="20" stroke="#94A3B8" strokeWidth="0.5" />
          </g>

          {/* DETAILED MAIN FACTORY */}
          <g transform="translate(390, 40)">
            {/* Storage Silos */}
            <rect x="-30" y="60" width="20" height="100" fill="#2D3748" rx="2" />
            <polygon points="-30 60, -20 45, -10 60" fill="#1A202C" />
            <rect x="-25" y="60" width="10" height="100" fill="#4A5568" opacity="0.3" /> {/* Highlight */}
            
            <rect x="-5" y="70" width="20" height="90" fill="#2D3748" rx="2" />
            <polygon points="-5 70, 5 55, 15 70" fill="#1A202C" />
            <rect x="0" y="70" width="10" height="90" fill="#4A5568" opacity="0.3" />

            {/* Main factory building (WIDER) */}
            <rect x="15" y="40" width="120" height="120" fill="#1F2937" />
            <polygon points="15 40, 75 0, 135 40" fill="#111827" />
            
            {/* Detailed Solar Panels on Roof */}
            <g transform="translate(25, 20) rotate(33.7)">
              <rect x="0" y="0" width="40" height="12" fill="#1E3A8A" />
              <g stroke="#60A5FA" strokeWidth="0.5" opacity="0.8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <line key={'sgrid_v1'+i} x1={i * 10} y1="0" x2={i * 10} y2="12" />
                ))}
                <line x1="0" y1="6" x2="40" y2="6" />
                <rect x="0" y="0" width="40" height="12" fill="none" strokeWidth="1" />
              </g>
            </g>
            <g transform="translate(93, 42) rotate(-33.7)">
              <rect x="0" y="0" width="40" height="12" fill="#1E3A8A" />
              <g stroke="#60A5FA" strokeWidth="0.5" opacity="0.8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <line key={'sgrid_v2'+i} x1={i * 10} y1="0" x2={i * 10} y2="12" />
                ))}
                <line x1="0" y1="6" x2="40" y2="6" />
                <rect x="0" y="0" width="40" height="12" fill="none" strokeWidth="1" />
              </g>
            </g>

            {/* PowerMetz Sign (NO SPACE) */}
            <rect x="25" y="48" width="100" height="10" fill="#374151" rx="1" />
            <text x="75" y="56" fill="#F8FAFC" fontSize="7" fontWeight="bold" textAnchor="end">POWER</text>
            <text x="75" y="56" fill="#FF8A1C" fontSize="7" fontWeight="bold" textAnchor="start">METZ</text>

            {/* Factory Windows (Glowing) */}
            <g fill="#FF8A1C" opacity="0.9">
              {/* Upper row */}
              <rect x="30" y="65" width="20" height="15" />
              <rect x="65" y="65" width="20" height="15" />
              <rect x="100" y="65" width="20" height="15" />
              {/* Lower row */}
              <rect x="30" y="90" width="20" height="15" />
              <rect x="100" y="90" width="20" height="15" />
            </g>
            
            {/* Roller Shutter Doors (Wider) */}
            <rect x="60" y="125" width="30" height="35" fill="#4B5563" />
            <g fill="#374151">
              {Array.from({ length: 7 }).map((_, i) => (
                <rect key={'shutter1_'+i} x="60" y={125 + i * 5} width="30" height="2" />
              ))}
            </g>
            <rect x="60" y="125" width="30" height="35" fill="none" stroke="#FBBF24" strokeWidth="0.5" strokeDasharray="2 2" /> {/* Warning border */}

            {/* Attached Sub-building (Warehouse/Assembly) - Shifted right */}
            <rect x="135" y="70" width="70" height="90" fill="#2D3748" />
            <rect x="135" y="65" width="70" height="5" fill="#1E293B" /> {/* Parapet */}
            
            {/* Exhaust Stacks on Sub-building */}
            <rect x="150" y="45" width="6" height="20" fill="#4B5563" />
            <path d="M150 45 Q153 40 156 45" fill="#9CA3AF" />
            <rect x="170" y="50" width="4" height="15" fill="#4B5563" />
            <path d="M170 50 Q172 45 174 50" fill="#9CA3AF" />
            
            {/* HVAC on Sub-building */}
            <rect x="185" y="55" width="15" height="10" fill="#4B5563" /> 
            <circle cx="192.5" cy="60" r="3" fill="#111827" />

            {/* Industrial Piping */}
            <path d="M140 75 L140 140 L195 140 L195 80" fill="none" stroke="#64748B" strokeWidth="2" />
            <path d="M145 75 L145 135 L190 135 L190 85" fill="none" stroke="#94A3B8" strokeWidth="1" />

            {/* Louvers/Vents */}
            <g fill="#1F2937">
              <rect x="155" y="85" width="20" height="4" />
              <rect x="155" y="93" width="20" height="4" />
              <rect x="155" y="101" width="20" height="4" />
            </g>

            {/* Secondary Loading Dock */}
            <rect x="155" y="130" width="20" height="30" fill="#1E293B" />
            <rect x="155" y="128" width="20" height="2" fill="#3B82F6" /> {/* Canopy */}
          </g>

          {/* DETAILED OFFICE TOWER */}
          <g transform="translate(680, 80)">
            {/* Main Tower */}
            <rect x="0" y="10" width="65" height="110" fill="#1E293B" />
            
            {/* Roof Antennas & HVAC */}
            <rect x="10" y="0" width="15" height="10" fill="#475569" />
            <rect x="30" y="5" width="20" height="5" fill="#475569" />
            <line x1="17" y1="0" x2="17" y2="-15" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="17" cy="-15" r="1.5" fill="#EF4444" /> {/* Red warning light */}
            
            {/* Office Windows (Reflective glass pattern) */}
            <g fill="#60A5FA" opacity="0.6">
              {Array.from({ length: 6 }).map((_, r) => (
                Array.from({ length: 4 }).map((_, c) => (
                  <rect key={'off1'+r+c} x={7 + c * 13} y={20 + r * 15} width="9" height="10" rx="1" />
                ))
              ))}
            </g>

            {/* Adjoining low-rise section */}
            <rect x="65" y="50" width="50" height="70" fill="#0F172A" />
            <rect x="70" y="45" width="20" height="5" fill="#334155" />
            <g fill="#60A5FA" opacity="0.4">
              {Array.from({ length: 4 }).map((_, r) => (
                Array.from({ length: 3 }).map((_, c) => (
                  <rect key={'off2'+r+c} x={72 + c * 14} y={60 + r * 14} width="10" height="8" rx="1" />
                ))
              ))}
            </g>
          </g>

          {/* ── MEGA BESS INSTALLATION (Battery Array) ── */}
          <g transform="translate(820, 150)">
            {/* Concrete Pad */}
            <rect x="0" y="45" width="190" height="5" fill="#1F2937" />
            
            {/* Row of Containers */}
            {[0, 1, 2].map((i) => (
              <g key={`mega_bess_${i}`} transform={`translate(${i * 50}, 15)`}>
                {/* Main Body */}
                <rect x="0" y="0" width="45" height="30" rx="2" fill="#E2E8F0" />
                
                {/* Cooling Fans on top */}
                <rect x="5" y="-3" width="10" height="3" fill="#94A3B8" />
                <rect x="30" y="-3" width="10" height="3" fill="#94A3B8" />
                
                {/* Texture/Ribs */}
                <g fill="#CBD5E1">
                  {Array.from({ length: 8 }).map((_, j) => (
                    <rect key={`rib${i}_${j}`} x={4 + j * 5} y="0" width="2" height="30" />
                  ))}
                </g>
                
                {/* Side Access Panel / Inverter */}
                <rect x="15" y="8" width="15" height="18" fill="#64748B" rx="1" />
                <rect x="17" y="10" width="11" height="6" fill="#1E293B" /> {/* Screen */}
                
                {/* Status LEDs */}
                <circle cx="20" cy="22" r="1.5" fill="#10B981" /> {/* Green */}
                <circle cx="25" cy="22" r="1.5" fill="#3B82F6" /> {/* Blue */}
                
                {/* Power Cable Trench */}
                <rect x="0" y="28" width="45" height="2" fill="#FF8A1C" />
              </g>
            ))}
            
            {/* Transformer / Substation Unit */}
            <g transform="translate(155, 5)">
              <rect x="0" y="0" width="30" height="40" fill="#334155" rx="1" />
              {/* Radiator fins */}
              <g fill="#475569">
                <rect x="-3" y="5" width="3" height="25" />
                <rect x="-3" y="10" width="3" height="25" />
                {Array.from({ length: 5 }).map((_, k) => (
                  <rect key={`fin${k}`} x="-3" y={5 + k * 5} width="3" height="3" />
                ))}
              </g>
              <rect x="30" y="10" width="4" height="20" fill="#475569" />
              {/* Insulators */}
              <rect x="5" y="-5" width="4" height="5" fill="#94A3B8" />
              <rect x="20" y="-5" width="4" height="5" fill="#94A3B8" />
              {/* Danger Sign */}
              <rect x="10" y="15" width="10" height="10" fill="#EF4444" />
              <polygon points="15 17, 12 23, 18 23" fill="#FBBF24" />
            </g>
          </g>
        </g>

        {/* ── DETAILED TREES (Right side) ── */}
        <g>
          {/* Layered Pine 1 */}
          <rect x="1293" y="190" width="4" height="15" fill="#3D291F" />
          <path d="M1295 160 L1283 195 L1307 195 Z" fill="#214A17" />
          <path d="M1295 145 L1285 175 L1305 175 Z" fill="#295E1E" />
          <path d="M1295 130 L1288 155 L1302 155 Z" fill="#356529" />
          
          {/* Layered Pine 2 (Taller) */}
          <rect x="1323" y="180" width="4" height="25" fill="#2A1B12" />
          <path d="M1325 140 L1312 185 L1338 185 Z" fill="#1A3B12" />
          <path d="M1325 120 L1315 160 L1335 160 Z" fill="#214A17" />
          <path d="M1325 100 L1318 135 L1332 135 Z" fill="#295E1E" />
          
          {/* Layered Pine 3 */}
          <rect x="1353" y="190" width="4" height="15" fill="#3D291F" />
          <path d="M1355 165 L1343 195 L1367 195 Z" fill="#295E1E" />
          <path d="M1355 150 L1345 175 L1365 175 Z" fill="#356529" />
          <path d="M1355 135 L1348 155 L1362 155 Z" fill="#417B31" />
          
          {/* Detailed Leafy Tree */}
          <rect x="1398" y="180" width="4" height="20" fill="#3D291F" />
          <circle cx="1390" cy="175" r="14" fill="#214A17" />
          <circle cx="1405" cy="180" r="12" fill="#1A3B12" />
          <circle cx="1400" cy="165" r="15" fill="#295E1E" />
          <circle cx="1395" cy="155" r="10" fill="#356529" /> {/* Highlight */}
        </g>

        {/* ── TRANSMISSION LINES (Poles) ── */}
        <g stroke="#475569" strokeWidth="2">
          {/* Pole 1 */}
          <line x1="250" y1="200" x2="250" y2="150" />
          <line x1="235" y1="160" x2="265" y2="160" />
          <line x1="240" y1="155" x2="260" y2="155" strokeWidth="1" />
          
          {/* Pole 2 */}
          <line x1="620" y1="200" x2="620" y2="140" />
          <line x1="605" y1="150" x2="635" y2="150" />
          <line x1="610" y1="145" x2="630" y2="145" strokeWidth="1" />
          
          {/* Pole 3 */}
          <line x1="1020" y1="200" x2="1020" y2="145" />
          <line x1="1005" y1="155" x2="1035" y2="155" />
          <line x1="1010" y1="150" x2="1030" y2="150" strokeWidth="1" />
        </g>
        {/* Wires */}
        <path d="M0 160 Q125 175 250 155 T620 145 T1020 150 T1440 165" fill="none" stroke="#64748B" strokeWidth="1" />
        <path d="M0 165 Q125 180 250 160 T620 150 T1020 155 T1440 170" fill="none" stroke="#94A3B8" strokeWidth="0.5" />

        {/* ── BIRDS ── */}
        <g className="pm-anim-bird1" fill="none" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round">
          <path d="M0 0 Q5 -5 10 0 Q15 -5 20 0" />
        </g>
        <g className="pm-anim-bird2" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round">
          <path d="M0 20 Q6 13 12 20 Q18 13 24 20" />
        </g>
        <g className="pm-anim-bird3" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round">
          <path d="M0 10 Q4 5 8 10 Q12 5 16 10" />
        </g>

        {/* ── WINDMILL ── */}
        <g>
          {/* Pole */}
          <path d="M1187 200 L1193 200 L1191 105 L1189 105 Z" fill="#9CA3AF" />
          {/* Shadows on pole for 3D */}
          <path d="M1191 200 L1193 200 L1191 105 Z" fill="#6B7280" />
          
          {/* Blades */}
          <g className="pm-anim-blade" style={{ transformOrigin: '1190px 105px' }}>
            <circle cx="1190" cy="105" r="4" fill="#F3F4F6" />
            <circle cx="1190" cy="105" r="2" fill="#9CA3AF" />
            {/* Blade 1 */}
            <path d="M1190 105 L1185 60 Q1190 50 1195 60 Z" fill="#E5E7EB" />
            <path d="M1190 105 L1190 60 Q1192 50 1195 60 Z" fill="#D1D5DB" />
            {/* Blade 2 */}
            <path d="M1190 105 L1150 125 Q1140 130 1155 135 Z" fill="#E5E7EB" />
            <path d="M1190 105 L1150 130 Q1145 130 1155 135 Z" fill="#D1D5DB" />
            {/* Blade 3 */}
            <path d="M1190 105 L1220 135 Q1230 140 1225 125 Z" fill="#E5E7EB" />
            <path d="M1190 105 L1225 135 Q1230 140 1225 125 Z" fill="#D1D5DB" />
          </g>
        </g>

        {/* ── ROAD ── */}
        <rect x="0" y="210" width="1440" height="30" fill="#24401C" />
        <line x1="0" y1="225" x2="1440" y2="225" stroke="#4A7A36" strokeWidth="2" strokeDasharray="15 15" />

        {/* ── TRUCK ── */}
        <g className="pm-anim-truck">
          {/* Cab */}
          <rect x="65" y="185" width="25" height="25" rx="3" fill="#FF8A1C" />
          {/* Grille */}
          <rect x="85" y="195" width="5" height="10" rx="1" fill="#111827" />
          {/* Headlight */}
          <circle cx="87" cy="207" r="1.5" fill="#FEF08A" />
          {/* Cab Window */}
          <rect x="73" y="188" width="14" height="10" rx="2" fill="#E0F2FE" opacity="0.9" />
          <line x1="80" y1="188" x2="80" y2="198" stroke="#7DD3FC" strokeWidth="1" />
          
          {/* Trailer */}
          <rect x="10" y="175" width="52" height="35" rx="2" fill="#1E293B" />
          <rect x="10" y="175" width="52" height="5" fill="#334155" /> {/* Trailer Roof */}
          <rect x="10" y="200" width="52" height="10" fill="#0F172A" /> {/* Trailer Base */}
          
          {/* Trailer Design / Logo */}
          <text x="16" y="191" fill="#F8FAFC" fontSize="7" fontWeight="bold" letterSpacing="0.5">POWER</text>
          <text x="16" y="199" fill="#FF8A1C" fontSize="7" fontWeight="bold" letterSpacing="0.5">METZ</text>
          
          {/* Connector */}
          <rect x="62" y="200" width="3" height="5" fill="#475569" />
          
          {/* Wheels */}
          {/* Trailer Wheels */}
          <circle cx="20" cy="210" r="6" fill="#020617" />
          <circle cx="20" cy="210" r="3" fill="#64748B" />
          <circle cx="35" cy="210" r="6" fill="#020617" />
          <circle cx="35" cy="210" r="3" fill="#64748B" />
          {/* Cab Wheels */}
          <circle cx="75" cy="210" r="6" fill="#020617" />
          <circle cx="75" cy="210" r="3" fill="#64748B" />
        </g>
      </svg>
    </div>
  )
}
