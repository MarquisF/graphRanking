// The form validation using strategy pattern.
// You can add more customize strategies in the FormValidationRules folder,
//      create a new class extends this class,
//      in constructor adding new strategies like the following example:
//
//          this.strategies = {
//              ...this.strategies,
//              arrayIsNonEmpty: ( value, errorMsg ) => {
//                  if ( value.length === 0 ) {
//                      return errorMsg;
//                  }
//              }
//          }
(() => {
  class Validator {
    constructor () {
      this.cache = [];
      this.strategies = {
        isNonEmpty: ( value, errorMsg ) => {
          if ( value.trim() === '' ) {
            return errorMsg;
          }
        },
        minLength: ( value, length, errorMsg ) => {
          if ( value.length < length ) {
            return errorMsg;
          }
        },
        maxLength: ( value, length, errorMsg ) => {
          if ( value.length > length ) {
            return errorMsg;
          }
        },
        validateEmail: ( value, errorMsg ) => {
          const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if ( !re.test( value ) ) {
            return errorMsg;
          }
        },
        doMatch: ( value, errorMsg ) => {
          if ( value[0] !== value[1]) {
            return errorMsg;
          }
        }
      };
    }

    add ( dom, rules ) {
      for ( let i = 0, rule; rule = rules[ i++ ]; ) {
        ( rule => {
          const strategyAry = rule.strategy.split( ':' );
          const errorMsg = rule.errorMsg;

          this.cache.push( () => {
            const strategy = strategyAry.shift();
            strategyAry.unshift( dom.value );
            strategyAry.push( errorMsg );
            return this.strategies[ strategy ].apply( dom, strategyAry );
          });
        })( rule );
      }
      return this; // for chain calling convienence
    }

    start () {
      for ( let i = 0, validatorFunc; validatorFunc = this.cache[ i ++ ]; ) {
        const errorMsg = validatorFunc();
        if ( errorMsg ) {
          return errorMsg;
        }
      }
    }
  }

  // Add to exports for node, or window for browser
  if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = Validator;
  } else {
    this.Validator = Validator;
  }
})()