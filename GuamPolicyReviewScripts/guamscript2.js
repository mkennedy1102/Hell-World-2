var api = new ControlToDo(['custom_fields'], function (todo) {
  var radio_buttons = {}, fieldsets = {}, selects = {},

  configure_form = function configure_form() {
    var form = todo.custom_fields.getForm(), date = new Date(),
    radio_buttons_to_hide = {}, radio_buttons_to_show = {},
    fieldsets_to_hide = {}, fieldsets_to_show = {},
    selects_to_hide = {}, selects_to_show = {},
    slugs = {
      policy_update: 'e2556050-5c84-012e-93b5-12313b0664a4',
      policy_board_review: 'bc2',
      policy_attestation: 'pd3'
    };

    radio_buttons.threea = jQuery(form.find('input[data-id=3a]:checked'));
    selects.four = jQuery(form.find('select[data-id=4]'));
    fieldsets.five = jQuery(form.find('li[data-id=5]'));
    radio_buttons.six = jQuery(form.find('input[data-id=6]:checked'));

    // fieldsets
    jQuery.each(['five'], function (i, fieldset_name) {
      fieldsets_to_hide[fieldset_name] = fieldsets[fieldset_name];
    });

    //selects
    jQuery.each(['four'], function (i, select_name) {
      selects_to_hide[select_name] = selects[select_name];
    });

    if (jQuery.trim(radio_buttons.threea.val()) === 'Yes') {
      delete selects_to_hide.four;
      selects_to_show.four = selects.four;

      delete fieldsets_to_show.five;
      fieldsets_to_hide.five = fieldsets.five;

    } else if (jQuery.trim(radio_buttons.threea.val()) === 'No') {
      delete selects_to_show.four;
      selects_to_hide.four = selects.four;

      delete fieldsets_to_hide.five;
      fieldsets_to_show.five = fieldsets.five;
    }

    if (selects.four.val() && jQuery.trim(radio_buttons.threea.val()) === 'Yes') {
      todo.custom_fields.message([{
        action: 'distribute_todo',
        params: {
          todo_slug: slugs.policy_board_review,
          assignees: [selects.four.val()],
          due_date: new Date(date.getTime() + (1000 * 60 * 60 * 24 * 21))
        }
      }]);
    } else if (jQuery.trim(radio_buttons.threea.val()) === 'No' && jQuery.trim(radio_buttons.six.val()) === 'Yes') {
      todo.custom_fields.message([{
        action: 'distribute_todo',
        params: {
          todo_slug: slugs.policy_attestation,
          due_date: new Date(date.getTime() + (1000 * 60 * 60 * 24 * 14))
        }
      }]);
    } else {
      todo.custom_fields.message([]);
    }

    jQuery.each([fieldsets_to_show, selects_to_show], function (i, collection) {
      jQuery.each(collection, function (name, elem) {
        elem.closest('li').show();
      });
    });

    jQuery.each([fieldsets_to_hide, selects_to_hide], function (i, collection) {
      jQuery.each(collection, function (name, elem) {
        elem.closest('li').hide();
      });
    });
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
