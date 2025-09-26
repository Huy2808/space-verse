// Theme Management System
const themeManager = {
    toggleButton: document.getElementById('colorModeToggle'),
    toggleIcon: document.getElementById('colorModeIcon'),
    toggleText: document.getElementById('colorModeText'),
    
    init() {
        this.applyTheme(this.getSavedTheme());
        this.setupEventListeners();
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    },

    setupEventListeners() {
        this.toggleButton.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'bright' ? 'dark' : 'bright';
            this.applyTheme(newTheme);
            this.saveTheme(newTheme);
        });
    },

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateToggleUI(theme);
        this.updateIconColors(theme);
        this.updateTextColors(theme);
    },
    
    updateTextColors(theme) {
        // Update text colors based on theme
        const isDark = theme === 'dark';
        
        // Update card backgrounds
        document.querySelectorAll('.bg-gray-800').forEach(el => {
            el.style.backgroundColor = `var(--background-card)`;
            el.style.transition = 'var(--transition-color)';
        });

        // Update text colors
        document.querySelectorAll('.text-gray-100, .text-gray-900').forEach(el => {
            el.style.color = `var(--text-primary)`;
            el.style.transition = 'var(--transition-color)';
        });

        document.querySelectorAll('.text-gray-300, .text-gray-700').forEach(el => {
            el.style.color = `var(--text-secondary)`;
            el.style.transition = 'var(--transition-color)';
        });

        // Update links
        document.querySelectorAll('.text-blue-400').forEach(el => {
            el.style.color = `var(--link-color)`;
            el.style.transition = 'var(--transition-color)';
        });
    },

    updateToggleUI(theme) {
        if (typeof feather !== 'undefined') {
            this.toggleIcon.innerHTML = feather.icons[theme === 'dark' ? 'moon' : 'sun'].toSvg();
        }
        this.toggleText.textContent = theme === 'dark' ? 'Dark Mode' : 'Bright Mode';
    },

    updateIconColors(theme) {
        document.querySelectorAll('svg, i[data-feather]').forEach(icon => {
            if (!icon.closest('[class*="text-blue"]')) {
                icon.style.color = `var(--text-primary)`;
            }
        });
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    },

    getSavedTheme() {
        return localStorage.getItem('theme') || 'dark';
    },

    saveTheme(theme) {
        localStorage.setItem('theme', theme);
    }
};

// Initialize theme management on page load
document.addEventListener('DOMContentLoaded', () => {
    themeManager.init();
});