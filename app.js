const toDoForm = document.querySelector("form");
const add = document.getElementById("add-button");
const toDoList = document.getElementById('todo-list');
const todoInput = document.getElementById('ToDo-input');
const todolistUL = document.getElementById('todo-list');

let allToDo = getToDo();
updateToDoList();

toDoForm.addEventListener("submit", function(e){
    e.preventDefault();
    addToDo();
});

function addToDo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        allToDo.push({ text: todoText, checked: false });
        updateToDoList();
        saveToDo();
        todoInput.value = "";
    }
}

function updateToDoList() {
    todolistUL.innerHTML = "";
    allToDo.forEach((todo, todoIndex) => {
        const todoItem = createToDoItem(todo, todoIndex);
        todolistUL.append(todoItem);
    });
}

function createToDoItem(todo, todoIndex) {
    const todoID = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    todoLI.className = "todo";
    
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoID}" ${todo.checked ? 'checked' : ''}>
        <label class="custom-checkbox" for="${todoID}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <label for="${todoID}" class="todo-text">${todo.text}</label>
        <button class="delete-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    `;
    
    // Add event listener for delete button
    const deleteBtn = todoLI.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        deleteToDo(todoIndex);
    });

    // Add event listener for checkbox
    const checkbox = todoLI.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
        toggleCheck(todoIndex);
    });
    
    return todoLI;
}

function deleteToDo(todoIndex) {
    allToDo.splice(todoIndex, 1); // Remove item from array
    saveToDo(); // Save updated list to localStorage
    updateToDoList(); // Re-render list
}

function toggleCheck(todoIndex) {
    allToDo[todoIndex].checked = !allToDo[todoIndex].checked; // Toggle the checked state
    saveToDo(); // Save updated list to localStorage
    updateToDoList(); // Re-render list to reflect changes
}

function saveToDo() {
    const todoJson = JSON.stringify(allToDo);
    localStorage.setItem("todos", todoJson);
}

function getToDo() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}
