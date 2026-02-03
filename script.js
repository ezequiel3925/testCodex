const form = document.querySelector(".task-form");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");
const clearCompleted = document.querySelector("#clearCompleted");
const emptyState = document.querySelector("#emptyState");

const tasks = [
  { label: "Revisar el correo", done: false },
  { label: "Preparar la lista del mercado", done: true },
];

const renderTasks = () => {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "task-item";
    if (task.done) {
      item.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      task.done = !task.done;
      renderTasks();
    });

    const text = document.createElement("p");
    text.className = "task-text";
    text.textContent = task.label;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Eliminar";
    removeButton.addEventListener("click", () => {
      const index = tasks.indexOf(task);
      if (index > -1) {
        tasks.splice(index, 1);
        renderTasks();
      }
    });

    actions.appendChild(removeButton);
    item.append(checkbox, text, actions);
    taskList.appendChild(item);
  });

  const pending = tasks.filter((task) => !task.done).length;
  taskCount.textContent =
    pending === 1 ? "1 tarea pendiente" : `${pending} tareas pendientes`;
  emptyState.hidden = tasks.length > 0;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = taskInput.value.trim();
  if (!value) {
    return;
  }

  tasks.unshift({ label: value, done: false });
  taskInput.value = "";
  renderTasks();
});

clearCompleted.addEventListener("click", () => {
  const remaining = tasks.filter((task) => !task.done);
  tasks.length = 0;
  tasks.push(...remaining);
  renderTasks();
});

renderTasks();
