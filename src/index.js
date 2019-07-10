/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    let arrLength = array.length;

    let newArr = [];

    for (let i = 0; i < arrLength; i++) {
        newArr.push(fn(array[i], i, array));
    }

    return newArr;
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    let arrLength = array.length;
    let newArr = [];

    for (let i = 0; i < arrLength; i++) {
        newArr.push(fn(array[i], i, array));
    }

    return newArr;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    let i = 0;
    let arrayLength = array.length;

    if (initial == undefined) {
        initial = array[0];
        i = 1;
    }

    for (; i < arrayLength; i++) {
        initial = fn(initial, array[i], i, array);
    }

    return initial;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    let arr = [];

    for (let prop in obj) {
        arr.push(prop);
    }

    return arr;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    let arr = [];

    for (let prop in obj) {
        arr.push(prop.toUpperCase());
    }

    return arr;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
    let arrayLength = array.length;
    let newArr = [];

    if (from == undefined && to == undefined) {
        from = 0;
        to = arrayLength;
    }

    if (to == undefined || to >= arrayLength) {
        to = arrayLength;
    }

    if ( from === to || from > Math.abs(to) || from >= arrayLength) {
        return [];
    }

    if (from < 0) {
        from = 0;
    }

    if (to < 0) {
        to = to + arrayLength;
    } else if (to < 0 && Math.abs(to) > arrayLength) {
        return [];
    }

    for (let i = from; i < to; i++) {
        newArr.push(array[i]);
    }

    return newArr;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {
        get(target, prop) {
            return target[prop] ** 2;
        }
    });

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
