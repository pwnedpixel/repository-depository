var algoliasearch = require('algoliasearch');

/**
 * retrieves storage items
 * @param {Array} storageId id of the storage object to retrieve
 * @returns {Array}
 */
module.exports = (storageId, context, callback) => {
  var client = algoliasearch("9VRWUQ21U2", process.env.algolia);
  var index = client.initIndex("repo_depo_storage");

  var queries = []

  storageId.forEach(currentId => {
    queries.push({
      indexName:'repo_depo_storage',
      query:currentId,
      restrictSearchableAttributes: ['storageId']
    });
  });
  client.search(queries, (err, content) => {
    if (err) throw err;
    if (content) {

      callback(null, content.results.filter(current => current.hits.length != 0).map(current => current.hits[0]));
    }
  });
};
