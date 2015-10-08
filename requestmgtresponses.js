var api = new ControlToDo(['custom_fields'], function (todo) {
	var selects = {}, days;
	configure_form = function configure_form() {
		var form = todo.custom_fields.getForm(), date = new Date();
		selects.corrector = jQuery(form.find('select[data-id="corrector"]')); 
		selects.deadline = jQuery(form.find('select[data-id="deadline"]'));
                days = parseInt(jQuery.trim(selects.deadline.val()), 10) +1;

  	    todo.custom_fields.message([{
  	      action: 'distribute_todo',
  	      params: {
  	      	  todo_slug: 'providemanagementresponce',
  	      	  assignees: [selects.corrector.val()],
  	      	  due_date: new Date(date.getTime() + (1000 * 60 * 60 * 24 * days))
          }
        }]);
   };

  jQuery(document).ready(function () {
    configure_form();
  });

  jQuery(document).live("ajax:success", function () {
    configure_form();
  });

  jQuery('form input').live('change', function (event) {
    configure_form();
  });

  jQuery('form select').live('change', function (event) {
    configure_form();
  });
});