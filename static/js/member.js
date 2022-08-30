$(document).ready(function () {
  $('#submit').click(function () {
    var id = $('input[name="user_ID"]').val();
    var password = $('input[name="user_PW1"]').val();
    var password2 = $('input[name="user_PW2"]').val();

    if (id === '') {
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

    $.post('http://localhost:5000/register', {
      id: id,
      password: password,
    });
  });

  $('#login').click(function (e) {
    var userNname = $('#userNname').val();
    var userPassword = $('#userPassword').val();
    if (userNname == '') {
      alert('아이디 입력해주세요');
      return false;
    }
    if (userPassword == '') {
      alert('비밀번호 입력해주세요');
      return false;
    }

    $.post('http://localhost:5000/login', {
      userNname: userNname,
      userPassword: userPassword,
    });
  });
});
