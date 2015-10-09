var api = new ControlToDo(['custom_fields'], function (todo) {

var form = todo.custom_fields.getForm(),

 configure_form = function configure_form() {

   var radio_buttons = {}, date = new Date(),

   slugs = {

     policy_update: 'bc1',

     policy_board_review: 'bc2',

     policy_attestation: 'pd9'

   };

   radio_buttons.six = jQuery(form.find('input[data-id=6]:checked'));

   if (jQuery.trim(radio_buttons.six.val()) === 'Yes') {

     todo.custom_fields.message([{

       action: 'distribute_todo',

       params: {

         todo_slug: slugs.policy_attestation,

         due_date: new Date(date.getTime() + (1000 * 60 * 60 * 24 * 28))

       }

     }]);

   } else {

     todo.custom_fields.message([]);

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