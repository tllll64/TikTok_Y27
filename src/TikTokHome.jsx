import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bgVideo from './assets/figma/bg-video.mp4';

// Asset constants — locally cached from Figma MCP
import _imgGroup1312317958 from './assets/figma/7fd19a188b1c68897a7b7cafeb56a73db0d56800.svg';
import _imgGroup1312317959 from './assets/figma/0c074dfb3d4a2f2dcfb07c816713f717420942cd.svg';
import _imgRectangle51082 from './assets/figma/38bf8ea1555aaf8346df82a7f1a2be862a3f3429.svg';
import _imgLike from './assets/figma/638b1de3c5735b01b7590ac797dec932af9f7224.svg';
import _imgIcon from './assets/figma/b1c77d662827b678d8e9ec732a38c85922e577d2.svg';
import _imgIconShare from './assets/figma/92f6f5496bf6f97b736e600c41b2573926d6e9b7.svg';
import _imgTabDot from './assets/figma/050316ca032489822bcc250fd15b1f1e4895d48d.svg';
import _imgUnion from './assets/figma/7987eed9a1d682b681f7f7ed777235451e63af5b.svg';
import _imgFrame1312317869 from './assets/figma/bc2b8d158888f71fa6da1810992bc0a594ec709b.svg';
import _imgRedDotAlt from './assets/figma/3abd3c1fa6b2fda41d3ae287cfc3867a936d40f4.svg';
import _imgRedDotMaterial from './assets/figma/a82884b7167a5861cf5ed33f390efa13a2afcbd1.svg';
import _imgThreelines from './assets/figma/c21f56a4eb3a7bff0384ea78486fd7fbb118ddc6.svg';
import _imgBattery from './assets/figma/c27d8a32f1ef5d94381a8d4e34968d230ef3c82f.svg';
import _imgWifi from './assets/figma/2ee468c35d482ca3e7afeed37b3d22870a31f071.svg';
import _imgCellularConnection from './assets/figma/ac5af9387536043e2305a93f3b16b2ac6ea144a5.svg';
import _imgBatteryDark from './assets/figma/7c4699faf41fe973c1d53296489afecb74e49973.svg';
import _imgWifiDark from './assets/figma/3115b9692386fc03ab1f6c80090923daaf76c7a1.svg';
import _imgCellularDark from './assets/figma/ca6241727fea01611e04eb11c957541ff1c1db42.svg';
import _imgMaskBottom from './assets/figma/6d7ae673715ccd4aa4dfe868d8a8eb4a70ac2530.svg';
import _imgBg from './assets/figma/559a19b3d7e449c0ddf0918f2b4c4d2efeb99369.png';
import _imgVideoFrame from './assets/figma/d3673f772da08fb537ff195a1aebe0ec64a19f2d.png';
import _imgCd from './assets/figma/bc85e29da692f889aa9ead5ad86cb64adc4573fe.png';
import _imgMusicAlbum from './assets/figma/c35a05ad50aa8c32ed23b992168090216097175c.png';
import _imgAvatar from './assets/figma/9f8f7487fce5713e6ac8ed9965f49fdef41eeb9a.png';
import _imgAvatar1 from './assets/figma/943217ce82bc4d9ae1c32be0b8c38a641789b913.png';
import _imgSearch from './assets/figma/053df630afa80cf14d5f67f1bf24eb0e7b8ace79.svg';
import _imgMusic from './assets/figma/1cacb78552ad185b8eaa0f495dbaa923f41526a8.svg';
import _imgComment from './assets/figma/a2f984a7878475b42f21e52d86a00b8e65ec3e09.svg';
import _imgBound from './assets/figma/8f74960e23e19f17ae4e6be6fbf381d8046ff463.svg';
import _imgLineH from './assets/figma/c81d257b22d68f2f1b3c1a26e9296f85939030c9.svg';
import _imgLineV from './assets/figma/c3fe03a98e9323cc849182eb98e2c1b6f4db0af8.svg';
import _imgEmojiIcon from './assets/figma/6b56da5448d7da479e8d2fc1f307d911d116a58a.svg';
import _imgKeyboard from './assets/figma/c32ffaa71da99de73b376ad5eda6a9abafad4160.svg';
import _imgEmojiFloat from './assets/figma/78f7959e06dfc9c60e05998c7ad557ceb85ebc93.png';
import _imgWillow1 from './assets/figma/willow-1.png';
import _imgWillow2 from './assets/figma/willow-2.png';
import _imgWillow3 from './assets/figma/willow-3.png';
import _imgWillow4 from './assets/figma/willow-4.png';
import _imgWillow5 from './assets/figma/willow-5.png';
import _imgWillow6 from './assets/figma/willow-6.png';
import _imgWillow7 from './assets/figma/willow-7.png';
import _imgWillow8 from './assets/figma/willow-8.png';
const _WILLOW_SRCS = [_imgWillow1, _imgWillow2, _imgWillow3, _imgWillow4, _imgWillow5, _imgWillow6, _imgWillow7, _imgWillow8];
import _imgKiteBird   from './assets/figma/kite-bird.png';
import _imgKiteRope   from './assets/figma/kite-rope.png';
import _imgKitePaperTop    from './assets/figma/kite-paper-top.png';
import _imgKitePaperBottom from './assets/figma/kite-paper-bottom.png';
import popoverArrowSvg from './assets/figma/popover-arrow.svg';
import popoverHeartSvg from './assets/figma/popover-heart.svg';
import popoverHeartbrokenSvg from './assets/figma/popover-heartbroken.svg';
import popoverReplySvg from './assets/figma/popover-reply.svg';
import popoverEllipsisSvg from './assets/figma/popover-ellipsis.svg';
import popoverFollowSendSvg from './assets/figma/popover-followsend.svg';

const imgGroup1312317958 = _imgGroup1312317958;
const imgGroup1312317959 = _imgGroup1312317959;
const imgRectangle51082 = _imgRectangle51082;
const imgLike = _imgLike;
const imgIcon = _imgIcon;
const imgIconShare = _imgIconShare;
const imgTabDot = _imgTabDot;
const imgUnion = _imgUnion;
const imgFrame1312317869 = _imgFrame1312317869;
const imgRedDotAlt = _imgRedDotAlt;
const imgRedDotMaterial = _imgRedDotMaterial;
const imgThreelines = _imgThreelines;
const imgBattery = _imgBattery;
const imgWifi = _imgWifi;
const imgCellularConnection = _imgCellularConnection;
const imgBatteryDark = _imgBatteryDark;
const imgWifiDark = _imgWifiDark;
const imgCellularDark = _imgCellularDark;
const imgMaskBottom = _imgMaskBottom;
const imgBg = _imgBg;
const imgVideoFrame = _imgVideoFrame;
const imgCd = _imgCd;
const imgMusicAlbum = _imgMusicAlbum;
const imgAvatar = _imgAvatar;
const imgAvatar1 = _imgAvatar1;
const imgSearch = _imgSearch;
const imgMusic = _imgMusic;
const imgComment = _imgComment;
const imgBound = _imgBound;
const imgLineH = _imgLineH;
const imgLineV = _imgLineV;
const imgEmojiIcon = _imgEmojiIcon;
const imgKeyboard = _imgKeyboard;

// --- Sub Components ---

// Bullet icon for danmaku input — pass dark={true} for dark fill on light backgrounds
function DanmakuIcon({ className, dark }) {
  const fill = dark ? 'rgba(22,24,35,0.75)' : 'white';
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M14.5518 3.07589C14.2072 2.84646 13.7414 2.93939 13.5117 3.2839L12.4795 4.83273H12.126L11.0938 3.2839C10.864 2.9394 10.3983 2.84617 10.0537 3.07589C9.70921 3.30564 9.61611 3.77134 9.84572 4.11593L10.3272 4.83859C9.30689 4.9014 8.49811 5.74687 8.49806 6.78293V9.27023C8.49806 10.347 9.3715 11.2202 10.4483 11.2204H11.5537V12.1638H8.63771C8.22361 12.1638 7.8879 12.4997 7.88771 12.9138C7.88771 13.328 8.22349 13.6638 8.63771 13.6638H11.5537V15.9685C11.5537 16.1878 11.6479 16.3852 11.798 16.5223C11.8449 16.3042 11.9257 16.0938 12.0381 15.8991L13.0537 14.14V13.6638H13.3287L14.1947 12.1638H13.0537V11.2204H14.1572C14.3833 11.2204 14.6005 11.1819 14.8024 11.1111L16.1004 8.86303C16.1027 8.85897 16.1051 8.85492 16.1074 8.85088V6.78293C16.1074 5.74625 15.2985 4.9005 14.2774 4.83859L14.7598 4.11593C14.9895 3.77129 14.8964 3.30566 14.5518 3.07589ZM10.4483 9.72043C10.1999 9.72019 9.99806 9.51862 9.99806 9.27023V8.77707H11.5537V9.72043H10.4483ZM14.1572 9.72043H13.0537V8.77707H14.6074V9.27023C14.6074 9.51876 14.4058 9.72043 14.1572 9.72043ZM9.99806 6.78293C9.99811 6.53458 10.2 6.33296 10.4483 6.33273H11.5537V7.27707H9.99806V6.78293ZM14.6074 7.27707H13.0537V6.33273H14.1572C14.4057 6.33273 14.6074 6.53444 14.6074 6.78293V7.27707Z" fill={fill}/>
      <path d="M7.70021 5.56125C7.7002 4.4843 6.82696 3.61105 5.75001 3.61105H3.75001C3.33581 3.61105 3.00002 3.94685 3.00001 4.36105C3.00007 4.77522 3.33583 5.11105 3.75001 5.11105H5.75001C5.99853 5.11105 6.2002 5.31273 6.20021 5.56125V6.60031C6.20005 6.8487 5.99844 7.0505 5.75001 7.0505H4.95021C3.87336 7.0505 3.00027 7.92304 3.00001 8.99972V9.8005C3.00031 10.8771 3.87338 11.7497 4.95021 11.7497H5.75001C5.99847 11.7497 6.20009 11.9515 6.20021 12.1999V12.3581C6.20007 13.6006 5.19267 14.608 3.95021 14.6081H3.79884C3.38473 14.6082 3.04885 14.944 3.04884 15.3581C3.04898 15.7721 3.38481 16.108 3.79884 16.1081H3.95021C6.0211 16.108 7.70007 14.429 7.70021 12.3581V12.1999C7.70009 11.1231 6.8269 10.2497 5.75001 10.2497H4.95021C4.70192 10.2497 4.50031 10.0488 4.50001 9.8005V8.99972C4.50027 8.75136 4.70189 8.5505 4.95021 8.5505H5.75001C6.82687 8.5505 7.70005 7.67713 7.70021 6.60031V5.56125Z" fill={fill}/>
      <path d="M17.0875 10.7543C17.3427 10.3124 17.9078 10.161 18.3498 10.4161C18.7917 10.6713 18.9432 11.2364 18.688 11.6784L15.434 17.3145C15.3919 17.3874 15.332 17.4486 15.2599 17.4922L14.1961 18.1362C13.9938 18.2587 13.7359 18.1098 13.7408 17.8733L13.7666 16.63C13.7684 16.5458 13.7914 16.4634 13.8335 16.3904L17.0875 10.7543Z" fill={fill}/>
    </svg>
  );
}

