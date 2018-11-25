var algoliasearch = require('algoliasearch');

/**
 * Creating storage items
 * @param {string} storageId
 * @returns {object}
 */
module.exports = (storageId, context, callback) => {
  var client = algoliasearch("9VRWUQ21U2", process.env.algolia);
  var index = client.initIndex("repo_depo_storage");
  newValues=JSON.parse(context.params['payload']);
  
  index.addObject(newValues, (err, content) => {
    if (err) throw err;
    if (content) {
      callback(null, context.params);
    }
  });
};
