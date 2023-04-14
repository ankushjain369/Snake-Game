// Game Variables
let inputDir={x:0,y:0};
let music=new Audio('/music/music.wav');
let food=new Audio('/music/eat1.mp3');
let turn=new Audio('/music/turn2.mp3');
let gameover=new Audio('/music/gameover1.mp3');
let board=document.querySelector('.board');
let scoreBox=document.querySelector('.scoreBox');

let score=0;
let speed=5;
let lasttime=0;
let snakeArr=[
    {x:10,y:15}
]
let snakefood = {x:5,y:3};

music.volume=0.2;
gameover.volume=0.2;

// Game Functions or Methods
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lasttime)/1000 < 1/speed){
        return
    }
    lasttime=ctime;
    gameEngine();
}

function isCollide(snake){
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x===snake[0].x && snakeArr[i].y===snake[0].y){
            return true
        }
    }
    if(snakeArr[0].x>=18||snakeArr[0].x<=0 || snakeArr[0].y>=18||snakeArr[0].y<=0){      return true
    }
}

// music.play();
function gameEngine(){
    // music.play();
    // Part-1: Update the snake array and food
    if(isCollide(snakeArr)){
        gameover.play();
        music.pause();
        inputDir={x:0,y:0};
        $(document).ready(function(){
            
        })
        alert("Game Over!! Press any key to start");
        snakeArr=[{x:5,y:3}];
        // music.play();
        score=0;
    }

    // If snake have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].x === snakefood.x && snakeArr[0].y === snakefood.y){
        food.play();
        score += 1;
        scoreBox.innerHTML="Score: "+score;
        if(score >=10 && score <20){
            speed = 8;
        }
        if(score >=20){
            speed = 12;
        }
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x , y:snakeArr[0].y+inputDir.y});
        let a=1;
        let b=17;
        snakefood={x:Math.round(a+(b-a)*Math.random()) , y:Math.round(a+(b-a)*Math.random())}
    }

    // Moving the Snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part-2: Display the Snake
    board.innerHTML='';
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('body');
        }
        board.appendChild(snakeElement);
    })
    //Display the Food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart = snakefood.y;
    foodElement.style.gridColumnStart = snakefood.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// Game Main Logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
    inputDir = {x:0,y:1}; //Start the Game
    turn.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;

        default:
            break;
    }
})