// Like icon
function IconLike({ className }) {
  return (
    <div className={className || "overflow-clip relative size-[36px]"}>
      <div className="absolute inset-0 overflow-clip">
        <div className="absolute inset-[9.72%_5.56%_8.33%_5.56%]">
          <div className="absolute inset-[-3.05%_-5.62%_-9.15%_-5.62%]">
            <img alt="" className="block max-w-none size-full" src={imgLike} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Collect / Bookmark icon
function IconCollect({ className }) {
  return (
    <div className={className || "overflow-clip relative size-[36px]"}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[38px]">
        <div className="absolute inset-[5.91%_5.08%_7.68%_5.08%]">
          <img alt="" className="block max-w-none size-full" src={imgIcon} />
        </div>
      </div>
    </div>
  );
}

// Share icon
function IconShare({ className }) {
  return (
    <div className={className || "overflow-clip relative size-[36px]"}>
      <img alt="" className="absolute block max-w-none size-full" src={imgIconShare} />
    </div>
  );
}

// Status bar (iPhone X, Dark)
function StatusBar({ className }) {
  return (
    <div className={className || "h-[44px] relative w-[390px]"}>
      {/* Battery */}
      <div className="absolute -translate-y-1/2 h-[11.333px] right-[14.34px] top-[calc(50%+1px)] w-[24.328px]">
        <img alt="" className="absolute block max-w-none size-full" src={imgBatteryDark} />
      </div>
      {/* WiFi */}
      <div className="absolute -translate-y-1/2 h-[11px] right-[43.67px] top-[calc(50%+0.83px)] w-[15.333px]">
        <img alt="" className="absolute block max-w-none size-full" src={imgWifiDark} />
      </div>
      {/* Cellular */}
      <div className="absolute -translate-y-1/2 h-[10.667px] right-[64px] top-[calc(50%+1px)] w-[17px]">
        <img alt="" className="absolute block max-w-none size-full" src={imgCellularDark} />
      </div>
      {/* Time */}
      <div className="absolute -translate-y-1/2 h-[21px] left-[21px] top-[calc(50%-4.17px)] w-[54px]">
        <p className="absolute font-semibold leading-normal left-0 right-0 text-white text-[15px] text-center top-[calc(50%-3.5px)] tracking-[-0.3px]"
           style={{ fontFamily: '"SF Pro Text", sans-serif' }}>
          9:41
        </p>
      </div>
    </div>
  );
}

// Top gradient mask
function MaskTop({ className }) {
  return (
    <div className={className || "relative w-[390px] h-[108px]"}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0) 100%)" }} />
    </div>
  );
}

// Bottom gradient mask
function MaskBottom({ className }) {
  return (
    <div className={className || "relative w-[390px] h-[280px]"}>
      <div className="absolute inset-[-0.05%_0_0_0]">
        <img alt="" className="absolute block max-w-none size-full" src={imgMaskBottom} />
      </div>
    </div>
  );
}

