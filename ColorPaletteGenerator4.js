//color palette generation using color mind API
const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
};

const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

async function generateColorPalette() {
    const apiUrl = 'https://www.thecolorapi.com/scheme';
    const baseColor = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const mode = 'analogic';
    const count = 5;

    try {
        const response = await fetch(`${apiUrl}?hex=${baseColor}&mode=${mode}&count=${count}`);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.colors.map(color => ({
            r: color.rgb.r,
            g: color.rgb.g,
            b: color.rgb.b,
            hex: color.hex.value
        }));
    } catch (error) {
        console.error('Error fetching color palette:', error);
        return null;
    }
}

function displayPalette(palette) {
    const paletteContainer = document.getElementById('color-palette-container');
    paletteContainer.innerHTML = '';
    paletteContainer.className = 'grid grid-cols-2 gap-4 mt-4';

    palette.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box bg-white rounded-lg shadow-md p-4';
        colorBox.innerHTML = `
            <div class="w-full h-24 rounded-md mb-2" style="background-color: ${color.hex};"></div>
            <div>
                <p class="font-bold text-lg">Color</p>
                <p class="text-sm">HEX: ${color.hex}</p>
                <p class="text-sm">RGB: rgb(${color.r}, ${color.g}, ${color.b})</p>
            </div>
        `;
        paletteContainer.appendChild(colorBox);
    });

    // Display full palette strip
    const paletteStrip = document.createElement('div');
    paletteStrip.className = 'col-span-2 flex rounded-md overflow-hidden shadow-md';
    palette.forEach(color => {
        const strip = document.createElement('div');
        strip.className = 'flex-grow h-8';
        strip.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        paletteStrip.appendChild(strip);
    });
    paletteContainer.insertBefore(paletteStrip, paletteContainer.firstChild);
}

// Event listeners and DOM manipulation
document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');

    generateButton.addEventListener('click', async () => {
        const palette = await generateColorPalette();
        if (palette) {
            displayPalette(palette);
        } else {
            const paletteContainer = document.getElementById('color-palette-container');
            paletteContainer.innerHTML = '<p>Error generating color palette. Please try again.</p>';
        }
    });
});
