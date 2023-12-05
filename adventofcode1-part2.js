const fs = require('fs');
const readline = require('readline');

const items = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9
}
let numbers = [];

const findAllNumbers = (line) => {
    let startIndex = 0;
    Object.keys(items).forEach(_ => {
            startIndex = findNumbers(line, startIndex)
        }
    );
    return numbers;
}

const findNumbers = (line, startIndex) => {
    let minIndex = line.length;
    let minNumber;

    Object.keys(items).forEach(s => {
            let indexOf = line.indexOf(s, startIndex);
            if (indexOf >= 0 && indexOf < minIndex) {
                minIndex = indexOf;
                minNumber = items[s];
            }
        }
    );
    if (minNumber) {
        numbers.push(minNumber)
    }

    return minIndex + 1;
}

const getCalibration = (line) => {
    const numbers = line;
    const first = numbers[0];
    const second = numbers[numbers.length-1];
    return parseInt(`${first}${second}`);
}

function main() {
    const fileStream = fs.createReadStream('input1.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let sum = 0;

    rl.on('line', (line) => {
        const transformed = findAllNumbers(line)
        let calibration = getCalibration(transformed);
        sum += calibration;
        numbers = [];
    });

    rl.on('close', () => {
        console.log('sum', sum);
    })
}

main();