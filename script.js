class AnshxToastFramework {
    constructor() {
        // Configuration Section
        this.settings = {
            position: 'top',             // top, bottom, left, right
            enableShadow: true,          // Toggle for shadow effect
            showCloseIcon: true,         // Toggle for close icon visibility
            autoColor: true,             // Auto-set color based on image
            multipleToasts: true         // Enable multiple toasts on screen
        };

        // Initialize toast container and button
        this.toastContainer = null;
        this.createToastContainer();
        this.createShowButton();
        this.updatePosition();
    }

    createToastContainer() {
        this.toastContainer = document.createElement('div');
        this.toastContainer.className = `anshx-toast-container ${this.settings.position}`;
        document.body.appendChild(this.toastContainer);
    }

    updatePosition() {
        const positions = ['top', 'bottom', 'left', 'right'];
        positions.forEach(pos => this.toastContainer.classList.remove(pos));
        this.toastContainer.classList.add(this.settings.position);
    }

    createShowButton() {
        this.showButton = document.createElement('button');
        this.showButton.className = 'anshx-show-button';
        this.showButton.textContent = '❱';
        this.showButton.style.background = 'linear-gradient(45deg, #ff5c5c, #ffb367, #ffda7e)';
        this.showButton.onclick = () => this.showHiddenToast();
        document.body.appendChild(this.showButton);
    }

    async getBrightenedColor(imageSrc) {
        const img = document.createElement('img');
        img.crossOrigin = 'Anonymous';
        img.src = imageSrc;
        await img.decode();

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let color = { r: 0, g: 0, b: 0 };
        for (let i = 0; i < data.length; i += 4) {
            color.r += data[i];
            color.g += data[i + 1];
            color.b += data[i + 2];
        }
        const pixelCount = data.length / 4;
        color = {
            r: Math.min(Math.round(color.r / pixelCount) + 70, 255),
            g: Math.min(Math.round(color.g / pixelCount) + 70, 255),
            b: Math.min(Math.round(color.b / pixelCount) + 70, 255),
        };
        return `rgba(${color.r}, ${color.g}, ${color.b}, 0.7)`;
    }

    async showToast({ message, logo, progressColor, duration = 5000 }) {
        const toast = document.createElement('div');
        toast.className = 'anshx-toast';
        toast.id = `anshx-toast-${Date.now()}`;
        if (this.settings.enableShadow) {
            const ambientColor = logo ? await this.getBrightenedColor(logo) : 'rgba(128,0,128,0.5)';
            toast.style.boxShadow = `0px 8px 25px ${ambientColor}, 0 8px 25px ${ambientColor}`;
        }

        const logoContainer = document.createElement('div');
        const img = document.createElement('img');
        img.src = logo || '';
        img.style.width = '30px';
        img.style.height = '30px';
        logoContainer.appendChild(img);
        toast.appendChild(logoContainer);

        const content = document.createElement('div');
        content.className = 'anshx-toast-content';
        content.innerText = message;
        toast.appendChild(content);

        const progressBar = document.createElement('div');
        progressBar.className = 'anshx-progress-bar';
        if (this.settings.autoColor && logo) {
            const autoColor = await this.getBrightenedColor(logo);
            progressBar.style.setProperty('--anshx-progress-color', autoColor);
        } else {
            progressBar.style.setProperty('--anshx-progress-color', progressColor || '#4CAF50');
        }
        progressBar.style.animationDuration = `${duration}ms`;
        toast.appendChild(progressBar);

        const stickyIcon = document.createElement('div');
        stickyIcon.className = 'anshx-sticky-icon';
        stickyIcon.innerHTML = '📌';
        stickyIcon.onclick = () => this.hideToast(toast);
        toast.appendChild(stickyIcon);

        if (this.settings.showCloseIcon) {
            const closeIcon = document.createElement('div');
            closeIcon.className = 'anshx-close-icon';
            closeIcon.innerHTML = '✖';
            closeIcon.onclick = () => this.dismissToast(toast);
            toast.appendChild(closeIcon);
        }

        this.toastContainer.appendChild(toast);

        setTimeout(() => !toast.classList.contains('hidden') && this.dismissToast(toast), duration);
        this.enableSwipeToDismiss(toast);
        this.enableHoverPause(toast, progressBar);
    }

    dismissToast(toast) {
        toast.classList.add('hidden');
        setTimeout(() => toast.remove(), 500);
    }

    hideToast(toast) {
        toast.classList.add('hidden');
        this.showButton.style.display = 'block';
    }

    showHiddenToast() {
        const hiddenToast = this.toastContainer.querySelector('.anshx-toast.hidden');
        if (hiddenToast) {
            hiddenToast.classList.remove('hidden');
            hiddenToast.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease';
            this.showButton.style.display = 'none';
            hiddenToast.querySelector('.anshx-progress-bar').style.animation = '';
            setTimeout(() => hiddenToast.querySelector('.anshx-progress-bar').style.animation = 'anshx-progress linear forwards', 10);
        }
    }

    enableSwipeToDismiss(toast) {
        let startX = 0, deltaX = 0;
        toast.addEventListener('mousedown', (e) => { startX = e.clientX; });
        toast.addEventListener('mousemove', (e) => {
            if (startX) {
                deltaX = e.clientX - startX;
                toast.style.transform = `translateX(${deltaX}px)`;
            }
        });
        toast.addEventListener('mouseup', () => { if (deltaX > 100) this.dismissToast(toast); startX = 0; deltaX = 0; });
        
        toast.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
        toast.addEventListener('touchmove', (e) => {
            if (startX) {
                deltaX = e.touches[0].clientX - startX;
                toast.style.transform = `translateX(${deltaX}px)`;
            }
        });
        toast.addEventListener('touchend', () => { if (deltaX > 100) this.dismissToast(toast); startX = 0; deltaX = 0; });
    }

    enableHoverPause(toast, progressBar) {
        toast.addEventListener('mouseenter', () => progressBar.style.animationPlayState = 'paused');
        toast.addEventListener('mouseleave', () => progressBar.style.animationPlayState = 'running');
    }
}
