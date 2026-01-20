const playwright = require('playwright');
const path = require('path');

const themes = [
    '0-original.min',
    '1-neobrutalism.min',
    '2-retro-gaming.min',
    '3-geometric-blue.min',
    '4-linkedin.min',
    '5-Github.min',
    '6-whatsapp.min'
];

const viewports = {
    desktop: { width: 1920, height: 1080 },
    mobile: { width: 375, height: 667 }
};

async function captureScreenshots() {
    console.log('🚀 Starting screenshot capture...\n');
    const browser = await playwright.chromium.launch();

    for (const theme of themes) {
        console.log(`📸 Capturing ${theme}...`);

        for (const [device, viewport] of Object.entries(viewports)) {
            const context = await browser.newContext({ viewport });
            const page = await context.newPage();

            // Load test.html with specific theme
            const htmlPath = path.resolve(__dirname, 'test.html');
            await page.goto(`file://${htmlPath}`);

            // Switch to the theme via JavaScript
            await page.evaluate((themeName) => {
                const themeLink = document.getElementById('theme-css');
                themeLink.href = themeName + '.css';
            }, theme);

            // Wait for CSS to load and animations to settle
            await page.waitForTimeout(1500);

            // Hide theme switcher for clean screenshot
            await page.evaluate(() => {
                const switcher = document.querySelector('.theme-switcher');
                if (switcher) switcher.style.display = 'none';
            });

            // Take screenshot
            const outputPath = path.resolve(__dirname, 'screenshots', `${theme}-${device}.png`);
            await page.screenshot({
                path: outputPath,
                fullPage: false
            });

            console.log(`  ✓ ${theme}-${device}.png`);
            await context.close();
        }
    }

    await browser.close();
    console.log('\n✅ All screenshots captured successfully!');
    console.log('📂 Location: /Users/toshioj/Projects/Twine/screenshots/');
}

captureScreenshots().catch(console.error);
