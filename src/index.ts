import WikimediaStream from "wikimedia-streams";
import mqtt, {IClientOptions} from "mqtt";
import 'dotenv/config';

const MQTT_USERNAME = process.env.MQTT_USERNAME;
const MQTT_PASSWORD = process.env.MQTT_PASSWORD;

console.log('connecting to mqtt broker');

const clientId = "client" + Math.random().toString(16).substr(2, 8);

(async () => {

    const mqttWebsocketUrl = `wss://gcmb.io/ws`;

    const options: IClientOptions = {
        keepalive: 30,
        username: MQTT_USERNAME,
        password: MQTT_PASSWORD,
        clientId,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        connectTimeout: 30 * 1000,
        rejectUnauthorized: false,
        reconnectPeriod: 1000,
    }

    const mqttClient = mqtt.connect(mqttWebsocketUrl, options);

    const stream = new WikimediaStream("recentchange");

    stream.on("recentchange", async (data, event) => {
        if (data.wiki === 'enwiki') {
            // console.log(JSON.stringify(data, null, 2));
            try {
                await mqttClient.publishAsync(`wikipedia-stream/wikipedia-stream/recentchange/${data.wiki}`, JSON.stringify(data), {
                    qos: 0,
                    retain: false
                });
            } catch (e) {
                console.error(`Error publishing to mqtt: ${e}`);
            }
        }
    });

})();
