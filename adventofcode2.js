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

function isPossible(game) {
    //12 red cubes, 13 green cubes, and 14 blue cubes
    let possible = true;
    game.sets.forEach(set => {
        if (set.red > 12 || set.green > 13 || set.blue > 14) {
            possible = false;
        }
    })
    return possible;
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
        const possible = isPossible(game);
        console.log('game is', game, possible)
        if (possible) {
            sum += game.gameId;
        }
    });

    rl.on('close', () => {
        console.log('sum', sum);
    })
}

main();