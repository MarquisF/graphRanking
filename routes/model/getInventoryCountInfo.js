const Inventory = require('../../mongoModels/chartInventory');

// async function
// use in this way:
// getInventoryCountInfo().then( data => {} );
const getInventoryCountInfo = () => {
  return new Promise(( resolve, reject ) => {
    Inventory.count({}, ( err, count ) => {
      resolve({
        allCount: count
      });
    })
  })
}

module.exports = getInventoryCountInfo;