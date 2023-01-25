export const addTask = (task, listData) => {
  if (!listData) {
    listData = [
      {
        description: task,
        completed: false,
        index: 1,
      },
    ];
  } else {
    listData.push({
      description: task,
      completed: false,
      index: listData.length + 1,
    });
  }
  return listData;
};

export const removeTask = (trashIcon, listData) => {
  const inputText = trashIcon.previousElementSibling.previousElementSibling.firstElementChild
    .nextElementSibling.textContent;
  const taskIndex = listData.findIndex(
    (task) => task.description === inputText,
  );
  listData.splice(taskIndex, 1);
  listData.forEach((taskDay, indexDay) => {
    taskDay.index = indexDay + 1;
  });
  trashIcon.parentElement.parentElement.remove();
  return listData;
};
