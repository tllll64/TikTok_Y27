import { useState, useEffect, useRef } from 'react';
import TikTokHome from './TikTokHome';
import phoneBezel from './assets/figma/phone-bezel.png';
import slide6TooltipImg from './assets/figma/6d097609b258bdc99e1d20a9c4a1650bd265a6d7.png';
import slide6LineImg from './assets/figma/9bfd7f9a50fa089902aaea3ceeeb3b2cf615f0ac.svg';
import DEMOS from './demoConfig';

// Eagerly load all assets across figma/, video/, avatar/
const FIGMA_ASSETS = import.meta.glob('./assets/figma/*', { eager: true });
const VIDEO_ASSETS = import.meta.glob('./assets/video/*', { eager: true });
const AVATAR_ASSETS = import.meta.glob('./assets/avatar/*', { eager: true });

function videoAsset(filename) {
  const mod = VIDEO_ASSETS[`./assets/video/${filename}`]
    ?? FIGMA_ASSETS[`./assets/figma/${filename}`];
  return mod ? mod.default : null;
}
function avatarAsset(filename) {
  const mod = AVATAR_ASSETS[`./assets/avatar/${filename}`]
    ?? FIGMA_ASSETS[`./assets/figma/${filename}`];
  return mod ? mod.default : null;
}


// Scale bezel so its screen cutout (402×874 in original 450×920) matches content (390×844) exactly.
const BEZEL_W = Math.round(450 * 390 / 402);
const BEZEL_H = Math.round(920 * 844 / 874);
const CONTENT_X = Math.round(24 * 390 / 402);
const CONTENT_Y = Math.round(23 * 844 / 874);

// Reference slide canvas: 1920 × 1080
// Phone in Figma: bezel-top-left at x≈1149, y≈105 (account for -10px bezel bleed)
const SLIDE_W = 1920;
const SLIDE_H = 1080;
// Left edge of the bezel so the 390px screen aligns with Figma's screen area (x=1160)
const PHONE_LEFT = 1160 - CONTENT_X;    // ≈ 1137
const PHONE_TOP  = Math.round((SLIDE_H - BEZEL_H) / 2); // vertically centered ≈ 96

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

// ── Slide-6 left panel ────────────────────────────────────────────────────────
// Coordinates are in the 1920×1080 reference space; the parent scales via CSS.
function Slide6LeftPanel() {
  return (
    <>
      {/* ── Text block: title + description ── */}
      <div style={{
        position: 'absolute',
        left: 231,
        top: 339,
        width: 620,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}>
        {/* Title */}
        <div style={{
          fontFamily: '"PingFang SC", sans-serif',
          fontWeight: 400,
          fontSize: 40,
          color: '#FFFFFF',
          lineHeight: 1.6,
          whiteSpace: 'pre-line',
        }}>
          {'弹幕跟发，\n基于已有的优质表达快速二创'}
        </div>
        {/* Description */}
        <div style={{
          fontFamily: '"PingFang SC", sans-serif',
          fontWeight: 400,
          fontSize: 20,
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.6,
          whiteSpace: 'pre-line',
        }}>
          {'点击弹幕，tooltip 中新增 "跟发" 功能，聚合复制粘贴功能。\n点击功能后，弹幕文本被快速复制到弹幕面板输入框中，方便再编辑。'}
        </div>
      </div>

      {/* ── Tooltip UI screenshot ── */}
      <img
        src={slide6TooltipImg}
        alt="弹幕跟发 tooltip 示意"
        draggable={false}
        style={{
          position: 'absolute',
          left: 249,
          top: 614,
          width: 484,
          height: 229.5,
          objectFit: 'cover',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* ── Teal gradient accent ── */}
      <div style={{
        position: 'absolute',
        left: 394,
        top: 773,
        width: 67.5,
        height: 40,
        background: 'linear-gradient(to bottom, rgba(4,95,106,0), rgba(7,186,208,0.5))',
      }} />

      {/* ── Horizontal line accent ── */}
      <img
        src={slide6LineImg}
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          left: 395,
          top: 813,
          width: 66,
          height: 2,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    </>
  );
}

// ── Full-slide wrapper ────────────────────────────────────────────────────────
// Phone stays at natural size; left panel scales to fit; the pair is centred.
// LEFT_PANEL_CLIP: clip right edge of panel at this x in reference space.
// All visible content (title x=231+620=851, image x=249+484=733) fits within 880px.
const PANEL_PHONE_GAP = 60;
const LEFT_PANEL_CLIP = 880; // reference px — trims empty space right of content

function FullSlide({ leftPanel, children }) {
  const [panelScale, setPanelScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const margin = 40;
      const leftWidth = window.innerWidth - margin * 2 - BEZEL_W - PANEL_PHONE_GAP;
      const s = Math.min(
        leftWidth / LEFT_PANEL_CLIP,
        window.innerHeight / SLIDE_H,
      );
      setPanelScale(Math.max(0.3, s));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const scaledW = Math.round(LEFT_PANEL_CLIP * panelScale);
  const scaledH = Math.round(SLIDE_H * panelScale);

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: PANEL_PHONE_GAP,
      overflow: 'hidden',
    }}>
      {/* Left panel — clipped to LEFT_PANEL_CLIP so the pair centres correctly */}
      <div style={{
        width: scaledW, height: scaledH,
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', width: PHONE_LEFT, height: SLIDE_H,
          transform: `scale(${panelScale})`, transformOrigin: 'top left',
        }}>
          {leftPanel}
        </div>
      </div>

      {/* Phone at natural size */}
      <div style={{ flexShrink: 0 }}>
        {children}
      </div>
    </div>
  );
}

