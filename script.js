/**
 * Счётчик нажатий кнопки
 * Улучшенная версия с лучшей структурой и обработкой ошибок
 */

class ClickCounter {
    constructor() {
        this.count = 0;
        this.buttonElement = document.getElementById('clickButton');
        this.displayElement = document.getElementById('mainDiv');
        
        if (!this.buttonElement || !this.displayElement) {
            console.error('Ошибка: не найдены необходимые элементы DOM');
            return;
        }
        
        this.init();
    }

    /**
     * Инициализация обработчика события
     */
    init() {
        this.buttonElement.addEventListener('click', () => this.handleClick());
        // Загружаем сохранённое значение из localStorage
        this.loadCount();
    }

    /**
     * Обработка клика по кнопке
     */
    handleClick() {
        this.count++;
        this.updateDisplay();
        this.saveCount();
    }

    /**
     * Обновление отображения счётчика
     */
    updateDisplay() {
        const text = this.getDisplayText();
        this.displayElement.textContent = text;
    }

    /**
     * Формирование текста для отображения
     */
    getDisplayText() {
        const clicks = this.count;
        
        // Правильное склонение слова "нажатие"
        let word = 'нажатий';
        if (clicks % 10 === 1 && clicks % 100 !== 11) {
            word = 'нажатие';
        } else if (clicks % 10 >= 2 && clicks % 10 <= 4 && (clicks % 100 < 10 || clicks % 100 >= 20)) {
            word = 'нажатия';
        }
        
        return `Кнопка нажата ${clicks} ${word}`;
    }

    /**
     * Сохранение счёта в localStorage
     */
    saveCount() {
        try {
            localStorage.setItem('clickCount', this.count.toString());
        } catch (error) {
            console.warn('Ошибка при сохранении данных в localStorage:', error);
        }
    }

    /**
     * Загрузка счёта из localStorage
     */
    loadCount() {
        try {
            const saved = localStorage.getItem('clickCount');
            if (saved !== null) {
                this.count = parseInt(saved, 10);
                this.updateDisplay();
            }
        } catch (error) {
            console.warn('Ошибка при загрузке данных из localStorage:', error);
        }
    }
}

// Инициализация приложения при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ClickCounter();
    });
} else {
    new ClickCounter();
}
