/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
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
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    let docCookies = getCookies();
    let tempCookies = filterCookies(docCookies);

    updateTable(tempCookies);
});

function filterCookies(docCookies) {
    const search = filterNameInput.value;

    if (search) {
        const regexp = new RegExp(search, 'i');
        let tempCookies = {};

        Object.entries(docCookies).forEach( entry => {
            if (entry[0].match(regexp) || entry[1].match(regexp)) {
                tempCookies[entry[0]] = docCookies[entry[0]];
            }
        });

        return tempCookies;
    }

    return docCookies;
}

function getCookies() {
    let docCookies = {};

    document.cookie.split('; ').forEach(cookie => {
        let [name, value] = cookie.split('=');

        docCookies[name] = value;
    });

    return docCookies;
}

addButton.addEventListener('click', () => {
    let cookie = {
        name: addNameInput.value,
        value: addValueInput.value
    };

    if (document.cookie === '') {
        cookies = {};
    }
    document.cookie = `${cookie.name}=${cookie.value}`;
    let docCookies = getCookies();
    let tempCookies = filterCookies(docCookies);

    updateTable(tempCookies);
});

let cookies = {};

function updateTable(cookies) {
    const fragment = document.createDocumentFragment();

    for (let cookie in cookies) {
        fragment.appendChild(
            addRow({
                name: cookie,
                value: cookies[cookie] })
        )
    }
    if (listTable) {
        listTable.innerHTML = '';
    }
    listTable.appendChild(fragment);
}

function addRow(cookie) {
    const tableRow = `
        <td>${cookie.name}</td>
        <td>${cookie.value}</td>
        <button>Удалить</button
    `;
    const element = document.createElement('tr');
    
    element.innerHTML = tableRow;

    return element;
}

listTable.addEventListener('click', e => {
    if (e.target && e.target.tagName === 'BUTTON') {
        const tr = e.target.parentNode;
        const cookieName = tr.cells[0].textContent;

        deleteCookie(cookieName);
        // delete cookies[cookieName];
        tr.remove();
    }
});

function deleteCookie(name) {
    let cookies = document.cookie.split('; ');

    cookies.forEach(el => {
        if (el.search(name) !== -1) {
            el += '; max-age=0';

            return document.cookie = el;
        }
    });
}