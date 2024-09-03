document.addEventListener('DOMContentLoaded', function () {
    const colorInput = document.getElementById('color-value');
    const generateButton = document.getElementById('generate-name');
    const colorNameDisplay = document.getElementById('color-name');
    const colorPalette = document.getElementById('color-palette');

    const apiUrl = 'https://www.thecolorapi.com/id?';

    function hexToRgb(hex) {
        hex = hex.replace(/^#/, '');
        if (hex.length === 4) {
            hex = hex.split('').map(function (char) {
                return char + char;
            }).join('');
        }
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgb(${r}, ${g}, ${b})`;
    }

    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(function (x) {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    function hslToHex(h, s, l) {
        s /= 100;
        l /= 100;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;
        let r = 0, g = 0, b = 0;

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

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return rgbToHex(r, g, b);
    }

    async function fetchColorName(hex) {
        try {
            const response = await fetch(`${apiUrl}hex=${hex}`);
            const data = await response.json();
            return data.name.value;
        } catch (error) {
            console.error('Error fetching color name:', error);
            return 'Error fetching color name';
        }
    }

    generateButton.addEventListener('click', async function () {
        const colorValue = colorInput.value.trim();

        if (/^#([0-9A-F]{3}){1,2}$/i.test(colorValue)) {
            const hex = colorValue.replace('#', '');
            const colorName = await fetchColorName(hex);
            colorNameDisplay.innerHTML = `Color Name: <span class="text-blue-500">${colorName}</span>`;
            colorPalette.style.backgroundColor = hexToRgb(colorValue);
        } else if (/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/i.test(colorValue)) {
            const rgbValues = colorValue.match(/\d+/g).map(Number);
            const hex = rgbToHex(rgbValues[0], rgbValues[1], rgbValues[2]).replace('#', '');
            const colorName = await fetchColorName(hex);
            colorNameDisplay.innerHTML = `Color Name: <span class="text-blue-500">${colorName}</span>`;
            colorPalette.style.backgroundColor = colorValue;
        } else if (/^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$/i.test(colorValue)) {
            const hslValues = colorValue.match(/\d+/g).map(Number);
            const hex = hslToHex(hslValues[0], hslValues[1], hslValues[2]).replace('#', '');
            const colorName = await fetchColorName(hex);
            colorNameDisplay.innerHTML = `Color Name: <span class="text-blue-500">${colorName}</span>`;
            colorPalette.style.backgroundColor = hslToHex(hslValues[0], hslValues[1], hslValues[2]);
        } else {
            colorNameDisplay.innerHTML = 'Please enter a valid color value in HEX, RGB, or HSL format.';
        }
    });
});
