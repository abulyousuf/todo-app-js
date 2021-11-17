let tasksDetails = [];

const form = document.querySelector("#form");
const task = document.querySelector("#task");
const required = document.querySelector("#required");

task.addEventListener("keyup", () => {
    if (task.value !== "") {
        required.textContent = "";
    }
});

const addTask = (event) => {
    event.preventDefault();

    const dueDate = document.querySelector("#due-date");

    if (task.value === "") {
        required.textContent = "Required!";
    } else {
        let date = "";

        if (dueDate.value !== "") {
            const year = dueDate.value.slice(0, 4);
            const month = dueDate.value.slice(5, 7);
            const day = dueDate.value.slice(8);

            date = `${day}/${month}/${year}`;
        }

        const taskDetails = {
            taskDescription: task.value,
            taskDueDate: date,
            completed: false,
            id: Math.floor(Math.random() * Date.now())
        };

        tasksDetails.push(taskDetails);
        // console.log(tasksDetails);

        task.value = "";
        dueDate.value = "";
        task.focus();
    }
};

form.addEventListener("submit", addTask);