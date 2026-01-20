const { execSync } = require('child_process');
const fs = require('fs');

const themes = [
    '0-original',
    '1-neobrutalism',
    '2-retro-gaming',
    '3-geometric-blue',
    '4-linkedin',
    '5-Github'
];

console.log('🔧 Starting CSS minification...\n');

themes.forEach(theme => {
    const input = `${theme}.css`;
    const output = `${theme}.min.css`;

    if (!fs.existsSync(input)) {
        console.log(`⚠️  ${input} not found, skipping...`);
        return;
    }

    try {
        execSync(`npx cleancss -o ${output} ${input}`, { stdio: 'inherit' });

        const originalSize = fs.statSync(input).size;
        const minifiedSize = fs.statSync(output).size;
        const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

        console.log(`✅ ${theme}.css → ${theme}.min.css (${savings}% smaller)\n`);
    } catch (error) {
        console.error(`❌ Error minifying ${theme}.css:`, error.message);
    }
});

console.log('✨ Minification complete!');
