# zihuichen.com

Zihui Chen 的个人主页，使用 Astro + Tailwind CSS 构建，部署在 Cloudflare Pages。

**Live**: https://zihuichen.com

## 设计

- **字体**: Bricolage Grotesque + JetBrains Mono
- **配色**: 浅灰底 `#f5f6f8`，橙色强调 `#f38020`，与 [VC Radar](https://vc.zihuichen.com) 统一
- **交互背景**: Canvas 点阵网格，鼠标靠近时点被推开并弹性回弹，颜色从灰色渐变为橙色，附近的点之间出现连线
- **动画**: 滚动触发 fadeUp 渐入，卡片 hover 上浮，150ms 过渡

## 项目结构

```
├── src/
│   ├── components/
│   │   ├── Hero.astro        # 顶部导航 + 标题
│   │   ├── About.astro       # 四个研究方向卡片
│   │   ├── Projects.astro    # 项目展示
│   │   ├── Skills.astro      # 技能标签
│   │   ├── Contact.astro     # 联系方式
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro      # 全局布局 + 交互背景 + 动画
│   └── pages/
│       └── index.astro
├── .github/workflows/
│   └── deploy.yml            # 自动部署到 Cloudflare Pages
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## 命令

| 命令                | 动作                                |
| :------------------ | :---------------------------------- |
| `npm install`       | 安装依赖                            |
| `npm run dev`       | 启动本地开发服务器 `localhost:4321` |
| `npm run build`     | 构建生产版本到 `./dist/`            |
| `npm run preview`   | 本地预览构建                        |

## 部署

Push 到 `main` 分支后，GitHub Actions 自动构建并部署到 Cloudflare Pages。

需要的 GitHub Secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## 技术栈

- [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com) + TypeScript
- [Cloudflare Pages](https://pages.cloudflare.com) 托管
- GitHub Actions CI/CD
