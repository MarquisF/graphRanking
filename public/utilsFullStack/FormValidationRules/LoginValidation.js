/**
 * If the environment is under browser, the Parent Validator class file should
 * be loaded into the HTML page first in order to define the Validator class
 * under the 'window' object:
 *    <script src='path/to/utilsForBothEnds/FormValidationStrategy'></script>
 */
(() => {
  let ParentValidator;
  if ( typeof module !== 'undefined' && module.exports ) {
    ParentValidator = require('../FormValidationStrategy');
  } else {
    ParentValidator = window.Validator;
  }

  class LoginValidation extends ParentValidator {
    constructor () {
      super();
      // this.strategies = {
      //   ...this.strategies,
      // }
    }
  }

  function loginValidate ( email, psw ) {
    const validator = new LoginValidation();

    validator.add({ value: email }, [{
      strategy: 'isNonEmpty',
      errorMsg: 'Email cannot be empty'
    }, {
      strategy: 'validateEmail',
      errorMsg: 'The Email format is not correct'
    }]).add({ value: psw }, [{
      strategy: 'isNonEmpty',
      errorMsg: 'Password cannot be empty'
    }]);

    return validator.start();
  }

  if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = loginValidate;
  } else {
    this.loginValidate = loginValidate;
  }
})()