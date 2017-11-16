const Inventory = require('../../mongoModels/chartInventory');

const getInventories = ( page, pageCapacity ) => {
  return new Promise((resolve, reject) => {
    Inventory.find({}, [
      '_id',
      'picId',
      'path',
      'score'
    ], {
      skip: ( page - 1 ) * pageCapacity,
      limit: pageCapacity,
      sort: {
        score: -1 //Sort by score DESC
      }
    })
    .exec((err, entries) => {
      resolve( entries )
    });
  })
}


module.exports = getInventories;