// Bottom tab - home indicator + tab bar
function BottomNav() {
  return (
    <div className="absolute h-[83px] left-0 top-[761px] w-[390px]">
      {/* Home Indicator area */}
      <div className="absolute inset-[59.04%_0_0_0]" style={{ background: "#161616" }}>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[8px] bg-white h-[5px] rounded-[100px] w-[133px]" />
      </div>
      {/* Tab Bar */}
      <div className="absolute inset-[0_0_40.96%_0] flex items-center justify-center" style={{ background: "#161616" }}>
        {/* 首页 — selected */}
        <div className="flex flex-1 items-center justify-center min-h-px min-w-px pb-[13px] pt-[14px] px-[23px] relative">
          <div className="h-[22px] relative shrink-0 w-[34px]">
            <p className="absolute -translate-x-1/2 left-[17px] top-0 text-white text-[16px] text-center whitespace-nowrap leading-normal"
               style={{ fontFamily: '"PingFang SC", sans-serif', fontWeight: 500, textShadow: "0px 2px 2px rgba(0,0,0,0.15)" }}>
              首页
            </p>
          </div>
        </div>
        {/* 朋友 */}
        <div className="flex flex-1 items-center justify-center min-h-px min-w-px pb-[13px] pt-[14px] px-[23px] relative">
          <div className="h-[22px] relative shrink-0 w-[34px]">
            <p className="absolute -translate-x-1/2 left-[17px] top-0 text-[16px] text-center whitespace-nowrap leading-normal"
               style={{ fontFamily: '"PingFang SC", sans-serif', fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>
              朋友
            </p>
          </div>
        </div>
        {/* Plus button (center) */}
        <div className="relative shrink-0 h-[49px] w-[78px]">
          <div className="absolute -translate-x-1/2 -translate-y-1/2 h-[30px] left-[calc(50%+0.4px)] top-[calc(50%+0.5px)] w-[36.793px]">
            <img alt="" className="absolute block max-w-none size-full" src={imgFrame1312317869} />
          </div>
        </div>
        {/* 消息 with red dot */}
        <div className="flex flex-1 items-start min-h-px min-w-px pb-[13px] pl-[23px] pr-[24px] pt-[14px] relative">
          <p className="leading-normal text-[16px] text-center whitespace-nowrap relative shrink-0"
             style={{ fontFamily: '"PingFang SC", sans-serif', fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>
            消息
          </p>
          {/* Red dot indicator */}
          <div className="absolute left-[55px] size-[8px] top-[14px]">
            <img alt="" className="absolute block max-w-none size-full" src={imgTabDot} />
          </div>
        </div>
        {/* 我 */}
        <div className="flex flex-1 items-start min-h-px min-w-px pb-[13px] pt-[14px] px-[23px] relative">
          <div className="h-[22px] relative shrink-0 w-[32px]">
            <p className="absolute -translate-x-1/2 left-[16px] top-0 text-[16px] text-center whitespace-nowrap leading-normal"
               style={{ fontFamily: '"PingFang SC", sans-serif', fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>
              我
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Top navigation bar
function TopNav() {
  return (
    <div className="absolute flex items-center justify-center left-0 px-[12px] right-0 -translate-y-1/2 top-[calc(50%-356px)]">
      {/* Hamburger menu */}
      <div className="relative shrink-0 size-[32px]">
        <div className="absolute inset-[26.56%_18.75%]">
          <div className="absolute inset-[0_-10%_-26.67%_-10%]">
            <img alt="" className="block max-w-none size-full" src={imgThreelines} />
          </div>
        </div>
      </div>
      {/* Top tabs */}
      <div className="flex flex-col items-start px-[14px] relative shrink-0">
        <div className="flex items-center justify-center relative shrink-0">
          {/* 经验 tab */}
          <div className="flex flex-col items-start p-[10px] relative shrink-0 w-[54px]">
            <div className="flex items-start relative shrink-0 w-[34px]">
              <p className="leading-normal not-italic relative shrink-0 text-[17px] text-center whitespace-nowrap"
                 style={{ fontFamily: '"PingFang SC", sans-serif', fontWeight: 500, color: "rgba(255,255,255,0.65)", textShadow: "0px 2px 2px rgba(0,0,0,0.15)" }}>
                经验
              </p>
            </div>
          </div>
          {/* 直播 tab */}
          <div className="flex flex-col items-start p-[10px] relative shrink-0">
            <div className="flex items-start relative shrink-0 w-[34px]">
              <p className="leading-normal not-italic relative shrink-0 text-[17px] text-center whitespace-nowrap"
                 style={{ fontFamily: '"PingFang SC", sans-serif', fontWeight: 500, color: "rgba(255,255,255,0.65)", textShadow: "0px 2px 2px rgba(0,0,0,0.15)" }}>
                直播
              </p>
            </div>
          </div>
          {/* 热点 tab */}
          <div className="flex flex-col items-start p-[10px] relative shrink-0">
            <div className="flex items-start relative shrink-0 w-[34px]">
              <p className="leading-normal not-italic relative shrink-0 text-[17px] text-center whitespace-nowrap"
                 style={{ fontFamily: '"PingFang SC", sans-serif', fontWeight: 500, color: "rgba(255,255,255,0.65)", textShadow: "0px 2px 2px rgba(0,0,0,0.15)" }}>
                热点
              </p>
            </div>
          </div>
          {/* 商城 tab */}
          <div className="flex flex-col items-start p-[10px] relative shrink-0">
            <div className="flex items-start relative shrink-0 w-[34px]">
              <p className="leading-normal not-italic relative shrink-0 text-[17px] text-center whitespace-nowrap"
                 style={{ fontFamily: '"PingFang SC", sans-serif', fontWeight: 500, color: "rgba(255,255,255,0.65)", textShadow: "0px 2px 2px rgba(0,0,0,0.15)" }}>
                商城
              </p>
            </div>
          </div>
          {/* 推荐 tab (selected) */}
          <div className="flex flex-col items-start p-[10px] relative shrink-0">
            <div className="flex items-start relative shrink-0 w-[34px]">
              <div className="relative h-[24px] shrink-0 w-[34px]">
                <p className="absolute -translate-x-1/2 left-[17px] top-0 text-[17px] text-center whitespace-nowrap leading-normal"
                   style={{ fontFamily: '"PingFang SC", sans-serif', fontWeight: 500, color: "#ffffff", textShadow: "0px 2px 2px rgba(0,0,0,0.15)" }}>
                  推荐
                </p>
                <div className="absolute -translate-x-1/2 -translate-y-1/2 bg-white h-[2px] left-1/2 rounded-[0.5px] top-[calc(50%+15px)] w-[24px]"
                     style={{ boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.15)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Search icon */}
      <div className="relative shrink-0 size-[32px]">
        <img alt="" className="absolute block max-w-none size-full" src={imgSearch} />
      </div>
    </div>
  );
}

// Right action panel (like, comment, collect, share, music, avatar)
function ActionPanel({ avatarSrc }) {
  return (
    <div className="absolute h-[400px] left-[333px] top-[349px] w-[56px]">
      {/* Avatar */}
      <div className="absolute left-1/2 -translate-x-1/2 h-[57px] top-0 w-[48px]">
        <div className="absolute left-[2px] size-[44px] top-[2px]">
          <div className="absolute border-2 border-solid border-white left-0 rounded-[22px] size-[44px] top-0"
               style={{ boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.2)" }}>
            <div className="absolute inset-0 pointer-events-none rounded-[22px] overflow-hidden">
              <img alt="" className="absolute max-w-none object-cover rounded-[22px] size-full" src={imgAvatar} />
              <img alt="" className="absolute max-w-none object-cover rounded-[22px] size-full" src={avatarSrc || imgAvatar1} />
            </div>
          </div>
        </div>
        {/* Follow button */}
        <div className="absolute inset-[57.89%_18.75%_-10.53%_18.75%]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[22px]">
            <div className="absolute inset-[-9.09%_-18.18%_-27.27%_-18.18%]">
              <img alt="" className="block max-w-none size-full" src={imgBound} />
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-[9px]">
            <div className="absolute inset-[-50%_-11.11%]">
              <img alt="" className="block max-w-none size-full" src={imgLineH} />
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[9px] w-px">
            <div className="absolute inset-[-11.11%_-50%]">
              <img alt="" className="block max-w-none size-full" src={imgLineV} />
            </div>
          </div>
        </div>
      </div>

      {/* Like icon */}
      <IconLike className="absolute left-1/2 -translate-x-1/2 overflow-clip size-[36px] top-[73px]" />
      {/* Like count */}
      <p className="absolute left-1/2 -translate-x-1/2 text-[13px] text-center text-white top-[111px] w-[56px] leading-normal"
         style={{ fontFamily: '"PingFang SC", sans-serif', fontWeight: 500, textShadow: "0px 1px 1px rgba(0,0,0,0.15), 0px 0px 4px rgba(0,0,0,0.2)" }}>
        1.4万
      </p>

      {/* Comment icon */}
      <div className="absolute left-1/2 -translate-x-1/2 overflow-clip size-[36px] top-[143px]">
        <img alt="" className="absolute block max-w-none size-full" src={imgComment} />
      </div>
      {/* Comment count */}
      <p className="absolute left-1/2 -translate-x-1/2 text-[13px] text-center text-white top-[181px] w-[56px] leading-normal"
         style={{ fontFamily: '"PingFang SC", sans-serif', fontWeight: 500, textShadow: "0px 1px 1px rgba(0,0,0,0.15), 0px 0px 4px rgba(0,0,0,0.2)" }}>
        1009
      </p>

      {/* Collect icon */}
      <IconCollect className="absolute left-1/2 -translate-x-1/2 overflow-clip size-[36px] top-[213px]" />
      {/* Collect count */}
      <p className="absolute left-1/2 -translate-x-1/2 text-[13px] text-center text-white top-[251px] w-[56px] leading-normal"
         style={{ fontFamily: '"PingFang SC", sans-serif', fontWeight: 500, textShadow: "0px 1px 1px rgba(0,0,0,0.15), 0px 0px 4px rgba(0,0,0,0.2)" }}>
        8.2万
      </p>

      {/* Share icon */}
      <IconShare className="absolute left-1/2 -translate-x-1/2 overflow-clip size-[36px] top-[283px]" />
      {/* Share count */}
      <p className="absolute left-1/2 -translate-x-1/2 text-[13px] text-center text-white top-[322px] w-[56px] leading-normal"
         style={{ fontFamily: '"PingFang SC", sans-serif', fontWeight: 500, textShadow: "0px 1px 1px rgba(0,0,0,0.15), 0px 0px 4px rgba(0,0,0,0.2)" }}>
        4.6万
      </p>

      {/* Music disc */}
      <div className="absolute left-1/2 -translate-x-1/2 size-[44px] top-[356px]">
        <div className="absolute h-[41.138px] left-[-26.5px] top-[-13px] w-[17.304px]">
          <div className="absolute inset-[0_0_0_-0.61%]">
            <img alt="" className="block max-w-none size-full" src={imgMusic} />
          </div>
        </div>
        <div className="absolute left-0 size-[44px] top-0">
          <img alt="" className="absolute block max-w-none size-full" height="44" src={imgCd} width="44" />
        </div>
        <div className="absolute left-[9px] size-[26px] top-[9px]">
          <img alt="" className="absolute block max-w-none size-full" height="26" src={imgMusicAlbum} width="26" />
        </div>
      </div>
    </div>
  );
}

// Caption area (username + description)
function Caption({ username = "@听一", description = "简单可能比复杂更难做到，你必须努力理清思路，从而使其变得简单。", topOffset = 0 }) {
  return (
    <div className="absolute flex flex-col gap-[6px] items-start justify-center left-[12px] w-[284px]" style={{ top: 677 + topOffset }}>
      {/* Username */}
      <div className="flex items-center justify-center relative shrink-0">
        <p className="leading-normal not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap"
           style={{ fontFamily: '"PingFang SC", sans-serif', fontWeight: 500 }}>
          {username}
        </p>
      </div>
      {/* Description */}
      <div className="flex items-start relative shrink-0 w-full">
        <p className="flex-1 leading-normal min-h-px min-w-px not-italic relative text-[15px] text-white"
           style={{ fontFamily: '"PingFang SC", sans-serif', fontWeight: 400 }}>
          {description}
        </p>
      </div>
    </div>
  );
}

// Danmaku input button (bottom left)
function DanmakuButton({ onClick, topOffset = 0 }) {
  return (
    <div
      className="absolute flex items-center left-[12px] p-[6px] rounded-[16px] cursor-pointer"
      style={{ top: 635 + topOffset, background: "rgba(77,77,77,0.5)" }}
      onClick={onClick}
    >
      <DanmakuIcon className="relative shrink-0 w-[20px] h-[20px]" />
    </div>
  );
}

// 弹幕开启图标
function DanmakuOnIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path d="M7.24995 4.31041C8.36805 4.31074 9.27437 5.21763 9.27437 6.3358V8.30065C9.274 9.4185 8.36782 10.3247 7.24995 10.3251H5.44038C5.34385 10.3251 5.26576 10.4034 5.26558 10.4999V12.4999C5.26571 12.5964 5.34381 12.6756 5.44038 12.6756H7.24995C8.368 12.676 9.27429 13.582 9.27437 14.7001V15.7001C9.27424 18.0885 7.33763 20.0251 4.94917 20.0253H4.44038C3.98483 20.0253 3.61532 19.6556 3.61519 19.2001C3.61526 18.7445 3.98479 18.3749 4.44038 18.3749H4.94917C6.42637 18.3748 7.62482 17.1772 7.62495 15.7001V14.7001C7.62488 14.4932 7.45673 14.3254 7.24995 14.3251H5.44038C4.43254 14.3251 3.61532 13.5077 3.61519 12.4999V10.4999C3.61537 9.4921 4.43258 8.67565 5.44038 8.67565H7.24995C7.45655 8.67532 7.62458 8.50723 7.62495 8.30065V6.3358C7.62495 6.1289 7.45678 5.96113 7.24995 5.9608H4.44038C3.98483 5.9608 3.61532 5.59113 3.61519 5.13561C3.61519 4.67997 3.98475 4.31041 4.44038 4.31041H7.24995Z" fill="#161823" fillOpacity="0.75"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M16.5664 3.86217C16.8191 3.48349 17.331 3.38124 17.7099 3.63365C18.089 3.8864 18.1912 4.39908 17.9384 4.77818L17.246 5.81725H17.5605C18.6784 5.81771 19.5848 6.72465 19.5849 7.84264V11.4715C19.5849 12.5896 18.6785 13.4965 17.5605 13.4969H15.8164V14.3446C14.7933 14.7641 13.9588 15.5388 13.4707 16.5116H10.4697C10.0141 16.5116 9.6445 16.142 9.64449 15.6864C9.64454 15.2308 10.0141 14.8612 10.4697 14.8612H14.166V13.4969H12.4238C11.3054 13.4969 10.3984 12.5899 10.3984 11.4715V7.84264C10.3985 6.72436 11.3055 5.81725 12.4238 5.81725H12.7373L12.0439 4.77818C11.7912 4.39915 11.8935 3.88645 12.2724 3.63365C12.6514 3.38099 13.1642 3.48325 13.4169 3.86217L14.7197 5.81725H15.2626L16.5664 3.86217ZM12.0488 11.4715C12.0488 11.6786 12.2167 11.8465 12.4238 11.8465H14.166V10.4823H12.0488V11.4715ZM15.8164 11.8465H17.5605C17.7672 11.8461 17.9355 11.6784 17.9355 11.4715V10.4823H15.8164V11.8465ZM12.4238 7.46764C12.2168 7.46764 12.0489 7.63563 12.0488 7.84264V8.8319H14.166V7.46764H12.4238ZM15.8164 8.8319H17.9355V7.84264C17.9354 7.63592 17.7671 7.4681 17.5605 7.46764H15.8164V8.8319Z" fill="#161823" fillOpacity="0.75"/>
      <path d="M14.5002 18.5C14.5002 16.8431 15.8433 15.5 17.5002 15.5H20.5002C22.157 15.5 23.5002 16.8431 23.5002 18.5C23.5002 20.1569 22.157 21.5 20.5002 21.5H17.5002C15.8433 21.5 14.5002 20.1569 14.5002 18.5Z" fill="#FE2C55"/>
      <path d="M18.5002 18.5C18.5002 17.3954 19.3956 16.5 20.5002 16.5C21.6048 16.5 22.5002 17.3954 22.5002 18.5C22.5002 19.6046 21.6048 20.5 20.5002 20.5C19.3956 20.5 18.5002 19.6046 18.5002 18.5Z" fill="white"/>
    </svg>
  );
}

// 弹幕关闭图标
function DanmakuOffIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path d="M7.24995 4.31041C8.36805 4.31074 9.27437 5.21763 9.27437 6.3358V8.30065C9.27399 9.4185 8.36782 10.3247 7.24995 10.3251H5.44038C5.34384 10.3251 5.26576 10.4034 5.26558 10.4999V12.4999C5.26571 12.5964 5.34381 12.6756 5.44038 12.6756H7.24995C8.36801 12.676 9.2743 13.5819 9.27437 14.7001V15.7001C9.27424 18.0885 7.33763 20.0251 4.94917 20.0253H4.44038C3.98483 20.0253 3.61532 19.6556 3.61519 19.2001C3.61526 18.7445 3.98479 18.3749 4.44038 18.3749H4.94917C6.42636 18.3748 7.62482 17.1772 7.62495 15.7001V14.7001C7.62488 14.4932 7.45674 14.3254 7.24995 14.3251H5.44038C4.43254 14.3251 3.61532 13.5077 3.61519 12.4999V10.4999C3.61537 9.4921 4.43257 8.67565 5.44038 8.67565H7.24995C7.45655 8.67532 7.62458 8.50723 7.62495 8.30065V6.3358C7.62495 6.1289 7.45678 5.96113 7.24995 5.9608H4.44038C3.98483 5.9608 3.61532 5.59113 3.61519 5.13561C3.61519 4.67997 3.98475 4.31041 4.44038 4.31041H7.24995Z" fill="#161823" fillOpacity="0.75"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M16.5664 3.86217C16.8191 3.48349 17.331 3.38124 17.7099 3.63365C18.089 3.8864 18.1912 4.39908 17.9384 4.77818L17.246 5.81725H17.5605C18.6784 5.81771 19.5848 6.72465 19.5849 7.84264V11.4715C19.5849 12.5896 18.6785 13.4965 17.5605 13.4969H15.8164V14.3446C14.7933 14.7641 13.9588 15.5388 13.4707 16.5116H10.4697C10.0141 16.5116 9.6445 16.142 9.64449 15.6864C9.64454 15.2308 10.0141 14.8612 10.4697 14.8612H14.166V13.4969H12.4238C11.3054 13.4969 10.3984 12.5899 10.3984 11.4715V7.84264C10.3985 6.72436 11.3055 5.81725 12.4238 5.81725H12.7373L12.0439 4.77818C11.7912 4.39915 11.8935 3.88645 12.2724 3.63365C12.6514 3.38099 13.1642 3.48325 13.4169 3.86217L14.7197 5.81725H15.2626L16.5664 3.86217ZM12.0488 11.4715C12.0488 11.6786 12.2167 11.8465 12.4238 11.8465H14.166V10.4823H12.0488V11.4715ZM15.8164 11.8465H17.5605C17.7672 11.8461 17.9355 11.6784 17.9355 11.4715V10.4823H15.8164V11.8465ZM12.4238 7.46764C12.2168 7.46764 12.0489 7.63563 12.0488 7.84264V8.8319H14.166V7.46764H12.4238ZM15.8164 8.8319H17.9355V7.84264C17.9354 7.63592 17.7671 7.4681 17.5605 7.46764H15.8164V8.8319Z" fill="#161823" fillOpacity="0.75"/>
      <path d="M14.5002 18.5C14.5002 16.8431 15.8433 15.5 17.5002 15.5H20.5002C22.157 15.5 23.5002 16.8431 23.5002 18.5C23.5002 20.1569 22.157 21.5 20.5002 21.5H17.5002C15.8433 21.5 14.5002 20.1569 14.5002 18.5Z" fill="#161823" fillOpacity="0.34"/>
      <path d="M15.5002 18.5C15.5002 17.3954 16.3956 16.5 17.5002 16.5C18.6048 16.5 19.5002 17.3954 19.5002 18.5C19.5002 19.6046 18.6048 20.5 17.5002 20.5C16.3956 20.5 15.5002 19.6046 15.5002 18.5Z" fill="white"/>
    </svg>
  );
}

// Danmaku input panel (slides up from bottom)
// text / onTextChange are controlled from parent — no internal text state needed
// Closing is handled by the parent container's onClick (tap-outside); clicks within the
// panel call stopPropagation so they don't bubble up and accidentally dismiss it.
function DanmakuPanel({ onSend, danmakuOn, onToggleDanmaku, text, onTextChange }) {
  const inputRef = useRef(null);

  // 用 preventScroll 阻止浏览器自动滚动页面
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    /* Slide-up panel — stopPropagation keeps all in-panel clicks from bubbling to the
       parent container's tap-outside handler */
    <motion.div
      className="absolute left-0 bottom-0 w-[390px]"
      initial={{ y: 347 }}
      animate={{ y: 0 }}
      exit={{ y: 347 }}
      transition={{ type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.28 }}
      onClick={e => e.stopPropagation()}
    >
        {/* Input bar — 56px white */}
        <div className="relative w-full bg-white" style={{ height: 56 }}>
          {/* Top border */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(22,24,35,0.12)' }} />

          {/* Content row */}
          <div className="absolute left-[12px] right-[12px] top-[8px] flex items-center gap-[8px]" style={{ height: 40 }}>
            {/* Left danmaku toggle button */}
            <div
              className="flex items-center justify-center shrink-0 cursor-pointer"
              style={{ width: 40, height: 40, background: 'rgba(22,24,35,0.05)', borderRadius: 22 }}
              onClick={e => { e.stopPropagation(); onToggleDanmaku(); }}
            >
              {danmakuOn ? <DanmakuOnIcon /> : <DanmakuOffIcon />}
            </div>

            {/* Input pill */}
            <div
              className="flex-1 flex items-center px-[12px]"
              style={{ height: 40, background: 'rgba(22,24,35,0.05)', borderRadius: 22 }}
              onClick={e => e.stopPropagation()}
            >
              <input
                ref={inputRef}
                value={text}
                onChange={e => onTextChange(e.target.value)}
                placeholder="发一条友好的弹幕吧"
                className="flex-1 bg-transparent outline-none border-none text-[14px] min-w-0"
                style={{
                  fontFamily: '"PingFang SC", sans-serif',
                  fontWeight: 400,
                  color: 'rgba(22,24,35,0.9)',
                  caretColor: '#FE2C55',
                }}
              />
              {/* Emoji icon */}
              <img src={imgEmojiIcon} alt="" className="w-[24px] h-[24px] shrink-0 ml-[8px]" />
            </div>

            {/* Send button — visible only when text entered */}
            <AnimatePresence>
              {text.trim() && (
                <motion.button
                  key="send-btn"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 50 }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    flexShrink: 0,
                    height: 32,
                    background: '#FE2C55',
                    borderRadius: 18,
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: '"PingFang SC", sans-serif',
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#FFFFFF',
                    letterSpacing: 0,
                    lineHeight: 'normal',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    padding: '10px',
                  }}
                  onClick={() => onSend(text)}
                >
                  发送
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* iOS Keyboard — purely visual, real input from computer keyboard */}
        <IOSKeyboard />
    </motion.div>
  );
}

// iOS keyboard — pixel-accurate from Figma node 129:24880, purely visual (pointer-events: none)
function IOSKeyboard() {
  const KF = { fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif' };
  const shadow = '0px 1px 0px 0px rgba(0,0,0,0.4)';

  const LetterKey = ({ label }) => (
    <div style={{
      width: 33, height: 42, flexShrink: 0,
      background: '#FFFFFF', borderRadius: 5, boxShadow: shadow,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 24, color: '#000', ...KF,
    }}>
      {label}
    </div>
  );

  const SpecialKey = ({ children, width, fontSize = 16, letterSpacing = '-0.3px' }) => (
    <div style={{
      width, height: 42, flexShrink: 0,
      background: '#ACB4BE', borderRadius: 5, boxShadow: shadow,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize, letterSpacing, color: '#000', ...KF,
    }}>
      {children}
    </div>
  );

  const row1 = 'qwertyuiop'.split('');
  const row2 = 'asdfghjkl'.split('');
  const row3 = 'zxcvbnm'.split('');

  return (
    <div style={{ width: 390, height: 291, background: '#D1D6DC', position: 'relative', pointerEvents: 'none', userSelect: 'none', overflow: 'hidden' }}>

      {/* Row 1 — QWERTYUIOP — top: 8px, px: 3px, gap: ~5.7px (space-between) */}
      <div style={{ position: 'absolute', top: 8, left: 3, right: 3, display: 'flex', justifyContent: 'space-between' }}>
        {row1.map(l => <LetterKey key={l} label={l} />)}
      </div>

      {/* Row 2 — ASDFGHJKL — top: 62px, px: 22px, gap: ~6px (space-between) */}
      <div style={{ position: 'absolute', top: 62, left: 22, right: 22, display: 'flex', justifyContent: 'space-between' }}>
        {row2.map(l => <LetterKey key={l} label={l} />)}
      </div>

      {/* Row 3 — Shift + ZXCVBNM + Delete — top: 116px */}
      {/* Total: 3 + 44 + 14.5 + 7×33 + 6×6 + 14.5 + 44 + 3 = 390 */}
      <div style={{ position: 'absolute', top: 116, left: 3, right: 3, display: 'flex', alignItems: 'center' }}>
        {/* Shift */}
        <SpecialKey width={44}>
          <svg width="21" height="18" viewBox="0 0 21 18" fill="none">
            <path d="M10.5 1L1 10h5.5v7h8v-7H20L10.5 1z" fill="#3C3C43" fillOpacity="0.55" />
          </svg>
        </SpecialKey>
        {/* Spacer shift→Z */}
        <div style={{ width: 14.5 }} />
        {/* Letter keys Z–M with 6px gap */}
        <div style={{ display: 'flex', gap: 6 }}>
          {row3.map(l => <LetterKey key={l} label={l} />)}
        </div>
        {/* Spacer M→Delete */}
        <div style={{ width: 14.5 }} />
        {/* Delete */}
        <SpecialKey width={44}>
          <svg width="23" height="17" viewBox="0 0 23 17" fill="none">
            <path d="M9.5 1H21C21.55 1 22 1.45 22 2V15C22 15.55 21.55 16 21 16H9.5L1.5 8.5L9.5 1Z"
              stroke="#3C3C43" strokeOpacity="0.55" strokeWidth="1.5" fill="none" />
            <path d="M14.5 6L10.5 11M10.5 6L14.5 11"
              stroke="#3C3C43" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </SpecialKey>
      </div>

      {/* Row 4 — 123 | space | @ | . | return — top: 170px */}
      {/* Total: 3 + 89 + 6 + 92 + 6 + 43 + 6 + 43 + 6 + 91 + 3 = 388 ≈ 390 */}
      <div style={{ position: 'absolute', top: 170, left: 3, right: 3, display: 'flex', gap: 6 }}>
        <SpecialKey width={89}>123</SpecialKey>
        {/* Space — white key */}
        <div style={{
          flex: 1, height: 42,
          background: '#FFFFFF', borderRadius: 5, boxShadow: shadow,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, letterSpacing: '-0.5px', color: '#000', ...KF,
        }}>
          space
        </div>
        {/* @ key — white, 43px */}
        <div style={{
          width: 43, height: 42, flexShrink: 0,
          background: '#FFFFFF', borderRadius: 5, boxShadow: shadow,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, color: '#000', ...KF,
        }}>@</div>
        {/* . key — white, 43px */}
        <div style={{
          width: 43, height: 42, flexShrink: 0,
          background: '#FFFFFF', borderRadius: 5, boxShadow: shadow,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, color: '#000', ...KF,
        }}>.</div>
        <SpecialKey width={91} letterSpacing="-0.5px">return</SpecialKey>
      </div>

      {/* Bottom accessories row — top: 224px */}
      <div style={{ position: 'absolute', top: 224, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 14, paddingRight: 14 }}>
        {/* Dictation icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="8" y="3" width="8" height="13" rx="4" fill="#3C3C43" fillOpacity="0.5"/>
          <path d="M5 11a7 7 0 0 0 14 0" stroke="#3C3C43" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="12" y1="18" x2="12" y2="21" stroke="#3C3C43" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="9" y1="21" x2="15" y2="21" stroke="#3C3C43" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        {/* Emoji / globe icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#3C3C43" strokeOpacity="0.5" strokeWidth="1.5"/>
          <ellipse cx="12" cy="12" rx="4" ry="9" stroke="#3C3C43" strokeOpacity="0.5" strokeWidth="1.5"/>
          <line x1="3" y1="9" x2="21" y2="9" stroke="#3C3C43" strokeOpacity="0.5" strokeWidth="1.5"/>
          <line x1="3" y1="15" x2="21" y2="15" stroke="#3C3C43" strokeOpacity="0.5" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Home indicator — centered, top: 269px */}
      <div style={{ position: 'absolute', top: 269, left: '50%', transform: 'translateX(-50%)', width: 140, height: 5, background: 'rgba(0,0,0,0.22)', borderRadius: 100 }} />
    </div>
  );
}

// 每行弹幕的背景文案池
const BG_TEXTS = [
  ['兰陵王辅助很强的', '不愧是外包动画，我的兰陵王没这么帅', '野王真的强', '这个视频太好看了吧'],
  ['《野王的自我修养》', '迦罗：你拿我当提款机？', '秀儿是你吗哈哈哈', '好帅啊这个角度'],
  ['辅助黄刀兰陵王极其残忍', '兰陵王辅助很强的', '这波操作666', '太强了吧，求带'],
];
const ROW_TOPS = [110, 135, 160];
const ITEM_DURATION = 13.34;  // 每条弹幕滚动秒数（原10.67s × 1/0.8）
const MIN_GAP = 48;           // 相邻弹幕最小间距 px

// 弹幕点击后的弹出菜单
const HEART_PATH = "M11.9949 21.5575C12.3018 21.5575 12.7621 21.312 13.1714 21.0358C18.5115 17.5575 22 13.4348 22 9.28133C22 5.53708 19.4015 3 16.2506 3C14.4229 3 13.0558 3.93892 12.1823 5.34696C12.0981 5.48267 11.8935 5.48167 11.8103 5.34534C10.952 3.9382 9.57636 3 7.74936 3C4.59847 3 2 5.53708 2 9.28133C2 13.4348 5.48849 17.5575 10.8286 21.0358C11.2379 21.312 11.688 21.5575 11.9949 21.5575Z";
const LikeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d={HEART_PATH} fill="white"/>
  </svg>
);
const LikeIconRed = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d={HEART_PATH} fill="#FE2C55"/>
  </svg>
);

// +1 发送图标 — Figma node 143-3119
function PlusOneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M15.7537 3.70244C15.9845 3.70244 16.1979 3.82584 16.3133 4.02568C16.4287 4.22553 16.4286 4.47131 16.3133 4.67119L13.1356 10.6272C11.4435 10.4925 9.68366 11.2665 8.63165 12.556C8.25915 13.0126 7.9714 13.5383 7.80646 14.1155L7.20392 11.0472C7.12606 10.7994 7.20425 10.5287 7.40216 10.3606L11.2479 7.09892C11.2919 7.06153 11.2971 7.03539 11.2986 7.02372C11.3012 7.00357 11.2964 6.96984 11.2752 6.93388C11.2541 6.89846 11.2276 6.87895 11.2088 6.87138C11.1979 6.86706 11.1721 6.85861 11.118 6.87919L6.43439 8.65947C6.18643 8.75357 5.90596 8.68657 5.72735 8.49052L2.0838 6.21122C1.91183 6.02211 1.86728 5.74876 1.97052 5.51494C2.07392 5.28107 2.30663 5.13026 2.56232 5.13017L15.7537 3.70244Z" fill="white"/>
      <path d="M10.5838 16.4988L10.8309 15.1129H9.47725L9.70287 13.8451H11.0565L11.2929 12.5129H12.5606L12.3243 13.8451H13.6887L13.4631 15.1129H12.0987L11.8516 16.4988H10.5838Z" fill="white"/>
      <path d="M16.8182 17.1649H15.5218L16.1306 13.727C16.016 13.9132 15.8059 14.0922 15.5003 14.2641C15.1947 14.436 14.8748 14.522 14.5405 14.522L14.4474 13.3187C14.8963 13.3187 15.3165 13.1826 15.708 12.9105C16.0995 12.6335 16.3407 12.3327 16.4314 12.008H17.7206L16.8182 17.1649Z" fill="white"/>
      <path d="M18.0181 11.7581L17.9673 12.0511L17.064 17.2083L17.0278 17.4153H15.2231L15.2759 17.1214L15.7573 14.3977C15.7134 14.4252 15.6696 14.4553 15.6226 14.4817C15.2815 14.6736 14.9198 14.7718 14.5405 14.7718H14.3091L14.2915 14.5413L14.1978 13.3382L14.1772 13.0686H14.4478C14.8421 13.0686 15.2127 12.9501 15.5649 12.7054C15.9281 12.4482 16.1211 12.1905 16.1909 11.9407L16.2417 11.7581H18.0181ZM12.8589 12.263L12.8071 12.5569L12.6226 13.595H13.9868L13.9351 13.889L13.7095 15.1565L13.6724 15.3626H12.3081L12.0981 16.5423L12.061 16.7483H10.2856L10.3374 16.4554L10.5317 15.3626H9.1792L9.23096 15.0686L9.45654 13.8011L9.49365 13.595H10.8462L11.0464 12.469L11.0835 12.263H12.8589ZM15.7534 3.45244C16.0737 3.45244 16.3698 3.62366 16.5298 3.90068L16.5825 4.00712C16.6866 4.25948 16.669 4.54724 16.5327 4.78837L16.5337 4.78935L13.356 10.7454L13.2788 10.8899L13.1157 10.8763C11.507 10.7481 9.82672 11.4872 8.82568 12.7142C8.47271 13.1468 8.2012 13.6422 8.04639 14.1839L7.56104 14.1634L6.9585 11.095V11.094C6.86466 10.7581 6.9736 10.3971 7.24072 10.1702L10.5522 7.36064L6.52295 8.89286C6.19367 9.01783 5.82503 8.93647 5.57666 8.69072L1.95166 6.42314L1.92236 6.40458L1.89893 6.37919C1.66064 6.1171 1.59869 5.73863 1.7417 5.41435V5.41337C1.88179 5.09688 2.19221 4.8924 2.53564 4.88212V4.88115L15.7271 3.45341L15.7397 3.45244H15.7534Z" fill="none" stroke="rgba(0,0,0,0.75)" strokeWidth="0.5"/>
    </svg>
  );
}

