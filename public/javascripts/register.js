( $ => {
  const registerValidate = window.registerValidate;

  let email,
    username,
    passcode,
    passcode_conf;

  $('#registerForm').submit(function (event) {
    /* Act on the event */
    email = this.email.value;
    username = this.username.value;
    passcode = this.passcode.value;
    passcode_conf = this.passcode_conf.value;
    const validateResult = registerValidate( email, username, passcode, passcode_conf );
    validateResult ? window.alert(validateResult) : formSubmit();
  });

  function formSubmit () {

    const req = {
      email: email,
      username: username,
      passcode: passcode,
      passcode_conf: passcode_conf
    };

    $.post( '/register', req ).done( res => {
      if ( res.success ) {
        window.location.href = 'dashboard';
      } else {
        window.alert(res.msg);
      }
    })
  }
})(jQuery)