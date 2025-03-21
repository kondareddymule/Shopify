let scrollPositionY;
let scrollPositionX;
const box = document.getElementById('box')

window.addEventListener('scroll', function() {
    scrollPositionY = window.scrollY || document.documentElement.scrollTop;
    console.log("Current Scroll Position: " + scrollPositionY);
    box.style.border = '2px solid black'
    box.style.height = '200px'
    box.style.width = "200px"
    box.style.backgroundColor = "green"
    box.style.position = 'absolute'
    box.style.border = 'none'
    box.style.top = `${scrollPositionY}px`
    box.style.left = `${scrollPositionX}px`
});

window.addEventListener('scroll', function() {
    scrollPositionX = window.scrollX || document.documentElement.scrollLeft;
    console.log("Current Scroll Position: " + scrollPositionX);
    box.style.border = '2px solid black'
    box.style.height = '200px'
    box.style.width = "200px"
    box.style.backgroundColor = "green"
    box.style.position = 'absolute'
    box.style.border = 'none'
    box.style.top = `${scrollPositionY}px`
    box.style.left = `${scrollPositionX}px`
    
});

box.style.border = '2px solid black'
box.style.height = '200px'
box.style.width = "200px"
box.style.backgroundColor = "green"
box.style.position = 'absolute'
box.style.border = 'none'
box.style.top = `${scrollPositionX}px`
box.style.left = `${scrollPositionY}px`









  