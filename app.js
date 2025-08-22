class TaskApp {
  constructor() {}

  async getTask() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    return response.data;
  }

  displayTask() {
    this.getTask().then((tasks) => {
      for (const task of tasks) {
        const li = document.createElement("li");
        li.textContent = task.title;
        const div = document.createElement("div");
        div.classList.add("actions");
        const checkBtn = document.createElement("button");
        checkBtn.textContent = "✓";
        checkBtn.addEventListener("click", async () => {
          await this.updateTask(task.id);
          li.style.textDecoration = "line-through";
          task.completed = true;
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✗";
        deleteBtn.classList.add("delete");

        deleteBtn.addEventListener("click", async () => {
          await this.deleteTask(task.id);
          li.remove();
        });

        div.appendChild(checkBtn);
        div.appendChild(deleteBtn);
        li.appendChild(div);

        document.getElementById("taskList").appendChild(li);
      }
    });
  }

  async addtask(task) {
    const addTask = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title: task.value, completed: false }
    );

    const newTask = addTask.data;
    console.log(newTask);

    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.textContent = newTask.title;

    const div = document.createElement("div");
    div.classList.add("actions");

    const checkBtn = document.createElement("button");
    checkBtn.textContent = "✓";

    checkBtn.addEventListener("click", async () => {
      await this.updateTask(newTask.id);
      li.style.textDecoration = "line-through";
      newTask.completed = true;
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✗";
    deleteBtn.classList.add("delete");

    deleteBtn.addEventListener("click", async () => {
      await this.deleteTask(newTask.id);
      li.remove();
    });

    div.appendChild(checkBtn);
    div.appendChild(deleteBtn);
    li.appendChild(div);

    taskList.appendChild(li);
  }

  async updateTask(id) {
    const update = await axios.patch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      { completed: true }
    );
    return update.data;
  }

  async deleteTask(id) {
    const deletetask = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    return deletetask.data;
  }
}

const task = new TaskApp();
task.displayTask();

const addTask = document.getElementById("addTask");
const inputTask = document.getElementById("taskInput");
addTask.addEventListener("click", () => {
  task.addtask(inputTask);
  inputTask.value = "";
});

// axios
//   .get("https://jsonplaceholder.typicode.com/todos")
//   .then((res) => console.log(res.data))
//   .catch((err) => console.error(err));
