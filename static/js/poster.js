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
        }

    });
}

function back() {
    window.location.replace("/");
}