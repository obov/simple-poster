

function postSubmit() {
    const title = $("#title").val();
    const content = $("#content").val();

    if (title==="") {
        alert("제목을 입력해주세요");
        $("#title").focus();
        return;
    }
    if (content==="") {
        alert("내용을 입력해주세요");
        $("#content").focus();
        return;
    }

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() +1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    
    const time = `${hour} ${minute} ${month} ${day} ${year}`

    /* username & token validator */

    $.ajax({
        type: "POST",
        url: "/poster/submit",
        data: {
            title_give: title,
            content_give: content,
            time_give: time
            // username
        },
        success: (response)=>{
            console.log(response["msg"]);
            window.location.replace("/");
        }
    });
}

function back() {
    window.location.replace("/");
}