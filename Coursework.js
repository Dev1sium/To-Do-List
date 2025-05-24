document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add");
    const taskInput = document.getElementById("newTask");
    const taskList = document.getElementById("taskList");
    const removeAllButton = document.getElementById("delete");
 
    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") addTask();
    });

    removeAllButton.addEventListener("click", function() {
        taskList.innerHTML = "";
        saveTasks();
    });
    
    loadTasks();
   
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <input type="checkbox">
            <span>${taskText}</span>
            <button class="delete">X</button>
        `;

        taskList.appendChild(listItem);
        taskInput.value = "";
        
        listItem.querySelector(".delete").addEventListener("click", function () {
            taskList.removeChild(listItem);
            saveTasks();
        });
        
        listItem.querySelector("input[type='checkbox']").addEventListener("change", saveTasks);
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll("li");
        
        taskItems.forEach(function(item) {
            const taskText = item.querySelector("span").textContent;
            const is_Completed = item.querySelector("input[type='checkbox']").checked;
            
            tasks.push({
                text: taskText,
                completed: is_Completed
            });
        });
        
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    function loadTasks() {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            
            tasks.forEach(function(task) {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <input type="checkbox" ${task.completed ? "checked" : ""}>
                    <span>${task.text}</span>
                    <button class="delete">X</button>
                `;
                
                taskList.appendChild(listItem);
                
                listItem.querySelector(".delete").addEventListener("click", function () {
                    taskList.removeChild(listItem);
                    saveTasks(); 
                });
                
                listItem.querySelector("input[type='checkbox']").addEventListener("change", saveTasks);
            });
        }
    }
});
