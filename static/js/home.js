const postList = $("#posterList");
const logo = $("#logo");

const tag = (tagName) => $(`<${tagName}></${tagName}>`);
const listingData = (tagToAppend, data) => {
  for (let i = 0; i < data.length; i++) {
    const { content, title, id } = data[i];

    const liWrapper = tag("li").attr("id", "poster" + id);
    const qs = encodeURIComponent(`id=${id}`);
    const ancherPoster = tag("a")
      .attr("href", "/poster?" + qs)
      .text(title);
    const ancherEdit = tag("a").attr("href", "/poster/edit?id=" + id);
    const divDelete = tag("div").addClass("del");
    const editIcon = tag("i").addClass("bi bi-pencil-square");
    const iconWrapper = tag("div").addClass("icon-wrapper");
    const deleteIcon = tag("i").addClass("bi bi-trash3");

    ancherEdit.append(editIcon);
    divDelete.append(deleteIcon);
    iconWrapper.append(ancherEdit);
    iconWrapper.append(divDelete);
    liWrapper.append(ancherPoster);
    liWrapper.append(iconWrapper);

    tagToAppend.append(liWrapper);

    editIcon.on("click", () => console.log("you clicked", "edit"));
    deleteIcon.on("click", () => console.log("you clicked", "delete"));
  }
};

$(document).ready(function () {
  // const dataToShow = localStorage.getItem("data");
  // if (dataToShow !== null) {
  //   const dataParsed = JSON.parse(dataToShow);
  //   listingData(postList, dataParsed);
  // }
  $.ajax({
    type: "GET",
    url: "/poster/list",
    data: {},
    success: function ({ data }) {
      postList.empty();
      console.log(data);
      localStorage.setItem("data", JSON.stringify(data));
      listingData(postList, data);
    },
    error: function (error) {
      console.log("error : ", error);
    },
  });
});
