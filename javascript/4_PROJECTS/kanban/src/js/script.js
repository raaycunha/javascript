const allBox = document.querySelectorAll('.box-task')
const taskInput = document.querySelector('#inTask')
const btnCreate = document.querySelector('#btnCreate')

const savedTasks = JSON.parse(localStorage.getItem('tasks'))
let allTask = Array.isArray(savedTasks) ? savedTasks : []

const cleanInput = () => {
    taskInput.value = ''
    taskInput.focus()
}

const createHtml = (task, id, column = 'todo') => {
    const boxColumn = document.querySelector(`.${column}`)
    if (!boxColumn) return
    const cardTask = document.createElement('div')
    cardTask.classList.add('item-task')
    cardTask.id = id
    cardTask.draggable = true
    cardTask.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id)
    })
    cardTask.textContent = task
    boxColumn.append(cardTask)
}

btnCreate.addEventListener('click', () => {
    const taskUser = taskInput.value
    if (taskUser === '') {
        alert('O campo de tarefa não pode estar vazio.')
        return
    }
    const idTask = crypto.randomUUID()
    createHtml(taskUser, idTask)
    allTask.push({
        task: taskUser,
        taskId: idTask,
        column: 'todo'
    })
    cleanInput()
    localStorage.setItem('tasks', JSON.stringify(allTask))
})

allBox.forEach(box => {
    box.addEventListener('dragover', (e) => {
        e.preventDefault()
    })
    box.addEventListener('drop', (e) => {
        e.preventDefault()
        const columnDrop = e.target.closest('.box-task')
        if (!columnDrop) return
        const boxColumn = columnDrop.dataset.column
        const idItem = e.dataTransfer.getData('text/plain')
        const taskUser = document.getElementById(idItem)
        const index = allTask.findIndex(t => t.taskId === idItem)
        if (index !== -1) allTask[index].column = boxColumn
        columnDrop.append(taskUser)
        localStorage.setItem('tasks', JSON.stringify(allTask))
    })
})

if (allTask.length > 0) {
    allTask.forEach(item => {
        createHtml(item.task, item.taskId, item.column)
    })
}