// 弹幕点赞爱心 — 20×20px, #FE2C55 fill, semi-transparent black stroke (Figma node 141-18154)
const DanmakuHeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M11.9949 21.5575C12.3018 21.5575 12.7621 21.312 13.1714 21.0358C18.5115 17.5575 22 13.4348 22 9.28133C22 5.53708 19.4015 3 16.2506 3C14.4229 3 13.0558 3.93892 12.1823 5.34696C12.0981 5.48267 11.8935 5.48167 11.8103 5.34534C10.952 3.9382 9.57636 3 7.74936 3C4.59847 3 2 5.53708 2 9.28133C2 13.4348 5.48849 17.5575 10.8286 21.0358C11.2379 21.312 11.688 21.5575 11.9949 21.5575Z"
      fill="#FE2C55"
      stroke="rgba(0,0,0,0.75)"
      strokeWidth="0.5"
      strokeLinejoin="round"
    />
  </svg>
);
const DislikeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M13.1714 21.0358C12.7621 21.312 12.3018 21.5575 11.9949 21.5575C11.688 21.5575 11.2379 21.312 10.8286 21.0358C5.48849 17.5575 2 13.4348 2 9.28133C2 5.53708 4.59847 3 7.74936 3C8.60704 3 9.36524 3.20676 10.0171 3.57174L9.08537 6.71226C9.03283 6.88936 9.08221 7.081 9.2138 7.21065L11.3579 9.32314C11.4821 9.44557 11.5336 9.6239 11.4937 9.79371L10.8222 12.6506C10.7753 12.8501 11.023 12.9826 11.1629 12.833L14.0407 9.75707C14.1754 9.61303 14.2129 9.40322 14.1363 9.22143L13.1453 6.86796C13.0989 6.7578 13.0935 6.63466 13.1301 6.52086L14.098 3.51074C14.7234 3.18381 15.442 3 16.2506 3C19.4015 3 22 5.53708 22 9.28133C22 13.4348 18.5115 17.5575 13.1714 21.0358Z" fill="white"/>
  </svg>
);
const ReplyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M16.2168 18.9999C13.1014 18.9999 10.78 16.79 10.78 14.064C10.78 11.3379 13.3056 9.12806 16.4211 9.12806C19.5365 9.12806 22.0621 11.3379 22.0621 14.064C22.0621 15.891 20.8977 17.3928 19.3512 18.2796L19.2495 19.9407C19.2495 20.305 18.8343 20.5138 18.5418 20.2964L16.7153 18.9809C16.5511 18.9935 16.3848 18.9999 16.2168 18.9999Z" fill="white"/>
    <path d="M18.1998 7.73058C17.6241 7.59783 17.027 7.52806 16.4211 7.52806C12.6293 7.52806 9.18002 10.2603 9.18002 14.064C9.18002 15.4076 9.59038 16.6311 10.2964 17.6468C10.1021 17.6454 9.90929 17.6381 9.71831 17.6252L6.46682 19.518C6.02841 19.7732 5.47836 19.4569 5.47836 18.9496V16.2669C3.37141 14.937 2 12.7704 2 10.3235C2 6.27886 5.74728 3 10.3698 3C13.9489 3 17.0033 4.9657 18.1998 7.73058Z" fill="white"/>
  </svg>
);
const FollowSendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4.88381 7.86537C4.88381 10.3523 6.89424 12.3684 9.37423 12.3684C11.8542 12.3684 13.8646 10.3523 13.8646 7.86537C13.8646 5.37844 11.8542 3.36239 9.37423 3.36239C6.89424 3.36239 4.88381 5.37844 4.88381 7.86537Z" fill="white"/>
    <path d="M20.0898 3.26702C19.1328 3.13341 18.2481 3.80117 18.1143 4.75823C17.7806 7.14403 17.1904 8.87853 16.3027 10.2992C15.7926 11.1157 15.1606 11.8658 14.3675 12.5955C14.096 12.8453 13.7453 12.9827 13.4043 13.1235C12.468 13.5098 11.3585 13.8553 10.1621 14.0053C9.17255 14.1293 8.2205 14.1791 7.37402 14.1869C5.43927 14.2048 3.59584 15.3412 2.98535 17.1772L2.02734 20.059C1.81227 20.7063 2.2944 21.3744 2.97656 21.3744H16.7393C17.3568 21.3742 17.8267 20.8196 17.7256 20.2104L17.4865 18.7712C17.1001 16.4453 18.0211 14.1532 19.2705 12.1537C20.4882 10.2047 21.2003 7.96505 21.581 5.2426C21.7148 4.28549 21.047 3.40085 20.0898 3.26702Z" fill="white"/>
  </svg>
);

