document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("task-form-div").style.display = "none";
  document.getElementById("reminder-line").addEventListener("change", () => {
    const initialValue = document.getElementById("reminder-line").value;
    if (initialValue === "False") {
      document.getElementById("reminder-line").value = "True";
    }
    if (initialValue === "True") {
      document.getElementById("reminder-line").value = "False";
    }
  });

  document.getElementById("add-task-form").addEventListener("submit", () => {
    addTask();
  });

  const addTaskButton = document.getElementById("add-task-btn");
  addTaskButton.addEventListener("click", () => {
    if (document.getElementById("task-form-div").style.display === "block") {
      document.getElementById("task-form-div").style.display = "none";
      addTaskButton.className = "btn btn-success";
      addTaskButton.innerHTML = "Add Task";
    } else if (
      document.getElementById("task-form-div").style.display === "none"
    ) {
      document.getElementById("task-form-div").style.display = "block";
      addTaskButton.className = "btn btn-danger";
      addTaskButton.innerHTML = "Close";
    }
  });

  loadTasks();
});

const loadTasks = async () => {
  const data = await fetch("tasks/all");
  const tasks = await data.json();
  tasks.forEach((task) => {
    let element = document.createElement("div");
    element.className = `row task ${task.reminder ? "reminder" : ""}`;
    element.id = `task${task.id}`;
    txt = `<div class="col"> <h2>Task: ${task.task}</h2> <h2>Time: ${task.targetTime}</h2> <button class="btn btn-danger" id=delete-btn${task.id}> Delete </button></div>`;
    element.innerHTML = txt;
    document.getElementById("load-tasks").appendChild(element);
    element.addEventListener("dblclick", () => {
      task.reminder = !task.reminder;
      reminder(task);
      element.className = `row task ${task.reminder ? "reminder" : ""}`;
    });
    document
      .getElementById(`delete-btn${task.id}`)
      .addEventListener("click", () => {
        deleteTask(task);
      });
  });
};

const reminder = (task) => {
  fetch(`tasks/${task.id}`, {
    method: "PUT",
    body: JSON.stringify({ reminder: task.reminder }),
  });
};

const addTask = async () => {
  const task = document.getElementById("task-line").value;
  const date = document.getElementById("date-line").value;
  const reminder = document.getElementById("reminder-line").value;
  res = await fetch("/tasks", {
    method: "POST",
    body: JSON.stringify({ task: task, targetTime: date, reminder: reminder }),
  });
  data = await res.json();
};

const deleteTask = async (task) => {
  res = await fetch(`tasks/${task.id}`, {
    method: "DELETE",
  });
};
