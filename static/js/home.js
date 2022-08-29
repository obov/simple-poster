const postList = $("#posterList");
const logo = $("#logo");

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "/poster/list",
    data: {},
    success: function ({ data }) {
      postList.empty();
      console.log({ data });
      for (let i = 0; i < data.length; i++) {
        const { content, title, id } = data[i];

        const liWrapper = $(`<li id="poster${id}"></li>`);
        const ancherPoster = $(`<a href="/poster?id=${id}">${title}</a>`);
        const iconWrapper = $("<div class='icon-wrapper'></div>");
        const editIcon = $("<i class='bi bi-pencil-square'></i>");
        const deleteIcon = $("<i class='bi bi-trash3'></i>");

        liWrapper.append(ancherPoster);
        iconWrapper.append(editIcon);
        iconWrapper.append(deleteIcon);
        liWrapper.append(iconWrapper);
        postList.append(liWrapper);

        ancherPoster.on("click", () => console.log("you clicked", id));
        editIcon.on("click", () => console.log("you clicked", "edit"));
        deleteIcon.on("click", () => console.log("you clicked", "delete"));
      }
    },
    error: function (error) {
      console.log("error : ", error);
    },
  });
});