const POPOVER_MENU_ITEMS = [
  { Icon: LikeIcon, label: '喜欢' },
  { Icon: FollowSendIcon, label: '跟发' },
  { Icon: DislikeIcon, label: '不喜欢' },
  { Icon: ReplyIcon, label: '回复' },
];

function DanmakuPopover({ left, top, arrowLeft, onLike, onFollowSend, currentLikeCount, baseCount }) {
  return (
    <div
      style={{
        position: 'absolute', left, top, zIndex: 30,
        pointerEvents: 'auto',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
      }}
      onClick={e => e.stopPropagation()}
    >
      {/* Up-pointing arrow — at the TOP, pointing toward the danmaku above */}
      <div style={{ width: 20, height: 7, marginLeft: arrowLeft, flexShrink: 0 }}>
        <img src={popoverArrowSvg} alt="" style={{ width: 20, height: 7, display: 'block' }} />
      </div>
      {/* Menu bar — 256×70px dark pill */}
      <div style={{
        width: 256, height: 70,
        background: '#393B44',
        borderRadius: 8,
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        padding: '0 6px', boxSizing: 'border-box', overflow: 'hidden',
        boxShadow: '0px 8px 40px 0px rgba(0,0,0,0.15)',
      }}>
        {POPOVER_MENU_ITEMS.map(({ Icon, label }) => {
          const isLikeBtn = label === '喜欢';
          const liked = isLikeBtn && currentLikeCount > baseCount;
          return (
            <div key={label}
              onClick={isLikeBtn ? onLike : label === '跟发' ? onFollowSend : undefined}
              style={{
                width: 52, height: 70,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 4, padding: '12px 6px', boxSizing: 'border-box', cursor: 'pointer',
              }}>
              {isLikeBtn && liked ? <LikeIconRed /> : <Icon />}
              <span style={{
                color: isLikeBtn && liked ? '#FE2C55' : '#FFF',
                fontFamily: '"PingFang SC", sans-serif',
                fontSize: 13, fontWeight: 500, lineHeight: 'normal', whiteSpace: 'nowrap',
              }}>
                {isLikeBtn ? currentLikeCount : label}
              </span>
            </div>
          );
        })}
        {/* ··· vertical dots — no label, 36px wide */}
        <div style={{
          width: 36, height: 70,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
            <circle cx="2" cy="2" r="1.5" fill="white"/>
            <circle cx="2" cy="8" r="1.5" fill="white"/>
            <circle cx="2" cy="14" r="1.5" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ×N 计数徽章 — 首次挂载从 1 滚到初始 count（1.5s），之后每次增加触发单次滚动
function CounterBadge({ count }) {
  const [displayed, setDisplayed] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef(null);
  const initDoneRef = useRef(false);
  const prevCountRef = useRef(count);

  useEffect(() => {
    const target = count;
    if (target <= 1) {
      setDisplayed(1);
      setAnimKey(k => k + 1);
      initDoneRef.current = true;
      return;
    }
    const stepMs = 1500 / target;
    let cur = 1;
    const tick = () => {
      cur++;
      setDisplayed(cur);
      setAnimKey(k => k + 1);
      if (cur < target) {
        timerRef.current = setTimeout(tick, stepMs);
      } else {
        initDoneRef.current = true;
      }
    };
    timerRef.current = setTimeout(tick, stepMs);
    return () => clearTimeout(timerRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!initDoneRef.current) return;
    if (count > prevCountRef.current) {
      setDisplayed(count);
      setAnimKey(k => k + 1);
    }
    prevCountRef.current = count;
  }, [count]);

  return (
    <span style={{ overflow: 'hidden', height: '1.2em', display: 'inline-flex', alignItems: 'center', marginLeft: 2 }}>
      <span
        key={animKey}
        style={{
          display: 'block',
          animation: 'count-roll 0.15s ease-out',
          fontFamily: '"Fugaz One", sans-serif',
          fontSize: 13,
          fontWeight: 400,
          color: '#FE2C55',
          lineHeight: 1.2,
          WebkitTextStrokeWidth: '0',
        }}
      >
        ×{displayed}
      </span>
    </span>
  );
}

// 单条弹幕 — isPlusOne: 可+1弹幕; hasSentPlusOne: 已点击+1; isFeatured: 精选弹幕样式
function DanmakuItem({ text, isUser, isPlusOne, hasSentPlusOne, myKey, activeKey, likeCount, baseCount, isFeatured, replies, matchCount = 0, onItemClick, onEnd, onMeasure }) {
  const isLiked = likeCount > 0;
  // 精选弹幕不参与 popup/pause 系统
  const isActive = !isFeatured && (activeKey === myKey);
  const dimmed = !isFeatured && (!!activeKey && !isActive);
  const spanRef = useRef(null);
  useEffect(() => {
    if (spanRef.current) onMeasure?.(spanRef.current.offsetWidth);
  }, []);

  const showAsUser = isUser || (isPlusOne && hasSentPlusOne);
  const showPlusOne = isPlusOne && !hasSentPlusOne;

  return (
    <span
      ref={spanRef}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'inline-flex',
        alignItems: 'center',
        gap: showPlusOne ? 4 : isFeatured ? 8 : undefined,
        ...(showAsUser ? {
          height: 25,
          padding: '0 8px',
          border: '1px solid rgba(255,255,255,0.8)',
          borderRadius: 22,
          background: 'transparent',
          boxSizing: 'border-box',
        } : showPlusOne ? {
          height: 25,
          padding: '2px 10px',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 23,
          background: 'rgba(0,0,0,0.1)',
          boxSizing: 'border-box',
        } : {}),
        color: '#FFF',
        WebkitTextStrokeWidth: (showAsUser || showPlusOne) ? '0' : '0.5px',
        WebkitTextStrokeColor: 'rgba(0,0,0,0.75)',
        textShadow: (showAsUser || showPlusOne) ? 'none' : undefined,
        fontFamily: '"PingFang SC", sans-serif',
        fontSize: 15,
        fontWeight: 500,
        fontStyle: 'normal',
        lineHeight: 'normal',
        whiteSpace: 'nowrap',
        willChange: 'transform',
        animation: `danmaku-item ${ITEM_DURATION}s linear forwards`,
        animationPlayState: isActive ? 'paused' : 'running',
        opacity: dimmed ? 0.25 : 1,
        transition: 'opacity 0.2s, border-color 0.2s',
        pointerEvents: isFeatured ? 'none' : 'auto',
        cursor: isFeatured ? 'default' : 'pointer',
      }}
      onClick={isFeatured ? undefined : (e => { e.stopPropagation(); onItemClick(e, myKey, text, isPlusOne); })}
      onAnimationEnd={e => { if (e.animationName === 'danmaku-item') onEnd(); }}
    >
      {isFeatured && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', flexShrink: 0,
          height: 20, padding: '0 4px', borderRadius: 4, overflow: 'hidden',
          backgroundImage: 'linear-gradient(127.148deg, rgba(254,44,85,0.7) 11.878%, rgba(129,17,39,0.7) 100%), linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.06) 100%)',
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="11" viewBox="0 0 24 11" fill="none">
            <path d="M15.252 2.112L12.648 1.296V0.0239997L15.252 0.84V2.112ZM21.012 5.268V7.176C21.012 7.296 21.06 7.368 21.156 7.392C21.372 7.416 21.58 7.416 21.78 7.392C21.884 7.368 21.936 7.296 21.936 7.176V5.904L23.232 6.072V7.62C23.192 8.212 22.92 8.56 22.416 8.664C21.768 8.768 21.144 8.776 20.544 8.688C19.936 8.568 19.62 8.212 19.596 7.62V5.268H18.66C18.548 6.092 18.276 6.8 17.844 7.392C17.42 7.984 16.788 8.528 15.948 9.024L15.444 7.608C16.484 7 17.088 6.22 17.256 5.268H15.456L15.336 4.092H18.66V2.52H17.232C17.16 2.792 17.044 3.16 16.884 3.624H15.48C15.864 2.616 16.16 1.5 16.368 0.276H17.748C17.684 0.644 17.612 1.008 17.532 1.368H18.66V0H20.076V1.368H22.596V2.52H20.076V4.092H23.016V5.268H21.012ZM14.88 7.284C14.944 8.044 15.196 8.588 15.636 8.916C16.012 9.196 16.556 9.336 17.268 9.336H23.22L22.908 10.596H17.244C15.748 10.596 14.768 10.088 14.304 9.072C14.08 9.696 13.48 10.292 12.504 10.86L12.096 9.648C12.52 9.392 12.86 9.056 13.116 8.64C13.372 8.216 13.504 7.784 13.512 7.344V4.416C13.504 4.288 13.436 4.22 13.308 4.212H12.42L12.3 3.012H13.932C14.564 3.012 14.88 3.324 14.88 3.948V7.284Z" fill="white"/>
            <path d="M3.264 3.168L3.552 0.84H4.596L4.308 3.168H3.264ZM0.312 0.84H1.38L1.68 3.168H0.612L0.312 0.84ZM9.216 9H6.24V10.824H4.836V6.036C4.836 5.396 5.14 5.076 5.748 5.076H9.708C10.316 5.076 10.62 5.396 10.62 6.036V9.528C10.62 9.904 10.508 10.208 10.284 10.44C10.06 10.664 9.76 10.784 9.384 10.8C8.824 10.816 8.312 10.78 7.848 10.692L7.584 9.54C7.984 9.62 8.38 9.656 8.772 9.648C9.068 9.632 9.216 9.504 9.216 9.264V9ZM9.216 7.992V7.584H6.24V7.992H9.216ZM9.216 6.576V6.336C9.216 6.216 9.16 6.156 9.048 6.156H6.408C6.296 6.156 6.24 6.216 6.24 6.336V6.576H9.216ZM8.436 3.6H11.148V4.68H4.572L4.464 3.6H7.02V3.24H5.088L4.968 2.184H7.02V1.824H4.872L4.74 0.744H7.02V0H8.436V0.744H10.776V1.824H8.436V2.184H10.548V3.24H8.436V3.6ZM3.108 6.624V10.824H1.812V7.32C1.476 8.056 1.04 8.68 0.504 9.192L0 7.908C0.76 7.06 1.272 6.088 1.536 4.992H0.312L0.192 3.792H1.812V0.0119998H3.108V3.792H4.332V4.992H3.108V5.76H3.984L4.668 8.4H3.552L3.108 6.624Z" fill="white"/>
          </svg>
        </span>
      )}
      {text}
      {isUser && matchCount > 0 && <CounterBadge count={matchCount} />}
      {showPlusOne && <PlusOneIcon />}
      {isFeatured && replies > 0 && (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 2,
          height: 22,
          padding: '0 7px',
          borderRadius: 14,
          border: '0.5px solid rgba(255,255,255,0.15)',
          background: 'rgba(255,255,255,0.1)',
          flexShrink: 0,
          fontFamily: '"PingFang SC", sans-serif',
          fontWeight: 400,
          fontSize: 12,
          color: '#FFF',
          WebkitTextStrokeWidth: '0',
          lineHeight: 'normal',
        }}>
          {replies}条回复
          <svg width="4" height="7" viewBox="0 0 4 7" fill="none" style={{ flexShrink: 0 }}>
            <path d="M1 1L3 3.5L1 6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}
      {isLiked && !showPlusOne && !isFeatured && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, marginLeft: 6 }}>
          <DanmakuHeartIcon />
        </span>
      )}
    </span>
  );
}

