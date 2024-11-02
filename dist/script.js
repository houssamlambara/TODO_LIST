let tasks = []; // Initialize tasks in memory
let currentTaskIndex = null; // Track the index of the task being edited

// Open modal for adding task
document.getElementById('openModal').addEventListener('click', () => {
    document.getElementById('modal').classList.remove('hidden');
});

// Close modal for adding task
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
});

// Close edit modal
document.getElementById('closeEditModal').addEventListener('click', () => {
    document.getElementById('editModal').classList.add('hidden');
});

// Add task
document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const status = document.getElementById('status').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    if (!title) return alert("Le titre ne peut pas être vide.");

    tasks.push({ title, description, status, dueDate, priority });
    renderTasks();
    document.getElementById('modal').classList.add('hidden');
    document.getElementById('taskForm').reset();
});
