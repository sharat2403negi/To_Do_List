const box = document.querySelector(".box"),
    popupBox = document.querySelector(".popup-box"),
    closeIcon = document.querySelector("header i"),
    AddTask = document.querySelector("button"),
    tittleTag = document.querySelector("input"),
    descTag = document.querySelector("textarea"),
    popupTitle = popupBox.querySelector("header p");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

// getting localStorage  new task and passing them to js object
const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let isUpdate = false, UpdateId;

box.addEventListener("click", () => {  // showing popup box
    tittleTag.focus();
    AddTask.innerHTML = "Add Task";
    popupTitle.innerHTML = "Add a New Task";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
});


closeIcon.addEventListener("click", () => { //  removal of popup box 
    tittleTag.value = "";
    descTag.value = "";
    popupBox.classList.remove("show");
    isUpdate = false;
    document.querySelector("body").style.overflow = "auto";
});

// this is for add new task button
AddTask.addEventListener("click", e => {  // adding fucntion to add task button
    e.preventDefault();

    let taskTitle = tittleTag.value.trim(), // getting value of title & description
        taskDesc = descTag.value.trim();

    if (taskTitle || taskDesc) { // putting date and time to task 
        let dateobj = new Date(),
            year = dateobj.getFullYear(),
            month = months[dateobj.getMonth()],
            day = dateobj.getDate();

        // creating one object for task title , description, date & time
        let taskInfo = {
            title: taskTitle,
            description: taskDesc,
            date: `${month} ${day} ${year}`,

        }

        if (!isUpdate) {
            tasks.push(taskInfo);
        }
        else {
            isUpdate = false;
            tasks[UpdateId] = taskInfo; // updating specified tasks
        }
        // Adding new task to tasks 

        localStorage.setItem("tasks", JSON.stringify(tasks));
        showTask();
        closeIcon.click(); // for closing of popup box after task submition
    }
    alert("Whoa! You Are Adding New Task To Complete,Be Ready For It.");
});

// For showing task in popupbox after clicking new task

function showTask() {
    document.querySelectorAll(".task").forEach(li => li.remove());
    tasks.forEach((task, id) => {
        let filterDesc = task.description.replaceAll("\n", '<br/>'); 
        let liTag = `<li class="task">
            <div class="details">
                <p>${task.title}</p>
                <span>${filterDesc} </span>
            </div>

            <div class="bottom_items">
                <span>${task.date}</span>

                <div class="setting_icon">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="menu">
                        <li onclick="updateTask(${id},'${task.title}','${filterDesc}')" ><i class="uil uil-pen"></i>Edit</li>
                        <li onclick="deleteTask('${id}')" ><i  class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </li>`;

        box.insertAdjacentHTML("afterend", liTag);

    });
}
showTask();

// POPup box menubar (delete and edit button)

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

// for deleting of task in popupBox menu 

function deleteTask(taskId) {
    let confirmDelete = confirm("Are You Sure That You Have completed This Task ?");
    if (!confirmDelete) {return};
    tasks.splice(taskId, 1); //removing selected task from All tasks
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTask();
}


// for udating the task in the popupBox menubar

function updateTask(taskId, title, filterDesc) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    box.click();
    AddTask.innerHTML = "Update Task";
    popupTitle.innerHTML = "Update this Task";
    tittleTag.value = title;
    descTag.value = description;
    isUpdate = true;
    UpdateId = taskId;

}