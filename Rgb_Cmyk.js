document.getElementById('convert-button').addEventListener('click', () => {
    const r = parseInt(document.getElementById('red').value);
    const g = parseInt(document.getElementById('green').value);
    const b = parseInt(document.getElementById('blue').value);
    const colorPalette = document.getElementById('color-palette');


    const c = 1 - (r / 255);
    const m = 1 - (g / 255);
    const y = 1 - (b / 255);
    const k = Math.min(c, m, y);

    const cmykC = ((c - k) / (1 - k)) * 100;
    const cmykM = ((m - k) / (1 - k)) * 100;
    const cmykY = ((y - k) / (1 - k)) * 100;
    const cmykK = k * 100;


    document.getElementById('cmyk-value').textContent = `C: ${cmykC.toFixed(2)}%, M: ${cmykM.toFixed(2)}%, Y: ${cmykY.toFixed(2)}%, K: ${cmykK.toFixed(2)}%`;


    colorPalette.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});
