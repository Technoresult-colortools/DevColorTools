document.getElementById('convert-button').addEventListener('click', function() {
    const hex = document.getElementById('hex-input').value;
    const alpha = parseFloat(document.getElementById('alpha-input').value);

    // Function to convert Hex to RGBA
    function hexToRgba(hex, alpha) {
        hex = hex.replace(/^#/, '');
        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        return { r, g, b, a: alpha };
    }

    // Validate Hex code
    const isValidHex = /^#?[0-9A-F]{6}$/i.test(hex);
    if (!isValidHex) {
        alert("Please enter a valid 6-character Hex color code.");
        return;
    }

    // Validate alpha value
    if (isNaN(alpha) || alpha < 0 || alpha > 1) {
        alert("Please enter a valid alpha value between 0 and 1.");
        return;
    }

    // Convert the Hex to RGBA
    const rgbaObject = hexToRgba(hex, alpha);
    const rgbaString = `rgba(${rgbaObject.r}, ${rgbaObject.g}, ${rgbaObject.b}, ${rgbaObject.a})`;

    // Display the result
    document.getElementById('rgba-value').textContent = `RGBA: ${rgbaString}`;

    // Update the color palette
    const colorPalette = document.getElementById('color-palette');
    colorPalette.style.backgroundColor = rgbaString;
    colorPalette.style.display = 'block';
});