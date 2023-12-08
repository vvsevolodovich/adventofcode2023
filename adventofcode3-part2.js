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


    first = `${(engineData[y-1] || '')[x-1] || '.'}${(engineData[y-1]|| '')[x] || '.'}${(engineData[y-1] || '')[x+1] || '.'}`;
    second = `${engineData[y][x-1] || ''}${engineData[y][x]}${(engineData[y] || '.')[x+1] || '.'}`;
    third = `${(engineData[y+1]|| '')[x-1] || '.'}${(engineData[y+1]|| '')[x] || '.'}${(engineData[y+1] || '')[x+1] || '.'}`;


    const c = '*';
    let firstIndex = first.indexOf(c);
    let secondIndex = second.indexOf(c);
    let thirdIndex = third.indexOf(c);
    if (firstIndex >= 0) {
        return {
            found: true,
            coords:  { x: x + firstIndex - 1, y: y - 1 }
        }
    }
    if (secondIndex >= 0) {
        return {
            found: true,
            coords:  { x: x + secondIndex - 1, y: y }
        }
    }
    if (thirdIndex >= 0) {
        return {
            found: true,
            coords:  { x: x + thirdIndex - 1, y: y + 1 }
        }
    }
    //console.log('checking ', x, y, ' found: ', found)
    return {
        found: false
    };
}

function iterate() {
    const firstLine = engineData[0];
    let sum = 0;

    const starGears = {}


    for (let row = 0; row < engineData.length; row++) {
        let currentNumberArray = '';
        let characterFoundAround = false;
        let findResult = { found: false };
        for (let column = 0; column < firstLine.length; column++) {
            let currentChar = engineData[row][column];
            let number = isNumber(currentChar);
            if (number) {
                currentNumberArray += currentChar;
                let currentFind = findCharsAround(column, row);
                if (!findResult.found && currentFind.found) {
                    findResult = currentFind;
                }
            }

            if (!number || column === firstLine.length - 1) {
                if (currentNumberArray.length > 0 && findResult.found) {
                    sum += parseInt(currentNumberArray);
                    console.log('number detected', currentNumberArray)
                    if (!starGears[`${findResult.coords.x}-${findResult.coords.y}`]) {
                        starGears[`${findResult.coords.x}-${findResult.coords.y}`] = [];
                    }
                    starGears[`${findResult.coords.x}-${findResult.coords.y}`].push(currentNumberArray);
                } else if (currentNumberArray.length > 0) {
                    console.log('number omitted', currentNumberArray, ' at line', row)
                }
                findResult = { found: false };
                currentNumberArray = '';
                characterFoundAround = false;
            }
        }
        console.log('starGears', starGears);
    }
    return starGears;
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
        const gears = iterate();
        const doubleGearsKeys = Object.keys(gears).filter(s => gears[s].length === 2);
        let sum = 0;
        doubleGearsKeys.forEach(key => {
            let number = gears[key][0] * gears[key][1];
            sum += number;
        })
        console.log('sum', sum);
    })
}

main();