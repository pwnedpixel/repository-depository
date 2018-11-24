var algoliasearch = require('algoliasearch');

/**
 * Creating storage items
 * @param {number} storageId
 * @param {array} events
 * @param {array} offers
 * @param {number} price
 * @param {string} location
 * @param {string} owner
 * @param {string} renter
 * @param {string} image
 * @param {string} objectID
 * @returns {object}
 */
module.exports = (storageId, events, offers, price, location, owner, renter, image, objectID, context, callback) => {
  var client = algoliasearch("9VRWUQ21U2", process.env.algolia);
  var index = client.initIndex("repo_depo_storage");
  
  index.saveObject(context.params, (err, content) => {
    if (err) throw err;
    if (content) {
      callback(null, context.params);
    }
  });
};
