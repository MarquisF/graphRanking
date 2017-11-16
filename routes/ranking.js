const express = require('express');
const router = express.Router();

const getInventoryCountInfo = require('./model/getInventoryCountInfo');
const getInventories = require('./model/getInventories');
const EXPIRE_TIME = 60 * 1000; /* ms */
const PAGE_CAPACITY = 10;

router.get('/:page?', function ( req, res, next ) {
  const page  = req.params.page || 1;
  async function getMatchesByPage () {
    const list = await getInventories( page, PAGE_CAPACITY );
    console.log('list:', list)
    const countInfo = await getInventoryCountInfo();
    return { list, countInfo };
  }

  getMatchesByPage().then( data => {
    const { list, countInfo } = data;
    res.render('ranking', {
      data: list,
      countInfo: JSON.stringify(countInfo),
      page: page,
      pageCapacity: PAGE_CAPACITY
    })
  })

})

module.exports = router