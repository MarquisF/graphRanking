( $ => {
  const loginValidate = window.loginValidate;

  $('#loginForm').submit(function (event) {
    /* Act on the event */
    const email = this.email.value;
    const psw = this.passcode.value;
    const validateResult = loginValidate( email, psw );
    validateResult ? window.alert(validateResult) : formSubmit( email, psw );
  });

  function formSubmit ( email, psw ) {

    const req = {
      email: email,
      passcode: psw
    };
    $.post('/login', req).done( res => {
      if ( res.success ) {
        window.location.reload()
      } else {
        window.alert(res.msg)
      }
    })
  }
})(jQuery)