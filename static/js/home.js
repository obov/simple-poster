const postList = $("#posterList");

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "https://quote-garden.herokuapp.com/api/v3/quotes",
    data: {},
    success: function ({ data }) {
      postList.empty();
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const { quoteText, quoteAuthor } = data[i];
        const liHuggingData = $(`<li>${quoteText}</li>`);
        postList.append(liHuggingData);
      }
    },
    error: function (error) {
      console.log("error : ", error);
    },
  });
});
