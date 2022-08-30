

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

    /* username & token validator */

    $.ajax({
        type: "POST",
        url: "/poster/submit",
        data: {
            title_give: title,
            content_give: content,
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