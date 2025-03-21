const container = document.getElementById('container')
const button  = document.getElementById('button')
const input = document.getElementById('input')
const submit = document.getElementById('submit')
const fields = document.getElementById('fields')

console.log(fields.getBoundingClientRect())

let  arr = []

submit.addEventListener('click',function() {
    let number = input.value
    container.innerHTML = ""
    if (input.value < 200) {
    for (let i=0; i < number; i++) {
        const div = document.createElement('div')
        div.id = i+1
        div.draggable = false
        div.textContent = i+1
        div.classList.add('box')
        div.addEventListener('click', () => handleselect(i+1))
        window.addEventListener('dragover', (e) => e.preventDefault(e))
        container.appendChild(div)
    }
  } else {
    container.innerHTML = ""
    const p = document.createElement('p')
    p.textContent = "Number should not be greater than 200"
    container.appendChild(p)
  }
    input.value = ""
})

function handleselect(id) {
    arr = []
    arr.push(id);
    const boxes = document.querySelectorAll('.box')
    for (let i of boxes) {
        const color = document.getElementById(i.id)
        if (parseInt(i.id) === arr[0]) {
            color.classList.add('color')
            color.draggable = true
        } else {
            color.classList.remove('color')
            color.draggable = false
        }
    }
    window.addEventListener('drop', (e) => handleEvent(e, id))
}

button.addEventListener('click', function() {
    for (let i of arr) {
        const remove = document.getElementById(i)
        container.removeChild(remove)
    }
    arr = []
})


function handleEvent(e,id) {
    let x = e.clientX
    let y = e.clientY
    handledrop(x,y,id)

}


function handledrop(x,y,id) {
    const boxes = document.querySelectorAll('.box')
    for (let i of boxes) {
        let height = window.innerHeight
        let width = window.innerWidth
        const element = document.getElementById(i.id)
        if (parseInt(i.id) === arr[0]) {
            const bounds = element.getBoundingClientRect()
            console.log(height,width)
            console.log(bounds)
            console.log(x,y)
            if (x + 203 < width && y + 203 < height && y > 29) {
                element.style.position = 'absolute'
                element.style.top = `${y}px`
                element.style.left = `${x}px`
            }
        }
    }
}



// const container = document.getElementById('container');
// const submit = document.getElementById('submit');
// const input = document.getElementById('input');

// let count = 1;

// submit.addEventListener('click', function() {
//     const div = document.createElement('div');
//     div.id = count;
//     div.textContent = input.value;
//     container.appendChild(div);
//     count++;

//     // Adding the edit functionality
//     div.addEventListener('click', function() {
//         // Create an input field to edit the content
//         const editInput = document.createElement('input');
//         editInput.value = div.textContent; // Set the current text as the value of the input
//         div.textContent = ''; // Clear the div
//         div.appendChild(editInput);
        
//         // Focus on the input field for editing
//         editInput.focus();

//         // When the user presses Enter, save the changes
//         editInput.addEventListener('keydown', function(event) {
//             if (event.key === 'Enter') {
//                 div.textContent = editInput.value; // Set the div's content to the new value
//             }
//         });
//     });
// });


// const container = document.getElementById('container');
// const submit = document.getElementById('submit');
// const input = document.getElementById('input');

// let count = 1;

// submit.addEventListener('click', function() {
//     const div = document.createElement('div');
//     div.id = count;
//     const content = document.createElement('span');
//     content.textContent = input.value;
    
//     const editButton = document.createElement('button');
//     editButton.textContent = 'Edit';
    
//     div.appendChild(content);
//     div.appendChild(editButton);
//     container.appendChild(div);

//     count++;
//     editButton.addEventListener('click', function() {

//         const editInput = document.createElement('input');
//         editInput.value = content.textContent; 
        
//         // Replace the content with the input field
//         content.textContent = ''; // Clear the content
//         content.appendChild(editInput);
        
//         // Focus on the input field for editing
//         editInput.focus();

//         // Add Save button
//         const saveButton = document.createElement('button');
//         saveButton.textContent = 'Save';
        
//         // Replace the Edit button with the Save button
//         editButton.replaceWith(saveButton);

//         // When the user presses Save
//         saveButton.addEventListener('click', function() {
//             content.textContent = editInput.value; // Set the div's content to the new value
//             saveButton.replaceWith(editButton); // Replace Save button back with Edit button
//         });
//     });
// });

  