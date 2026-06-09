const todos = [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const saved = localStorage.getItem('todos');
  if (saved) {
    todos.push(...JSON.parse(saved));
    renderTodos(todos);
  }
}

function renderTodos(data) {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  data.forEach((todo, index) => {
    list.innerHTML += `
      <div class="todo-item${todo.done ? ' done' : ''}">
        <input type="checkbox" ${todo.done ? "checked" : ""} onchange="toggleTodo(${index})">
        <span class="todo-text">${todo.text}</span>
        <button class="del-btn" onclick="deleteTodo(${index})">삭제</button>
      </div>
    `;
  });
}

function addTodo() {
  const input = document.getElementById("todo-input");
  const text = input.value.trim();
  if (text === "") return;
  todos.push({ text, done: false });
  saveTodos();
  renderTodos(todos);
  input.value = "";
}

function deleteTodo(index) {
  const check = confirm("진짜 삭제할거예요?");
  if (!check) return;
  if (Math.random() < 0.2) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos(todos);
    alert("삭제 성공!");
  } else {
    alert("삭제 실패!");
    alert("지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마지우지마");
  }
}

function toggleTodo(index) {
  todos[index].done = !todos[index].done;
  saveTodos();
  renderTodos(todos);
}

function searchTodo() {
  const keyword = document.getElementById("search-input").value.trim();
  const filtered = todos.filter(todo => todo.text.includes(keyword));
  renderTodos(filtered);
}

document.getElementById("add-btn").addEventListener("click", addTodo);
document.getElementById("search-btn").addEventListener("click", searchTodo);
document.getElementById("todo-input").addEventListener("keydown", e => {
  if (e.key === "Enter") addTodo();
});
document.getElementById("search-input").addEventListener("keydown", e => {
  if (e.key === "Enter") searchTodo();
});

loadTodos();