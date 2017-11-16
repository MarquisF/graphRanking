const Score = require('../../mongoModels/score');

// async function
// use in this way:
// getCountInfo().then( data => {} );
const getCountInfo = () => {
  return new Promise(( resolve, reject ) => {
    async function AsyncGetCountInfo () {
      const allCount = await getAllMatchCount();
      const finishedCount = await getFinishedCountInfo();
      return {
        allCount: allCount,
        finishedCount: finishedCount,
        desc: `${allCount} pairs, ${finishedCount} finished`
      };
    }

    AsyncGetCountInfo().then(resolve)
  })
}

function getAllMatchCount () {
  return new Promise(( resolve, reject ) => {
    Score.count({}, ( err, count ) => {
      resolve( count );
    })
  })
}

function getFinishedCountInfo ( allCount ) {
  return new Promise(( resolve, reject, allCount ) => {
    Score.count({ status: 2 }, ( err, count ) => {
      resolve( count );
    })
  })
}

module.exports = getCountInfo;