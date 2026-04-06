/**
 * Demo 页面配置
 * ─────────────────────────────────────────────────────────────
 * 每个对象对应一个页面的 TikTokHome demo。
 * 字段说明：
 *   slide      — 对应 App.jsx 中 SLIDES 的 id（0-based），如 6 = 页面7
 *   label      — 右侧导航点悬停时显示的名称
 *   video      — 视频文件路径（相对于 src/assets/figma/）
 *   avatar     — 头像文件路径（相对于 src/assets/figma/）
 *   username   — 用户名（含 @）
 *   description — 视频描述文字
 *   captionOffset — 用户名/弹幕按钮整体下移像素数（默认 0）
 *   danmakus   — 预设弹幕列表，格式：{ text: "弹幕内容", row: 0|1|2 }
 *                row 0 = 第一行，row 1 = 第二行，row 2 = 第三行
 * ─────────────────────────────────────────────────────────────
 */

const DEMOS = [
  {
    slide: 6,
    label: '页面 7 · 用例 Demo',
    video: 'usecase1.mov',
    avatar: 'avatar-p7.jpg',
    username: '@圆滚滚的瑞吉',
    description: '太多粉丝喜欢我们瑞吉了真棒～#瑞吉#奇妙的动物#动物的迷惑行为',
    captionOffset: 0,
    danmakus: [
      // { text: '好可爱！', row: 0 },
      // { text: '瑞吉瑞吉', row: 1 },
    ],
  },
  {
    slide: 7,
    label: '页面 8 · 用例 Demo',
    video: 'usecase2.mov',
    avatar: 'avatar-p8.jpg',
    username: '@高冷兄弟',
    description: '你的男神已上线#刘耀文',
    captionOffset: 24,
    danmakus: [
      { text: '男神你随便吧', row: 0 },
      { text: '老公你随便吧', row: 0 },
      { text: '男神你随便吧', row: 0 },
      { text: '男神你随便吧', row: 0 },
      { text: '男神你随便吧', row: 0 },
      { text: '男神你随便吧', row: 0 },
      { text: '神了吧', row: 1 },
      { text: '太帅了', row: 1 },
      { text: '男神你随便吧', row: 1 },
      { text: '男神你随便吧', row: 1 },
      { text: '男神你随便吧', row: 1 },
      { text: '老公你随便吧', row: 1 },
      { text: '男神你随便吧', row: 1 },
      { text: '夯爆了', row: 2},
      { text: '男神！', row: 2 },
      { text: '男神你随便吧', row: 2 },
      { text: '老公你随便吧', row: 2 },
      { text: '男神你随便吧', row: 2 },
    ],
  },

  // ── 在此继续添加新的 demo ──────────────────────────────────
  // {
  //   slide: 8,          // 页面9
  //   label: '页面 9 · 用例 Demo',
  //   video: 'usecase3.mov',
  //   avatar: 'avatar-p9.jpg',
  //   username: '@用户名',
  //   description: '描述文字 #标签',
  //   captionOffset: 0,
  //   danmakus: [
  //     { text: '弹幕内容', row: 0 },
  //   ],
  // },
];

export default DEMOS;
