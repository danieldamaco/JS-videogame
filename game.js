const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);



console.log(maps[[0]])

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
    const map = maps[2]
    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))

    game.font = String(elementSize*0.9)+'px verdana';
    game.textAlign = 'left';

    for (let x=0; x<10; x++){
        for (let y=1; y<=10; y++ ){
            
            game.fillText(emojis[mapRowCols[y-1][x]], elementSize*x, elementSize*0.98*y);
        }
    }

    // game.fillRect(0,0,100,100);
    // game.clearRect(100, 100, -50, -50);
    // game.clearRect(100, 100, -50, -50);
    // game.clearRect(0, 0, 50, 50);
}

