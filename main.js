
// array of task objects
let tasks = [

]

tasks = readTasksFromLocalStorage();


// current task index 
let currentTaskIdx = -1;

// select tasks div 
let tasksDiv = document.querySelector(".tasks");

/* display tasks function */
function fillTasksOnTheTable(){
    tasksDiv.innerHTML = ""; // to clear everything before start appending tasks
    let index = 0; // index of the task in the table
    for(task of tasks){
        let taskContent = `
        <!-- Task -->
        <div class="task${task.isDone ? ' done' : ''}">
            <!-- Task Info -->
            <div class="task-info">
                <h2>${task.title}</h2>
                <div class="info-date">
                    <span class="material-symbols-outlined">calendar_month</span>
                    <span>${task.date}</span>
                </div>
            </div>
            <!-- End Task Info -->
    
            <!-- Task Actions -->
            <div class="task-actions" >
    
                <button class="circular del-button" onclick="deleteTask(${index})">
                    <span class="material-symbols-outlined">delete</span>
                </button>
    
                ${task.isDone? `<button class="circular cancelSelection-button" onclick="toggleTaskCompletionState(${index})">
                <span class="material-symbols-outlined">cancel</span>
            </button>` :
             `<button class="circular select-button" onclick="toggleTaskCompletionState(${index})">
                    <span class="material-symbols-outlined">done</span>
                </button>`}
                
    
                <button class="circular edit-button" onclick="viewUpdateTaskPage(${index})">
                    <span class="material-symbols-outlined">edit_note</span>
                </button>
            </div>
            <!-- End Task Actions -->
    
        </div>
        <!-- End Task -->
        `;
    
        tasksDiv.innerHTML += taskContent;
        index += 1;
    }
}

// call fill tasks function
fillTasksOnTheTable();


// function to save Tasks in the local storage
function saveTasksToLocalStorage(){
    // save tasks into the local storage (key, val)
    let tasksString = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksString);
}

function readTasksFromLocalStorage(){
    return JSON.parse(localStorage.getItem("tasks")) ?? [];
}



// adding task button -> view add page
document.querySelector(".add-button").addEventListener("click", function(){
    document.querySelector(".adding-task input").value = "";
    document.querySelector(".error-msg").style.cssText = `display: none`;
    // hide update,tasks and show add
    tasksDiv.style.cssText = `display: none`;
    document.querySelector(".updating-task").style.cssText = `display: none`;
    document.querySelector(".adding-task").style.cssText = `display: block`;
});

// back button in add -> view tasks page
document.querySelector(".adding-task button:last-child").addEventListener("click", function(){
    tasksDiv.style.cssText = `display: block`;
    document.querySelector(".adding-task").style.cssText = `display: none`;
    document.querySelector(".updating-task").style.cssText = `display: none`;
});

// back button in update -> view tasks page
document.querySelector(".updating-task button:last-child").addEventListener("click", function(){
    document.querySelector(".updating-task input").value = "";
    document.querySelector(".updateError-msg").style.cssText = `display: none`;
    tasksDiv.style.cssText = `display: block`;
    document.querySelector(".updating-task").style.cssText = `display: none`;
    document.querySelector(".adding-task").style.cssText = `display: none`;

});



// adding button in the add page
document.querySelector(".adding-task button:first-child").addEventListener("click", function(){
    let userInCorrect = false;
    let taskName = document.querySelector(".adding-task input").value;
    // get task fill date
    let now = new Date()
    let taskDate = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDay()} | ${now.getHours()}:${now.getMinutes()}`;
    // validation
    if(taskName !== ""){
        userInCorrect = true;
    }

    // adding task
    if(!userInCorrect){
        document.querySelector(".error-msg").style.cssText = `display: block`;
    } else{
        let taskObj = {
            "title": `${taskName}`,
            "date" : `${taskDate}`,
            "isDone": false,
        };
        tasks.push(taskObj);
        saveTasksToLocalStorage();
        fillTasksOnTheTable();
        document.querySelector(".adding-task input").value = "";
        tasksDiv.style.cssText = `display: block`;
        document.querySelector(".adding-task").style.cssText = `display: none`;
    }
})

// deleting task 
function deleteTask(index){
    let isConfirmed = confirm("هل أنت متاكد من حذف المهمة: " + tasks[index].title);
    if (isConfirmed){
        tasks.splice(index, 1);
        saveTasksToLocalStorage();
        fillTasksOnTheTable();
    }
}

// updating task page
function viewUpdateTaskPage(index){
    tasksDiv.style.cssText = `display: none`;
    document.querySelector(".updating-task").style.cssText = `display: block`;
    currentTaskIdx = index;
}

// update task
document.querySelector(".updating-task button:first-child").addEventListener("click", function(){
    let index = currentTaskIdx;
    let userInCorrect = false;
    let taskName = document.querySelector(".updating-task input").value;
    console.log(taskName);
    // validation
    if(taskName !== ""){
        userInCorrect = true;
    }

    // updating task
    if(!userInCorrect){
        document.querySelector(".updateError-msg").style.cssText = `display: block`;
    } else{
        tasks[index].title = taskName;
        saveTasksToLocalStorage();
        fillTasksOnTheTable();
        document.querySelector(".updating-task input").value = "";
        document.querySelector(".updateError-msg").style.cssText = `display: none`;
        tasksDiv.style.cssText = `display: block`;
        document.querySelector(".updating-task").style.cssText = `display: none`;
    }

});


function toggleTaskCompletionState(index){
    let task = tasks[index];
    task.isDone = !task.isDone;
    saveTasksToLocalStorage();
    fillTasksOnTheTable();
}
