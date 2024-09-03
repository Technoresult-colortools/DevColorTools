document.addEventListener('DOMContentLoaded', function () {
    const dropZone = document.getElementById('drop-zone');
    const imageUpload = document.getElementById('image-upload');
    const imageContainer = document.getElementById('image-container');
    const previewImage = document.getElementById('preview-image');
    const colorGrid = document.getElementById('color-grid');
    const colorCountDropdown = document.getElementById('color-count');

    dropZone.addEventListener('click', function () {
        imageUpload.click();
    });

    dropZone.addEventListener('dragover', function (e) {
        e.preventDefault();
        dropZone.classList.add('border-blue-500');
    });

    dropZone.addEventListener('dragleave', function () {
        dropZone.classList.remove('border-blue-500');
    });

    dropZone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropZone.classList.remove('border-blue-500');
        const file = e.dataTransfer.files[0];
        handleImage(file);
    });

    imageUpload.addEventListener('change', function () {
        const file = this.files[0];
        handleImage(file);
    });

    

    function handleImage(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.onload = function () {
                    displayImage(img);
                    extractColors(img);
                };
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a valid image file.');
        }
    }

    function displayImage(img) {
        imageContainer.innerHTML = '';
        imageContainer.appendChild(img);
    }

    function extractColors(img) {
        try {
            const colorThief = new ColorThief();
            const palette = colorThief.getPalette(img, parseInt(colorCountDropdown.value));
            displayColors(palette);
        } catch (error) {
            console.error("Error extracting colors:", error);
        }
    }

    function displayColors(colors) {
        colorGrid.innerHTML = '';

        colors.forEach(color => {
            const [r, g, b] = color;
            const hex = rgbToHex(r, g, b);
            const hsl = rgbToHsl(r, g, b);

            const colorCard = document.createElement('div');
            colorCard.className = 'bg-white rounded-lg shadow-md p-4 flex flex-col items-center';
            
            const colorPreview = document.createElement('div');
            colorPreview.className = 'w-full h-24 rounded-md mb-2';
            colorPreview.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            
            const hexValue = document.createElement('p');
            hexValue.textContent = `HEX: ${hex}`;
            hexValue.className = 'text-xs mb-1';
            
            const rgbValue = document.createElement('p');
            rgbValue.textContent = `RGB: ${r}, ${g}, ${b}`;
            rgbValue.className = 'text-xs mb-1';
            
            const hslValue = document.createElement('p');
            hslValue.textContent = `HSL: ${hsl[0]}°, ${hsl[1]}%, ${hsl[2]}%`;
            hslValue.className = 'text-xs';

            colorCard.appendChild(colorPreview);
            colorCard.appendChild(hexValue);
            colorCard.appendChild(rgbValue);
            colorCard.appendChild(hslValue);

            colorGrid.appendChild(colorCard);
        });
    }

    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
    
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
    
        if (max == min) {
            h = s = 0;
        } else {
            let d = max - min;
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

    colorCountDropdown.addEventListener('change', function(){
        if (imageContainer.querySelector('img')){
            extractColors(imageContainer.querySelector('img'));
        }
    });
});
