class EventController {
  constructor(service) {
    this.service = service;
  }

  async getLink(req, res) {
    const { link } = req.params;
    try {
      const event = await this.service.getLinkService(link);
      return res.status(201).json({ message: true, data: event });
    } catch (error) {
      console.error("event get link {controller}:", error.message);
      return res.status(500).json("Internal Server Error");
    }
  }

  async userProfile(req, res) {
    const { id } = req.params;
    const link = id;
    try {
      const event = await this.service.userProfileService(link);
      return res.status(201).json({ message: true, data: event });
    } catch (error) {
      console.error("event user profile {controller}:", error.message);
      return res.status(500).json("Internal Server Error");
    }
  }

  async userCategory(req, res) {
    const { id } = req.params;
    const link = id;
    try {
      const event = await this.service.userCategoryService(link);
      return res.status(201).json({ message: true, data: event });
    } catch (error) {
      console.error("event user category {controller}:", error.message);
      return res.status(500).json("Internal Server Error");
    }
  }
}

export default EventController;
