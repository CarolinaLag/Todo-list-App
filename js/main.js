class Todo {
  constructor(name) {
    // this.id = id;
    this.name = name;
    this.completed = false;
  }
}

let todos = [];
let doneTodos = [];

window.onload = function () {
  sortBtn.addEventListener("click", sortTodos);

  let todo = new Todo("handla");
  todos.push(todo);

  document.getElementById("button").addEventListener("click", addTodo);
  createHTML();
  createRestoreList();
  //getFromLocalStorage();
};

function addTodo() {
  let todoInput = document.getElementById("todoInput").value;
  let newTodo = new Todo(todoInput);

  todos.push(newTodo);
  addToLocalStorage(todos);

  //   todoInput.value = "";
  document.getElementById("todoInput").value = "";

  createHTML();
}

function createHTML() {
  let list = document.getElementById("toDoList");

  list.innerHTML = ""; //resetting the list

  for (let i = 0; i < todos.length; i++) {
    //Create todo DIV
    let todoDiv = document.createElement("div");
    todoDiv.className = "todo";
    list.appendChild(todoDiv);

    //Create li
    if (todos[i].completed == false) {
      let li = document.createElement("li");
      li.className = "todo-item";
      todoDiv.appendChild(li);
      li.appendChild(document.createTextNode(todos[i].name));

      //Create Check Marked Button
      let completedButton = document.createElement("button");
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.className = "completeBtn";

      todoDiv.appendChild(completedButton);
      //Create Check Trash Button
      let trashButton = document.createElement("button");
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.type = "button";
      trashButton.className = "trashBtn";
      todoDiv.appendChild(trashButton);

      trashButton.addEventListener("click", () => {
        deleteTodo(todos[i]);
      });
      completedButton.addEventListener("click", () => {
        doneTodo(todos[i]);
      });
    }
  }
}

function deleteTodo(todo) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].name == todo.name) {
      todos.splice(i, 1);
    }
    createHTML();
    // addToLocalStorage(todos);
  }
}
function deleteDoneTodo(todo) {
  for (let i = 0; i < doneTodos.length; i++) {
    if (doneTodos[i].name == todo.name) {
      doneTodos.splice(i, 1);
    }
    createRestoreList();
    // addToLocalStorage(todos);
  }
}

function doneTodo(todo) {
  if (todo.completed == false) {
    todo.completed = true;
  } else {
    todo.completed = false;
  }
  if (todo.completed == true)
    for (let i = 0; i < todos.length; i++) {
      if (todos[i] == todo) {
        doneTodos.push(todo);
        todos.splice(i, 1);
      }
    }
  createHTML();
  createRestoreList();
  // addToLocalStorage(todos);
}

function doneToNotDone(todo) {
  for (let i = 0; i < doneTodos.length; i++) {
    if (todo == doneTodos[i]) {
      todo.completed = !todo.completed;
      todos.push(todo);
      doneTodos.splice(i, 1);
      createHTML();
      createRestoreList();
      // addToLocalStorage(todos);
    }
  }
}

function createRestoreList() {
  let restoreList = document.getElementById("restoreList");

  restoreList.innerHTML = ""; //resetting the list

  for (let i = 0; i < doneTodos.length; i++) {
    //Create todo DIV
    let todoDiv = document.createElement("div");
    todoDiv.className = "todo";
    restoreList.appendChild(todoDiv);

    //Create li
    if (doneTodos[i].completed == true) {
      let li = document.createElement("li");
      li.className = "todo-item";
      todoDiv.appendChild(li);
      li.appendChild(document.createTextNode(doneTodos[i].name));

      //Create Check Marked Button
      let completedButton = document.createElement("button");
      completedButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
      completedButton.className = "completeBtn";

      todoDiv.appendChild(completedButton);
      //Create Check Trash Button
      let trashButton = document.createElement("button");
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.type = "button";
      trashButton.className = "trashBtn";
      todoDiv.appendChild(trashButton);

      trashButton.addEventListener("click", () => {
        deleteDoneTodo(doneTodos[i]);
      });
      completedButton.addEventListener("click", () => {
        doneToNotDone(doneTodos[i]);
      });
    }
  }
}

function sortTodos() {
  todos.sort((a, b) => {
    let todoA = a.name.toLowerCase();
    let todoB = b.name.toLowerCase();
    if (todoA < todoB) {
      return -1;
    }
    if (todoA > todoB) {
      return 1;
    }
    return 0;
  });
  createHTML();
}

function addToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
  createHTML(todos);
}

function getFromLocalStorage() {
  let todoFromLS = localStorage.getItem("todos");
  if (todoFromLS) {
    todos = JSON.parse(todoFromLS);
    createHTML(todos);
  }
}
