$(()=>{
    setLoginSession();
});

function setLoginSession() {
    const cookies = document.cookie.split("; ");
    let cookie = new Map();
    for(i=0;i<cookies.length;i++) {
        c = cookies[i].split("=");
        cookie.set(c[0], c[1]);
    }
    sessionStorage.setItem("logintoken", cookie.get("logintoken"));
}

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

    $.ajax({
        type: "POST",
        url: "/poster/write",
        data: {
            title_give: title,
            content_give: content,
        },
        success: (response)=>{
            if (response["success"]) {
                console.log(response["msg"]);
                window.location.replace("/");
            } else {
                alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
            }
            
        }
    });
}

function back() {
    window.location.replace("/");
}