class GlobalService {
  constructor(database) {
    this.database = database;
  }

  async getLinkService(link) {
    try {
      const global = await this.database.getLink(link);
      return global;
    } catch (error) {
      console.error("global get link {service}:", error.message);
    }
  }

  async userProfileService(link) {
    try {
      const global = await this.database.userProfile(link);
      return global;
    } catch (error) {
      console.error("global user profile{service}:", error.message);
    }
  }

  async userCategoryService(link) {
    try {
      const global = await this.database.userCategory(link);
      return global;
    } catch (error) {
      console.error("global user profile{service}:", error.message);
    }
  }
}

export default GlobalService;
