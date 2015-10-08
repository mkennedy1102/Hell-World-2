var api = new ControlToDo(['custom_fields', 'date_helpers', 'todo_helpers'], function (api) {

  var form = api.custom_fields.getForm(),
  form_parent = api.custom_fields.getTabs();

//set the default due date to rely on in case the custom due date is not entered
  function defaultDueDate() {
    var inTwoWeeks = new Date((new Date()).getTime() + 14 * 24 * 60 * 60 * 1000);
    return api.date_helpers.toISODateString(inTwoWeeks);
  }
//set the parameters to be called later
  function params_maker(assignee_id, custom_due_date, todo_slug) {
    return {
      action: 'distribute_todo',
      params: {
        todo_slug: [todo_slug],
        assignees: [assignee_id],
        due_date: _.isEmpty(custom_due_date) ? defaultDueDate() : custom_due_date,
      }
    };
  }
//define the parameters?
  function configure_form() {
    // all of the different user select and textarea slugs
    var server_messages = _([
      {user_select_slug: 'assignee', 
       due_date_slug: 'dueDate',
       todo_slug: 'todo'},

       {user_select_slug: 'assigneeTwo',
       due_date_slug: 'dueDateTwo',
       todo_slug: 'todoTwo'}

    ]).reduce(function (memo, tab_info) {
      var assignee_id, custom_due_date, todo_slug;
      // grab the userids and dueDuate
      {assignee_id = $.trim($('select[data-id=' + tab_info.user_select_slug + ']').val());
      custom_due_date = api.custom_fields.getField(tab_info.due_date_slug).val(); // assumed to be an ISO-8601 formatted date, e.g. 2015-05-05
      todo_slug = ['todo', 'todoTwo'];
    }

      // make params based off of the data
      // call the user select field to determine the action. 
      if (parseInt(assignee_id, 10) >= 0 ) {
        memo.push(params_maker(assignee_id, custom_due_date, todo_slug));
      }

      return memo;
    }, []);
debugger
    return api.custom_fields.message(server_messages);
  }
  //the server_messages being called here cycle through the array for the parameters, but for some reason always ends up with the same todo_slug for both objects.

  api.todo_helpers.initShowHide();

  configure_form();
  form.on('ajax:before', configure_form);
});