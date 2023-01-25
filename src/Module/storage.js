export const loadData = () => JSON.parse(localStorage.getItem('tasks')) || [];

export const saveData = (data) => {
  localStorage.setItem('tasks', JSON.stringify(data));
};
