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
        taskName: taskNameInput.value,
        taskCategory: categoryInput.value,
        taskDeadline: deadlineInput.value,
        taskStatus: statusSelect.value,
    }
    console.log(newTask);
})
