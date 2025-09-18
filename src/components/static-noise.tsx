export function StaticNoise() {
    return (
      <svg className="w-full h-full">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          ></feTurbulence>
          <feColorMatrix type="saturate" values="0"></feColorMatrix>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)"></rect>
        <style jsx>{`
          svg {
            opacity: 0.15;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            pointer-events: none;
            animation: flicker 0.15s infinite;
          }
          @keyframes flicker {
            0% { opacity: 0.15; }
            25% { opacity: 0.1; }
            50% { opacity: 0.2; }
            75% { opacity: 0.12; }
            100% { opacity: 0.15; }
          }
        `}</style>
      </svg>
    );
  }
  