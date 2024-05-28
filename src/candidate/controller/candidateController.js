class CandidateController {
  constructor(service) {
    this.service = service;
  }

  async createCandidate(req, res) {
    const { candidate_name, category_id, candidate_profile, user_id } =
      req.body;
    const image = req.file.filename;
    try {
      const options = {
        user_id,
        category_id,
        candidate_profile,
        candidate_name,
        image,
      };
      const candidate = await this.service.createCandidateService(options);
      return res.status(201).json({ message: "success", candidate });
    } catch (error) {
      console.error("create candidate {Controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readCandidate(req, res) {
    try {
      const candidate = await this.service.readCandidateService();
      return res.status(201).json({ message: "success", candidate });
    } catch (error) {
      console.error("read candidate {Controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteCandidate(req, res) {
    const { candidate_id } = req.params;
    try {
      const candidate = await this.service.deleteCandidateService(candidate_id);
      return res.status(201).json({ message: "success", candidate });
    } catch (error) {
      console.error("delete candidate {Controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getCandidateByID(req, res) {
    const { candidate_id } = req.params;
    try {
      const candidate = await this.service.getCandidateByIDService(
        candidate_id
      );
      return res.status(201).json({ message: "success", data: candidate });
    } catch (error) {
      console.error(
        "get candidate by id candidate {Controller}:",
        error.message
      );
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getCandidateByName(req, res) {
    const { candidate_name } = req.params;
    try {
      const candidate = await this.service.getCandidateByNameService(name);
      return res.status(201).json({ message: "success", candidate });
    } catch (error) {
      console.error(
        "get candidate by name candidate {Controller}:",
        error.message
      );
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default CandidateController;
