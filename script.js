let allTaskList = [];

const modalToggleBtnElement = document.querySelector('.show-modal-btn');
const modalDeclineBtnElement = document.getElementById('declineBtn');
const addTaskBtnElement = document.querySelector('#addTaskBtn');
const modalOverlay = document.querySelector('.modal-overlay');
const taskInput = document.querySelector('.task-input');

const toggleModal = () => {
  modalOverlay.classList.toggle('hidden');
}

modalToggleBtnElement.addEventListener('click', toggleModal);
modalDeclineBtnElement.addEventListener('click', toggleModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target.matches('.modal-overlay'))
    toggleModal()
})

const createTaskTemplate = (task) => {
  const taskTemplate = `
    <div class="todo-list-element ${task.completed ? 'completed' : '' }">
      <div class="todo-name-box">
        <i data-id="${task.id}" class="far fa-circle check-task-btn"></i>
        <p class="todo-name">${task.name}</p>
      </div>
    <i id="${task.id}" class="far fa-trash-alt todo-trash-btn"></i>
    </div>`
  return taskTemplate;
}

const createNewTask = (taskName) => {
  const task = {
    name: taskName,
    completed: false,
    id: Math.random()
  }
  allTaskList.unshift(task);
}

const removeTask = (taskId) => {
  allTaskList = allTaskList.filter((task) => {
    return taskId !== String(task.id)
  })
}

const addRemovesListnersToBtns = () => {
  const allRemoveBtnsElements = document.querySelectorAll('.todo-trash-btn');

  allRemoveBtnsElements.forEach((removeBtn) => {
    removeBtn.addEventListener('click', ($event) => {
      const taskId = $event.target.attributes.id.nodeValue;
      removeTask(taskId);
      renderTasks();
    })
  })
}

const renderTasks = () => {
  const todoListElement = document.querySelector('.task-container');
  const tasksTemplates = allTaskList.map((task) => {
    return createTaskTemplate(task);
  })
  todoListElement.innerHTML = tasksTemplates.join('');
  addRemovesListnersToBtns();
  addListenerToToggleStatusButtons()
}

addTaskBtnElement.addEventListener('click', () => {
  const taskNameInputElement = document.querySelector('.task-input');
  const taskName = taskNameInputElement.value;

  if (!taskName) {
    return;
  };

  createNewTask(taskName);
  renderTasks();

  taskNameInputElement.value = '';
  toggleModal();
})

const addListenerToToggleStatusButtons = () => {
  const toggleButtons = document.querySelectorAll('.check-task-btn');

  toggleButtons.forEach((toggleButton) => {
    toggleButton.addEventListener('click', ($event) => {

      const taskId = $event.target.attributes['data-id'].nodeValue;
      const toggleTaskStatus = (taskId) => {
        allTaskList = allTaskList.map((task) => {
          if (String(task.id) === taskId) {
            task.completed = !task.completed;
          }
          return task
        })
      }
      toggleTaskStatus(taskId)
      renderTasks();
    })
  })
}