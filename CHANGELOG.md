# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Previes the website on different devices: https://techsini.com/multi-mockup/index.php

## [0.3.0] - 2026-09-08

### Added
- **Detail / Compact view toggle**: Publications, Projects, Talks and Notes switch between a rich `Detail` view and a dense `Compact` view, persisted per page in `localStorage` (survives navigation and reload). Switching a view **resets every card** to that mode's default state.
- **Per-card expand / collapse in every mode**: Each card carries a chevron that works in BOTH Detail and Compact — clicking expands a collapsed card to reveal the full detail, or folds an expanded card back to a compact row. Per-card state survives list re-initialisation.
- **Ambient background animation**: Falling "science" glyphs (🧪 🧬 ⚗️ 🔬 …) drift down the page like snow on a fixed `<canvas>` behind the content. Respects `prefers-reduced-motion` and can be switched off in config.
- **Configurable feature switches**: A new `features:` block in `_config.yml` (`citation_badges`, `tag_cloud`, `view_toggle`, `post_toc`) and a `motion:` block (`background_animation`, `scroll_focus`, `reveal`) let users turn every visual/functional enhancement on or off with clear inline comments.
- **Interactive tag cloud on Notes**: Multi-select / de-select tags to filter the notes grid live (no reload), with URL syncing (`?tag=…`), a "Clear selection" button, and visual `is-active` highlight.

### Fixed
- **Tag link highlight / cancel**: Arriving at `/notes/?tag=X` from a post now highlights exactly the matching tag pill (case-sensitive) and applies the filter, so it can be cancelled by clicking the pill or "Clear selection". The URL→selection re-sync runs on every init to survive a Swup swap.
- **Citation badge clipping**: Card `overflow` is now `visible` and the hovered card is lifted above its neighbours, so the Dimensions / Altmetric popovers are never cut off or hidden behind the next card.
- **Content-area centering**: The `#swup` box had both `w-full` and a 320px sidebar margin, overflowing the viewport to the right and leaving a large blank gap to the left of the content. Removed `w-full` so every page (Publications/Projects/Notes/CV, not just posts) is centred in its own area next to the sidebar.

### Updated
- **Citation badges**: In Compact a card shows only the Dimensions badge (its own type/status badge sits on the left); the Altmetric donut is hidden until the card is expanded or you switch to Detail. Badge popovers (Dimensions & Altmetric) always stack above everything.
- **Contact consolidated**: The standalone Contact page is removed; contact links (email, address, academic profiles) now live in a simple link row on the homepage, under Featured Projects.
- **Card hover emphasis**: Hovering a card now brightens the light sweep and deepens the border + shadow (light/shadow only — no scale, so it never fights the scroll-focus effect).
- **Whole-card click**: Notes cards are now one clickable object via a stretched title link (the whole card navigates to the post).
- **Footer pinning**: The body is now a flex column so the footer always sits at the very bottom — no more blank space below it.
- **Background glyphs**: Falling "science" glyphs are now monochrome and tinted with the theme accent (so they follow light/dark + accent), with more variety and a denser default count.
- **Altmetric donut**: Reverted to the standard `data-badge-type="donut"` + `data-badge-popover="left"` markup so it renders at its natural, larger size.
- **Bumped version to 0.3.0**, rebuilt `style.css` (Tailwind 4.3.3 / daisyUI 5.7.28).

## [0.2.0] - 2026-09-07

