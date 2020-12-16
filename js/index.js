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

    todoInput.value = '';
    inputButton.style.display = "none";

    // todos = [
    //     {id: 1, todo: "Jakies zadanie", done: true},
    //     {id: 2, todo: " Drugie Jakies zadanie", done: true},
    //     {id: 3, todo: " Drugie Jakies zadanie", done: true},
    //     {id: 4, todo: " Drugie Jakies zadanie", done: true}
    // ]

    const todos = JSON.parse(localStorage.getItem("todos") || "[]");

    todos.push({id: 1, todo: "Jakis tekst", done: false});

    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(id) {
    const container = document.getElementById(`todoContainer${id}`);
    container.remove();
}

function changeCheckbox(id) {
    const checkbox = document.getElementById(`todoCheckbox${id}`);
    const label = document.getElementById(`todoLabel${id}`);

    if (checkbox.checked) {
        label.classList.add("todoLabelCrossed");
    } else {
        label.classList.remove("todoLabelCrossed");
    }
}
