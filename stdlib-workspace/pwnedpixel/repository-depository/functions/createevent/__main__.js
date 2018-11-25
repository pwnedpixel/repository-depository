var algoliasearch = require("algoliasearch");

/**
 * Creating Events
 * @param {string} objectID
 * @param {object} event
 * @returns {object}
 */
module.exports = (objectID, event, context, callback) => {
	var client = algoliasearch("9VRWUQ21U2", process.env.algolia);
	var index = client.initIndex("repo_depo_storage");

	// get the current events
	var events = [];
	index.getObjects([objectID], (err, content) => {
		events = content.results[0].events;
    events.push(event);

		index.partialUpdateObjects([{ objectID: objectID, events: events }], (err, content) => {
			if (err) throw err;
			if (content) {
				callback(null, event);
			}
		});
	});
};
