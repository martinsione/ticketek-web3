const algoliasearch = require("algoliasearch");

const events = require("../fakeEvent.json");

const ALGOLIA_APPLICATION_ID = "973COYUGE2";
const ALGOLIA_ADMIN_API_KEY = "2167bd3477a4c04f1f2f12b11ce68dba";
const ALGOLIA_INDEX_NAME = "NFTicket-index";
const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_ADMIN_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

const eventsWithID = events.map((event) => ({ ...event, objectID: event.id }));

index
  .saveObjects(eventsWithID)
  .then((objectID) => {
    console.log(objectID);
  })
  .catch((error) => console.log(error));
