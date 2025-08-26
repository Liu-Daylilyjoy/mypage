# Liudy's Personal Website

一个现代化的个人主页项目，展示技术博客、摄影作品和思考随笔，采用 Next.js 15 + TypeScript + Tailwind CSS 构建。

## 🚀 项目概述

这是一个功能完整的个人网站，包含前台展示和后台管理系统。网站采用响应式设计，支持深色/浅色主题切换，提供流畅的用户体验和丰富的交互效果。

## ✨ 主要功能

### 前台展示
- **首页**: 个人介绍、技能展示，采用 GSAP 动画效果
- **博客系统**: 支持 Markdown 渲染，包含数学公式和代码高亮
- **摄影作品**: 高性能 Canvas 无限滚动画廊，支持图片预览
- **思考随笔**: 瀑布流布局展示个人思考和灵感
- **访问统计**: 实时统计各页面访问量

### 后台管理
- **内容管理**: 博客、摄影、思考的增删改查
- **数据统计**: 内容数量统计和访问量分析
- **用户认证**: 基于 NextAuth.js 的安全登录系统

## 🛠️ 技术栈

### 前端框架
- **Next.js 15**: React 全栈框架，支持 App Router
- **TypeScript**: 类型安全的 JavaScript 超集
- **Tailwind CSS**: 原子化 CSS 框架
- **GSAP**: 高性能动画库

### UI 组件
- **Radix UI**: 无样式的可访问性组件
- **Lucide React**: 现代化图标库
- **React Icons**: 丰富的图标集合

### 数据处理
- **Prisma**: 类型安全的数据库 ORM
- **MongoDB**: NoSQL 数据库
- **SWR**: React Hooks 数据获取库

### 内容渲染
- **Markdown-it**: Markdown 解析器
- **KaTeX**: 数学公式渲染
- **Highlight.js**: 代码语法高亮

### 认证与部署
- **NextAuth.js**: 身份验证解决方案
- **Vercel**: 部署平台

## 📁 项目结构

```
mypage/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (user)/            # 前台用户页面
│   │   │   ├── page.tsx       # 首页
│   │   │   ├── blog/          # 博客页面
│   │   │   ├── photography/   # 摄影页面
│   │   │   └── thinking/      # 思考页面
│   │   ├── admin/             # 后台管理
│   │   │   └── (auth)/        # 需要认证的管理页面
│   │   └── api/               # API 路由
│   ├── components/            # React 组件
│   │   ├── common/           # 通用组件
│   │   ├── ui/               # UI 组件库
│   │   └── theme/            # 主题相关组件
│   ├── hook/                 # 自定义 React Hooks
│   ├── lib/                  # 工具库
│   └── types/                # TypeScript 类型定义
├── posts/                    # 静态内容文件
│   ├── blog/                 # Markdown 博客文件
│   ├── photography/          # 摄影图片文件
│   └── thinking/             # 思考图片文件
├── public/                   # 静态资源
└── dataScript/              # 数据库脚本和配置
```

## 🎨 设计特色

### 用户体验
- **流畅动画**: 使用 GSAP 实现丰富的页面过渡和交互动画
- **响应式设计**: 完美适配桌面端和移动端
- **主题切换**: 支持深色/浅色主题，自动跟随系统设置
- **性能优化**: 图片压缩、懒加载、代码分割等优化策略

### 交互设计
- **无限滚动**: 摄影页面采用高性能 Canvas 实现无限滚动
- **进度指示**: 博客页面提供阅读进度条
- **瀑布流布局**: 思考页面采用响应式瀑布流展示
- **全屏预览**: 图片和内容支持全屏预览模式

## 项目演示
[网页进入动画](./readmeVideo/loading.mp4)
[首页竖向+横向滚动,展示个人信息](./readmeVideo/home.mp4)
[首页窗口进度条,可点击跳转](./readmeVideo/home-nav.mp4)
[博客页面,支持多种markdown语法](./readmeVideo/blog.mp4)
[个人思考页面,采用瀑布流布局,自定义图片压缩组件保证页面流畅性](./readmeVideo/thinking.mp4)
[照片页面,设计了无限滑动效果,利用svg优化滑动性能](./readmeVideo/photography.mp4)
[流畅的主题切换动画](./readmeVideo/theme-switch.mp4)
[后台管理页面,利用next-auth鉴权](./readmeVideo/admin.mp4)
[博客,思考,摄影编辑页面,界面美观,博客页面设计了同步滑动效果,实时预览](./readmeVideo/edit.mp4)

## 🚀 快速开始

### 环境要求
- Node.js 18+
- pnpm (推荐) 或 npm

### 安装依赖
```bash
pnpm install
```

### 环境配置
创建 `.env` 文件并配置以下环境变量：
```env
DATABASE_URL=

ADMIN_USER=
ADMIN_PASS=

NEXTAUTH_SECRET=
NEXTAUTH_URL=
BASE_URL=
```

### 数据库设置
```bash
# 生成 Prisma 客户端
pnpm prisma generate

# 推送数据库架构
pnpm prisma db push

# 测试数据在dataScript目录下
```

### 启动开发服务器
```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 📝 内容管理

### 博客管理
- 支持 Markdown 格式
- 自动生成目录和锚点
- 支持数学公式 (KaTeX)
- 代码语法高亮

### 摄影管理
- 支持多种图片格式
- 自动生成缩略图
- 图片元数据管理
- 地理位置信息

### 思考管理
- 富文本编辑
- 图片上传
- 分类标签
- 时间线展示

## 🔧 开发指南

### 添加新页面
1. 在 `src/app/(user)/` 下创建新目录
2. 添加 `page.tsx` 文件
3. 在导航组件中注册新路由

### 自定义组件
1. 在 `src/components/` 下创建组件
2. 使用 TypeScript 定义 Props 接口
3. 遵循项目的样式规范

### 数据库操作
1. 在 `dataScript/schema.prisma` 中定义模型
2. 运行 `pnpm prisma generate` 更新客户端
3. 在 `src/lib/` 下创建数据访问函数

## 🚀 部署

### Vercel 部署 (推荐)
1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 自动部署和更新

### 其他平台
项目支持部署到任何支持 Next.js 的平台，如：
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**作者**: Liudy  
**技术栈**: Next.js + TypeScript + Tailwind CSS + Prisma + MongoDB  
**特色**: 现代化设计、高性能、完整的内容管理系统
