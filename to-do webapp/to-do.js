let tasks = [];

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  tasks = saved ? JSON.parse(saved) : [];
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const desc = document.getElementById("taskDesc").value.trim();
  if (!title) return;

  tasks.push({ title, desc, done: false });
  saveTasks();
  renderTasks();

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDesc").value = "";
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const headerDiv = document.createElement("div");
    headerDiv.className = "task-header";

    const leftDiv = document.createElement("div");
    leftDiv.style.display = "flex";
    leftDiv.style.alignItems = "center";
    leftDiv.style.gap = "8px";

    const doneBadge = document.createElement("span");
    doneBadge.textContent = "Done";
    doneBadge.className = "done-badge";
    doneBadge.style.visibility = task.done ? "visible" : "hidden";


    const titleSpan = document.createElement("span");
    titleSpan.className = "title";
    titleSpan.textContent = task.title;

    leftDiv.appendChild(doneBadge);
    leftDiv.appendChild(titleSpan);

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    headerDiv.appendChild(leftDiv);

    const rightDiv = document.createElement("div");
    rightDiv.style.display = "flex";
    rightDiv.style.alignItems = "center";
    rightDiv.style.gap = "6px";
    
    doneBadge.textContent = "Done";
    doneBadge.className = "done-badge";
    doneBadge.style.display = task.done ? "inline-block" : "none";
    
    rightDiv.appendChild(doneBadge);
    rightDiv.appendChild(editBtn);
    rightDiv.appendChild(deleteBtn);
    
    headerDiv.appendChild(rightDiv);
    

    const descPara = document.createElement("p");
    descPara.className = "description";
    descPara.textContent = task.desc;

    li.appendChild(headerDiv);
    if (task.desc) li.appendChild(descPara);

    li.onclick = function (e) {
      if (![deleteBtn, editBtn].includes(e.target)) {
        task.done = !task.done;
        saveTasks();
        renderTasks();
      }
    };

    list.appendChild(li);
  });
}

function editTask(index) {
  const task = tasks[index];

  const newTitle = prompt("Edit Title:", task.title);
  if (newTitle === null || newTitle.trim() === "") return;

  const newDesc = prompt("Edit Description:", task.desc);
  if (newDesc === null) return;

  tasks[index].title = newTitle.trim();
  tasks[index].desc = newDesc.trim();
  saveTasks();
  renderTasks();
}

window.onload = loadTasks;
