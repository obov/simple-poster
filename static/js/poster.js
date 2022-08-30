$(()=>{
    // validator
    const qs = window.location.search.substring(1);
    const id = decodeURIComponent(qs).split("=")[1];
    getPost(id);
});

function getPost(id) {

    $.ajax({
        type: "GET",
        url: `/poster/view?id=${id}`,
        data: {},
        success: (response)=>{
            const { title, username, content, time } = response;

            $("#title").append(`<p>${title}</p>`);
            $("#name").append(`<p>작성자</p><span>${time}</span>`);
            $("#content").append(`<p>${content}</p>`);
        }

    });
}

function back() {
    window.location.replace("/");
}