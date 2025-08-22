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
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.textContent = newTask.title;

    taskList.appendChild(li);
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

axios
  .get("https://jsonplaceholder.typicode.com/todos")
  .then((res) => console.log(res.data))
  .catch((err) => console.error(err));
