document.getElementById('convert-button').addEventListener('click', () => {
    const h = parseFloat(document.getElementById('hue').value);
    const s = parseFloat(document.getElementById('saturation').value) / 100;
    const l = parseFloat(document.getElementById('lightness').value) / 100;
    const colorPalette = document.getElementById('color-palette');

    let r, g, b;

    if (s === 0) {
        r = g = b = l * 255; // achromatic
    } else {
        function hueToRgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        const hk = h / 360;

        r = hueToRgb(p, q, hk + 1 / 3) * 255;
        g = hueToRgb(p, q, hk) * 255;
        b = hueToRgb(p, q, hk - 1 / 3) * 255;
    }

    
    document.getElementById('rgb-value').textContent = `R: ${Math.round(r)}, G: ${Math.round(g)}, B: ${Math.round(b)}`;

    
    colorPalette.style.backgroundColor = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
});

