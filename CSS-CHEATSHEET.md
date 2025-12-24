# 🎨 CSS CUSTOMIZATION CHEATSHEET

Quick reference for customizing your templates without breaking anything!

## 📋 Template Quick Reference

### Template 1: Glassmorphism Luxury (template-1.css)
```css
:root {
    --primary: #667eea;     /* Main purple */
    --secondary: #764ba2;   /* Deep purple */
    --accent: #f093fb;      /* Pink accent */
}
/* Key Features: backdrop-filter, frosted glass */
```

### Template 2: Neo-Brutalism Bold (template-2.css)
```css
:root {
    --primary: #000000;     /* Black */
    --secondary: #FFD700;   /* Gold */
    --accent: #FF6B6B;      /* Red */
}
/* Key Features: chunky borders, box-shadows */
```

### Template 3: Gradient Vibrant (template-3.css)
```css
:root {
    --primary: #6366f1;     /* Indigo */
    --secondary: #ec4899;   /* Pink */
    --accent: #f59e0b;      /* Amber */
}
/* Key Features: animated gradients, dark theme */
```

### Template 4: Minimal Professional (template-4.css)
```css
:root {
    --primary: #2563eb;     /* Blue */
    --secondary: #475569;   /* Slate */
    --accent: #0ea5e9;      /* Sky blue */
}
/* Key Features: clean lines, subtle shadows */
```

### Template 5: 3D Elevated Cards (template-5.css)
```css
:root {
    --primary: #8b5cf6;     /* Purple */
    --secondary: #ec4899;   /* Pink */
    --accent: #f59e0b;      /* Amber */
}
/* Key Features: 3D transforms, dramatic shadows */
```

## 🎨 Common Customizations

### Change Primary Color
```css
/* Find this in any template-X.css */
:root {
    --primary: #YOUR_HEX_COLOR;
}
```

### Adjust Animation Speed
```css
/* Make animations faster/slower */
.cta-button {
    transition: all 0.3s ease; /* Change 0.3s */
}

@keyframes yourAnimation {
    /* Adjust timing in animation property */
    animation: yourAnimation 2s ease infinite; /* Change 2s */
}
```

### Modify Border Radius
```css
/* Make everything more/less rounded */
:root {
    --radius: 12px; /* Increase for rounder, decrease for sharper */
}

/* Apply globally */
.portfolio-item,
.testimonial-card,
.cta-button {
    border-radius: var(--radius);
}
```

### Change Font
```css
/* Add to base.css */
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

body {
    font-family: 'Your Font', sans-serif;
}
```

### Adjust Spacing
```css
/* In base.css, modify these */
:root {
    --spacing-xs: 8px;   /* Tight spacing */
    --spacing-sm: 16px;  /* Normal gaps */
    --spacing-md: 24px;  /* Section spacing */
    --spacing-lg: 32px;  /* Large sections */
    --spacing-xl: 48px;  /* Major sections */
}
```

## 🎯 Specific Element Customization

### Profile Image Size
```css
.profile-image {
    width: 160px;  /* Change both */
    height: 160px;
}
```

### Role Tag Styling
```css
.role {
    padding: 8px 16px;           /* Size */
    font-size: 14px;             /* Text size */
    border-radius: 20px;         /* Roundness */
    /* Color is template-specific */
}
```

### CTA Button
```css
.cta-button {
    padding: 16px 32px;          /* Size */
    font-size: 16px;             /* Text */
    border-radius: 12px;         /* Corners */
    /* Colors/effects are template-specific */
}
```

### Section Titles
```css
.section-title {
    font-size: 32px;             /* Size */
    font-weight: 700;            /* Boldness */
    margin-bottom: 32px;         /* Space below */
}
```

### Portfolio Grid Columns
```css
.portfolio-grid {
    /* Change minmax first value for column width */
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;  /* Space between items */
}
```

### Card Hover Effects
```css
.portfolio-item:hover {
    transform: translateY(-8px);  /* Lift amount */
}
```

## 🔧 Advanced Customizations

### Add New Color to Palette
```css
:root {
    --your-new-color: #hexcode;
}

/* Use it */
.your-element {
    background: var(--your-new-color);
}
```

