# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a premium CSS theme collection for Twine profiles - 10 complete, production-ready themes with S-tier UI/UX standards. The themes are designed to be dropped directly into a client's React app as a replacement CSS file.

**Key Architecture:**
- **Pure CSS Theming**: No JavaScript dependencies for themes themselves
- **Drop-in Replacement**: Each theme replaces the client's `62.6a7e8e25.chunk.css` file
- **Test Harness**: `test.html` provides live theme switching and preview
- **Automated Screenshots**: Playwright-based screenshot generation for all themes

## Commands

### Preview & Testing
```bash
# View theme screenshots
open screenshots/

# Test themes live in browser
open test.html
# Use the dropdown in browser to switch between themes
```

### Screenshot Generation
```bash
# Generate all screenshots (desktop 1920x1080 + mobile 375x667)
node screenshot-generator.js

# Install dependencies if needed
npm install
```

### Minification
```bash
# Minify all CSS themes
npm run minify

# Output: generates .min.css versions (37-43% smaller)
# Total size reduction: 47KB → ~29KB
```

### Deployment to Client
```bash
# 1. Choose theme file (e.g., neo-brutalism.css)
# 2. Upload to client's /static/css/ folder
# 3. Rename to: 62.6a7e8e25.chunk.css
# 4. Theme is live
```

## Project Structure

### CSS Theme Files (Root Directory)

#### Source Files (Development - 47KB total)
Readable, well-commented CSS files for editing and maintenance:

- `0-original.css` - Backend default CSS (1.6 KB)
- `1-neobrutalism.css` - Bold, edgy with chunky borders (8.2 KB)
- `2-retro-gaming.css` - Retro purple/green gaming aesthetic (10.5 KB)
- `3-geometric-blue.css` - Angular professional design (9.5 KB)
- `4-linkedin.css` - LinkedIn-inspired professional (9.3 KB)
- `5-Github.css` - GitHub dark theme (9.7 KB)

#### Minified Files (Production - ~29KB total)
Compressed versions for deployment (37-43% smaller):

- `*.min.css` - Production-optimized versions
- Generated via `npm run minify`
- Used by `test.html` and `screenshot-generator.js`

**Deployment**: Use `.min.css` files for production. Edit source `.css` files and re-run minification.

### Supporting Files
- `test.html` - Theme testing page with live theme switcher
- `screenshot-generator.js` - Playwright automation for screenshots
- `screenshots/` - Generated preview images (20 PNG files)
- `TTF/` - Font files if needed

## CSS Theme Architecture

### Common Structure (All Themes)
Each CSS file follows this pattern:

1. **Original Base CSS** (line 1-10): Minified base styles from client's React app
2. **Google Font Import**: Unique font per theme
3. **Global CSS Rules**: Mandatory resets and container styles
4. **Theme-Specific Styles**: Colors, layouts, custom elements
5. **S-Tier Features**: Animations, accessibility, responsive design
6. **Media Queries**: Mobile (≤768px) and small mobile (≤480px)
7. **Print Styles**: Professional PDF output
8. **Accessibility**: Reduced motion support

### S-Tier Standards (Required in All Themes)

Every theme MUST include:
- ✅ Unique Google Font for headings
- ✅ Page load reveal animation (0.6s fade-in)
- ✅ Staggered element reveals (professional sequence)
- ✅ Button-only microanimations (hover/focus/active states)
- ✅ Accessibility focus indicators (WCAG AA compliant)
- ✅ Mobile responsive (320px - 1920px+)
- ✅ Touch targets (minimum 44×44px)
- ✅ Print styles
- ✅ Smooth scroll behavior
- ✅ Reduced motion support (`@media (prefers-reduced-motion)`)
- ✅ Performance optimization (`will-change`, `contain`)

### Animation Strategy
**Animate ONLY:**
- `.button-link` (hover, focus, active)
- `.social-links a` (hover, scale)
- `.featured-roles .role` (hover shrink effect)

**DO NOT Animate:**
- Profile image
- h1 headings
- Containers
- Backgrounds (except page load fade-in)

### Responsive Breakpoints
```css
/* Mobile */
@media (max-width: 768px) {
    /* Single column, larger touch targets */
    /* Font sizes reduced 30-40% */
}

/* Small mobile */
@media (max-width: 480px) {
    /* Further optimizations */
}
```

