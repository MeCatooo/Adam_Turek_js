const asyncAdd = async (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return Promise.reject('Argumenty muszą mieć typ number!')
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 100)
    })
}

function generator(number) {
    let results = [];
    for (let i = 0; i < number; i++) {
        results.push(Math.round(Math.random() * (100 - 0)));
    }
    return results;
}

async function start(numbers) {
    let result = 0;
    for (let i = 0; i < numbers.length; i++) {
        result = await asyncAdd(result, numbers[i]);
    }
    return result;
}

async function optimalize(numbers) {
    let lists = [];
    let promises = [];
    for (let i = 0; i < numbers.length; i += 10) {
        lists.push(numbers.slice(i, i + 10));
    }
    for (let i = 0; i < lists.length; i++) {
        promises.push(start(lists[i]));
    }
    return start(await Promise.all(promises));
}



performance.mark('start')
const wyniki = await optimalize(generator(95))
performance.mark('end')
console.log(wyniki)
const measure = performance.measure('start to end', 'start', 'end')
console.dir(measure)
