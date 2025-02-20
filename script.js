let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let mode = 'all';
let filterList = [];

addNullCheck();

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event){
    if (event.key === "Enter" && taskInput.value !== ''){
        addTask();
    }
})

taskInput.addEventListener("keyup", addNullCheck)

tabs.forEach((menu) =>
    menu.addEventListener("click", (event) => underLineMove(event))
);

tabs.forEach((menu) =>
    menu.addEventListener("click", (event) => filter(event))
);


function addNullCheck() {
    if (taskInput.value){
        addButton.disabled = false;
    } else {
        addButton.disabled = true;
    }
}

function underLineMove(event){
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.top = 
        event.target.offsetTop + event.target.offsetHeight + "px";
}

function addTask() {
    let task = {
        id: randomIdGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }

    taskList.push(task);
    taskInput.value = ''
    render()
}

function render() {
    let list = []
    if (mode === 'all'){
        list = taskList;

    } else if (mode === 'ongoing' || mode === 'done') {
        list = filterList;
    }

    let resultHTML = '';
    for (let i=0; i<list.length;i++){

        if (list[i].isComplete == true){
            resultHTML += `<div class="task" style="background-color:lightgray;">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')" class="return-button"><i class="fa-solid fa-rotate-left"></i></button>
                <button onclick="deleteTask('${list[i].id}')" class="delete-button"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`

        } else {
            resultHTML += `<div class="task">
                    <div>${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')" class="check-button"><i class="fa-solid fa-check"></i></button>
                        <button onclick="deleteTask('${list[i].id}')" class="delete-button"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>`
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
    console.log(list);
}

function toggleComplete(id) {
    for (let i=0;i<taskList.length;i++){

        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }

    if (mode === "ongoing") {
        filterList = taskList.filter(task => !task.isComplete);
    } else if (mode === "done") {
        filterList = taskList.filter(task => task.isComplete);
    }

    render();
}

function deleteTask(id) {
    for (let i=0;i<taskList.length;i++){

        if(taskList[i].id == id){
            taskList = taskList.filter(task => task.id !== id); // taskList.splice(i,1); 에서 변경
            break;
        }
    }

    if (mode === "ongoing") {
        filterList = taskList.filter(task => !task.isComplete);
    } else if (mode === "done") {
        filterList = taskList.filter(task => task.isComplete);
    }

    render();
}

function filter(event) {
    filterList = []
    mode = event.target.id;

    if (mode === "all"){
        render();

    } else if (mode === "ongoing"){
        for (let i=0;i<taskList.length;i++){
            if (taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render();

    } else if (mode === "done"){
        for (let i=0;i<taskList.length;i++){
            if (taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}

function randomIdGenerate() {
    return '_' + Math.random().toString(36).substring(2,9);
}