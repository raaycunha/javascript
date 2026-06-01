const taskInput = document.querySelector('#inTask')
const searchInput = document.querySelector('#inSearch')
const filterInput = document.querySelector('#inFilter')
const containerTask = document.querySelector('.all-task')
const boxFilters = document.querySelector('.box-filters')
const labelInput = document.querySelector('label[for="inTask"]')
const btnAdd = document.querySelector('#btnAdd')
const btnConfirm = document.querySelector('#btnConfirm')
const btnDelete = document.querySelector('#btnDelete')

let allTask = JSON.parse(localStorage.getItem('tasks')) || []

const saveTask = () => {
    localStorage.setItem('tasks', JSON.stringify(allTask))
}

const cleanInput = () => {
    taskInput.value = ''
    taskInput.focus()
}

const renderTask = (task, id, container, isCompleted = false) => {
    const boxTask = document.createElement('div')
    boxTask.dataset.id = id
    boxTask.classList.add('task-user')

    if (isCompleted) {
        boxTask.classList.add('checked')
    }

    const textTask = document.createElement('span')
    textTask.textContent = task
    textTask.classList.add('text-task')

    const boxBtn = document.createElement('div')
    boxBtn.classList.add('box-btn')

    const btnCheck = document.createElement('button')
    btnCheck.classList.add('finish-todo')

    const iconCheck = document.createElement('i')
    iconCheck.classList.add('fa-solid')
    iconCheck.classList.add('fa-check')

    const btnEdit = document.createElement('button')
    btnEdit.classList.add('edit-todo')

    const iconEdit = document.createElement('i')
    iconEdit.classList.add('fa-solid')
    iconEdit.classList.add('fa-pen')

    const btnRemove = document.createElement('button')
    btnRemove.classList.add('remove-todo')

    const iconRemove = document.createElement('i')
    iconRemove.classList.add('fa-solid')
    iconRemove.classList.add('fa-xmark')

    btnCheck.append(iconCheck)
    btnEdit.append(iconEdit)
    btnRemove.append(iconRemove)
    boxBtn.append(btnCheck, btnEdit, btnRemove)
    boxTask.append(textTask, boxBtn)
    container.append(boxTask)
}

btnAdd.addEventListener('click', () => {
    const taskUser = taskInput.value.trim()
    if (taskUser === '') {
        alert('Você não escreveu nenhuma tarefa!')
        taskInput.focus()
        return
    }
    const idTask = crypto.randomUUID()
    renderTask(taskUser, idTask, containerTask)
    allTask.push({ 
        task: taskUser, 
        completed: false,
        id: idTask
    })
    cleanInput()
    saveTask()
})

filterInput.addEventListener('change', () => {
    const allBox = containerTask.querySelectorAll('.task-user')
    const filterValue = filterInput.value

    allBox.forEach(box => {
        const isCompleted = box.classList.contains('checked')
        if (filterValue === 'All') box.style.display = 'flex'
        else if (filterValue === 'Done') box.style.display = isCompleted ? 'flex' : 'none'
        else if (filterValue === 'Todo') box.style.display = !isCompleted ? 'flex' : 'none'
    })
})

searchInput.addEventListener('input', () => {
    const allBox = containerTask.querySelectorAll('.task-user')
    const searchText = searchInput.value.trim().toLowerCase()
    allBox.forEach(box => {
        const textTask = box.querySelector('.text-task').textContent.toLowerCase()
        box.style.display = textTask.includes(searchText) ? 'flex' : 'none'
    })
})

btnDelete.addEventListener('click', () => {
    const allBox = containerTask.querySelectorAll('.task-user')
    allBox.forEach(box => box.style.display = 'flex')
    searchInput.value = ''
    filterInput.value = 'All'
})

containerTask.addEventListener('click', (e) => {
    const btnCheck = e.target.closest('.finish-todo')
    const btnEdit = e.target.closest('.edit-todo')
    const btnRemove = e.target.closest('.remove-todo')

    if (!btnCheck && !btnEdit && !btnRemove) return

    const boxTask = e.target.closest('.task-user')
    const taskId = boxTask.dataset.id

    if (btnCheck) {
        const indexTask = allTask.findIndex(t => t.id === taskId) 
        if (indexTask !== -1) { 
            allTask[indexTask].completed = allTask[indexTask].completed === false ? true : false 
            boxTask.classList.toggle('checked') 
        }
        saveTask()
    } else if (btnEdit) {
        btnAdd.style.display = 'none'
        btnConfirm.style.display = 'block'
        boxFilters.style.display = 'none'
        containerTask.style.display = 'none'
        labelInput.textContent = 'Edite sua tarefa'
        const currentText = boxTask.querySelector('.text-task').textContent
        taskInput.value = currentText
        taskInput.focus()
        idSave = taskId
    } else if (btnRemove) {
        const indexTask = allTask.findIndex(t => t.id === taskId)
        if (indexTask !== -1) {
            allTask.splice(indexTask, 1)
            const boxTask = btnRemove.closest('.task-user')
            boxTask.remove()
        }
        saveTask()
    }
})

let idSave = ''
btnConfirm.addEventListener('click', () => {
    const indexTask = allTask.findIndex(t => t.id === idSave)
    if (indexTask === -1) return
    const newText = taskInput.value.trim()
    if (newText === '') {
        alert('O campo não pode estar vazio!')
        taskInput.focus()
        return
    }
    allTask[indexTask].task = newText
    const boxToEdit = containerTask.querySelector(`[data-id="${idSave}"]`)
    if (boxToEdit) boxToEdit.querySelector('.text-task').textContent = newText
    btnAdd.style.display = 'block'
    btnConfirm.style.display = 'none'
    boxFilters.style.display = 'flex'
    containerTask.style.display = 'flex'
    labelInput.textContent = 'Adicione sua tarefa'
    cleanInput()
    saveTask()
})

if (allTask.length > 0) {
    allTask.forEach((item, index) => {
        renderTask(item.task, item.id, containerTask, item.completed)
    })
}