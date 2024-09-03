// script.js

document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.getElementById('convert-button');
    const rgbValueElement = document.getElementById('rgb-value');
    const colorPalette = document.getElementById('color-palette');

    convertButton.addEventListener('click', () => {
        const hue = parseFloat(document.getElementById('hue').value);
        const saturation = parseFloat(document.getElementById('saturation').value) / 100;
        const value = parseFloat(document.getElementById('value').value) / 100;

        const rgb = hsvToRgb(hue, saturation, value);
        const rgbString = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

        rgbValueElement.textContent = rgbString;
        colorPalette.style.backgroundColor = rgbString
    });

    function hsvToRgb(h, s, v) {
        let r, g, b;

        const i = Math.floor(h / 60);
        const f = h / 60 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
});
