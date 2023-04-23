const taskLabel = document.querySelector(".task__label");

var taskInput = document.getElementById("new-task"); //Add a new task.
var addButton = document.querySelector(".btn__new-task"); // add button
var incompleteTaskHolder = document.querySelector(".incomplete-tasks"); //ul of #incompleteTasks
var completedTasksHolder = document.querySelector(".completed-tasks"); //completed-tasks

//New task list item
var createNewTaskElement = function (taskString) {
  console.log("createNewTaskElement works");
  var listItem = document.createElement("li");

  //input (checkbox)
  var checkBox = document.createElement("input"); //checkbx
  //label
  var label = document.createElement("label"); //label
  //input (text)
  var editInput = document.createElement("input"); //text
  //button.edit
  var editButton = document.createElement("button"); //edit button

  //button.delete
  var deleteButton = document.createElement("button"); //delete button
  var deleteButtonImg = document.createElement("img"); //delete button image

  listItem.className = "item";

  label.innerText = taskString;
  label.className = "item-com task__label";

  //Each elements, needs appending
  checkBox.type = "checkbox";
  checkBox.className = "item-com input-checkbox task__input-checkbox";
  editInput.type = "text";
  editInput.className =
    "item-com task input-text hidden input-text__active edit-mode__input-text-inactive";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "btn btn__edit";

  deleteButton.className = "btn btn__delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function () {
  console.log("Add Task...");
  console.log("!taskInput.value=", !taskInput.value);
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

//Edit an existing task.

var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector(".input-text");
  var taskLabel = listItem.querySelector(".task__label");
  var editBtn = listItem.querySelector(".btn__edit");
  var containsClass = listItem.classList.contains("edit-mode");

  //If class of the parent is .edit-mode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    taskLabel.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = taskLabel.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent.
  taskLabel.classList.toggle("hidden");
  editInput.classList.toggle("hidden");

  listItem.classList.toggle("edit-mode");
};

//Delete task.
var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

//Mark task completed
var taskCompleted = function () {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

  // add prorierties for label
  listItem.querySelector(".task__label").className =
    "task__label label-completed-tasks";
  // input hidding
  listItem.querySelector(".input-text").className =
    "item-com task input-text hidden input-text__active edit-mode__input-text-inactive";

  listItem.querySelector(".btn__edit").innerText = "Edit";
};

var taskIncomplete = function () {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var ajaxRequest = function () {
  console.log("AJAX Request");
};

//The glue to hold it all together.

// Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  var checkBox = taskListItem.querySelector(".input-checkbox");
  var editButton = taskListItem.querySelector(".btn__edit");
  var deleteButton = taskListItem.querySelector(".btn__delete");

  //Bind editTask to edit button.

  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
  console.log("checkBox.checked=", checkBox.checked);
  // remove propuerties of complited task
  if (!checkBox.unchecked) {
    taskListItem
      .querySelector(".task__label")
      .classList.remove("label-completed-tasks");
  }

  if (taskListItem.parentNode.classList.contains("completed-tasks")) {
    taskListItem
      .querySelector(".task__label")
      .classList.add("label-completed-tasks");

    taskListItem
      .querySelector(".input-text")
      .classList.add("edit-mode__input-text-inactive");
  }
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
