

let setTheme;

(() => {
    'use strict'

    const storedTheme = localStorage.getItem('theme')

    const getPreferredTheme = () => {
        if (storedTheme) {
            return storedTheme
        }

        return window.matchMedia('(prefers-color-scheme: white)').matches ? 'light' : 'dark'
    }

    setTheme = function (theme) {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }

    setTheme(getPreferredTheme());

    const updateButtonText = theme => {
        const btn = document.querySelector('#theme-switch')
        btn.innerHTML = theme === 'light' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>'
    }

    updateButtonText(getPreferredTheme());

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (storedTheme !== 'light' || storedTheme !== 'dark') {
            setTheme(getPreferredTheme());
        }
    });

    window.addEventListener('DOMContentLoaded', () => {
        document.querySelector('#theme-switch').addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            setTheme(newTheme);
            updateButtonText(newTheme);
        });
    });
})();


