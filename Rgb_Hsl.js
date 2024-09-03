document.getElementById('convert-button').addEventListener('click', () => {
    const r = parseInt(document.getElementById('red').value);
    const g = parseInt(document.getElementById('green').value);
    const b = parseInt(document.getElementById('blue').value);

    // Convert RGB to HSL
    const hsl = rgbToHsl(r, g, b);
    const colorPalette = document.getElementById('color-palette');

    // Display the HSL values
    document.getElementById('hsl-value').textContent = `H: ${Math.round(hsl.h)}°, S: ${Math.round(hsl.s * 100)}%, L: ${Math.round(hsl.l * 100)}%`;

    // Set the background color of the color palette using the RGB values
    colorPalette.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});

// Convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: h * 360,
        s: s,
        l: l
    };
}
