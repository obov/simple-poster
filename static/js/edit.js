// $("#test").on("click", function () {
//   document.title = "test";
//   history.pushState(null, "", location.origin + "/edit");
//   $("main").load("/edit .wrapper", console.log("test success"));
// });

// id값 가져오기
const qs = window.location.search.substring(1);
const id = decodeURIComponent(qs).split("=")[1];
$(()=>{
  getPost(id);
});

function getPost(id) {
  $.ajax({
      type: "GET",
      url: `/poster/view?id=${id}`,
      data: {},
      success: (response)=>{
          const { title, username, content, time } = response;

          $("#title").val(title);
          $("#content").val(content);
      }
  });
}

const form = $("#editForm");
const title = $("#title");
const content = $("#content");

form.on("submit", function (event) {
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: `/poster/edit?${id}`,
    data: { title: title.val(), content: content.val() },
    success: function ({ msg }) {
      console.log("msg : ", msg);
    },
    error: function (error) {
      console.log("error : ", error);
    },
  });
});
