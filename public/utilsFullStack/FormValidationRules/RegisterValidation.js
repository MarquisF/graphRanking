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

  // class RegisterValidation extends ParentValidator {
  //   constructor () {
  //     super();
      // this.strategies = {
      //   ...this.strategies,
      // }
  //   }
  // }

  function registerValidate ( email, username, passcode, passcode_conf ) {
    const validator = new ParentValidator();

    validator.add({ value: email }, [{
        strategy: 'isNonEmpty',
        errorMsg: 'Email cannot be empty'
      }, {
        strategy: 'validateEmail',
        errorMsg: 'The Email format is not correct'
      }])
    .add({ value: username }, [{
        strategy: 'isNonEmpty',
        errorMsg: 'Username cannot be empty'
      }, {
        strategy: 'maxLength:24',
        errorMsg: 'Username cannot be longer than 24 letters'
      }])
    .add({ value: passcode }, [{
        strategy: 'isNonEmpty',
        errorMsg: 'Password cannot be empty'
      },{
        strategy: 'minLength:8',
        errorMsg: 'Password cannot be shorter than 8 letters'
      },{
        strategy: 'maxLength:24',
        errorMsg: 'Password cannot be longer than 24 letters'
      }])
    .add({ value: [ passcode, passcode_conf ]}, [{
        strategy: 'doMatch',
        errorMsg: 'The two passwords do not match'
      }]);

    return validator.start();
  }

  if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = registerValidate;
  } else {
    this.registerValidate = registerValidate;
  }
})()