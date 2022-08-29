$(()=>{
    // validator
    const id = window.document.URL.split("?id=")[1];
    getPost(id);
});

function getPost(id) {
    
    console.log(id);

    $.ajax({
        type: "GET",
        url: `/poster/view?id=${id}`,
        data: {},
        success: (response)=>{
            console.log(response["msg"]);

            const [ title, username, content, date ] = response;
            $("#post-title").append(`<p>${title}</p>`);
            $("#post-name").append(`<p>${username}</p><p>${date}</p>`);
            $("#post-body").append(`<p>${content}</p>`);
        }

    });
}

function back() {
    window.location.replace("/");
}