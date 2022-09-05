const postList = $("#posterList");
const logo = $("#logo");
const deleteBox = $("#deleteBox");
const deleteButton = $("#delete");
const deleteCancel = $("#cancel");
const delContent = $("#delboxContent");
history.replaceState({ title: "Home" }, "");
let idToDelete;

const tag = (tagName) => $(`<${tagName}></${tagName}>`);
const replaceApostrophe = (text) => text.replaceAll("'", "\\'");
const deleteBoxShow = function (id, title) {
  idToDelete = id;
  delContent.text(title);
  deleteBox.css("display", "block");
};
const listingData = (tagToBeAppended, data) => {
  console.time("listing time");
  let tagsToAppend = "";
  for (let i = 0; i < data.length; i++) {
    const { content, title, id } = data[i];

    tagsToAppend += `
    <li id="poster${id}">
      <a href="/poster?id=${id}">${title}</a>
      <div class="icon-wrapper">
        <a href="/poster/edit?id=${id}">
          <i class="bi bi-pencil-square"></i>
        </a>
        <div class="del" onclick="deleteBoxShow('${id}','${replaceApostrophe(title)}')">
          <i class="bi bi-trash3"></i>
        </div>
      </div>
    </li>
    `;
    // const liWrapper = tag("li").attr("id", "poster" + id);
    // const qs = encodeURIComponent(`id=${id}`);
    // const ancherPoster = tag("a")
    //   .attr("href", "/poster?" + qs)
    //   .text(title);
    // const ancherEdit = tag("a").attr("href", "/poster/edit?id=" + id);
    // const divDelete = tag("div").addClass("del");
    // const editIcon = tag("i").addClass("bi bi-pencil-square");
    // const iconWrapper = tag("div").addClass("icon-wrapper");
    // const deleteIcon = tag("i").addClass("bi bi-trash3");

    // ancherEdit.append(editIcon);
    // divDelete.append(deleteIcon);
    // iconWrapper.append(ancherEdit);
    // iconWrapper.append(divDelete);
    // liWrapper.append(ancherPoster);
    // liWrapper.append(iconWrapper);

    // tagToBeAppended.append(liWrapper);

    // divDelete.on("click", function () {
    //   idToDelete = id;
    //   delContent.text(title);
    //   deleteBox.css("display", "block");
    // });
  }
  tagToBeAppended.html(tagsToAppend);
  console.timeEnd("listing time");
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

  deleteButton.on("click", function () {
    $.ajax({
      type: "POST",
      url: "/poster/delete",
      data: { id: idToDelete },
      success: function ({ msg }) {
        console.log(msg);
      },
      error: function (error) {
        console.log("error : ", error);
      },
      complete: function () {
        deleteBox.css("display", "none");
        location.reload();
      },
    });
  });

  deleteCancel.on("click", function () {
    deleteBox.css("display", "none");
  });
});
