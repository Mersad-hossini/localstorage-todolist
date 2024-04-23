let input = document.getElementById("itemInput");
let addBtn = document.getElementById("addButton");
let clearBtn = document.getElementById("clearButton");
let ul_todoList = document.getElementById("todoList");
let todoArry = [];

function addTodo() {
  let inputValue = input.value;

  if (inputValue.trim()) {
    let todoObj = {
      id: todoArry.length + 1,
      content: inputValue,
      status: false,
    };

    input.value = "";
    input.focus();
    todoArry.push(todoObj);
    addToLocalStorage(todoArry);
    generatTodo(todoArry);
  } else {
  }
}

function addToLocalStorage(todoArry) {
  localStorage.setItem("todos", JSON.stringify(todoArry));
}

function generatTodo(todoArry) {
  ul_todoList.innerHTML = "";
  todoArry.forEach((todo) => {
    if (todo.status) {
      ul_todoList.insertAdjacentHTML(
        "beforeend",
        `<li class="uncompleted well">
            <label>${todo.content}</label>
            <button class="btn btn-success" onclick='completeState(${todo.id})'>UnComplete</button>
            <button class="btn btn-danger" onclick='deleteTodo(${todo.id})'>Delete</button>
          </li>`
      );
    } else {
      ul_todoList.insertAdjacentHTML(
        "beforeend",
        `<li class="completed well">
              <label>${todo.content}</label>
              <button class="btn btn-success" onclick='completeState(${todo.id})'>Complete</button>
              <button class="btn btn-danger" onclick='deleteTodo(${todo.id})'>Delete</button>
            </li>`
      );
    }
  });
}

function clearAll() {
  todoArry = [];
  generatTodo(todoArry);
  localStorage.removeItem("todos");
}

function addTodoKey(e) {
  if (e.keyCode === 13) {
    addTodo();
  }
}

function completeState(todoId) {
  let localTodo = JSON.parse(localStorage.getItem("todos"));
  todoArry = localTodo;

  todoArry.forEach((todo) => {
    if (todo.id === todoId) {
      todo.status = !todo.status;
    }
  });

  addToLocalStorage(todoArry);
  generatTodo(todoArry);
}

function deleteTodo(todoId) {
  let localTodo = JSON.parse(localStorage.getItem("todos"));
  todoArry = localTodo;

  let mainIndex = todoArry.findIndex((todo) => {
    return todo.id === todoId;
  });
  todoArry.splice(mainIndex, 1);

  addToLocalStorage(todoArry);
  generatTodo(todoArry);
}

window.addEventListener("load", () => {
  let localTodo = JSON.parse(localStorage.getItem("todos"));
  if (localTodo) {
    todoArry = localTodo;
  } else {
    todoArry = [];
  }
  generatTodo(todoArry);
});

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", addTodoKey);
clearBtn.addEventListener("click", clearAll);