document.addEventListener('DOMContentLoaded', () => {
    // ========== ДАННЫЕ ВСЕХ МАШИН ==========
    const carsData = {
        porsche: {
            name: 'PORSCHE',
            model: '911 GT3',
            mainImage: 'images/porshBig.jpg',
            thumbnails: [
                'images/porsh_one.jpg',
                'images/porsh__two.jpg',
                'images/porsh__tree.jpg',
                'images/porsh__four.jpg'
            ],
            specs: {
                lapTime: '1.48 минут',
                topSpeed: '306 км',
                acceleration: '3.3 секунд',
                power: '420 л/с'
            }
        },
        bmw: {
            name: 'BMW',
            model: 'M4',
            mainImage: 'images/M4Big.jpg',
            thumbnails: [
                'images/m4__1.jpg',
                'images/m4__2.jpg',
                'images/m4__3.jpg',
                'images/m4__4.jpg'
            ],
            specs: {
                lapTime: '1.52 минут',
                topSpeed: '280 км',
                acceleration: '3.9 секунд',
                power: '510 л/с'
            }
        },
        gtr: {
            name: 'NISSAN',
            model: 'GTR-35',
            mainImage: 'images/gtrBig.jpg',
            thumbnails: [
                'images/gtr__one.jpg',
                'images/gtr__2.jpg',
                'images/gtr__3.jpg',
                'images/gtr__4.jpg'
            ],
            specs: {
                lapTime: '1.50 минут',
                topSpeed: '315 км',
                acceleration: '2.8 секунд',
                power: '565 л/с'
            }
        },
        audi: {
            name: 'AUDI',
            model: 'R8',
            mainImage: 'images/R8Big.jpg',
            thumbnails: [
                'images/R8__1.jpg',
                'images/R8__2.jpg',
                'images/R8__3.jpg',
                'images/R8__4.jpg'
            ],
            specs: {
                lapTime: '1.49 минут',
                topSpeed: '330 км',
                acceleration: '3.1 секунд',
                power: '610 л/с'
            }
        }
    };

    // ========== DOM-ЭЛЕМЕНТЫ ==========
    const carCards = document.querySelectorAll('.sportCar__card');
    const mainImage = document.querySelector('.sportCar__mainImage img');
    const thumbnailsContainer = document.querySelector('.sportCar__thumbnails');
    const carName = document.querySelector('.sportCar__name');
    const specElements = {
        lapTime: document.querySelector('.sportCar__lapTime'),
        topSpeed: document.querySelector('.sportCar__topSpeed'),
        acceleration: document.querySelector('.sportCar__acceleration'),
        power: document.querySelector('.sportCar__power')
    };

    if (!carCards.length || !mainImage || !thumbnailsContainer || !carName) {
        console.warn('Не все элементы найдены');
        return;
    }

    // Текущая выбранная машина
    let currentCar = carsData.porsche;

    // ========== ФУНКЦИИ ==========
    
    // Смена главного изображения при клике на миниатюру
    function switchMainImage(clickedThumbnail) {
        const tempSrc = mainImage.src;
        const tempAlt = mainImage.alt;

        mainImage.src = clickedThumbnail.src;
        mainImage.alt = clickedThumbnail.alt;

        const newThumbnail = document.createElement('img');
        newThumbnail.src = tempSrc;
        newThumbnail.alt = tempAlt;
        newThumbnail.addEventListener('click', function() {
            switchMainImage(this);
        });

        clickedThumbnail.parentNode.replaceChild(newThumbnail, clickedThumbnail);
    }

    // Построение галереи заново
    function buildGallery(carData) {
        mainImage.src = carData.mainImage;
        mainImage.alt = `${carData.name} ${carData.model}`;

        thumbnailsContainer.innerHTML = '';
        carData.thumbnails.forEach((thumbSrc, index) => {
            const img = document.createElement('img');
            img.src = thumbSrc;
            img.alt = `${carData.name} ${carData.model} фото ${index + 1}`;
            img.addEventListener('click', function() {
                switchMainImage(this);
            });
            thumbnailsContainer.appendChild(img);
        });
    }

    // Обновление характеристик
    function updateSpecs(carData) {
        carName.innerHTML = `${carData.name} <span>${carData.model}</span>`;

        if (specElements.lapTime) {
            specElements.lapTime.innerHTML = `${carData.specs.lapTime} <span>Время круга на MRW</span>`;
        }
        if (specElements.topSpeed) {
            specElements.topSpeed.innerHTML = `${carData.specs.topSpeed} <span>Максимальная скорость</span>`;
        }
        if (specElements.acceleration) {
            specElements.acceleration.innerHTML = `${carData.specs.acceleration} <span>Разгон 0-100 км/ч</span>`;
        }
        if (specElements.power) {
            specElements.power.innerHTML = `${carData.specs.power} <span>Мощность двигателя</span>`;
        }
    }

    // Подсветка активной карточки
    function setActiveCard(activeCard) {
        carCards.forEach(card => {
            card.style.opacity = '0.6';
            card.style.transition = 'opacity 0.3s ease';
        });
        activeCard.style.opacity = '1';
    }

    // Переключение на другую машину
    function switchCar(carKey) {
        const carData = carsData[carKey];
        if (!carData) return;

        currentCar = carData;
        buildGallery(carData);
        updateSpecs(carData);
    }

    // ========== ОБРАБОТЧИКИ ==========
    
    // Клик по карточке машины
    carCards.forEach(card => {
        card.addEventListener('click', function() {
            const blockText = this.querySelector('.sportCar__block-text').textContent.trim();

            let carKey;
            switch(blockText) {
                case '911 GT3':
                    carKey = 'porsche';
                    break;
                case 'BMW M4':
                    carKey = 'bmw';
                    break;
                case 'GTR-35':
                    carKey = 'gtr';
                    break;
                case 'AUDI R8':
                    carKey = 'audi';
                    break;
                default:
                    console.warn('Неизвестная машина:', blockText);
                    return;
            }

            switchCar(carKey);
            setActiveCard(this);
        });
    });

    // Клик по миниатюрам (начальные)
    document.querySelectorAll('.sportCar__thumbnails img').forEach(thumb => {
        thumb.addEventListener('click', function() {
            switchMainImage(this);
        });
    });

    // ========== ИНИЦИАЛИЗАЦИЯ ==========
    setActiveCard(carCards[0]);
});