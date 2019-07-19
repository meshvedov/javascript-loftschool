/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve();
        }, seconds * 1000);
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    return new Promise((resolve) => {
        let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.addEventListener('load', () => {
            let arr = xhr.response.sort((o1, o2) => o1.name > o2.name ? 1 : -1);

            resolve(arr);
        });
        xhr.send();
    });
}

export {
    delayPromise,
    loadAndSortTowns
};