### Added
- **Design system & polish**: Introduced a token-based design layer (`design.css`) with `.rc-*` semantic tokens (accent, bg, ink, line, radius, duration, ease) for an "Apple-grade" refined look.
- **Scroll-focus card effect**: Cards near the viewport centre scale up, brighten and gain an accent-tinted glow + deep shadow; cards at the edges shrink and dim. Driven every frame by scroll (smoothstep-eased), plus a subtle 3D `rotateX` tilt. No mouse-hover scale — scroll only.
- **Light-mode blue theme**: Replaced the default purple accent with a calm professional blue (`oklch(0.55 0.17 252)`) so light mode no longer looks purple.
- **Cookie consent banner**: Bottom floating, glassy consent dialog (`Accept` / `Reject`) required for EU/US visitors, persisted in `localStorage`.
- **SPA partial navigation (Swup)**: Sidebar / top bar no longer re-render when switching pages — only the content container is swapped. Active menu state and reveal/focus animations re-bind automatically via a `MutationObserver`.
- **Sticky "focus-wheel" table of contents**: A fixed, vertically-centred TOC on the right rail. The active heading is large & clear; neighbouring entries shrink/blur away. Hierarchy encoded via a coloured dot + indentation. Scroll-spy highlights the current section, works on the CV page (sections) and every article (h1–h3).
- **Click-to-centre anchor scroll**: Clicking a TOC entry (or any in-page `#anchor`) smoothly scrolls so the heading lands about mid-screen instead of being tucked under the fixed top bar.
- **Multilingual + multi-format test post**: Added `comprehensive-markdown-test.md` covering text formatting, headings, lists, quotes, tables, fenced code (Python / JS / SQL / C++ / Bash / JSON / YAML), inline & block math, footnotes and nine languages (简体/繁體/English/Deutsch/日本語/한국어/Français/Español/Português).

### Fixed
- **Blank page after navigation**: A `ReferenceError` (`__rcMotionWatcher` undeclared) aborted the `DOMContentLoaded` handler, so the `MutationObserver` never started and revealed content after a Swup swap stayed invisible. The watcher is now declared correctly and observes `document.body`, so no page is ever blank after navigating.
- **Filters / search not working**: Listing pages (Publications / Projects / Notes) relied on inline `DOMContentLoaded` scripts, which never re-ran after a partial Swup swap. Filters were unified into a global, Swup-safe `__rcInitFilters()` that re-binds on every content swap (status / category / year / keyword search, with results count and empty state).
- **Code block line spacing**: Tightened per-line padding so code no longer has huge gaps between lines.
- **Card overlap**: Increased vertical spacing between the filter bar and the cards (and between timeline / grid cards) so scaled-up focused cards no longer overlap.
- **TOC initial centring**: Removed a conflicting `sticky` wrapper so the focus-wheel TOC is truly vertically centred.

### Updated
- **Dependencies**: Tailwind CSS, `@tailwindcss/cli` → `4.3.3`, daisyUI → `5.7.28`; rebuilt `style.css`.

## [Unreleased] - Development

### Added - 2025-11-09
- **Code Block Enhancements**: Major improvements to code block functionality and appearance
  - **Language Badge**: Display programming language type in the top-right corner of each code block using DaisyUI badge component
  - **Copy Button**: One-click code copying functionality powered by ClipboardJS library (v2.0.11)
    - Visual feedback with success (green checkmark) and error (red X) indicators
    - Automatic fallback mechanism for better browser compatibility
  - **Code Folding Feature**: Configurable code block collapsing functionality
    - Automatically collapse code blocks exceeding a threshold (default: 5 lines)
    - "Expand (N lines)" / "Collapse" button with smooth transitions
    - Configurable via `_config.yml` with `code_collapse.enabled` and `code_collapse.lines` options
  
- **Modular JavaScript Architecture**: Separated post processing logic into dedicated file
  - Created `source/js/post.js` for all post-related processing (math formulas, tables, code blocks)
  - Improved code maintainability and reusability
  - Reduced `post.ejs` size from ~470 lines to ~180 lines

- **Dedicated Post Stylesheet**: Extracted inline styles to `source/css/post.css`
  - Centralized all post content styling (typography, code blocks, tables, quotes, lists, images)
  - Added code folding styles (`.code-line-collapsed`, `.code-expanded`, `.code-expand-btn`)
  - Improved EJS template readability

### Enhanced - 2025-11-09
- **Code Block Styling**: Fixed code wrapping issues
  - Changed from `white-space: pre-wrap` to `white-space: pre` to prevent automatic line wrapping
  - Added proper horizontal scrolling for long code lines
  - Ensured line numbers stay aligned and don't mix with code content

- **Configuration System**: Extended theme configuration
  - Added `code_collapse` section in `_config.yml` for customizing code folding behavior

