const express = require('express');
const router = express.Router();
const Score = require('../mongoModels/score');
const Inventory = require('../mongoModels/chartInventory');

const createNewScore = require('../mongoModels/createNewScore');

const getCountInfo = require('./model/getCountInfo');
const EXPIRE_TIME = 60 * 1000; /* ms */

router.get('/', function ( req, res, next ) {
  getCountInfo().then( info => getMatchAndRender( info.desc ) );

  function getMatchAndRender ( countInfo ) {
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

      const { _id, chartId1, chartId2, round } = entries;
      const data = {
        _id: _id,
        chart_1: chartId1,
        chart_2: chartId2,
        countInfo: countInfo,
      }
      data.jsData = JSON.stringify( data );
      data.round = round;
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
  const { round, matchId, inventoryId, chosen } = req.body;
  const upsertData = {
    result: chosen,
    user: req.session.userId,
    status: 2
  }

  // update scores
  Score.update( { _id: matchId }, upsertData, { multi: false }, ( err ) => {
    console.log('err:', err)
  })

  // update inventories score increase 1
  Inventory.update( { _id: inventoryId }, { $inc: { score: 1 }}, { multi: false }, ( err ) => {
    getCountInfo().then( sendRespond );
  })

  function sendRespond ( countInfo ) {
    const { allCount, finishedCount } = countInfo;

    allCount > finishedCount ? res.json({
      success: 1,
      msg: ''
    }) : (() => {
      createNewScore(+ round + 1);
      res.json({
        success: 2,
        msg: 'Wait the server a few seconds for generating new matches for the next round.'
      })
    })()
    // res.json({
    //   id: 12
    // })
  }
})

module.exports = router