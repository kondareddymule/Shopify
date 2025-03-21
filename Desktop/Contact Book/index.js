// const user = document.getElementById('name')
// const email = document.getElementById('email')
// const phone = document.getElementById('phone')
// const formsubmit = document.getElementById('formsubmit')
// const container = document.getElementById('container')
// const addbutton = document.getElementById('addbutton')

// formsubmit.addEventListener('submit', function(event) {
//     addbutton.style.display = 'block'
//     formsubmit.style.display = 'none'
//     container.style.display = 'block'
//     event.preventDefault()
//     const div = document.createElement('div')
//     div.classList.add('profile')
//     const Image = document.createElement('img')
//     Image.classList.add('image')
//     Image.setAttribute('src', "https://static.vecteezy.com/system/resources/previews/026/319/114/original/profile-icon-image-suitable-for-mobile-apps-web-apps-and-print-media-vector.jpg")
//     Image.setAttribute('alt', "person")
//     div.appendChild(Image)
//     const subdiv = document.createElement('div')
//     subdiv.classList.add('subdiv')
//     const username = document.createElement('p')
//     username.textContent = user.value
//     subdiv.appendChild(username)
//     const emailid = document.createElement('p')
//     emailid.textContent = email.value
//     subdiv.appendChild(emailid)
//     const phonenum = document.createElement('p')
//     phonenum.textContent = phone.value
//     subdiv.append(phonenum)
//     div.appendChild(subdiv)
//     const del = document.createElement('div')
//     del.classList.add('del')
//     const edit = document.createElement('button')
//     edit.textContent = "Edit"
//     edit.addEventListener("click", () => handleEdit(div,username.textContent,emailid.textContent,phonenum.textContent,))
//     del.appendChild(edit)
//     const button = document.createElement('button')
//     button.textContent = "Delete"
//     button.style.backgroundColor = 'red'
//     button.addEventListener('click', () => handleDelete(div))
//     del.appendChild(button)
//     div.appendChild(del)
//     container.appendChild(div)

//     user.value = ""
//     email.value = ""
//     phone.value = ""
// })

// addbutton.addEventListener('click', function() {
//     formsubmit.style.display = 'flex'
//     addbutton.style.display = 'none'
//     container.style.display = 'none'
// })


// function handleDelete(div) {
//     div.remove()
// }

// function handleEdit(div, username, emailid, phonenum) {
//     formsubmit.style.display = 'flex'
//     addbutton.style.display = 'none'
//     container.style.display = 'none'

//     console.log(div, username, emailid, phonenum)
// }



const user = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const formsubmit = document.getElementById('formsubmit')
const container = document.getElementById('container')
const addbutton = document.getElementById('addbutton')

let editProfile = null;

formsubmit.addEventListener('submit', function(event) {
    event.preventDefault()

    addbutton.style.display = 'block'
    formsubmit.style.display = 'none'
    container.style.display = 'block'

    if (!editProfile) {
        const div = document.createElement('div')
        div.classList.add('profile')
        const Image = document.createElement('img')
        Image.classList.add('image')
        Image.setAttribute('src', "https://static.vecteezy.com/system/resources/previews/026/319/114/original/profile-icon-image-suitable-for-mobile-apps-web-apps-and-print-media-vector.jpg")
        Image.setAttribute('alt', "person")
        div.appendChild(Image)

        const subdiv = document.createElement('div')
        subdiv.classList.add('subdiv')

        const username = document.createElement('p')
        username.textContent = user.value
        subdiv.appendChild(username)

        const emailid = document.createElement('p')
        emailid.textContent = email.value
        subdiv.appendChild(emailid)

        const phonenum = document.createElement('p')
        phonenum.textContent = phone.value
        subdiv.append(phonenum)

        div.appendChild(subdiv)

        const del = document.createElement('div')
        del.classList.add('del')

        const edit = document.createElement('button')
        edit.textContent = "Edit"
        edit.addEventListener("click", () => handleEdit(div, username, emailid, phonenum))
        del.appendChild(edit)

        const button = document.createElement('button')
        button.textContent = "Delete"
        button.style.backgroundColor = 'red'
        button.addEventListener('click', () => handleDelete(div))
        del.appendChild(button)

        div.appendChild(del)
        container.appendChild(div)
    } else {  
        editProfile.username.textContent = user.value
        editProfile.emailid.textContent = email.value
        editProfile.phonenum.textContent = phone.value

        user.value = ""
        email.value = ""
        phone.value = ""


        addbutton.style.display = 'block'
        formsubmit.style.display = 'none'
        container.style.display = 'block'

        editProfile = null
    }
})

addbutton.addEventListener('click', function() {
    formsubmit.style.display = 'flex'
    addbutton.style.display = 'none'
    container.style.display = 'none'
})

function handleDelete(div) {
    div.remove()
}

function handleEdit(div, username, emailid, phonenum) {
    formsubmit.style.display = 'flex'
    addbutton.style.display = 'none'
    container.style.display = 'none'

    user.value = username.textContent
    email.value = emailid.textContent
    phone.value = phonenum.textContent

    editProfile = { div, username, emailid, phonenum }

    formsubmit.onsubmit = function(event) {
        event.preventDefault()


        user.value = ""
        email.value = ""
        phone.value = ""

        addbutton.style.display = 'block'
        formsubmit.style.display = 'none'
        container.style.display = 'block'

        editProfile = null
        
    }
}