- **UI Consistency & Responsiveness**: Unified layout and alignment across all pages
  - **Sidebar Navigation**: Fixed icon and text alignment in navigation buttons
    - Implemented nested flex layout with fixed-width icon containers (`w-6 flex-shrink-0`)
    - Consistent spacing between icons and text (`ml-8`, approximately 2rem/4 character widths)
    - Smooth hover animations with scale effects on icons
  - **Responsive Search Bars**: Unified search bar design across all listing pages (Publications, Notes, Projects, Talks)
    - Mobile-first approach: vertical layout (`flex-col`) with full-width controls (`w-full`) on small screens
    - Desktop optimization: horizontal layout (`sm:flex-row`) with appropriate fixed widths (`sm:w-40`, `sm:w-48`) and flexible search inputs (`sm:flex-1`)
    - Consistent gap spacing and form control styling across all pages

## [0.1.5] - 2025-10-06

### Added
- **Enhanced Post Template System**: Complete restructure of `post.ejs` with modular card-based architecture
  - **Post Header Card**: Title, publication date, reading time, categories, and tags
  - **Content Card**: Main article content with comprehensive styling system
  - **Share & Navigation Cards**: Social media sharing and site navigation features
  - **Previous/Next Navigation Card**: Improved post navigation with truncated titles

- **Advanced Social Sharing System**: Full-featured sharing capabilities with anti-adblock protection
  - **Twitter/X Integration**: Smart sharing with dynamic title and URL encoding
  - **LinkedIn Sharing**: Professional network sharing functionality
  - **Copy Link Feature**: One-click URL copying with visual feedback and cross-browser fallback
  - **AdBlock Bypass**: Redesigned buttons to avoid common ad-blocker filters using generic icons and JavaScript-powered links

- **Mathematical Formula Processing**: Comprehensive LaTeX and MathJax integration
  - **Multi-line Formula Support**: Automatic processing of complex mathematical expressions spanning multiple lines
  - **Symbol Cleanup**: Intelligent removal of LaTeX delimiters (`$$`) from rendered content without affecting formulas
  - **Formula Isolation**: Proper containerization prevents math processing interference with other content

- **Horizontal Scrolling Support**: Enhanced content display for wide elements
  - **Table Containers**: Automatic wrapping of tables in scrollable containers with custom styling
  - **Code Block Scrolling**: Horizontal scroll support for wide code blocks while maintaining line numbers

- **Footer Enhancement**: Complete footer redesign with modern functionality
  - **Version update**: When a new release was made, users will know.

- **Advertisement Integration**: Added support for Google Adsense, Umami, and Baidu Analytics, Add support for adsterra

### Enhanced
- **Code Block Revolution**: Complete overhaul of code display using DaisyUI mockup-code styling
  - **Enhanced Line Numbers**: Professional line numbering with proper spacing (line-height: 0, margin: 0)

- **Contact Page Layout**: Transformed single-column layout to responsive 2-column design
  - **Better Space Utilization**: Improved use of screen real estate on larger devices
  - **Mobile Compatibility**: Seamless single-column layout on mobile devices
  - **Consistent Styling**: Maintained design coherence with overall theme

### Fixed
- **Critical FontAwesome Icon Conflicts**: Resolved DaisyUI `.fab` class conflicts with FontAwesome `fab` prefix
  - **Icon Standardization**: Migrated all brand icons from `fab fa-*` to `fa-brands fa-*` format
  - **Position Correction**: Fixed icons jumping to bottom-right corner due to CSS conflicts
  - **Comprehensive Coverage**: Updated icons across sidebar, homepage, and all content pages

- **AdBlock Compatibility Issues**: Redesigned social sharing to bypass common ad-blocker filters
  - **Generic Icon Strategy**: Replaced `fa-brands fa-twitter` and `fa-brands fa-linkedin` with generic alternatives
  - **JavaScript-Powered Links**: Dynamic link generation prevents URL-based blocking
  - **Semantic Text Updates**: Changed button text from brand-specific to generic descriptions

## [0.1.4] - 2025-10-04

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Preview the website on different devices: https://techsini.com/multi-mockup/index.php

## [0.1.4] - 2025-10-04

