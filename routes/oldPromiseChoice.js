const express = require('express');
const router = express.Router();
const Score = require('../mongoModels/score');
const Inventory = require('../mongoModels/chartInventory');
const EXPIRE_TIME = 60 * 1000; /* ms */

router.get('/', function ( req, res, next ) {
  new Promise(getAllMatchCount).then( allCount => {
    return new Promise((resolve, reject) => {
      getCountInfo(resolve, reject, allCount)
    })
  }).then( countInfo => {
    return new Promise((resolve, reject) => {
      getMatchAndRender(resolve, reject, countInfo)
    })
  })



  function getAllMatchCount ( resolve, reject ) {
    Score.count({}, ( err, count ) => {
      resolve( count );
    })
  }

  function getCountInfo ( resolve, reject, allCount ) {
    Score.count({ status: 2 }, ( err, count ) => {
      const info = `${allCount} pairs, ${count} finished`;
      resolve( info );
    })
  }

  function getMatchAndRender ( resolve, reject, countInfo ) {
    Score.findOne({
      status: { $ne: 2 },
      expireTime: { $lte: (new Date).getTime() }

    }).
    populate(
      'chartId1',
      ['_id', 'picId', 'path']
    ).populate(
      'chartId2',
      ['_id', 'picId', 'path']
    ).exec((err, entries) => {
      if ( err ) {
        next( err )
      }

      console.log( entries )
      const { _id, chartId1, chartId2 } = entries;
      const data = {
        _id: _id,
        chart_1: chartId1,
        chart_2: chartId2,
        countInfo: countInfo
      }
      data.jsData = JSON.stringify( data );
      res.render( 'choice', data );

      const upserData = {
        status: 1,
        expireTime: (new Date()).getTime() + EXPIRE_TIME
      }

      Score.update( { _id: _id }, upserData, { multi: false }, ( err ) => {
        console.log('err:', err)
      })
      // Anything not populated by the query condition is now removed
    });
  }
})

router.post('/', function ( req, res, next ) {
  const { matchId, inventoryId, chosen } = req.body;
  const upsertData = {
    result: chosen,
    user: req.session.userId,
    status: 2
  }
  console.log( 'matchId:', matchId );
  // update scores
  Score.update( { _id: matchId }, upsertData, { multi: false }, ( err ) => {
    console.log('err:', err)
  })

  // update inventories score increase 1
  console.log('inventoryId:', inventoryId);
  Inventory.update( { _id: inventoryId }, { $inc: { score: 1 }}, { multi: false }, ( err ) => {
    console.log('err:', err)
  })

  res.json({
    id: 12
  })
})

module.exports = router