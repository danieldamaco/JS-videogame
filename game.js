const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const spanLives = document.querySelector('#lives');


let canvasSize;
let elementSize;
let bombPosition = [];
let flag = true;
let level = 0; 
let lives = 3; 


const playerPosition = {
    x:undefined,
    y:undefined
};

const giftPosition = {
    x: undefined,
    y: undefined
};

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
    const map = maps[level];

    if (!map){
        gameWin();
        return;
    }

    showLives();

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    game.font = String(elementSize*0.9)+'px verdana';
    game.textAlign = 'end';

    game.clearRect(0,0,canvasSize, canvasSize);
    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI+1) *0.98;
            const posY = elementSize * (rowI +1) * 0.98;

            if (col == 'O'){
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({playerPosition});
                }
            } else if (col == 'I'){
                giftPosition.x = posX
                giftPosition.y = posY
            } else if (col == 'X' && flag){
                bombPosition.push({
                    x: posX, 
                    y: posY})
            }

            game.fillText(emoji, posX, posY);

        });
        
    });

    flag = false;
    movePlayer();

    // game.fillRect(0,0,100,100);
    // game.clearRect(100, 100, -50, -50);
    // game.clearRect(100, 100, -50, -50);
    // game.clearRect(0, 0, 50, 50);
}

function movePlayer(){
    
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision){
        levelWin();
    } 

    const bombCollision = bombPosition.find((bomb)=> {
        const bombCollisionX = playerPosition.x.toFixed(3) == bomb.x.toFixed(3);
        const bombCollisionY = playerPosition.y.toFixed(3) == bomb.y.toFixed(3);
        return bombCollisionX && bombCollisionY;
    });
    if (bombCollision){  
        levelFail();
        
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);

}

function levelWin(){
    console.log('subiste de nivel')
    level ++;
    flag = true;
    bombPosition = [];
    startGame();
}

function levelFail(){
    lives --;
    console.log(lives)
    

    if (lives <= 0) {
        lives = 3; 
        level = 0;
        flag = true;
        bombPosition = [];
    } 
  
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
    
}

function gameWin(){
    console.log('Terminaste el juego')
}

function showLives(){
    const heartsArray = Array(lives).fill(emojis['HEART']);
    let hearts = '';

    heartsArray.forEach(heart => hearts += heart);
    spanLives.innerHTML = hearts;
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
    if (playerPosition.y > 0.099*canvasSize){
        console.log('Arriba');
        playerPosition.y -= elementSize*0.98;
        startGame();
    }
   
}

function moveDown(){
    if (playerPosition.y < 0.98*canvasSize){
        console.log('Abajo');
        playerPosition.y += elementSize*0.98;
        startGame();
    }
    
}

function moveLeft(){
    if (playerPosition.x > 0.098*canvasSize) {
        playerPosition.x -= elementSize*0.98;
        startGame();
        console.log('Izquierda');
        
        
    }
}

function moveRight(){
    if (playerPosition.x < 0.89*canvasSize) {
        playerPosition.x += elementSize*0.98;
        startGame();
        console.log('Derecha');
        
        
    }
    
}
