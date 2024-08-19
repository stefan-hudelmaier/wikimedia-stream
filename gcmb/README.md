## Wikipedia Event Stream

The changes to Wikipedia are published in this project. It uses the [EventStreams
HTTP Service](https://wikitech.wikimedia.org/wiki/Event_Platform/EventStreams_HTTP_Service) 
provided by Wikimedia and publishes it via MQTT to GCMB.

### Implementation Details

The publishes uses Node.js and leverages the [wikimedia-streams](https://www.npmjs.com/package/wikimedia-streams)
NPM package.
