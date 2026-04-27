document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const menu = document.querySelector('.header__menu');
    const body = document.body;

    // Функция для плавного скролла к секции
    function scrollToSection(targetElement) {
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Функция для закрытия мобильного меню
    function closeMenu() {
        burger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('lock');
    }

    // Обработчик клика по бургеру
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        body.classList.toggle('lock');
    });

    // Обработчик для ВСЕХ ссылок с якорями (начинаются с #)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Закрываем мобильное меню, если оно открыто
            closeMenu();
            
            // Получаем id секции из href
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Плавный скролл к секции
            scrollToSection(targetSection);
        });
    });
});


// FAQ аккордеон
document.querySelectorAll('.faq__question').forEach(button => {
    button.addEventListener('click', () => {
        const currentItem = button.parentElement;
        const isOpen = currentItem.classList.contains('active');

        // Закрываем все открытые элементы
        document.querySelectorAll('.faq__item').forEach(item => {
            item.classList.remove('active');
        });

        // Если нажатый был закрыт — открываем его
        if (!isOpen) {
            currentItem.classList.add('active');
        }
    });
});