/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
import strings from './translation.js';

const blue = document.getElementById('blue'),
green = document.getElementById('green'),
red = document.getElementById('red'),
yellow = document.getElementById('yellow'),
scoreDisplay = document.getElementById('score'),
levelDisplay = document.getElementById('level'),
soundOn = document.getElementById('sound-on'),
soundOff = document.getElementById('sound-off');

const auNewGame = new Audio(`./mp3/newgame.mp3`),
auScore = new Audio(`./mp3/scored.mp3`),
auLevelUp = new Audio(`./mp3/levelup.mp3`);

/** @param {number} fileNumber */
const auLens = fileNumber => new Audio(`./mp3/${fileNumber}.mp3`);

/**
 * Chooses the lens.
 * @param {number} colorNumber 
 * @returns {HTMLDivElement}
 */
const colorElement = colorNumber => colorNumber === 0 ? blue
    : colorNumber === 1 ? green
        : colorNumber === 2 ? red
            : yellow;

const order = [],
playerOrder = [];

let score = 0,
bonus = 0,
level = 0,
mute = false;


/** Creates a random sequence. */
const shuffle = () => {
    const colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    playerOrder.length = 0;
    for (const e in order) {            
        lightUp(order[e], +e + 1);
    }
};


/**
 * Lights up the color lens and plays the audio.
 * @param {number} colorNumber 
 * @param {number} turns 
 */
const lightUp = (colorNumber, turns) => {
    setTimeout(() => {
        !mute && auLens(colorNumber).play();
        colorElement(colorNumber).classList.add(`selected${colorNumber}`);
        
        setTimeout(() => {
            colorElement(colorNumber).classList.remove(`selected${colorNumber}`);
        }, 500);
    }, 800 * turns);
};


/**
 * Creates the player sequence.
 * @param {number} colorNumber 
 */
const click = colorNumber => {
    playerOrder[playerOrder.length] = colorNumber;
    colorElement(colorNumber).classList.add(`selected${colorNumber}`);
    !mute && auLens(colorNumber).play();
    setTimeout(() => {
        colorElement(colorNumber).classList.remove(`selected${colorNumber}`);
        checker();
    }, 250);
}


/** Checks if the sequence entered by the player is right or not. */
const checker = () => {
    playerOrder.forEach((e, i) => {
        if (e !== order[i]) {
            gameOver();
        }
    });
    
    if (playerOrder.length === order.length && order.length > 0 ) {
        score += 100;

        if (order.length === 8 || order.length === 14 ||
            order.length === 20 || order.length === 31) {
            !mute && auLevelUp.play();
            
            level++;
            bonus = order.length * 100;
            score += bonus;

            levelDisplay.classList.add('blink');
            levelDisplay.innerHTML = `${strings.lv}.${level}`;
            setTimeout(() => {
                levelDisplay.classList.remove('blink');
            }, 600);

        } else {
            !mute && auScore.play();
        }

        scoreDisplay.innerHTML = `${strings.score}: ${score}`;
        scoreDisplay.classList.add('blink');
        setTimeout(() => {
            scoreDisplay.classList.remove('blink');
            shuffle();
        }, 600);
    }
};


const gameOverScreen = document.getElementById('game-over'),
gameOverTitle = document.getElementById('game-over-title'),
gameOverScore = document.getElementById('game-over-score'),
levelBonus = document.getElementById('level-bonus'),
totalScore = document.getElementById('total-score'),
newGame = document.getElementById('restart-new-game');


/** Displays the game over screen. */
const gameOver = () => {

    gameOverScreen.style.display = 'flex';

    setTimeout(() => {
        gameOverScreen.style.cssText = `
        display: flex;
        transition: ease all 1s;
        opacity: 1;`;
        gameOverScore.innerHTML = `${strings.score}: ${score}`;
        levelBonus.innerHTML = `${strings.levelBonus}: ${bonus}`;
        totalScore.innerHTML = `${strings.totalScore}: ${score + bonus}`;
        score = 0;

        newGame.onclick = () => {
            !mute && auNewGame.play();
            newGame.classList.add('blink');
            setTimeout(() => {
                newGame.classList.remove('blink');
                gameOverScreen.style.display = 'none';
                shuffle();
            }, 600);
        };

    });
    scoreDisplay.innerHTML = `${strings.score}: 0`;
    order.length = 0;
    playerOrder.length = 0;
};


const play = document.getElementById('play'),
playNewGame = document.getElementById('play-new-game');

playNewGame.onclick = () => {
    !mute && auNewGame.play();
    playNewGame.classList.add('blink');
    setTimeout(() => {
        playNewGame.classList.remove('blink');
        play.style.display = 'none';
        shuffle();
    }, 600);
};


blue.onclick = () => click(0);
green.onclick = () => click(1);
red.onclick = () => click(2);
yellow.onclick = () => click(3);

soundOn.onclick = () => {
    mute = true;
    soundOn.style.display = 'none';
    soundOff.style.display = 'block';
};

soundOff.onclick = () => {
    mute = false;
    soundOn.style.display = 'block';
    soundOff.style.display = 'none';
};


playNewGame.innerHTML = strings.newGame;
gameOverTitle.innerHTML = strings.gameOver;
scoreDisplay.innerHTML = `${strings.score}: 0`;
levelDisplay.innerHTML = `${strings.lv}.0`;
newGame.innerHTML = strings.newGame;