$('#submit').click(()=>{
  const username = $('input[name="user_ID"]').val();
  const password = $('input[name="user_PW1"]').val();
  const password2 = $('input[name="user_PW2"]').val();

  if (checkFormat(username,"아이디")) return;
  if (checkFormat(password,"비밀번호")) return;
  if (password !== password2) {
    alert('비밀번호 정확히 입력해주세요');
    $(`#password2-txt`).addClass("help-format")
    $(`#password2`).focus();
    return;
  }

  $.post("/user/signup", {
    username: username,
    password: password,
  }, (response)=>{
    alert(response["msg"]);
    window.location.replace("/login");
  });
});

$('#login').click(()=>{
  console.log("Click")
  const username = $('#username').val();
  const password = $('#password').val();
  // if (checkFormat(username,"아이디")) return;
  // if (checkFormat(password,"비밀번호")) return;

  $.post("/user/login", {
    username: username,
    password: password,
  }, (response)=>{
    if (response["flag"]) {
      // $.cookie("mytoken", response["token"], {path: "/"})
      $.cookie("logintoken", response["token"], {path: "/"})
      window.location.replace("/");
    } else {
      console.log(response["msg"]);
      $("#password").val("");
    }
  });
})

function checkFormat(val,txt) {
  const regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9]{6,15}$/;
  if (val === '') {
    alert(`${txt}를 입력해주세요`);
    $(`#${txt}-txt`).addClass("help-format")
    $(`#${txt}`).focus();
    return true;
  } else if (!regExp.test(val)) {
    alert(`${txt}는 6~15자로 영문,숫자만 사용 가능합니다.`)
    $(`#${txt}-txt`).addClass("help-format")
    $(`#${txt}`).focus();
    return true;
  } else return false;
}
