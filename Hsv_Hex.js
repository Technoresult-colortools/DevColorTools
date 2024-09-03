document.getElementById('convert-button').addEventListener('click', () => {
    const hue = parseFloat(document.getElementById('hue').value);
    const saturation = parseFloat(document.getElementById('saturation').value) / 100;
    const value = parseFloat(document.getElementById('value').value) / 100;


    const rgb = hsvToRgb(hue, saturation, value);

    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    const colorPalette = document.getElementById('color-palette');

    document.getElementById('hex-value').textContent = hex;


    colorPalette.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
});

function hsvToRgb(h, s, v) {
    let r, g, b;
    const c = v * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = v - c;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255)
    };
}

function rgbToHex(r, g, b) {
    const toHex = (n) => {
        const hex = n.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return '#' + toHex(r) + toHex(g) + toHex(b);
}
