//Make a list where all tasks will be stored
let tasks = [];

const taskForm = document.querySelector("#taskForm");
const taskName = document.querySelector("#taskName");
const taskDescription = document.querySelector("#taskDescription");
const taskDate = document.querySelector("#taskDate");
const taskPriority = document.querySelector("#taskPriority");
const taskStatus = document.querySelector("#taskStatus");
const TaskTableBody = document.querySelector("#TaskTableBody");

const totalTasks = document.querySelector("#totalTasks");
const pendingTasks = document.querySelector("#pendingTasks");
const completedTasks = document.querySelector("#completedTasks");

//Add task when the form is submitted by the user
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newTask = {
        name: taskName.value,
        description: taskDescription.value,
        date: taskDate.value,
        priority: taskPriority.value,
        status: taskStatus.value
    };

    tasks.push(newTask);
    taskForm.reset();
    showTasks();
    updateSummary();
});

//Show tasks in the table below
function showTasks() {
    TaskTableBody.textContent = "";

    tasks.forEach(function (task, index) {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.textContent = task.name;

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = task.description;

        const priorityCell = document.createElement("td");
        priorityCell.textContent = task.priority;

        const dateCell = document.createElement("td");
        dateCell.textContent = task.date;

        const statusCell = document.createElement("td");
        statusCell.textContent = task.status;

        const actionsCell = document.createElement("td");

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.classList.add("btn", "btn-success", "btn-sm", "me-1");

        completeButton.addEventListener("click", function () {
            completedTasks(index);
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("btn", "btn-warning", "btn-sm", "me-1");

        editButton.addEventListener("click", function() {
            editTask(index);
        });
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "btn-sm");

        deleteButton.addEventListener("click", function() {
            deleteTask(index);
        });

        actionsCell.appendChild(completeButton);
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(descriptionCell);
        row.appendChild(dateCell);
        row.appendChild(priorityCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);

        TaskTableBody.appendChild(row);   

    });
}

//update summary cards
function updateSummary() {
    totalTasks.textContent = tasks.length;

    let pendingCount = 0;
    let completeCount = 0;

    tasks.forEach(function (task) {
        if (task.status === "Pending") {
            pendingCount++;
        }

        if (task.status === "Completed") {
            completeCount++;
        }
    });

    pendingTasks.textContent = pendingCount;
    completedTasks.textContent = completedCount;
}

//Mark a task as completed
function completeTask(index) {
    tasks[index].status = "Completed";

    showTasks();
    updateSummary();
}

//delete a task if needed
function deleteTask(index) {
    tasks.splice(index,1);

    showTasks();
    updateSummary();
}

//edit a task if needed
function editTask(index) {
    taskName.value = tasks[index].name;
    taskDescription.value = tasks[index].description;
    taskDate.value = tasks[index].date;
    taskPriority.value = tasks[index].priority;
    taskStatus.value = tasks[index].status;

    tasks.splice(index, 1);
    showTasks();
    updateSummary();
}