import React from 'react';

interface ArtProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  ariaLabel?: string;
}

/**
 * Sun over Sea Illustration
 * Stylized warm sun over Red Sea calm waves with distant coastal mountain range
 */
export const SunSeaArt: React.FC<ArtProps> = ({
  className = 'w-full h-auto',
  width = 400,
  height = 260,
  ariaLabel = 'Illustration of sun over the Red Sea',
}) => (
  <svg
    viewBox="0 0 400 260"
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label={ariaLabel}
  >
    <rect width="400" height="260" fill="#F7F3EC" className="fill-paper dark:fill-deep-sea" />
    {/* Distant mountain silhouette */}
    <path
      d="M0 160 L60 135 L130 152 L210 120 L290 148 L350 130 L400 155 L400 170 L0 170 Z"
      fill="#E3D3B4"
      opacity="0.8"
      className="fill-sand-300 dark:fill-sea-700 dark:opacity-40"
    />
    <path
      d="M0 168 L80 148 L170 162 L250 140 L330 158 L400 146 L400 175 L0 175 Z"
      fill="#B08D57"
      opacity="0.5"
      className="fill-sand-600 dark:fill-sea-500 dark:opacity-30"
    />
    {/* Sun */}
    <circle cx="200" cy="110" r="38" fill="#E4573D" opacity="0.9" />
    <circle cx="200" cy="110" r="48" stroke="#E4573D" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
    {/* Sea base */}
    <rect x="0" y="170" width="400" height="90" fill="#06303A" className="fill-sea-900" />
    {/* Wave lines */}
    <path d="M0 180 Q 50 175, 100 180 T 200 180 T 300 180 T 400 180" stroke="#1B8CA0" strokeWidth="2" fill="none" opacity="0.8" />
    <path d="M0 196 Q 50 192, 100 196 T 200 196 T 300 196 T 400 196" stroke="#D8EEF0" strokeWidth="1.5" fill="none" opacity="0.6" />
    <path d="M0 214 Q 50 210, 100 214 T 200 214 T 300 214 T 400 214" stroke="#0B5566" strokeWidth="2" fill="none" />
    <path d="M0 234 Q 50 230, 100 234 T 200 234 T 300 234 T 400 234" stroke="#1B8CA0" strokeWidth="1.5" fill="none" opacity="0.5" />
  </svg>
);

/**
 * Dunes Art
 * Rolling desert dunes meeting coastal sands
 */
export const DunesArt: React.FC<ArtProps> = ({
  className = 'w-full h-auto',
  width = 400,
  height = 260,
  ariaLabel = 'Illustration of coastal desert dunes',
}) => (
  <svg
    viewBox="0 0 400 260"
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label={ariaLabel}
  >
    <rect width="400" height="260" fill="#FAF7F2" className="fill-paper-card dark:fill-deep-sea" />
    {/* Sky soft gradient */}
    <circle cx="320" cy="65" r="28" fill="#E4573D" opacity="0.8" />
    {/* Back dune */}
    <path
      d="M0 120 C 120 120, 180 80, 290 100 C 350 110, 380 130, 400 140 L 400 260 L 0 260 Z"
      fill="#E3D3B4"
      opacity="0.6"
      className="fill-sand-300 dark:fill-sand-600/30"
    />
    {/* Mid dune ridge with shadow */}
    <path
      d="M0 170 C 80 150, 160 120, 240 145 C 310 168, 360 150, 400 160 L 400 260 L 0 260 Z"
      fill="#D4BD93"
      className="fill-sand-300/80 dark:fill-sand-600/40"
    />
    {/* Fore dune sharp edge */}
    <path
      d="M0 210 C 110 180, 210 220, 310 185 C 360 170, 385 180, 400 190 L 400 260 L 0 260 Z"
      fill="#B08D57"
      className="fill-sand-600 dark:fill-sand-600/70"
    />
    {/* Wind ripple lines */}
    <path d="M40 225 Q 70 220, 100 225" stroke="#FAF7F2" strokeWidth="1" opacity="0.6" />
    <path d="M120 235 Q 160 230, 200 235" stroke="#FAF7F2" strokeWidth="1" opacity="0.6" />
    <path d="M240 215 Q 280 210, 320 215" stroke="#FAF7F2" strokeWidth="1" opacity="0.6" />
  </svg>
);

