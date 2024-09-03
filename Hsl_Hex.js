document.getElementById('convert-button').addEventListener('click', () => {
    const hue = parseFloat(document.getElementById('hue').value);
    const saturation = parseFloat(document.getElementById('saturation').value) / 100;
    const lightness = parseFloat(document.getElementById('lightness').value) / 100;


    const rgb = hslToRgb(hue, saturation, lightness);
    
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    const colorPalette = document.getElementById('color-palette');

    
    document.getElementById('hex-value').textContent = hex;

    
    colorPalette.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
});


function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; 
    } else {
        const hueToRgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hueToRgb(p, q, h / 360 + 1/3);
        g = hueToRgb(p, q, h / 360);
        b = hueToRgb(p, q, h / 360 - 1/3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function rgbToHex(r, g, b) {
    const toHex = (n) => {
        const hex = n.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return '#' + toHex(r) + toHex(g) + toHex(b);
}
