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
window.onpopstate = function (event) {
  // alert(`location: ${document.location}, state: ${JSON.stringify(event.state)}`);
  location.reload();
};
$("#test").on("click", function () {
  document.title = "test";
  history.pushState(null, "", location.origin + "/poster");
  $("main").load("/poster .wrapper", console.log("test success"));
});