/**
 * Wadi Art
 * Desert canyon / wadi with acacia tree silhouette
 */
export const WadiArt: React.FC<ArtProps> = ({
  className = 'w-full h-auto',
  width = 400,
  height = 260,
  ariaLabel = 'Illustration of desert canyon wadi',
}) => (
  <svg
    viewBox="0 0 400 260"
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label={ariaLabel}
  >
    <rect width="400" height="260" fill="#F7F3EC" className="fill-paper dark:fill-deep-sea" />
    {/* Canyon Left Wall */}
    <path
      d="M0 30 L 70 80 L 50 140 L 95 180 L 110 260 L 0 260 Z"
      fill="#06303A"
      className="fill-sea-900"
    />
    <path
      d="M0 70 L 45 105 L 30 160 L 70 200 L 75 260 L 0 260 Z"
      fill="#0B5566"
      opacity="0.8"
      className="fill-sea-700"
    />
    {/* Canyon Right Wall */}
    <path
      d="M400 10 L 320 70 L 340 130 L 290 190 L 270 260 L 400 260 Z"
      fill="#B08D57"
      className="fill-sand-600"
    />
    <path
      d="M400 50 L 350 95 L 365 150 L 325 210 L 320 260 L 400 260 Z"
      fill="#E3D3B4"
      opacity="0.7"
      className="fill-sand-300"
    />
    {/* Valley floor */}
    <polygon points="100,260 110,210 270,210 280,260" fill="#FAF7F2" opacity="0.6" />
    {/* Acacia umbrella silhouette */}
    <g transform="translate(180, 160)">
      <path d="M18 50 L 16 28 L 22 28 L 20 50 Z" fill="#06303A" className="fill-sea-900 dark:fill-paper" />
      <path d="M17 32 L 6 22 L 8 20 L 18 29 Z" fill="#06303A" className="fill-sea-900 dark:fill-paper" />
      <path d="M19 30 L 30 20 L 32 22 L 20 28 Z" fill="#06303A" className="fill-sea-900 dark:fill-paper" />
      {/* Umbrella flat canopy */}
      <ellipse cx="19" cy="16" rx="24" ry="6" fill="#0B5566" className="fill-sea-700 dark:fill-sea-500" />
      <ellipse cx="6" cy="18" rx="12" ry="4" fill="#0B5566" className="fill-sea-700 dark:fill-sea-500" />
      <ellipse cx="32" cy="17" rx="14" ry="4" fill="#0B5566" className="fill-sea-700 dark:fill-sea-500" />
    </g>
  </svg>
);

/**
 * Coral Art
 * Stylized reef structure with branching corals and reef fish
 */
