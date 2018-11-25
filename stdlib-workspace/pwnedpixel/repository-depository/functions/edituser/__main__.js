var algoliasearch = require('algoliasearch');

/**
 * Creating user items
 * @param {string} objectID
 * @returns {object}
 */
module.exports = (objectID, context, callback) => {
  var client = algoliasearch("9VRWUQ21U2", process.env.algolia);
  var index = client.initIndex("repo_depo_user");

  newValues=JSON.parse(context.params['payload']);
  newValues['objectID']=context.params.objectID;

  index.partialUpdateObjects([newValues], (err, content) => {
    if (err) throw err;
    if (content) {
      callback(null, newValues);
    }
  });
};
