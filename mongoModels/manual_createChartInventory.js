// This file is independent from the project,
// It has to be run manually by nodejs.
// It stores the data from ./chartInventoryData.json into mongodb.
const Inventory = require('./chartInventory');
const data = require('./chartInventoryData');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/graphBook', {
  useMongoClient: true
})

Inventory.remove().exec();

Promise
  .all( data.map( item => {
    item.picId = item['Pic ID'];
    item.path = item['Chart Path'];
    return Inventory.create( item ).catch( error => ( { error } ) )
  }) )
  .then( data => {
    data.forEach( item => {
      if ( item.error ) {
        console.log( 'Item has failed with error', item.error );
      } else {
        console.log( 'Item created successfully' );
      }
    } );
  } );