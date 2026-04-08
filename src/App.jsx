import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TikTokHome from './TikTokHome';
import phoneBezel from './assets/figma/phone-bezel.png';
import tiktokLogo from './assets/figma/tiktok-logo.png';
import popoverFollowSendSvg from './assets/figma/popover-followsend.svg';
import slide6TooltipImg from './assets/figma/6d097609b258bdc99e1d20a9c4a1650bd265a6d7.png';
import slide6LineImg from './assets/figma/9bfd7f9a50fa089902aaea3ceeeb3b2cf615f0ac.svg';
import DEMOS from './demoConfig';

// Eagerly load all assets across figma/, video/, avatar/
const FIGMA_ASSETS = import.meta.glob('./assets/figma/*', { eager: true });
const VIDEO_ASSETS = import.meta.glob('./assets/video/*', { eager: true });
const AVATAR_ASSETS = import.meta.glob('./assets/avatar/*', { eager: true });

function videoAsset(filename) {
  if (!filename) return null;
  if (filename.startsWith('http')) return filename;
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
const PHONE_SCALE = 0.75; // demo display scale
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

// ── Demo annotations (arrows + labels outside the phone bezel) ───────────────
// yInPhone: y coordinate in the 390×844 phone screen space
// side: 'left' | 'right'
const ANNOTATION_GAP = 14; // px gap between bezel edge and arrow tip

const ANNOTATION_ICON_COMPONENTS = {
  followsend: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.65 }}>
      <path d="M4.88381 7.86537C4.88381 10.3523 6.89424 12.3684 9.37423 12.3684C11.8542 12.3684 13.8646 10.3523 13.8646 7.86537C13.8646 5.37844 11.8542 3.36239 9.37423 3.36239C6.89424 3.36239 4.88381 5.37844 4.88381 7.86537Z" fill="white"/>
      <path d="M20.0898 3.26702C19.1328 3.13341 18.2481 3.80117 18.1143 4.75823C17.7806 7.14403 17.1904 8.87853 16.3027 10.2992C15.7926 11.1157 15.1606 11.8658 14.3675 12.5955C14.096 12.8453 13.7453 12.9827 13.4043 13.1235C12.468 13.5098 11.3585 13.8553 10.1621 14.0053C9.17255 14.1293 8.2205 14.1791 7.37402 14.1869C5.43927 14.2048 3.59584 15.3412 2.98535 17.1772L2.02734 20.059C1.81227 20.7063 2.2944 21.3744 2.97656 21.3744H16.7393C17.3568 21.3742 17.8267 20.8196 17.7256 20.2104L17.4865 18.7712C17.1001 16.4453 18.0211 14.1532 19.2705 12.1537C20.4882 10.2047 21.2003 7.96505 21.581 5.2426C21.7148 4.28549 21.047 3.40085 20.0898 3.26702Z" fill="white"/>
    </svg>
  ),
};

function DemoAnnotation({ text, side, yInPhone, icon }) {
  const containerTop = CONTENT_Y * PHONE_SCALE + yInPhone * PHONE_SCALE;
  const bezelW = BEZEL_W * PHONE_SCALE;

  const labelStyle = {
    fontFamily: '"PingFang SC", sans-serif',
    fontSize: 13,
    fontWeight: 400,
    color: 'rgba(255,255,255,0.65)',
    whiteSpace: 'pre',
    lineHeight: 1.6,
  };

  const Arrow = ({ dir }) => (
    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" style={{ flexShrink: 0 }}>
      {dir === 'left'
        ? <path d="M6 1L1 5.5L6 10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        : <path d="M1 1L6 5.5L1 10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      }
    </svg>
  );

  const IconComp = icon && ANNOTATION_ICON_COMPONENTS[icon];
  const IconEl = IconComp ? <IconComp /> : null;

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, delay: 0.28, ease: 'easeOut' },
  };

  if (side === 'right') {
    return (
      <motion.div {...fadeIn} style={{
        position: 'absolute',
        left: bezelW + ANNOTATION_GAP,
        top: containerTop,
        transform: 'translateY(-50%)',
        display: 'flex', alignItems: 'center', gap: 6,
        pointerEvents: 'none',
      }}>
        <Arrow dir="left" />
        <span style={labelStyle}>{text}</span>
        {IconEl}
      </motion.div>
    );
  }
  return (
    <motion.div {...fadeIn} style={{
      position: 'absolute',
      right: bezelW + ANNOTATION_GAP,
      top: containerTop,
      transform: 'translateY(-50%)',
      display: 'flex', alignItems: 'center', gap: 6,
      pointerEvents: 'none',
    }}>
      <span style={labelStyle}>{text}</span>
      {IconEl}
      <Arrow dir="right" />
    </motion.div>
  );
}

