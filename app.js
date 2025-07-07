const taskNameInput = document.getElementById(`task-name`);
const categoryInput = document.getElementById(`task-category`);
const deadlineInput = document.getElementById(`task-deadline`);
const statusSelect = document.getElementById(`task-status`);
const addTaskButton = document.getElementById(`add-task`);
const taskList = document.getElementById(`task-list`);

//adding event listener for Task Button and creating an object and li item
addTaskButton.addEventListener(`click`, () => {
    console.log(`clicked`)
    let newTask = {
        name: taskNameInput.value,
        category: categoryInput.value,
        deadline: deadlineInput.value,
        status: statusSelect.value,
    }
    console.log(newTask);
    renderTask(newTask);
})

//make a function to render a task li
function renderTask(task){
    let newTaskItem = document.createElement(`li`);
    newTaskItem.innerHTML = `<span>${task.name}</span><span>${task.category}</span><span>${task.deadline}</span><span>${task.status}</span><button id="delete-task">Delete</button>`;
    taskList.appendChild(newTaskItem);
}
