# zihuichen.com

Zihui Chen 的个人主页，使用 Astro + Tailwind CSS 构建，部署在 Cloudflare Pages。

**线上地址**: https://zihuichen.com

---

## 目录

- [这个项目是什么？](#这个项目是什么)
- [技术栈总览](#技术栈总览)
- [架构图](#架构图)
- [项目结构详解](#项目结构详解)
  - [src/components/ — 页面组件](#srccomponents--页面组件)
  - [src/layouts/ — 全局布局](#srclayouts--全局布局)
  - [src/pages/ — 页面路由](#srcpages--页面路由)
  - [配置文件](#配置文件)
- [页面内容说明](#页面内容说明)
- [交互背景效果](#交互背景效果)
- [设计系统](#设计系统)
- [关联项目](#关联项目)
- [本地开发指南](#本地开发指南)
- [部署到 Cloudflare Pages](#部署到-cloudflare-pages)
- [常用命令速查](#常用命令速查)

---

## 这个项目是什么？

这是 Zihui Chen 的个人主页，一个单页面作品集网站。展示个人项目、关注领域和技能。

页面包含以下板块：
- **Hero** — 导航栏 + 大标题 + 统计标签
- **About** — 四个关注方向卡片
- **Projects** — 项目展示（VC Radar、Zihui Notes、Personal Lab）
- **Skills** — 技能标签云
- **Contact** — 联系方式
- **Footer** — 项目链接 + GitHub

---

## 技术栈总览

| 层 | 技术 | 作用 |
|----|------|------|
| **框架** | Astro 5.0 | 静态网站生成器，零 JavaScript 运行时（除了交互背景的 Canvas） |
| **样式** | Tailwind CSS 3.4 | 原子化 CSS 框架，所有样式直接写在 HTML class 中 |
| **语言** | TypeScript | 类型安全 |
| **交互** | Canvas API | 点阵网格背景 + 鼠标交互动画 |
| **动画** | CSS + Intersection Observer | 滚动触发的渐入动画 |
| **托管** | Cloudflare Pages | 静态站点托管，全球 CDN |
| **CI/CD** | GitHub Actions | Push 到 main 自动构建部署 |

---

## 架构图

```
用户浏览器
    |
    | 访问 zihuichen.com
    v
┌─────────────────────────────────────────┐
│          Cloudflare Pages (CDN)          │
│                                          │
│  静态 HTML + CSS + JS                    │
│  由 Astro 在构建时生成                    │
│                                          │
│  ┌──────────┐ ┌──────────┐ ┌─────────┐  │
│  │ index.html│ │ CSS 文件  │ │ JS 文件  │  │
│  │（完整页面）│ │(Tailwind) │ │(Canvas) │  │
│  └──────────┘ └──────────┘ └─────────┘  │
└─────────────────────────────────────────┘
```

与 VC Radar 和 Zihui Notes 不同，这个网站是**纯静态**的：
- 没有服务端运行时、没有数据库、没有 API
- Astro 在构建时把所有 `.astro` 组件编译成一个 `index.html`
- 唯一的客户端 JavaScript 是 Canvas 背景动画和滚动触发动画

---

## 项目结构详解

```
homepage/
├── src/
│   ├── components/              # 页面各板块组件
│   │   ├── Hero.astro           # 导航栏 + 大标题 + 角色描述 + 统计标签
│   │   ├── About.astro          # 四个关注方向卡片（Research/Analysis/Build/Notes）
│   │   ├── Projects.astro       # 三个项目展示卡片
│   │   ├── Skills.astro         # 四类技能标签
│   │   ├── Contact.astro        # 联系 CTA 卡片
│   │   └── Footer.astro         # 统一页脚（项目链接 + GitHub + 版权）
│   ├── layouts/
│   │   └── Layout.astro         # 全局布局：HTML 壳 + 字体 + Canvas 背景 + 动画
│   └── pages/
│       └── index.astro          # 主页：组合所有组件
├── public/
│   └── favicon.svg              # 网站图标
├── .github/workflows/
│   └── deploy.yml               # GitHub Actions 自动部署
├── astro.config.mjs             # Astro 配置
├── tailwind.config.mjs          # Tailwind 配色和字体配置
├── tsconfig.json                # TypeScript 配置
└── package.json                 # 依赖和脚本
```

---

### src/components/ — 页面组件

每个 `.astro` 文件是一个独立的组件，包含三部分：
1. **Frontmatter**（`---` 之间）：组件逻辑和数据定义
2. **模板**：HTML + Tailwind class
3. **`<style>`**：组件局部样式（不使用 Tailwind 时）

#### `Hero.astro` — 首屏

页面最顶部区域：
- **导航栏**：品牌名 + 项目链接（Projects / About / VC Radar / Notes / GitHub）
- **角色标签**：`researcher / developer / builder` 橙色标签
- **大标题**：`ZIHUI CHEN.` 带橙色句点
- **描述**：一句话介绍
- **CTA 按钮**：View Projects + Get in Touch
- **统计标签**：三个小徽章（项目数 / 研究方向 / 开发能力）

#### `About.astro` — 关注方向

四个卡片，每个代表一个关注领域：

| 标签 | 标题 | 说明 |
|------|------|------|
| RESEARCH | Technology Research | 科技趋势、AI、创业生态 |
| ANALYSIS | VC News Analysis | 追踪顶级 VC 的观点 |
| BUILD | Project Development | 构建开源工具 |
| LEARN | Quick Notes | 快速笔记和知识记录 |

#### `Projects.astro` — 项目展示

三个项目卡片，每个包含名称、状态标签、描述、技术栈标签和外链：

| 项目 | 状态 | 链接 |
|------|------|------|
| VC Radar | LIVE | https://vc.zihuichen.com |
| Zihui Notes | ACTIVE | https://notes.zihuichen.com |
| Personal Lab | ONGOING | GitHub |

卡片 hover 时有上浮效果和左侧橙色竖条指示器。

#### `Skills.astro` — 技能标签

四个分类的技能标签云：
- **Languages**：Python, JavaScript, TypeScript
- **Frontend**：Astro, React, HTML/CSS, Tailwind
- **Tools**：Git, GitHub Actions, VS Code, Cloudflare
- **Domains**：Data Analysis, Finance Research, VC Research, Automation

标签 hover 时变为橙色。

#### `Contact.astro` — 联系

一个 CTA 卡片，顶部有橙色渐变条。包含标题、描述文字和 GitHub Profile 按钮。

#### `Footer.astro` — 页脚

与 VC Radar、Zihui Notes 统一的三栏页脚：
- **左栏**：品牌名 + 描述
- **中栏**：项目链接（Homepage / VC Radar / Notes）
- **右栏**：外链（GitHub）
- **底部**：版权信息 + GitHub 图标

---

### src/layouts/ — 全局布局

#### `Layout.astro` — 主布局

所有页面共享的 HTML 壳，包含：

**Head 部分**：
- Google Fonts 加载（Bricolage Grotesque + JetBrains Mono）
- Meta 标签（viewport、description）
- Favicon

**Body 部分**：
- 顶部 2px 橙色强调条（`.accent-bar`）
- Canvas 交互背景（`#bg-canvas`）
- 鼠标光晕效果（`#mouse-glow`）
- `<slot />` 插入页面内容

**全局样式**：
- 动画关键帧定义（fadeUp、slideInLeft、countUp、expandWidth、pulse）
- 滚动触发的 `.reveal` / `.visible` 过渡
- Canvas 和光晕的定位和层级

**客户端脚本**：
- Canvas 点阵网格动画（详见[交互背景效果](#交互背景效果)）
- Intersection Observer 滚动触发（`.reveal` 元素进入视口时添加 `.visible`）

---

### src/pages/ — 页面路由

#### `index.astro` — 主页

Astro 的文件路由：`src/pages/index.astro` 对应 `/` 路径。

内容很简单——导入 Layout 和所有组件，按顺序排列：

```astro
<Layout>
  <Hero />
  <About />
  <Projects />
  <Skills />
  <Contact />
  <Footer />
</Layout>
```

---

### 配置文件

#### `astro.config.mjs` — Astro 配置

```js
export default defineConfig({
  integrations: [tailwind()],  // 集成 Tailwind CSS
  site: 'https://zihuichen.com',
  base: '/',
});
```

#### `tailwind.config.mjs` — Tailwind 配置

定义了整套设计系统的颜色和字体：

```js
colors: {
  base: '#f5f6f8',          // 页面背景
  card: '#ffffff',           // 卡片背景
  elevated: '#f0f1f4',       // 高亮背景
  border: '#e0e3e8',         // 边框
  accent: '#f38020',         // 橙色强调
  'text-primary': '#1a1e2c', // 主文字
  'text-secondary': '#5a6377', // 次文字
  'text-muted': '#929bb0',   // 弱文字
}
fontFamily: {
  display: ['Bricolage Grotesque', ...],
  mono: ['JetBrains Mono', 'monospace'],
}
```

这套配色和字体在 VC Radar、Zihui Notes 中也保持一致。

#### `deploy.yml` — GitHub Actions

```yaml
on:
  push:
    branches: [main]
```

Push 到 main 后自动：`npm ci` → `npm run build` → `wrangler pages deploy dist/`

需要 GitHub Secrets：`CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`。

---

## 交互背景效果

页面背景是一个全屏 Canvas，实现了点阵网格 + 鼠标推动效果：

### 工作原理

1. **初始化**：在整个屏幕上按 48px 间距生成一个点阵网格，每个点记录当前位置和基准位置
2. **每帧更新**（`requestAnimationFrame`）：
   - 计算每个点到鼠标的距离
   - 距离小于 180px 的点被推开（施加力 + 角度计算）
   - 弹簧回弹：`dot.vx += (baseX - x) * 0.04`
   - 阻尼：`dot.vx *= 0.88`
3. **绘制连接线**：鼠标附近的点之间，如果距离小于 120px，画一条半透明橙色线
4. **绘制点**：靠近鼠标的点变大变亮，颜色从灰色渐变为橙色

### 参数

| 参数 | 值 | 说明 |
|------|-----|------|
| `GRID_SPACING` | 48px | 点阵间距 |
| `DOT_RADIUS` | 1px | 默认点大小 |
| `MOUSE_RADIUS` | 180px | 鼠标影响范围 |
| `CONNECTION_RADIUS` | 120px | 连线最大距离 |
| `PUSH_FORCE` | 18 | 推力大小 |
| `RETURN_SPEED` | 0.04 | 弹簧回弹系数 |

### 鼠标光晕

除了 Canvas 点阵，还有一个 600x600 的 div（`#mouse-glow`），跟随鼠标移动，提供柔和的橙色径向渐变光晕效果。

---

## 设计系统

三个项目（Homepage、VC Radar、Zihui Notes）共享统一的设计语言：

| 元素 | 规范 |
|------|------|
| **主字体** | Bricolage Grotesque（含中文回退：PingFang SC / Microsoft YaHei） |
| **等宽字体** | JetBrains Mono |
| **背景色** | `#f5f6f8` |
| **强调色** | `#f38020`（橙色） |
| **主文字色** | `#1a1e2c` |
| **圆角** | 8px / 12px |
| **过渡** | 150ms ease |
| **页脚** | 三栏统一结构（品牌 + 项目链接 + 外链） |

Homepage 的背景是点阵网格，Zihui Notes 是网格纸，VC Radar 无 Canvas 背景——三者在视觉上有区分但风格统一。

---

## 关联项目

| 项目 | 地址 | 仓库 |
|------|------|------|
| **Homepage**（本项目） | https://zihuichen.com | chenzihui222/zihui |
| **VC Radar** | https://vc.zihuichen.com | chenzihui222/News-about-VC |
| **Zihui Notes** | https://notes.zihuichen.com | chenzihui222/Reading-Notes |

三个项目共享设计系统和页脚组件，各自独立部署在 Cloudflare 上。

---

## 本地开发指南

### 前置条件

- Node.js 18+
- npm

### 首次设置

```bash
# 安装依赖
npm install
```

### 启动开发服务器

```bash
npm run dev
```

打开 http://localhost:4321 即可看到网站。Astro 支持热更新，修改文件后页面自动刷新。

### 构建

```bash
npm run build
```

生成的静态文件在 `dist/` 目录。

### 本地预览构建结果

```bash
npm run preview
```

---

## 部署到 Cloudflare Pages

### 自动部署

Push 到 `main` 分支后，GitHub Actions 自动构建并部署到 Cloudflare Pages。

需要在 GitHub repo 设置两个 Secrets：
- `CLOUDFLARE_API_TOKEN` — Cloudflare API Token（需要 Pages 写入权限）
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare 账户 ID

### 手动部署

```bash
npm run build
npx wrangler pages deploy dist/ --project-name=zihui-homepage
```

---

## 常用命令速查

| 命令 | 作用 |
|------|------|
| `npm run dev` | 启动本地开发服务器（localhost:4321） |
| `npm run build` | 构建生产版本到 `./dist/` |
| `npm run preview` | 本地预览构建结果 |
| `npx wrangler pages deploy dist/ --project-name=zihui-homepage` | 手动部署到 Cloudflare Pages |

---

Product By Chen Zihui
