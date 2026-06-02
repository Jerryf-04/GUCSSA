import React, { useState } from 'react';

interface GucssaLogoProps {
  className?: string;
  size?: number | string;
}

export default function GucssaLogo({ className = '', size = 56 }: GucssaLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  // If the remote image hasn't failed yet, try to render it.
  if (!imgFailed) {
    return (
      <img
        src="https://drive.google.com/thumbnail?id=1SPOHcVtrTU2dzbMKdhzaN50amHNKe0i2&sz=w1000"
        alt="GU CSSA Logo"
        style={{ width: size, height: size }}
        className={`object-contain filter drop-shadow select-none pointer-events-none ${className}`}
        onError={() => {
          console.warn("GU CSSA remote logo thumbnail URL failed. Trying secondary direct link.");
          // Try standard drive uc link as secondary
          const img = document.querySelector(`img[alt="GU CSSA Logo"]`) as HTMLImageElement | null;
          if (img && !img.src.includes('lh3.googleusercontent.com')) {
            img.src = "https://lh3.googleusercontent.com/d/1SPOHcVtrTU2dzbMKdhzaN50amHNKe0i2";
          } else {
            setImgFailed(true);
          }
        }}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Symmetrical and high-contrast Georgetown spire + classical Chinese palace architecture line-art
  return (
    <div 
      style={{ width: size, height: size }} 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
    >
      <svg 
        viewBox="0 0 400 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full text-white"
      >
        {/* Top-most elegant traditional cloud curls (Dougong structure) */}
        <path
          d="M200 78 C250 78, 275 110, 245 125 C230 132, 215 120, 200 120 C185 120, 170 132, 155 125 C125 110, 150 78, 200 78 Z"
          fill="currentColor"
        />
        <path
          d="M138 90 C155 75, 185 85, 185 105 C185 115, 170 122, 160 122 C145 122, 130 105, 138 90 Z"
          fill="currentColor"
        />
        <path
          d="M262 90 C245 75, 215 85, 215 105 C215 115, 230 122, 240 122 C255 122, 270 105, 262 90 Z"
          fill="currentColor"
        />

        {/* First sweeping horizontal roof curve (Eaves) */}
        <path
          d="M118 135 C160 142, 240 142, 282 135 C284 145, 255 152, 200 152 C145 152, 116 145, 118 135 Z"
          fill="currentColor"
        />

        {/* Second sweeping horizontal beam */}
        <path
          d="M125 160 C165 168, 235 168, 275 160 C277 169, 250 176, 200 176 C150 176, 123 169, 125 160 Z"
          fill="currentColor"
        />

        {/* Third sweeping horizontal beam */}
        <path
          d="M130 185 C170 193, 230 193, 270 185 C272 193, 245 200, 200 200 C155 200, 128 193, 130 185 Z"
          fill="currentColor"
        />

        {/* Central main pillars and traditional moon-gate archway */}
        <path
          d="M120 205 L280 205 C275 220, 260 245, 265 248 C255 248, 245 230, 200 230 C155 230, 145 248, 135 248 C140 245, 125 220, 120 205 Z"
          fill="currentColor"
        />
        
        {/* Supporting massive walls & Moon Gate with curved interior and flaring bases */}
        <path
          d="M113 248 C125 248, 135 238, 142 225 L258 225 C265 238, 275 248, 287 248 C287 248, 298 215, 292 205 C292 205, 245 210, 200 210 C155 210, 108 205, 108 205 C102 215, 113 248, 113 248 Z"
          fill="currentColor"
        />
        <path
          d="M135 248 L152 288 C152 288, 168 288, 172 288 C158 266, 175 248, 200 248 C225 248, 242 266, 228 288 C232 288, 248 288, 248 288 L265 248 C265 248, 245 254, 200 254 C155 254, 135 248, 135 248 Z"
          fill="currentColor"
        />

        {/* Central Bi-disk centered ring */}
        <circle cx="200" cy="272" r="18" fill="currentColor" />
        <circle cx="200" cy="272" r="6" fill="#12213a" />

        {/* Hanging ornaments */}
        <path d="M110 148 L104 158 H112 Z" fill="currentColor" opacity="0.9" />
        <path d="M290 148 L296 158 H288 Z" fill="currentColor" opacity="0.9" />

        {/* Vector text layout for "GU CSSA" to ensure sharp, independent rendering */}
        {/* G of GU */}
        <path
          d="M118 340 C110 340, 104 330, 104 316 C104 300, 114 290, 126 290 C136 290, 142 296, 142 305 L133 306 C133 301, 130 297, 125 297 C120 297, 112 304, 112 316 C112 328, 118 333, 124 333 C128 333, 131 329, 131 322 L124 322 L124 316 L141 316 L141 322 C141 334, 133 340, 118 340 Z"
          fill="currentColor"
        />
        {/* U of GU */}
        <path
          d="M152 292 L160 292 L160 324 C160 331, 166 335, 172 335 C178 335, 184 331, 184 324 L184 292 L192 292 L192 324 C192 336, 182 342, 172 342 C162 342, 152 336, 152 324 L152 292 Z"
          fill="currentColor"
        />

        {/* C of CSSA */}
        <path
          d="M216 334 C210 334, 204 328, 204 316 C204 304, 210 298, 216 298 C222 298, 226 302, 227 307 L235 306 C234 297, 226 292, 216 292 C202 292, 194 302, 194 316 C194 330, 202 340, 216 340 C226 340, 234 335, 235 326 L227 325 C226 330, 222 334, 216 334 Z"
          fill="currentColor"
        />
        {/* S of CSSA */}
        <path
          d="M245 330 M245 334 C252 340, 264 340, 264 332 C264 326, 258 322, 250 319 C242 316, 240 312, 240 306 C240 298, 248 292, 258 292 C266 292, 272 296, 274 302 L266 304 C265 300, 262 298, 258 298 C252 298, 248 301, 248 306 C248 310, 252 313, 260 316 C268 319, 272 323, 272 331 C272 339, 263 346, 252 346 C244 346, 238 341, 236 335 L245 334 Z"
          fill="currentColor"
        />
        {/* S of CSSA */}
        <path
          d="M281 330 M281 334 C288 340, 300 340, 300 332 C300 326, 294 322, 286 319 C278 316, 276 312, 276 306 C276 298, 284 292, 294 292 C302 292, 308 296, 310 302 L302 304 C301 300, 298 298, 294 298 C288 298, 284 301, 284 306 C284 310, 288 313, 296 316 C304 319, 308 323, 308 331 C308 339, 299 346, 288 346 C280 346, 274 341, 272 335 L281 334 Z"
          fill="currentColor"
        />
        {/* A of CSSA */}
        <path
          d="M326 292 L315 340 L324 340 L327 326 L343 326 L346 340 L355 340 L344 292 L326 292 Z M329 318 L335 298 L341 318 H329 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

