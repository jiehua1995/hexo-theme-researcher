# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Previes the website on different devices: https://techsini.com/multi-mockup/index.php

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
