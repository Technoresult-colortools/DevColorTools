document.addEventListener('DOMContentLoaded', () => {
    const colorPicker = document.getElementById('color-picker');
    const colorInput = document.getElementById('color-input');
    const shadeSlider = document.getElementById('shade-slider');
    const shadeCount = document.getElementById('shade-count');
    const shadeContainer = document.getElementById('shades-container');
    const selectedColor = document.getElementById('selected-color');
    const hexValue = document.getElementById('hex-value');
    const rgbValue = document.getElementById('rgb-value');
    const hslValue = document.getElementById('hsl-value');
    const hsvValue = document.getElementById('hsv-value');

    function hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    }

    function rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    function rgbToHsv(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const d = max - min;
        let h, s, v = max;

        s = max === 0 ? 0 : d / max;

        if (max === min) {
            h = 0;
        } else {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
    }

    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
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

        return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    }

    function generateShades(hex, count) {
        const [r, g, b] = hexToRgb(hex);
        const shades = [];
        for (let i = 0; i < count; i++) {
            const factor = i / (count - 1);
            const shadeR = Math.round(r * (1 - factor) + 255 * factor);
            const shadeG = Math.round(g * (1 - factor) + 255 * factor);
            const shadeB = Math.round(b * (1 - factor) + 255 * factor);
            const shadeHex = rgbToHex(shadeR, shadeG, shadeB);
            shades.push({
                hex: shadeHex,
                rgb: [shadeR, shadeG, shadeB],
                hsv: rgbToHsv(shadeR, shadeG, shadeB),
                hsl: rgbToHsl(shadeR, shadeG, shadeB)
            });
        }
        return shades;
    }

    function updateShades() {
        const color = colorPicker.value;
        const shades = generateShades(color, parseInt(shadeSlider.value));
        
        shadeContainer.innerHTML = '';
        
        shades.forEach(shade => {
            const shadeElement = document.createElement('div');
            shadeElement.className = 'shade';
            shadeElement.style.backgroundColor = shade.hex;
            shadeElement.style.width = `${100 / shades.length}%`;
            shadeElement.style.height = '50px';
            shadeElement.style.display = 'inline-block';
            shadeElement.style.margin = '0 -1px';
            
            shadeElement.addEventListener('click', () => {
                updateSelectedShade(shade);
            });
            
            shadeContainer.appendChild(shadeElement);
        });

        updateSelectedShade(shades[Math.floor(shades.length / 2)]);
    }

    function updateSelectedShade(shade) {
        selectedColor.style.backgroundColor = shade.hex;
        hexValue.textContent = shade.hex;
        rgbValue.textContent = `rgb(${shade.rgb.join(', ')})`;
        hslValue.textContent = `hsl(${shade.hsl[0]}, ${shade.hsl[1]}%, ${shade.hsl[2]}%)`;
        hsvValue.textContent = `hsv(${shade.hsv[0]}, ${shade.hsv[1]}%, ${shade.hsv[2]}%)`;
    }

    colorPicker.addEventListener('input', () => {
        colorInput.value = colorPicker.value;
        updateShades();
    });

    colorInput.addEventListener('input', () => {
        if (/^#[0-9A-F]{6}$/i.test(colorInput.value)) {
            colorPicker.value = colorInput.value;
            updateShades();
        }
    });

    shadeSlider.addEventListener('input', () => {
        shadeCount.textContent = shadeSlider.value;
        updateShades();
    });

    updateShades();
});