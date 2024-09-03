document.addEventListener('DOMContentLoaded', function() {
    const convertButton = document.getElementById('convert-button');
    const rgbValue = document.getElementById('rgb-value');
    const colorPalette = document.getElementById('color-palette');

    convertButton.addEventListener('click', function() {
        let cyan = parseFloat(document.getElementById('cyan').value);
        let magenta = parseFloat(document.getElementById('magenta').value);
        let yellow = parseFloat(document.getElementById('yellow').value);
        let black = parseFloat(document.getElementById('black').value);

        // Input validation
        if (isNaN(cyan) || isNaN(magenta) || isNaN(yellow) || isNaN(black) ||
            cyan < 0 || cyan > 100 || magenta < 0 || magenta > 100 ||
            yellow < 0 || yellow > 100 || black < 0 || black > 100) {
            alert("Please enter valid CMYK values between 0 and 100.");
            return;
        }

        // Convert to decimal
        cyan /= 100;
        magenta /= 100;
        yellow /= 100;
        black /= 100;

        // Convert CMYK to RGB
        let red = Math.round(255 * (1 - cyan) * (1 - black));
        let green = Math.round(255 * (1 - magenta) * (1 - black));
        let blue = Math.round(255 * (1 - yellow) * (1 - black));

        // Ensure RGB values are within 0-255 range
        red = Math.min(255, Math.max(0, red));
        green = Math.min(255, Math.max(0, green));
        blue = Math.min(255, Math.max(0, blue));

        // Display RGB values
        rgbValue.textContent = `R: ${red}, G: ${green}, B: ${blue}`;

        // Set color palette background
        colorPalette.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    });
});