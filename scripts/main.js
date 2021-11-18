let tasksDetails = [];

const form = document.querySelector("#form");
const task = document.querySelector("#task");
const required = document.querySelector("#required");

task.addEventListener("keyup", () => {
    if (task.value.trim() !== "") {
        required.textContent = "";
        task.focus();
    }
});

const renderTask = (taskDisplay) => {
    const taskList = document.querySelector("#task-list");

    const isCompleted = taskDisplay.completed ? "done" : "";

    const liElement = document.createElement("li");

    liElement.setAttribute("class", `task ${isCompleted}`);
    liElement.setAttribute("data-key", taskDisplay.id);

    liElement.innerHTML = `${taskDisplay.taskDescription} ${taskDisplay.taskDueDate}`;
    taskList.append(liElement);
};

const addTask = (event) => {
    event.preventDefault();

    const dueDate = document.querySelector("#due-date");

    if (task.value.trim() === "") {
        required.textContent = "Required!";
        task.focus();
    } else {
        let date = "";

        if (dueDate.value !== "") {
            const year = dueDate.value.slice(0, 4);
            const month = dueDate.value.slice(5, 7);
            const day = dueDate.value.slice(8);

            date = `${day}/${month}/${year}`;
        }

        const taskDetails = {
            taskDescription: task.value.trim(),
            taskDueDate: date,
            completed: false,
            id: Math.floor(Math.random() * Date.now())
        };

        tasksDetails.push(taskDetails);
        renderTask(taskDetails);

        task.value = "";
        dueDate.value = "";
        task.focus();
    }
};

form.addEventListener("submit", addTask);