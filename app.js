const taskNameInput = document.getElementById(`task-name`);
const categoryInput = document.getElementById(`task-category`);
const deadlineInput = document.getElementById(`task-deadline`);
const statusSelect = document.getElementById(`task-status`);
const addTaskButton = document.getElementById(`add-task`);
const taskList = document.getElementById(`task-list`);
const buttonBox = document.getElementById(`buttons-container`);

//creating empty array to store tasks
let tasks = [];

//rendering existing tasks on page load
window.addEventListener(`load`, () => {
    let existingTasks = JSON.parse(localStorage.getItem(`existingTasks`));
    if (existingTasks) {
        tasks = existingTasks;
        tasks.forEach((task) => {
            renderTask(task);
        })
        ///////adding a filter button if there are any existing tasks
        const filterButton = document.createElement(`button`);
        filterButton.textContent = "Filter by Status";
        filterButton.classList.add(`filter-status`);
        buttonBox.appendChild(filterButton);
    }
})

//adding event listener for Task Button to create and object, push it into the array and save to local storage
addTaskButton.addEventListener(`click`, () => {
    console.log(`clicked`)
    let newTask = {
        name: taskNameInput.value,
        category: categoryInput.value,
        deadline: deadlineInput.value,
        status: statusSelect.value,
        ///////////////added and id to change tasks later
        id: Date.now().toString(36) + Math.floor(Math.random() * 100).toString(36),
    }
    console.log(newTask);
    renderTask(newTask);
    tasks.push(newTask);
    localStorage.setItem(`existingTasks`, JSON.stringify(tasks));
})

//make a function to render a task li
function renderTask(task) {
    let newTaskItem = document.createElement(`li`);
    /////adding id to allow editing
    newTaskItem.id = task.id;
    newTaskItem.innerHTML = `<span>${task.name}</span><span>${task.category}</span><span>${task.deadline}</span>`;
    //cloning select
    let editableStatus = statusSelect.cloneNode(true);
    editableStatus.value = task.status;
    newTaskItem.appendChild(editableStatus);
    taskList.appendChild(newTaskItem);
}

//////adding event listener for changes in status
taskList.addEventListener(`change`, (event) => {
    const updatedStatus = event.target.value;
    console.log(`current select`, updatedStatus);
    const updatedTask = event.target.closest(`li`);
    const updatedTaskId = updatedTask.id;
    const updTaskObject = tasks.find((task) => task.id === updatedTaskId);
    updTaskObject.status = updatedStatus;
    localStorage.setItem(`existingTasks`, JSON.stringify(tasks));
})


