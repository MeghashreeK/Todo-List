let work = JSON.parse(localStorage.getItem("work")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const deleteButton = document.getElementById("deleteButton");
const addButton = document.querySelector(".btn");

document.addEventListener("DOMContentLoaded", function () {
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTask);
    displayTask();
});
function addTask() {
    if(todoInput.value=="")
    {
        alert("Please enter a task");
    }
    else{
    const newTask = todoInput.value.trim();
    if (newTask !== "") {
        work.push(
            {
                text: newTask,
                disabled: false,
            }
        );
        saveToLocalStorage();
        todoInput.value = "";
        displayTask();
    }
}
}
function saveToLocalStorage() {
    localStorage.setItem("work", JSON.stringify(work));
}
function displayTask() {
    todoList.innerHTML = "";
    work.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `<div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked":""}>
        <p id="todo-${index}" id="para"class="${item.disabled ? "disabled":""}">${item.text}</p>
        <div class="options">
        <button class="btn" onClick="editTask(${index})">Edit</button>
        <button class="btn" onClick="deleteTask(${index})">Delete</button>
        </div>
        </div>`;
        p.querySelector(".todo-checkbox").addEventListener("change",()=>{
            toggleTask(index);
        });
        todoList.appendChild(p);
    });
    todoCount.textContent=todo.length;
}
function editTask(index){
    todoInput.value=work[index].text;
    work.splice(index,1);
    saveToLocalStorage();
    displayTask();
}
function deleteTask(index){
    work.splice(index,1);
    saveToLocalStorage();
    displayTask();
}
function toggleTask(index){
    work[index].disabled=!work[index].disabled;
    saveToLocalStorage();
    displayTask();
}
function deleteAllTask() {
work=[];
saveToLocalStorage();
displayTask();
}