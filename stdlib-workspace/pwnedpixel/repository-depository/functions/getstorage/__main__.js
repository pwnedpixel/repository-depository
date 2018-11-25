var algoliasearch = require('algoliasearch');

/**
 * retrieves storage items
 * @param {Array} storageId id of the storage object to retrieve
 * @param {boolean} onlyAvailable
 * @param {boolean} getAll
 * @returns {Array}
 */
module.exports = (storageId, onlyAvailable = false, getAll=false,  context, callback) => {
  var client = algoliasearch("9VRWUQ21U2", process.env.algolia);
  var index = client.initIndex("repo_depo_storage");

  var queries = []
  var results = []

  if (storageId.length === 0 && getAll) {
    index.search({query:'*'}, (err, content) => {
      results = content.hits;
      callback(null, results.filter(current => !onlyAvailable || current.renter === ""))
    });
  } else {
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
         results = content.results.filter(current => current.hits.length != 0).map(current => current.hits[0]);
         callback(null, results.filter(current => !onlyAvailable || current.renter === ""))
      }
    });
  }

  
};