// ── Slide left info panel ─────────────────────────────────────────────────────
function SlideInfoPanel({ tag, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.22, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        left: 80,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        maxWidth: 420,
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
      {/* Tag pill */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px 14px',
        border: '1.5px solid rgba(255,255,255,0.4)',
        borderRadius: 20,
        width: 'fit-content',
      }}>
        <span style={{
          fontFamily: '"PingFang SC", sans-serif',
          fontSize: 13,
          fontWeight: 400,
          color: '#FFFFFF',
          lineHeight: 'normal',
        }}>
          {tag}
        </span>
      </div>

      {/* Title */}
      <div style={{
        fontFamily: '"PingFang SC", sans-serif',
        fontSize: 32,
        fontWeight: 600,
        color: '#FFFFFF',
        lineHeight: 1.4,
        whiteSpace: 'pre-line',
      }}>
        {title}
      </div>

      {/* Description */}
      <div style={{
        fontFamily: '"PingFang SC", sans-serif',
        fontSize: 15,
        fontWeight: 400,
        color: 'rgba(255,255,255,0.55)',
        lineHeight: 1.8,
        whiteSpace: 'pre-line',
      }}>
        {description}
      </div>
    </motion.div>
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
      const leftWidth = window.innerWidth - margin * 2 - BEZEL_W * PHONE_SCALE - PANEL_PHONE_GAP;
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
      position: 'relative',
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

      {/* Phone at scaled size */}
      <div style={{ flexShrink: 0, width: BEZEL_W * PHONE_SCALE, height: BEZEL_H * PHONE_SCALE }}>
        <div style={{ transform: `scale(${PHONE_SCALE})`, transformOrigin: 'top left', width: BEZEL_W, height: BEZEL_H }}>
          {children}
        </div>
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
  if (demo) {
    return (
      <TikTokHome
        key={`slide-${current}`}
        videoSrc={demo.video ? videoAsset(demo.video) : null}
        avatarSrc={avatarAsset(demo.avatar)}
        username={demo.username}
        description={demo.description}
        captionOffset={demo.captionOffset ?? 0}
        presetDanmakus={demo.danmakus ?? []}
        bgTexts={demo.bgTexts}
        bgColor={demo.bgColor}
        centerLogo={demo.centerLogo ? tiktokLogo : undefined}
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

// ── Figma embed slide ─────────────────────────────────────────────────────────
const FIGMA_EMBED_URL = 'https://www.figma.com/embed?embed_host=share&url=' +
  encodeURIComponent('https://www.figma.com/proto/H9iUsuS0iyuVoEVjVb2KIU/Y27-TikTok?node-id=1-2952&p=f&viewport=161%2C200%2C0.38&t=bxPDvzOrgbWUIJWV-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1');

function FigmaSlide() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div style={{
      width: '100vw', height: '100vh', background: '#111',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Figma iframe — centered, no tag */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.22, ease: 'easeOut' }}
        style={{ width: '76.8vw', height: '96vh', position: 'relative' }}
      >
          <iframe
            src={FIGMA_EMBED_URL}
            onLoad={() => setIframeLoaded(true)}
            style={{
              width: '100%', height: '100%',
              border: 'none', borderRadius: 12,
            }}
            allowFullScreen
          />
          {/* Loading overlay — covers iframe until it loads */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: iframeLoaded ? 0 : 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              position: 'absolute', inset: 0,
              background: '#111', borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: iframeLoaded ? 'none' : 'auto',
            }}
          >
            <span style={{
              fontFamily: '"PingFang SC", sans-serif',
              fontSize: 14, fontWeight: 400,
              color: 'rgba(255,255,255,0.35)',
            }}>等待内容加载</span>
          </motion.div>
      </motion.div>
    </div>
  );
}

// ── Slide transition variants ─────────────────────────────────────────────────
const SLIDE_VARIANTS = {
  enter: (dir) => ({ y: dir > 0 ? '100%' : '-100%' }),
  center: { y: 0 },
  exit:  (dir) => ({ y: dir > 0 ? '-100%' : '100%' }),
};
const SLIDE_TRANSITION = {
  y: { type: 'tween', duration: 0.48, ease: [0.32, 0.72, 0, 1] },
};

