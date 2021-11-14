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
    const taskList = document.querySelector("#task-list");

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

        taskList.innerHTML += `<li><a href="#">${task.value} ${date}</a></li>`;
        task.value = "";
        dueDate.value = "";
    }
};

form.addEventListener("submit", addTask);