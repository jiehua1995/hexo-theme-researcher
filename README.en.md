<div align="center">
  <img src="source/images/logo.svg" width="112" alt="Hexo Theme Researcher" />

  <h1>Hexo Theme Researcher</h1>
  <p><strong>A modern academic blog theme built for researchers.</strong></p>
  <p>
    <a href="https://hexo-theme-researcher.jiehua1995.xyz/"><img src="https://img.shields.io/badge/Live%20Demo-2F6DB3?style=for-the-badge&logo=githubpages&logoColor=white" alt="Live Demo" /></a>
    <a href="https://github.com/jiehua1995/hexo-theme-researcher/tags"><img src="https://img.shields.io/github/v/tag/jiehua1995/hexo-theme-researcher?style=for-the-badge&label=version" alt="Version" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/github/license/jiehua1995/hexo-theme-researcher?style=for-the-badge" alt="MIT License" /></a>
    <a href="https://github.com/jiehua1995/hexo-theme-researcher/stargazers"><img src="https://img.shields.io/github/stars/jiehua1995/hexo-theme-researcher?style=for-the-badge" alt="Stars" /></a>
  </p>
  <p>English · <a href="README.md">简体中文</a></p>
</div>

---
## Live demo
Open **[hexo-theme-researcher.jiehua1995.xyz](https://hexo-theme-researcher.jiehua1995.xyz/)** to try every page (Publications, Projects, Talks, Notes, CV), including light/dark themes, the view switcher and the mobile layout.

## Features
- **Academic showcase** — dedicated pages for publications, projects, talks and CV, with DOI, PDF links and academic profiles.
- **Notes system** — site-wide instant search plus an interactive tag cloud with multi-select / de-select filtering; any Markdown and any language.
- **Detail / Compact views** — switch a whole list at once, and expand or collapse each card individually.
- **Citation badges** — Dimensions and Altmetric badges load automatically and hide themselves when there is no data; popovers are never clipped.
- **Reading experience** — sticky table of contents that tracks the viewport centre, highlighted and collapsible code, MathJax formulas, clean CJK typography.
- **Visual polish** — scroll-focus cards (scale + light sweep), optional ambient background, 30+ DaisyUI themes.
- **Partial navigation** — Swup swaps only the content, so the sidebar and top bar stay put.
- **Configurable** — motion, background, badges, tag cloud and TOC can each be switched off.

## Getting started
### Requirements
Node.js ≥ 18 and Hexo ≥ 7.

### Install
```bash
# 1. Create a site
hexo init my-site && cd my-site

# 2. Install the search dependency
yarn add hexo-generator-search

# 3. Clone the theme
git clone https://github.com/jiehua1995/hexo-theme-researcher themes/hexo-theme-researcher
```

Enable the theme and search in your site's root `_config.yml`:

```yaml
theme: hexo-theme-researcher

search:
  path: search.xml
  field: post
  content: true
```

### Create pages
```bash
hexo new page publications
hexo new page projects
hexo new page talks
hexo new page cv
hexo new page notes
```

Each page's `source/<page>/index.md` needs the matching `layout`:

| Page | layout |
| --- | --- |
| Publications | `publications` |
| Projects | `projects` |
| Talks | `talks` |
| CV | `cv` |
| Notes | `notes` |

### Add your data
Create these files under your site's `source/_data/`; see [`demo_data/`](demo_data) for field examples:

- `publications.yml` — papers
- `projects.yml` — projects
- `talks.yml` — talks
- `cv.yml` — CV / résumé

### Theme configuration
Copy the theme config to your site root so you never edit the theme repo itself:

```bash
cp themes/hexo-theme-researcher/_config.yml _config.hexo-theme-researcher.yml
```

## Configuration
Common switches (the full annotated file is `_config.yml`):

```yaml
motion:
  background_animation:
    enabled: true      # drifting science glyphs
    opacity: 0.12
    count: 30
  scroll_focus:
    enabled: true      # cards scale + glow as you scroll
  reveal:
    enabled: true      # sections fade in on entry

features:
  citation_badges: true   # Dimensions / Altmetric badges
  tag_cloud: true         # tag cloud on Notes
  view_toggle: true       # Detail / Compact switcher
  post_toc: true          # table of contents on posts
```

## Tech stack
[Hexo](https://hexo.io/) · [Tailwind CSS](https://tailwindcss.com/) · [DaisyUI](https://daisyui.com/) · [Swup](https://swup.js.org/) · [Academicons](https://jpswalsh.github.io/academicons/) · [Font Awesome](https://fontawesome.com/)

## Contributing
Issues and pull requests are welcome. Contributors:

<a href="https://github.com/jiehua1995/hexo-theme-researcher/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jiehua1995/hexo-theme-researcher" alt="Contributors" />
</a>

## Support
If this theme saves you time, you can buy me a coffee:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://coff.ee/fdjiehuae)

## License
Released under the [MIT License](LICENSE).

---
<div align="center">
  <sub>Hexo Theme Researcher — built for the academic community, MIT License © 2026 Jie Hua</sub>
</div>
