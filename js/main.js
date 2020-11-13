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
  let todo = new Todo("handla");
  todos.push(todo);

  document.getElementById("button").addEventListener("click", addTodo);
  createHTML();
  createRestoreList();
};

// if (todos[i].name == todo.name) {
//   // toggle the value
//   todos[i].completed = !todos[i].completed;
//   break;
// }

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

      //completedButton.addEventListener("click", () => {
      //  toggle(todos[i]);
      //});

      todoDiv.appendChild(completedButton);
      //Create Check Trash Button
      let trashButton = document.createElement("button");
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.type = "button";
      trashButton.className = "trashBtn";
      todoDiv.appendChild(trashButton);

      trashButton.addEventListener("click", () => {
        deleteCheck(todos[i]);
      });
      completedButton.addEventListener("click", () => {
        toggle(todos[i]);
      });
    }
  }
  // let input = document.getElementById("todoInput");

  // if (input.value.length == 0) input.value = "";
}

function deleteCheck(todo) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].name == todo.name) {
      todos.splice(i, 1);
    }
    createHTML();
  }
}
function deleteDoneTodo(todo) {
  for (let i = 0; i < doneTodos.length; i++) {
    if (doneTodos[i].name == todo.name) {
      doneTodos.splice(i, 1);
    }
    createHTML();
  }
}

// function deleteCheck(todo) {
//   let list = document.getElementById("toDoList");
//   let restoreList = document.getElementById("restoreList");
//   for (let i = 0; i < todos.length; i++) {
//     if (todos[i].name == todo.name) {
//       let removeTodo = todos.splice(i, 1);
//       list.innerHTML = "";
//       for (let i = 0; i < removeTodo.length; i++) {
//         doneTodos.push(removeTodo[i]);
//         for (let i = 0; i < doneTodos.length; i++) {
//           //Create todo DIV
//           let todoDiv = document.createElement("div");
//           todoDiv.className = "todo";
//           restoreList.appendChild(todoDiv);
//           //Create li
//           let li = document.createElement("li");
//           li.className = "todo-item";
//           li.innerHTML = doneTodos[i].name;
//           todoDiv.appendChild(li);
//         }
//         createHTML();
//       }
//     }
//   }
//   addToLocalStorage(todos);
//   getFromLocalStorage();
// }

// toggle the value to completed and not completed
function toggle(todo) {
  // let list = document.getElementById("toDoList");
  // let restoreList = document.getElementById("restoreList");
  //let checkDone = todos.splice(i, 1);
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
}

function doneToNotDone(todo) {
  // let list = document.getElementById("toDoList");
  // let restoreList = document.getElementById("restoreList");
  //let checkDone = todos.splice(i, 1);
  if (todo.completed == true) {
    todo.completed = false;
  } else {
    todo.completed = true;
  }
  if (todo.completed == false) {
    for (let i = 0; i < doneTodos.length; i++) {
      // if (doneTodos[i] == todo) {
      todos.push(doneTodos[i]);
      doneTodos.splice(i, 1);
      // }
    }
  }
  createHTML();
  createRestoreList();
}
// toggle the value

// (todos[i].name == todo.name)

// let checkDone = todos.splice(i, 1);

// list.innerHTML = "";
// createHTML();
// for (let i = 0; i < checkDone.length; i++) {
//   doneTodos.push(checkDone[i]);
//   restoreList.innerHTML = "";
//   for (let i = 0; i < doneTodos.length; i++) {
//     let li = document.createElement("li");
//     li.className = "check-item";
//     restoreList.appendChild(li);
//     li.innerHTML = doneTodos[i].name;
//     restoreList.appendChild(li);

//     //Create todo DIV
//     let todoDiv = document.createElement("div");
//     todoDiv.className = "todo";
//     restoreList.appendChild(todoDiv);
//     //Create Check Marked Button
//     let completedButton = document.createElement("button");
//     completedButton.innerHTML = '<i class="fas fa-check"></i>';
//     completedButton.className = "completeBtn";

//     todoDiv.appendChild(completedButton);
//     //Create Check Trash Button
//     let trashButton = document.createElement("button");
//     trashButton.innerHTML = '<i class="fas fa-trash"></i>';
//     trashButton.type = "button";
//     trashButton.className = "trashBtn";
//     todoDiv.appendChild(trashButton);

//     trashButton.addEventListener("click", () => {
//       deleteCheck(doneTodos[i]);
//     });
//     completedButton.addEventListener("click", () => {
//       toggle(doneTodos[i]);
//     });

// createHTML();
// addToLocalStorage(todos);

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

      //completedButton.addEventListener("click", () => {
      //  toggle(todos[i]);
      //});

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
        // for (let i = 0; i < doneTodos.length; i++) {
        //   doneTodos.splice(i, 1);
        //   todos.push(doneTodos);
        // }
      });
    }
  }
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

// function deleteCheck(todo) {
//   for (let i = 0; i < todos.length; i++) {
//     if (todos[i].name == todo.name) {
//       todos.splice(i, 1);
//     }
//     createHTML();
//   }
// }
