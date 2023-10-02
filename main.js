let btn = document.getElementById("btn");
let inp = document.getElementById("inp");
let boxes = document.querySelectorAll(".box");
let drag = null;

// Function to save tasks to local storage
const saveTasksToLocalStorage = () => {
  const taskList = [];
  document.querySelectorAll(".item").forEach((item) => {
    taskList.push(item.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(taskList));
};

// Function to load tasks from local storage
const loadTasksFromLocalStorage = () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    storedTasks.forEach((taskText) => {
      addTask(taskText);
    });
  }
};

// Function to add a task
const addTask = (taskText) => {
  boxes[0].innerHTML += `<p class='item' draggable="true">${taskText}</p>`;
  saveTasksToLocalStorage(); // Save the updated task list
  dragItem();
};

btn.onclick = () => {
  if (inp.value != "") {
    boxes[0].innerHTML += `<p class='item' draggable="true">${inp.value}</p>`;
    inp.value = "";
    dragItem();
  }
};

let dragItem = () => {
  let items = document.querySelectorAll(".item");

  items.forEach((item) => {
    // when starting drag
    item.addEventListener("dragstart", () => {
      drag = item;
      item.style.opacity = 0.5;
    });
    // when ending drag
    item.addEventListener("dragend", () => {
      drag = null;
      item.style.opacity = 1;
    });

    // when stand on box
    boxes.forEach((box) => {
      box.addEventListener("dragover", (e) => {
        e.preventDefault();
        box.style.background = "green";
      });

      box.addEventListener("dragleave", (e) => {
        e.preventDefault();
        box.style.background = "";
      });

      box.addEventListener("drop", () => {
        box.style.background = "";
        box.append(drag);
      });
    });
  });
};
// Load tasks from local storage when the page loads
loadTasksFromLocalStorage();
