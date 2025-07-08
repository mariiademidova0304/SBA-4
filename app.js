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
        buttonBox.innerHTML = `<button class="not-started">Not Started</button>
        <button class="in-progress">In Progress</button>
        <button class="completed">Completed</button>
        <button class="all-tasks">All Tasks</button>`;
    }
})

//adding event listener for Task Button to create and object, push it into the array and save to local storage
addTaskButton.addEventListener(`click`, () => {
    let newTask = {
        name: taskNameInput.value,
        category: categoryInput.value,
        deadline: deadlineInput.value,
        status: statusSelect.value,
        ///////////////added and id to change tasks later
        id: Date.now().toString(36) + Math.floor(Math.random() * 100).toString(36),
    }
    //adding buttons when a task is added - need to modify so it doesn't run every time?
    buttonBox.innerHTML = `<button class="not-started">Not Started</button>
        <button class="in-progress">In Progress</button>
        <button class="completed">Completed</button>
        <button class="all-tasks">All Tasks</button>`;
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
    //checking whether the task is overdue and adding a badge
    let overdueId = checkOverdue(task, newTaskItem);
    // if (overdueId !== null){
    //     const overdueBadge = document.createElement(`span`);
    //     overdueBadge.innerText = "Overdue";
    //     overdueBadge.className = `badge bg-danger`;
    //     newTaskItem.appendChild(overdueBadge);
    // }
    taskList.appendChild(newTaskItem);
}

//////adding event listener for changes in status
taskList.addEventListener(`change`, (event) => {
    const updatedStatus = event.target.value;
    const updatedTask = event.target.closest(`li`);
    const updatedTaskId = updatedTask.id;
    const updTaskObject = tasks.find((task) => task.id === updatedTaskId);
    updTaskObject.status = updatedStatus;
    localStorage.setItem(`existingTasks`, JSON.stringify(tasks));
    checkOverdue(updTaskObject,updatedTask);
})

//adding event listener to the button box to filter tasks
buttonBox.addEventListener(`click`, (event) => {
    let filterStatus = event.target.className;
    let filteredTasks;

    switch (filterStatus) {
        case `not-started`: filteredTasks = tasks.filter((task) => task.status === `not started`);
            break;
        case `in-progress`: filteredTasks = tasks.filter((task) => task.status === `in progress`);
            break;
        case `completed`: filteredTasks = tasks.filter((task) => task.status === `completed`);
            break;
        case `all-tasks`: filteredTasks = tasks;
    }
    taskList.innerHTML = ``;
    filteredTasks.forEach((task) => {
        renderTask(task);
    })
})

//checking if a task is overdue and returning either task's id or null
function checkOverdue(task, taskLiItem) {
    const currentDate = new Date();
    const taskDeadline = new Date(task.deadline);
    if (task.status !== `completed`) {
        if (currentDate.getTime() > taskDeadline.getTime()) {
            const overdueBadge = document.createElement(`span`);
            overdueBadge.innerText = "Overdue";
            overdueBadge.className = "badge bg-danger";
            taskLiItem.appendChild(overdueBadge);
        } else {
            return;
        }
    }
}


