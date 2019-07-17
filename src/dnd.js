/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    let el = document.createElement('div');

    el.className = 'draggable-div';
    el.style.backgroundColor = 'red';
    el.style.position = 'absolute';
    el.style.top = Math.floor(Math.random() * 100) + '%';
    el.style.left = Math.floor(Math.random() * 100) + '%';
    el.style.width = Math.floor(Math.random() * 100) + 100 + 'px';
    el.style.height = Math.floor(Math.random() * 100) + 100 + 'px';

    return el;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    let x = 0,
        y = 0,
        isMove = false;
    let currentDiv = target.getBoundingClientRect();

    let moveHandler = e => {
        debugger;
        target.style.left = (e.clientX - x) + currentDiv.left + 'px';
        target.style.top = (e.clientY - y) + currentDiv.top + 'px';
    };

    target.addEventListener('mousedown', e => {
        debugger;
        x = e.clientX;
        y = e.clientY;
        isMove = true;

        target.addEventListener('mousemove', moveHandler);
    });

    target.addEventListener('mouseup', e => {
        debugger;
        currentDiv = target.getBoundingClientRect();
        x = 0;
        y = 0;
        target.removeEventListener('mousemove', moveHandler);
    });

    target.addEventListener('mouseout', e => {
        currentDiv = target.getBoundingClientRect();
        x = 0;
        y = 0;
        target.removeEventListener('mousemove', moveHandler);
    })
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
