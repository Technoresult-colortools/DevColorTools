document.addEventListener('DOMContentLoaded', function() {
    const color1Input = document.getElementById('color1-input');
    const color1Picker = document.getElementById('color1-picker');
    const color1Preview = document.getElementById('color1-preview');
    const color1Details = document.getElementById('color1-details');

    const color2Input = document.getElementById('color2-input');
    const color2Picker = document.getElementById('color2-picker');
    const color2Preview = document.getElementById('color2-preview');
    const color2Details = document.getElementById('color2-details');

    const mixButton = document.getElementById('mix-button');
    const mixedColorSection = document.getElementById('mixed-color-section');
    const mixedColorPreview = document.getElementById('mixed-color-preview');
    const resultHex = document.getElementById('result-hex');
    const resultRgb = document.getElementById('result-rgb');
    const resultHsv = document.getElementById('result-hsv');

    const resetButton = document.getElementById('reset-button');
    const copyHexButton = document.getElementById('copy-hex');
    const copyRgbButton = document.getElementById('copy-rgb');
    const copyHsvButton = document.getElementById('copy-hsv');

    function updateColor(input, picker, preview, details) {
        const color = input.value;
        picker.value = color;
        preview.style.backgroundColor = color;
        details.textContent = `Hex: ${color} | RGB: ${hexToRgb(color)}`;
    }

    function hexToRgb(hex) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function rgbToHsv(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, v = max;
        let d = max - min;
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

        return `hsv(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%)`;
    }

    function mixColors(color1, color2) {
        const r = Math.round((parseInt(color1.slice(1, 3), 16) + parseInt(color2.slice(1, 3), 16)) / 2);
        const g = Math.round((parseInt(color1.slice(3, 5), 16) + parseInt(color2.slice(3, 5), 16)) / 2);
        const b = Math.round((parseInt(color1.slice(5, 7), 16) + parseInt(color2.slice(5, 7), 16)) / 2);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    mixButton.addEventListener('click', () => {
        const mixedColor = mixColors(color1Input.value, color2Input.value);
        const [r, g, b] = hexToRgb(mixedColor).match(/\d+/g).map(Number);
        mixedColorPreview.style.backgroundColor = mixedColor;
        resultHex.textContent = mixedColor;
        resultRgb.textContent = hexToRgb(mixedColor);
        resultHsv.textContent = rgbToHsv(r, g, b);
        

        mixedColorSection.classList.remove('hidden');
    });

    resetButton.addEventListener('click', () => {
        color1Input.value = '#3da013';
        color2Input.value = '#0000ff';
        updateColor(color1Input, color1Picker, color1Preview, color1Details);
        updateColor(color2Input, color2Picker, color2Preview, color2Details);
        mixedColorPreview.style.backgroundColor = '';
        resultHex.textContent = '';
        resultRgb.textContent = '';
        resultHsv.textContent = '';
        mixedColorSection.classList.add('hidden');
    });

    // Function to copy text to clipboard
function copyToClipboard(text, copiedElement) {
    navigator.clipboard.writeText(text).then(() => {
        copiedElement.classList.remove('hidden');
        setTimeout(() => {
            copiedElement.classList.add('hidden');
        }, 2000); // Hide the "Copied!" message after 2 seconds
    });
}

// Event listeners for the copy buttons
document.getElementById('copy-hex').addEventListener('click', () => {
    const hexValue = document.getElementById('result-hex').textContent;
    const copiedElement = document.getElementById('copied-hex');
    copyToClipboard(hexValue, copiedElement);
});

document.getElementById('copy-rgb').addEventListener('click', () => {
    const rgbValue = document.getElementById('result-rgb').textContent;
    const copiedElement = document.getElementById('copied-rgb');
    copyToClipboard(rgbValue, copiedElement);
});

document.getElementById('copy-hsv').addEventListener('click', () => {
    const hsvValue = document.getElementById('result-hsv').textContent;
    const copiedElement = document.getElementById('copied-hsv');
    copyToClipboard(hsvValue, copiedElement);
});

    updateColor(color1Input, color1Picker, color1Preview, color1Details);
    updateColor(color2Input, color2Picker, color2Preview, color2Details);
});