// 单行弹幕轨道
function DanmakuRowTrack({ rowIndex, top, pendingUser, onUserEnd, activeKey, onItemClick, likeMap, onRegister, bgTexts, plusOneSent, plusOneTextSet, onTextAppear, onTextLeave, textCounts, syncRows, onItemActive, onItemInactive, onUserItemFired, magnetedKeys }) {
  const [active, setActive] = useState([]);
  const bgIndex = useRef(0);
  const userQueue = useRef([]);
  const enqueuedIds = useRef(new Set());
  const fireTimerRef = useRef(null);
  const lastFiredKeyRef = useRef(null);
  const lastFireTimeRef = useRef(0);    // timestamp of last fire
  const lastFiredWidthRef = useRef(90); // measured width of last fired danmaku
  // fireRef holds the latest fire fn so setTimeout closure never goes stale
  const fireRef = useRef(null);

  useEffect(() => {
    let hasUserSend = false;
    pendingUser.forEach(d => {
      if (!enqueuedIds.current.has(d.id)) {
        enqueuedIds.current.add(d.id);
        if (d.isPreset) {
          if (d.delay) {
            // 到时直接插队并立即发射，不等下一个背景节奏
            setTimeout(() => {
              userQueue.current.unshift(d);
              clearTimeout(fireTimerRef.current);
              fireTimerRef.current = setTimeout(() => fireRef.current?.(), 0);
            }, d.delay);
          } else {
            userQueue.current.push(d);
          }
        } else {
          // 用户手动发送：插到队列最前，尽快发射
          userQueue.current.unshift(d);
          hasUserSend = true;
        }
      }
    });
    if (hasUserSend) {
      // 计算距上次发射已过了多久，推算最早可安全发射的时刻
      const speed = 890 / ITEM_DURATION;
      const elapsed = Date.now() - lastFireTimeRef.current;
      const needed = (lastFiredWidthRef.current + MIN_GAP) / speed * 1000;
      const waitMore = Math.max(50, needed - elapsed);
      clearTimeout(fireTimerRef.current);
      fireTimerRef.current = setTimeout(() => fireRef.current?.(), waitMore);
    }
  }, [pendingUser]);

  // Always keep fireRef.current up-to-date with latest props/state
  fireRef.current = () => {
    let entry;
    const baseCount = Math.floor(Math.random() * 81) + 20;
    const now = Date.now();
    if (userQueue.current.length > 0) {
      const u = userQueue.current.shift();
      entry = { key: `u-${u.id}`, text: u.text, isUser: !u.isPreset, origId: u.id, baseCount, isPlusOne: u.isPlusOne ?? false, featured: u.featured ?? false, replies: u.replies ?? 0, firedAt: now };
    } else {
      const pool = bgTexts ?? BG_TEXTS[rowIndex];
      // 过滤掉用户已通过 +1 发送过的文本，避免后续循环中重复出现
      const filteredPool = plusOneSent?.size > 0 ? pool.filter(t => !plusOneSent.has(t)) : pool;
      const activePool = filteredPool.length > 0 ? filteredPool : pool;
      const txt = activePool[bgIndex.current % activePool.length];
      bgIndex.current++;
      entry = { key: `bg-${rowIndex}-${now}`, text: txt, isUser: false, baseCount, isPlusOne: plusOneTextSet?.has(txt) ?? false, firedAt: now };
    }
    onRegister?.(entry.key, baseCount);
    lastFiredKeyRef.current = entry.key;
    lastFireTimeRef.current = now;
    onTextAppear?.(entry.text);
    onItemActive?.(entry.key, entry.text, rowIndex, now);
    if (entry.isUser) onUserItemFired?.(entry.key, entry.text, rowIndex, now);
    setActive(prev => [...prev, entry]);
    // Schedule next fire using estimated width (will be corrected by onMeasure)
    scheduleNext(estimateWidth(entry.text, entry.isUser));
  };

  function estimateWidth(text, isUser) {
    // Chinese chars ≈ 15px each at fontSize:15 fontWeight:500; +16px for user pill padding
    return text.length * 15 + (isUser ? 16 : 0);
  }

  function scheduleNext(width) {
    const speed = 890 / ITEM_DURATION; // px/s
    const delay = Math.max(500, (width + MIN_GAP) / speed * 1000);
    clearTimeout(fireTimerRef.current);
    fireTimerRef.current = setTimeout(() => fireRef.current?.(), delay);
  }

  // Called by DanmakuItem once it mounts and reports its real rendered width
  function handleMeasure(key, width) {
    if (key !== lastFiredKeyRef.current) return;
    lastFiredWidthRef.current = width;
    scheduleNext(width);
  }

  useEffect(() => {
    const init = setTimeout(() => fireRef.current?.(), syncRows ? 0 : rowIndex * 1000);
    return () => {
      clearTimeout(init);
      clearTimeout(fireTimerRef.current);
    };
  }, []);

  function remove(key, origId, text) {
    setActive(prev => prev.filter(i => i.key !== key));
    if (text) onTextLeave?.(text);
    onItemInactive?.(key);
    if (origId) onUserEnd(origId);
  }

  return (
    <div style={{ position: 'absolute', top, left: 0, width: 390, height: 25, overflow: 'hidden' }}>
      {active.map(item => (
        <DanmakuItem
          key={item.key}
          myKey={item.key}
          text={item.text}
          isUser={item.isUser}
          isPlusOne={item.isPlusOne}
          hasSentPlusOne={plusOneSent?.has(item.text)}
          activeKey={activeKey}
          likeCount={likeMap?.[item.key] ? 1 : 0}
          baseCount={item.baseCount}
          isFeatured={item.featured}
          replies={item.replies}
          matchCount={textCounts?.[item.text] ?? 0}
          onItemClick={(e, key, text, ip) => onItemClick(e, key, rowIndex, text, ip)}
          onEnd={() => remove(item.key, item.origId, item.text)}
          onMeasure={w => handleMeasure(item.key, w)}
        />
      ))}
    </div>
  );
}

