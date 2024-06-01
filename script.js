const box = document.querySelector('.add-box')
const add_box = document.querySelector('.add-box .icon')
const allDelete = document.querySelector('.allDelete')
const popup_box = document.querySelector('.popup-box')
// const popup = document.querySelector('.popup')
const box_close = document.querySelector('header .bx')
const addBtn = document.querySelector('form button')
const boxTitle = document.querySelector('.boxTitle')


const inputTitle = document.querySelector('.input-title');
const inputDescription = document.querySelector('.input-description');


let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


let notes = JSON.parse(localStorage.getItem('notes') || "[]")

let noteTitle
let noteDesc

let isUpdate = false
let updateId



add_box.addEventListener('click', () => {
    inputTitle.focus()
    popup_box.classList.add('active')
})

box_close.addEventListener('click', () => {
    inputTitle.value = ''
    inputDescription.value = ''
    popup_box.classList.remove('active')
    boxTitle.textContent = 'Add a new Note'
    addBtn.textContent = 'Add Note'
})


addBtn.addEventListener('click', e => {
    e.preventDefault()
    
    noteTitle = inputTitle.value
    noteDesc = inputDescription.value

    if (noteTitle && noteDesc) {
        let dateObj = new Date()
        let month = months[dateObj.getMonth()]
        let day = dateObj.getDay()
        let year = dateObj.getFullYear()
        let date = `${month} ${day}, ${year}`

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: date
        }

        if (!isUpdate) {
            // Notes Array Add
            notes.push(noteInfo)
        }
        else {
            isUpdate = false
            notes[updateId] = noteInfo
        }

        // Notes localStorage Add
        addLocalStorage(notes)
        alert("Başarılı bir şekilde Not eklendi!")
        box_close.click()
        showNotes()
    }
    else {
        alert("Lütfen boş bırakmayın!")
    }
})

allDelete.addEventListener('click', () => {

    if (notes.length > 0) {
        const allDeleteControl = confirm('Tüm notlar silinecek emin misin?')
        if (allDeleteControl) {
            notes = []
            localStorage.clear()
            showNotes()
        }
    }
    else{
        alert('Silinecek Not Yok!')
    }
})

function showMenu(element) {
    element.parentElement.classList.add('active')
    document.addEventListener('click', e => {

        if (e.target != element) {
            element.parentElement.classList.remove('active')
        }

    })
}

function updateNote(noteId, title, description) {
    isUpdate = true
    updateId = noteId

    inputTitle.value = title
    inputDescription.value = description
    boxTitle.textContent = 'Update Note'
    addBtn.textContent = 'Update'
    add_box.click();
}

function deleteNote(noteId) {
    const deleteControl = confirm(`${noteId + 1}. Notu silmek istediğine emin misin?`)
    if (deleteControl) {
        notes.splice(noteId, 1)
        addLocalStorage(notes)
        showNotes()
    }
}

const addLocalStorage = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove())

    notes.forEach((note, index) => {
        let liTag =
            `<li class="note">
            <div class="details">
                <h1>${note.title}</h1>
                <span>${note.description}</span>
            </div>

            <div class="bottom-content">
                <span class="nowDate">${note.date}</span>
                <div class="settings">
                    <i onclick="showMenu(this)" class='bx bx-dots-horizontal-rounded'></i>
                    <div class="menu">
                        <div onclick="updateNote(${index}, '${note.title}', '${note.description}')" class="menu-item"><i class='bx bx-pencil'></i>Edit</div>
                        <div onclick="deleteNote(${index})" class="menu-item"><i class='bx bx-trash'></i>Delete</div>
                    </div>
                </div>
            </div>
        </li>`;

        box.insertAdjacentHTML('afterend', liTag)
    })
}

showNotes()




