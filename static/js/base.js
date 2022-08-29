$('input[name="fontselect"]').change(function () {
  $('input[name="fontselect"]').each(function () {
    var value = $(this).val(); // value
    var checked = $(this).prop("checked");
    if (checked) {
      const replaced = value.replaceAll("+", " ");
      $("body").css("font-family", replaced);
    }
  });
});
