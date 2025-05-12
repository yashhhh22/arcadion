let todos = [];

const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");
const toggleMode = document.getElementById("toggleMode");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ id: Date.now(), title: text, completed: false });
    todoInput.value = "";
    renderTodos();
  }
});

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");

    const itemLeft = document.createElement("section");
    itemLeft.className = "item-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      todo.completed = !todo.completed;
      renderTodos();
    });

    const text = document.createElement("p");
    text.textContent = todo.title;
    text.className = "todo-text";

    itemLeft.appendChild(checkbox);
    itemLeft.appendChild(text);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✕";
    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      renderTodos();
    });

    li.appendChild(itemLeft);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });

  taskCount.textContent = todos.filter((t) => !t.completed).length;
  completedCount.textContent = todos.filter((t) => t.completed).length;
}

toggleMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleMode.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

renderTodos();
