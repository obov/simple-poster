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
            const { title, username, content, time } = response;

            console.log(title)
            console.log(content)
            console.log(time)
            $("#title").append(`<p>${title}</p>`);
            $("#name").append(`<p>작성자</p><span>${time}</span>`);
            $("#content").append(`<p>${content}</p>`);
        }

    });
}

function back() {
    window.location.replace("/");
}