function SlideNav({ current, onSelect, slides }) {
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
      {slides.map((slide, index) => {
        const isActive = current === slide.id;
        const isHovered = hovered === slide.id;
        let distance = 0;
        if (hovered !== null) {
          const hoveredIndex = slides.findIndex(s => s.id === hovered);
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

function PhoneContent({ current, demo, slides }) {
  if (current === 0) return <TikTokHome key="slide-0" />;
  if (demo) {
    return (
      <TikTokHome
        key={`slide-${current}`}
        videoSrc={videoAsset(demo.video)}
        avatarSrc={avatarAsset(demo.avatar)}
        username={demo.username}
        description={demo.description}
        captionOffset={demo.captionOffset ?? 0}
        presetDanmakus={demo.danmakus ?? []}
        bgTexts={demo.bgTexts}
        videoFit={demo.videoFit ?? 'cover'}
        videoScale={demo.videoScale ?? 1}
        videoOffsetY={demo.videoOffsetY ?? 0}
        plusOneTextSet={new Set((demo.danmakus ?? []).filter(d => d.plusOne).map(d => d.text))}
        disclaimerMaskHeight={demo.disclaimerMaskHeight ?? 0}
        syncRows={demo.syncRows ?? false}
        emojiFloat={demo.emojiFloat ?? false}
        kiteDanmaku={demo.kiteDanmaku ?? false}
        disableCounter={demo.disableCounter ?? false}
        willowLeaf={demo.willowLeaf ?? false}
      />
    );
  }
  return (
    <div style={{
      width: 390, height: 844, background: '#1a1a1a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 12,
    }}>
      <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: 48 }}>{current + 1}</div>
      <div style={{ color: 'rgba(255,255,255,0.15)', fontSize: 14, fontFamily: '"PingFang SC", sans-serif' }}>
        {slides.find(s => s.id === current)?.label}
      </div>
    </div>
  );
}

export default function App() {
  // 放在组件内，确保 demoConfig.js 热更新后 label 能同步刷新
  const DEMO_MAP = Object.fromEntries(DEMOS.map(d => [d.slide, d]));
  const SLIDES = [0, 6, 7, 8, 9, 10, 11].map(i => ({
    id: i,
    label: DEMO_MAP[i]?.label ?? (i === 0 ? '弹幕优化展示' : `页面 ${i + 1}`),
  }));

  const [current, setCurrent] = useState(0);
  const demo = DEMO_MAP[current];

  // Slides that use the full 1920×1080 layout with a left panel
  const hasLeftPanel = demo?.leftPanel === true;

  const phoneContent = <PhoneContent current={current} demo={demo} slides={SLIDES} />;

  return (
    <>
      {hasLeftPanel ? (
        <FullSlide leftPanel={<Slide6LeftPanel />}>
          <PhoneFrame>{phoneContent}</PhoneFrame>
        </FullSlide>
      ) : (
        <div style={{
          minHeight: '100vh', background: '#111',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <PhoneFrame>{phoneContent}</PhoneFrame>
        </div>
      )}
      <SlideNav current={current} onSelect={setCurrent} slides={SLIDES} />
    </>
  );
}
