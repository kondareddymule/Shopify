const container = document.getElementById('container')
const cart = document.getElementById('cart')
const shop = document.getElementById('shop')
const cartContainer = document.getElementById('cartContainer')
const checkout = document.getElementById('checkout')
const modal = document.getElementById('modal')
const cross = document.getElementById('cross')
const checkoutcontainer = document.getElementById('checkoutcontainer')
const totalpara = document.getElementById('total')

let cartprod = []
const cartproducts = {}
let totalAmount = 0
async function getProducts () {
    await fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((result) => {
        result.map((item) => {
            const div = document.createElement('div')
            div.classList.add('product')
            const p = document.createElement('p')
            p.textContent = item.title
            p.classList.add('paragraph')
            div.appendChild(p)

            const Image = document.createElement('img')
            Image.setAttribute('src', item.image)
            Image.setAttribute('alt', item.title)
            Image.classList.add('image')
            div.appendChild(Image)

            const price = document.createElement('p')
            price.textContent = item.price
            div.appendChild(price)

            const button = document.createElement('button')
            button.textContent = 'Add to Cart'
            button.classList.add('button')
            button.addEventListener('click', () => handleCart(item, item.id))
            div.appendChild(button)

    
            container.appendChild(div)
        })
    })

}

getProducts()


function handleCart(product, item) {
    if(!cartprod.includes(product)) {
        cartprod.push(product)
    }
    if (cartproducts[item] !== undefined) {
        cartproducts[item] += 1
    } else {
        cartproducts[item] = 1
    }
}


cart.addEventListener('click', function(){
    container.style.display = 'none'
    shop.style.display = 'block'
    cart.style.display = 'none'
    cartContainer.style.display = 'flex'
    if(cartprod.length === 0){
        cartContainer.innerHTML = ""
        const p = document.createElement('p')
        p.classList.add('no')
        p.textContent = "No Products In Your Cart Please Shop Now"
        cartContainer.appendChild(p)
    } else {
        checkout.style.display = 'block'
        cartContainer.innerHTML = ""
        cartprod.map((item) => {
        const div = document.createElement('div')
            div.classList.add('product')
            const p = document.createElement('p')
            p.textContent = item.title
            p.classList.add('paragraph')
            div.appendChild(p)

            const Image = document.createElement('img')
            Image.setAttribute('src', item.image)
            Image.setAttribute('alt', item.title)
            Image.classList.add('image')
            div.appendChild(Image)

            const price = document.createElement('p')
            price.textContent = item.price
            div.appendChild(price)

            const quantity = document.createElement('div')
            quantity.classList.add('quantity')
            const para = document.createElement('p')
            para.textContent = "Quantity"
            quantity.appendChild(para)
            const sub = document.createElement('button')
            sub.textContent = "-"
            sub.style.color = 'red'
            sub.style.fontSize = '20px'
            sub.addEventListener('click', () => handlesub(item.id, div))
            quantity.appendChild(sub)
            const quantp = document.createElement('span')
            quantp.id = item.id
            quantp.textContent = cartproducts[item.id]
            quantity.appendChild(quantp)
            const add = document.createElement('button')
            add.textContent = "+"
            add.style.color = 'green'
            add.style.fontSize = '20px'
            add.addEventListener('click', () => handleadd(item.id))
            quantity.appendChild(add)
            div.appendChild(quantity)


            const button = document.createElement('button')
            button.textContent = 'Delete'
            button.classList.add('button')
            button.addEventListener('click', () => removeCart(item.id, div))
            div.appendChild(button)
            cartContainer.appendChild(div)
       })
    }
})



function removeCart(id, div) {
    div.remove()
    delete cartproducts[id]
    cartprod = cartprod.filter(pro => pro.id !== id);
    if(cartprod.length === 0){
        checkout.style.display = "none"
        cartContainer.innerHTML = ""
        const p = document.createElement('p')
        p.classList.add('no')
        p.textContent = "No Products In Your Cart Please Shop Now"
        cartContainer.appendChild(p)
    }
    
}


shop.addEventListener('click', function(){
    container.style.display = 'flex'
    cartContainer.style.display = 'none'
    shop.style.display = 'none'
    checkout.style.display = 'none'
    cart.style.display = 'block'
})

function handlesub(id, div) {
    if(cartproducts[id] === 1) {
        delete cartproducts[id]
        cartprod = cartprod.filter(pro => pro.id !== id);
        div.remove()
    } else {
        const element = document.getElementById(id)
        element.textContent = cartproducts[id] -1
        cartproducts[id] -= 1
    }

    if(cartprod.length === 0){
        checkout.style.display = "none"
        cartContainer.innerHTML = ""
        const p = document.createElement('p')
        p.classList.add('no')
        p.textContent = "No Products In Your Cart Please Shop Now"
        cartContainer.appendChild(p)
    }
}

function handleadd(id) {
    if(cartproducts[id] < 10) {
        const element = document.getElementById(id)
        element.textContent = cartproducts[id] + 1
        cartproducts[id] += 1
    }
    if(cartprod.length === 0){
        cartContainer.innerHTML = ""
        const p = document.createElement('p')
        p.classList.add('no')
        p.textContent = "No Products In Your Cart Please Shop Now"
        cartContainer.appendChild(p)
    }
}


checkout.addEventListener('click', function() {
    modal.style.display = "flex";
    cartContainer.style.display = 'none';
    checkoutcontainer.innerHTML = ""
    cartprod.map((item) => {
        const div = document.createElement('div')
        div.classList.add('product')
        const Image = document.createElement('img')
        Image.setAttribute('src', item.image)
        Image.setAttribute('alt', item.title)
        Image.classList.add('image')
        div.appendChild(Image)

        const col = document.createElement('div')
        col.classList.add('col')
        const p = document.createElement('p')
        p.textContent = item.title
        p.classList.add('paragraph')
        col.appendChild(p)

        const subdiv = document.createElement('div')
        subdiv.classList.add('sub')
        const price = document.createElement('p')
        price.textContent = item.price
        subdiv.appendChild(price)
        const into = document.createElement('p')
        into.textContent = "X"
        subdiv.appendChild(into)
        const quantity = document.createElement('p')
        quantity.textContent = cartproducts[item.id]
        subdiv.appendChild(quantity)
        const equalto = document.createElement('p')
        equalto.textContent = "="
        subdiv.appendChild(equalto)

        const total = document.createElement('p')
        total.textContent = item.price * cartproducts[item.id]
        subdiv.appendChild(total) 
        col.appendChild(subdiv)
        div.appendChild(col)
        checkoutcontainer.appendChild(div)

        totalAmount += item.price * cartproducts[item.id]
    })
    totalpara.textContent = totalAmount
})

cross.addEventListener('click', function(){
    modal.style.display = "none";
    cartContainer.style.display = 'flex';
})
