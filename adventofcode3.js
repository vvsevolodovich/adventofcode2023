const fs = require("fs");
const readline = require("readline");

const engineData = [];

function add(line) {
    engineData.push(line);
}

function isNumber(s) {
    return !isNaN(parseInt(s));
}

function findCharsAround(x, y) {
    let first, second, third;

    if (x === 0 && y === engineData.length - 1) {
        // last row
        first = `${engineData[x][y - 1]}${engineData[x + 1][y - 1]}`;
        second = `${engineData[x][y]}${engineData[x + 1][y]}`
        third = ``;
    } else if (x === 0 && y === 0) {
        // first item
        first = ``;
        second = `${engineData[x][y]}${engineData[x + 1][y]}`
        third = `${engineData[x+1][y]}${engineData[x + 1][y + 1]}`;
    } else if (x === 0) {
        // all the first column
        first = `${engineData[x][y-1]}${engineData[x+1][y-1]}`;
        second = `${engineData[x][y]}${engineData[x + 1][y]}`
        third = `${engineData[x][y + 1]}${engineData[x + 1][y + 1]}`;
    } else {
        first = `${engineData[x-1][y-1]}${engineData[x][y-1]}${(engineData[x+1] || '')[y-1]}`;
        second = `${engineData[x-1][y]}${engineData[x][y]}${(engineData[x+1] || '')[y]}`;
        third = `${engineData[x-1][y+1]}${engineData[x][y+1]}${(engineData[x+1] || '')[y+1]}`;
    }


    let found = false;
    const chars = ['*','/','%','=','&','#','@', '-', '$', '+'];
    chars.forEach(c => {
        if (first.indexOf(c) >= 0 || second.indexOf(c) >= 0 || third.indexOf(c) >= 0) {
            found = true;
            //console.log('found character ', c)
        }
    })
    //console.log('checking ', x, y, ' found: ', found)
    return found;
}

function iterate() {
    const firstLine = engineData[0];
    let sum = 0;
    for (let row = 0; row < engineData.length; row++) {
        let currentNumberArray = '';
        let characterFoundAround = false;
        for (let column = 0; column < firstLine.length; column++) {
            let currentChar = engineData[row][column];
            let number = isNumber(currentChar);
            if (number) {
                currentNumberArray += currentChar;
                if (findCharsAround(row, column)) {
                    characterFoundAround = true;
                }
            }

            if (!number || column === firstLine.length - 1) {
                if (currentNumberArray.length > 0 && characterFoundAround) {
                    sum += parseInt(currentNumberArray);
                    console.log('number detected', currentNumberArray)
                } else if (currentNumberArray.length > 0) {
                    console.log('number omitted', currentNumberArray, ' at line', row)
                }
                currentNumberArray = '';
                characterFoundAround = false;
            }
        }
    }
    return sum;
}

function main() {
    const fileStream = fs.createReadStream('input3.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let sum = 0;

    rl.on('line', (line) => {
        add(line);
    });

    rl.on('close', () => {
        console.log('data', engineData);
        console.log('sum', iterate());
    })
}

main();