export const CoralArt: React.FC<ArtProps> = ({
  className = 'w-full h-auto',
  width = 400,
  height = 260,
  ariaLabel = 'Illustration of Red Sea coral reef ecosystem',
}) => (
  <svg
    viewBox="0 0 400 260"
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label={ariaLabel}
  >
    <rect width="400" height="260" fill="#06303A" className="fill-sea-900" />
    {/* Ambient light water rays */}
    <polygon points="120,0 180,0 230,260 140,260" fill="#1B8CA0" opacity="0.12" />
    <polygon points="260,0 310,0 370,260 300,260" fill="#D8EEF0" opacity="0.08" />

    {/* Table / Brain coral base */}
    <ellipse cx="100" cy="225" rx="75" ry="32" fill="#B08D57" opacity="0.9" />
    <ellipse cx="310" cy="235" rx="85" ry="30" fill="#0B5566" />

    {/* Acropora Branching Coral */}
    <g transform="translate(170, 110)">
      {/* Main trunk */}
      <path d="M30 140 L 26 80 Q 24 60, 10 50 Q 0 40, -5 20 Q 5 25, 12 35 L 28 65 L 35 140 Z" fill="#E4573D" />
      <path d="M30 90 Q 40 70, 55 55 Q 65 42, 60 25 Q 52 32, 45 45 L 34 80 Z" fill="#E4573D" />
      <path d="M28 75 Q 26 40, 28 15 Q 32 25, 34 40 L 33 80 Z" fill="#C94229" />
      <path d="M22 60 Q 5 40, -10 35 Q -2 45, 6 55 L 24 75 Z" fill="#E4573D" opacity="0.8" />
      <path d="M33 65 Q 50 50, 75 42 Q 68 50, 52 62 L 35 75 Z" fill="#E4573D" opacity="0.85" />
    </g>

    {/* Anthias reef fish silhouettes */}
    <g transform="translate(90, 85)">
      <path d="M0 6 Q 10 0, 22 5 Q 30 10, 22 15 Q 10 20, 0 14 L -6 18 L -4 10 L -6 2 Z" fill="#E4573D" />
      <polygon points="12,4 16,0 18,5" fill="#FAF7F2" opacity="0.7" />
    </g>
    <g transform="translate(130, 65) scale(0.75)">
      <path d="M0 6 Q 10 0, 22 5 Q 30 10, 22 15 Q 10 20, 0 14 L -6 18 L -4 10 L -6 2 Z" fill="#E4573D" opacity="0.85" />
    </g>
    <g transform="translate(290, 110) scale(0.9) scale(-1, 1)">
      <path d="M0 6 Q 10 0, 22 5 Q 30 10, 22 15 Q 10 20, 0 14 L -6 18 L -4 10 L -6 2 Z" fill="#D8EEF0" opacity="0.9" />
    </g>
  </svg>
);

/**
 * Traditional Dhow Art
 * Sambuk wooden boat with triangular lateen sail
 */
export const DhowArt: React.FC<ArtProps> = ({
  className = 'w-full h-auto',
  width = 400,
  height = 260,
  ariaLabel = 'Illustration of traditional Red Sea dhow boat',
}) => (
  <svg
    viewBox="0 0 400 260"
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label={ariaLabel}
  >
    <rect width="400" height="260" fill="#FAF7F2" className="fill-paper-card dark:fill-deep-sea" />
    {/* Sun disc */}
    <circle cx="260" cy="80" r="34" fill="#E3D3B4" opacity="0.6" className="fill-sand-300 dark:fill-sea-700/40" />

    {/* Water surface */}
    <rect x="0" y="175" width="400" height="85" fill="#06303A" className="fill-sea-900" />
    <path d="M0 185 Q 60 180, 120 185 T 240 185 T 360 185 L 400 185" stroke="#1B8CA0" strokeWidth="2" fill="none" opacity="0.8" />
    <path d="M0 205 Q 80 200, 160 205 T 320 205 L 400 205" stroke="#0B5566" strokeWidth="1.5" fill="none" />

    {/* Dhow Boat */}
    <g transform="translate(110, 50)">
      {/* Mast */}
      <line x1="85" y1="20" x2="100" y2="135" stroke="#0E1A1F" strokeWidth="3" className="stroke-ink dark:stroke-paper" />
      {/* Lateen Spar Yard */}
      <line x1="30" y1="12" x2="155" y2="128" stroke="#0E1A1F" strokeWidth="2.5" className="stroke-ink dark:stroke-paper" />
      {/* Lateen Sail */}
      <polygon
        points="32,14 152,126 95,128"
        fill="#F7F3EC"
        stroke="#0E1A1F"
        strokeWidth="1.5"
        className="fill-paper stroke-ink dark:fill-sea-100 dark:stroke-paper"
      />
      {/* Wooden Hull with sharp raked bow */}
      <path
        d="M20 135 L 55 125 L 140 125 L 175 127 C 165 142, 135 148, 55 148 C 35 148, 25 142, 20 135 Z"
        fill="#B08D57"
        stroke="#0E1A1F"
        strokeWidth="1.5"
        className="fill-sand-600 stroke-ink dark:stroke-paper"
      />
      {/* Deck detail stripe */}
      <path d="M45 130 L 155 130" stroke="#0E1A1F" strokeWidth="1" opacity="0.5" className="stroke-ink dark:stroke-paper" />
    </g>
  </svg>
);

/**
 * Green Sea Turtle Art
 * Chelonia mydas cruising underwater
 */
