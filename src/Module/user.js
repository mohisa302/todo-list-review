import { display, drag } from './ui.js';
import { loadData, saveData } from './storage.js';
import { addTask, removeTask } from './edit.js';
import { editText, statusTask, clearAll } from './update.js';

const refreshIcon = document.querySelector('.refresh');
const addBtn = document.querySelector('.add-btn');
const newTask = document.querySelector('.list-input');
const list = document.querySelector('.list-container');
const clearCom = document.querySelector('.complete-btn');

addBtn.addEventListener('click', () => {
  if (newTask.value) {
    saveData(addTask(newTask.value, loadData()));
    newTask.value = '';
    display(loadData());
  }
});

list.addEventListener('click', (e) => {
  // trash icon
  if (e.target.closest('.trash-btn')) {
    const trashIcon = e.target.closest('.trash-btn');
    saveData(removeTask(trashIcon, loadData()));
    display(loadData());
  }
  // edit description
  if (e.target.closest('.input-text')) {
    const inputText = e.target.closest('.input-text');
    inputText.addEventListener(
      'input',
      (e) => {
        const parent = document.querySelector('.list-container');
        const child = e.target.closest('.task-container');
        saveData(editText(loadData(), parent, child, inputText.textContent));
      },
      false,
    );
  }
  // checkbox update
  if (e.target.closest('.check-box')) {
    const checkBox = e.target.closest('input[type=checkbox]');
    checkBox.addEventListener('change', (e) => {
      const parent = document.querySelector('.list-container');
      const child = e.target.closest('.task-container');
      saveData(statusTask(loadData(), parent, child));
    });
  }
});

list.addEventListener('dragstart', (e) => {
  const listElem = e.target.closest('.task-container');
  listElem.classList.add('dragging');
});

list.addEventListener('dragend', (e) => {
  const listElem = e.target.closest('.task-container');
  listElem.classList.remove('dragging');
});

list.addEventListener('dragover', (e) => {
  e.preventDefault();
  const underDrag = e.target.closest('.task-container');
  saveData(drag(underDrag, list));
});

refreshIcon.addEventListener('click', () => {
  saveData([]);
  display(loadData());
});

clearCom.addEventListener('click', () => {
  saveData(clearAll(loadData()));
  display(loadData());
});

window.addEventListener('load', () => {
  if (localStorage.getItem('tasks')) {
    display(loadData());
  }
});