export default function App() {
  // 放在组件内，确保 demoConfig.js 热更新后 label 能同步刷新
  const DEMO_MAP = Object.fromEntries(DEMOS.map(d => [d.slide, d]));
  const SLIDES = [0, 2, 3, 4, 5, 6, 7, 1].map(i => ({
    id: i,
    label: DEMO_MAP[i]?.label ?? (i === 0 ? '弹幕玩法说明' : i === 1 ? '设计说明文档' : `页面 ${i + 1}`),
  }));

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  // Refs for scroll handling (stable across renders)
  const lockRef      = useRef(false);
  const scrollAccRef = useRef(0);
  const slidesRef    = useRef(SLIDES);
  const currentRef   = useRef(current);
  useEffect(() => { slidesRef.current = SLIDES; });
  useEffect(() => { currentRef.current = current; }, [current]);

  // Navigate via index offset (+1 next / -1 prev)
  function navigateSlide(dir) {
    const slides = slidesRef.current;
    const idx    = slides.findIndex(s => s.id === currentRef.current);
    const next   = idx + dir;
    if (next < 0 || next >= slides.length) { scrollAccRef.current = 0; return; }
    lockRef.current = true;
    // 导航后将累积量设为反向缓冲，防止 lock 解除后残余动量立即再次触发
    scrollAccRef.current = dir > 0 ? -30 : 30;
    setDirection(dir);
    setCurrent(slides[next].id);
    setTimeout(() => { lockRef.current = false; scrollAccRef.current = 0; }, 900);
  }

  // Wheel / trackpad scroll listener
  useEffect(() => {
    const THRESHOLD = 120; // 提高阈值，避免鼠标滚轮单次触发双翻页
    const onWheel = (e) => {
      e.preventDefault();
      if (lockRef.current) { scrollAccRef.current = 0; return; }
      scrollAccRef.current += e.deltaY;
      if (scrollAccRef.current >  THRESHOLD) navigateSlide( 1);
      if (scrollAccRef.current < -THRESHOLD) navigateSlide(-1);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Nav dot click — set direction based on relative position
  function handleSelect(id) {
    const slides   = slidesRef.current;
    const currIdx  = slides.findIndex(s => s.id === currentRef.current);
    const nextIdx  = slides.findIndex(s => s.id === id);
    const dir      = nextIdx > currIdx ? 1 : -1;
    lockRef.current      = true;
    scrollAccRef.current = 0;
    setDirection(dir);
    setCurrent(id);
    setTimeout(() => { lockRef.current = false; }, 600);
  }

  const isFigmaSlide = current === 1;
  const demo         = DEMO_MAP[current];
  const hasLeftPanel = demo?.leftPanel === true;
  const phoneContent = <PhoneContent current={current} demo={demo} slides={SLIDES} />;

  return (
    <>
      {/* Fixed viewport clip so exiting slides don't cause scrollbars */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: hasLeftPanel ? '#000' : '#111' }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={SLIDE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={SLIDE_TRANSITION}
            style={{ position: 'absolute', inset: 0, willChange: 'transform' }}
          >
            {isFigmaSlide ? (
              <FigmaSlide />
            ) : hasLeftPanel ? (
              <FullSlide leftPanel={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.22, ease: 'easeOut' }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <Slide6LeftPanel />
                </motion.div>
              }>
                <PhoneFrame>{phoneContent}</PhoneFrame>
              </FullSlide>
            ) : (
              <div style={{
                width: '100vw', height: '100vh', background: '#111',
                display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                paddingRight: `calc(33.33vw - ${Math.round(BEZEL_W * PHONE_SCALE / 2)}px)`,
                position: 'relative',
                overflow: 'hidden',
              }}>
                {demo?.info && (
                  <SlideInfoPanel
                    tag={demo.info.tag}
                    title={demo.info.title}
                    description={demo.info.description}
                  />
                )}
                <div style={{ position: 'relative', width: BEZEL_W * PHONE_SCALE, height: BEZEL_H * PHONE_SCALE, flexShrink: 0, overflow: 'visible' }}>
                  <div style={{ transform: `scale(${PHONE_SCALE})`, transformOrigin: 'top left', width: BEZEL_W, height: BEZEL_H }}>
                    <PhoneFrame>{phoneContent}</PhoneFrame>
                  </div>
                  {demo?.annotations?.map((ann, i) => (
                    <DemoAnnotation key={i} text={ann.text} side={ann.side} yInPhone={ann.yInPhone} icon={ann.icon} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>

        </AnimatePresence>
      </div>

      {/* Nav dots — rendered above the animated layer */}
      <SlideNav current={current} onSelect={handleSelect} slides={SLIDES} />

      {/* 页面加载时预缓冲所有视频，用户翻页时已就绪 */}
      {DEMOS.filter(d => d.video).map(d => {
        const url = videoAsset(d.video);
        if (!url) return null;
        return (
          <video
            key={url}
            src={url}
            preload="auto"
            muted
            playsInline
            style={{ display: 'none', position: 'absolute', pointerEvents: 'none' }}
          />
        );
      })}
    </>
  );
}
