// Дожидаемся загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // Шаг 1: Создаём Vue приложение
    // ==========================================
    const { createApp } = Vue;  // Берём функцию createApp из Vue

    createApp({
        // ==========================================
        // Шаг 2: Данные приложения (реактивные переменные)
        // ==========================================
        data() {
            return {
                // Выбранные автомобили (сейчас пустые)
                car1: null,  // null значит "ничего не выбрано"
                car2: null,
                
                // Список всех доступных автомобилей
                cars: [
                    {
                        id: 'porsche',
                        name: 'PORSCHE',
                        model: '911 GT3',
                        image: 'images/911.png',
                        // Характеристики для сравнения
                        horsepower: 420,     // л.с.
                        topSpeed: 306,       // км/ч
                        acceleration: 3.5,   // секунды 0-100
                        weight: 1435,        // кг
                        price: 450           // € за заезд
                    },
                    {
                        id: 'bmw',
                        name: 'BMW',
                        model: 'M4',
                        image: 'images/bmw-m4.png',
                        horsepower: 510,
                        topSpeed: 280,
                        acceleration: 3.9,
                        weight: 1725,
                        price: 380
                    },
                    {
                        id: 'gtr',
                        name: 'NISSAN',
                        model: 'GTR-35',
                        image: 'images/nissan-gtr.png',
                        horsepower: 565,
                        topSpeed: 315,
                        acceleration: 2.8,
                        weight: 1740,
                        price: 520
                    },
                    {
                        id: 'audi',
                        name: 'AUDI',
                        model: 'R8',
                        image: 'images/r8.png',
                        horsepower: 610,
                        topSpeed: 330,
                        acceleration: 3.1,
                        weight: 1595,
                        price: 550
                    }
                ],
                
                // Какие характеристики сравниваем
                specs: [
                    { key: 'horsepower', label: 'МОЩНОСТЬ', unit: ' л.с.', better: 'higher' },
                    { key: 'topSpeed', label: 'МАКС. СКОРОСТЬ', unit: ' км/ч', better: 'higher' },
                    { key: 'acceleration', label: 'РАЗГОН 0-100', unit: ' сек', better: 'lower' },
                    { key: 'weight', label: 'ВЕС', unit: ' кг', better: 'lower' },
                    { key: 'price', label: 'ЦЕНА ЗАЕЗДА', unit: ' €', better: 'lower' }
                ]
            };
        },
        
        // ==========================================
        // Шаг 3: Методы (функции)
        // ==========================================
        methods: {
            // Получить значение характеристики
            getSpecValue(car, key) {
                return car ? car[key] : '-';
            },
            
            // Рассчитать ширину полоски в процентах
            getBarPercentage(spec, side) {
                // Если нет обоих авто — не показываем полоску
                if (!this.car1 || !this.car2) return 0;
                
                const val1 = this.car1[spec.key];  // Значение первого авто
                const val2 = this.car2[spec.key];  // Значение второго авто
                const maxVal = Math.max(val1, val2);  // Максимальное значение
                
                if (maxVal === 0) return 0;  // Защита от деления на ноль
                
                if (side === 'left') {
                    return (val1 / maxVal) * 100;  // Процент для левого
                } else {
                    return (val2 / maxVal) * 100;  // Процент для правого
                }
            },
            
            // Проверка: первый авто лучше по этой характеристике?
            isFirstWinner(spec) {
                if (!this.car1 || !this.car2) return false;
                
                const val1 = this.car1[spec.key];
                const val2 = this.car2[spec.key];
                
                if (spec.better === 'higher') {
                    return val1 > val2;  // Чем больше, тем лучше
                } else {
                    return val1 < val2;  // Чем меньше, тем лучше
                }
            },
            
            // Проверка: второй авто лучше по этой характеристике?
            isSecondWinner(spec) {
                if (!this.car1 || !this.car2) return false;
                
                const val1 = this.car1[spec.key];
                const val2 = this.car2[spec.key];
                
                if (spec.better === 'higher') {
                    return val2 > val1;
                } else {
                    return val2 < val1;
                }
            }
        }
    }).mount('#compare-app');  // Монтируем приложение к элементу с id="compare-app"
    
});