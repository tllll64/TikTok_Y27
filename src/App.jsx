import { useState } from 'react';
import TikTokHome from './TikTokHome';
import phoneBezel from './assets/figma/phone-bezel.png';

const SLIDES = [
  { id: 0, label: '弹幕优化展示' },
  { id: 1, label: '页面 2' },
  { id: 2, label: '页面 3' },
  { id: 3, label: '页面 4' },
  { id: 4, label: '页面 5' },
  { id: 5, label: '页面 6' },
  { id: 6, label: '页面 7' },
  { id: 7, label: '页面 8' },
  { id: 8, label: '页面 9' },
  { id: 9, label: '页面 10' },
];

// Scale bezel so its screen cutout (402×874 in original 450×920) matches content (390×844) exactly.
// sx = 390/402, sy = 844/874
const BEZEL_W = Math.round(450 * 390 / 402);  // 437
const BEZEL_H = Math.round(920 * 844 / 874);  // 888
const CONTENT_X = Math.round(24 * 390 / 402); // 23  (left bezel margin scaled)
const CONTENT_Y = Math.round(23 * 844 / 874); // 22  (top bezel margin scaled)

function PhoneFrame({ children }) {
  return (
    <div style={{
      position: 'relative',
      width: BEZEL_W,
      height: BEZEL_H,
      flexShrink: 0,
    }}>
      {/* Screen content — sits exactly inside the scaled screen cutout */}
      <div style={{
        position: 'absolute',
        left: CONTENT_X,
        top: CONTENT_Y,
        width: 390,
        height: 844,
        overflow: 'hidden',
        borderRadius: 44,
      }}>
        {children}
      </div>

      {/* Bezel PNG — scaled to wrap content with zero gap */}
      <img
        src={phoneBezel}
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: BEZEL_W,
          height: BEZEL_H,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 50,
        }}
      />
    </div>
  );
}

function SlideNav({ current, onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      position: 'fixed',
      right: 32,
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14,
      zIndex: 200,
    }}>
      {SLIDES.map((slide) => {
        const isActive = current === slide.id;
        const isHovered = hovered === slide.id;
        return (
          <div
            key={slide.id}
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
            onMouseEnter={() => setHovered(slide.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Tooltip */}
            {isHovered && (
              <div style={{
                position: 'absolute',
                right: 20,
                whiteSpace: 'nowrap',
                background: 'rgba(0,0,0,0.75)',
                color: '#fff',
                fontSize: 12,
                fontFamily: '"PingFang SC", sans-serif',
                fontWeight: 500,
                padding: '5px 10px',
                borderRadius: 6,
                pointerEvents: 'none',
                backdropFilter: 'blur(4px)',
              }}>
                {slide.label}
                <span style={{
                  position: 'absolute',
                  right: -5,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 0, height: 0,
                  borderTop: '5px solid transparent',
                  borderBottom: '5px solid transparent',
                  borderLeft: '5px solid rgba(0,0,0,0.75)',
                }} />
              </div>
            )}
            {/* Dot */}
            <div
              onClick={() => onSelect(slide.id)}
              style={{
                width: isActive ? 10 : 8,
                height: isActive ? 10 : 8,
                borderRadius: '50%',
                background: isActive
                  ? '#fff'
                  : isHovered
                    ? 'rgba(255,255,255,0.8)'
                    : 'rgba(255,255,255,0.35)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 0 0 2px rgba(255,255,255,0.3)' : 'none',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const [current, setCurrent] = useState(0);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#111',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <PhoneFrame>
        {current === 0
          ? <TikTokHome />
          : (
            <div style={{
              width: 390, height: 844,
              background: '#1a1a1a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 12,
            }}>
              <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: 48 }}>
                {current + 1}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.15)', fontSize: 14, fontFamily: '"PingFang SC", sans-serif' }}>
                {SLIDES[current].label}
              </div>
            </div>
          )
        }
      </PhoneFrame>

      <SlideNav current={current} onSelect={setCurrent} />
    </div>
  );
}
