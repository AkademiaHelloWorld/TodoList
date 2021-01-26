window.onload = function () {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    const todoListContainer = document.getElementById("todoListContainer");

    for (let i = 0; i < todos.length; i++) {
        const id = todos[i].id;
        const todo = todos[i].todo;
        let labelClasses;
        if(todos[i].done) {
            labelClasses = 'todoLabel todoLabelCrossed';
        } else {
            labelClasses = 'todoLabel';
        }

        todoListContainer.innerHTML +=
            `<div class="todoContainer" id="todoContainer${id}">
                <button class="todoButton" id="todoButton${id}" onclick="deleteTodo(${id})">x</button>
                <input type="checkbox" class="todoCheckbox" id="todoCheckbox${id}" onchange="changeCheckbox(${id})">
                <label class="${labelClasses}" id="todoLabel${id}">${todo}</label>
            </div>`
    }
}

function changeInput(event) {
    const todoInput = document.getElementById("todoInput");
    const todoButton = document.getElementById("inputButton");

    if (todoInput.value === '') {
        todoButton.style.display = "none";
    } else {
        todoButton.style.display = "inline";
    }

    if (event.keyCode === 13) {
        addTodo();
    }
}

function addTodo() {
    const todoInput = document.getElementById("todoInput");
    const todoListContainer = document.getElementById("todoListContainer");
    const todoContainers = document.getElementsByClassName("todoContainer");
    const inputButton = document.getElementById("inputButton");

    todoListContainer.innerHTML +=
        `<div class="todoContainer" id="todoContainer${todoContainers.length + 1}">
            <button class="todoButton" id="todoButton${todoContainers.length + 1}" onclick="deleteTodo(${todoContainers.length + 1})">x</button>
            <input type="checkbox" class="todoCheckbox" id="todoCheckbox${todoContainers.length + 1}" onchange="changeCheckbox(${todoContainers.length + 1})">
            <label class="todoLabel" id="todoLabel${todoContainers.length + 1}">${todoInput.value}</label>
        </div>`



    // todos = [
    //     {id: 1, todo: "Jakies zadanie", done: true},
    //     {id: 2, todo: " Drugie Jakies zadanie", done: true},
    //     {id: 3, todo: " Drugie Jakies zadanie", done: true},
    //     {id: 4, todo: " Drugie Jakies zadanie", done: true}
    // ]

    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    let currentIndex;

    if (todos.length === 0) {
        currentIndex = 0;
    } else {
        currentIndex = todos[todos.length - 1].id;
    }

    todos.push({ id: currentIndex + 1, todo: todoInput.value, done: false });

    localStorage.setItem("todos", JSON.stringify(todos));

    todoInput.value = '';
    inputButton.style.display = "none";
}

function deleteTodo(id) {
    const container = document.getElementById(`todoContainer${id}`);
    container.remove();

    const todos = JSON.parse(localStorage.getItem("todos"));

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos.splice(i, 1);
        }
    }

    localStorage.setItem("todos", JSON.stringify(todos));
}

function changeCheckbox(id) {
    const checkbox = document.getElementById(`todoCheckbox${id}`);
    const label = document.getElementById(`todoLabel${id}`);

    if (checkbox.checked) {
        label.classList.add("todoLabelCrossed");
    } else {
        label.classList.remove("todoLabelCrossed");
    }

    const todos = JSON.parse(localStorage.getItem("todos"));

    for (let i = 0; i < todos.length; i++) {
        if(todos[i].id === id) {
            if(todos[i].done === true) {
                todos[i].done = false;
            } else {
                todos[i].done = true;
            }
        }
    }

    localStorage.setItem("todos", JSON.stringify(todos));
}
