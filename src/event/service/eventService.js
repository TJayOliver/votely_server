class EventService {
  constructor(database) {
    this.database = database;
  }

  async getLinkService(link) {
    try {
      const event = await this.database.getLink(link);
      return event;
    } catch (error) {
      console.error("event get link {service}:", error.message);
    }
  }

  async userProfileService(link) {
    try {
      const event = await this.database.userProfile(link);
      return event;
    } catch (error) {
      console.error("event user profile{service}:", error.message);
    }
  }

  async userCategoryService(link) {
    try {
      const event = await this.database.userCategory(link);
      return event;
    } catch (error) {
      console.error("event user profile{service}:", error.message);
    }
  }
}

export default EventService;
