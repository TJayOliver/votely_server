import EventController from "../controller/eventController.js";
import EventService from "../service/eventService.js";
import EventDatabase from "../database/eventDatabase.js";

export const dependency = () => {
  const database = new EventDatabase();
  const service = new EventService(database);
  const controller = new EventController(service);

  return { controller };
};
