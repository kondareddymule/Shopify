// const quote = document.getElementById('quote')
// const input = document.getElementById('input')
// const start = document.getElementById('start')
// const modal = document.getElementById('modal')
// const cross = document.getElementById('cross')
// const words = document.getElementById('words')


// const arr  = [
//     "The only limit to our realization of tomorrow is our doubts of today.Franklin D.Roosevelt The purpose of our lives is to be happy. Dalai Lama Believe you can and you're halfway there. Theodore Roosevelt",
//     "Life is what happens when you're busy making other plans. John Lennon Get busy living or get busy dying. Stephen King, You have within you right now, everything you need to deal with whatever the world can throw at you. Brian Tracy",
//     "A warehouse is a commercial building that’s used to store goods. They’re mainly used by manufacturers, importers, exporters, wholesalers, and transport businesses. The role of the warehouse is much less focused on consumers and more on storing the it.",
//     "The only impossible journey is the one you never begin. Tony Robbins Act as if what you do makes a difference. It does. William James, Success is not how high you have climbed, but how you make a positive difference to the world. Roy T.Bennett You are never too old to set another goal or to dream a new dream. C.S. Lewis",
//     "Advance Shipment Notice (ASN) Preparing for the arrival of goods is critical for avoiding bottlenecks at your warehouse docks. An advance shipment notice (ASN) is an electronic data interchange (EDI) message sent from the shipper to the receiver prior to the departure of the shipment from the shipper's facility. The message includes complete information about the shipment and its contents.",
//     "Supply Chain Management is the optimization of a product's creation and flow from raw materials sourcing to production, logistics and delivery to the final products. SCM covers demand planning, sourcing, production, inventory management and storage, Transportation and logistics and return of excess or defective products."
// ];



// let seconds = document.getElementById('seconds')
// let count = document.getElementById('words')

// let second = 10
// let typing = false


// const p = document.createElement('p')
// p.textContent = arr[Math.floor(Math.random() * 6)]
// quote.appendChild(p)

// input.addEventListener('keydown', function(){
//     let len = input.textContent.trim().length
//     count.textContent = len + 1

//     if (input.textContent.trim() === quote.textContent) {
//         quote.style.color = 'red';
//     }
// })


// start.addEventListener('click', function timer(){
//     input.setAttribute("contenteditable", true)
//     quote.innerHTML = ""
//     input.textContent = ""
//     const p = document.createElement('p')
//     p.textContent = arr[Math.floor(Math.random() * 6)]
//     quote.appendChild(p)
//     start.setAttribute('disabled', true)
//     typing = true

//     if(typing) {
//         const sec = setInterval(() => {
//             handletime()
//         },1000)
        
//         function handletime() {
//             second -= 1
//             if(second === 0) {
//                 clearInterval(sec)
//                 modal.style.display = 'flex';
//                 const wordscount = input.textContent.trim().split(" ")
//                 words.innerText = wordscount.length
//                 console.log(wordscount.length)
//             }
//             seconds.textContent = second;
//         }
//     }
// })


// cross.addEventListener('click', function() {
//     input.setAttribute("contenteditable", false)
//     start.removeAttribute('disabled');
//     seconds.textContent = 60;
//     second = 10;
//     modal.style.display = 'none';
//     count.textContent = 0;
//     typing = false;
//     input.textContent = ''
// });


const quote = document.getElementById('quote');
const input = document.getElementById('input');
const start = document.getElementById('start');
const modal = document.getElementById('modal');
const cross = document.getElementById('cross');
const words = document.getElementById('words');
const count = document.getElementById('count');
const seconds = document.getElementById('seconds');

const arr = [
    "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt The purpose of our lives is to be happy. - Dalai Lama Believe you can and you're halfway there. - Theodore Roosevelt",
    "Life is what happens when you're busy making other plans. - John Lennon Get busy living or get busy dying. - Stephen King You have within you right now, everything you need to deal with whatever the world can throw at you. - Brian Tracy",
    "A warehouse is a commercial building that’s used to store goods. They’re mainly used by manufacturers, importers, exporters, wholesalers, and transport businesses. The role of the warehouse is much less focused on consumers and more on storing the goods.",
    "The only impossible journey is the one you never begin. - Tony Robbins Act as if what you do makes a difference. It does. - William James Success is not how high you have climbed, but how you make a positive difference to the world. - Roy T. Bennett You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    "Advance Shipment Notice (ASN) Preparing for the arrival of goods is critical for avoiding bottlenecks at your warehouse docks. An advance shipment notice (ASN) is an electronic data interchange (EDI) message sent from the shipper to the receiver prior to the departure of the shipment from the shipper's facility. The message includes complete information about the shipment and its contents.",
    "Supply Chain Management is the optimization of a product's creation and flow from raw materials sourcing to production, logistics, and delivery to the final products. SCM covers demand planning, sourcing, production, inventory management, and storage, transportation and logistics, and return of excess or defective products."
];

let second = 60;
let typing = false;
let wordCount = 0


const p = document.createElement('p');
p.textContent = arr[Math.floor(Math.random() * arr.length)];
quote.appendChild(p);


start.addEventListener('click', function () {
    input.setAttribute("contenteditable", true)
    input.innerText = ""; 
    quote.innerHTML = "";
    const p = document.createElement('p');
    p.textContent = arr[Math.floor(Math.random() * arr.length)];
    quote.appendChild(p);
    start.setAttribute('disabled', true);

    let timer = setInterval(function () {
        second--;
        seconds.textContent = second;

        if (second === 0) {
            clearInterval(timer); 
            modal.style.display = 'flex';
            const q = quote.textContent.split(" ")
            const inp = input.textContent.trim().split(" ")
            for (let i=0; i < q.length; i++) {
                if (q[i] === inp[i]) {
                    wordCount++
                }
            }
            words.textContent = wordCount;
        }
    }, 1000);

    typing = true;
});


input.addEventListener('keydown', function () {
    count.textContent = input.textContent.length
    const q = quote.textContent.split(" ")
    const inp = input.textContent.trim().split(" ")
    // for (let i=0; i < q.length; i++) {
    //     if (q[i] === inp[i]) {
    //         console.log(inp[i])
    //     }
    // }
});


cross.addEventListener('click', function () {
    input.setAttribute("contenteditable", false); 
    start.removeAttribute('disabled');
    seconds.textContent = 60; 
    second = 60;
    modal.style.display = 'none';
    count.textContent = '0'; 
    typing = false;
    input.innerText = '';
    wordCount = 0
});
