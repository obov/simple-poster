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
        const liHuggingData = $(`<li id="poster${_id}"><a href="/poster?id=${_id}">${quoteText}</a></li>`);
        liHuggingData.on("click", () => console.log("you clicked", _id));
        postList.append(liHuggingData);
      }
    },
    error: function (error) {
      console.log("error : ", error);
    },
  });
});
window.onpopstate = function (e) {
  console.log(`${JSON.stringify(e.state)} | ${location.origin} | ${location.pathname}`);
};

const state = { page_id: 1, data: "test" };
const route = (url) => history.pushState(state, null, location.origin + url);
logo.on("click", route("/"));
