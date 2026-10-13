/**
 * "Work with me" page: clicking "Apply for this role" on a role pre-selects it in the application form.
 * The form itself is handled by assets/lead-forms.js (posts to /api/lead, then shows the confirmation in place).
 */
(function () {
  'use strict';

  var select = document.getElementById('a-role');
  if (!select) return;

  function choose(value) {
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].value === value) { select.selectedIndex = i; return true; }
    }
    return false;
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[data-role]');
    if (!link) return;
    choose(link.getAttribute('data-role'));
  });
})();
