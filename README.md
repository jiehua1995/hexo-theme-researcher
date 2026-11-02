<div align="center">
  <img src="source/images/logo.svg" width="112" alt="Hexo Theme Researcher" />

  <h1>Hexo Theme Researcher</h1>
  <p><strong>为研究者打造的现代学术博客主题。</strong></p>
  <p>
    <a href="https://hexo-theme-researcher.jiehua1995.xyz/"><img src="https://img.shields.io/badge/在线演示-Live%20Demo-2F6DB3?style=for-the-badge&logo=githubpages&logoColor=white" alt="在线演示" /></a>
    <a href="https://github.com/jiehua1995/hexo-theme-researcher/tags"><img src="https://img.shields.io/github/v/tag/jiehua1995/hexo-theme-researcher?style=for-the-badge&label=%E7%89%88%E6%9C%AC" alt="版本" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/github/license/jiehua1995/hexo-theme-researcher?style=for-the-badge" alt="MIT License" /></a>
    <a href="https://github.com/jiehua1995/hexo-theme-researcher/stargazers"><img src="https://img.shields.io/github/stars/jiehua1995/hexo-theme-researcher?style=for-the-badge" alt="Stars" /></a>
  </p>
  <p><a href="README.en.md">English</a> · 简体中文</p>
</div>

---
## 在线演示
打开 **[hexo-theme-researcher.jiehua1995.xyz](https://hexo-theme-researcher.jiehua1995.xyz/)** 即可体验全部页面（Publications、Projects、Talks、Notes、CV），包含明暗主题、视图切换与移动端布局。

## 特性
- **学术内容展示**：论文、项目、报告、CV 各自独立页面，支持 DOI、PDF 链接与学术主页。
- **Notes 笔记系统**：全站实时搜索、交互式标签云（可多选 / 反选筛选），支持任意 Markdown 格式与多语言。
- **详情 / 简略视图**：列表页一键切换，每张卡片还能单独展开或折叠。
- **引用徽章**：Dimensions 与 Altmetric 徽章自动抓取，无数据时自动隐藏，弹层不会被卡片遮挡。
- **阅读体验**：粘性目录跟随视口居中、代码高亮与折叠、MathJax 公式、中英文排版。
- **视觉细节**：滚动焦点卡片（缩放 + 光影）、可选背景动画、30+ DaisyUI 主题。
- **无刷新导航**：基于 Swup 的局部换页，侧边栏与顶栏保持不动。
- **可配置**：动效、背景、徽章、标签云、目录等功能均可在配置中开关。

## 快速开始
### 环境要求
Node.js ≥ 18，Hexo ≥ 7。

### 安装
```bash
# 1. 初始化站点
hexo init my-site && cd my-site

# 2. 安装依赖（搜索功能所需）
yarn add hexo-generator-search

# 3. 克隆主题
git clone https://github.com/jiehua1995/hexo-theme-researcher themes/hexo-theme-researcher
```

在站点根目录 `_config.yml` 中启用主题与搜索：

```yaml
theme: hexo-theme-researcher

search:
  path: search.xml
  field: post
  content: true
```

### 创建页面
```bash
hexo new page publications
hexo new page projects
hexo new page talks
hexo new page cv
hexo new page notes
```

每个页面的 `source/<page>/index.md` 需要设置对应的 `layout`：

| 页面 | layout |
| --- | --- |
| Publications | `publications` |
| Projects | `projects` |
| Talks | `talks` |
| CV | `cv` |
| Notes | `notes` |

### 填写数据
在站点的 `source/_data/` 下创建以下文件，字段示例见主题的 [`demo_data/`](demo_data)：

- `publications.yml` — 论文
- `projects.yml` — 项目
- `talks.yml` — 报告
- `cv.yml` — 简历

### 主题配置
把主题配置复制到站点根目录，避免直接修改主题仓库：

```bash
cp themes/hexo-theme-researcher/_config.yml _config.hexo-theme-researcher.yml
```

## 配置说明
常用开关（完整注释见 `_config.yml`）：

```yaml
motion:
  background_animation:
    enabled: true      # 背景飘落的科学符号
    opacity: 0.12
    count: 30
  scroll_focus:
    enabled: true      # 卡片随滚动缩放 + 光影
  reveal:
    enabled: true      # 元素进入视口时淡入

features:
  citation_badges: true   # 论文引用徽章
  tag_cloud: true         # Notes 标签云
  view_toggle: true       # 详情 / 简略视图切换
  post_toc: true          # 文章目录
```

## 技术栈
[Hexo](https://hexo.io/) · [Tailwind CSS](https://tailwindcss.com/) · [DaisyUI](https://daisyui.com/) · [Swup](https://swup.js.org/) · [Academicons](https://jpswalsh.github.io/academicons/) · [Font Awesome](https://fontawesome.com/)

## 参与贡献
欢迎提交 Issue 与 Pull Request。贡献者名单：

<a href="https://github.com/jiehua1995/hexo-theme-researcher/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jiehua1995/hexo-theme-researcher" alt="Contributors" />
</a>

## 支持
如果这个主题对你有帮助，欢迎请我喝杯咖啡：

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://coff.ee/fdjiehuae)

## 许可
本项目基于 [MIT License](LICENSE) 开源。

---
<div align="center">
  <sub>Hexo Theme Researcher — 为学术社区而造，MIT License © 2026 Jie Hua</sub>
</div>
