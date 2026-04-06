import { useState } from 'react';
import TikTokHome from './TikTokHome';
import phoneBezel from './assets/figma/phone-bezel.png';
import DEMOS from './demoConfig';

// Eagerly load all assets in figma/ so we can look them up by filename at runtime
const FIGMA_ASSETS = import.meta.glob('./assets/figma/*', { eager: true });
function asset(filename) {
  const mod = FIGMA_ASSETS[`./assets/figma/${filename}`];
  return mod ? mod.default : null;
}

// Build SLIDES array — demo pages get their label from demoConfig, others get a default
const DEMO_MAP = Object.fromEntries(DEMOS.map(d => [d.slide, d]));

const SLIDES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  label: DEMO_MAP[i]?.label ?? (i === 0 ? '弹幕优化展示' : `页面 ${i + 1}`),
}));

// Scale bezel so its screen cutout (402×874 in original 450×920) matches content (390×844) exactly.
const BEZEL_W = Math.round(450 * 390 / 402);
const BEZEL_H = Math.round(920 * 844 / 874);
const CONTENT_X = Math.round(24 * 390 / 402);
const CONTENT_Y = Math.round(23 * 844 / 874);

function PhoneFrame({ children }) {
  return (
    <div style={{ position: 'relative', width: BEZEL_W, height: BEZEL_H, flexShrink: 0 }}>
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
      <img
        src={phoneBezel}
        alt=""
        draggable={false}
        style={{
          position: 'absolute', left: 0, top: 0,
          width: BEZEL_W, height: BEZEL_H,
          pointerEvents: 'none', userSelect: 'none', zIndex: 50,
        }}
      />
    </div>
  );
}

function SlideNav({ current, onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        position: 'fixed', right: 32, top: '50%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 14, zIndex: 200,
      }}
      onMouseLeave={() => setHovered(null)}
    >
      {SLIDES.map((slide, index) => {
        const isActive = current === slide.id;
        const isHovered = hovered === slide.id;
        let distance = 0;
        if (hovered !== null) {
          const hoveredIndex = SLIDES.findIndex(s => s.id === hovered);
          distance = Math.abs(index - hoveredIndex);
        }
        let size = isActive ? 10 : 8;
        if (hovered !== null) {
          if (isHovered) size = 14;
          else if (distance <= 2) size = 6 - (distance - 1) * 2;
          else size = 4;
        }

        return (
          <div
            key={slide.id}
            style={{
              position: 'relative', display: 'flex', alignItems: 'center',
              justifyContent: 'center', width: 20, height: 20,
            }}
            onMouseEnter={() => setHovered(slide.id)}
          >
            {isHovered && (
              <div style={{
                position: 'absolute', right: 28, whiteSpace: 'nowrap',
                background: 'rgba(0,0,0,0.85)', color: '#fff',
                fontSize: 14, fontFamily: '"PingFang SC", sans-serif', fontWeight: 600,
                padding: '8px 14px', borderRadius: 8, pointerEvents: 'none',
                backdropFilter: 'blur(4px)', transform: 'scale(1.1)',
                transformOrigin: 'right center',
                transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              }}>
                {slide.label}
                <span style={{
                  position: 'absolute', right: -6, top: '50%',
                  transform: 'translateY(-50%)', width: 0, height: 0,
                  borderTop: '6px solid transparent', borderBottom: '6px solid transparent',
                  borderLeft: '6px solid rgba(0,0,0,0.85)',
                }} />
              </div>
            )}
            <div
              onClick={() => onSelect(slide.id)}
              style={{
                width: size, height: size, borderRadius: '50%',
                background: isActive ? '#fff' : isHovered ? '#fff' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                boxShadow: isActive && !isHovered ? '0 0 0 2px rgba(255,255,255,0.3)' : 'none',
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
  const demo = DEMO_MAP[current];

  return (
    <div style={{
      minHeight: '100vh', background: '#111',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <PhoneFrame>
        {current === 0
          ? <TikTokHome key="slide-0" />
          : demo
          ? (
            <TikTokHome
              key={`slide-${current}`}
              videoSrc={asset(demo.video)}
              avatarSrc={asset(demo.avatar)}
              username={demo.username}
              description={demo.description}
              captionOffset={demo.captionOffset ?? 0}
              presetDanmakus={demo.danmakus ?? []}
              bgTexts={demo.bgTexts}
              videoFit={demo.videoFit ?? 'cover'}
              plusOneTextSet={new Set((demo.danmakus ?? []).filter(d => d.plusOne).map(d => d.text))}
            />
          )
          : (
            <div style={{
              width: 390, height: 844, background: '#1a1a1a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 12,
            }}>
              <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: 48 }}>{current + 1}</div>
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
