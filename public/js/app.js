const btnAction = document.querySelector('.btn-actions');
const btnActionTask = document.querySelector('.btn-actions-tasks');
const btnActionProject = document.querySelector('.btn-actions-projects');

btnAction.addEventListener('click', () => {
  btnActionTask.style.display = 'none';
  btnActionProject.style.display = 'none';
});
