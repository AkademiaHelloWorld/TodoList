function changeInput() {
    const todoInput = document.getElementById("todoInput");
    const todoButton = document.getElementById("inputButton");

    if (todoInput.value === '') {
        todoButton.style.display = "none";
    } else {
        todoButton.style.display = "inline";
    }
}