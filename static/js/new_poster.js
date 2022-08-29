

function posterForm() {
    const title = $("#title").val();
    const content = $("#content").val();
    if (checkBlank(title, "title")) return;
    if (checkBlank(content, "content")) return;

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
        }
    });
}

function checkBlank(check,tag) {
    if( check === "" ) {
        // alert("제목을 입력해주세요")
        $(`#${tag}`).focus();
        $(`#help-${tag}`).removeClass("is-hidden")
        return true;
    } else {
        return false;
    }
}

