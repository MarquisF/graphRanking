const User = require('../../mongoModels/user');
const Score = require('../../mongoModels/score');

const getMatches = ( page, pageCapacity ) => {
  return new Promise((resolve, reject) => {
    Score.find({
        // status: { $ne: 2 },
        // expireTime: { $lte: (new Date).getTime() }
    }, undefined, {
      skip: ( page - 1 ) * pageCapacity,
      limit: pageCapacity
    }).
    populate(
      'chartId1',
      ['_id', 'picId', 'path']
    ).populate(
      'chartId2',
      ['_id', 'picId', 'path']
    ).
    exec((err, entries) => {
      console.log('entries:', entries)
      resolve( entries )
    });
  })
}


module.exports = getMatches;