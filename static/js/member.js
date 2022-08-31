
  $('#submit').click(function () {
    const id = $('input[name="user_ID"]').val();
    const password = $('input[name="user_PW1"]').val();
    const password2 = $('input[name="user_PW2"]').val();

    if (id === '') {
      alert('아이디 입력해주세요');
      return;
    }
    if (password === '') {
      alert('비밀번호 입력해주세요');
      return;
    }
    if (password !== password2) {
      alert('비밀번호 정확히 입력해주세요');
      return;
    }

    $.post('/user/register', {
      id: id,
      password: password,
    }, (response)=>{
      window.location.replace("/");
    });
  });

  $('#login').click(function () {
    const username = $('#username').val();
    const password = $('#password').val();

    // if (username == '') {
    //   alert('아이디 입력해주세요');
    //   return;
    // }
    // if (password == '') {
    //   alert('비밀번호 입력해주세요');
    //   return;
    // }

    $.post('/user/login', {
      username: username,
      password: password,
    }, (response)=>{
      window.location.replace("/");
    });
  });

