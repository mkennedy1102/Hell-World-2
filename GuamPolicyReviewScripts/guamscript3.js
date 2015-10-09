var api = new ControlToDo(['custom_fields', 'todo_helpers'], function (todo) {
  var form = todo.custom_fields.getForm(),
  formParent = form.closest('div#tsk_task_assignment_tabs');

  function distributeToDo() {
    todo.todo_helpers.distributeToDo({ todoID: 'pd3', selectID: 'attestationpolicy1', dueDateOffset: 14});
  }

  formParent.on('change', 'select', distributeToDo);
  distributeToDo();

  form.on('ajax:before', distributeToDo);
});