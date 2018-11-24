var algoliasearch = require('algoliasearch');

/**
 * Retrieving user profiles
 * @param {string} userId UserId to retrieve
 * @returns {object}
 */
module.exports = (userId, context, callback) => {
  var client = algoliasearch("9VRWUQ21U2", process.env.algolia);
  var index = client.initIndex("repo_depo_user");
  
  index.search({query:userId,restrictSearchableAttributes: [
    'userId'
  ]}, (err, content) => {
    if (err) throw err;
    if (content) {
      callback(null, content.hits[0]);
    }
  });
};
