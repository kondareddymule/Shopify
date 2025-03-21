// const container = document.getElementById('container')
// const counttext = document.getElementById('count')


// for (let i=0; i < 9; i++) {
//     const div = document.createElement('div')
//     div.classList.add("box")
//     div.id= i;
//     container.appendChild(div)
// }

// let count = 0

// let seconds = 60

// const Id = setInterval(() => {
//     seconds -= 1
//     let random = Math.floor(Math.random() * 9);
//     const element = document.getElementById(random);
    
//     element.classList.add("mole");
//     if (!element.querySelector('.smallbox')) {
//         const box = document.createElement('div')
//         box.classList.add('smallbox')
//         element.appendChild(box)
//     }

//     //element.textContent = "kill"

//     const moleTimeout = setTimeout(() => {
//         if (element.classList.contains('mole')) {
//             element.classList.remove('mole');
//             element.textContent = ""
//         }
//     }, 3000);


//     element.addEventListener('click', function () {
//         if (element.classList.contains('mole')) {
//             element.classList.remove('mole');
//             element.textContent = ""
//             count++; 
//             clearTimeout(moleTimeout);
//         }
//     });

//     if (seconds === 0) {
//         clearInterval(Id)
//         alert("Game Over")
//     }

//     counttext.textContent = count
// }, 500);



const container = document.getElementById('container');
const counttext = document.getElementById('count');
const time = document.getElementById('time')

for (let i = 0; i < 12; i++) {
    const div = document.createElement('div');
    div.classList.add("box");
    div.id = i;
    container.appendChild(div);
}

let count = 0;
let seconds = 60;
let gameInterval;
let game = 30 

function startGame() {
    
    count = 0;
    seconds = 60;
    counttext.textContent = count;


    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.classList.remove('mole');
        const smallbox = box.querySelector('.smallbox');
        if (smallbox) {
            box.removeChild(smallbox);
        }
    });

    gameInterval = setInterval(() => {
        seconds -= 1;
        let random = Math.floor(Math.random() * 12);
        const element = document.getElementById(random);


        element.classList.add("mole")
        if (!element.querySelector('.smallbox')) {
            const box = document.createElement('div');
            box.classList.add('smallbox');
            element.appendChild(box);
        }

        const moleTimeout = setTimeout(() => {
            if (element.classList.contains('mole')) {
                element.classList.remove('mole');
                element.textContent = "";
            }
        }, 3000);

        element.addEventListener('click', function () {
            if (element.classList.contains('mole')) {
                element.classList.remove('mole');
                element.textContent = "";
                count++;
                clearTimeout(moleTimeout);
            }
        });

        if (game === 0) {
            game = 31
            time.textContent = game
            clearInterval(gameInterval); 
            alert(`Game Over", Your Score = ${count}`);
            startGame(); 
        }

        counttext.textContent = count;
    }, 500);
}

const Timer = setInterval(() => {
    game--
    time.textContent = game
},1000)

startGame();