### Added
- **Recent Notes Section**: Added a dedicated Recent Notes section on the homepage
  - Displays the 3 most recent blog posts in card format
  - Positioned between Research Interests and Featured Publications sections
  - Full responsive design with proper card styling and hover effects
  - Direct navigation links to individual posts and Notes archive

- **Notes/Blog Page**: Added a comprehensive blog/notes system with filtering and search capabilities
  - Grid layout with uniform card sizing and responsive design
  - Category and year-based filtering
  - Real-time search functionality with live suggestions
  - Improved typography and hover effects without underlines

### Enhanced
- **Homepage Layout Improvements**: Major redesign of the homepage layout
  - **Featured Publications**: Converted from 2-column to 3-column responsive layout (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
  - **Featured Projects**: Converted from 2-column to 3-column responsive layout (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
  - Reduced display count from 4 to 3 items per section for optimal visual balance
  - Enhanced mobile responsiveness and improved space utilization

- **Code Block Rendering**: Major improvements to code display in posts
  - Implemented DaisyUI mockup-code styling for better visual presentation
  - Added automatic line numbers and syntax highlighting
  - Support for special line types (error, warning, success) with color coding
  - Auto-wrapping content for better readability
  - Added proper background colors (bg-base-200) and text colors for consistency

- **Table Styling**: Enhanced table presentation in posts
  - Added quote-style borders with enhanced visual effects
  - Implemented hover effects and zebra striping
  - Consistent theming with the overall design system

- **FontAwesome Icon Integration**: Fixed icon positioning issues
  - Resolved conflicts between DaisyUI's `.fab` component and FontAwesome's `fab` prefix
  - Migrated all brand icons to use `fa-brands` prefix (GitHub, LinkedIn, Twitter)
  - Ensured proper icon positioning across all pages

- **CV Page Optimization**: Streamlined CV section structure
  - Removed redundant sections (collaborations, research interests, academic service, media)
  - Focused on core academic information for better readability
  - Maintained clean and professional layout

- **Typography Improvements**: Enhanced text scaling and visual hierarchy
  - Optimized heading sizes in posts (h1: 1.5rem to h6: 0.8rem)
  - Improved readability and visual balance
  - Better content organization and flow

### Fixed
- Resolved sidebar icon positioning issues that caused icons to float to page corners
- Fixed Publications and Projects page filtering and search functionality
- Corrected card sizing inconsistencies in Notes page
- Addressed button icon alignment issues in Featured Projects section
- Fixed EJS template syntax errors in index.ejs that prevented proper rendering

### Technical Improvements
- Enhanced JavaScript code transformation for better code block rendering
- Improved CSS specificity to avoid style conflicts
- Better integration between custom styles and DaisyUI components
- Optimized performance for search and filtering operations

### Update
- Update dependencies to latest versions

## [0.1.3] - 2025-06-22

### Added
- Add support for Google Adsense, Umami, and Baidu Analytics.

## [0.1.2] - 2025-06-20

### Added
- Add support for Altmetric and Dimensions badges in publications.
- Add more themes options.

### Changed 
- Enhanced CV page with optimized styles.
- Improved publication card layouts for better readability.

### Removed
- Removed unused CSS classes from Contact and CV.

## [0.1.1] - 2025-06-16

### Changed
- Improved mobile responsiveness and layout. More avatar to main content in mobile view.
- Improved desktop layout for better readability. Hide avatar in desktop view in main content. Show avatar in sidebar.
- Enhanced CV page with:
  - Better section navigation
  - Improved card layouts
  - Responsive design for all sections
  - Better visual hierarchy
  - Enhanced download button

## [0.1.0] - 2025-06-15

### Added
- Initial release of the Researcher theme
- Modern and responsive design using Tailwind CSS and DaisyUI
- Support for multiple theme options (light, dark, cupcake, bumblebee, wireframe)
- Academic-focused features:
  - Publications showcase
  - Projects portfolio
  - CV/Resume page with download option
  - Talks and presentations section
  - Academic profile links (Google Scholar, ORCID, ResearchGate)
- Responsive navigation menu with icons
- Contact information section
- About section with customizable content
- Support for academic icons and Font Awesome icons
- DaisyUI theme integration
