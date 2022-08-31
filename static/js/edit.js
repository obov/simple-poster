// $("#test").on("click", function () {
//   document.title = "test";
//   history.pushState(null, "", location.origin + "/edit");
//   $("main").load("/edit .wrapper", console.log("test success"));
// });

const id = window.location.search.split("=")[1];

const form = $("#editForm");
const title = $("#title");
const content = $("#content");
const goToList = $("#goToList");

form.on("submit", function (event) {
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: `/poster/edit`,
    data: { id, title: title.val(), content: content.val() },
    success: function ({ msg }) {
      if (msg === "success") {
        window.location.href = `/poster/?id=${id}`;
      } else {
        console.log("msg : ", msg);
      }
    },
    error: function (error) {
      console.log("error : ", error);
    },
  });
});
goToList.on("click", function () {
  window.location.href = "/";
});
