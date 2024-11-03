let tasks = []; // tache en memoire 
let currentTaskIndex = null; // Suivre l'index de la tache 

// ouvrir le modal 
document.getElementById('openModal').addEventListener('click', () => {
    document.getElementById('modal').classList.remove('hidden');
});

// Fermer le modal
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
});

// fermer le edit 
document.getElementById('closeEditModal').addEventListener('click', () => {
    document.getElementById('editModal').classList.add('hidden');
});

// ajouter une task
document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const status = document.getElementById('status').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    if (title === "") {
        alert("Le titre ne peut pas etre vide.");
        return;
    }
    if (description === "") {
        alert("La description ne peut pas etre vide.");
        return;
    }
    if (!status || status === "") {
        alert("Veuillez selectionner un statut.");
        return;
    }
    if (!dueDate || dueDate === ""){
        alert("Veuillez selectionner une date");
        return;
    }
    if (!priority || priority === "") {
        alert("Veuillez selectionner une prioriter.");
        return;
    }
    
    tasks.push({ title, description, status, dueDate, priority });
    renderTasks();
    document.getElementById('modal').classList.add('hidden');
    document.getElementById('taskForm').reset();
});

// modifier le status de task 
function editStatus(index) {
    currentTaskIndex = index;
    document.getElementById('editModal').classList.remove('hidden');
}

// changer le statue en cliquant  
document.getElementById('toDoButton').addEventListener('click', () => updateStatus('to-do'));
document.getElementById('doingButton').addEventListener('click', () => updateStatus('doing'));
document.getElementById('doneButton').addEventListener('click', () => updateStatus('done'));

function updateStatus(newStatus) {
    tasks[currentTaskIndex].status = newStatus;
    renderTasks();
    document.getElementById('editModal').classList.add('hidden');
}

// supprimer une task
function deleteTask(index) {
    tasks.splice(index, 1); /////
    renderTasks();
}

// metre a jour l'affiche de tasks
function renderTasks() {
    const lists = {
        'to-do': document.getElementById('toDoList'),
        'doing': document.getElementById('doingList'),
        'done': document.getElementById('doneList')
    };

    // Clear all lists
    for (const list of Object.values(lists)) list.innerHTML = '';
    let taskCounts = { 'to-do': 0, 'doing': 0, 'done': 0 };

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'p-4 rounded mb-4 flex flex-col';
        taskItem.style.borderWidth = '2px';
        taskItem.style.borderStyle = 'solid';
        taskItem.style.borderColor = getPriorityColor(task.priority);

        const textContainer = document.createElement('div');
        textContainer.className = 'flex flex-col flex-grow text-center'; // Ajout de 'text-center' pour centrer le texte
        textContainer.innerHTML = `<strong>${task.title}</strong> <span class="text-gray-600">${task.dueDate}</span>
        <p class="text-gray-700 text-sm mt-1">${task.description || 'Pas de description'}</p>`;

        taskItem.appendChild(textContainer);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'flex flex-col items-center mt-2';
        buttonContainer.innerHTML =
            `<button class="text-white bg-indigo-400 px-2 py-1 rounded mb-2 hover:bg-blue-700 transition text-sm" onclick="editStatus(${index})">Modifier</button>
        <button class="text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600 transition text-sm" onclick="deleteTask(${index})">Supprimer</button>`;
        taskItem.appendChild(buttonContainer);

        lists[task.status].appendChild(taskItem);
        taskCounts[task.status]++; // count
    });

    // counts
    document.getElementById('toDoHeader').textContent = `To Do (${taskCounts['to-do']})`;
    document.getElementById('doingHeader').textContent = `Doing (${taskCounts['doing']})`;
    document.getElementById('doneHeader').textContent = `Done (${taskCounts['done']})`;
}

// prioriter coleur 
function getPriorityColor(priority) {
    switch (priority) {
        case 'P1': return 'red';
        case 'P2': return 'orange';
        case 'P3': return 'green';
        default: return 'gray';
    }
}

// Load tasks
window.onload = renderTasks;
