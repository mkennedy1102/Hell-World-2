var api = new ControlToDo(['custom_fields'], function (todo) {	
	configure_form = function configure_form() {
		var form = todo.custom_fields.getForm();
		
		//script object declarations
		var minority_applicants = form.find('input[data-id="minority_applicants"]');
		var female_applicants = form.find('input[data-id="female_applicants"]');
		var total_candidates = form.find('input[data-id="total_candidates"]');
		var minority_percentage = form.find('input[data-id="minority_percentage"]');
		minority_percentage.attr("readonly",true);
		var female_percentage = form.find('input[data-id="female_percentage"]');
		female_percentage.attr("readonly",true);
		
		if (total_candidates.val() != "") { 
			if (female_applicants.val() != "" )  {
				percent = parseInt(female_applicants.val()) / parseInt(total_candidates.val()) * 100;	
			 	female_percentage.val(percent.toFixed(2) + '%');
			}
			 
			if (minority_applicants.val() != "" ) {
				percent = parseInt(minority_applicants.val()) / parseInt(total_candidates.val()) * 100;	
				minority_percentage.val(percent.toFixed(2) + '%');
			}
		}

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