### Create Custom Animation
```css
@keyframes yourCustomAnimation {
    0% {
        /* Starting state */
        transform: scale(1);
    }
    50% {
        /* Middle state */
        transform: scale(1.1);
    }
    100% {
        /* End state */
        transform: scale(1);
    }
}

/* Apply it */
.your-element {
    animation: yourCustomAnimation 2s ease infinite;
}
```

### Modify Shadow Intensity
```css
/* Light shadow */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

/* Medium shadow */
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

/* Heavy shadow */
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);

/* Colored shadow (Template 1, 3, 5) */
box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
```

### Background Patterns/Gradients
```css
/* Solid */
body {
    background: #hexcode;
}

/* Linear gradient */
body {
    background: linear-gradient(135deg, #color1, #color2);
}

/* Radial gradient */
body {
    background: radial-gradient(circle, #color1, #color2);
}

/* Pattern + gradient */
body {
    background: 
        linear-gradient(135deg, #color1, #color2),
        url('pattern.png');
}
```

## 📱 Responsive Customization

### Mobile-Specific Changes
```css
@media (max-width: 768px) {
    .profile-name {
        font-size: 36px;  /* Smaller on mobile */
    }
    
    .portfolio-grid {
        grid-template-columns: 1fr;  /* Single column */
    }
}
```

### Tablet Breakpoint
```css
@media (max-width: 1024px) and (min-width: 769px) {
    /* Tablet-specific styles */
}
```

## 🎨 Color Combination Tips

### Monochromatic (Safe)
```css
--primary: #3b82f6;      /* Blue 500 */
--secondary: #60a5fa;    /* Blue 400 */
--accent: #2563eb;       /* Blue 600 */
```

### Complementary (Bold)
```css
--primary: #3b82f6;      /* Blue */
--secondary: #f97316;    /* Orange */
--accent: #8b5cf6;       /* Purple */
```

### Analogous (Harmonious)
```css
--primary: #8b5cf6;      /* Purple */
--secondary: #ec4899;    /* Pink */
--accent: #6366f1;       /* Indigo */
```

## 🚫 What NOT to Change

### Don't Break These
```css
/* Base structure - Leave these alone */
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { overflow-x: hidden; }

/* Navigation positioning - Critical */
.template-nav { position: fixed; top: 32px; }
.bottom-nav { position: fixed; bottom: 24px; }
```

## ✅ Quick Testing Checklist

After customization, check:
- [ ] Colors have enough contrast (text readable)
- [ ] Animations don't cause seizures (not too fast)
- [ ] Mobile view still works
- [ ] All templates still switch properly
- [ ] Navigation buttons visible on all backgrounds
- [ ] Form inputs are accessible

## 🎯 Browser Testing

Test in:
- Chrome/Edge
- Firefox
- Safari
- Mobile Chrome
- Mobile Safari

## 💡 Pro Tips

1. **Use CSS Variables**: Always prefer variables over hard-coded values
2. **Test Dark/Light**: Check color contrast in both themes
3. **Animation Performance**: Use `transform` and `opacity` for smooth animations
4. **Backup First**: Save original CSS before major changes
5. **One Change at a Time**: Easier to debug issues

## 🔍 Debugging Common Issues

### Colors not changing
```css
/* Make sure you're editing the right template file */
/* Clear browser cache (Ctrl + Shift + R) */
```

### Animations not working
```css
/* Check browser support for the animation property */
/* Verify keyframes are defined */
```

### Layout broken
```css
/* Check for missing closing braces } */
/* Validate CSS syntax */
/* Inspect element in browser DevTools */
```

## 🎨 Recommended Color Tools

- **Coolors.co** - Generate palettes
- **Color.adobe.com** - Adobe Color Wheel
- **Paletton.com** - Color scheme designer
- **Contrast Checker** - WebAIM contrast checker

## 📚 Learning Resources

- MDN Web Docs (developer.mozilla.org)
- CSS-Tricks (css-tricks.com)
- Can I Use (caniuse.com) - Browser support

---

**Remember**: Start with small changes, test often, and have fun! 🎨

**Need more help?** Check the full README.md or inspect elements in your browser's DevTools (F12).