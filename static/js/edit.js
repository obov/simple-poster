// $("#test").on("click", function () {
//   document.title = "test";
//   history.pushState(null, "", location.origin + "/edit");
//   $("main").load("/edit .wrapper", console.log("test success"));
// });
const form = $("#editForm");
form.on("submit", function (event) {
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: "/poster/edit",
    data: {},
    success: function ({ msg }) {
      console.log("msg : ", msg);
    },
    error: function (error) {
      console.log("error : ", error);
    },
  });
  console.log("submit");
});
