
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const activeTasks = document.getElementById("activeTasks");

const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounters() {

    totalTasks.textContent = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    completedTasks.textContent = completed;

    activeTasks.textContent = tasks.length - completed;
}

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {

        filteredTasks = tasks.filter(task => !task.completed);

    } else if (currentFilter === "completed") {

        filteredTasks = tasks.filter(task => task.completed);

    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.dataset.id = task.id;

        li.innerHTML = `

            <span>${task.text}</span>

            <div class="buttons">

                <button class="complete">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button class="edit">
                    Edit
                </button>

                <button class="delete">
                    Delete
                </button>

            </div>

        `;

        taskList.appendChild(li);

    });

    updateCounters();
}

addTaskBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if (text === "") {

        alert("Please enter a task.");

        return;

    }

    const newTask = {

        id: Date.now(),

        text: text,

        completed: false

    };

    tasks.push(newTask);

    saveTasks();

    renderTasks();

    taskInput.value = "";

});

taskInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        addTaskBtn.click();

    }

});

taskList.addEventListener("click", function (e) {

    const li = e.target.closest(".task");

    if (!li) return;

    const id = Number(li.dataset.id);

    const task = tasks.find(t => t.id === id);

    // Delete
    if (e.target.classList.contains("delete")) {

        tasks = tasks.filter(t => t.id !== id);

    }

    // Edit
    else if (e.target.classList.contains("edit")) {

        const updated = prompt("Edit Task", task.text);

        if (updated !== null && updated.trim() !== "") {

            task.text = updated.trim();

        }

    }

    // Complete
    else if (e.target.classList.contains("complete")) {

        task.completed = !task.completed;

    }

    saveTasks();

    renderTasks();

});

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        currentFilter = this.dataset.filter;

        renderTasks();

    });

});

renderTasks();