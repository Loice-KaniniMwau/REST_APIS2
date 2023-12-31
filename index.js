    
let todos = [];

const getToDos = () => {
  return fetch('https://dummyjson.com/todos?limit=20')
    .then(response => response.json())
    .then(response => response)
    .catch(error => error.message);
};

const displayToDos = () => {
  const tableBody = document.querySelector('#todoTable tbody');
  tableBody.innerHTML = ''; 

  todos.forEach(item => {
    const row = document.createElement('tr');
    const idCell = document.createElement('td');
    idCell.textContent = item.id;
    const todoCell = document.createElement('td');
    todoCell.textContent = item.todo;
    const completedCell = document.createElement('td');
    completedCell.textContent = item.completed;
    const deleteCell = document.createElement('td'); 
    const updateCell = document.createElement('td'); 

    

    const deleteButton = document.createElement('button'); 
    const updateButton=document.createElement('button')
    deleteButton.textContent = 'Delete';
    updateButton.textContent='Update'
    deleteButton.addEventListener('click', () => deleteTask(item.id)); 
    updateButton.addEventListener('click',()=>updateTask(item.id))
    updateCell.appendChild(updateButton)
    deleteCell.appendChild(deleteButton);
    row.appendChild(idCell);
    row.appendChild(todoCell);
    row.appendChild(completedCell);
    row.appendChild(deleteCell);
    row.appendChild(updateCell)
    tableBody.appendChild(row);
  });
};

const addTask = event => {
  event.preventDefault();

  const newTaskTitle = document.getElementById('taskTitle').value;

  const newTask = {
    id: todos.length + 1,
    todo: newTaskTitle,
    completed: false
  };

  todos.push(newTask);

  displayToDos();

  document.getElementById('taskTitle').value = '';
};
const updateTask = id => {
  const newTaskTitle = prompt('update a todo:');
  const taskIndex = todos.findIndex(item => item.id === id);
  if (taskIndex !== -1) {
      todos[taskIndex].todo = newTaskTitle;
      displayToDos();
  }
};

const deleteTask = id => {
  todos = todos.filter(item => item.id !== id); 
  displayToDos();
};

document.getElementById('addTaskForm').addEventListener('submit', addTask);

getToDos()
  .then(response => {
    todos = response.todos; 
    displayToDos(); 
  })
  .catch(error => {
    console.error('failed to fetch a todo:', error);
  });
