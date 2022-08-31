// $("#test").on("click", function () {
//   document.title = "test";
//   history.pushState(null, "", location.origin + "/edit");
//   $("main").load("/edit .wrapper", console.log("test success"));
// });

// id값 가져오기
// console.log("window.location.search : ", window.location.search);
// const qs = window.location.search.substring(1);
// console.log("qs : ", qs);
// // const id = decodeURIComponent(qs).split("=")[1];
const id = window.location.search.split("=")[1];

const form = $("#editForm");
const title = $("#title");
const content = $("#content");

form.on("submit", function (event) {
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: `/poster/edit`,
    data: { id, title: title.val(), content: content.val() },
    success: function ({ msg }) {
      console.log("msg : ", msg);
    },
    error: function (error) {
      console.log("error : ", error);
    },
  });
});
