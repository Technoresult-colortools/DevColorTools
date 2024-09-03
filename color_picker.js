document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('drop-zone');
    const imageUpload = document.getElementById('image-upload');
    const imageContainer = document.getElementById('image-container');
    const colorPreview = document.getElementById('color-preview');
    const hexValue = document.getElementById('hex-value');
    const rgbValue = document.getElementById('rgb-value');
    const hslValue = document.getElementById('hsl-value');

    let currentColor = { r: 255, g: 255, b: 255, a: 1 };
    let isPicking = false;

    function updateColorInfo(color) {
        const hex = rgbToHex(color.r, color.g, color.b);
        const rgb = `rgb(${color.r}, ${color.g}, ${color.b})`;
        const hsl = rgbToHsl(color.r, color.g, color.b);

        hexValue.textContent = hex;
        rgbValue.textContent = rgb;
        hslValue.textContent = hsl;
        colorPreview.style.backgroundColor = rgb;
    }

    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
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

        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }

    function handleImageUpload(file) {
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    imageContainer.innerHTML = '';
                    imageContainer.appendChild(img);
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '100%';
                    img.style.height = 'auto';
                    setupColorPicker(img);
                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(file);
        }
    }

    function setupColorPicker(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        const magnifier = document.createElement('canvas');
        const magnifierCtx = magnifier.getContext('2d');
        magnifier.width = 100;
        magnifier.height = 100;
        magnifier.style.position = 'absolute';
        magnifier.style.border = '2px solid white';
        magnifier.style.borderRadius = '50%';
        magnifier.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.2)';
        magnifier.style.display = 'none'; // Initially hide the magnifier
        imageContainer.appendChild(magnifier);

        // Change the cursor style when hovering over the image
        imageContainer.style.cursor = 'crosshair'; // Change 'crosshair' to any cursor style you prefer

        imageContainer.addEventListener('mousemove', function(e) {
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const scaleX = img.naturalWidth / rect.width;
            const scaleY = img.naturalHeight / rect.height;

            magnifier.style.display = 'block';
            magnifier.style.left = `${x - 50}px`;
            magnifier.style.top = `${y - 50}px`;

            magnifierCtx.clearRect(0, 0, 100, 100);
            magnifierCtx.drawImage(
                canvas,
                Math.max(0, Math.min(x * scaleX - 25, canvas.width - 50)),
                Math.max(0, Math.min(y * scaleY - 25, canvas.height - 50)),
                50, 50,
                0, 0,
                100, 100
            );

            if (isPicking) {
                const pixelData = ctx.getImageData(x * scaleX, y * scaleY, 1, 1).data;
                currentColor = { r: pixelData[0], g: pixelData[1], b: pixelData[2], a: pixelData[3] / 255 };
                updateColorInfo(currentColor);
            }
        });

        imageContainer.addEventListener('mousedown', function(e) {
            isPicking = true;
            pickColor(e);
        });

        document.addEventListener('mouseup', function() {
            isPicking = false;
        });

        imageContainer.addEventListener('mouseleave', function() {
            magnifier.style.display = 'none'; // Hide magnifier when mouse leaves the image
        });

        function pickColor(e) {
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const scaleX = img.naturalWidth / rect.width;
            const scaleY = img.naturalHeight / rect.height;

            const pixelData = ctx.getImageData(x * scaleX, y * scaleY, 1, 1).data;
            currentColor = { r: pixelData[0], g: pixelData[1], b: pixelData[2], a: pixelData[3] / 255 };
            updateColorInfo(currentColor);
        }
    }

    dropZone.addEventListener('click', () => imageUpload.click());

    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        handleImageUpload(file);
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-blue-500');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('border-blue-500');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-blue-500');
        const file = e.dataTransfer.files[0];
        handleImageUpload(file);
    });

    // Initial color update
    updateColorInfo(currentColor);
});
