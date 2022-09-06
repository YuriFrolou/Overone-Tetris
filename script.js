const outer = document.querySelector('.outer');
const car = document.querySelector('.car');
const victory = document.querySelector('.victory');
const gameOver = document.querySelector('.game-over');
let counter = 0;
let difficulty = 10;

setInterval(createStone, 2000);
setInterval(() => {
        gameStart(difficulty)
    }
    , 1000);


function createStone() {
    if (counter >= 50) {
        celebrate();
    }
    const stone = document.createElement('div');
    stone.classList.add('stone');
    stone.style.left = `${Math.floor(Math.random() * (outer.getBoundingClientRect().right - outer.getBoundingClientRect().left) + outer.getBoundingClientRect().left)}px`;
    stone.style.top = '-5px';
    outer.append(stone);
    counter++;
    console.log(counter)
}

function moveCar(e) {
    e.preventDefault();
    let leftCar = parseInt(getComputedStyle(car).left);
    let audioEngine = new Audio('./audio/engine.mp3');
    let audioHit = new Audio('./audio/hit.mp3');
    document.addEventListener('keyup', () => {
        audioEngine.pause()
    });

    if (e.code === 'ArrowUp') {
        audioEngine.play();
        difficulty += 50;
    } else if (e.code === 'ArrowDown') {
        difficulty = 10;
    }

    if (e.code === 'ArrowLeft') {
        audioEngine.play();
        leftCar -= 10;
        if (leftCar <= outer.getBoundingClientRect().left - 10) {
            audioHit.play();
            gameOverFunc();
        }
    } else if (e.code === 'ArrowRight') {
        audioEngine.play();
        leftCar += 10;
        if (leftCar >= outer.getBoundingClientRect().right - 40) {
            audioHit.play();
            gameOverFunc();

        }
    }
    car.style.left = leftCar + 'px';
}

function gameOverFunc() {
    setTimeout(() => {
        gameOver.classList.add('active');
        outer.style.display = 'none';
        car.style.display = 'none';
    }, 1000)
}

function celebrate() {
    setTimeout(() => {
        victory.classList.add('active');
        outer.style.display = 'none';
        car.style.display = 'none';
    }, 1000)
}

function gameStart(difficulty) {
    document.addEventListener('keydown', moveCar);
    let heightOuter = parseInt(getComputedStyle(outer).height);
    let topOuter = parseInt(getComputedStyle(outer).top);
    const stones = document.getElementsByClassName('stone');
    for (const stone of stones) {
        let topStone = parseInt(getComputedStyle(stone).top);
        topStone += 60;
        stone.style.top = topStone + 'px';
        let rectCar = car.getBoundingClientRect();
        let rectStone = stone.getBoundingClientRect();
        if (((rectCar.left >= rectStone.left && rectCar.left <= rectStone.right) || (rectCar.right >= rectStone.left && rectCar.right <= rectStone.right)) &&
            rectStone.bottom > rectCar.top) {
            let audioHit = new Audio('./audio/hit.mp3');
            audioHit.play();
            gameOverFunc();
        }
        if (rectStone.top > 560) {
            stone.remove();
        }
    }
    topOuter -= difficulty;
    heightOuter += 30;

    outer.style.top = topOuter + 'px';
    outer.style.height = heightOuter + 'px';

}