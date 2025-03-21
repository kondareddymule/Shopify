const input = document.getElementById('number')
const button = document.getElementById('submit')
const container = document.getElementById('container')
const select = document.getElementById('select')


button.addEventListener('click', function() {
    container.innerHTML = "";
    let value = parseInt(input.value)

    switch (select.value) {
        case "square":
            
                for (let i = 0; i < value; i++) {
                    const div = document.createElement('div');
                    div.classList.add('row');
                        for (let j = 0; j < value; j++) {
                            const span = document.createElement('span');
                            span.textContent = "*";
                            div.appendChild(span);
                            div.style.gap = '20px'
                        }
            
                    container.appendChild(div);
                }
            
            break;
        case "triangle":

            for (let i=0; i < value; i++) {
                const div = document.createElement('div')
                div.classList.add('row')
                if (i === 0 || i === value-1) {
                    for (let j=0; j < i+1; j++) {
                        const span = document.createElement('span')
                        span.textContent = "*"
                        div.style.gap = `30px`
                        div.appendChild(span)
                    }
                } else {
                    const span = document.createElement('span')
                    span.textContent = "*"
                    div.appendChild(span)
                    const midspan = document.createElement('span')
                    div.append(midspan)
                    const lastspan = document.createElement('span')
                    lastspan.textContent = "*"
                    div.style.gap = `${i * 20}px`
                    div.appendChild(lastspan)
                }
                container.appendChild(div)
                const br = document.createElement('br')
                container.appendChild(br)
            }
            break;
        case "diamond":
            for (let i=0; i < value; i++) {
                const div = document.createElement('div')
                div.classList.add('row')
                if (i === 0) {
                    for (let j= 0; j < i+1; j++) {
                        const span = document.createElement('span')
                        span.textContent = "*"
                        div.style.gap = `${i * 10}px`
                        div.appendChild(span)
                    }
                } else {
                    const span = document.createElement('span')
                    span.textContent = "*"
                    div.appendChild(span)
                    const midspan = document.createElement('span')
                    div.append(midspan)
                    const lastspan = document.createElement('span')
                    lastspan.textContent = "*"
                    div.style.gap = `${i * 10}px`
                    div.appendChild(lastspan)
                }
            
                container.appendChild(div)
                const br = document.createElement('br')
                container.appendChild(br)
                }
                for (let i= value-1; i > 0; i--) {
                    const div = document.createElement('div')
                    div.classList.add('row')
                    if (i === 1) {
                        
                        for (let j= i; j < i+1; j++) {
                            const span = document.createElement('span')
                            span.textContent = "*"
                            div.style.gap = `${(i-1) * 10}px`
                            div.appendChild(span)
                        }
                    } else {
                        const span = document.createElement('span')
                        span.textContent = "*"
                        div.appendChild(span)
                        const midspan = document.createElement('span')
                        div.append(midspan)
                        const lastspan = document.createElement('span')
                        lastspan.textContent = "*"
                        div.style.gap = `${(i-1) * 10}px`
                        div.appendChild(lastspan)
                    }
                
                container.appendChild(div)
                const br = document.createElement('br')
                container.appendChild(br)
            }
            break;
            case "fulldaimond":
                for (let i=0; i < value; i++) {
                    const div = document.createElement('div')
                    div.classList.add('row')
                    
                        for (let j= 0; j < i+1; j++) {
                            const span = document.createElement('span')
                            span.textContent = "*"
                            div.style.gap = `${i * 5}px`
                            div.appendChild(span)
                        }
                    
                    container.appendChild(div)
                    const br = document.createElement('br')
                    container.appendChild(br)
                    }
                    for (let i= value-1; i > 0; i--) {
                        const div = document.createElement('div')
                        div.classList.add('row')

                  
                        for (let j= 0; j < i; j++) {
                            const span = document.createElement('span')
                            span.textContent = "*"
                            div.style.gap = `${(i-1) * 5}px`
                            div.appendChild(span)
                        }
                    
                    container.appendChild(div)
                    const br = document.createElement('br')
                    container.appendChild(br)
                }
                break;
                case "fulltriangle":
                    for (let i=0; i < value; i++) {
                        const div = document.createElement('div')
                        div.classList.add('row')
                            for (let j=0; j < i+1; j++) {
                                const span = document.createElement('span')
                                span.textContent = "*"
                                div.style.gap = `30px`
                                div.appendChild(span)
                            }
                        container.appendChild(div)
                        const br = document.createElement('br')
                        container.appendChild(br)
                    }
                    break;
        }
})

