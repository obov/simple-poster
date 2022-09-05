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
console.log(history.state);

window.onpopstate = function (event) {
  // alert(`location: ${document.location}, state: ${JSON.stringify(event.state)}`);
  // loadStateContent(event.state);
  const state = event.state;
  switch (state.title) {
    case "test":
      return $("main").load("/poster .wrapper", console.log("test success"));
    case "Home":
      return $("main").load("/cloak .wrapper", console.log("Home success"));
  }
  // const router = {
  //   test: $("main").load("/poster .wrapper", console.log("test success")),
  //   Home: $("main").load("/ main", console.log("test success")),
  // };
  // if (!state.title) router[state.title]();
  // location.reload();
};
$("#test").on("click", function () {
  // document.title = "test";
  history.pushState({ title: "test" }, "", location.origin + "/poster");
  $("main").load("/poster .wrapper", console.log("test success"));
});
