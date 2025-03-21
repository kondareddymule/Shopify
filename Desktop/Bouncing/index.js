const input = document.getElementById('input');
const button = document.getElementById('button');
const container = document.getElementById('container');

button.addEventListener('click', function() {
    const number = parseInt(input.value);
    container.innerHTML = ""
    for (let i = 0; i < number; i++) {
        let y = Math.floor(Math.random() * window.innerHeight -20)
        let x = Math.floor(Math.random() * (window.innerWidth - 20));
        let color = ["red", "blue", "green", "black", "lightblue"]
        let ran = Math.floor(Math.random() * color.length)
        const div = document.createElement('div');
        div.id = i;
        div.classList.add('container');
        div.style.top = `${y}px`;
        div.style.left = `${x}px`;
        div.style.cursor = 'pointer';
        div.style.backgroundColor = color[ran]
        let isAnimating = false;

        div.addEventListener('click', () => {
            if (isAnimating) return; 
            isAnimating = true;

            div.style.animation = '';

            div.style.animation = 'mymove 5s';
            div.addEventListener('animationend', function () {
                div.style.animation = '';  
                div.style.top = `${y}px`;
                div.style.left = `${x}px`;
                isAnimating = false;  
            });
        });

        container.appendChild(div);
    }
    input.value = ""
});