## Screenshot Generator Details

The `screenshot-generator.js` uses Playwright to:
1. Launch headless Chromium browser
2. Load `test.html` for each theme
3. Inject theme CSS via JavaScript
4. Wait 1500ms for animations to settle
5. Hide theme switcher UI
6. Capture screenshot at both viewports
7. Save to `screenshots/` directory

**Output**: 20 PNG files (10 themes × 2 viewports)

## HTML Structure (Client's React App)

Themes target this exact DOM structure:
```html
<div id="root">
  <div class="app">
    <div class="fade-in">
      <div class="profile">
        <div class="profile-content">
          <div class="profile-column">
            <div class="profile-info">
              <div class="profile-image">
                <img src="..." alt="Name">
              </div>
              <div class="profile-details">
                <div class="featured-roles">
                  <div class="role">Role 1</div>
                  <div class="role">Role 2</div>
                </div>
                <h1>Name</h1>
                <div class="bio-container">
                  <div><p>Bio text...</p></div>
                </div>
              </div>
            </div>
            <div class="button-links">
              <a class="button-link">Link</a>
            </div>
            <div class="social-links">
              <a><svg>...</svg></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Google Fonts Used by Theme

Each theme uses a unique Google Font for headings:

- **Neo-Brutalism**: Archivo Black (bold, impact)
- **Purple-Green**: (Check file for font)
- **3D Elevated**: Outfit (geometric, modern)
- **Gradient Vibrant**: Space Grotesk (tech, futuristic)
- **Minimal Professional**: Inter (professional)
- **Retro Vaporwave**: Orbitron (retro-futuristic)
- **Organic Nature**: Quicksand (soft, friendly)
- **Cyberpunk Tech**: Rajdhani (tech, angular)
- **Art Deco Luxury**: Playfair Display (elegant, classic)
- **Playful Fun**: Fredoka (playful, rounded)

## File Size Targets

- Each CSS file: < 15KB uncompressed
- Total project: ~150KB for all themes
- Reference: `1-neo-brutalism.css` is ~8KB

## Development Workflow

### When Creating/Editing Themes:

1. **Start from Template**: Use `1-neo-brutalism.css` as the reference template
2. **Preserve Structure**: Keep all S-tier features intact
3. **Update Font**: Change Google Font import
4. **Theme Colors**: Update color scheme and design elements
5. **File Naming**: Create files without number prefixes to match `test.html` dropdown expectations (e.g., `neo-brutalism.css`, not `1-neo-brutalism.css`)
6. **Update test.html**: Add new theme to the dropdown selector if needed
7. **Update screenshot-generator.js**: Add theme name to the `themes` array
8. **Test**: Open `test.html` and verify theme in dropdown
9. **Generate Screenshots**: Run `node screenshot-generator.js`
10. **Verify Mobile**: Check mobile screenshots (375x667)

### Required CSS Sections:

```css
/* 1. Original base CSS (minified) */
@base.css . body{...}

/* 2. Google Font */
@import url('https://fonts.googleapis.com/css2?family=...');

/* 3. Global CSS Rules */
.app, .profile { padding: 0 !important; }
.button-link { width: 100% !important; }
.featured-roles .role:hover { font-size: 10px !important; }

/* 4. Theme-specific styles */

/* 5. Animations */

/* 6. Media queries */

/* 7. Print styles */

/* 8. Accessibility */
@media (prefers-reduced-motion: reduce) {...}
```

## Testing Checklist

Before considering a theme complete:
- [ ] Open `test.html` in Chrome
- [ ] Test theme switcher dropdown
- [ ] Check mobile view (< 768px)
- [ ] Test keyboard navigation (Tab key)
- [ ] Print to PDF and verify output
- [ ] Test on slow connection
- [ ] Verify all S-tier features present
- [ ] Run screenshot generator
- [ ] Check both desktop and mobile screenshots

## Important Notes

- **No Git Repository**: This project is not version controlled
- **Client Deployment**: Themes are deployed by renaming to `62.6a7e8e25.chunk.css` and uploading to `/static/css/`
- **Playwright Required**: Screenshots depend on Playwright browser automation (installed via `npm install`)
- **File Naming**: Some theme files use numbered prefixes (`1-`, `2-`). The `test.html` switcher expects unnumbered filenames
- **Theme Count**: Project contains multiple theme variations; verify current count in root directory
