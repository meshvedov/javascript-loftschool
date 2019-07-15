/* ДЗ 4 - работа с DOM */

/**
 * Функция должна создать элемент с тегом DIV, поместить в него текстовый узел и вернуть получившийся элемент
 *
 * @param {string} text - текст, который необходимо поместить в div
 * @return {Element}
 */
function createDivWithText(text) {
    let element = document.createElement('div');

    element.innerHTML = text;

    return element;
}

/**
 * Функция должна создать элемент с тегом A, установить значение для атрибута href и вернуть получившийся элемент
 *
 * @param {string} hrefValue - значение для атрибута href
 * @return {Element}
 */
function createAWithHref(hrefValue) {
    let element = document.createElement('a');

    element.setAttribute('href', hrefValue);

    return element;
}

/**
 * Функция должна вставлять элемент what в начало элемента where
 *
 * @param {Element} what - что вставлять
 * @param {Element} where - куда вставлять
 */
function prepend(what, where) {
    let el = where.firstChild;

    where.insertBefore(what, el);
}

/**
 * Функция должна перебрать все дочерние элементы элемента where
 * и вернуть массив, состоящий из тех дочерних элементов
 * следующим соседом которых является элемент с тегом P
 * Рекурсия - по желанию
 *
 * @param {Element} where - где искать
 * @return {Array<Element>}
 *
 * @example
 * для html '<div></div><p></p><a></a><span></span><p></p>'
 * функция должна вернуть: [div, span]
 * т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
    let els = where.getElementsByTagName('p');
    let length = els.length;
    let arr = [];

    for (let i = 0; i < length; i++) {
        let el = els[i].previousElementSibling;

        if (el == null) continue;
        arr.push(el);
    }

    return arr;
}

/**
 * Функция должна перебрать все дочерние узлы типа "элемент" внутри where
 * и вернуть массив, состоящий из текстового содержимого перебираемых элементов
 * Но похоже, что в код закралась ошибка, которую нужно найти и исправить
 *
 * @param {Element} where - где искать
 * @return {Array<string>}
 */
function findError(where) {
    var result = [];

    for (var i = 0; i < where.children.length; i++) {
        result.push(where.children[i].innerText);
    }

    return result;
}

/**
 * Функция должна перебрать все дочерние узлы элемента where
 * и удалить из него все текстовые узлы
 * Без рекурсии!
 * Будьте внимательны при удалении узлов,
 * можно получить неожиданное поведение при переборе узлов
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
 * должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {

    for (let i = 0, len = where.childNodes.length; i < len; i++) {
        let el = where.childNodes[i];

        if (el.nodeType === 3) {
            where.removeChild(el);
            len = where.childNodes.length;
        }
    }
}

/**
 * Выполнить предудыщее задание с использование рекурсии
 * то есть необходимо заходить внутрь каждого дочернего элемента
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
 * должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {
    deleteTextNodes(where);
    if (where.children.length != 0) {
        for (let i = 0; i < where.children.length; i++) {
            deleteTextNodesRecursive(where.children[i]);
        }
    }
}

/**
 * *** Со звездочкой ***
 * Необходимо собрать статистику по всем узлам внутри элемента root и вернуть ее в виде объекта
 * Статистика должна содержать:
 * - количество текстовых узлов
 * - количество элементов каждого класса
 * - количество элементов каждого тега
 * Для работы с классами рекомендуется использовать свойство classList
 * Постарайтесь не создавать глобальных переменных
 *
 * @param {Element} root - где собирать статистику
 * @return {{tags: Object<string, number>, classes: Object<string, number>, texts: number}}
 *
 * @example
 * для html <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
 * должен быть возвращен такой объект:
 * {
 *   tags: { DIV: 1, B: 2},
 *   classes: { "some-class-1": 2, "some-class-2": 1 },
 *   texts: 3
 * }
 */
function collectDOMStat(root) {
    var obj = {
        tags: {},
        classes: {},
        texts: 0
    };

    function collect_(root, obj) {
        if (root.nodeType === 1) {
            obj.tags[root.nodeName] = obj.tags[root.nodeName] === undefined ? 1 : ++(obj.tags[root.nodeName]);
            if (root.classList.length > 0) {
                root.classList.forEach(el => obj.classes[el] = obj.classes[el] === undefined ? 1 : ++(obj.classes[el]));
            }
        }

        let nodes = root.childNodes;

        for (let i = 0, len = nodes.length == undefined ? 1 : nodes.length; i < len; i++) {
            let node = nodes[i];

            if (node.nodeType == 3) {
                ++obj.texts;
            } else if (node.nodeType == 1) {
                collect_(node, obj);
            }
        }

        return obj;
    }

    return collect_(root.firstChild, obj);
}

/**
 * *** Со звездочкой ***
 * Функция должна отслеживать добавление и удаление элементов внутри элемента where
 * Как только в where добавляются или удаляются элемента,
 * необходимо сообщать об этом при помощи вызова функции fn со специальным аргументом
 * В качестве аргумента должен быть передан объек с двумя свойствами:
 * - type: типа события (insert или remove)
 * - nodes: массив из удаленных или добавленных элементов (а зависимости от события)
 * Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов
 * Рекомендуется использовать MutationObserver
 *
 * @param {Element} where - где отслеживать
 * @param {function(info: {type: string, nodes: Array<Element>})} fn - функция, которую необходимо вызвать
 *
 * @example
 * если в where или в одного из его детей добавляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'insert',
 *   nodes: [div]
 * }
 *
 * ------
 *
 * если из where или из одного из его детей удаляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'remove',
 *   nodes: [div]
 * }
 */
function observeChildNodes(where, fn) {

    let observer = new MutationObserver(mutations => {
        debugger;
        let obj = {
            type: '',
            nodes: []
        };

        for (let i = 0, len = mutations.length; i < len; i++) {
            let mutation = mutations[i];

            if (mutation.addedNodes.length > 0) {
                obj.type = 'insert';
                mutation.addedNodes.forEach(node => obj.nodes.push(node));
            } else if (mutation.removedNodes.length > 0) {
                obj.type = 'remove';
                mutation.removedNodes.forEach(node => obj.nodes.push(node));
            }
            fn(obj);
        }
    });

    observer.observe(where, {
        childList: true,
        subtree: true,
        characterData: true
    });
}

export {
    createDivWithText,
    createAWithHref,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};
