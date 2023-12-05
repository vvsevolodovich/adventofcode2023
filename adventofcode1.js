const fs = require('fs');
const readline = require('readline');

const getCalibration = (line) => {
    const numbers = line.replace(/\D/g, '');
    const first = numbers[0];
    const second = numbers[numbers.length-1];
    return parseInt(first+second);

}
function main() {
    const fileStream = fs.createReadStream('input1.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let sum = 0;

    rl.on('line', (line) => {
        console.log(`Line from file: ${getCalibration(line)}`);
        sum += getCalibration(line);
    });

    rl.on('close', () => {
        console.log('sum', sum);
    })
}

main();