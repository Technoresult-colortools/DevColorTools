document.addEventListener('DOMContentLoaded', function() {
    const redInput = document.getElementById('red');
    const greenInput = document.getElementById('green');
    const blueInput = document.getElementById('blue');
    const alphaInput = document.getElementById('alpha');
    const convertButton = document.getElementById('convert-button');
    const hexValue = document.getElementById('hex-value');
    const alphaValue = document.getElementById('alpha-value');
    const colorPalette = document.getElementById('color-palette');

    // Set initial color to black
    colorPalette.style.backgroundColor = 'rgba(255, 255, 255, 1)';

    convertButton.addEventListener('click', function() {
        const r = parseInt(redInput.value);
        const g = parseInt(greenInput.value);
        const b = parseInt(blueInput.value);
        const alpha = parseFloat(alphaInput.value);

        // Validate input values
        if (isNaN(r) || isNaN(g) || isNaN(b) || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
            alert("Please enter valid RGB values (0-255).");
            return;
        }
        if (isNaN(alpha) || alpha < 0 || alpha > 1) {
            alert("Please enter a valid alpha value (0-1).");
            return;
        }

        // Function to convert RGB to Hex
        function rgbToHex(r, g, b) {
            const toHex = (c) => Math.round(c).toString(16).padStart(2, '0');
            return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        }

        // Function to convert Alpha to Hex
        function alphaToHex(alpha) {
            return Math.round(alpha * 255).toString(16).padStart(2, '0');
        }

        const hexColorValue = rgbToHex(r, g, b);
        const alphaHexValue = alphaToHex(alpha);

        // Display the result
        hexValue.textContent = `Hex: ${hexColorValue}${alphaHexValue}`;
        alphaValue.textContent = `Alpha (Hex): ${alphaHexValue}`;

        // Update the color palette
        const rgbaString = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        colorPalette.style.backgroundColor = rgbaString;
    });
});