// $("#test").on("click", function () {
//   document.title = "test";
//   history.pushState(null, "", location.origin + "/edit");
//   $("main").load("/edit .wrapper", console.log("test success"));
// });
const form = $("#editForm");
const title = $("#title");
const content = $("#content");

form.on("submit", function (event) {
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: "/poster/edit",
    data: { title: title.val(), content: content.val() },
    success: function ({ msg }) {
      console.log("msg : ", msg);
    },
    error: function (error) {
      console.log("error : ", error);
    },
  });
});
