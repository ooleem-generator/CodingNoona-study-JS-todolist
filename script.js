let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList = [];
let mode = 'all';
let filterList = [];
addButton.addEventListener("click", addTask);
taskInput.addEventListener("focus", function(){
    taskInput.value = '';
})


for (i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click", function(event) {
        filter(event)})
}

function addTask() {
    let task = {
        id: randomIdGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }

    taskList.push(task);
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
    render();
}

function deleteTask(id) {
    for (let i=0;i<taskList.length;i++){

        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
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