export const TurtleArt: React.FC<ArtProps> = ({
  className = 'w-full h-auto',
  width = 400,
  height = 260,
  ariaLabel = 'Illustration of green sea turtle',
}) => (
  <svg
    viewBox="0 0 400 260"
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label={ariaLabel}
  >
    <rect width="400" height="260" fill="#0B5566" className="fill-sea-700" />
    {/* Water ripples */}
    <path d="M0 30 Q 100 20, 200 30 T 400 30" stroke="#D8EEF0" strokeWidth="1" opacity="0.3" fill="none" />
    <path d="M0 60 Q 100 50, 200 60 T 400 60" stroke="#1B8CA0" strokeWidth="1.5" opacity="0.4" fill="none" />

    {/* Turtle centered */}
    <g transform="translate(140, 60)">
      {/* Front left flipper */}
      <path
        d="M30 65 C 10 50, -35 45, -60 70 C -45 80, -10 85, 20 75 Z"
        fill="#1B8CA0"
        stroke="#06303A"
        strokeWidth="1.5"
      />
      {/* Front right flipper */}
      <path
        d="M90 65 C 110 50, 155 45, 180 70 C 165 80, 130 85, 100 75 Z"
        fill="#1B8CA0"
        stroke="#06303A"
        strokeWidth="1.5"
      />
      {/* Rear flippers */}
      <path d="M35 125 C 20 135, 10 155, 25 160 C 35 155, 45 140, 45 128 Z" fill="#06303A" />
      <path d="M85 125 C 100 135, 110 155, 95 160 C 85 155, 75 140, 75 128 Z" fill="#06303A" />
      {/* Carapace (shell) */}
      <ellipse cx="60" cy="95" rx="36" ry="46" fill="#B08D57" stroke="#06303A" strokeWidth="2" />
      {/* Scute markings on shell */}
      <path
        d="M60 55 L 60 135 M 42 70 L 60 80 L 78 70 M 38 95 L 60 105 L 82 95 M 44 120 L 60 125 L 76 120"
        stroke="#06303A"
        strokeWidth="1.5"
        fill="none"
        opacity="0.75"
      />
      {/* Head */}
      <path
        d="M50 55 C 50 35, 55 25, 60 25 C 65 25, 70 35, 70 55 Z"
        fill="#1B8CA0"
        stroke="#06303A"
        strokeWidth="1.5"
      />
      <circle cx="56" cy="35" r="1.5" fill="#06303A" />
      <circle cx="64" cy="35" r="1.5" fill="#06303A" />
    </g>
  </svg>
);

/**
 * Dugong Art
 * Dugong dugon over sea grass meadow
 */
export const DugongArt: React.FC<ArtProps> = ({
  className = 'w-full h-auto',
  width = 400,
  height = 260,
  ariaLabel = 'Illustration of Red Sea dugong grazing',
}) => (
  <svg
    viewBox="0 0 400 260"
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label={ariaLabel}
  >
    <rect width="400" height="260" fill="#06303A" className="fill-sea-900" />
    {/* Sandy seabed with seagrass */}
    <rect x="0" y="210" width="400" height="50" fill="#E3D3B4" className="fill-sand-300 dark:fill-sand-600/40" />
    {/* Seagrass blades */}
    {Array.from({ length: 24 }).map((_, i) => (
      <path
        key={i}
        d={`M${i * 17 + 8} 210 Q ${i * 17 + (i % 2 === 0 ? 14 : 2)} 185, ${i * 17 + 10} 170`}
        stroke="#1B8CA0"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
    ))}

    {/* Dugong silhouette */}
    <g transform="translate(100, 65)">
      {/* Body with horseshoe snout and fluked tail */}
      <path
        d="M40 75 C 50 50, 100 45, 140 50 C 180 55, 200 70, 220 85 C 235 75, 245 70, 240 85 C 245 95, 235 105, 220 95 C 195 105, 160 115, 120 112 C 80 110, 50 98, 40 75 Z"
        fill="#D4BD93"
        stroke="#0B5566"
        strokeWidth="2"
      />
      {/* Downward rostrum snout */}
      <path
        d="M40 75 C 32 78, 20 82, 18 90 C 16 98, 25 102, 35 100 C 45 98, 48 88, 40 75 Z"
        fill="#D4BD93"
        stroke="#0B5566"
        strokeWidth="1.5"
      />
      {/* Paddle pectoral flipper */}
      <path
        d="M75 92 C 72 108, 65 125, 78 128 C 88 128, 92 112, 90 94 Z"
        fill="#B08D57"
        stroke="#0B5566"
        strokeWidth="1.5"
      />
      {/* Small eye */}
      <circle cx="36" cy="80" r="1.5" fill="#06303A" />
    </g>
  </svg>
);

