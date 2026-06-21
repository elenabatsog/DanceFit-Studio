//Make a list where all tasks will be stored
let tasks = [];

//the system detects all HTML elements in the tasks.html page
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

//A task is added when the form is submitted by the user
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    //all data given from the user are being stored
    const newTask = {
        name: taskName.value,
        description: taskDescription.value,
        date: taskDate.value,
        priority: taskPriority.value,
        status: taskStatus.value
    };

    //The task is being added to the list and the system create summary
    //A chart is displayed to the user with all data
    tasks.push(newTask);
    taskForm.reset();
    showTasks();
    updateSummary();
    updateChart();
});

//the system shows only filtering tasks based on their status
filterStatus.addEventListener("change", function() {
    const selectedStatus = filterStatus.value;
    if (selectedStatus === "All") {
        showTasks();
    } else {
        const filteredTasks = tasks.filter(function (task) {
            return task.status === selectedStatus;
        });

        showTasks(filteredTasks);
    }
})

//the system sorts tasks by name or due date
sortTasks.addEventListener("change", function() {
    if (sortTasks.value === "Name") {
        tasks.sort(function (a,b) {

            //the system sorts tasks alphabetically
            return a.name.localeCompare(b.name);
        });
    } else if (sortTasks.value === "Date") {
        tasks.sort(function(a,b) {

            //the system sorts tasks by date
            return new Date(a.date) - new Date(b.date);
        });
    }
})

//Show tasks in the table below
function showTasks(taskList = tasks) {
    taskTableBody.textContent = "";

    //For each task, it creates a new row
    tasks.forEach(function (task) {
        const index = tasks.indexOf(task);
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

        //For each task, an action button is created
        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.classList.add("btn", "btn-success", "btn-sm", "me-1");

        //the selected task is considered as completed
        completeButton.addEventListener("click", function () {
            completeTask(index);
        });

        //a button for editing tasks
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("btn", "btn-warning", "btn-sm", "me-1");

        //the user may edit a specific task
        editButton.addEventListener("click", function() {
            editTask(index);
        });
        
        //a button to delete a selected task
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "btn-sm");

        //the user may delete the task
        deleteButton.addEventListener("click", function() {
            deleteTask(index);
        });

        //the buttons are being integrated in the row with the actions
        actionsCell.appendChild(completeButton);
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        //all cells are added inside the row
        row.appendChild(nameCell);
        row.appendChild(descriptionCell);
        row.appendChild(dateCell);
        row.appendChild(priorityCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);

        //when the row is completed, it is added to the table and the user may see it
        taskTableBody.appendChild(row);   

    });
}

//This shows only the filtered tasks in the table
function showFilteredTasks(filteredTasks) {
    taskTableBody.textContent = "";

    filteredTasks.forEach(function (task) {
        //for each filtered task, a row in the table is created
        const row = document.createElement("tr");

        //all filtered tasks have information in the cell
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

        //it adds cells inside the row
        row.appendChild(nameCell);
        row.appendChild(descriptionCell);
        row.appendChild(dateCell);
        row.appendChild(priorityCell);
        row.appendChild(statusCell);

        //filtered rows are being added to the table
        taskTableBody.appendChild(row);
    });
}


//it updates summary cards
function updateSummary() {
    totalTasks.textContent = tasks.length;

    let pendingCount = 0;
    let completedCount = 0;

    //this function counts how many pending and completed tasks will be
    tasks.forEach(function (task) {
        if (task.status === "Pending") {
            pendingCount++; //if it is true, then it increases
        }

        if (task.status === "Completed") {
            completedCount++;
        }
    });

    //it shows the total number after being updated
    pendingTasks.textContent = pendingCount;
    completedTasks.textContent = completedCount;
}

//It marks a task as completed
function completeTask(index) {
    tasks[index].status = "Completed";

    showTasks();
    updateSummary();
    updateChart();
}

//a user may delete a task if needed
function deleteTask(index) {
    tasks.splice(index,1);

    showTasks();
    updateSummary();
    updateChart();
}

//a user may edit a task if needed
function editTask(index) {
    taskName.value = tasks[index].name;
    taskDescription.value = tasks[index].description;
    taskDate.value = tasks[index].date;
    taskPriority.value = tasks[index].priority;
    taskStatus.value = tasks[index].status;

    //this function removes the old version of the task
    tasks.splice(index, 1);
    showTasks();
    updateSummary();
    updateChart();
}

//Task Analytics part of the project & creation of chart
let taskChart;
function updateChart() {
    const chartElement = document.querySelector("#taskChart");
    
    //if an element does not exist then the function is not running
    if (!chartElement) {
        return;
    }

    //counting tasks to update the chart afterwards
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

    //before we create a chart, we delete the previous one
    if (taskChart) {
        taskChart.destroy();
    }

    //Creation of bar chart with both categories of tasks
    taskChart = new Chart(chartElement, {
        type: "bar",
        data: {
            labels: ["Pending", "Completed"],
            datasets: [{
                label: "Number of Tasks",
                data: [pendingCount, completedCount]
            }] //the system uses simple labels, so it is more understandable
        }
    });
}
