const postList = $("#posterList");
const logo = $("#logo");

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "https://quote-garden.herokuapp.com/api/v3/quotes",
    data: {},
    success: function ({ data }) {
      postList.empty();
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const { quoteText, quoteAuthor, _id } = data[i];
        const liWrapper = $(`<li id="poster${_id}"></li>`);
        const ancherPoster = $(`<a href="/poster?id=${_id}">${quoteText}</a>`);
        const iconWrapper = $("<div class='icon-wrapper'></div>");
        const editIcon = $("<i class='bi bi-pencil-square'></i>");
        const deleteIcon = $("<i class='bi bi-trash3'></i>");
        liWrapper.append(ancherPoster);
        iconWrapper.append(editIcon);
        iconWrapper.append(deleteIcon);
        liWrapper.append(iconWrapper);
        ancherPoster.on("click", () => console.log("you clicked", _id));
        setTimepostList.append(liWrapper);
      }
    },
    error: function (error) {
      console.log("error : ", error);
    },
  });
});