/**
 * Coastal Town Art
 * Historic coral stone and roshan mashrabiya vernacular
 */
export const CoastalTownArt: React.FC<ArtProps> = ({
  className = 'w-full h-auto',
  width = 400,
  height = 260,
  ariaLabel = 'Illustration of Red Sea coastal architecture',
}) => (
  <svg
    viewBox="0 0 400 260"
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label={ariaLabel}
  >
    <rect width="400" height="260" fill="#FAF7F2" className="fill-paper-card dark:fill-deep-sea" />
    {/* Sky and sun */}
    <circle cx="120" cy="60" r="28" fill="#E4573D" opacity="0.8" />

    {/* Distant palm trees */}
    <g transform="translate(60, 110)">
      <line x1="10" y1="0" x2="12" y2="45" stroke="#B08D57" strokeWidth="2" />
      <path d="M10 0 Q -5 -10, -15 -5 M10 0 Q 5 -15, 12 -12 M10 0 Q 25 -10, 32 -3" stroke="#0B5566" strokeWidth="1.5" fill="none" />
    </g>

    {/* Multi-story coral stone building */}
    <g transform="translate(160, 60)">
      {/* Main facade */}
      <rect x="0" y="30" width="120" height="150" fill="#E3D3B4" stroke="#0E1A1F" strokeWidth="2" className="fill-sand-300 dark:fill-sand-600/40" />
      <rect x="120" y="60" width="80" height="120" fill="#D4BD93" stroke="#0E1A1F" strokeWidth="2" className="fill-sand-300/80 dark:fill-sand-600/30" />
      {/* Parapet crenellations */}
      <path d="M0 30 L 10 30 L 10 24 L 20 24 L 20 30 L 30 30 L 30 24 L 40 24 L 40 30 L 50 30 L 50 24 L 60 24 L 60 30 L 70 30 L 70 24 L 80 24 L 80 30 L 90 30 L 90 24 L 100 24 L 100 30 L 110 30 L 110 24 L 120 24 L 120 30" stroke="#0E1A1F" strokeWidth="1.5" fill="none" />
      {/* Wooden Roshan (Mashrabiya) projecting bays */}
      <rect x="25" y="50" width="40" height="42" fill="#B08D57" stroke="#0E1A1F" strokeWidth="1.5" className="fill-sand-600" />
      <rect x="30" y="55" width="30" height="32" fill="#FAF7F2" stroke="#0E1A1F" strokeWidth="1" opacity="0.6" />
      {/* Lower Roshan */}
      <rect x="25" y="105" width="40" height="38" fill="#B08D57" stroke="#0E1A1F" strokeWidth="1.5" className="fill-sand-600" />
      {/* Main arched entry door */}
      <path d="M80 180 L 80 145 C 80 135, 100 135, 100 145 L 100 180 Z" fill="#06303A" stroke="#0E1A1F" strokeWidth="1.5" />
      {/* Adjacent building windows */}
      <rect x="140" y="80" width="24" height="30" fill="#06303A" stroke="#0E1A1F" strokeWidth="1" />
      <rect x="140" y="125" width="24" height="30" fill="#06303A" stroke="#0E1A1F" strokeWidth="1" />
    </g>

    {/* Ground base */}
    <rect x="0" y="240" width="400" height="20" fill="#06303A" className="fill-sea-900" />
  </svg>
);

/**
 * Craft Textile Art
 * Al-Sadu / Bedouin artisanal weaving geometric motifs
 */
