import { IClient } from "../types";
import { getFiles } from "../utils";

module.exports = (client: IClient) => {
  client.handleEvents = async () => {
    // Get all the event files from the 'events' folder
    const eventFiles = getFiles(`./src/events`);

    for (const file of eventFiles) {
      const event = require(`../events/${file}`);
      // Handle events that will execute only once
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  };
};
