//Make a list where all tasks will be stored
let tasks = [];

const taskForm = document.querySelector("#taskForm");
const taskName = document.querySelector("#taskName");
const taskDescription = document.querySelector("#taskDescription");
const taskDate = document.querySelector("#taskDate");
const taskPriority = document.querySelector("#taskPriority");
const taskStatus = document.querySelector("#taskStatus");
const filterStatus = document.querySelector("#filterStatus");
const sortTasks = document.querySelector("#sortTasks");
const taskTableBody = document.querySelector("#taskTableBody");
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
    updateChart();
});

//filtering tasks 
filterStatus.addEventListener("change", function() {
    const selectedStatus = filterStatus.value;
    if (selectedStatus === "All") {
        showTasks();
    } else {
        const filteredTasks = tasks.filter(function (task) {
            return task.status === selectedStatus;
        });

        showFilteredTasks(filteredTasks);
    }
})

sortTasks.addEventListener("change", function() {
    if (sortTasks.value === "Name") {
        tasks.sort(function (a,b) {
            return a.name.localeCompare(b.name);
        });
    } else if (sortTasks.value === "Date") {
        tasks.sort(function(a,b) {
            return new Date(a.date) - new Date(b.date);
        });
    }
})

//Show tasks in the table below
function showTasks() {
    taskTableBody.textContent = "";

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
            completeTask(index);
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

        taskTableBody.appendChild(row);   

    });
}

//This shows only the filtered tasks in the table
function showFilteredTasks(filteredTasks) {
    taskTableBody.textContent = "";

    filteredTasks.forEach(function (task) {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = task.name;

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = task.description;

        const dateCell = document.createElement("td");
        dateCell.textContent = task.date;

        const priorityCell = document.createElement("td");
        priorityCell.textContent = task.priority;

        const statusCell = document.createElement("td");
        statusCell.textContent = task.status;

        row.appendChild(nameCell);
        row.appendChild(descriptionCell);
        row.appendChild(dateCell);
        row.appendChild(priorityCell);
        row.appendChild(statusCell);

        taskTableBody.appendChild(row);
    });
}


//update summary cards
function updateSummary() {
    totalTasks.textContent = tasks.length;

    let pendingCount = 0;
    let completedCount = 0;

    tasks.forEach(function (task) {
        if (task.status === "Pending") {
            pendingCount++;
        }

        if (task.status === "Completed") {
            completedCount++;
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
    updateChart();
}

//delete a task if needed
function deleteTask(index) {
    tasks.splice(index,1);

    showTasks();
    updateSummary();
    updateChart();
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
    updateChart();
}

//Task Analytics part of the project. creation of chart
let taskChart;
function updateChart() {
    const chartElement = document.querySelector("#taskChart");
    if (!chartElement) {
        return;
    }

    let pendingCount = 0;
    let completedCount = 0;

    tasks.forEach(function (task) {
        if (task.status === "Pending") {
            pendingCount++;
        }

        if (task.status === "Completed") {
            completedCount++;
        }
    });

    if (taskChart) {
        taskChart.destroy();
    }

    taskChart = new Chart(chartElement, {
        type: "bar",
        data: {
            labels: ["Pending", "Completed"],
            datasets: [{
                label: "Number of Tasks",
                data: [pendingCount, completedCount]
            }]
        }
    });
}
