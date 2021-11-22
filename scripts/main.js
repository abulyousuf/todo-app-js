let allTasks = [];
let taskID = "";

const formInput = document.querySelector("#form-input");
const taskInput = document.querySelector("#task-input");
const required = document.querySelector("#required");

taskInput.addEventListener("keyup", () => {
    if (taskInput.value.trim() !== "") {
        required.textContent = "";
        taskInput.focus();
    }
});

const renderTask = (todo) => {
    const todoList = document.querySelector("#todo-list");
    const task = document.querySelector(`[data-key="${todo.id}"]`);

    if (todo.deleted) {
        task.remove();
        return;
    }

    const isCompleted = todo.completed ? "done" : "";

    const liElement = document.createElement("li");

    // need to fix todo-task class

    liElement.setAttribute("class", `todo-task ${isCompleted}`);
    liElement.setAttribute("id", "open-modal");

    liElement.setAttribute("data-key", todo.id);

    liElement.innerHTML = `<a href="#">${todo.taskDescription} ${todo.taskDueDate}</a>`;

    if (task) {
        task.remove();

        const doneList = document.querySelector("#done-list");
        doneList.append(liElement);
    } else {
        todoList.append(liElement);
    }
};

const addNewTask = (event) => {
    event.preventDefault();

    const dueDateInput = document.querySelector("#due-date-input");

    if (taskInput.value.trim() === "") {
        required.textContent = "Required!";
        taskInput.focus();
    } else {
        let date = "";

        if (dueDateInput.value !== "") {
            const year = dueDateInput.value.slice(0, 4);
            const month = dueDateInput.value.slice(5, 7);
            const day = dueDateInput.value.slice(8);

            date = `${day}/${month}/${year}`;
        }

        const newTask = {
            taskDescription: taskInput.value.trim(),
            taskDueDate: date,
            completed: false,
            id: Math.floor(Math.random() * Date.now())
        };

        allTasks.push(newTask);
        renderTask(newTask);

        taskInput.value = "";
        dueDateInput.value = "";
        taskInput.focus();
    }
};

formInput.addEventListener("submit", addNewTask);

document.querySelector("#todo-list").addEventListener("click", (event) => {
    document.querySelector("#overlay").style.display = "block";
    taskID = event.target.parentElement.dataset.key;
});

document.querySelector("#delete-btn").addEventListener("click", () => {
    document.querySelector("#overlay").style.display = "none";

    const index = allTasks.findIndex(task => task.id === Number(taskID));

    const task = {
        deleted: true,
        ...allTasks[index]
    };

    allTasks = allTasks.filter(item => item.id !== Number(taskID));

    renderTask(task);
});

document.querySelector("#complete-btn").addEventListener("click", () => {
    document.querySelector("#overlay").style.display = "none";

    const index = allTasks.findIndex(task => task.id === Number(taskID));

    allTasks[index].completed = !allTasks[index].completed;

    const dateObj = new Date();
    let date = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    if (date >= 1 && date < 10) {
        date = "0" + date;
    }

    if (month >= 1 && month < 10) {
        month = "0" + month;
    }

    allTasks[index].taskDueDate = `${date}/${month}/${year}`;

    renderTask(allTasks[index]);
});