$(()=>{
    
    // const id = id;
    // validator

    getPost(id)
});

function getPost(id) {

    // console.log("GET")

    $.ajax({
        type: "GET",
        url: `/poster?id=${id}`,
        data: {},
        success: (response)=>{
            console.log(response["msg"])
        }

    });
}