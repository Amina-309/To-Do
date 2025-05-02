// Load existing tasks
window.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("taskList");
  if (stored) {
    JSON.parse(stored).forEach(t => addToDOM(t.text, t.completed));
  }
});

function saveTasks() {
  const taskElements = document.querySelectorAll("#taskItems li");
  const data = Array.from(taskElements).map(li => ({
    text: li.dataset.text,
    completed: li.classList.contains("done")
  }));
  localStorage.setItem("taskList", JSON.stringify(data));
}

function createTask() {
  const input = document.getElementById("newTask");
  const content = input.value.trim();
  if (content === "") return;

  const currentTasks = Array.from(document.querySelectorAll("#taskItems li")).map(li => li.dataset.text);
  if (currentTasks.includes(content)) {
    alert("Task already exists.");
    return;
  }

  addToDOM(content);
  input.value = "";
  saveTasks();
}

function addToDOM(text, completed = false) {
  const item = document.createElement("li");
  item.className = "task";
  if (completed) item.classList.add("done");
  item.dataset.text = text;

  const label = document.createElement("span");
  label.textContent = text;
  label.addEventListener("click", () => {
    item.classList.toggle("done");
    saveTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => {
    item.remove();
    saveTasks();
  });

  const actions = document.createElement("div");
  actions.className = "task-controls";
  actions.appendChild(delBtn);

  item.appendChild(label);
  item.appendChild(actions);
  document.getElementById("taskItems").appendChild(item);
}

function cleanDuplicates() {
  const seen = new Set();
  document.querySelectorAll("#taskItems li").forEach(li => {
    const text = li.dataset.text;
    if (seen.has(text)) {
      li.remove();
    } else {
      seen.add(text);
    }
  });
  saveTasks();
}
