var api = new ControlToDo(['custom_fields', 'date_helpers'], function (api) {
  var form = api.custom_fields.getForm(),
  formParent = form.closest('div#tsk_task_assignment_tabs');

  function distributeToDoMessage(opts) {
    return [{
      action: 'distribute_todo',
      params: {
        todo_slug: opts.todoID,
        assignees: [userID],
        due_date: api.date_helpers.toISODateString(api.date_helpers.add(new Date(), opts.dueDateOffset))
      }
    }];
  }

  function distributeAllToDos() {
    var serverMessages = [];
   if (jQuery('select[data-id=loan-assignee]').val() != '') { 
      serverMessages.push(distributeToDoMessage({ todoID: 'loan-upload', selectID: 'loan-assignee', dueDateOffset: 14 }));
    }
    if (jQuery('input[data-id=vul]:checked').val() !='') { 
      serverMessages.push(distributeToDoMessage({ todoID: 'vulnerability', selectID: 'vulnerabilityReviewer', dueDateOffset: 14 }));
    }
    if (jQuery('input[data-id=sae]:checked').val() === 'Yes') {
      serverMessages.push(distributeToDoMessage({ todoID: 'ssae16', selectID: 'ssae16Reviewer', dueDateOffset: 14 }));
    }

    api.custom_fields.message(serverMessages);
  }

  distributeAllToDos();
  formParent.on('change', 'select', distributeAllToDos);
  form.on('ajax:before', distributeAllToDos);
});