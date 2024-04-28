class VoteController {

    constructor (service) {
        this.service = service;
    }

    async getVoteByCandidateID (req, res) {
        const { candidate_id } = req.params;
        try {
            const vote = await this.service.getVoteByCandidateIDService(candidate_id);
            return res.status(201).json({ message : 'Success', data : vote});
        } catch (error) {
            console.error('get vote by candidate id {controller}:', error.message);
            return res.status(500).json({ message : 'Internal Server Error' });
        }
    }

    async createCandidateVote (req, res) {
        const { number_of_vote, candidate_id } = req.body;
        try {
            const voted = {
                number_of_vote,
                candidate_id
            }
            const vote = await this.service.createCandidateVoteService(voted);
            return res.status(201).json({ message : 'Success', data : vote});
        } catch (error) {
            console.error('update candidate vote {controller}:', error.message);
            return res.status(500).json({ message : 'Internal Server Error' });
        }
    }

    

};

export default VoteController;