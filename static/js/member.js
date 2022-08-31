
  $('#submit').click(function () {
    const username = $('input[name="user_ID"]').val();
    const password = $('input[name="user_PW1"]').val();
    const password2 = $('input[name="user_PW2"]').val();

    if (username === '') {
      alert('아이디 입력해주세요');
      return false;
    }

    if (password === '') {
      alert('비밀번호 입력해주세요');
      return false;
    }

    if (password !== password2) {
      alert('비밀번호 정확히 입력해주세요');
      return false;
    }

    $.post('http://localhost:5000/user/signup', {
      username: username,
      password: password,
    }, (response)=>{
      console.log(response.msg)
    });
  });

  $('#login').click(function (e) {
    console.log("Click")
    const username = $('#username').val();
    const password = $('#password').val();
    if (username == '') {
      alert('아이디 입력해주세요');
      return false;
    }
    if (password == '') {
      alert('비밀번호 입력해주세요');
      return false;
    }

    $.post('http://localhost:5000/user/login', {
      username: username,
      password: password,
    }, (response)=>{
      // 서버에서 암호화한 로그인 토큰을 다시 건네받고 브라우저 쿠키에 저장해야해요.
    });
  })

