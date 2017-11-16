const express = require('express');
const router = express.Router();
// const Score = require('../mongoModels/score');
// const Inventory = require('../mongoModels/chartInventory');
//
const getCountInfo = require('./model/getCountInfo');
const EXPIRE_TIME = 60 * 1000; /* ms */
const PAGE_CAPACITY = 10;

const getMatches = require('./model/getMatches');

router.get('/:page?', function ( req, res, next ) {
  const page  = req.params.page || 1;
  async function getMatchesByPage () {
    const list = await getMatches( page, PAGE_CAPACITY );
    const countInfo = await getCountInfo();
    return { list, countInfo };
  }

  getMatchesByPage().then(renderView);

  function renderView ( data ) {
    let { list, countInfo } = data;
    list = list || [];
    res.render('progress', {
      data: list,
      countInfo: JSON.stringify(countInfo),
      page: page,
      pageCapacity: PAGE_CAPACITY
    });
  }
})

// router.post('/', function ( req, res, next ) {
//   const { matchId, inventoryId, chosen } = req.body;
//   const upsertData = {
//     result: chosen,
//     user: req.session.userId,
//     status: 2
//   }
//   console.log( 'matchId:', matchId );
//   // update scores
//   Score.update( { _id: matchId }, upsertData, { multi: false }, ( err ) => {
//     console.log('err:', err)
//   })

//   // update inventories score increase 1
//   console.log('inventoryId:', inventoryId);
//   Inventory.update( { _id: inventoryId }, { $inc: { score: 1 }}, { multi: false }, ( err ) => {
//     console.log('err:', err)
//   })

//   res.json({
//     id: 12
//   })
// })

module.exports = router