// Danmaku overlay — 3 独立行轨道，统一调度背景 + 用户弹幕
// panelOpen=true 时将容器切换为 pointer-events:auto 并 stopPropagation，
// 防止弹幕区域内的空白点击冒泡到主容器导致面板意外关闭。
function DanmakuOverlay({ userDanmakus = [], onRemove, activeKey, onItemClick, likeMap, onRegister, bgTexts, panelOpen = false, plusOneSent, plusOneTextSet, syncRows = false, onUserDanmakuAppear, disableCounter = false }) {
  const [textCounts, setTextCounts] = useState({});
  const [magnetedKeys, setMagnetedKeys] = useState(new Set());
  const [ghosts, setGhosts] = useState([]);
  const activeItemsRef = useRef({});      // { [key]: { text, row, firedAt } }
  const activeUserItemsRef = useRef({}); // { [text]: { key, row, firedAt } }

  function onTextAppear(text) {
    setTextCounts(prev => ({ ...prev, [text]: (prev[text] || 0) + 1 }));
  }
  function onTextLeave(_text) {}

  function handleItemActive(key, text, row, firedAt) {
    activeItemsRef.current[key] = { text, row, firedAt };
    const userItem = activeUserItemsRef.current[text];
    if (userItem && key !== userItem.key) {
      // 同文本的新弹幕在用户弹幕出现后触发 → 磁吸
      doMagnetize(key, text, row, userItem);
    }
  }

  function handleItemInactive(key) {
    const item = activeItemsRef.current[key];
    if (item) {
      if (activeUserItemsRef.current[item.text]?.key === key) {
        delete activeUserItemsRef.current[item.text];
      }
      delete activeItemsRef.current[key];
    }
  }

  function handleUserItemFired(key, text, row, firedAt) {
    activeUserItemsRef.current[text] = { key, row, firedAt };
    onUserDanmakuAppear?.(text);
  }

  function doMagnetize(bgKey, text, bgRow, userItem) {
    const GHOST_DUR = 0.55; // seconds
    const userElapsed = Date.now() - userItem.firedAt;
    const userCurrentX = 390 - (userElapsed / (ITEM_DURATION * 1000)) * 890;
    // 用户弹幕已滑出左侧屏幕外，暂停磁吸效果
    if (userCurrentX < 0) return;
    const fromX = 390;                    // bg 弹幕从右侧入场
    const fromY = ROW_TOPS[bgRow];
    const toX = Math.max(-480, 390 - ((userElapsed + GHOST_DUR * 1000) / (ITEM_DURATION * 1000)) * 890);
    const toY = ROW_TOPS[userItem.row];
    setMagnetedKeys(prev => new Set([...prev, bgKey]));
    setGhosts(prev => [...prev, { id: `ghost-${bgKey}`, text, fromX, fromY, toX, toY, dur: GHOST_DUR }]);
  }

  return (
    <>
      <style>{`
        @keyframes danmaku-item {
          from { transform: translateX(390px); }
          to   { transform: translateX(-500px); }
        }
        @keyframes count-roll {
          from { transform: translateY(-60%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
      <div
        className="absolute"
        style={{ top: 0, left: 0, width: 390, height: 200, zIndex: 10,
                 pointerEvents: panelOpen ? 'auto' : 'none' }}
        onClick={panelOpen ? e => e.stopPropagation() : undefined}
      >
        {[0, 1, 2].map(ri => (
          <DanmakuRowTrack
            key={ri}
            rowIndex={ri}
            top={ROW_TOPS[ri]}
            pendingUser={userDanmakus.filter(d => d.row === ri)}
            onUserEnd={onRemove}
            activeKey={activeKey}
            onItemClick={onItemClick}
            likeMap={likeMap}
            onRegister={onRegister}
            bgTexts={bgTexts?.[ri]}
            plusOneSent={plusOneSent}
            plusOneTextSet={plusOneTextSet}
            onTextAppear={onTextAppear}
            onTextLeave={onTextLeave}
            textCounts={disableCounter ? undefined : textCounts}
            syncRows={syncRows}
            onItemActive={handleItemActive}
            onItemInactive={handleItemInactive}
            onUserItemFired={handleUserItemFired}
            magnetedKeys={magnetedKeys}
          />
        ))}
      </div>

      {/* 磁吸幽灵层 — 被吸走的弹幕飞向用户弹幕位置后消失 */}
      <AnimatePresence>
        {ghosts.map(g => (
          <motion.span
            key={g.id}
            style={{
              position: 'absolute', left: 0, top: 0,
              pointerEvents: 'none', zIndex: 11,
              color: '#FFF',
              fontFamily: '"PingFang SC", sans-serif',
              fontSize: 15, fontWeight: 500, whiteSpace: 'nowrap',
              WebkitTextStrokeWidth: '0.5px',
              WebkitTextStrokeColor: 'rgba(0,0,0,0.75)',
            }}
            initial={{ x: g.fromX, y: g.fromY, scale: 1, opacity: 1 }}
            animate={{ x: g.toX, y: g.toY, scale: 0, opacity: 0 }}
            transition={{ duration: g.dur, ease: 'easeIn' }}
            onAnimationComplete={() => setGhosts(prev => prev.filter(x => x.id !== g.id))}
          >
            {g.text}
          </motion.span>
        ))}
      </AnimatePresence>
    </>
  );
}

// --- Emoji Float Effect ---
// Sizes follow a bell curve: largest near horizontal center (~162px), smallest at edges.
// x is calculated so each item's center stays at its intended position.
const EMOJI_FLOAT_ITEMS = [
  { x: 19,  size: 44, riseDelay: 0,    targetY: 480, fadeOrder: 2 },  // far left  → small
  { x: 86,  size: 66, riseDelay: 0.45, targetY: 330, fadeOrder: 0 },  // near center → large
  { x: 155, size: 73, riseDelay: 0.85, targetY: 530, fadeOrder: 3 },  // near center → large
  { x: 49,  size: 57, riseDelay: 0.2,  targetY: 400, fadeOrder: 1 },  // left-mid  → medium
  { x: 229, size: 52, riseDelay: 1.05, targetY: 365, fadeOrder: 4 },  // right-mid → medium
  { x: 266, size: 43, riseDelay: 0.65, targetY: 575, fadeOrder: 5 },  // far right → small
  { x: 111, size: 80, riseDelay: 1.25, targetY: 440, fadeOrder: 6 },  // center    → largest
];

function EmojiFloatItem({ x, size, riseDelay, targetY, fadeOrder, fading }) {
  return (
    <motion.img
      src={_imgEmojiFloat}
      alt=""
      style={{
        position: 'absolute',
        left: x,
        width: size,
        height: size,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
      initial={{ y: 870, opacity: 0 }}
      animate={fading
        ? { y: targetY, opacity: 0 }
        : { y: targetY, opacity: 1 }}
      transition={fading
        ? { y: { duration: 0 }, opacity: { duration: 0.4, delay: fadeOrder * 0.13 } }
        : {
            y: { duration: 1.3, delay: riseDelay, ease: [0.25, 0.46, 0.45, 0.94] },
            opacity: { duration: 0.4, delay: riseDelay },
          }}
    />
  );
}

function EmojiFloatEffect({ triggerKey }) {
  const [active, setActive] = useState(false);
  const [fading, setFading] = useState(false);
  const prevKeyRef = useRef(triggerKey);

  useEffect(() => {
    if (triggerKey === prevKeyRef.current) return;
    prevKeyRef.current = triggerKey;
    setActive(true);
    setFading(false);
    const t1 = setTimeout(() => setFading(true), 2600);
    const t2 = setTimeout(() => setActive(false), 4400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [triggerKey]);

  if (!active) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20 }}>
      {EMOJI_FLOAT_ITEMS.map((item, i) => (
        <EmojiFloatItem key={i} {...item} fading={fading} />
      ))}
    </div>
  );
}

// --- Kite Danmaku (特殊弹幕 for slide 11) ---
// Paper note height = top(64) + middle(dynamic) + bottom(61)
// Middle grows with text length (vertical Chinese chars ~18px each), capped at 120px.
const KITE_PAPER_TOP_H    = 64;
const KITE_PAPER_BOTTOM_H = 61;
const KITE_PAPER_MID_MIN  = 20;
const KITE_PAPER_MID_MAX  = 120;
const KITE_PAPER_W        = 48;  // paper width
const KITE_ROPE_H         = 74;
const KITE_BIRD_W         = 124;
const KITE_BIRD_H         = 94;

// ── 柳絮飘落效果 ─────────────────────────────────────────────
const WILLOW_LEAF_ITEMS = [
  { id: 0, img: 0, x: 22,  size: 50, delay: 1.0, duration: 5.5, drift: 22,  startY:  60 },
  { id: 1, img: 2, x: 118, size: 38, delay: 2.6, duration: 4.8, drift: -28, startY: -38 },
  { id: 2, img: 4, x: 215, size: 46, delay: 1.8, duration: 6.2, drift:  32, startY: 320 },
  { id: 3, img: 1, x: 305, size: 36, delay: 3.3, duration: 5.0, drift: -22, startY: -36 },
  { id: 4, img: 6, x: 68,  size: 44, delay: 4.4, duration: 5.8, drift: -26, startY: -44 },
  { id: 5, img: 3, x: 262, size: 50, delay: 2.1, duration: 4.6, drift:  20, startY: 190 },
  { id: 6, img: 7, x: 158, size: 34, delay: 3.9, duration: 5.4, drift: -18, startY: -34 },
  { id: 7, img: 5, x: 338, size: 42, delay: 1.4, duration: 6.0, drift:  24, startY: 490 },
];

// triggerKey 变化时重新挂载，播放一次后自然结束（不循环）
function WillowLeafEffect({ triggerKey }) {
  return (
    <div
      key={triggerKey}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20, overflow: 'hidden' }}
    >
      {WILLOW_LEAF_ITEMS.map(({ id, img, x, size, delay, duration, drift, startY }) => (
        <motion.img
          key={id}
          src={_WILLOW_SRCS[img]}
          style={{
            position: 'absolute',
            left: x,
            top: 0,
            width: size,
            height: 'auto',
            pointerEvents: 'none',
          }}
          initial={{ y: startY ?? -size, opacity: 0 }}
          animate={{
            y: 844 + size,
            x: [0, drift, -drift / 2, drift / 3, 0],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration,
            delay,
            y:       { ease: 'linear', duration },
            x:       { ease: 'easeInOut', times: [0, 0.3, 0.6, 0.85, 1], duration },
            opacity: { times: [0, 0.08, 0.88, 1], duration },
          }}
        />
      ))}
    </div>
  );
}

function KiteDanmakuItem({ text, onDone }) {
  const midH = Math.min(KITE_PAPER_MID_MAX, Math.max(KITE_PAPER_MID_MIN, text.length * 18));
  const paperH = KITE_PAPER_TOP_H + midH + KITE_PAPER_BOTTOM_H;
  const totalH = KITE_BIRD_H + KITE_ROPE_H + paperH;

  const startY = 844 - totalH;  // 底部与屏幕底边对齐，从下方升入
  const endY   = 170 - totalH;  // 弹幕区域下沿

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        marginLeft: -(KITE_BIRD_W / 2),
        pointerEvents: 'none',
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      initial={{ x: 0, y: startY, opacity: 0 }}
      animate={{
        x: [0, 55, -10, -60, 20, 0],
        y: endY,
        opacity: [0, 0, 1, 1, 0],
      }}
      transition={{
        x: { duration: 9, times: [0, 0.2, 0.45, 0.65, 0.85, 1], ease: 'easeInOut' },
        y: { duration: 9, ease: 'easeInOut' },
        opacity: { duration: 9, times: [0, 0.11, 0.22, 0.72, 0.83] },
      }}
      onAnimationComplete={onDone}
    >
      {/* 纸鸢 kite */}
      <img
        src={_imgKiteBird}
        alt=""
        style={{
          width: KITE_BIRD_W,
          height: KITE_BIRD_H,
          objectFit: 'contain',
          transform: 'rotate(-4.21deg)',
          filter: 'drop-shadow(0px 2px 25px rgba(236,255,224,0.30))',
          flexShrink: 0,
        }}
      />

      {/* 绳子 rope — 1px wide, pulled up to overlap into kite body */}
      <div style={{
        width: 1,
        height: KITE_ROPE_H,
        marginTop: -28,  // reach up past shadow into the kite body
        flexShrink: 0,
        background: 'url(' + _imgKiteRope + ') center/cover',
        backgroundColor: '#7B5B3A',  // fallback rope color
      }} />

      {/* 纸条 paper note — position:relative so text overlay works */}
      <div style={{
        position: 'relative',
        width: KITE_PAPER_W,
        marginTop: -2,    // close gap with rope
        transform: 'rotate(2.55deg)',
        filter: 'drop-shadow(0px 2px 21px rgba(236,255,224,0.15))',
        flexShrink: 0,
      }}>
        {/* 上部分 top — image + fade-to-cream at bottom */}
        <div style={{ position: 'relative', width: KITE_PAPER_W, height: KITE_PAPER_TOP_H, overflow: 'hidden' }}>
          <img src={_imgKitePaperTop} alt=""
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 24,
            background: 'linear-gradient(to bottom, rgba(254,245,236,0), #FEF5EC)',
          }} />
        </div>

        {/* 可拉长 middle — solid cream, same width */}
        <div style={{ width: KITE_PAPER_W, height: midH, background: '#FEF5EC' }} />

        {/* 下部分 bottom — fade-from-cream at top + image */}
        <div style={{ position: 'relative', width: KITE_PAPER_W, height: KITE_PAPER_BOTTOM_H, overflow: 'hidden' }}>
          <img src={_imgKitePaperBottom} alt=""
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 24,
            background: 'linear-gradient(to bottom, #FEF5EC, rgba(254,245,236,0))',
          }} />
        </div>

        {/* 文字 vertical text — centered on full paper height */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          fontFamily: '"PingFang SC", sans-serif',
          fontSize: 18,
          fontWeight: 500,
          color: '#294034',
          lineHeight: 1.2,
          letterSpacing: 7,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          maxHeight: KITE_PAPER_TOP_H + midH + KITE_PAPER_BOTTOM_H - 24,
        }}>
          {text}
        </div>
      </div>
    </motion.div>
  );
}

function KiteDanmakuEffect({ triggerText }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!triggerText) return;
    const id = Date.now();
    setItems(prev => [...prev, { id, text: triggerText }]);
  }, [triggerText]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 25 }}>
      {items.map(item => (
        <KiteDanmakuItem
          key={item.id}
          text={item.text}
          onDone={() => setItems(prev => prev.filter(i => i.id !== item.id))}
        />
      ))}
    </div>
  );
}

// --- Main Page Component ---
export default function TikTokHome({ className, videoSrc, username, description, avatarSrc, captionOffset = 0, presetDanmakus = [], bgTexts, videoFit = 'cover', videoScale = 1, videoOffsetY = 0, plusOneTextSet, disclaimerMaskHeight = 0, syncRows = false, emojiFloat = false, kiteDanmaku = false, disableCounter = false, willowLeaf = false }) {
  const [danmakuOpen, setDanmakuOpen] = useState(false);
  const [danmakuOn, setDanmakuOn] = useState(true);
  const [muted, setMuted] = useState(true);
  const [userDanmakus, setUserDanmakus] = useState(
    presetDanmakus.map(d => ({ id: crypto.randomUUID(), text: d.text, row: d.row ?? 0, isPreset: true, isPlusOne: d.plusOne ?? false, delay: d.delay ?? 0, featured: d.featured ?? false, replies: d.replies ?? 0 }))
  );
  const [plusOneSent, setPlusOneSent] = useState(new Set());
  const [danmakuPopup, setDanmakuPopup] = useState(null); // { key, left, top, arrowLeft, text }
  const [panelText, setPanelText] = useState('');         // controlled text for the input panel
  const [danmakuLikes, setDanmakuLikes] = useState({});  // { [key]: count }
  const [showSentToast, setShowSentToast] = useState(false);
  const [emojiFloatTrigger, setEmojiFloatTrigger] = useState(0);
  const [kiteDanmakuText, setKiteDanmakuText] = useState(null);
  const [willowLeafTrigger, setWillowLeafTrigger] = useState(0);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const popupTimerRef = useRef(null);
  const sentToastTimerRef = useRef(null);
  const itemBaseCountRef = useRef({}); // { [key]: baseCount } registered when each item fires

  function handleSend(text) {
    if (!text.trim()) return;
    const id = crypto.randomUUID();
    const row = Math.floor(Math.random() * 3); // random row 0-2
    setPanelText('');
    setDanmakuOpen(false);
    if (kiteDanmaku) {
      // 等风筝完全消失后（6.5s）再让普通弹幕飘入
      setKiteDanmakuText({ text: text.trim(), id: Date.now() });
      if (willowLeaf) setWillowLeafTrigger(prev => prev + 1);
      setTimeout(() => {
        setUserDanmakus(prev => [...prev, { id, text, row }]);
      }, 6500);
    } else {
      setUserDanmakus(prev => [...prev, { id, text, row }]);
    }
  }

  function removeDanmaku(id) {
    setUserDanmakus(prev => prev.filter(d => d.id !== id));
  }

  function handleLike() {
    if (!danmakuPopup) return;
    const key = danmakuPopup.key;
    setDanmakuLikes(prev => ({ ...prev, [key]: !prev[key] })); // toggle boolean
    dismissPopup();
  }

  function dismissPopup() {
    clearTimeout(popupTimerRef.current);
    setDanmakuPopup(null);
  }

  function scheduleAutoDismiss() {
    clearTimeout(popupTimerRef.current);
    popupTimerRef.current = setTimeout(dismissPopup, 6000);
  }

  function handlePlusOne(key, text) {
    setPlusOneSent(prev => new Set([...prev, text]));
    setShowSentToast(true);
    clearTimeout(sentToastTimerRef.current);
    sentToastTimerRef.current = setTimeout(() => setShowSentToast(false), 1800);
  }

  function handleDanmakuClick(e, key, rowIndex, text, isPlusOne) {
    e.stopPropagation();
    if (isPlusOne) { handlePlusOne(key, text); return; }
    if (danmakuPopup?.key === key) { dismissPopup(); return; }
    const containerRect = containerRef.current.getBoundingClientRect();
    const itemRect = e.currentTarget.getBoundingClientRect();
    const itemCenterX = itemRect.left - containerRect.left + itemRect.width / 2;
    let popupLeft = itemCenterX - 128;
    popupLeft = Math.max(8, Math.min(390 - 256 - 8, popupLeft));
    const arrowLeft = Math.max(8, Math.min(256 - 28, itemCenterX - popupLeft - 10));
    const popupTop = ROW_TOPS[rowIndex] + 25 + 4;
    const baseCount = itemBaseCountRef.current[key] || (Math.floor(Math.random() * 81) + 20);
    setDanmakuPopup({ key, left: popupLeft, top: popupTop, arrowLeft, baseCount, text });
    scheduleAutoDismiss();
  }

  function handleFollowSend(text) {
    dismissPopup();
    setPanelText(text);
    setDanmakuOpen(true);
  }

  return (
    <div
      ref={containerRef}
      className={className || "bg-black relative overflow-hidden"}
      style={{ width: 390, height: 844 }}
      data-name="首页 - 简洁"
      onClick={() => {
        // 点击弹幕区域外的视频区域：关闭面板 + 关闭弹出菜单
        // 弹幕区域内的点击已被 DanmakuOverlay 容器的 stopPropagation 拦截，不会到达这里
        if (danmakuOpen) setDanmakuOpen(false);
        if (danmakuPopup) dismissPopup();
      }}
    >
      {/* Background video */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        ...(videoScale !== 1 || videoOffsetY !== 0 ? {
          transform: `${videoOffsetY !== 0 ? `translateY(${videoOffsetY}px) ` : ''}scale(${videoScale})`,
          transformOrigin: 'center center',
        } : {}),
      }}>
        <video
          ref={videoRef}
          className="absolute pointer-events-none"
          style={videoFit === 'contain-top'
            ? { top: '50%', left: 0, width: '100%', height: 'auto', transform: 'translateY(calc(-50% - 32px))', display: 'block' }
            : { top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          src={videoSrc || bgVideo}
          autoPlay
          loop
          muted={muted}
          playsInline
        />
      </div>

      {/* Mute toggle button */}
      {!danmakuOpen && <div
        className="absolute cursor-pointer z-50"
        style={{ bottom: 100, right: 12 }}
        onClick={() => setMuted(v => !v)}
      >
        <div style={{
          width: 36, height: 36, borderRadius: 18,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {muted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M11 5L6 9H2v6h4l5 4V5z" fill="white"/>
              <line x1="23" y1="9" x2="17" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="17" y1="9" x2="23" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M11 5L6 9H2v6h4l5 4V5z" fill="white"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </div>
      </div>}

      {/* Top gradient mask */}
      <MaskTop className="absolute h-[108px] left-0 top-0 w-[390px]" />

      {/* Bottom gradient mask */}
      <MaskBottom className="absolute h-[280px] left-0 top-[481px] w-[390px]" />

      {/* 免责声明遮罩 — 覆盖视频内嵌文字，位于 video 层上方、StatusBar/TopNav/弹幕层下方 */}
      {disclaimerMaskHeight > 0 && (
        <div style={{
          position: 'absolute',
          top: 4,
          left: 0,
          width: 390,
          height: disclaimerMaskHeight,
          background: '#000',
        }} />
      )}

      {/* Status bar */}
      <StatusBar className="absolute h-[44px] left-0 top-0 w-[390px]" />

      {/* Top navigation */}
      <TopNav />

      {/* Danmaku overlay — hidden when danmakuOn is false */}
      {danmakuOn && (
        <DanmakuOverlay
          userDanmakus={userDanmakus}
          onRemove={removeDanmaku}
          activeKey={danmakuPopup?.key}
          onItemClick={handleDanmakuClick}
          likeMap={danmakuLikes}
          onRegister={(key, bc) => { itemBaseCountRef.current[key] = bc; }}
          bgTexts={bgTexts}
          panelOpen={danmakuOpen}
          plusOneSent={plusOneSent}
          plusOneTextSet={plusOneTextSet}
          syncRows={syncRows}
          onUserDanmakuAppear={emojiFloat ? (text) => { if (text === '接接接') setEmojiFloatTrigger(v => v + 1); } : undefined}
          disableCounter={disableCounter}
        />
      )}

      {/* +1 已发送 toast — 居中显示，Figma node 143-3278 */}
      <AnimatePresence>
        {showSentToast && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 100, pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <motion.div
              key="sent-toast"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.18 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 16px',
                background: '#393B44',
                borderRadius: 56,
                height: 40,
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{
                fontFamily: '"PingFang SC", sans-serif',
                fontSize: 14,
                fontWeight: 400,
                color: '#FFFFFF',
                lineHeight: 'normal',
              }}>
                弹幕已发送
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Danmaku click popover */}
      {danmakuPopup && (
        <DanmakuPopover
          left={danmakuPopup.left}
          top={danmakuPopup.top}
          arrowLeft={danmakuPopup.arrowLeft}
          onLike={handleLike}
          onFollowSend={() => handleFollowSend(danmakuPopup.text)}
          baseCount={danmakuPopup.baseCount || 20}
          currentLikeCount={(danmakuPopup.baseCount || 20) + (danmakuLikes[danmakuPopup.key] ? 1 : 0)}
        />
      )}

      {/* Willow leaf falling effect — only when kite danmaku is triggered */}
      {willowLeaf && willowLeafTrigger > 0 && <WillowLeafEffect key={willowLeafTrigger} triggerKey={willowLeafTrigger} />}

      {/* Emoji float effect — triggered when user sends "接接接" */}
      {emojiFloat && <EmojiFloatEffect triggerKey={emojiFloatTrigger} />}

      {/* Kite danmaku — special style for slide 11, triggered on any user send */}
      {kiteDanmaku && kiteDanmakuText && (
        <KiteDanmakuEffect key={kiteDanmakuText.id} triggerText={kiteDanmakuText.text} />
      )}

      {/* Right action panel */}
      <ActionPanel avatarSrc={avatarSrc} />

      {/* Caption (username + description) */}
      <Caption username={username} description={description} topOffset={captionOffset} />

      {/* Danmaku input button */}
      <DanmakuButton onClick={e => { e.stopPropagation(); setDanmakuOpen(true); }} topOffset={captionOffset} />

      {/* Bottom navigation — hidden when panel open */}
      {!danmakuOpen && <BottomNav />}

      {/* Danmaku input panel */}
      <AnimatePresence>
        {danmakuOpen && (
          <DanmakuPanel
            onSend={handleSend}
            danmakuOn={danmakuOn}
            onToggleDanmaku={() => setDanmakuOn(v => !v)}
            text={panelText}
            onTextChange={setPanelText}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
