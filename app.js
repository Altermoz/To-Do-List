document.addEventListener('DOMContentLoaded', () => {
    const taskCon = document.getElementById('taskCon');
    const input = document.getElementById('input-text');
    const form = document.getElementById('myForm');

    const loadTask = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task));
    }

    const saveTasks = (tasks) => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    const renameTask = (oldVal, newVal) => {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        const taskIndex = tasks.indexOf(oldVal);
        if (taskIndex !== -1) {
            tasks[taskIndex] = newVal;
            saveTasks(tasks);
        }
    }

    const addTask = (taskVal) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        taskDiv.innerHTML = `
            <input type="checkbox">
            <input type="text" class="taskInput" value="${taskVal}">
            <i class="fa-solid fa-trash delete"></i><br>
        `;

        const inputTask = taskDiv.querySelector('.taskInput');
        inputTask.addEventListener('input', () => {
            renameTask(taskVal, inputTask.value);
            taskVal = inputTask.value;
        });

        taskDiv.querySelector('.delete').addEventListener('click', () => {
            removeTask(taskVal);
            taskDiv.remove();
        });

        taskCon.append(taskDiv);
    }

    const removeTask = (taskVal) => {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task !== taskVal);
        saveTasks(tasks);
    }

    const myForm = (event) => {
        event.preventDefault();

        const inputVal = input.value.trim();

        if (inputVal === "") {
            alert("Task cannot be empty");
            return;
        }

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(inputVal);
        addTask(inputVal);
        saveTasks(tasks);

        input.value = '';
    }

    form.addEventListener('submit', (event) => myForm(event));

    loadTask();
});