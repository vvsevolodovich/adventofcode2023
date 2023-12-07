const fs = require("fs");
const readline = require("readline");

class Set {
    red = 0;
    green = 0;
    blue = 0;
}

class Game {

    gameId;
    sets = [];
}

function extractBallsData(line) {
    const game = new Game();
    let split = line.split(':');
    game.gameId = parseInt(split[0].replace('Game ', ''));

    const setData = split[1].split(';');
    setData.forEach(d => {
        const set = new Set();
        const balls = d.trim().split(', '); // ["3 blue", "7 green", "10 red"]
        balls.forEach(ball => {
            const [number, color] = ball.split(' ');
            set[color] = number;
        })
        game.sets.push(set);
    })
    return game;
}

function minimalSetPower(game) {
    //12 red cubes, 13 green cubes, and 14 blue cubes
    let maxRed = 0, maxGreen = 0, maxBlue = 0;
    game.sets.forEach(set => {
        if (parseInt(set.red) > maxRed) {
            maxRed = set.red;
        }
        if (parseInt(set.blue) > maxBlue) {
            maxBlue = set.blue;
        }
        if (parseInt(set.green) > maxGreen) {
            maxGreen = set.green;
        }
    })
    console.log('min Set is ', maxRed, ' red', maxGreen, ' green', maxBlue, ' blue')
    return maxRed * maxGreen * maxBlue;
}

function main() {
    const fileStream = fs.createReadStream('input2.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let sum = 0;

    rl.on('line', (line) => {
        const game = extractBallsData(line)
        const power = minimalSetPower(game);
        console.log('game is', game, power)
        sum += power;
    });

    rl.on('close', () => {
        console.log('sum', sum);
    })
}

main();