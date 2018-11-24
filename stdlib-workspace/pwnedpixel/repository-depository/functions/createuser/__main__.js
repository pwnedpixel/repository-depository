var algoliasearch = require('algoliasearch');

/**
 * Creating user profiles
 * @param {number} userId
 * @param {string} name
 * @param {array} offering
 * @param {array} renting
 * @returns {object}
 */
module.exports = (userId, name, offering, renting, context, callback) => {
  var client = algoliasearch("9VRWUQ21U2", process.env.algolia);
  var index = client.initIndex("repo_depo_user");
  
  index.addObject(context.params, (err, content) => {
    if (err) throw err;
    if (content) {
      callback(null, context.params);
    }
  });
};
