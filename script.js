document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  if (tasks.find(task => task.text === taskText)) {
    alert("Task already exists.");
    return;
  }

  const newTask = { text: taskText, completed: false };
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleComplete(index);
    li.appendChild(checkbox);

    const span = document.createElement("span");
    span.textContent = task.text;
    li.appendChild(span);

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "CLEAR";
    clearBtn.onclick = () => removeTask(index);
    li.appendChild(clearBtn);

    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function removeTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function clearAll() {
  localStorage.removeItem("tasks");
  renderTasks();
}

function loadTasks() {
  renderTasks();
}
