const swissPairing = require('swiss-pairing');
const Inventory = require('./chartInventory');
const Score = require('./score');

module.exports = round => {
  round = round || 1;
  new Promise(resolve => {
    Inventory.find({}, function(err, docs) {
      if (!err){
          resolve( docs )
      } else {throw err;}
    });
  }).then( data => {
    createMatchups( data );
  })

  /* Functions: */

  function createMatchups ( data ) {
    const participants = data.map( item => {
      const { _id, score } = item;
      return {
        id: _id,
        seed: score
      }
    })

    const onePerRound = swissPairing({
      maxPerRound: 1
    })

    const evenMatchups = onePerRound.getMatchups(2, participants, []);


    Promise
      .all( evenMatchups.map ( item => {
        item.chartId1 = item.home;
        item.chartId2 = item.away;
        item.round = round;
        return Score.create( item ).catch( error => ( { error } ) )
      }))
      .then( data => {
        data.forEach( item => {
          if ( item.error ) {
            console.log( 'Score Item has failed with error', item.error );
          } else {
            console.log( 'Score item created successfully' );
          }
        });
      });
  }
}
