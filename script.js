document.addEventListener("DOMContentLoaded", () => {
  loadTasks();

  // ENTER KEY SUPPORT
  document.getElementById("taskInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });
});

// ADD TASK
function addTask() {

  const taskInput = document.getElementById("taskInput");

  const taskText = taskInput.value.trim();

  // EMPTY CHECK
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  // GET TASKS
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  // DUPLICATE CHECK (CASE INSENSITIVE)
  const duplicateTask = tasks.find(task =>
    task.text.toLowerCase() === taskText.toLowerCase()
  );

  if (duplicateTask) {
    alert("Task already exists.");
    return;
  }

  // NEW TASK OBJECT
  const newTask = {
    text: taskText,
    completed: false,
    createdAt: new Date().toLocaleString()
  };

  // PUSH TASK
  tasks.push(newTask);

  // SAVE
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // CLEAR INPUT
  taskInput.value = "";

  // REFRESH UI
  renderTasks();
}

// RENDER TASKS
function renderTasks() {

  const taskList = document.getElementById("taskList");

  taskList.innerHTML = "";

  // GET TASKS
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  // EMPTY STATE
  if (tasks.length === 0) {

    taskList.innerHTML = `
      <p class="empty-message">No tasks available</p>
    `;

    return;
  }

  // LOOP TASKS
  tasks.forEach((task, index) => {

    // CREATE LI
    const li = document.createElement("li");

    // CHECKBOX
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.checked = task.completed;

    checkbox.onchange = () => toggleComplete(index);

    li.appendChild(checkbox);

    // TASK CONTENT CONTAINER
    const taskContent = document.createElement("div");

    taskContent.classList.add("task-content");

    // TASK TEXT
    const span = document.createElement("span");

    span.textContent = task.text;

    // COMPLETED STYLE
    if (task.completed) {
      span.classList.add("completed");
    }

    taskContent.appendChild(span);

    // DATE/TIME
    const date = document.createElement("small");

    date.textContent = `Created: ${task.createdAt}`;

    taskContent.appendChild(date);

    li.appendChild(taskContent);

    // EDIT BUTTON
    const editBtn = document.createElement("button");

    editBtn.innerHTML = `
      <i class="fa-solid fa-pen"></i> Edit
    `;

    editBtn.onclick = () => editTask(index);

    li.appendChild(editBtn);

    // DELETE BUTTON
    const clearBtn = document.createElement("button");

    clearBtn.innerHTML = `
      <i class="fa-solid fa-trash"></i> Delete
    `;
    
    clearBtn.onclick = () => removeTask(index);

    li.appendChild(clearBtn);

    // ADD LI TO UL
    taskList.appendChild(li);
  });

  // UPDATE COUNTER
  updateTaskCounter();
}

// TOGGLE COMPLETE
function toggleComplete(index) {

  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  tasks[index].completed = !tasks[index].completed;

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
}

// REMOVE TASK
function removeTask(index) {

  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  tasks.splice(index, 1);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
}

// EDIT TASK
function editTask(index) {

  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  const updatedText = prompt(
    "Edit your task:",
    tasks[index].text
  );

  // CANCEL CHECK
  if (updatedText === null) {
    return;
  }

  const trimmedText = updatedText.trim();

  // EMPTY CHECK
  if (trimmedText === "") {
    alert("Task cannot be empty.");
    return;
  }

  // DUPLICATE CHECK
  const duplicateTask = tasks.find(
    (task, i) =>
      task.text.toLowerCase() === trimmedText.toLowerCase()
      && i !== index
  );

  if (duplicateTask) {
    alert("Task already exists.");
    return;
  }

  // UPDATE TASK
  tasks[index].text = trimmedText;

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
}

// CLEAR ALL TASKS
function clearAll() {

  const confirmDelete = confirm(
    "Are you sure you want to clear all tasks?"
  );

  if (confirmDelete) {

    localStorage.removeItem("tasks");

    renderTasks();
  }
}

// LOAD TASKS
function loadTasks() {
  renderTasks();
}

// TASK COUNTER
function updateTaskCounter() {

  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  const total = tasks.length;

  const completed = tasks.filter(task => task.completed).length;

  const pending = total - completed;

  // CHECK IF COUNTER EXISTS
  let counter = document.getElementById("taskCounter");

  // CREATE COUNTER IF NOT EXISTS
  if (!counter) {

    counter = document.createElement("div");

    counter.id = "taskCounter";

    document.querySelector(".container").appendChild(counter);
  }

  counter.innerHTML = `
    <p>Total: ${total}</p>
    <p>Completed: ${completed}</p>
    <p>Pending: ${pending}</p>
  `;
}