export const CraftTextileArt: React.FC<ArtProps> = ({
  className = 'w-full h-auto',
  width = 400,
  height = 260,
  ariaLabel = 'Illustration of traditional woven Red Sea textile patterns',
}) => (
  <svg
    viewBox="0 0 400 260"
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label={ariaLabel}
  >
    <rect width="400" height="260" fill="#FAF7F2" className="fill-paper-card dark:fill-deep-sea" />
    {/* Central deep band */}
    <rect x="0" y="40" width="400" height="180" fill="#06303A" className="fill-sea-900" />
    <rect x="0" y="70" width="400" height="120" fill="#E4573D" />

    {/* Repeating geometric diamond lozenges */}
    {Array.from({ length: 5 }).map((_, i) => {
      const cx = 40 + i * 80;
      return (
        <g key={i}>
          {/* Outer diamond */}
          <polygon
            points={`${cx},85 ${cx + 32},130 ${cx},175 ${cx - 32},130`}
            fill="#FAF7F2"
            stroke="#0E1A1F"
            strokeWidth="1.5"
          />
          {/* Inner diamond */}
          <polygon
            points={`${cx},100 ${cx + 20},130 ${cx},160 ${cx - 20},130`}
            fill="#B08D57"
          />
          {/* Center core */}
          <polygon
            points={`${cx},115 ${cx + 10},130 ${cx},145 ${cx - 10},130`}
            fill="#06303A"
          />
        </g>
      );
    })}

    {/* Border zig-zag stitch strips */}
    <path
      d="M0 48 L 10 42 L 20 48 L 30 42 L 40 48 L 50 42 L 60 48 L 70 42 L 80 48 L 90 42 L 100 48 L 110 42 L 120 48 L 130 42 L 140 48 L 150 42 L 160 48 L 170 42 L 180 48 L 190 42 L 200 48 L 210 42 L 220 48 L 230 42 L 240 48 L 250 42 L 260 48 L 270 42 L 280 48 L 290 42 L 300 48 L 310 42 L 320 48 L 330 42 L 340 48 L 350 42 L 360 48 L 370 42 L 380 48 L 390 42 L 400 48"
      stroke="#FAF7F2"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M0 212 L 10 218 L 20 212 L 30 218 L 40 212 L 50 218 L 60 212 L 70 218 L 80 212 L 90 218 L 100 212 L 110 218 L 120 212 L 130 218 L 140 212 L 150 218 L 160 212 L 170 218 L 180 212 L 190 218 L 200 212 L 210 218 L 220 212 L 230 218 L 240 212 L 250 218 L 260 212 L 270 218 L 280 212 L 290 218 L 300 212 L 310 218 L 320 212 L 330 218 L 340 212 L 350 218 L 360 212 L 370 218 L 380 212 L 390 218 L 400 212"
      stroke="#FAF7F2"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

/**
 * Fallback Hero Layered Illustration
 * Panoramic layered composition: dunes on horizon, gentle sea swells, dhow silhouette, underwater coral base
 */
export const HeroIllustrationFallback: React.FC<ArtProps> = ({
  className = 'w-full h-full object-cover',
  ariaLabel = 'Layered illustration of Red Sea rift basin panorama',
}) => (
  <svg
    viewBox="0 0 1440 600"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label={ariaLabel}
  >
    {/* Sky gradient background */}
    <rect width="1440" height="600" fill="#040E11" />
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#040E11" />
      <stop offset="60%" stopColor="#07222B" />
      <stop offset="100%" stopColor="#0F3845" />
    </linearGradient>
    <rect width="1440" height="380" fill="url(#skyGrad)" />

    {/* Dawn sun low on horizon */}
    <circle cx="980" cy="220" r="70" fill="#E4573D" opacity="0.85" />
    <circle cx="980" cy="220" r="90" stroke="#E4573D" strokeWidth="2" strokeDasharray="6 6" opacity="0.3" />

    {/* Distant desert coastal mountains (Sinai / Hijaz range) */}
    <path
      d="M0 290 L120 240 L260 270 L420 210 L580 265 L760 225 L920 255 L1100 200 L1280 245 L1440 215 L1440 380 L0 380 Z"
      fill="#1A3B45"
      opacity="0.8"
    />
    <path
      d="M0 310 L160 275 L340 300 L500 255 L680 290 L860 260 L1020 285 L1200 240 L1360 270 L1440 250 L1440 380 L0 380 Z"
      fill="#294F5A"
      opacity="0.6"
    />

    {/* Water surface line */}
    <rect x="0" y="340" width="1440" height="260" fill="#06303A" />
    <linearGradient id="seaGrad" x1="0" y1="340" x2="0" y2="600" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#094350" />
      <stop offset="40%" stopColor="#06303A" />
      <stop offset="100%" stopColor="#02151B" />
    </linearGradient>
    <rect x="0" y="340" width="1440" height="260" fill="url(#seaGrad)" />

    {/* Gentle surface swells */}
    <path
      d="M0 345 Q 180 338, 360 345 T 720 345 T 1080 345 T 1440 345"
      stroke="#1B8CA0"
      strokeWidth="2.5"
      fill="none"
      opacity="0.7"
    />
    <path
      d="M0 365 Q 140 358, 280 365 T 560 365 T 840 365 T 1120 365 T 1400 365"
      stroke="#3AB4CB"
      strokeWidth="1.5"
      fill="none"
      opacity="0.4"
    />

    {/* Silhouette Traditional Dhow Sailing (Right-Midground) */}
    <g transform="translate(980, 240)">
      <line x1="60" y1="10" x2="70" y2="105" stroke="#F7F3EC" strokeWidth="2.5" opacity="0.9" />
      <line x1="20" y1="5" x2="115" y2="98" stroke="#F7F3EC" strokeWidth="2" opacity="0.9" />
      {/* Sail */}
      <polygon points="22,7 112,96 70,98" fill="#F7F3EC" opacity="0.85" />
      {/* Hull */}
      <path
        d="M10 102 L 40 95 L 105 95 L 130 97 C 122 108, 100 112, 40 112 C 25 112, 15 108, 10 102 Z"
        fill="#F7F3EC"
        opacity="0.9"
      />
    </g>

    {/* Underwater Reef Silhouettes along the floor */}
    <g transform="translate(80, 480)" opacity="0.25">
      <ellipse cx="120" cy="100" rx="90" ry="35" fill="#1B8CA0" />
      <path d="M120 70 L 115 20 Q 112 5, 95 0 Q 105 10, 110 30 Z" fill="#3AB4CB" />
      <path d="M120 50 Q 135 25, 150 15 Q 140 25, 130 45 Z" fill="#3AB4CB" />
    </g>
    <g transform="translate(980, 460)" opacity="0.2">
      <ellipse cx="160" cy="110" rx="120" ry="40" fill="#1B8CA0" />
      <path d="M160 80 L 155 30 Q 150 10, 135 5 Q 145 15, 150 40 Z" fill="#3AB4CB" />
    </g>
  </svg>
);

/**
 * Wave Divider Component
 * Smooth curved SVG wave for seamless full-bleed transitions
 */
export const WaveDivider: React.FC<{
  fillColor?: string;
  flip?: boolean;
  className?: string;
}> = ({ fillColor = 'currentColor', flip = false, className = '' }) => (
  <div
    className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
    style={{ transform: flip ? 'rotate(180deg)' : undefined }}
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 1440 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-8 sm:h-12 block"
      preserveAspectRatio="none"
    >
      <path
        d="M0 48 C 320 0, 720 48, 1080 12 C 1260 -4, 1380 8, 1440 24 L 1440 48 L 0 48 Z"
        fill={fillColor}
      />
    </svg>
  </div>
);

/**
 * Contour Line Divider
 * Subtle bathymetric contour wave divider
 */
export const ContourDivider: React.FC<{
  strokeColor?: string;
  className?: string;
}> = ({ strokeColor = 'currentColor', className = '' }) => (
  <div className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`} aria-hidden="true">
    <svg
      viewBox="0 0 1440 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-6 block opacity-20"
      preserveAspectRatio="none"
    >
      <path
        d="M0 16 C 240 4, 480 28, 720 16 C 960 4, 1200 28, 1440 16"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <path
        d="M0 24 C 240 12, 480 36, 720 24 C 960 12, 1200 36, 1440 24"
        stroke={strokeColor}
        strokeWidth="1"
        strokeDasharray="4 4"
      />
    </svg>
  </div>
);
