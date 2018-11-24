var algoliasearch = require('algoliasearch');

/**
 * A basic Hello World function
 * @param {string} storageId Who you're saying hello to
 * @returns {object}
 */
module.exports = (storageId, context, callback) => {
  var client = algoliasearch("9VRWUQ21U2", process.env.algolia);
  var index = client.initIndex("repo_depo_storage");
  
  index.search({query:storageId,restrictSearchableAttributes: [
    'storageId'
  ]}, (err, content) => {
    if (err) throw err;
    if (content) {
      callback(null, content.hits[0]);
    }
  });
};
