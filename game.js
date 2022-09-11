const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');


let canvasSize;
let elementSize;

const playerPosition = {
    x:undefined,
    y:undefined
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize(){

    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8; //Agarramos la medida chica
    } else {
        canvasSize = window.innerHeight * 0.8;
    }
    canvas.setAttribute('width',  canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = canvasSize/10;

    startGame();
}

function startGame(){
    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    game.font = String(elementSize*0.9)+'px verdana';
    game.textAlign = 'left';

    game.clearRect(0,0,canvasSize, canvasSize);
    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * colI;
            const posY = elementSize * (rowI +1) * 0.98;

            if (col == 'O'){
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            }
            game.fillText(emoji, posX, posY);

        });
    });

    movePlayer();

    // game.fillRect(0,0,100,100);
    // game.clearRect(100, 100, -50, -50);
    // game.clearRect(100, 100, -50, -50);
    // game.clearRect(0, 0, 50, 50);
}

function movePlayer(){
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

function moveByKeys(event){
    if(event.key == 'ArrowLeft') moveLeft();
    else if(event.key == 'ArrowRight')moveRight();
    else if(event.key == 'ArrowUp')moveUp();
    else if(event.key == 'ArrowDown')moveDown();
}

function moveUp(){
    console.log('Arriba');
    playerPosition.y -= elementSize*0.98;
    startGame();
}

function moveDown(){
    console.log('Abajo');
    playerPosition.y += elementSize*0.98;
    startGame();
}

function moveLeft(){
    console.log('Izquierda');
    playerPosition.x -= elementSize;
    startGame();
}

function moveRight(){
    console.log('Derecha');
    playerPosition.x += elementSize;
    startGame();
}
