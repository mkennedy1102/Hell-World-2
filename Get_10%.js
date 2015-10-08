var api = new ControlToDo(['custom_fields'], function (todo) {	
	configure_form = function configure_form() {
		var form = todo.custom_fields.getForm();
		
		//script object declarations
		var number_calc = form.find('input[data-id="number_calc"]');
		var total_calc = form.find('input[data-id="total_calc"]');
		total_calc.attr("readonly", true);
		
	if (parseInt(number_calc.val()) > 0 ) 
		total_calc.val( parseInt(number_calc.val() * .10));
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

// in the JavaScript file you upload to the ToDo,
// on the ToDoScript tab of the ToDoEditor.
new ControlToDo(['todo_helpers'], function(todo) {
    todo.todo_helpers.initShowHide();
});