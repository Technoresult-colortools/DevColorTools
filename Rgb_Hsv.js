document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.getElementById('convert-button');
    const hsvValueElement = document.getElementById('hsv-value');
    const colorPalette = document.getElementById('color-palette');

    convertButton.addEventListener('click', () => {
        const red = parseInt(document.getElementById('red').value);
        const green = parseInt(document.getElementById('green').value);
        const blue = parseInt(document.getElementById('blue').value);

        // Ensure RGB values are within the valid range
        if (isNaN(red) || isNaN(green) || isNaN(blue) || red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255) {
            alert("Please enter valid RGB values between 0 and 255.");
            return;
        }

        const hsv = rgbToHsv(red, green, blue);
        const hsvString = `h: ${Math.round(hsv[0])}°, s: ${Math.round(hsv[1] * 100)}%, v: ${Math.round(hsv[2] * 100)}%`;

        hsvValueElement.textContent = hsvString;
        const [r, g, b] = hsvToRgb(hsv[0], hsv[1], hsv[2]);
        colorPalette.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    });

    function rgbToHsv(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, v = max;

        const d = max - min;
        s = max === 0 ? 0 : d / max;

        if (max === min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h * 360, s, v];
    }
    function hsvToRgb(h, s, v) {
        h /= 360;
        let r, g, b;

        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
        }

        return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        ];
    }    
});
